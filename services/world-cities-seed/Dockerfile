FROM python:alpine

WORKDIR /usr/src
RUN apk add --no-cache git
RUN pip install --upgrade pip
RUN pip install --no-cache-dir pymongo
RUN git clone https://github.com/Mr-Binary/world-cities-mongodb.git

WORKDIR /usr/src/world-cities-mongodb
COPY entrypoint.sh entrypoint.sh
CMD sh entrypoint.sh
