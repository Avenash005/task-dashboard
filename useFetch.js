import { useParams, Link } from 'react-router-dom'
import { SkeletonDetail } from '../components/SkeletonCard'
import useFetch from '../hooks/useFetch'

export default function TaskDetail() {
  const { id } = useParams()
  const { data: task, loading, error } = useFetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  )

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Breadcrumb / Back Nav */}
      <div className="mb-8 animate-fade-in">
        <Link
          to="/tasks"
          className="inline-flex items-center gap-2 text-sm text-slate-dim hover:text-accent-cyan transition-colors duration-200 group"
        >
          <svg
            width="16" height="16" viewBox="0 0 16 16" fill="none"
            className="group-hover:-translate-x-0.5 transition-transform duration-200"
          >
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Tasks
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="animate-fade-in">
          <SkeletonDetail />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="glass-card p-10 text-center animate-fade-in">
          <div className="text-4xl mb-4">🚫</div>
          <h2 className="font-display font-bold text-xl text-white mb-2">Task Not Found</h2>
          <p className="text-slate-dim text-sm mb-6">
            Could not load task #{id}. {error}
          </p>
          <Link to="/tasks" className="btn-primary">
            ← Return to Task List
          </Link>
        </div>
      )}

      {/* Task Detail */}
      {task && !loading && !error && (
        <div className="animate-slide-up space-y-6">
          {/* Main Card */}
          <div className="glass-card p-6 sm:p-8 relative overflow-hidden">
            {/* Background glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
              task.completed ? 'bg-accent-lime/5' : 'bg-accent-amber/5'
            }`} />

            {/* Task ID + Status */}
            <div className="flex items-center gap-3 mb-5">
              <span className="tag-pill bg-ink-700 border border-white/10 text-slate-dim font-mono">
                Task #{String(task.id).padStart(3, '0')}
              </span>
              {task.completed ? (
                <span className="status-done">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Completed
                </span>
              ) : (
                <span className="status-pending">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3"/>
                  </svg>
                  Pending
                </span>
              )}
            </div>

            {/* Task Title */}
            <h1 className={`font-display font-bold text-xl sm:text-2xl leading-snug mb-6 ${
              task.completed
                ? 'text-slate-dim line-through decoration-slate-dim/30'
                : 'text-white'
            }`}>
              {task.title}
            </h1>

            {/* Divider */}
            <div className="divider mb-6" />

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <MetaField
                label="Task ID"
                value={`#${String(task.id).padStart(3, '0')}`}
                mono
              />
              <MetaField
                label="User ID"
                value={`User #${task.userId}`}
                mono
              />
              <MetaField
                label="Status"
                value={task.completed ? 'Done ✓' : 'In Progress'}
                color={task.completed ? 'text-accent-lime' : 'text-accent-amber'}
              />
            </div>
          </div>

          {/* Completion Banner */}
          {task.completed && (
            <div className="glass-card p-5 border border-accent-lime/15 bg-accent-lime/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-lime/10 border border-accent-lime/20 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9l4.5 4.5 7.5-7.5" stroke="#7af276" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-accent-lime">Task Completed!</p>
                <p className="text-xs text-slate-dim mt-0.5">
                  This task has been marked as done.
                </p>
              </div>
            </div>
          )}

          {/* Pending Banner */}
          {!task.completed && (
            <div className="glass-card p-5 border border-accent-amber/15 bg-accent-amber/5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-amber/10 border border-accent-amber/20 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="6" stroke="#f5c842" strokeWidth="1.4" fill="none"/>
                  <path d="M9 6v3.5M9 11.5v.5" stroke="#f5c842" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-accent-amber">In Progress</p>
                <p className="text-xs text-slate-dim mt-0.5">
                  This task is still pending completion.
                </p>
              </div>
            </div>
          )}

          {/* Navigation between tasks */}
          <div className="flex items-center justify-between gap-3">
            {task.id > 1 && (
              <Link
                to={`/tasks/${task.id - 1}`}
                className="btn-ghost text-sm flex-1 justify-center"
              >
                ← Task #{task.id - 1}
              </Link>
            )}
            {task.id < 200 && (
              <Link
                to={`/tasks/${task.id + 1}`}
                className="btn-ghost text-sm flex-1 justify-center"
              >
                Task #{task.id + 1} →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function MetaField({ label, value, mono, color }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-slate-dim uppercase tracking-wider font-mono">{label}</p>
      <p className={`font-display font-semibold text-sm ${mono ? 'font-mono text-slate-bright' : ''} ${color || 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}
