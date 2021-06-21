const Redis = require('redis');
const { promisify } = require('util');

const logger = require('./logger');

class RedisCache {
  constructor({ config, logger }) {
    this.client = Redis.createClient({
      port: config.port,
      host: config.host,
    });
    this.logger = logger;
    this.setObject = this.setObject.bind(this);
    this.getObject = this.getObject.bind(this);
    this.expireCache = this.expireCache.bind(this);
    this.client.expireAsync = promisify(this.client.expire).bind(this.client);
    this.client.hgetAsync = promisify(this.client.hget).bind(this.client);
    this.client.hsetAsync = promisify(this.client.hset).bind(this.client);
  }

  async expireCache(key, expiryTime) {
    return this.client.expireAsync(key, expiryTime).catch(this.logger.error);
  }

  async setObject(key, field, value) {
    const stringValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    const keySet = await this.client
      .hsetAsync(key, field, stringValue)
      .catch(this.logger.error);

    if (keySet === 0)
      this.logger.info(`Key: ${field} already exists in redis hash`);
    if (keySet === 1) this.logger.info(`Key: ${field} saved to redis`);
    return keySet;
  }

  async getObject(key, field) {
    const value = await this.client
      .hgetAsync(key, field)
      .catch(this.logger.error);
    return value ? JSON.parse(value) : null;
  }
}

const host = process.env.REDIS_HOST || '';
const port = process.env.REDIS_PORT || 6379;

const redisConfig = {
  config: {
    port,
    host,
  },
  logger,
};

const redisCache = new RedisCache(redisConfig);
const { client } = redisCache;

client.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

module.exports = redisCache;
