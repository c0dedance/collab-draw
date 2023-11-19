import React from 'react'
import './styles.scss'

interface ToolbarProps {

}

const Toolbar: React.FC<ToolbarProps> = () => {



  return (
    <div className='toolbar-container'>
      <div className='toolbar'>
        <div className="toolbar__icon toolbar__icon__active">
          <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.25"><path clipRule="evenodd" d="m7.643 15.69 7.774-7.773a2.357 2.357 0 1 0-3.334-3.334L4.31 12.357a3.333 3.333 0 0 0-.977 2.357v1.953h1.953c.884 0 1.732-.352 2.357-.977Z"></path><path d="m11.25 5.417 3.333 3.333"></path></g>
          </svg>
        </div>
      </div>
    </div>
  )
}


export default (Toolbar)
