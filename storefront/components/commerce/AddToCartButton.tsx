'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useCart, type CartItem } from './CartProvider'

export function AddToCartButton({
  item,
  label,
  variant = 'signal',
  size = 'lg',
  fullWidth,
  disabled,
}: {
  item: CartItem
  label: string
  variant?: 'signal' | 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
}) {
  const { add } = useCart()
  const [busy, setBusy] = useState(false)

  return (
    <Button
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      iconRight="cart"
      loading={busy}
      disabled={disabled}
      onClick={() => {
        setBusy(true)
        add(item)
        // brief affordance; cart drawer opens via provider
        setTimeout(() => setBusy(false), 350)
      }}
    >
      {label}
    </Button>
  )
}
