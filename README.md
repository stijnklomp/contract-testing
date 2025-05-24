# Consumer-driven contract testing examples

This project contains examples of how to use [Pact](https://docs.pact.io/) to setup consumer-driven contract testing in [Node.js](https://nodejs.org/en) and [TypeScript](https://www.typescriptlang.org/). The main focus is to show examples of the core features of Pact and how one would implement contract testing in their app using common tools.

## Preamble

### Code template reasoning

The example projects are using a [Fastify template](https://github.com/stijnklomp/fastify-template) that I've created myself. The reason for this is because I'm very familiar with the framework and it had a clear separation of concerns. Specifically the `controller`, `services`, `models` and `repositories` structure, which complements Pact's way of contract testing well as it makes it easy to test only the necessary methods that deal with external APIs (like the handler method that deals with the model data).

#### Used tools

[Fastify](https://fastify.dev/) is used as the framework for the examples. It uses [Node.js](https://nodejs.org/en) to run the JavaScript code, transpiled from TypeScript, on the server/backend.

[NPM](https://www.npmjs.com/) is used as the package manager.

##### Testing

[Jest](https://jestjs.io/) is used as the testing library. This is what executes our contract tests. The NPM [@pact-foundation/pact](https://www.npmjs.com/package/@pact-foundation/pact) package is what interacts with the Pact testing layer and gets called within the test files.

##### Infrastructure

[Prisma](https://www.prisma.io/) is the Object-Relational Mapper (ORM) used to setup and interact with the [PostgreSQL](https://www.postgresql.org/) database.

[RabbitMQ](https://www.rabbitmq.com/) is the messaging and streaming broker using the [AMQP 0-9-1](https://www.rabbitmq.com/tutorials/amqp-concepts) protocol to handle interactions between different services/APIs.

##### Note

There are lots of tools used for the template. Like linting with [ESLint](https://eslint.org/), formatting with [Prettier](https://prettier.io/) and other development related tools. These are however not required for contract testing and are only included as they are already present in the template that was used. The README's will guide you to the right location for the contract testing related code.

#### Reasoning for wanting consumer-driver contract testing

When the consumers of an API dictate what the minimum requirements are, the API will ensure that the business requirements of both the consumer and the provider (itself) are met. This ensures confidently that all requirements are met and avoids having to do work that isn't actually needed for any consumer.
It also decouples the consumers from the providers and allows for many consumers to consume an API whilst maintaining a central place for the requirements (the contract).

## Getting started

There's two methods of contract testing with Pact. Either the `http` or `queue` method. Which one you use depends on how your consumer speaks with the provider.

1. Let's start with the `http` method. This is the simpler method as it just involves the direct calls between the consumer and provider.

[Explore how to use Pact using the HTTP method](./http/README.md)

2. Now we can look at the `queue` method. This tests consumers and providers that are decoupled and communicate through a messaging and streaming broker.

[Explore how to use Pact using the queue method](./queue/README.md)