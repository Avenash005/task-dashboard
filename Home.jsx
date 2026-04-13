import { Link } from 'react-router-dom'

export default function TaskCard({ task }) {
  const { id, title, completed, userId } = task

  return (
    <Link
      to={`/tasks/${id}`}
      className="group glass-card p-5 flex flex-col gap-3 transition-all duration-300
        hover:border-accent-cyan/20 hover:bg-ink-700/60 hover:-translate-y-0.5
        hover:shadow-[0_8px_32px_rgba(61,214,245,0.08)] block"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        {/* Task ID badge */}
        <span className="tag-pill bg-ink-700 border border-white/10 text-slate-dim shrink-0 mt-0.5">
          #{String(id).padStart(3, '0')}
        </span>

        {/* Status pill */}
        {completed ? (
          <span className="status-done shrink-0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Done
          </span>
        ) : (
          <span className="status-pending shrink-0">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
              <circle cx="4" cy="4" r="3"/>
            </svg>
            Pending
          </span>
        )}
      </div>

      {/* Task title */}
      <p className={`font-body text-sm leading-relaxed line-clamp-2 ${
        completed ? 'text-slate-dim line-through decoration-slate-dim/40' : 'text-slate-bright'
      }`}>
        {title}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 divider mt-1">
        <span className="text-xs font-mono text-slate-dim/60">
          User #{userId}
        </span>
        <span className="text-xs text-accent-cyan/0 group-hover:text-accent-cyan/70 transition-colors duration-200 flex items-center gap-1">
          View details
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </Link>
  )
}
