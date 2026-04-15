FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY mm_recording_studio/ ./mm_recording_studio/
COPY prompts/ ./prompts/
COPY output/ ./output/

# Expose port
EXPOSE 8000

# Run the application
CMD ["python", "-m", "mm_recording_studio", "--host", "0.0.0.0", "--port", "8000"]