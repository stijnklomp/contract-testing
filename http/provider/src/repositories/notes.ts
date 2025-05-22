import { prisma } from "@/common/prisma"
import { StaticRequestSchemaTypes } from "@/types/schemaBuilderTypeExtractor"
import notesValidator from "@/models/validators/notes"

export const getNotes = async (
	data: StaticRequestSchemaTypes<
		typeof notesValidator.getNotes
	>["querystring"],
) => {
	console.log("getNotes")
	const notes = prisma.note.findMany({
		skip: data.page - 1,
		take: data.perPage,
	})
	console.log("getNotes notes:", notes)

	return notes
}

export const createNote = async (
	data: StaticRequestSchemaTypes<typeof notesValidator.createNote>["body"],
) =>
	prisma.note.create({
		data,
	})

export default {
	createNote,
	getNotes,
}
