import { FastifyInstance } from "fastify"

import { logger } from "@/common/logger"
import notesService from "@/services/notes"
import { ConsumeCallback } from "@/infrastructure/rabbitMQ"

export const listenForNotesHandler = async (_fastify: FastifyInstance) => {
	try {
		const callback: ConsumeCallback = (msg, channel) => {
			if (msg !== null) {
				channel.ack(msg)
				console.log(
					"callback for notes called:",
					msg.content.toString("utf8"),
				)
			} else {
				console.log("'null' message in callback for notes:", msg)
			}
		}

		await notesService.listenForNotes(callback)
	} catch (err) {
		logger.error(err)
	}
}
