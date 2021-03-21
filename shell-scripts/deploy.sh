sudo docker container rm -f desafio-tech-ton-server desafio-tech-ton-mysql
sudo docker image rm -f desafio-tech-ton-server:latest
sudo docker network rm desafio-tech-ton_default
sudo docker-compose up -d
