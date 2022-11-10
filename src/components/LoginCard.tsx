import { NextComponentType } from "next";
import Link from "next/link";

const LoginCard: NextComponentType = () => {
    return (
        <div className="w-[500px] bg-neutral-800 bg-opacity-50 backdrop-blur-xl p-5 rounded shadow-2xl">
            <h1 className="text-4xl text-center">Login</h1>
            <form className="flex flex-col">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full bg-transparent focus:outline-none border-b-2 p-3 mt-3"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full bg-transparent focus:outline-none border-b-2 p-3 mt-3"
                />
                <button
                    type="submit"
                    className="bg-purple-900 bg-opacity-50 hover:bg-opacity-90 p-3 mt-6 rounded-sm transition-all"
                >
                    Login
                </button>
            </form>
            <div className="py-2" />
            <Link href="/register">Go to Register instead...</Link>
        </div>
    );
};

export default LoginCard;
