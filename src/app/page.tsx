'use client'

import { useState } from 'react'

const verticales = [
  {
    id: 'deporte',
    nombre: 'DeporteSeguro®',
    descripcion: 'Protección de menores en entidades deportivas. Cumplimiento LOPIVI.',
    url: 'https://backtowin-chatbot.vercel.app',
    activo: true,
    icono: '⚽',
  },
  {
    id: 'educa',
    nombre: 'EducaSeguro®',
    descripcion: 'Protección de menores en centros educativos y colegios.',
    url: null,
    activo: false,
    icono: '🎓',
  },
  {
    id: 'concello',
    nombre: 'ConcelloSeguro®',
    descripcion: 'Protección de menores en ayuntamientos y concellos.',
    url: null,
    activo: false,
    icono: '🏛️',
  },
  {
    id: 'ocio',
    nombre: 'OcioSeguro®',
    descripcion: 'Protección de menores en empresas de ocio y tiempo libre.',
    url: null,
    activo: false,
    icono: '🎡',
  },
  {
    id: 'campamento',
    nombre: 'CampamentoSeguro®',
    descripcion: 'Protección de menores en campamentos y colonias.',
    url: null,
    activo: false,
    icono: '⛺',
  },
  {
    id: 'extraescolar',
    nombre: 'ExtraescolarSeguro®',
    descripcion: 'Protección de menores en actividades extraescolares.',
    url: null,
    activo: false,
    icono: '🎨',
  },
  {
    id: 'social',
    nombre: 'SocialSeguro®',
    descripcion: 'Protección de menores en entidades sociales y ONGs.',
    url: null,
    activo: false,
    icono: '🤝',
  },
]

export default function Home() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <main className="min-h-screen" style={{ background: '#EEF4FC', fontFamily: 'Tahoma, sans-serif' }}>

      {/* HEADER */}
      <header style={{ background: '#003B8E' }} className="px-8 py-5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div style={{ background: '#1A5FC8', borderRadius: 8 }} className="px-4 py-2">
            <span className="text-white font-bold text-xl tracking-widest">ARESTORA HUB</span>
          </div>
          <span className="text-blue-200 text-sm hidden md:block">Panel de control — Grupo Arestora</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-blue-300 text-sm">backtowin@grupoarestora.com</span>
          <div style={{ background: '#1A5FC8', borderRadius: '50%' }} className="w-9 h-9 flex items-center justify-center">
            <span className="text-white font-bold text-sm">JA</span>
          </div>
        </div>
      </header>

      {/* HERO BAND */}
      <div style={{ background: '#1A5FC8' }} className="px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-2xl mb-1">Arestora Segura®</h2>
            <p className="text-blue-100 text-sm">Plataforma de bienestar y protección de menores — Verticales activas y en desarrollo</p>
          </div>
          <div className="hidden md:flex gap-6">
            <div className="text-center">
              <div className="text-white font-bold text-2xl">1</div>
              <div className="text-blue-200 text-xs">Vertical activa</div>
            </div>
            <div style={{ width: 1, background: '#4A90D9' }} />
            <div className="text-center">
              <div className="text-white font-bold text-2xl">6</div>
              <div className="text-blue-200 text-xs">En desarrollo</div>
            </div>
            <div style={{ width: 1, background: '#4A90D9' }} />
            <div className="text-center">
              <div className="text-white font-bold text-2xl">2026</div>
              <div className="text-blue-200 text-xs">Año de lanzamiento</div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID DE VERTICALES */}
      <section className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticales.map((v) => (
            <div
              key={v.id}
              onMouseEnter={() => setHoveredId(v.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: '#fff',
                borderRadius: 12,
                border: v.activo
                  ? `2px solid ${hoveredId === v.id ? '#003B8E' : '#1A5FC8'}`
                  : '2px solid #D6E4F7',
                opacity: v.activo ? 1 : 0.7,
                transform: hoveredId === v.id && v.activo ? 'translateY(-4px)' : 'none',
                transition: 'all 0.2s ease',
                cursor: v.activo ? 'pointer' : 'default',
                boxShadow: hoveredId === v.id && v.activo
                  ? '0 8px 32px rgba(0,59,142,0.15)'
                  : '0 2px 8px rgba(0,0,0,0.06)',
              }}
              className="p-6 flex flex-col gap-4"
              onClick={() => v.activo && v.url && window.open(v.url, '_blank')}
            >
              {/* Cabecera tarjeta */}
              <div className="flex items-start justify-between">
                <div
                  style={{
                    background: v.activo ? '#003B8E' : '#D6E4F7',
                    borderRadius: 10,
                    width: 48,
                    height: 48,
                  }}
                  className="flex items-center justify-center text-2xl flex-shrink-0"
                >
                  {v.icono}
                </div>
                <span
                  style={{
                    background: v.activo ? '#003B8E' : '#EEF4FC',
                    color: v.activo ? '#fff' : '#6B8EBF',
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 'bold',
                    padding: '3px 10px',
                    letterSpacing: 1,
                  }}
                >
                  {v.activo ? 'ACTIVO' : 'PRÓXIMAMENTE'}
                </span>
              </div>

              {/* Nombre y descripción */}
              <div>
                <h3
                  style={{
                    color: v.activo ? '#003B8E' : '#6B8EBF',
                    fontWeight: 'bold',
                    fontSize: 17,
                    marginBottom: 6,
                  }}
                >
                  {v.nombre}
                </h3>
                <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>
                  {v.descripcion}
                </p>
              </div>

              {/* Botón */}
              {v.activo ? (
                <div
                  style={{
                    background: hoveredId === v.id ? '#003B8E' : '#1A5FC8',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '10px 0',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 13,
                    marginTop: 'auto',
                    transition: 'background 0.2s',
                    letterSpacing: 0.5,
                  }}
                >
                  Acceder al panel →
                </div>
              ) : (
                <div
                  style={{
                    background: '#EEF4FC',
                    color: '#9BB5D6',
                    borderRadius: 8,
                    padding: '10px 0',
                    textAlign: 'center',
                    fontSize: 13,
                    marginTop: 'auto',
                    letterSpacing: 0.5,
                  }}
                >
                  En desarrollo
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#003B8E', borderTop: '3px solid #1A5FC8' }} className="px-8 py-5 mt-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-blue-200 text-sm">© 2026 Grupo Arestora — Uso interno exclusivo</span>
          <span className="text-blue-300 text-xs">Arestora Hub v1.0</span>
        </div>
      </footer>

    </main>
  )
}
