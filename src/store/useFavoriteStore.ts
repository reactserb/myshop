import { create } from 'zustand'

interface FavoriteStore {
	favorites: string[]
	isLoaded: boolean
	setFavorites: (ids: string[]) => void
	addFavorite: (id: string) => void
	removeFavorite: (id: string) => void
	setIsLoaded: (status: boolean) => void
}

export const useFavoriteStore = create<FavoriteStore>(set => ({
	favorites: [],
	isLoaded: false,
	setFavorites: ids => set({ favorites: ids, isLoaded: true }),
	addFavorite: id => set(state => ({ favorites: [...state.favorites, id] })),
	removeFavorite: id =>
		set(state => ({
			favorites: state.favorites.filter(favId => favId !== id),
		})),
	setIsLoaded: status => set({ isLoaded: status }),
}))
