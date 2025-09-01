from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import create_tool_calling_agent , AgentExecutor


GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")  # This will be "2.5-flash"

load_dotenv()

app = FastAPI(title="Student Analysist")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, GET, OPTIONS
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str


class ResearchRequest(BaseModel):
    topic: str
    summary: str
    sources: list[str]
    tools: list[str]

class ResearchRequest(BaseModel):
    topic: str
    summary: str
    sources: list[str]
    tools: list[str]


llm = ChatGoogleGenerativeAI(model=os.getenv("GEMINI_MODEL"),
                             google_api_key=os.getenv("GEMINI_API_KEY"),
                             )
parser = PydanticOutputParser(pydantic_object=ResearchRequest)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
            You are a helpful research assistant.
            Your task is to assist students in their research projects by providing relevant information and resources.
            Please provide a detailed response to the user's query \n{format_instructions}
            """,
        ),
        ("placeholder", "{chat.history}"),
        ("human", "{query}"),
        ("placeholder", "{agent_scratchpad}"),
    ]
).partial(format_instructions=parser.get_format_instructions())

agent = create_tool_calling_agent(
    llm=llm, prompt=prompt, tools=[]
)

agent_executor = AgentExecutor(agent=agent, tools=[] , verbose=True)


@app.post("/chat" , response_model=ResearchRequest)
async def chat_endpoint(request: QueryRequest):
    """Student sends a query, chatbot responds with structured research help"""
    raw_response = agent_executor.invoke({"query": request.query})
    output = raw_response.get("output", "{}")

    # Parse the structured JSON into Pydantic model
    try:
        parsed = parser.parse(output)
        return ResearchRequest(   # ✅ use ResearchRequest
            topic=parsed.topic,
            summary=parsed.summary,
            sources=parsed.sources,
            tools=parsed.tools
        )
    except Exception as e:
        return ResearchRequest(
            topic="Error",
            summary=f"Failed to parse response: {str(e)}",
            sources=[],
            tools=[]
        )
