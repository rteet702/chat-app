import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Google from "next-auth/providers/google";

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
        return res
            .status(500)
            .json({ error: "Dev needs to add client id and secret to .env!" });
    }

    const options = {
        secret: process.env.SECRET,
        providers: [
            Google({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
            }),
        ],
        pages: {
            signIn: "/login",
        },
        debug: false,
    };

    NextAuth(req, res, options);
};
