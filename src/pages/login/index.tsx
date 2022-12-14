import { NextPage } from "next";
import { InferGetServerSidePropsType } from "next";
import { getProviders, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const LoginPage: NextPage = ({
    providers,
}: InferGetServerSidePropsType<any>) => {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[500px] bg-neutral-800 bg-opacity-50 backdrop-blur-xl p-5 rounded shadow-2xl flex flex-col gap-4">
                <h1 className="text-4xl text-center">Login</h1>

                {/* external providers */}
                {Object.values(providers).map((provider: any, index) => {
                    return (
                        <div key={index}>
                            <button
                                onClick={() =>
                                    signIn(provider.id, {
                                        callbackUrl: `${window.location.origin}/`,
                                    })
                                }
                                className="w-full bg-neutral-600 bg-opacity-10 hover:bg-opacity-25 shadow-lg transition-colors py-3 rounded"
                            >
                                ...with {provider.name}!
                            </button>
                        </div>
                    );
                })}

                <hr className="my-3" />

                {/* home button */}
                <button
                    onClick={() => {
                        router.push("/");
                    }}
                    className="w-full bg-purple-900 bg-opacity-50 hover:bg-opacity-90 shadow-lg transition-colors py-3 rounded"
                >
                    Return to Homepage
                </button>
            </div>
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
