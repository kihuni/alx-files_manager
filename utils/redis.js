const redis = require('redis');
const { promisify } = require('util'); // THIS IS FOR CONVERTING CLIENT METHODS INTO PROMISES

class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.error(`Error: ${err}`);
    });
  }

  // This functions pings Redis to check if the connection is alive
  async isAlive() {
    return promisify(this.client.ping).bind(this.client)() === 'PONG';
  }

  // This function uses getAsync retrieve the value for a given key

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    return getAsync(key);
  }

  // This function uses the setAsync method to store a value
  // with an expiration time set by the duration argument

  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    return setAsync(key, value, 'EX', duration);
  }

  // This function uses the delAsync method to remove a value for a given key

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    return delAsync(key);
  }
}

module.exports = RedisClient;
