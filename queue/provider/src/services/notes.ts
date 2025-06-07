import { publish } from "@/infrastructure/rabbitMQ"

export const createNote = async (note: string) => {
	const message = {
		id: Math.floor(Math.random() * 999999),
		note,
	}
	await publish("notes", "main", "notes", JSON.stringify(message))
}

export default {
	createNote,
}
