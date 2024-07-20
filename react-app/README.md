# Dockerizing react application for production

First of all lets explore by dockerizing the application for the development.So we have a Dockerfile.dev with configuration.
Now we need to create the docker image with the following commands,

```bash
docker image build . -t kodega2016/react-app -f Dockerfile.dev
```

So, after building the docker image,we can run the docker container with the following commands.

```bash
docker container run -d --name react-app -p 80:3000 -v /app/node_modules -v $(pwd):/app kodega2016/react-app
```

It will start the docker container in detached mode and mapport 80 to 3000 and also mount the volumes for node_modules and the current directory.
