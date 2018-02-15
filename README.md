# IQ PingPong

A ping-pong statistics tracker and game maker. Based on player statistics, we calculate the odds of players winning matches. We do not endorse betting real money.

We're working with an Express backend, a React frontend, and a Postgres instance on Amazon. It's all in flux. Contributions are welcome! Pick up an issue, or suggest a feature in the issues tracker.

## Quick start: locally

```bash
$ git clone https://github.com/IQ-Inc/PingPong.git
$ cd PingPong
$ npm install
$ cd ping-pong-client
$ npm install
$ cd ..
$ # run the API server locally
$ npm run start:dev
```

### Dependencies: locally

- nodejs
- a Postgres database

You'll need to configure the backend for your local database instance. We maintain configurations in `server/config/config.json`. The configurations are set to use the Docker Compose development model described below.

## Quick start: Docker Compose

Use Docker and Docker Compose to set up the backend, frontend, and a database:

```bash
docker-compose up
```

The API server is available at `localhost:8081`. Data in the database persists across environment reboots. So, you won't lose your database data if you start and stop the containers.

We mount the local repository inside the container, so you'll see all your code changes in real-time with nodemon.

### Dependencies: Docker compose

- Docker (and Docker compose)