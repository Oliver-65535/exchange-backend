# Backend for token exchange

# Assumptions

The backend aggregates created orders and provides access to them. The API contains only 2
endpoints
p GET /getOrders?tokenA={token address}&tokenB={token address}&user={user address
user}&active={true|false} Returns an array of requests. Parameters are optional.
Without parameters, it will return all orders. With the given tokenA\tokenB - all orders where the pair
has tokenA and| or tokenB. With the user parameter - all orders of a certain user.
The active parameter (false by default) sets the output of only the unclosed orders
p GET /getMatchingOrders?tokenA={buy token address}&tokenB={sell token address
sell}&amountA={total amount of order, if 0 order will be executed at
market}&amountB={sale amount}. Returns an array of order identifiers, for
The call of the matchOrders method in the smart contract.

The orders get into the backend by listening to the smart contract events - OrderCreated,
OrderMatched, OrderCancelled.

# Tech Stack

1. **Backend**: NestJS
2. **Database**: PostgreSQL
3. **Testing**: Jest for unit testing. Postman for e2e testing.

# Features

- Swagger Documentation
- Blockchain listen use Web3
- Rest API

# How to setup

## **Deploy with Docker**

You can run the entire app using docker compose.

On root directory

```bash
docker-compose up -d
```

Application will be deployed on http://localhost:3000

Swagger Docs on http://localhost:3000/api/docs

## **Running locally**

## Backend

First you have to postgresql installed on your computer.

Edit the database properties on the backend/.env file.

On backend directory

### Installing the dependencies

```bash
yarn
```

### Running the app

```bash
$ yarn start
```

Backend will be started on http://localhost:5000

Swagger Docs on http://localhost:5000/api/docs

# Testing

**Unit testing**

On backend directory

```bash
yarn test
```

**e2e api testing**

First start the backend locally.

On backend directory

Install the dependencies

```bash
yarn
```

Start the backend locally.

```bash
yarn start
```

Start the test

```bash
yarn test:e2e
```
