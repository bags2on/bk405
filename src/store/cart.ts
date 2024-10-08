import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CartItem = {
  productId: string
  amount: number
}

type CartState = {
  cartAmount: () => number
  cartItems: CartItem[]
}

type CartActions = {
  addItem: (item: CartItem) => void
  clear: () => void
  remove: (id: string) => void
  updateAmount: (id: string, amount: number) => void
}

export const normalizedView = (cartItems: CartItem[]) => {
  const cartMap: Record<string, number> = {}

  const normalizedData = cartItems.reduce((acc, { productId, amount }) => {
    if (acc[productId]) {
      acc[productId] = acc[productId] += amount
      return acc
    }

    acc[productId] = amount

    return acc
  }, cartMap)

  return normalizedData
}

export const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      cartItems: [],
      cartAmount: () => get().cartItems.reduce((acc, p) => acc + p.amount, 0),
      addItem: (newItem: CartItem) =>
        set((state) => {
          const cartItems = [...state.cartItems]

          const itemIndex = cartItems.findIndex(
            (cartItem) => cartItem.productId === newItem.productId
          )

          if (itemIndex >= 0) {
            cartItems[itemIndex].amount += newItem.amount
          } else {
            cartItems.push({ ...newItem })
          }

          return {
            cartItems
          }
        }),
      updateAmount: (id: string, amount: number) =>
        set((state) => {
          const cartItems = [...state.cartItems]
          const itemIndex = cartItems.findIndex((cartItem) => cartItem.productId === id)

          if (itemIndex >= 0) cartItems[itemIndex].amount = amount

          return {
            cartItems
          }
        }),
      remove: (id: string) =>
        set((state) => ({
          cartItems: state.cartItems.filter((cartItem) => cartItem.productId !== id)
        })),
      clear: () =>
        set(() => ({
          cartItems: []
        }))
    }),
    {
      name: '_cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true
    }
  )
)
