import { RequiredExtensionArgs } from "@prisma/client/runtime/library";
import { render } from "ejs";
// import { RowDataPacket } from "mysql2";
import { Request, Response } from "express";
import { getAllRole, getAllUsers, getByuserid, handleCreateUser, handleDeleteuser,updateUser } from "services/user_service";
// import { name } from "ejs";

const getHomepage = async (req: Request, res: Response) => {
   
    return res.render("client/home/show");
};

const getCreatepage = (req: Request, res: Response) => {
    return res.render("create-use");

};
const getadmincreateuser = async(req:Request, res:Response)=>{
    const roles=await getAllRole();
    return res.render("admin/User/create",{
        roles:roles
    });
}

const getPostpgae =async (req: Request, res: Response) => {
    const { fullname,email,phone,role,address} = req.body;

    const file = req.file;
    const avatar = file?.filename ?? "";
   await handleCreateUser(fullname,email,address,avatar,phone,role);

    return res.redirect("/");
};

const postadminDeleUser= async(req: Request, res:Response)=>{
    const {id}=req.params;
   const a= await handleDeleteuser(Number(id));
    return res.redirect("/admin/User");
}

// const getViewuser = async(req:Request,res:Response)=>{
//     const {id}=req.params;
//     const user= await getByuserid(String(id));
//     return res.render("view-user.ejs",{
//         id:id,
//         user:user
//     });
// }
const getViewuser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getByuserid(String(id)); // Truyền id vào
    const roles=await getAllRole()
    
    return res.render("admin/User/detail", {
        id: id,
        user: user,
        roles:roles
        // Lúc này user đã là { name: '...', email: '...' }
    });
}

const postUpdateuser = async (req: Request, res: Response) => {
    const { id, fullname, address, phone, role } = req.body;

    const file = req.file;
    const avatar = file?.filename ?? "";

    await updateUser(
        id,
        fullname,
        address,
        phone,
        role,
        avatar
    );

    return res.redirect("/admin/User");
}

export { getHomepage, getCreatepage, getPostpgae,getViewuser,postUpdateuser,getadmincreateuser,postadminDeleUser };