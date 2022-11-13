import { NextPage } from "next";
import Message from "../components/Message";
import OnlineUsers from "@components/OnlineUsers";
import MessageForm from "@components/MessageForm";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const Home: NextPage = () => {
    const { data: session } = useSession();
    const [socket, setSocket] = useState<any>();
    const chatRef = useRef<any>(null);
    const [chat, setChat] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
    const router = useRouter();

    useEffect((): any => {
        const newSocket: Socket = io(
            "https://web-production-70fb.up.railway.app",
            // "http://localhost:8000/",
            { autoConnect: false }
        );
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log(`Socket Connected`, newSocket.id);
        });

        newSocket.on("getMessages", (response) => {
            console.log(response.messages);
            setChat(response.messages);

            if (chatRef !== null) {
                setTimeout(() => {
                    chatRef.current?.scroll({
                        top: chatRef.current?.scrollHeight,
                        behavior: "smooth",
                    });
                }, 200);
            }
        });

        newSocket.on("onlineUsers", (response) => {
            setOnlineUsers(response.sockets);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const handleSubmit = (e: any, user: any) => {
        e.preventDefault();

        socket.emit("new_message", {
            content: message,
            author: user?.name,
            email: user?.email,
        });
        setMessage("");
    };

    // What the logged in user sees.
    if (!session) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-[500px] bg-neutral-800 bg-opacity-50 backdrop-blur-xl p-5 rounded shadow-2xl">
                    <h1 className="text-4xl text-center mb-6">Welcome!</h1>
                    <p>You are are not signed in.</p>
                    <button
                        onClick={() => router.push("/login")}
                        className="w-full bg-cyan-900 bg-opacity-50 hover:bg-opacity-90 p-3 mt-6 rounded-sm transition-all"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }
    const { user } = session;

    socket.auth = {
        name: user?.name,
        email: user?.email,
    };
    socket.connect();
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[900px] bg-neutral-800 bg-opacity-50 backdrop-blur-xl p-5 rounded shadow-2xl">
                <h1 className="text-4xl text-center">Chat</h1>
                {/* chat component */}
                <div className="flex gap-3">
                    <div className="flex-[3]">
                        <div
                            ref={chatRef}
                            className="w-full h-[400px] bg-neutral-500 bg-opacity-30 mt-3 overflow-y-scroll p-3 rounded-t flex flex-col gap-3"
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
                        <MessageForm
                            handleSubmit={(e: any) => handleSubmit(e, user)}
                            loggedInUser={user}
                            message={message}
                            setMessage={setMessage}
                        />
                    </div>
                    {/* sidebar with online users */}
                    <OnlineUsers onlineUsers={onlineUsers} />
                </div>
                {/* logout button */}
                <button
                    onClick={() => signOut()}
                    className="w-full bg-cyan-900 bg-opacity-50 hover:bg-opacity-90 p-3 mt-6 rounded-sm transition-all"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Home;
