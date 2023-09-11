#!/usr/bin/env bash
#!/bin/sh

python manage.py collectstatic --no-input
python manage.py migrate
gunicorn expiration_tracker.asgi:application -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
exec "$@"
