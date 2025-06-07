import { logger } from "@/common/logger"
import notesService from "@/services/notes"

export const createNoteHandler = async () => {
	try {
		await notesService.createNote("Sample note content")
	} catch (err) {
		logger.error(err)
	}
}
