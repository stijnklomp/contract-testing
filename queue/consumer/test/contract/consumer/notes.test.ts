import path from "path"
import { MessageConsumerPact, Matchers } from "@pact-foundation/pact"
import notesService from "@/services/notes"
import { listenForNotesHandler } from "@/controllers/notes"

jest.mock("@/services/notes")

const { like } = Matchers
const pactsDir = process.env.PACTS_DIR ?? "../pacts"

describe("Pact Message Consumer Test - listenForNotesHandler", () => {
	const messagePact = new MessageConsumerPact({
		consumer: "NotesConsumer",
		dir: path.resolve(process.cwd(), pactsDir),
		log: path.resolve(process.cwd(), "logs", "pact.log"),
		logLevel: "warn",
		provider: "NotesProvider",
	})

	it("should handle a note message", async () => {
		await messagePact
			.given("a note exists")
			.expectsToReceive("a new note message")
			.withContent({
				id: like(1),
				note: like("Sample note content"),
			})
			.withMetadata({
				"content-type": "application/json",
			})
			.verify(async (message) => {
				const fakeMsg = {
					content: Buffer.from(JSON.stringify(message.contents)),
				}
				const fakeChannel = {
					ack: jest.fn(),
				}

				// eslint-disable-next-line @typescript-eslint/no-unsafe-call
				notesService.listenForNotes.mockImplementation(async (cb) => {
					cb(fakeMsg, fakeChannel)
				})

				await listenForNotesHandler()

				expect(fakeChannel.ack).toHaveBeenCalledWith(fakeMsg)
			})
	})
})
