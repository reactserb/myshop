import ProductsSection from '@/app/(products)/ProductsSection'
import { ProductCardProps } from '@/lib/types/product'
import { getDB } from '@/lib/utils/api-routes'
import { getServerUserId } from '@/lib/utils/getServerUserId'
import { ObjectId } from 'mongodb'
import Link from 'next/link'

const FavoritesPage = async () => {
	const userId = await getServerUserId()

	if (!userId) {
		return (
			<div className='px-4 md:px-6 xl:px-8 py-12'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>
						Войдите в аккаунт
					</h2>
					<p className='text-gray-600'>
						<Link
							href='/login'
							className='font-semibold text-red-500 hover:text-teal-500 duration-200'
						>
							Авторизуйтесь
						</Link>
						, чтобы увидеть избранное
					</p>
				</div>
			</div>
		)
	}

	const db = await getDB()

	const user = await db.collection('user').findOne({
		_id: new ObjectId(userId as string),
	})

	if (!user?.favorites?.length) {
		return (
			<div className='px-4 md:px-6 xl:px-8 py-12'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>
						Избранное пусто
					</h2>
					<p className='text-gray-600'>
						Добавьте товары в избранное, чтобы увидеть их здесь
					</p>
				</div>
			</div>
		)
	}

	const favoriteProductIds = user.favorites.map((id: string) => Number(id))

	const favoriteProducts = (await db
		.collection('products')
		.find({
			id: { $in: favoriteProductIds },
		})
		.toArray()) as unknown as ProductCardProps[]

	return <ProductsSection title='' products={favoriteProducts} favorites />
}

export default FavoritesPage
