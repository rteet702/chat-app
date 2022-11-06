import { NextPage } from "next";
import LoginCard from "@components/LoginCard";

const LoginPage: NextPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <LoginCard />
        </div>
    );
};

export default LoginPage;
