export default function Input({submit, text, setText}: {submit: (value: React.FormEvent) => void, text: string, setText: (value: string) => void}) {
    return (
        <form onSubmit={submit} className='flex gap-x-4 items-center mb-4'>
          <input 
          type='text' 
          placeholder='Tulis sesuatu disini...' 
          value={text} onChange={(e) => setText(e.target.value)} 
          className='text-slate-950 grow py-1.5 px-3 rounded-sm' />
          <button 
          type='submit' 
          disabled={!text} 
          className='disabled:text-slate-600'>Tambah</button>
        </form>
    )
}