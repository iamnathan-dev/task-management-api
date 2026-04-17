import express, { Request, Response, NextFunction } from "express";
import sequelize from "./config/database.config";
import authRoutes from "./routes/auth.route";
import teamRoutes from "./routes/team.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, TypeScript + Express!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  res.status(status).json({ error: err.message });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection established");

    await sequelize.sync({ alter: true });
    console.log("Models synced");

    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
  } catch (err) {
    console.error("Unable to connect to DB:", err);
    process.exit(1);
  }
};

start();
