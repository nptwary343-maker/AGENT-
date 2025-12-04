import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartStoreItem, CartTotals } from '@/types/cart'
import { calculateCartTotals } from '@/types/cart'

interface CartState {
  items: CartStoreItem[]
  isOpen: boolean
}

interface CartActions {
  addItem: (item: Omit<CartStoreItem, 'quantity'>, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotals: () => CartTotals
  getItemCount: () => number
  getItemQuantity: (productId: string) => number
}

type CartStore = CartState & CartActions

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // State
      items: [],
      isOpen: false,

      // Actions
      addItem: (item, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId
          )

          if (existingItem) {
            // Update quantity if item exists
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: Math.min(i.quantity + quantity, 99) }
                  : i
              ),
            }
          }

          // Add new item
          return {
            items: [...state.items, { ...item, quantity }],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.min(quantity, 99) }
              : i
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      getTotals: () => {
        return calculateCartTotals(get().items)
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((i) => i.productId === productId)
        return item?.quantity ?? 0
      },
    }),
    {
      name: 'asthar-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }), // Only persist items, not isOpen
    }
  )
)

// Selector hooks for optimized re-renders
export const useCartItems = () => useCartStore((state) => state.items)
export const useCartIsOpen = () => useCartStore((state) => state.isOpen)
export const useCartItemCount = () => useCartStore((state) => state.getItemCount())
