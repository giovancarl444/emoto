'use client'

import { useCart } from './CartProvider'
import { Icon } from '@/components/ui/Icon'

export function CartButton({ label }: { label: string }) {
  const { totalQuantity, open } = useCart()
  return (
    <button
      onClick={open}
      aria-label={`${label}${totalQuantity ? ` (${totalQuantity})` : ''}`}
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-sm text-text-strong transition-colors duration-1 hover:bg-surface"
    >
      <Icon name="cart" size={22} />
      {totalQuantity > 0 && (
        <span className="absolute right-1 top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-pill bg-signal px-1 font-mono text-[0.625rem] font-semibold leading-none text-on-signal">
          {totalQuantity}
        </span>
      )}
    </button>
  )
}
