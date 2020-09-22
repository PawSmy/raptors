docker rm -f ra-front
docker build --no-cache -t ra-front:latest .
docker run -d -p 4402:80 --name=ra-front ra-front