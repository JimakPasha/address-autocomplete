# Address Autocomplete Form

There are two ways of installing and running the application:

- Locally
- Using `docker-compose`

## Installing and Running the Application Locally

This application has a "client" and a "server."

To install the application, you must install the dependencies for both.

The back-end has been tested with Node versions 14 through 18.

To install the dependencies for the client, go to the "client/" folder and run the command:

```bash
yarn install
```

Then, go to the "server/" folder and run the same command (`yarn install`).

To run the application, you'll need to have a terminal running the client and another terminal running the server.

To run the client, go to the "client/" folder and run the command:

```bash
yarn start
```

To run the server, go to the "server/" folder and run the same command (`yarn start`).

## Installing and Running The Application in Docker

To run the application using `docker` you must have both `docker` and `docker-compose` installed in your system.

To build the containers and run the application, you can simply run the command `docker-compose up` from the root folder of the project (not the "/client" or "/server" folders).

**NOTE: The Docker containers will respond to changes made to the client folder in real-time. If you change the contents of the server folder, these won't be reflected in the Docker containers. However, changing the contents of the server folder is not necessary to complete this assessment.**

When you want to stop the container services, you can just run `docker-compose down`.

### Container Logs

To see the container's logs, you can run the command `docker container logs <container-name>`. The `docker` CLI offers autocomplete, so if you're not sure of the name of the container, you can just write `docker container logs` and then press the TAB key to cycle through the container names.

## Verifying that Everything is Set Up Correctly

When the server is running correctly in your local environment, you will see an output in the terminal where the server is running that looks like this:

```text
❯ yarn start
yarn run v1.22.10
$ nodemon app.js
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
listening on port 8080
```

If you see the text `listening on port 8080`, it means that the server is running successfully.

If you're running the application in a Docker container, you'll likely won't see that output. To verify that the server is running correctly inside of your container, please refer to the "Container Logs" section of this README for instructions on how to inspect the server container output.

To verify that the client is running successfully, visit the URL "[http://localhost:3000](http://localhost:3000/)". You should see an empty form with a blue button that says "Continue", as shown in the picture below:

![](https://i.ibb.co/LCMjtGt/Starting-Form.png)
