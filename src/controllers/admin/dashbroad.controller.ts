import { Response,Request } from "express";
import { getAllUsers } from "services/user_service";
const getDashboar = async (req:Request,res:Response)=>{
    return res.render("admin/Dashbroad/show.ejs");
}
const getuserPage =async (req:Request,res:Response)=>{
    const users= await getAllUsers();
    return res.render("admin/User/showUser",{
        users:users
    });
}

const getProduct =async (req:Request, res:Response)=>{
    return res.render("admin/Product/showProduct");
}
const getOrder = async (req:Request, res:Response)=>{
    return res.render("admin/Order/showOrder");
}
export {getDashboar, getuserPage,getProduct,getOrder};
