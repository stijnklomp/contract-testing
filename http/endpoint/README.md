# Endpoint

## Instructions

### Consumer

```sh
sudo chmod +x run.sh && ./run.sh consumer
```

### Provider

```sh
sudo chmod +x run.sh && ./run.sh provider
```

Interesting note: Pact considers a test successful if there is "nothing to verify". This means that you may have written tests that aren't actually required by consumers. This allows you to future proof your API for endpoints that consumer might need in the future. Pact does not natively provide a built-in way to detect unused provider tests. Pact only verifies what consumers have defined, not additional coverage on the provider.

## Completed

[Continue...](../README.md)