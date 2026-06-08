import { prisma } from "config/client"

import bcrypt from 'bcrypt';
import { hashPassword } from "services/user_service";
import { ACCOUNT_TYPES } from "config/constant";
const initDatabase = async () => {
    const acoutUser = await prisma.user.count();
    const acoutRole = await prisma.role.count();
    const defaultPassword = await hashPassword("12345");

    if (acoutRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    username: "ADMIN",

                    description: "AMIN thi full quyen"
                },
                {
                    username: "USER",
                    description: "chi co cac chuc nang co ban"
                }
            ]
        })
    }
     if (acoutUser === 0) {
        const adminRole=await prisma.role.findFirst({
            where: {username:"ADMIN"}
        })
        if(adminRole)
        await prisma.user.createMany({
            data: [
                {
                    fullName: "buivandai",
                    username: "buivandai@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPES.SYSTEM,
                    roleId:adminRole.id
                },
                {
                    fullName: "ADMIN",
                    username: "admin@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPES.SYSTEM,
                    roleId:adminRole.id
                }
            ]
        })

    }
    if(acoutRole !==0 && acoutUser!==0) {
        console.log("------>>> AREDLY INIT DATA");
    }
}

export default initDatabase;