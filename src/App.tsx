import { useState } from 'react'

import Toolbar from './components/toolbar'
import ToolPanel from './components/tool-panel'
import Draw, { DrawStyle } from './components/draw'
import { initialDrawStyle } from './constants'

import './styles/vars.scss'
import './app.scss'

function App() {
  const [drawStyle, setDrawStyle] = useState<DrawStyle>(initialDrawStyle)
  return (
    <div className='app' >
      <header className='header'>
        <Toolbar />
      </header>
      <aside>
        <ToolPanel initialData={initialDrawStyle} update={setDrawStyle} />
      </aside>
      <main className='main'>
        <Draw drawStyle={drawStyle} />
      </main>
    </div>
  )
}

export default App
