import { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const Home: NextPage = () => {
    const { data: session } = useSession();
    const [socket, setSocket] = useState<any>();
    const [chat, setChat] = useState([]);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect((): any => {
        const newSocket: Socket = io(
            "https://chatapp-teets-dev.herokuapp.com/",
            // "http://localhost:8000/",
            { autoConnect: false }
        );
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log(`Socket Connected`, newSocket.id);
        });

        newSocket.on("getMessages", (response) => {
            setChat(response.messages);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const handleSubmit = (e: any, user: any) => {
        e.preventDefault();

        socket.emit("new_message", { content: message, author: user?.name });
        setMessage("");
    };

    // What the logged in user sees.
    if (session) {
        const { user } = session;

        socket.auth = {
            name: user?.name,
            email: user?.email,
        };
        socket.connect();

        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-[500px] bg-neutral-800 bg-opacity-50 backdrop-blur-xl p-5 rounded shadow-2xl">
                    <h1 className="text-4xl text-center">Chat</h1>
                    <div className="w-full h-[400px] bg-neutral-500 bg-opacity-30 mt-3 overflow-y-scroll scroll-smooth auto">
                        {chat.map((message: any, index) => {
                            return (
                                <div key={index}>
                                    <p>{message.author}</p>
                                    <p>{message.content}</p>
                                </div>
                            );
                        })}
                    </div>
                    <form
                        className="flex"
                        onSubmit={(e) => handleSubmit(e, user)}
                    >
                        <input
                            type="text"
                            name="content"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="p-3 bg-neutral-500 bg-opacity-10 flex-[3]"
                        />
                        <button
                            type="submit"
                            className="bg-purple-900 bg-opacity-20 hover:bg-opacity-40 transition-colors flex-1"
                        >
                            Send
                        </button>
                    </form>
                    <button
                        onClick={() => signOut()}
                        className="w-full bg-cyan-900 bg-opacity-50 hover:bg-opacity-90 p-3 mt-6 rounded-sm transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }
    // What a logged out user sees.
    else {
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
};

export default Home;
