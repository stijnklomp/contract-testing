import tseslint from "typescript-eslint"
import config from "stijnklomp-linting-formatting-config/dist/index.js"
import { includeIgnoreFile } from "@eslint/compat"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const gitignorePath = path.resolve(__dirname, ".gitignore")

const finalConfig = config({
	strict: true,
	tsconfigRootDir: ".",
	typescript: true,
})

const addedConfigs = [
	{
		files: ["test/unit/**/*.ts"],
		name: "Typescript -> Unit tests",
		rules: {
			"@typescript-eslint/no-unsafe-assignment": "off", // Disabled for tests to avoid verbose type casting when using Jest mocks
			"@typescript-eslint/unbound-method": "off",
		},
	},
	{
		files: ["test/contract/**/*.ts"],
		name: "Typescript -> Contract tests",
		rules: {
			"@typescript-eslint/naming-convention": "off",
			"jest/expect-expect": "off",
		},
	},
]

finalConfig.push(...addedConfigs)

finalConfig.push(includeIgnoreFile(gitignorePath), {
	ignores: [
		".husky/*",
		"prisma/*",
		"rabbitmq/*",
		"dagger/sdk/*",
		"test/acceptance/reports/*",
		"test/combined-coverage/*",
		"secrets/*",
	],
})

export default tseslint.config(finalConfig)
