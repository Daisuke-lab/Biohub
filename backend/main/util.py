import smtplib
from email.mime.text import MIMEText

subject = "Email Subject"
body = "This is the body of the text message"
sender = "sender@gmail.com"
recipients = ["recipient1@gmail.com", "recipient2@gmail.com"]
password = "password"

def fib_with_memo(n, memo={}):
    if n == 0 or n == 1:
        return 1
    elif memo.get(n):
        return memo.get(n)
    else:
        new_fib = fib_with_memo(n-1, memo) + fib_with_memo(n-2, memo)
        memo[n] = new_fib
        return new_fib
    

def fib_with_tab(n):
    tabs = []
    for i in range(n+1):
        if i in [0,1]:
            value = 1
        else:
            value = tabs[i-1] + tabs[i-2]
        tabs.append(value)
    return tabs[n]
    

def send_email(email, message):
    recipients = [email]
    email = MIMEText(message)
    email['Subject'] = "fibonacci example"
    email['From'] = "my email"
    email['To'] = email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
       smtp_server.login("SECRET SENDER", "SECRET PASSWORD")
       #I am not going to send it for real.
       #smtp_server.sendmail(sender, recipients, email.as_string())
