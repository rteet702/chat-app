import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
        return res
            .status(500)
            .json({ error: "Dev needs to add client id and secret to .env!" });
    }

    const options = {
        providers: [
            Google({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
            }),
        ],
        debug: false,
    };

    NextAuth(req, res, options);
};
