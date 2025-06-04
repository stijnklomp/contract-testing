# Http (endpoint)

- The tests can be found in `<consumer/provider>/test/contract/<consumer/provider>/notes.test.ts`
- The endpoint code can be found in `<consumer/provider>/src/routes/v1/notes.ts`
    - For the consumer, it makes a call to the provider API at `consumer/src/services/notes.ts` to retrieve the notes
    - For the provider, it retrieves the data from the database at `provider/src/repositories/notes.ts` and returns it
- The contract(s) can be found at `pacts/`


## Instructions to run the tests

```sh
sudo chmod +x run.sh # May not be necessary
./run.sh consumer # `provider` for provider

# Run the following inside the running container:
npm run contract

# Once you are done, run the following:
exit
```

Interesting note: Pact considers a test successful if there is "nothing to verify". This means that you may have written tests that aren't actually required by consumers. This allows you to future proof your API for endpoints that consumer might need in the future. Pact does not natively provide a built-in way to detect unused provider tests. Pact only verifies what consumers have defined, not additional coverage on the provider.

## Completed

[Continue...](../README.md)