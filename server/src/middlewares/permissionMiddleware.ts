import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function checkPermissions(permissions) {
    return async (req, res, next) => {
        const user = req.user; // Assuming you have user data in the request object
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const role = await prisma.role.findUnique({
                where: { id: user.roleId }, // Assuming user has a roleId field
                include: { rolePermissions: { include: { permission: true } } },
            });

            if (!role) {
                return res.status(403).json({ message: "Forbidden" });
            }

            const userPermissions = role.rolePermissions.map(
                (rolePermission) => rolePermission.permission.name
            );

            // Check if the user has all the required permissions
            const hasAllPermissions = permissions.every((permission) =>
                userPermissions.includes(permission)
            );

            if (!hasAllPermissions) {
                return res.status(403).json({ message: "Forbidden" });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error checking permissions" });
        }
    };
}

export default checkPermissions