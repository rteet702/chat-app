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
        const { firstName, lastName, email, password, confirm } = request.body;

        if (confirm !== password) {
            return response.status(400).json({
                error: "Passwords do not match.",
            });
        }

        if (await prisma.users.findFirst({ where: { email: email } })) {
            return response.status(400).json({
                error: "Email already exists.",
            });
        }

        const pwHash = await hash(password, 15);

        const newUser = await prisma.users.create({
            data: {
                firstName,
                lastName,
                email,
                password: pwHash,
                online: true,
            },
        });

        response.status(201).json({ newUser });
    }
    // CATCHALL FOR BAD REQUEST METHODS
    else {
        response.status(400).json({
            error: `Unable to use ${request.method} request method at this endpoint.`,
        });
    }
};

export default handler;
