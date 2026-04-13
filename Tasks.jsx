export default function SkeletonCard() {
  return (
    <div className="glass-card p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="skeleton h-6 w-12" />
        <div className="skeleton h-6 w-16" />
      </div>
      <div className="space-y-2">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-white/5">
        <div className="skeleton h-3 w-14" />
        <div className="skeleton h-3 w-20" />
      </div>
    </div>
  )
}

export function SkeletonDetail() {
  return (
    <div className="glass-card p-8 space-y-6">
      <div className="space-y-3">
        <div className="skeleton h-8 w-24" />
        <div className="skeleton h-6 w-full max-w-lg" />
        <div className="skeleton h-6 w-3/4 max-w-md" />
      </div>
      <div className="skeleton h-px w-full" />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-6 w-16" />
        </div>
        <div className="space-y-2">
          <div className="skeleton h-4 w-20" />
          <div className="skeleton h-6 w-16" />
        </div>
      </div>
    </div>
  )
}
