import { Redis } from "ioredis";
export const redis = new Redis(process.env.REACT_APP_REDIS_URL);