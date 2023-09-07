import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// app.post("/assign-permission/:roleName", async (req, res) => {
//     const roleName = req.params.roleName;
//     const permissionNames = req.body.permissions; // An array of permission names

//     try {
//         const role = await prisma.role.findUnique({
//             where: { name: roleName },
//         });

//         if (!role) {
//             return res.status(404).json({ error: "Role not found" });
//         }

//         // Find permissions by name and create entries in the junction table
//         const permissions = await prisma.permission.findMany({
//             where: { name: { in: permissionNames } },
//         });

//         if (permissions.length !== permissionNames.length) {
//             return res.status(404).json({ error: "Some permissions not found" });
//         }

//         // Create entries in the junction table
//         const rolePermissionCreate = permissions.map((permission) => ({
//             roleId: role.id,
//             permissionId: permission.id,
//         }));

//         await prisma.rolePermission.createMany({
//             data: rolePermissionCreate,
//         });

//         res.json({ message: "Permissions assigned to the role" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error assigning permissions to role" });
//     }
// });