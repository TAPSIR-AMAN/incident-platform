import prisma from "../prisma/prisma.js";

export const addComment = async (
    req,
    res
) => {
    try {
        const { id } = req.params;

        const { message } = req.body;

        // verify incident belongs to tenant
        const incident =
            await prisma.incident.findFirst({
                where: {
                    id,
                    tenantId: req.user.tenantId,
                },
            });

        if (!incident) {
            return res.status(404).json({
                success: false,
                message: "Incident not found",
            });
        }

        const comment =
            await prisma.comment.create({
                data: {
                    tenantId: req.user.tenantId,
                    incidentId: id,
                    userId: req.user.userId,
                    message,
                },
            });

        // audit log
        await prisma.auditLog.create({
            data: {
                tenantId: req.user.tenantId,
                incidentId: id,
                userId: req.user.userId,
                action: "COMMENT_ADDED",
                details: message,
            },
        });

        res.status(201).json({
            success: true,
            comment,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getIncidentTimeline = async (
    req,
    res
) => {
    try {
        const { id } = req.params;

        const logs =
            await prisma.auditLog.findMany({
                where: {
                    incidentId: id,
                    tenantId: req.user.tenantId,
                },

                orderBy: {
                    createdAt: "desc",
                },
            });

        res.json({
            success: true,
            logs,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};