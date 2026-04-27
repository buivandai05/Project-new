import { Request, Response } from "express";
import { getAllUsers, handleCreateUser } from "../services/user_service";
// import { name } from "ejs";

const getHomepage = async (req: Request, res: Response) => {
    const users =await getAllUsers();
    // console.log("check user", users);
    return res.render("Home",{
        users:users
    });
};

const getCreatepage = (req: Request, res: Response) => {
    return res.render("create-use");

};

const getPostpgae =async (req: Request, res: Response) => {
    const { fullname, email,address } = req.body;
    await handleCreateUser(fullname,email,address);

    return res.redirect("/");
};

export { getHomepage, getCreatepage, getPostpgae };