import express, { Request, Response, NextFunction } from "express";
import sequelize from "./config/database.config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello, TypeScript + Express!" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
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
