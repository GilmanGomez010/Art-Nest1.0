import type React from "react"
import { MobileLayout } from "@/components/mobile-layout"
import { InstallPrompt } from "@/app/install-prompt"

export default function MobileAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MobileLayout>{children}</MobileLayout>
      <InstallPrompt />
    </>
  )
}
