import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arestora Hub',
  description: 'Panel de control — Grupo Arestora',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
