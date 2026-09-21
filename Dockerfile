# Production Dockerfile for Google Cloud Run
FROM python:3.11-slim

# Prevent Python from writing .pyc and enable unbuffered output for Cloud Logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy server and static web assets
COPY server.py .
COPY web/ ./web/

# Create non-root user for cloud security
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Expose port (Cloud Run defaults to 8080)
EXPOSE 8080

# Launch server with dynamic PORT environment variable
CMD ["sh", "-c", "exec uvicorn server:app --host 0.0.0.0 --port ${PORT:-8080}"]
