import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			// Отключаем стандартное правило, чтобы избежать конфликтов с TS версией
			'no-unused-vars': 'off',

			// Настраиваем TypeScript версию правила
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					// Игнорируем переменные, начинающиеся с _ (для деструктуризации)
					varsIgnorePattern: '^_',

					// Игнорируем аргументы, начинающиеся с _ (для функций)
					argsIgnorePattern: '^_',
				},
			],
		},
	},
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'next-env.d.ts',
		],
	},
]

export default eslintConfig
