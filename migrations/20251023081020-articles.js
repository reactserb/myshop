const articles = require('./articles.json')

module.exports = {
	async up(db) {
		await db.collection('articles').insertMany(articles)
	},

	// async down(db) {},
}
