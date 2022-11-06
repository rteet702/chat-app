import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler: NextApiHandler = async (
    request: NextApiRequest,
    response: NextApiResponse
) => {
    // REGISTER USER
    if (request.method === "POST") {
        await prisma.users.update({
            where: { id: request.body.id },
            data: { online: false },
        });

        response.status(200).json({
            message: "Succesfully logged out.",
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
