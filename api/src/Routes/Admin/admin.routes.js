import { Router } from "express";
import { deleteUserController, getUserController, getEmailsControllers, deleteEmailController, searchbarUserController, searchbarEmailController } from "../../Controllers/Admin/admin.controllers.js";

export const router = Router()

router.get("/getUser", getUserController)
router.get("/getEmail", getEmailsControllers)
router.delete("/deleteUser", deleteUserController)
router.delete("/deleteEmail", deleteEmailController)
router.post("/searchbarUser", searchbarUserController)
router.post("/searchbarEmail", searchbarEmailController)

/*

FILTRO POR FECHA?
como recibir info por body en un get


implementar react bootstrap??


recargar en front al elminar un usuario...(en admindashboard)
control de admin/usuario con cookies y no localhost 
mejorar searchbar
*/