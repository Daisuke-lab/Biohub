from __future__ import absolute_import, unicode_literals
from .util import fib_with_memo, send_email
from celery import shared_task
import time

@shared_task
def fibonacci_async(number, email):
    try:
        result = fib_with_memo(number)
        message = f"Here is your fibonacci:: {result}"
        send_email(email, message)
    except:
        message = "I am so sorry. Something went wrong. Please try again."
        send_email(email, message)
    