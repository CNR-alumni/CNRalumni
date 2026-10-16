"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sizes = {
  default: "h-10 px-4 py-2", sm: "h-9 px-3 text-xs", lg: "h-11 px-6",
  xl: "h-12 px-8", xxl: "h-14 px-10", icon: "size-10 p-0",
}
const base = "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium outline-none transition-[transform,box-shadow,filter] focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"

export const buttonVariants = cva(base, {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:brightness-110",
      destructive: "bg-destructive text-destructive-foreground",
      cool: "border border-primary/30 bg-linear-to-t from-primary to-primary/80 text-primary-foreground shadow-md",
      outline: "border border-input bg-background text-foreground hover:bg-accent",
      secondary: "bg-secondary text-secondary-foreground hover:brightness-105",
      ghost: "text-foreground hover:bg-accent", link: "text-primary underline-offset-4 hover:underline",
    },
    size: sizes,
  },
  defaultVariants: { variant: "default", size: "default" },
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp ref={ref} type={asChild ? undefined : (type ?? "button")} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  },
)
Button.displayName = "Button"

export const liquidbuttonVariants = cva(cn(base, "liquid-glass-button"), {
  variants: {
    variant: {
      default: "text-primary", destructive: "liquid-glass-button--destructive text-destructive-foreground",
      outline: "text-foreground", secondary: "liquid-glass-button--secondary text-secondary-foreground",
      ghost: "text-foreground", link: "text-primary underline-offset-4 hover:underline",
    },
    size: sizes,
  },
  defaultVariants: { variant: "default", size: "xxl" },
})
export type LiquidButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof liquidbuttonVariants> & { asChild?: boolean; refraction?: boolean }

/** Slot receives exactly one child; decorative layers are CSS pseudo-elements. */
export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant, size, asChild = false, children, type, refraction = false, style, ...props }, ref) => {
    const id = `liquid-glass-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
    const Comp = asChild ? Slot : "button"
    const glassStyle = { ...style, ...(refraction ? { "--liquid-filter": `url("#${id}")` } : {}) } as React.CSSProperties
    return <>
      <Comp ref={ref} type={asChild ? undefined : (type ?? "button")} data-slot="button"
        className={cn(liquidbuttonVariants({ variant, size, className }))} style={glassStyle} {...props}>
        {children}
      </Comp>
      {refraction && <GlassFilter id={id} />}
    </>
  },
)
LiquidButton.displayName = "LiquidButton"

/** Unique IDs prevent collisions when several buttons share one page. */
export function GlassFilter({ id }: { id: string }) {
  return <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute", pointerEvents: "none" }}>
    <defs><filter id={id} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="noise" />
      <feGaussianBlur in="noise" stdDeviation="2" result="softNoise" />
      <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="8" xChannelSelector="R" yChannelSelector="B" result="displaced" />
      <feGaussianBlur in="displaced" stdDeviation="2" />
    </filter></defs>
  </svg>
}

type ColorVariant = "default" | "primary" | "success" | "error" | "gold" | "bronze"
export interface MetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: ColorVariant }
/** CSS :active/:hover supports touch, keyboard and user event handlers without extra state. */
export const MetalButton = React.forwardRef<HTMLButtonElement, MetalButtonProps>(
  ({ children, className, variant = "default", type = "button", ...props }, ref) => (
    <button ref={ref} type={type} data-metal={variant} className={cn(base, "metal-button h-11 px-6", className)} {...props}>
      {children ?? "Button"}
    </button>
  ),
)
MetalButton.displayName = "MetalButton"
