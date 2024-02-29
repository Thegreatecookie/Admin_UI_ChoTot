import { createContext, useEffect, useState } from "react";
import { socket as socketClient } from "../socket";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    socketClient.on("connect_error", (err) => {
      console.log(err.message, "--------Socket error---------");
      setTimeout(() => {
        socketClient.connect();
      }, 1000);
    });

    setSocket(socketClient)

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
