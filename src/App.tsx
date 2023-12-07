import { useState } from 'react'
import Box from './components/box'
import Input from './components/input'
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { PiDotsSixVertical } from 'react-icons/pi'

export type Thing = {
  id: string
  name: string
}  

function App() {
  const [things, setThings] = useState<Thing[]>([])
  const [text, setText] = useState<string>('')
  const [active, setActive] = useState<string>('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text) {
      setThings([...things, {id: Date.now().toString(), name: text}])
      setText('')
    }
  }

  const handleDragStart = (e: any) => {
    setActive(e.active.id)
  }

  const handleDragEnd = (e: any) => {
    if (active !== e.over.id) {
      setThings(items => {
        const activeI = items.map(item => item.id).indexOf(active)
        const overI = items.map(item => item.id).indexOf(e.over.id)

        return arrayMove(items, activeI, overI)
      })
    }

    setActive('')
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className='font-main text-slate-50 grid content-start justify-items-center bg-green-500 p-4 min-h-screen'>
        <div className='grid gap-y-2 max-w-sm w-full'>
          <Input submit={submit} text={text} setText={setText} />
          <SortableContext items={things} strategy={verticalListSortingStrategy}>
            {things.length ? 
            things.map(item => <Box key={item.id} item={item} active={active} />) : 
            <h1 className='font-medium text-green-900 text-center p-4'>Tidak ada data</h1>}
          </SortableContext>
          <DragOverlay>
            {active && things.filter(item => item.id === active).map(item => 
              <div key={item.id} className="flex items-center justify-between gap-x-4 bg-green-700 border border-green-300 rounded-sm p-4 overflow-hidden opacity-30"> 
                  <h1 className="w-full truncate">{item.name}</h1>
                  <PiDotsSixVertical className='text-lg cursor-grab active:cursor-grabbing touch-none' />
              </div>  
            )}
          </DragOverlay>
        </div>
      </div>
    </DndContext>
  )
}

export default App
