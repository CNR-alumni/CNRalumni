import { ArrowUpRight, Users } from "lucide-react"
import { LiquidButton, MetalButton } from "@/components/ui/liquid-glass-button"

export default function DemoOne() {
  return (
    <div className="flex min-h-52 flex-wrap items-center justify-center gap-4 p-6">
      <LiquidButton asChild size="xl">
        <a href="#join"><Users data-icon="inline-start" />เข้าร่วมชุมชน<ArrowUpRight data-icon="inline-end" /></a>
      </LiquidButton>
      <LiquidButton asChild variant="outline" size="xl"><a href="#generations">สำรวจรุ่นของคุณ</a></LiquidButton>
      <MetalButton variant="gold">CNR Alumni</MetalButton>
    </div>
  )
}
