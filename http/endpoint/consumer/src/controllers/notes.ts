import { FastifyRequest, FastifyReply } from "fastify"

import notesValidator from "@/models/validators/notes"
import { logger } from "@/common/logger"
import notesService from "@/services/notes"
import { FastifyRequestSchemaTypes } from "@/models/types/schemaBuilderTypeExtractor"

export const getNotesHandler = async (
	req: FastifyRequest,
	res: FastifyReply,
) => {
	try {
		const notes = await notesService.getNotes()

		await res.code(200).send(notes)
	} catch (err) {
		logger.error(err)
		await res.code(500).send({
			message: "Internal Server Error",
		})
	}
}

export const createNoteHandler = async (
	req: FastifyRequestSchemaTypes<typeof notesValidator.createNote>,
	res: FastifyReply,
) => {
	try {
		const note = await notesService.createNote({ ...req.body })

		await res.code(200).send({
			message: "Note Created",
			note,
		})
	} catch (err) {
		logger.error(err)
		await res.code(500).send({
			message: "Internal Server Error",
		})
	}
}
