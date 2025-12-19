'use client'

import {
	getOrderCartAction,
	removeMultipleOrderItemsAction,
} from '@/actions/orderActions'
import Loader from '@/components/Loader'
import { ProductCardProps } from '@/lib/types/product'
import { calculateFinalPrice } from '@/lib/utils/price/calculateFinalPrice'
import { useCartStore } from '@/store/cartStore'
import { useCallback, useEffect, useState } from 'react'
import CartHeader from './_components/CardHeader'
import CartControls from './_components/CartControls'
import CartSummary from './_components/CartSummary '
import CartItem from './_components/CartItem'
import { SelectedCartItem } from '@/lib/types/cart'

const CartPage = () => {
	// Состояние для отслеживания выбранных товаров (массив ID товаров)
	const [selectedItems, setSelectedItems] = useState<SelectedCartItem[]>([])
	// Состояние для хранения данных о товарах (объект, где ключи - ID товаров, значения - данные товаров)
	const [productsData, setProductsData] = useState<{
		[key: string]: ProductCardProps
	}>({})
	// Состояние для отслеживания удаленных товаров (чтобы скрыть их из интерфейса без немедленного удаления из store)
	const [removedItems, setRemovedItems] = useState<string[]>([])
	// Состояние загрузки данных корзины (показывает индикатор загрузки)
	const [isCartLoading, setIsCartLoading] = useState(true)
	// Получение данных корзины и функции обновления из глобального состояния (Zustand store)
	const { cartItems, updateCart } = useCartStore()
	// Фильтруем удаленные товары - показываем только те, что не в списке удаленных
	// Это оптимистичное обновление UI до подтверждения удаления с сервера
	const visibleCartItems = cartItems.filter(
		item => !removedItems.includes(`${item.productId}-${item.size}`)
	)

	// Асинхронная функция загрузки данных корзины и товаров
	const fetchCartAndProducts = async () => {
		setIsCartLoading(true) // Включаем индикатор загрузки
		try {
			// Загружаем актуальные данные корзины с сервера
			const cartItems = await getOrderCartAction()

			// ОБНОВЛЯЕМ STORE данными из сервера (синхронизируем локальное состояние с сервером)
			updateCart(cartItems)

			// Создаем массив промисов для параллельной загрузки данных о каждом товаре
			const productPromises = cartItems.map(async item => {
				try {
					// Запрашиваем данные товара по API
					const response = await fetch(`/api/products/${item.productId}`)
					const product = await response.json()
					return { productId: item.productId, product } // Возвращаем ID и данные товара
				} catch (error) {
					console.error(`Ошибка получения продукта ${item.productId}:`, error)
					return null // В случае ошибки возвращаем null
				}
			})

			// Ожидаем завершения всех запросов к API товаров
			const productsResults = await Promise.all(productPromises)
			const productsMap: { [key: string]: ProductCardProps } = {}

			// Преобразуем массив результатов в объект для быстрого доступа по ID товара
			productsResults.forEach(result => {
				if (result && result.product) {
					productsMap[result.productId] = result.product // Сохраняем товар по его ID
				}
			})

			setProductsData(productsMap) // Устанавливаем данные товаров в состояние
		} catch (error) {
			console.error('Ошибка получения данных корзины:', error)
		} finally {
			setIsCartLoading(false) // Выключаем индикатор загрузки в любом случае
		}
	}

	useEffect(() => {
		fetchCartAndProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Функция удаления выбранных товаров
	const handleRemoveSelected = async () => {
		if (selectedItems.length === 0) return // Выходим если нечего удалять

		// СРАЗУ убираем товары из рендеринга (оптимистичное обновление UI)
		const removedKeys = selectedItems.map(
			item => `${item.productId}-${item.size}`
		)
		setRemovedItems(prev => [...prev, ...removedKeys])

		const updatedCartItems = cartItems.filter(
			item =>
				!selectedItems.some(
					selected =>
						selected.productId === item.productId && selected.size === item.size
				)
		)
		updateCart(updatedCartItems) // Обновляем глобальное состояние

		try {
			const result = await removeMultipleOrderItemsAction(selectedItems)

			if (result.success) {
				setSelectedItems([])
				setRemovedItems([]) // ✅ Очищаем removedItems

				// Если корзина пуста - полная синхронизация
				if (updatedCartItems.length === 0) {
					await fetchCartAndProducts() // Перезагружаем с сервера
				}
			}
		} catch (error) {
			console.error('Ошибка удаления товаров:', error)
			// Откат изменений при ошибке - возвращаем товары в видимые
			setRemovedItems(prev => prev.filter(id => !removedKeys.includes(id)))
			updateCart(cartItems) // Восстанавливаем предыдущее состояние store
		}
	}

	// Выделить все товары в корзине
	const selectAllItems = () => {
		const allItems: SelectedCartItem[] = visibleCartItems.map(item => ({
			productId: item.productId,
			size: item.size,
		}))
		setSelectedItems(allItems)
	}

	// Снять выделение со всех товаров
	const deselectAllItems = () => {
		setSelectedItems([])
	}

	// Обработчик выбора/снятия выбора отдельного товара
	const handleItemSelection = useCallback(
		(productId: string, size: string, isSelected: boolean) => {
			const uniqueItem: SelectedCartItem = { productId, size }
			if (isSelected) {
				setSelectedItems(prev => {
					// Избегаем дубликатов
					if (
						prev.some(
							item => item.productId === productId && item.size === size
						)
					) {
						return prev
					}
					return [...prev, uniqueItem]
				})
			} else {
				setSelectedItems(prev =>
					prev.filter(
						item => !(item.productId === productId && item.size === size)
					)
				)
			}
		},
		[]
	)

	// Расчет общей стоимости ВСЕХ товаров в корзине
	const totalMaxPrice = visibleCartItems.reduce((total, item) => {
		const product = productsData[item.productId]
		if (!product) return total // Пропускаем если данные товара не загружены

		return total + product.basePrice
	}, 0)

	// Расчет общей стоимости скидок
	const totalDiscount = visibleCartItems.reduce((total, item) => {
		const product = productsData[item.productId]
		if (!product) return total

		const priceWithDiscount = calculateFinalPrice(
			product.basePrice,
			product.discountPercent || 0
		)

		// Скидка = (цена без карты - цена с картой) * количество
		const itemDiscount = product.basePrice - priceWithDiscount

		return total + itemDiscount
	}, 0)

	// Расчет общей стоимости ВСЕХ товаров в корзине с учетом скидки
	const totalPrice = visibleCartItems.reduce((total, item) => {
		const product = productsData[item.productId]
		if (!product) return total // Пропускаем если данные товара не загружены

		// Рассчитываем цену с учетом скидки на товар
		const finalPrice = calculateFinalPrice(
			product.basePrice,
			product.discountPercent || 0
		)

		return total + finalPrice
	}, 0)

	const isAllSelected =
		selectedItems.length > 0 &&
		selectedItems.length === visibleCartItems.length &&
		visibleCartItems.every(item =>
			selectedItems.some(
				selected =>
					selected.productId === item.productId && selected.size === item.size
			)
		)

	if (isCartLoading) {
		return <Loader />
	}

	if (visibleCartItems.length === 0 && removedItems.length === 0) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-2xl font-bold mb-8'>Корзина</h1>
				<div className='text-center py-12'>
					<p className='text-gray-500 text-lg'>Корзина пуста</p>
				</div>
			</div>
		)
	}

	return (
		<div className='px-[max(12px,calc((100%-1208px)/2))] md:px-[max(16px,calc((100%-1208px)/2))] text-main-text mx-auto'>
			<CartHeader itemCount={visibleCartItems.length} />

			<CartControls
				isAllSelected={isAllSelected}
				selectedItemsCount={selectedItems.length}
				onSelectAll={selectAllItems}
				onDeselectAll={deselectAllItems}
				onRemoveSelected={handleRemoveSelected}
			/>

			<div className='flex flex-col md:flex-row md:justify-between gap-8 xl:gap-x-15'>
				<div className='flex flex-col gap-y-6'>
					{visibleCartItems.map(item => (
						<CartItem
							key={`${item.productId}-${item.size}`}
							item={item}
							productData={productsData[item.productId]}
							isSelected={selectedItems.some(
								selected =>
									selected.productId === item.productId &&
									selected.size === item.size
							)}
							onSelectionChange={handleItemSelection}
						/>
					))}
				</div>

				<div className='flex flex-col gap-y-6 md:w-[255px] xl:w-[272px]'>
					<CartSummary
						visibleCartItems={visibleCartItems}
						totalPrice={totalPrice}
						totalMaxPrice={totalMaxPrice}
						totalDiscount={totalDiscount}
					/>
				</div>
			</div>
		</div>
	)
}

export default CartPage
