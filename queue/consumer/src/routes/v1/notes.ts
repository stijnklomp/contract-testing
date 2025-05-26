import { listenForNotesHandler } from "@/controllers/notes"
import { FastifyInstance } from "fastify"

export default async (_fastify: FastifyInstance) => {
	await listenForNotesHandler()
}
