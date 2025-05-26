/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from "jest"

import { coreConfig } from "../jest.config"

const config: Config = {
	...coreConfig,
	displayName: "contract",
	moduleNameMapper: {
		...coreConfig.moduleNameMapper,
		"^@/context$": "<rootDir>/test/context.ts",
	},
	reporters: [
		"default",
		[
			"jest-junit",
			{
				outputDirectory: "<rootDir>/test/contract/reports",
				outputName: "junit.xml",
			},
		],
	],
	rootDir: "../../",
	setupFilesAfterEnv: [
		...(coreConfig.setupFilesAfterEnv ?? []),
		"<rootDir>/test/context.ts",
		"<rootDir>/test/contract/jest.setup.ts",
	],
	testMatch: ["<rootDir>/test/contract/**/(*.)+test.[jt]s"],
	transform: {
		"^.+\\.(t|j)s$": [
			"ts-jest",
			{
				tsconfig: "<rootDir>/test/unit/tsconfig.json",
			},
		],
	},
}

export default config
