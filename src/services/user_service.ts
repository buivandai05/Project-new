
import { emit } from "process";
import { prisma } from "config/client";
import { ACCOUNT_TYPES } from "config/constant";

import bcrypt from 'bcrypt'
const saltRounds = 10;

const hashPassword = async (password: string) => {
   return await bcrypt.hash(password, saltRounds);
}
const handleCreateUser = async (fullname: string, email: string, address: string, avatar: string, phone: string, role: string) => {
   const defautPassword = await hashPassword("1234");
   const newuser = await prisma.user.create({
      data: {
         fullName: fullname,
         username: email,
         address: address,
         password: defautPassword,
         accountType: ACCOUNT_TYPES.SYSTEM,
         avatar: avatar,
         phone: phone,
         roleId: +role
      }
   })
   return newuser;
};

const getAllUsers = async () => {
   const user = await prisma.user.findMany();
   return user;

};

const getAllRole = async () => {
   const role = await prisma.role.findMany();
   return role;
}
const handleDeleteuser = async (id: number) => {
   const deleteUser = await prisma.user.delete({ where: { id: id } })
   return deleteUser;
}
// const getByuserid = async (id:String) => {
//     const connection = await getConnection();
//     try {
//         const sql = 'SELECT * FROM `user` WHERE `id`=? ';
//         const values = [id];

//         const [result, fields] = await connection.execute(sql, values);
//         return result;
//     } catch (err) {
//         console.log(err);
//         return [0];
//     }
// }

const getByuserid = async (id: string) => {
   const user = await prisma.user.findUnique({ where: { id: +id } });
   return user;
}

const updateUser = async (
   id: string,
   fullname: string,
   address: string,
   phone: string,
   role: string,
   avatar: string
) => {

   const updateUser = await prisma.user.update({
      where: {
         id: +id
      },
      data: {
         fullName: fullname,
         address: address,
         phone: phone,
         roleId: +role,
         ...(avatar && { avatar: avatar })
      }
   });

   return updateUser;
}
export { handleCreateUser, getAllUsers, handleDeleteuser, getByuserid, updateUser, getAllRole, hashPassword };