import path from "path"
import { MessageConsumerPact } from "@pact-foundation/pact"
import { handler } from "../src/consumer" // Your message handler function

describe("Message Consumer Pact", () => {
	it("should handle a valid message", async () => {
		await messagePact
			.given("a valid message")
			.expectsToReceive("a message with valid content")
			.withContent({
				id: "123",
				type: "example",
				payload: {
					data: "sample data",
				},
			})
			.withMetadata({
				"content-type": "application/json",
			})
			.verify(async (message) => {
				await handler(message) // Your message processing logic
			})
	})
})
