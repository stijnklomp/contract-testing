import axios from "axios"

import { StaticRequestSchemaTypes } from "@/types/schemaBuilderTypeExtractor"
import noteValidator from "@/models/validators/notes"
import notesRepository from "@/repositories/notes"

export const getNotes = async () => {
	const response = await axios.get(
		`${process.env.NOTES_API_URL}/notes?page=1&perPage=10`,
	)

	return response.data
}

export const createNote = async (
	data: StaticRequestSchemaTypes<typeof noteValidator.createNote>["body"],
) => await notesRepository.createNote(data)

export default {
	createNote,
	getNotes,
}
