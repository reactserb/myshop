const VIEWED_PRODUCTS_KEY = 'viewed_products'
const MAX_HISTORY_SIZE = 10 // Храним до 10 последних товаров

export function getRecentlyViewedProductIds(isAuth: boolean): string[] {
    if (typeof window === 'undefined') return []
    
    const key = isAuth ? 'viewed_products_auth' : 'viewed_products_guest'
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : []
}

export function addProductToViewed(productId: string, isAuth: boolean) {
    if (typeof window === 'undefined') return
    
    const key = isAuth ? 'viewed_products_auth' : 'viewed_products_guest'
    let viewedIds = getRecentlyViewedProductIds(isAuth)
    
    viewedIds = viewedIds.filter(id => id !== productId)
    viewedIds.unshift(productId)
    viewedIds = viewedIds.slice(0, MAX_HISTORY_SIZE)
    
    localStorage.setItem(key, JSON.stringify(viewedIds))
}