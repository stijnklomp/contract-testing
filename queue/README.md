# Queue

- The tests can be found in `<consumer/provider>/test/contract/<consumer/provider>/notes.test.ts`
- The endpoint code can be found in `<consumer/provider>/src/controllers/notes.ts`
    - For the consumer, it makes a call to consume on RabbitMQ at `consumer/src/services/notes.ts` to start receiving message callbacks
    - For the provider, it publishes to RabbitMQ at `provider/src/services/notes.ts`
- The contract(s) can be found at `pacts/`

## Instructions to run the tests

### Consumer

```sh
sudo chmod +x run.sh # May not be necessary
./run.sh consumer # `provider` for provider

# Run the following inside the running container:
npm run contract

# Once you are done, run the following:
exit
```

## Completed

[Continue...](../README.md)