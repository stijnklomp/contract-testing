import { createNoteHandler, getNotesHandler } from "@/controllers/notes"
import { createNote } from "@/models/validators/notes"
import { FastifyInstance } from "fastify"

export default (fastify: FastifyInstance) => {
	fastify.route({
		handler: getNotesHandler,
		method: "GET",
		url: "/notes",
	})

	fastify.route({
		handler: createNoteHandler,
		method: "POST",
		schema: createNote,
		url: "/notes",
	})
}
