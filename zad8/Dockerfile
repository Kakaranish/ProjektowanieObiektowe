FROM python:3

WORKDIR /usr/src/app

COPY ./app .
RUN pip install -U Flask
RUN pip install flask_wtf

EXPOSE 80

CMD ["flask", "run", "-h", "0.0.0.0", "-p", "80"]