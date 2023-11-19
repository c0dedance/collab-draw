import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

const socketUrl = 'http://localhost:5001/'
// console.log('import.meta.env: ', import.meta.env);

export const useWebSocket = () => {

  const socket = useRef<Socket>()
  const [readyState, setReadyState] = useState(false)

  useEffect(() => {
    socket.current = io(socketUrl, {
      withCredentials: true,
    });
    setReadyState(true)

    return () => {
      socket.current?.disconnect();
    }
  }, [])

  return {
    socket,
    readyState
  };
}