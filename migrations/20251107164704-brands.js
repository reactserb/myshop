const brands = require('./brands.json')

module.exports = {
	async up(db) {
		await db.collection('brands').insertMany(brands)
	},

	// async down(db) {},
}
