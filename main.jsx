import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ADVICE_API = 'https://api.adviceslip.com/advice'

// Stats for the hero section
const STATS = [
  { label: 'Tasks Available', value: '200+', color: 'text-accent-cyan' },
  { label: 'API Sources', value: '2', color: 'text-accent-lime' },
  { label: 'Built With', value: 'React', color: 'text-accent-amber' },
]

function AdviceCard() {
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchAdvice = async () => {
    setIsRefreshing(true)
    setError(null)
    try {
      // Cache-bust to ensure fresh advice each time
      const res = await fetch(`${ADVICE_API}?t=${Date.now()}`, {
        cache: 'no-cache',
      })
      if (!res.ok) throw new Error('Failed to fetch advice')
      const json = await res.json()
      setAdvice(json.slip)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAdvice()
  }, [])

  return (
    <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-accent-lime/10 border border-accent-lime/20 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1a5 5 0 100 10A5 5 0 008 1z" stroke="#7af276" strokeWidth="1.2" fill="none"/>
              <path d="M8 7v4M8 5.5v.5" stroke="#7af276" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm text-white">Daily Advice</h3>
            <p className="text-xs text-slate-dim">via Advice Slip API</p>
          </div>
        </div>
        <button
          onClick={fetchAdvice}
          disabled={isRefreshing}
          className="btn-ghost text-xs gap-1.5 disabled:opacity-40"
        >
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className={isRefreshing ? 'animate-spin' : ''}
          >
            <path d="M10.5 6A4.5 4.5 0 112.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M2.5 1.5v2h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {isRefreshing ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {/* Content */}
      {loading && !isRefreshing ? (
        <div className="space-y-2 animate-pulse">
          <div className="skeleton h-5 w-full rounded-lg" />
          <div className="skeleton h-5 w-4/5 rounded-lg" />
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-accent-rose/80 text-sm">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <circle cx="7" cy="7" r="6" fillOpacity="0.2" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M7 4v3.5M7 9.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
          {error}
        </div>
      ) : advice ? (
        <div className="space-y-3">
          <p className="text-slate-bright text-base sm:text-lg leading-relaxed font-body font-light">
            "{advice.title}"
          </p>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-accent-lime/30 to-transparent" />
            <span className="text-xs font-mono text-slate-dim/50">#{advice.id}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="glass-card p-5 hover:border-white/10 transition-colors duration-300">
      <div className="text-2xl mb-3">{icon}</div>
      <h4 className="font-display font-semibold text-sm text-white mb-1.5">{title}</h4>
      <p className="text-xs text-slate-dim leading-relaxed">{desc}</p>
    </div>
  )
}

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Hero Section */}
      <section className="mb-16 animate-fade-in">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-accent-cyan/5 border border-accent-cyan/15">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse-slow" />
          <span className="text-xs font-mono text-accent-cyan/80 tracking-wide">Personal Dashboard</span>
        </div>

        {/* Heading */}
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight text-white mb-5">
          Manage your tasks
          <br />
          <span className="text-gradient-cyan glow-cyan">with clarity.</span>
        </h1>

        <p className="text-slate-dim text-base sm:text-lg font-light max-w-2xl leading-relaxed mb-8">
          A modern task management dashboard powered by real APIs. Track your
          progress, view details, and stay organized — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/tasks" className="btn-primary text-sm px-6 py-3">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="8" height="1.5" rx="0.75" fill="currentColor"/>
              <rect x="1" y="6" width="12" height="1.5" rx="0.75" fill="currentColor" opacity="0.6"/>
              <rect x="1" y="10" width="6" height="1.5" rx="0.75" fill="currentColor" opacity="0.4"/>
            </svg>
            Browse Tasks
          </Link>
          <a
            href="https://jsonplaceholder.typicode.com/todos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-sm"
          >
            View API Source ↗
          </a>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="glass-card px-6 py-4">
          <div className="grid grid-cols-3 divide-x divide-white/5">
            {STATS.map(({ label, value, color }) => (
              <div key={label} className="flex flex-col items-center py-2 px-4">
                <span className={`font-display font-bold text-2xl ${color}`}>{value}</span>
                <span className="text-xs text-slate-dim mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advice + Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Advice Card */}
        <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <AdviceCard />
        </div>

        {/* Quick Start */}
        <div className="glass-card p-6 sm:p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="font-display font-semibold text-sm text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-4 rounded-full bg-accent-amber inline-block" />
            Quick Navigation
          </h3>
          <div className="space-y-3">
            {[
              { to: '/tasks', label: 'All Tasks', desc: 'View and manage your task list', icon: '📋' },
              { to: '/tasks/1', label: 'Task #001', desc: 'See an example task detail', icon: '🔍' },
              { to: '/tasks/5', label: 'Task #005', desc: 'Another task detail example', icon: '✅' },
            ].map(({ to, label, desc, icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200 group"
              >
                <span className="text-xl">{icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-medium text-sm text-white group-hover:text-accent-cyan transition-colors">{label}</p>
                  <p className="text-xs text-slate-dim truncate">{desc}</p>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-dim/30 group-hover:text-accent-cyan/60 transition-colors shrink-0">
                  <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <section className="animate-slide-up" style={{ animationDelay: '0.25s' }}>
        <h2 className="font-display font-semibold text-lg text-white mb-5 flex items-center gap-3">
          <span className="text-slate-dim font-mono text-sm font-normal">02.</span>
          Core Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            icon="⚡"
            title="Live API Data"
            desc="Tasks fetched in real-time from JSONPlaceholder. No hardcoded data — ever."
          />
          <FeatureCard
            icon="🧭"
            title="Client-Side Routing"
            desc="React Router v6 with nested routes, dynamic params, and smooth navigation."
          />
          <FeatureCard
            icon="📱"
            title="Fully Responsive"
            desc="Tailwind CSS utility-first approach ensures perfect layout on any screen size."
          />
        </div>
      </section>
    </div>
  )
}
