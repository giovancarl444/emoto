import type { ReactElement, SVGProps } from 'react'

/**
 * Inline stroke-icon set (24×24, 1.6 stroke). Inline = no icon-font FOUT, no
 * extra request, tree-shaken. currentColor so icons inherit text color.
 */
export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'chevron-down'
  | 'chevron-right'
  | 'cart'
  | 'check'
  | 'bolt'
  | 'shield'
  | 'truck'
  | 'menu'
  | 'close'
  | 'plus'
  | 'minus'
  | 'star'
  | 'globe'
  | 'wrench'
  | 'gauge'
  | 'info'
  | 'file-check'

const PATHS: Record<IconName, ReactElement> = {
  'arrow-right': <path d="M4 12h15M13 6l6 6-6 6" />,
  'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  cart: (
    <>
      <path d="M3 4h2l2.4 12.2a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" />
      <circle cx="9" cy="20" r="1.2" />
      <circle cx="18" cy="20" r="1.2" />
    </>
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  shield: <path d="M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6l-7-3Z" />,
  truck: (
    <>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  star: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7L7.5 19.6l1-5.8L4.2 9.7l5.9-.9z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9s1-6.5 3.5-9Z" />
    </>
  ),
  wrench: <path d="M15 4a5 5 0 0 0-5.5 6.5L4 16v4h4l5.5-5.5A5 5 0 0 0 20 9l-3 3-2-2 3-3a5 5 0 0 0-3-3Z" />,
  gauge: (
    <>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="M12 14l4-4" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  'file-check': (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
}

export function Icon({ name, size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  )
}
