import prisma from "../prisma/prisma.js";

export const createIncident = async (req, res) => {
    try {
        const {
            title,
            description,
        } = req.body;

        const incident = await prisma.incident.create({
            data: {
                tenantId: req.user.tenantId,
                title,
                description,
                createdById: req.user.userId,
            },
        });

        res.status(201).json({
            success: true,
            incident,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const getIncidents = async (req, res) => {
    try {
        const {
            status,
            search,
        } = req.query;

        const incidents =
            await prisma.incident.findMany({
                where: {
                    tenantId: req.user.tenantId,

                    ...(status && {
                        status,
                    }),

                    ...(search && {
                        title: {
                            contains: search,
                        },
                    }),
                },

                orderBy: {
                    createdAt: "desc",
                },
            });

        res.json({
            success: true,
            count: incidents.length,
            incidents,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const updateIncidentStatus = async (
    req,
    res
) => {
    try {
        const { id } = req.params;

        const { status } = req.body;

        // tenant-scoped lookup
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

        const updatedIncident =
            await prisma.incident.update({
                where: {
                    id,
                },

                data: {
                    status,
                    version: {
                        increment: 1,
                    },
                },
            });

        res.json({
            success: true,
            incident: updatedIncident,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};