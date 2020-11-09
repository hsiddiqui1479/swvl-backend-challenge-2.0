# SWVL Backend Challenge

Swvl backend challenge RESTful APIs using Node.js, Express, and Mongoose.

## Getting Started

### Installation

Clone the repo:

```bash
git clone https://github.com/hsiddiqui1479/swvl-backend-challenge-2.0.git
cd swvl-backend-challenge-2.0
```


Install the dependencies:

```bash
yarn install
```

Set the correct environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### Commands

Running locally:

```bash
yarn dev
```

Running in production:

```bash
yarn start
```

Testing:

```bash
# run all tests
yarn test

# run test coverage
yarn coverage
```

Docker:

```bash
# run docker container in development mode
yarn docker:dev

# run docker container in production mode
yarn docker:prod
```

Prettier:

```bash
# run prettier
yarn prettier

# fix prettier errors
yarn prettier:fix
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This is achieved by Swagger.io

[MIT](LICENSE)
