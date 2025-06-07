import path from "path"
import { Pact } from "@pact-foundation/pact"
import { like, eachLike } from "@pact-foundation/pact/src/dsl/matchers"
import axios from "axios"
import { FastifyInstance } from "fastify"

import { build } from "@/helper"
// import { loggerEnvConfig } from "@/src/common/logger"

const pactsDir = process.env.PACTS_DIR ?? "../../../../../pacts"
const provider = new Pact({
	consumer: "NotesConsumer",
	dir: path.resolve(__dirname, pactsDir),
	log: path.resolve(__dirname, "../logs", "pact.log"),
	logLevel: "warn",
	port: 1234,
	provider: "NotesProvider",
})

describe("Pact with NotesProvider", () => {
	const basePort = "3001"
	// const basePort = "3000"

	// Spin up API to test against actual endpoint
	// Note that this is not strictly necessary when running with Docker Compose but it does still work
	let app: FastifyInstance
	const instance: () => FastifyInstance = build()
	// const instance: () => FastifyInstance = build({
	// 	logger: loggerEnvConfig.development,
	// })

	beforeAll(async () => {
		await provider.setup()

		app = instance()
		await app.listen({ port: 3001 })
	})
	afterAll(() => provider.finalize())
	afterEach(() => provider.verify())

	describe("when a request for paginated notes is made", () => {
		beforeAll(() => {
			return provider.addInteraction({
				state: "notes exist",
				uponReceiving: "a paginated request for notes",
				willRespondWith: {
					body: eachLike(
						{
							id: like(1),
							note: like("Sample note content"),
						},
						{ min: 2 },
					),
					headers: {
						contentType: "application/json",
					},
					status: 201,
				},
				withRequest: {
					method: "GET",
					path: "/v1/notes",
					query: {
						page: like("1"),
						perPage: like("10"),
					},
				},
			})
		})

		it("should receive the correct note list via Fastify service", async () => {
			process.env.NOTES_API_URL = `http://localhost:${String(provider.opts.port)}`

			const response = await axios.get(
				`http://localhost:${basePort}/v1/notes`,
			)
			expect(response.status).toBe(200)
			expect(Array.isArray(response.data)).toBe(true)
			expect((response.data as unknown[]).length).toBeGreaterThanOrEqual(
				2,
			)
		})
	})
})
