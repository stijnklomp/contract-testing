import path from "path"
import { MessageConsumerPact, Matchers } from "@pact-foundation/pact"
import { listenForNotesHandler } from "@/controllers/notes"
import { consume } from "@/infrastructure/rabbitMQ"
import { ConsumeMessage, Channel } from "amqplib"

jest.mock("@/infrastructure/rabbitMQ")

const { like } = Matchers
const pactsDir = process.env.PACTS_DIR ?? "../../../../../pacts"
const messagePact = new MessageConsumerPact({
	consumer: "NotesConsumer",
	dir: path.resolve(__dirname, pactsDir),
	log: path.resolve(__dirname, "../logs", "pact.log"),
	logLevel: "warn",
	provider: "NotesProvider",
})

describe("Pact Message Consumer Test - listenForNotesHandler", () => {
	it("should handle a note message", async () => {
		await messagePact
			.given("a note exists")
			.expectsToReceive("a new note message")
			.withContent({
				id: like(1),
				note: like("Sample note content"),
			})
			.withMetadata({
				contentType: "application/json",
			})
			.verify(async (message) => {
				const fakeMsg = {
					content: Buffer.from(JSON.stringify(message.contents)),
				} as ConsumeMessage
				const fakeChannel = {
					ack: jest.fn(),
				} as unknown as Channel

				;(
					consume as jest.MockedFunction<typeof consume>
				).mockImplementation(async (channel, queue, bindings, cb) => {
					cb(fakeMsg, fakeChannel)

					return Promise.resolve(true)
				})

				// Both unit test test and acceptance test code cover the same ground. It is therefor sensible to use Pact for both. This way the test data, the contract in this case, is the same for both test scenarios. It is however important that the consumer, the one that creates the contract, uses a shared method to define the expected message content. This way it ensures both unit and acceptance tests can generate the exact same contract.
				// Unit & acceptance test code
				await listenForNotesHandler()

				// Unit test code only
				// eslint-disable-next-line @typescript-eslint/unbound-method
				expect(fakeChannel.ack).toHaveBeenCalledWith(fakeMsg)
			})
	})
})
