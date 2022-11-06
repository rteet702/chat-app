import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (
    request: NextApiRequest,
    response: NextApiResponse
) => {
    // REGISTER USER
    if (request.method === "POST") {
        const { email, password } = request.body;

        const user = await prisma.users.findFirst({ where: { email: email } });

        if (!user) {
            return response.status(404).json({
                error: "User not found.",
            });
        }

        const checkPass = await compare(password, user.password);

        if (!checkPass) {
            return response.status(401).json({
                error: "Invalid password.",
            });
        }

        await prisma.users.update({
            where: { id: user.id },
            data: {
                online: true,
            },
        });

        response.status(200).json({
            message: "Succesfully logged in.",
        });
    }
    // CATCHALL FOR BAD REQUEST METHODS
    else {
        response.status(400).json({
            error: `Unable to use ${request.method} request method at this endpoint.`,
        });
    }
};

export default handler;
