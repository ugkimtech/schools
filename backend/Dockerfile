#use official python image
FROM python:3.11-slim

# set working directory
WORKDIR /app

# copy django project files
COPY . .
RUN pip install --no-cache-dir -r requirements.txt
RUN python manage.py collectstatic --noinput

# expose port for django
EXPOSE 8000

# start gunicon server
CMD ["gunicorn", "emis.wsgi:application", "--bind", "0.0.0.0:8000"]