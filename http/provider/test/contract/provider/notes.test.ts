import path from "path"
import { Verifier } from "@pact-foundation/pact"
import { FastifyInstance } from "fastify"

import { build } from "@/helper"
import { prisma } from "@/common/prisma"
import { Note } from "@prisma/client"
// import { loggerEnvConfig } from "@/src/common/logger"

const insertTestNotes = async (
	data: (Pick<Note, "id" | "note"> & { owner: string })[],
) => prisma.note.createMany({ data })

describe("Pact Provider Verification", () => {
	let app: FastifyInstance
	const instance: () => FastifyInstance = build()
	// const instance: () => FastifyInstance = build({
	// 	logger: loggerEnvConfig.development,
	// })

	beforeAll(async () => {
		app = instance()
		await app.listen({ port: 3001 })
	})

	it("validates the expectations of the consumer", async () => {
		const opts = {
			pactUrls: [
				// path.resolve(__dirname, "../pacts/consumer-notesprovider.json"),
				path.resolve(process.cwd(), "../pacts"),
			],
			provider: "NotesProvider",
			providerBaseUrl: "http://localhost:3001",
			stateHandlers: {
				"notes exist": async () => {
					await insertTestNotes([
						{
							id: 1,
							note: "Sample note content",
							owner: "test-owner",
						},
						{
							id: 2,
							note: "Sample note content",
							owner: "test-owner",
						},
					])

					return { result: "Notes inserted" }
				},
			},
		}

		await new Verifier(opts).verifyProvider()
	})
})
