import express, { Express } from "express";
import { getPostpgae, getCreatepage, getHomepage } from "../controllers/user.controller";

const route = express.Router();

const webRoutes = (app: Express) => {
    route.get("/", getHomepage);
    route.post("/create", getPostpgae);
    route.get("/create", getCreatepage);

    app.use("/", route);
};

export default webRoutes;