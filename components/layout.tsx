import React from "react"
import { Sidebar } from "./sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <main className="relative max-w-screen-xl px-4 py-10 mx-auto md:flex md:py-10 md:flex-row">
      <Sidebar />
      {children}
    </main>
  )
}