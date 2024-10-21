FROM python:3.10-alpine3.20

WORKDIR /app

RUN apk add --no-cache gcc musl-dev libffi-dev openssl-dev python3-dev make libgcc libstdc++ && \
    apk add --no-cache linux-headers

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

ARG OPENAI_API_KEY

ENV OPENAI_API_KEY=${OPENAI_API_KEY}

EXPOSE 8000

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]