import { buildApp } from "./api/app";
const app = buildApp();

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
