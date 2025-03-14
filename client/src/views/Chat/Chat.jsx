import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import Loader from "../../components/Loading/Loader";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Comment from "../../components/Comment/Comment";
import { APIWS } from "../../axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    connect();
    return () => {
      socket.current.close();
    };
  }, []);

  function connect() {
    socket.current = new WebSocket(
     APIWS
    ); //ws://localhost:5001

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username: userData.fullName,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    // socket.current.onclose = () => {
    //   console.log("Socket закрыт");
    // };
    // socket.current.onerror = () => {
    //   console.log("Socket произошла ошибка");
    // };
  } 
  const sendMessage = async () => {
    setValue("")
    const message = {
      userId: userData._id,
      avatarUrl: userData.avatarUrl,
      text: value,
      fullName: userData.fullName,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
  };

  return (
    <div className="Chat">
      {!connected ? (
        <Loader />
      ) : (
        <div className="content">
          <div className="messages">
            {messages.map((mess) => (
              <div key={mess.id}>
                {mess.event === "connection" ? (
                  <div className="connection_message">
                    Пользователь {mess.username} подключился
                  </div>
                ) : (
                  <div className="message">
                    <Comment
                      userId={mess.userId}
                      avatarUrl={mess.avatarUrl}
                      fullName={mess.fullName}
                      text={mess.text}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="form">
            <Input value={value} setValue={setValue} type="text" />
            <Button onClick={sendMessage}>Отправить</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
