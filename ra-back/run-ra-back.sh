docker rm -f ra-back
docker build --no-cache -t ra-back:latest .
docker run -d --net=ra-bridge -p  4401:8080 --name=ra-back ra-back