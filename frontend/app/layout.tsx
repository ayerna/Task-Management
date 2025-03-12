import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/lib/provider"
import type React from "react"

// Define fonts
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "TaskFlow | Manage Your Tasks Efficiently",
  description: "A beautiful task management application built with Next.js and Redux Toolkit",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReduxProvider>
            <div className="flex min-h-screen flex-col">{children}</div>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'