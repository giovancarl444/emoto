import Image, { type ImageProps } from 'next/image'

/**
 * Thin wrapper over next/image. Vector SVGs (the current placeholder catalogue)
 * are served raw — the image optimizer gives them no benefit and can cold-start
 * flake on complex SVGs. Real raster photography (Shopify CDN) still flows
 * through the optimizer (AVIF/WebP, responsive sizes) exactly as before.
 */
export function Media(props: ImageProps) {
  const isSvg = typeof props.src === 'string' && props.src.endsWith('.svg')
  return <Image {...props} unoptimized={props.unoptimized ?? isSvg} />
}
