import { StaticRequestSchemaTypes } from "@/types/schemaBuilderTypeExtractor"
import noteValidator from "@/models/validators/notes"
import notesRepository from "@/repositories/notes"
import { consume, ConsumeCallback } from "@/infrastructure/rabbitMQ"

export const listenForNotes = async (callback: ConsumeCallback) => {
	await consume(
		"notes",
		"contractTesting.notes",
		{
			main: "notes",
		},
		callback,
	)
}

export const createNote = async (
	data: StaticRequestSchemaTypes<typeof noteValidator.createNote>["body"],
) => await notesRepository.createNote(data)

export default {
	createNote,
	listenForNotes,
}
