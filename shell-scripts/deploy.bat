docker container rm -f desafio-tech-ton-server desafio-tech-ton-mysql
docker image rm -f desafio-tech-ton-server:latest
docker network rm desafio-tech-ton_default
docker-compose up -d
