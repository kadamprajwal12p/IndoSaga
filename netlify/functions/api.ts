import express from "express";
import serverless from "serverless-http";
import { registerRoutes } from "../../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let initialized = false;

const serverlessHandler = serverless(app);

export const handler: any = async (event: any, context: any) => {
    try {
        if (!initialized) {
            console.log("Initializing lambda...");
            await registerRoutes(app);
            initialized = true;
            console.log("Lambda initialized successfully.");
        }
        return await serverlessHandler(event, context);
    } catch (error: any) {
        console.error("LAMBDA_ERROR:", error);
        return {
            statusCode: 502,
            body: JSON.stringify({
                message: "Internal Server Error in Lambda",
                error: error.message,
                stack: error.stack
            })
        };
    }
};
