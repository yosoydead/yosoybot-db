#!/bin/sh

echo "Salut."

echo "O sa creez o imagine de docker cu numele de yosoydb."
docker build -t yosoydb .
echo "Am reusit sa fac imaginea."

echo "O sa pornesc un container pe portul 3000 in detach mode."
docker run -p 3000:3000 -d yosoydb
echo "Am reusit sa pornesc un container. Incearca sa faci un log."