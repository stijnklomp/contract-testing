import { listenForNotesHandler } from "@/controllers/notes"
import { FastifyInstance } from "fastify"

export default async (fastify: FastifyInstance) => {
	await listenForNotesHandler(fastify)
}
