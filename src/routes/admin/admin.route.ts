import { Router } from "express";
import { AdminUserController } from "../../controllers/admin/admin.controller";
import { adminOnlyMiddleware, authorizedMiddleware } from "../../middlewares/authorization.middleware";

let adminUserController = new AdminUserController();
const router = Router();

router.post('/users/', adminUserController.createUser);
router.get('/users/:id', adminUserController.getUserById);
router.get('/users/', authorizedMiddleware, adminOnlyMiddleware, adminUserController.getAllUser);
// router.put('/api/admin/users/:id', adminUserController.updateOneUser);
router.delete('/apiusers/:id', adminUserController.deleteOneUser);

export default router;

// CRUD for users - admin only