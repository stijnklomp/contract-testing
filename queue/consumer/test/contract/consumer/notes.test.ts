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

//
//
//
//
//
// import path from "path"
// import { Pact, MessageConsumerPact } from "@pact-foundation/pact"
// import { like } from "@pact-foundation/pact/src/dsl/matchers"
// import { FastifyInstance } from "fastify"

// import { build } from "@/helper"
// // import { loggerEnvConfig } from "@/src/common/logger"

// const pactsDir = process.env.PACTS_DIR ?? "../../pacts"
// const provider = new Pact({
// 	consumer: "NotesConsumer",
// 	dir: path.resolve(process.cwd(), pactsDir),
// 	log: path.resolve(process.cwd(), "logs", "pact.log"),
// 	logLevel: "warn",
// 	port: 1234,
// 	provider: "NotesProvider",
// })

// describe("Pact with NotesProvider", () => {
// 	const basePort = "3001"
// 	// const basePort = "3000"

// 	// Spin up API to test against actual endpoint
// 	// Note that this is not strictly necessary when running with Docker Compose but it does still work
// 	let app: FastifyInstance
// 	const instance: () => FastifyInstance = build()
// 	// const instance: () => FastifyInstance = build({
// 	// 	logger: loggerEnvConfig.development,
// 	// })

// 	beforeAll(async () => {
// 		await provider.setup()

// 		app = instance()
// 		await app.listen({ port: 3001 })
// 	})
// 	afterAll(() => provider.finalize())
// 	afterEach(() => provider.verify())

// 	const messagePact = new MessageConsumerPact({
// 		consumer: "NotesConsumer",
// 		dir: path.resolve(process.cwd(), pactsDir),
// 		logLevel: "warn",
// 		provider: "NotesProvider",
// 	})

// 	it("should process a valid note message", async () => {
// 		await messagePact
// 			.given("a note exists")
// 			.expectsToReceive("a new note message")
// 			.withContent({
// 				id: like(1),
// 				note: like("Sample note content"),
// 			})
// 			.withMetadata({
// 				"content-type": "application/json",
// 			})
// 			.verify(async (message) => {
// 				// Simulate consuming the message
// 				await handleNoteMessage(message.contents)
// 			})
// 	})
// })
