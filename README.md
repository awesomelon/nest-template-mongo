# NestJS + Fastify + MongoDB Boilerplate

## Introduction

This boilerplate project combines the robustness of NestJS, the high performance of Fastify, and the flexibility of MongoDB to create a powerful backend foundation for web applications. It's designed to kickstart your development process, providing a structured yet flexible framework.

<br >

## Features

- **NestJS:** A progressive Node.js framework for building efficient and scalable server-side applications.
- **Fastify:** A fast and low overhead web framework for Node.js.
- **MongoDB:** A NoSQL database that offers high performance, high availability, and easy scalability.

<br >

## Getting Started

### Prerequisites

- Node.js (v16.20.x or later)

### Installation

1. Clone the repository:

```bash
 git clone https://github.com/awesomelon/nest-template-mongo.git
```

2. Install dependencies:

```bash
cd https://github.com/awesomelon/nest-template-mongo.git
yarn install
```

3. Set environment variables:

- create a `.env` file in the root directory
- Add the necessary configurations
  - `DB_ID`: The MongoDB user ID used for authentication.
  - `DB_NAME`: The name of the MongoDB database you're connecting to.
  - `DB_PWD`: The password for the MongoDB user.
  - `DB_URL`: The host URL for your MongoDB instance. This could be a local address or a cloud-based service URL.
  - `API_PORT`: The port number on which your API will listen. This is the port where your NestJS application will run.
  - `JWT_ACCESS_TOKEN_SECRET`: A secret key used for signing and verifying JWT tokens. This should be a strong, unique string.
  - `JWT_ACCESS_TOKEN_EXPIRATION_TIME`: The expiration time for the JWT access tokens. Typically specified in seconds or a time string like '60m' for 60 minutes.

### Running the Application

1. Start the MongoDB database
2. Run the application:

```bash
yarn start:dev
```

<br >

## Structure

- `src`: The root folder for all source code.
  - `auth`: Contains authentication logic, including strategies and guards.
  - `cache`: Manages caching mechanisms, useful for performance optimization.
  - `catch`: Exception handling related code, including custom exception filters.
  - `common`: Reusable code modules, such as decorators, interfaces, enums, and utilities shared across the application.
  - `db`: Database related code, including models, migrations, and database connection setup.
  - `health`: Health check functionality, often used to check the status and health of the application and its dependencies.
  - `httpRequest`: Code related to handling HTTP requests, including custom request handlers and middleware.
  - `logger`: Logging functionality, providing a centralized way to log application events and errors.
  - `user`: User management code, including user models, services, and controllers.
  - `utils`: Utility functions and helpers that provide common functionality used in various parts of the application.

<br >

## Documentation

For detailed information and guidance on using and extending this boilerplate project, refer to the following resources:

- [**NestJS Documentation**](https://docs.nestjs.com/): Explore the official documentation of NestJS for in-depth understanding of its architecture, modules, and more.
- [**Fastify Documentation**](https://www.fastify.io/docs/latest/): Learn more about Fastify, its plugins, and how it contributes to the high performance of the application.
- [**MongoDB Documentation**](https://docs.mongodb.com/): Detailed documentation on MongoDB, including guides on schema design, queries, and database operations.

Additionally, the following resources can be helpful:

- **API Documentation**: Access the auto-generated Swagger documentation for the REST API by navigating to `/api/docs` in your local development environment.
