import React, { useEffect } from 'react'
import './styles.scss'
import { useCanvas } from '../../hooks/useCanvas'
import { useWebSocket } from '../../hooks/useWebSocket'

export interface DrawStyle {
  color: string
  bgColor: string
  strokeWidth: number
}

interface DrawProps {
  drawStyle: DrawStyle

}

const Draw: React.FC<DrawProps> = ({ drawStyle }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const { socket } = useWebSocket()
  const onDrawLine = (...args: unknown[]) => {
    if (!socket.current) return
    // console.log('local:', ...args);
    socket.current.emit('drawBoard', ...args)
  }
  const { drawLine } = useCanvas(canvasRef, drawStyle, onDrawLine)
  useEffect(() => {
    if (!socket.current) return
    // console.log('socket init', socket.current);

    // 订阅其他的用户的画画数据
    socket.current.on('drawBoard', (originalPosition, newPosition, style) => {
      console.log('remote:', originalPosition, newPosition, style);

      drawLine(originalPosition, newPosition, style, true)
    })


  }, [socket.current])

  return (
    <canvas ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}>
      你的浏览器不支持canvas
    </canvas>
  )
}


export default Draw
