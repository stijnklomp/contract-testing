import { prisma } from "@/common/prisma"
import { StaticRequestSchemaTypes } from "@/types/schemaBuilderTypeExtractor"
import notesValidator from "@/models/validators/notes"

export const createNote = async (
	data: StaticRequestSchemaTypes<typeof notesValidator.createNote>["body"],
) =>
	prisma.note.create({
		data,
	})

export default {
	createNote,
}
