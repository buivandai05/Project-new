import express, { Express } from "express";
import { getPostpgae, getCreatepage, getHomepage,getViewuser,postUpdateuser,getadmincreateuser, postadminDeleUser} from "controllers/user.controller";
import { getDashboar, getuserPage,getProduct, getOrder } from "controllers/admin/dashbroad.controller";
import fileUploadMiddleware from "src/middleware/multer";
const route = express.Router();


const webRoutes = (app: Express) => {
    route.get("/", getHomepage);
    route.post("/create", getPostpgae);
    route.get("/create", getCreatepage);
   

    // phần của admin
    route.get("/admin",getDashboar);
   
    route.get("/admin/User",getuserPage);
    route.get("/admin/Product",getProduct);
    route.get("/admin/Order",getOrder);
     route.get("/admin/create",getadmincreateuser);
     route.post("/admin/hanld-create-user",fileUploadMiddleware("avatar"), getPostpgae);
      route.post("/admin/delete-user/:id",postadminDeleUser);
      route.get("/admin/view-user/:id",getViewuser);
        route.post("/admin/update-user",fileUploadMiddleware("avatar"), postUpdateuser);
    app.use("/", route);
};

export default webRoutes;