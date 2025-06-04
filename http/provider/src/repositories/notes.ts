import { prisma } from "@/common/prisma"
import { StaticRequestSchemaTypes } from "@/types/schemaBuilderTypeExtractor"
import notesValidator from "@/models/validators/notes"

export const getNotes = async (
	data: StaticRequestSchemaTypes<
		typeof notesValidator.getNotes
	>["querystring"],
) => {
	const notes = await prisma().note.findMany()
	// const notes = await prisma.note.findMany({
	// 	skip: data.page - 1,
	// 	take: data.perPage,
	// })

	return notes
}

export const createNote = async (
	data: StaticRequestSchemaTypes<typeof notesValidator.createNote>["body"],
) =>
	prisma().note.create({
		data,
	})

export default {
	createNote,
	getNotes,
}

// {"notes":
// 	[
// 		{"createdAt":"2025-05-22T21:17:39.252Z","id":1,"note":"Sample note content","owner":"test-owner","updatedAt":"2025-05-22T21:17:39.252Z"},{"createdAt":"2025-05-22T21:17:39.252Z","id":2,"note":"Sample note content","owner":"test-owner","updatedAt":"2025-05-22T21:17:39.252Z"}
// 	]
// }

// {
// 	notes: [
//       {
//         id: 1,
//         owner: 'test-owner',
//         note: 'Sample note content',
//         createdAt: 2025-05-22T21:17:39.252Z,
//         updatedAt: 2025-05-22T21:17:39.252Z
//       },
//       {
//         id: 2,
//         owner: 'test-owner',
//         note: 'Sample note content',
//         createdAt: 2025-05-22T21:17:39.252Z,
//         updatedAt: 2025-05-22T21:17:39.252Z
//       }
//     ]
// }
