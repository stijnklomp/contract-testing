import path from "path"
import { Verifier } from "@pact-foundation/pact"
// import { FastifyInstance } from "fastify"

// import { build } from "@/helper"
import { prisma } from "@/common/prisma"
import { Note } from "@prisma/client"
// import { loggerEnvConfig } from "@/src/common/logger"

const insertTestNotes = async (
	data: (Pick<Note, "id" | "note"> & { owner: string })[],
) => {
	const prismaClient = prisma()
	await prismaClient.note.deleteMany({})
	await prismaClient.note.createManyAndReturn({ data })
}

describe("Pact Provider Verification", () => {
	// const basePort = "3001"
	const basePort = "3000"

	// No need to spin up API as it is required to run in Docker Compose due to needing to access the database
	//
	// let app: FastifyInstance
	// const instance: () => FastifyInstance = build()
	// const instance: () => FastifyInstance = build({
	// 	logger: loggerEnvConfig.development,
	// })

	// beforeAll(async () => {
	// 	app = instance()
	// 	await app.listen({ port: basePort })
	// })

	it("validates the expectations of the consumer", async () => {
		const pactsDir = process.env.PACTS_DIR ?? "../../pacts"
		const opts = {
			pactUrls: [path.resolve(process.cwd(), pactsDir)],
			provider: "NotesProvider",
			providerBaseUrl: `http://localhost:${basePort}`,
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
