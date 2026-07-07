'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

/**
 * Client cart. State lives on the client (instant, reactive) and persists to
 * localStorage so a refresh keeps the cart. The BUY is real: checkout POSTs the
 * lines to /api/checkout, which builds a Shopify cart and returns the hosted
 * secure checkout URL (or a mock summary when Shopify is unconfigured).
 */
export interface CartItem {
  variantId: string
  quantity: number
  title: string
  subtitle?: string
  image?: string
  unitPriceSek: number
  href: string
  shopifyVariantId?: string
}

interface CartState {
  items: CartItem[]
  totalQuantity: number
  subtotalSek: number
  isOpen: boolean
  add: (item: CartItem) => void
  setQty: (variantId: string, quantity: number) => void
  remove: (variantId: string) => void
  clear: () => void
  open: () => void
  close: () => void
}

const CartCtx = createContext<CartState | null>(null)
const STORAGE_KEY = 'emoto_cart_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.variantId === item.variantId)
      if (i === -1) return [...prev, item]
      const next = [...prev]
      next[i] = { ...next[i], quantity: next[i].quantity + item.quantity }
      return next
    })
    setIsOpen(true)
  }, [])

  const setQty = useCallback((variantId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((x) => x.variantId !== variantId)
        : prev.map((x) => (x.variantId === variantId ? { ...x, quantity } : x)),
    )
  }, [])

  const remove = useCallback(
    (variantId: string) => setItems((prev) => prev.filter((x) => x.variantId !== variantId)),
    [],
  )
  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<CartState>(() => {
    const totalQuantity = items.reduce((n, x) => n + x.quantity, 0)
    const subtotalSek = items.reduce((n, x) => n + x.unitPriceSek * x.quantity, 0)
    return {
      items,
      totalQuantity,
      subtotalSek,
      isOpen,
      add,
      setQty,
      remove,
      clear,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }
  }, [items, isOpen, add, setQty, remove, clear])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
