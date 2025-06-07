import { logger } from "@/common/logger"
import notesService from "@/services/notes"
import { ConsumeCallback } from "@/infrastructure/rabbitMQ"

export const listenForNotesHandler = async () => {
	try {
		const callback: ConsumeCallback = (msg, channel) => {
			if (msg !== null) {
				channel.ack(msg)
				logger.info(
					"callback for notes called:",
					msg.content.toString("utf8"),
				)
			} else {
				logger.error("'null' message in callback for notes:", msg)
			}
		}

		await notesService.listenForNotes(callback)
	} catch (err) {
		logger.error(err)
	}
}
