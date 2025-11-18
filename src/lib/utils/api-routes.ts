import { MongoClient, Db } from 'mongodb'

// Тип для расширения глобального объекта
type GlobalWithMongo = typeof globalThis & {
	_mongoClientPromise?: Promise<MongoClient>
}
const globalWithMongo = globalThis as GlobalWithMongo

// --- КОНФИГУРАЦИЯ ---
// Обязательные переменные окружения
const url = process.env.UNKNOWN_SHOP_DB_URL
const dbName = process.env.UNKNOWN_SHOP_DB_NAME

if (!url || !dbName) {
	throw new Error(
		'Please add your Mongo url (UNKNOWN_SHOP_DB_URL) and DB name (UNKNOWN_SHOP_DB_NAME) to environment variables.'
	)
}

// --- УПРАВЛЕНИЕ КЕШИРОВАНИЕМ ---

let clientPromise: Promise<MongoClient>

// Если promise соединения уже существует в глобальном кеше, используем его.
// Это критически важно для "теплых" Serverless-функций.
if (globalWithMongo._mongoClientPromise) {
	clientPromise = globalWithMongo._mongoClientPromise
} else {
	// Создаем новое соединение и кешируем его Promise в глобальном объекте.
	// Это предотвращает создание нового соединения при каждом вызове функции
	// в Production (Serverless) и Development режимах.
	const client = new MongoClient(url, {
		// Рекомендуемые опции для Serverless-среды для более быстрого
		// обнаружения ошибок соединения.
		serverSelectionTimeoutMS: 5000,
		maxPoolSize: 5, // Ограничение пула соединений
	})

	globalWithMongo._mongoClientPromise = client.connect()
	clientPromise = globalWithMongo._mongoClientPromise
}

/**
 * Возвращает кешированное соединение с базой данных.
 * Гарантирует, что TCP-соединение не устанавливается на каждый вызов Serverless-функции.
 * @returns {Promise<Db>} Объект базы данных
 */
export async function getDB(): Promise<Db> {
	const client = await clientPromise
	return client.db(dbName)
}
