import { MongoClient } from 'mongodb'

const url = process.env.UNKNOWN_SHOP_DB_URL

if (!url) {
	throw new Error('Please add your Mongo url to .env')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
	// В режиме разработки используем глобальный объект, чтобы сохранить
	// кэшированное соединение между перезапусками.
	// Это предотвращает слишком много соединений с базой данных.
	const globalWithMongo = global as typeof globalThis & {
		_mongoClientPromise?: Promise<MongoClient>
	}
	if (!globalWithMongo._mongoClientPromise) {
		client = new MongoClient(url)
		globalWithMongo._mongoClientPromise = client.connect()
	}
	clientPromise = globalWithMongo._mongoClientPromise
} else {
	// В режиме продакшена не используем глобальный объект.
	// Это хорошая практика, так как глобальный объект
	// не сохраняется между перезапусками.
	client = new MongoClient(url)
	clientPromise = client.connect()
}

export async function getDB() {
	return (await clientPromise).db(process.env.UNKNOWN_SHOP_DB_NAME!)
}
