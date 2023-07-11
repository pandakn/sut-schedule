import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const host = process.env.REDIS_HOST || "127.0.0.1";
const port = 6379;

const client = createClient({
  socket: {
    host,
    port,
  },
});

(async () => {
  await client.connect();
})();

client.on("error", (err) => console.log("Redis Client Connection Error", err));

const connectRedis = () => {
  return client;
};

export default connectRedis;
