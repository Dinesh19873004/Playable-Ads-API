import {Queue} from "bullmq";
import {Redis} from "ioredis";

const connection=new Redis(); // default localhost:6379

export const renderQueue=new Queue("renderQueue", {connection});
