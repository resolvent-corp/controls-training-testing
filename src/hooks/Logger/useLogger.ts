import { useCallback } from "react";

const useLogger = () => {
  const sendLog = useCallback((level: any, message: any) => {
    const formattedMessage =
      typeof message === "object" ? JSON.stringify(message, null, 2) : message;

    //http://192.168.1.11:3001/log
    fetch("http://192.168.1.11:3001/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ level, message: formattedMessage }),
    });
  }, []);

  const logger = useCallback(
    (message: any) => sendLog("log", message),
    [sendLog]
  );

  return { logger };
};

export default useLogger;
