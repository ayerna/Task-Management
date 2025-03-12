"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ClipboardList, Plus } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TaskFlow</span>
        </Link>
        <div className="flex items-center gap-4">
          {isHome && (
            <Link href="/tasks/new">
              <Button size="sm" className="btn-hover-effect">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

