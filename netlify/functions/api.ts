import express from "express";
import serverless from "serverless-http";
import { registerRoutes } from "../../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let initialized = false;

const serverlessHandler = serverless(app);

export const handler: any = async (event: any, context: any) => {
    if (!initialized) {
        await registerRoutes(app);
        initialized = true;
    }
    return serverlessHandler(event, context);
};
