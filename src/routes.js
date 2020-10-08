import {Router} from "express";
import HomeController from "./app/controlles/HomeController.js"
import UserController from "./app/controlles/UserController.js";
import AddressController from "./app/controlles/AddressController.js";
const routes = new Router();

routes.get("/", HomeController.index);

routes.get("/users", UserController.index);
routes.get("/usersdel", UserController.listusersdel);
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);


routes.get("/address", AddressController.index);
routes.post("/address", AddressController.store);
routes.put("/address/:id", AddressController.update);
routes.delete("/address/:id", AddressController.destroy);

export default routes;