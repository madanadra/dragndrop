import { useState } from 'react'
import Box from './components/box'
import Input from './components/input'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'

export type Thing = {
  id: string
  name: string
}  

function App() {
  const [things, setThings] = useState<Thing[]>([])
  const [text, setText] = useState<string>('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text) {
      setThings([...things, {id: Date.now().toString(), name: text}])
      setText('')
    }
  }

  const handleDragEnd = (e: any) => {
    const {active, over} = e

    if (active.id !== over.id) {
      setThings(items => {
        const activeI = items.map(item => item.id).indexOf(active.id)
        const overI = items.map(item => item.id).indexOf(over.id)

        return arrayMove(items, activeI, overI)
      })
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className='font-main text-slate-50 grid content-start justify-items-center bg-green-500 p-4 min-h-screen'>
        <div className='grid gap-y-2 max-w-sm w-full'>
          <Input submit={submit} text={text} setText={setText} />
          <SortableContext items={things} strategy={verticalListSortingStrategy}>
            {things.length ? 
            things.map(thing => <Box key={thing.id} thing={thing} />) : 
            <h1 className='font-medium text-green-900 text-center p-4'>Tidak ada data</h1>}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  )
}

export default App
