#!/usr/bin/env sh

if [[ -z "$HOST" ]]; then
  HOST=localhost
fi

if [[ -z "$PORT" ]]; then
  PORT=27017
fi

if [[ -z "$DBNAME" ]]; then
  DBNAME=world-cities
fi

echo "run world cities seed"
sed -i "s/localhost/$HOST/g" settings.py
sed -i "s/27017/$PORT/g" settings.py
sed -i "s/MONGO_USER = ''/MONGO_USER = '$USER'/g" settings.py
sed -i "s/MONGO_PASSWORD = ''/MONGO_PASSWORD = '$PASSWORD'/g" settings.py
sed -i "s/WorldCities/$DBNAME/g" settings.py

python update.py
python main.py
