import path from "path"
import { Verifier } from "@pact-foundation/pact"
import Fastify from "fastify"
import notesRoutes from "@/src/routes/v1/notes"

describe("Pact Provider Verification", () => {
	let fastify: ReturnType<typeof Fastify>

	beforeAll(async () => {
		fastify = Fastify()
		notesRoutes(fastify)
		await fastify.listen({ port: 3001 })
	})

	afterAll(async () => {
		await fastify.close()
	})

	it("validates the expectations of the consumer", async () => {
		const opts = {
			provider: "NotesProvider",
			providerBaseUrl: "http://localhost:3001",
			pactUrls: [
				path.resolve(__dirname, "../pacts/consumer-notesprovider.json"),
			],
		}

		await new Verifier(opts).verifyProvider()
	})
})
