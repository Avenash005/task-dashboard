import { useState } from 'react'
import TaskCard from '../components/TaskCard'
import SkeletonCard from '../components/SkeletonCard'
import useFetch from '../hooks/useFetch'

const TASKS_API = 'https://jsonplaceholder.typicode.com/todos?_limit=10'

export default function Tasks() {
  const { data: tasks, loading, error, refetch } = useFetch(TASKS_API)
  const [filter, setFilter] = useState('all') // 'all' | 'done' | 'pending'

  const filteredTasks = tasks?.filter((task) => {
    if (filter === 'done') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const doneCount = tasks?.filter((t) => t.completed).length ?? 0
  const pendingCount = tasks?.filter((t) => !t.completed).length ?? 0

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Page Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-slate-dim font-mono text-sm">01.</span>
              <span className="text-xs font-mono text-accent-cyan/70 uppercase tracking-widest">JSONPlaceholder API</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Task List
            </h1>
            <p className="text-slate-dim text-sm mt-2">
              Showing {tasks ? filteredTasks.length : '—'} of {tasks?.length ?? '—'} tasks
            </p>
          </div>

          {/* Summary pills */}
          {tasks && (
            <div className="flex items-center gap-2 mt-1">
              <span className="status-done">{doneCount} done</span>
              <span className="status-pending">{pendingCount} pending</span>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="mt-6 flex items-center gap-1 p-1 rounded-xl bg-ink-800/60 border border-white/5 w-fit">
          {[
            { key: 'all', label: 'All Tasks' },
            { key: 'done', label: 'Completed' },
            { key: 'pending', label: 'Pending' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-display font-medium transition-all duration-200 ${
                filter === key
                  ? 'bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/25'
                  : 'text-slate-dim hover:text-slate-bright'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="glass-card p-8 text-center animate-fade-in">
          <div className="text-3xl mb-3">⚠️</div>
          <h3 className="font-display font-semibold text-white mb-2">Failed to load tasks</h3>
          <p className="text-slate-dim text-sm mb-5">{error}</p>
          <button onClick={refetch} className="btn-primary">
            Try Again
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {/* Task Grid */}
      {!loading && !error && filteredTasks && (
        <>
          {filteredTasks.length === 0 ? (
            <div className="glass-card p-12 text-center animate-fade-in">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-display font-semibold text-white mb-2">No tasks found</h3>
              <p className="text-slate-dim text-sm">
                Try switching the filter above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
              {filteredTasks.map((task, i) => (
                <div
                  key={task.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          )}

          {/* Progress Bar */}
          {tasks && tasks.length > 0 && (
            <div className="mt-8 glass-card p-5 animate-slide-up">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-display font-medium text-white">Overall Progress</span>
                <span className="text-sm font-mono text-accent-cyan">
                  {Math.round((doneCount / tasks.length) * 100)}%
                </span>
              </div>
              <div className="h-2 bg-ink-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${(doneCount / tasks.length) * 100}%`,
                    background: 'linear-gradient(90deg, #3dd6f5, #7af276)',
                  }}
                />
              </div>
              <p className="text-xs text-slate-dim mt-2">
                {doneCount} of {tasks.length} tasks completed
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
