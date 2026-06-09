'use client'

import { useState } from 'react'

const DRIVE = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w200`

const verticalesSegura = [
  {
    id: 'deporte',
    nombre: 'DeporteSeguro®',
    descripcion: 'Protección de menores en entidades deportivas. Cumplimiento LOPIVI.',
    url: 'https://backtowin-chatbot.vercel.app',
    activo: true,
    logo: DRIVE('1jFaxAIVEVh9wxbwZGhH0p_JUt8muQiOe'),
    paleta: { dark: '#843C0C', mid: '#C55A11', light: '#F4CEAE', suave: '#FDF1E8' },
  },
  {
    id: 'educa',
    nombre: 'EducaSeguro®',
    descripcion: 'Protección de menores en centros educativos y colegios.',
    url: null,
    activo: false,
    logo: DRIVE('1OIlX5OHakugTmHzCtKlComJ8RymEILDk'),
    paleta: { dark: '#003B8E', mid: '#1A5FC8', light: '#D6E4F7', suave: '#EEF4FC' },
  },
  {
    id: 'concello',
    nombre: 'ConcelloSeguro®',
    descripcion: 'Protección de menores en ayuntamientos y concellos.',
    url: null,
    activo: false,
    logo: DRIVE('1yQ5Y5YcadOHYQqZrRI-J8AXqYm86QGuZ'),
    paleta: { dark: '#003B8E', mid: '#1A5FC8', light: '#D6E4F7', suave: '#EEF4FC' },
  },
  {
    id: 'ocio',
    nombre: 'OcioSeguro®',
    descripcion: 'Protección de menores en empresas de ocio y tiempo libre.',
    url: null,
    activo: false,
    logo: DRIVE('1ApFF2eF5R0gCOWEZWdS9kAc_uyiUMxxL'),
    paleta: { dark: '#003B8E', mid: '#1A5FC8', light: '#D6E4F7', suave: '#EEF4FC' },
  },
  {
    id: 'campamento',
    nombre: 'CampamentoSeguro®',
    descripcion: 'Protección de menores en campamentos y colonias.',
    url: null,
    activo: false,
    logo: DRIVE('1E4EyRrOGlBCmfRWVW3swGdZQyNKiil-K'),
    paleta: { dark: '#003B8E', mid: '#1A5FC8', light: '#D6E4F7', suave: '#EEF4FC' },
  },
  {
    id: 'extraescolar',
    nombre: 'ExtraescolarSeguro®',
    descripcion: 'Protección de menores en actividades extraescolares.',
    url: null,
    activo: false,
    logo: null,
    paleta: { dark: '#003B8E', mid: '#1A5FC8', light: '#D6E4F7', suave: '#EEF4FC' },
  },
  {
    id: 'social',
    nombre: 'SocialSeguro®',
    descripcion: 'Protección de menores en entidades sociales y ONGs.',
    url: null,
    activo: false,
    logo: null,
    paleta: { dark: '#003B8E', mid: '#1A5FC8', light: '#D6E4F7', suave: '#EEF4FC' },
  },
]

const AZUL =   { dark: '#003B8E', mid: '#1A5FC8', light: '#D6E4F7', suave: '#EEF4FC' }
const VERDE =  { dark: '#5B2D8E', mid: '#7B4DB8', light: '#DDD0F0', suave: '#F3EEF9' }
const MORADO = { dark: '#1A5C2E', mid: '#2E8B4A', light: '#C8E6D0', suave: '#EEF7F1' }
const ARESJOBS = { dark: '#1a2a4a', mid: '#2563eb', light: '#bfdbfe', suave: '#eff6ff' }

type Paleta = { dark: string; mid: string; light: string; suave: string }

function LogoOrEmoji({
  logo, icono, activo, paleta,
}: {
  logo: string | null; icono: string; activo: boolean; paleta: Paleta
}) {
  const [err, setErr] = useState(false)
  if (logo && !err) {
    return (
      <div style={{
        borderRadius: 10, width: 64, height: 64, overflow: 'hidden',
        background: activo ? paleta.suave : paleta.light,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <img
          src={logo}
          alt=""
          onError={() => setErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 6 }}
        />
      </div>
    )
  }
  return (
    <div style={{
      background: activo ? paleta.dark : paleta.light,
      borderRadius: 10, width: 64, height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 26, flexShrink: 0,
    }}>
      {icono}
    </div>
  )
}

function VerticalCard({ v }: {
  v: typeof verticalesSegura[0]
}) {
  const [hovered, setHovered] = useState(false)
  const p = v.paleta
  const emojiMap: Record<string, string> = {
    deporte: '⚽', educa: '🎓', concello: '🏛️',
    ocio: '🎡', campamento: '⛺', extraescolar: '🎨', social: '🤝',
  }
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => v.activo && v.url && window.open(v.url, '_blank')}
      style={{
        background: '#fff',
        borderRadius: 12,
        border: v.activo
          ? `2px solid ${hovered ? p.dark : p.mid}`
          : `2px solid ${p.light}`,
        opacity: v.activo ? 1 : 0.72,
        transform: hovered && v.activo ? 'translateY(-4px)' : 'none',
        transition: 'all 0.2s ease',
        cursor: v.activo ? 'pointer' : 'default',
        boxShadow: hovered && v.activo
          ? `0 8px 32px ${p.dark}26`
          : '0 2px 8px rgba(0,0,0,0.06)',
      }}
      className="p-6 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <LogoOrEmoji
          logo={v.logo}
          icono={emojiMap[v.id] ?? '🔹'}
          activo={v.activo}
          paleta={p}
        />
        <span style={{
          background: v.activo ? p.dark : p.suave,
          color: v.activo ? '#fff' : p.mid,
          borderRadius: 20, fontSize: 11, fontWeight: 'bold',
          padding: '3px 10px', letterSpacing: 1, whiteSpace: 'nowrap',
          alignSelf: 'flex-start',
        }}>
          {v.activo ? 'ACTIVO' : 'PRÓXIMAMENTE'}
        </span>
      </div>
      <div>
        <h3 style={{ color: v.activo ? p.dark : p.mid, fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>
          {v.nombre}
        </h3>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>{v.descripcion}</p>
      </div>
      {v.activo ? (
        <div style={{
          background: hovered ? p.dark : p.mid,
          color: '#fff', borderRadius: 8, padding: '10px 0',
          textAlign: 'center', fontWeight: 'bold', fontSize: 13,
          marginTop: 'auto', transition: 'background 0.2s', letterSpacing: 0.5,
        }}>
          Acceder al panel →
        </div>
      ) : (
        <div style={{
          background: p.suave, color: p.mid, borderRadius: 8,
          padding: '10px 0', textAlign: 'center', fontSize: 13,
          marginTop: 'auto', letterSpacing: 0.5,
        }}>
          En desarrollo
        </div>
      )}
    </div>
  )
}

function BloqueCard({
  logo, icono, nombre, descripcion, estado, paleta,
}: {
  logo: string | null; icono: string; nombre: string
  descripcion: string; estado: string; paleta: Paleta
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 12,
        border: `2px solid ${hovered ? paleta.dark : paleta.light}`,
        opacity: 0.8, transition: 'all 0.2s ease',
        boxShadow: hovered ? `0 8px 32px ${paleta.dark}20` : '0 2px 8px rgba(0,0,0,0.06)',
      }}
      className="p-6 flex flex-col gap-4"
    >
      <div className="flex items-start justify-between gap-3">
        <LogoOrEmoji logo={logo} icono={icono} activo={false} paleta={paleta} />
        <span style={{
          background: paleta.suave, color: paleta.mid,
          borderRadius: 20, fontSize: 11, fontWeight: 'bold',
          padding: '3px 10px', letterSpacing: 1, whiteSpace: 'nowrap',
          alignSelf: 'flex-start',
        }}>
          {estado}
        </span>
      </div>
      <div>
        <h3 style={{ color: paleta.dark, fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>{nombre}</h3>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>{descripcion}</p>
      </div>
      <div style={{
        background: paleta.suave, color: paleta.mid, borderRadius: 8,
        padding: '10px 0', textAlign: 'center', fontSize: 13,
        marginTop: 'auto', letterSpacing: 0.5,
      }}>
        En desarrollo
      </div>
    </div>
  )
}

function SectionHeader({ titulo, subtitulo, logo, paleta, stats }: {
  titulo: string; subtitulo: string; logo?: string | null; paleta: Paleta
  stats?: { label: string; value: string }[]
}) {
  const [err, setErr] = useState(false)
  return (
    <div style={{ background: paleta.mid }} className="px-8 py-5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {logo && !err && (
            <img
              src={logo}
              alt=""
              onError={() => setErr(true)}
              style={{ height: 44, width: 44, objectFit: 'contain', borderRadius: 8, background: 'white', padding: 3 }}
            />
          )}
          <div>
            <h2 className="text-white font-bold text-xl mb-1">{titulo}</h2>
            <p style={{ color: paleta.light, fontSize: 13 }}>{subtitulo}</p>
          </div>
        </div>
        {stats && (
          <div className="hidden md:flex gap-6 flex-shrink-0">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-white font-bold text-xl">{s.value}</div>
                <div style={{ color: paleta.light, fontSize: 11 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#F0F4F8', fontFamily: 'Tahoma, sans-serif' }}>

      {/* HEADER */}
      <header style={{ background: '#003B8E' }} className="px-8 py-5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <div style={{ background: '#1A5FC8', borderRadius: 8 }} className="px-4 py-2">
            <span className="text-white font-bold text-xl tracking-widest">ARESTORA HUB</span>
          </div>
          <span className="text-blue-200 text-sm hidden md:block">Panel de control — Grupo Arestora</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-blue-300 text-sm hidden md:block">backtowin@grupoarestora.com</span>
          <div style={{ background: '#1A5FC8', borderRadius: '50%' }} className="w-9 h-9 flex items-center justify-center">
            <span className="text-white font-bold text-sm">JA</span>
          </div>
        </div>
      </header>

      {/* ── BLOQUE 1: ARESTORA SEGURA ── */}
      <SectionHeader
        titulo="Arestora Segura®"
        subtitulo="Bienestar y protección de menores — Verticales sectoriales LOPIVI"
        logo={DRIVE('1gE-bomh0TDrx9wiS_9Wbm5Y4W05uW1Qk')}
        paleta={AZUL}
        stats={[
          { value: '1', label: 'Vertical activa' },
          { value: '6', label: 'En desarrollo' },
        ]}
      />
      <section className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {verticalesSegura.map((v) => (
            <VerticalCard key={v.id} v={v} />
          ))}
        </div>
      </section>

      <div style={{ height: 2, background: '#D6E4F7' }} className="mx-8" />

      {/* ── BLOQUE 2: IGUALDAD AUTOMATIC ── */}
      <SectionHeader
        titulo="IgualdadAutomatic®"
        subtitulo="Automatización de Planes de Igualdad para empresas"
        paleta={VERDE}
      />
      <section className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <BloqueCard
            logo={null}
            icono="⚖️"
            nombre="IgualdadAutomatic®"
            descripcion="Elaboración automatizada de Planes de Igualdad con asistencia técnica de Grupo Arestora."
            estado="EN PROCESO"
            paleta={VERDE}
          />
        </div>
      </section>

      <div style={{ height: 2, background: '#C8E6D0' }} className="mx-8" />

      {/* ── BLOQUE 3: EMPLEO SEGURO ── */}
      <SectionHeader
        titulo="EmpleoSeguro®"
        subtitulo="Sello de calidad en empleo responsable"
        logo={DRIVE('1xwg4biQhlai9qC_xGHd-HGvVjHJ7aTrj')}
        paleta={MORADO}
      />
      <section className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <BloqueCard
            logo={DRIVE('1xwg4biQhlai9qC_xGHd-HGvVjHJ7aTrj')}
            icono="💼"
            nombre="EmpleoSeguro®"
            descripcion="Sello de calidad en empleo derivado de la implantación del PAMEE."
            estado="EN PROCESO"
            paleta={MORADO}
          />
        </div>
      </section>

      <div style={{ height: 2, background: '#bfdbfe' }} className="mx-8" />

      {/* ── BLOQUE 4: ARESJOBS ── */}
      <SectionHeader
        titulo="AresJobs"
        subtitulo="Plataforma de empleo y empleabilidad — Conectamos talento, impulsamos futuro"
        logo={DRIVE('1JxMaAOZ8HZ7HxAMFIN-A7-v9BbLnHNec')}
        paleta={ARESJOBS}
      />
      <section className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <BloqueCard
            logo={DRIVE('1JxMaAOZ8HZ7HxAMFIN-A7-v9BbLnHNec')}
            icono="💼"
            nombre="AresJobs"
            descripcion="Portal de empleo nacional con IA de matching, Ares Score™ y Career Coach. Base de datos de talento para los procesos de selección de Grupo Arestora."
            estado="PRÓXIMAMENTE"
            paleta={ARESJOBS}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#003B8E', borderTop: '3px solid #1A5FC8', marginTop: 16 }} className="px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-blue-200 text-sm">© 2026 Grupo Arestora — Uso interno exclusivo</span>
          <span className="text-blue-300 text-xs">Arestora Hub v1.0</span>
        </div>
      </footer>

    </main>
  )
}
