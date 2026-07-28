import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from './TaskCard'

function Column({ id, title, tasks, onAddTask, onDelete }) {
  const { setNodeRef } = useDroppable({ id })
  const [newTaskText, setNewTaskText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!newTaskText.trim()) return
    onAddTask(id, newTaskText.trim())
    setNewTaskText('')
  }

  return (
    <div className="w-72 shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-4">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xs font-medium text-zinc-300 bg-white/10 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>

      <SortableContext id={id} items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex flex-col gap-3 min-h-[80px]">
          {tasks.length === 0 ? (
            <p className="text-sm text-zinc-500 text-center py-6">No tasks yet</p>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} id={task.id} content={task.content} onDelete={onDelete} />
            ))
          )}
        </div>
      </SortableContext>

      <form onSubmit={handleSubmit} className="mt-3">
        <input
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="+ Add a task"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm placeholder-zinc-500 focus:outline-none focus:border-purple-400/50"
        />
      </form>
    </div>
  )
}

export default Column