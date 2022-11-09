import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const Home: NextPage = () => {
    const { data: session } = useSession();
    if (session) {
        return (
            <div>
                <p>You are signed in as {session.user?.email}</p>
                <button onClick={() => signOut()}>Logout</button>
            </div>
        );
    } else {
        return (
            <div>
                <button onClick={() => signIn()}>Log In!</button>
            </div>
        );
    }
};

export default Home;
