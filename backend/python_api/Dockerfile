FROM python


WORKDIR /code


COPY ./requirements.txt /code/requirements.txt


RUN pip install -r /code/requirements.txt



COPY ./ /code/app
ENV PYTHONPATH=/code/app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]