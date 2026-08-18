import { buildApp } from "./api/app";
import { AppException } from "./exceptions/app";

const app = buildApp();
const app_port = Number(process.env.APP_PORT);
if (!app_port) {
  throw new AppException("APP_PORT environment variable is not set");
}

app.listen(app_port, "0.0.0.0", () => {
  console.log(`Server is running on port ${app_port}`);
});
