import { RefObject, useEffect, useState } from "react"
import { DrawStyle } from "../components/draw"
import { setRootVariable } from "../constants/utils";

type Coordinate = {
  x: number;
  y: number;
};

export const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  drawStyle: DrawStyle,
  onDrawLine: (...args: unknown[]) => void,
) => {

  const [isPainting, setIsPainting] = useState(false);
  const [position, setPosition] = useState<Coordinate | undefined>();

  const startPaint = (e: MouseEvent) => {
    const { offsetX, offsetY } = e;
    setPosition({ x: offsetX, y: offsetY });
    setIsPainting(true);
    setRootVariable('pointerEvents', 'none')
  }

  const paint = (e: MouseEvent) => {
    if (isPainting) {
      const { offsetX: x, offsetY: y } = e;
      const newPosition = { x, y };
      drawLine(position!, newPosition);
      setPosition(newPosition);
    }
  }

  const exitPaint = () => {
    setIsPainting(false);
    setRootVariable('pointerEvents', 'all')
  }

  const drawLine = (originalPosition: Coordinate, newPosition: Coordinate, style = drawStyle, isRemote = false) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const restore = setDrawStyle(ctx, style)
      ctx.beginPath();
      ctx.moveTo(originalPosition.x, originalPosition.y);
      ctx.lineTo(newPosition.x, newPosition.y);
      ctx.closePath();
      ctx.stroke();
      // 来自远程的绘制
      if (isRemote) {
        restore()
      } else {
        // console.log('绘制远程');
        onDrawLine(originalPosition, newPosition, drawStyle)
        
      }
    }
  }

  const setDrawStyle = (ctx: CanvasRenderingContext2D, style: DrawStyle) => {
    const { color, strokeWidth, bgColor } = style
    ctx.save()
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = bgColor;
    // ctx.lineJoin = "round";
    return () =>
      ctx.restore()
  }


  // mousedown事件监听
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () =>
      canvas.removeEventListener('mousedown', startPaint);
  }, [startPaint])
  // 事件监听
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () =>
      canvas.removeEventListener('mousemove', paint);

  }, [paint])
  // 事件监听
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);

    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    }
  }, [exitPaint])


  return {
    isPainting,
    drawLine,
    onDrawLine
  }
}