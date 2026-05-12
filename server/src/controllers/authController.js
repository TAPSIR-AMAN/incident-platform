import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

export const register = async (req, res) => {
    try {
        const { companyName, name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Create Tenant
        const tenant = await prisma.tenant.create({
            data: {
                name: companyName,
            },
        });

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create Admin User
        const user = await prisma.user.create({
            data: {
                tenantId: tenant.id,
                name,
                email,
                passwordHash: hashedPassword,
                role: "ADMIN",
            },
        });

        // Generate JWT
        const token = jwt.sign(
            {
                userId: user.id,
                tenantId: user.tenantId,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        const safeUser = {
            id: user.id,
            tenantId: user.tenantId,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        res.status(201).json({
            success: true,
            token,
            user: safeUser,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                tenantId: user.tenantId,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        const safeUser = {
            id: user.id,
            tenantId: user.tenantId,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        res.json({
            success: true,
            token,
            user: safeUser,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};