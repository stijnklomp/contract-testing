const messagePact = new MessageConsumerPact({
  consumer: 'FastifyConsumer',
  provider: 'RabbitMQProvider',
  dir: path.resolve(__dirname, '../../pacts'), // Pact output dir
  pactfileWriteMode: 'update', // 'overwrite' or 'merge'
  spec: 2, // Pact specification version
});