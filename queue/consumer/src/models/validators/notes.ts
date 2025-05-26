import { Type } from "@sinclair/typebox"

export const createNote = {
	body: Type.Object({
		note: Type.String({ maxLength: 300 }),
		owner: Type.String({ maxLength: 100 }),
	}),
}

export default {
	createNote,
}
