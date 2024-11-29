FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update && \
    apt-get install -y libpq-dev && \
    apt-get clean

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Set environment variable untuk Django
ENV PYTHONUNBUFFERED 1

# Expose port
EXPOSE 15001

CMD ["python", "manage.py", "runserver", "0.0.0.0:15001"]
