from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from core.db import SessionLocal
from services.chatbot import get_gemini_response
from models.chat import ChatHistory

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/chat")
def chat_with_bot(user_id: int, message: str, db: Session = Depends(get_db)):
    response = get_gemini_response(message)

    # Save chat in DB
    chat_entry = ChatHistory(user_id=user_id, message=message, response=response)
    db.add(chat_entry)
    db.commit()
    db.refresh(chat_entry)

    return {"user_message": message, "bot_response": response}
