import { createApp } from "./api/app";
import { createPhotographerRouter } from "./api/routes/photographer.routes";
import { GetAllPhotographersUseCase } from "./application/use-cases/get-all-photographers";
import { PrismaPhotographerRepository } from "./infra/repositories/prisma-photographer";

const repository = new PrismaPhotographerRepository()
const getAllPhotographersUseCase = new GetAllPhotographersUseCase(repository)
const photographerRouter = createPhotographerRouter(getAllPhotographersUseCase)

const app = createApp(photographerRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is running on port ${process.env.APP_PORT}`);
})
