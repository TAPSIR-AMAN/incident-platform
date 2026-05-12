import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Incident Platform API Running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/incidents", commentRoutes);

export default app;