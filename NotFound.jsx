import { NavLink, Link } from 'react-router-dom'

const NavLinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `nav-link pb-1 ${isActive ? 'active' : ''}`
    }
  >
    {children}
  </NavLink>
)

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-ink-950/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 border border-accent-cyan/25 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="2" width="10" height="2" rx="1" fill="#3dd6f5"/>
                <rect x="1" y="7" width="14" height="2" rx="1" fill="#3dd6f5" opacity="0.6"/>
                <rect x="1" y="12" width="8" height="2" rx="1" fill="#3dd6f5" opacity="0.4"/>
                <circle cx="13" cy="3" r="2" fill="#7af276"/>
              </svg>
            </div>
            <span className="font-display font-bold text-base tracking-tight text-white">
              Task<span className="text-gradient-cyan">Flow</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <NavLinkItem to="/">Home</NavLinkItem>
            <NavLinkItem to="/tasks">Tasks</NavLinkItem>
            <Link
              to="/tasks"
              className="hidden sm:inline-flex btn-primary text-xs px-4 py-2"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              View All Tasks
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
