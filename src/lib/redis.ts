import { Redis, RedisConfigNodejs } from "@upstash/redis";

const _redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
} as RedisConfigNodejs);

type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;
class RedisWithPrefix<T extends {}> {
  prefix: string;
  client: Redis;
  constructor(redisClient: Redis, prefix: string) {
    this.client = redisClient;
    this.prefix = prefix;
  }

  async del(key: string) {
    return this.client.del(`${this.prefix}:${key}`);
  }
  async hdel(key: string, ...args: DropFirst<Parameters<typeof _redis.hdel>>) {
    return this.client.hdel(`${this.prefix}:${key}`, ...args);
  }
  async hgetall(key: string) {
    return this.client.hgetall<T>(`${this.prefix}:${key}`);
  }
  async getall() {
    const keys = await this.keys();
    const pipeline = this.client.pipeline();
    for (const key of keys) {
      pipeline.hgetall(key);
    }
    return await pipeline.exec<T[]>();
  }

  async getallandlastkey() {
    const keys = await this.keys();
    const pipeline = this.client.pipeline();
    for (const key of keys) {
      pipeline.hgetall(key);
    }
    const values = await pipeline.exec<T[]>();
    const returnedValue: [string, T][] = [];
    for (const i in keys) { 
      const split = (keys[i] as unknown as string).split(":");
      returnedValue[i] = [
        split[split.length - 1] as unknown as string,
        values[i] as unknown as T,
      ];
    }
    return returnedValue;
  }

  async hmset(key: string, kv: Partial<T>) {
    return this.client.hmset(`${this.prefix}:${key}`, kv);
  }
  async keys() {
    return this.client.keys(`${this.prefix}:*`);
  }
}

class RedisWithPrefixPlus<T extends {}> extends RedisWithPrefix<T> {}

export function toFullKey(elements: string[]) {
  return elements.join(":");
}

const ENVIRONMENT = "production";

const PLAYER_REDIS_KEY = toFullKey(["nugget", ENVIRONMENT, "players"]);
type Player = {
  xp: number;
};

const player = new RedisWithPrefixPlus<Player>(_redis, PLAYER_REDIS_KEY);

export const redis = {
  player,
  toFullKey,
};
