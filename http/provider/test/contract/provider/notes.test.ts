import path from "path"
import { Verifier } from "@pact-foundation/pact"
import { FastifyInstance } from "fastify"

import { build } from "@/helper"

describe("Pact Provider Verification", () => {
	let app: FastifyInstance
	const instance: () => FastifyInstance = build()

	beforeAll(async () => {
		app = instance()
		await app.listen({ port: 3001 })


	it("validates the expectations of the consumer", async () => {
		const opts = {
			pactUrls: [
				path.resolve(__dirname, "../pacts/consumer-notesprovider.json"),
			],
			provider: "NotesProvider",
			providerBaseUrl: "http://localhost:3001",
		}

		await new Verifier(opts).verifyProvider()
	})
})
