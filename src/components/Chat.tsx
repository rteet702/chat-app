import { Ref, useState } from "react";
import Message from "./Message";
import MessageForm from "./MessageForm";
import { Socket } from "socket.io";

interface Props {
    chatRef: Ref<HTMLInputElement>;
    chat: string[];
    user: User;
    socket: Socket;
}

type User =
    | {
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
      }
    | undefined;

const Chat = (props: Props) => {
    const [message, setMessage] = useState("");
    const { chatRef, chat, user, socket } = props;

    const handleSubmit = (e: any, user: any) => {
        e.preventDefault();

        socket.emit("new_message", {
            content: message,
            author: user?.name,
            email: user?.email,
        });
        setMessage("");
    };

    return (
        <div className="flex-[3] h-full shadow">
            <div className="bg-neutral-500 bg-opacity-25 p-3 rounded-t">
                <div
                    ref={chatRef}
                    className="overflow-y-scroll flex flex-col gap-3 h-[500px]"
                >
                    {chat.map((message: any, index) => {
                        return (
                            <Message
                                key={index}
                                name={message.author}
                                email={message.email}
                                content={message.content}
                                loggedInUser={user?.email}
                            />
                        );
                    })}
                </div>
            </div>
            <MessageForm
                handleSubmit={(e: any) => handleSubmit(e, user)}
                loggedInUser={user}
                message={message}
                setMessage={setMessage}
            />
        </div>
    );
};

export default Chat;
