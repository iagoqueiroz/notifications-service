# Notification Microservice

This repository contains a notification microservice built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/).

## Description
The notification service is responsible for centralize notifications. It exposes a RESTful
API for creating and managing notifications, as well as for querying their status.
The service uses NestJS as the web framework and Prisma as the ORM to interact with
the database.

## Features
- Create and manage notifications using a RESTful API
- Query the status of notifications

## Requirements
- Node.js >= 18.0
- NPM
- A database (MySQL, PostgreSQL)
- Or just **Docker**

## Manual Setup
1. Clone this repository
2. Copy `.env.example` and set the environment variables: `cp .env.example .env`
3. Install the dependencies: `npm install`
4. Install and setup prisma client: `npx prisma generate`
5. Run the migrations: `npx prisma migrate dev`
6. Start the server: `npm run start:dev`

## Or just run with docker
1. Clone this repository
2. Copy `.env.example` and set the environment variables: `cp .env.example .env`
3. Build image and start containers: `docker compose up -d -V --build`

## API
Create a notification
```http
POST /notifications
Content-Type: application/json

{
  "recipientId": "414d419f-f49f-4a58-b72b-0a6f087f2a6b",
  "content": "Your order was dispatched.",
  "category": "product"
}
```

Read a notification
```http
PATCH /notifications/:id/read
```

Unread a notification
```http
PATCH /notifications/:id/unread
```

Cancel a notification
```http
PATCH /notifications/:id/cancel
```

Cancel a notification
```http
GET /notifications/from/recipient/:recipientId
```