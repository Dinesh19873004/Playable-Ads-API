import {Worker} from "bullmq";
import IORedis from "ioredis";
import {execa} from "execa";
import fs from "fs";

const connection=new IORedis({maxRetriesPerRequest: null});

// ensure outputs directory exists
if (!fs.existsSync("outputs")) {
    fs.mkdirSync("outputs");
}

const worker=new Worker(
    "renderQueue",
    async (job) => {
        const {inputFile, outputFile}=job.data;

        await execa("ffmpeg", [
            "-loop",
            "1",
            "-i",
            inputFile,
            "-c:v",
            "libx264",
            "-t",
            "5",
            "-pix_fmt",
            "yuv420p",
            outputFile,
        ]);

        return outputFile; // saved video path
    },
    {connection}
);

worker.on("completed", (job, result) => {
    console.log(`Job ${job.id} completed: ${result}`);
});

worker.on("failed", (job, err) => {
    console.error(`Job ${job.id} failed: ${err.message}`);
});
