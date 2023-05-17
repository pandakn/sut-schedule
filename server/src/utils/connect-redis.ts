import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

(async () => {
  await client.connect();
})();

client.on("error", (err) => console.log("Redis Client Connection Error", err));

const connectRedis = () => {
  return client;
};

export default connectRedis;
