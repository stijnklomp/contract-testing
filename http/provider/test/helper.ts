import fastify, { FastifyServerOptions, FastifyInstance } from "fastify"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import autoLoad from "@fastify/autoload"
import path from "path"

import { options } from "@/src/app"

export const build = (overrideOptions: Partial<FastifyServerOptions> = {}) => {
	let fastifySetup: FastifyInstance

	beforeAll(async () => {
		console.log("BEFORE ALL B1")
		// fastifySetup = fastify({
		// 	...options,
		// 	...overrideOptions,
		// })
		fastifySetup = fastify({
			...options,
			...overrideOptions,
		}).withTypeProvider<TypeBoxTypeProvider>()

		// await fastifySetup.register(autoLoad, {
		// 	dir: path.join(__dirname, "../src/config"),
		// })
		await fastifySetup.register(autoLoad, {
			dir: path.join(__dirname, "../src/plugins"),
		})
		await fastifySetup.register(autoLoad, {
			dir: path.join(__dirname, "../src/routes"),
		})
		console.log("routes registered")
	})

	afterAll(async () => {
		await fastifySetup.close()
	})

	return () => fastifySetup
}

/**
 * Give any asynchronous handlers a tick to run.
 */
export const runAsyncHandlers = async () => new Promise((r) => setImmediate(r))

let originalProcessExit: typeof process.exit

export const mockProcessExit = () => {
	originalProcessExit = process.exit.bind(process)
	process.exit = jest.fn() as never
}

/**
 * @remarks Called after `mockProcessExit`.
 */
export const restoreProcessExit = () => {
	process.exit = originalProcessExit
}

const originalEnv = { ...process.env }

export const restoreEnvVars = () => (process.env = originalEnv)
