import { useState, useEffect } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import Column from './Column'
import { initialData } from '../data/dummyData'

function Board() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('aurora-board-data')
    return saved ? JSON.parse(saved) : initialData
  })
  const { columns, columnOrder, tasks } = data
  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  )

  useEffect(() => {
    localStorage.setItem('aurora-board-data', JSON.stringify(data))
  }, [data])

  function handleDragStart(event) {
    const task = tasks[event.active.id]
    setActiveTask(task)
  }

  function handleDragEnd(event) {
    setActiveTask(null)
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    const activeColumnId = Object.keys(columns).find((colId) =>
      columns[colId].taskIds.includes(activeId)
    )
    let overColumnId = Object.keys(columns).find((colId) =>
      columns[colId].taskIds.includes(overId)
    )
    if (!overColumnId) overColumnId = columns[overId] ? overId : null

    if (!activeColumnId || !overColumnId) return

    setData((prev) => {
      const startColumn = prev.columns[activeColumnId]
      const endColumn = prev.columns[overColumnId]

      if (startColumn === endColumn) {
        const oldIndex = startColumn.taskIds.indexOf(activeId)
        const newIndex = startColumn.taskIds.indexOf(overId)
        if (oldIndex === -1 || newIndex === -1) return prev

        const newTaskIds = Array.from(startColumn.taskIds)
        newTaskIds.splice(oldIndex, 1)
        newTaskIds.splice(newIndex, 0, activeId)

        return {
          ...prev,
          columns: { ...prev.columns, [startColumn.id]: { ...startColumn, taskIds: newTaskIds } },
        }
      }

      const startTaskIds = Array.from(startColumn.taskIds)
      startTaskIds.splice(startTaskIds.indexOf(activeId), 1)

      const endTaskIds = Array.from(endColumn.taskIds)
      const overIndex = endTaskIds.indexOf(overId)
      endTaskIds.splice(overIndex >= 0 ? overIndex : endTaskIds.length, 0, activeId)

      return {
        ...prev,
        columns: {
          ...prev.columns,
          [startColumn.id]: { ...startColumn, taskIds: startTaskIds },
          [endColumn.id]: { ...endColumn, taskIds: endTaskIds },
        },
      }
    })
  }

  function handleAddTask(columnId, content) {
    const newTaskId = `task-${Date.now()}`

    setData((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [newTaskId]: { id: newTaskId, content },
      },
      columns: {
        ...prev.columns,
        [columnId]: {
          ...prev.columns[columnId],
          taskIds: [...prev.columns[columnId].taskIds, newTaskId],
        },
      },
    }))
  }

  function handleDeleteTask(taskId) {
    setData((prev) => {
      const newTasks = { ...prev.tasks }
      delete newTasks[taskId]

      const newColumns = { ...prev.columns }
      for (const colId in newColumns) {
        newColumns[colId] = {
          ...newColumns[colId],
          taskIds: newColumns[colId].taskIds.filter((id) => id !== taskId),
        }
      }

      return { ...prev, tasks: newTasks, columns: newColumns }
    })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col md:flex-row gap-6 overflow-x-auto p-6 md:p-10 justify-center items-center md:items-start">
        {columnOrder.map((columnId) => {
          const column = columns[columnId]
          const columnTasks = column.taskIds.map((taskId) => tasks[taskId])

          return (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={columnTasks}
              onAddTask={handleAddTask}
              onDelete={handleDeleteTask}
            />
          )
        })}
      </div>
      <DragOverlay>
        {activeTask ? (
          <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-md p-4 shadow-2xl rotate-3">
            <p className="text-sm text-zinc-100">{activeTask.content}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default Board