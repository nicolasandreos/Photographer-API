import { createApp } from "./api/app";
import { createPhotographerController } from "./api/controllers/photographer.controller";
import { createPhotographerRouter } from "./api/routes/photographer.routes";

const photographerController = createPhotographerController();
const photographerRouter = createPhotographerRouter(photographerController)

const app = createApp(photographerRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
})
