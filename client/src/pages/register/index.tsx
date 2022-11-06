import { NextPage } from "next";
import RegisterCard from "@components/RegisterCard";

const RegisterPage: NextPage = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <RegisterCard />
        </div>
    );
};

export default RegisterPage;
