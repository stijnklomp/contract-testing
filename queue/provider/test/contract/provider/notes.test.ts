import path from "path"
import {
	MessageProviderPact,
	providerWithMetadata,
	LogLevel,
	PactMessageProviderOptions,
} from "@pact-foundation/pact"
import { createNoteHandler } from "@/controllers/notes"
import { publish } from "@/infrastructure/rabbitMQ"

jest.mock("@/infrastructure/rabbitMQ")

const pactsDir = process.env.PACTS_DIR ?? "../../../../../pacts"
const pactConfig: Omit<PactMessageProviderOptions, "messageProviders"> = {
	logFile: path.resolve(__dirname, "../logs", "pact.log"),
	logLevel: "warn" as LogLevel,
	pactUrls: [
		path.resolve(__dirname, pactsDir, "NotesConsumer-NotesProvider.json"),
	],
	provider: "NotesProvider",
}

const getLastCallToConsume = (): unknown => {
	const calls = (publish as jest.MockedFunction<typeof publish>).mock.calls

	return calls.length ? JSON.parse(calls[calls.length - 1][3]) : undefined
}

describe("Message Provider Pact Verification", () => {
	const provider = new MessageProviderPact({
		...pactConfig,
		messageProviders: {
			"a new note message": providerWithMetadata(
				async () => {
					await createNoteHandler()

					return Promise.resolve(getLastCallToConsume())
				},
				{ contentType: "application/json" },
			),
		},
	})

	it("verifies the message provider", async () => {
		// Both unit test test and acceptance test code cover the same ground. It is therefor sensible to use Pact for both. This way the test data, the contract in this case, is the same for both test scenarios.
		// Unit & acceptance test code
		await provider.verify()

		// Unit test code only
		expect(publish as jest.Mock).toHaveBeenCalledWith(
			"notes",
			"main",
			"notes",
			expect.toBeString(),
		)
		expect(getLastCallToConsume()).toEqual(
			expect.objectContaining({
				id: expect.any(Number) as number,
				note: "Sample note content",
			}),
		)
	})
})
