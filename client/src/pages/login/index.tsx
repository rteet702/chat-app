import { NextPage } from "next";
import LoginCard from "@components/LoginCard";
import { InferGetServerSidePropsType } from "next";
import { getProviders } from "next-auth/react";
import { signIn } from "next-auth/react";

const LoginPage: NextPage = ({
    providers,
}: InferGetServerSidePropsType<any>) => {
    console.log(providers);
    return (
        <div className="flex items-center justify-center h-screen">
            {/* <LoginCard /> */}
            {Object.values(providers).map((provider: any, index) => {
                return (
                    <div key={index}>
                        <button onClick={() => signIn(provider.id)}>
                            Sign in with {provider.name}!
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export const getServerSideProps = async () => {
    const providers = await getProviders();
    return {
        props: { providers },
    };
};

export default LoginPage;
