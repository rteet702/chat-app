import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { io } from "socket.io-client";

const Home: NextPage = () => {
    const { data: session } = useSession();
    const ioClient = io("https://chatapp-teets-dev.herokuapp.com/");
    const router = useRouter();

    useEffect((): any => {
        ioClient.connect();

        ioClient.on("all_user_test", (property) => {
            console.log("All user test recieved, ", property);
        });

        return () => ioClient.disconnect();
    }, []);

    // What the logged in user sees.
    if (session) {
        const { user } = session;
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-[500px] bg-neutral-800 bg-opacity-50 backdrop-blur-xl p-5 rounded shadow-2xl">
                    <h1 className="text-4xl text-center mb-6">Welcome!</h1>
                    <p>You are signed in as {user?.email}</p>
                    <button
                        onClick={() => signOut()}
                        className="w-full bg-cyan-900 bg-opacity-50 hover:bg-opacity-90 p-3 mt-6 rounded-sm transition-all"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => {
                            ioClient.emit("test");
                        }}
                    >
                        Click for fuckery?
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
