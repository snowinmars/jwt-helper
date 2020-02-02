const fs = require('fs');
const jwt = require('jsonwebtoken');
const keys = {
    google: fs.readFileSync('keys/google.private.key'),
};
const fastify = require('fastify')({ logger: true });
const port = 3141;

fastify.post('/', async (request, response) => await handle(request, response));

const start = async () => {
  try {
    await fastify.listen(port)
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};

start();

// this is the endpoint method
handle = (request, response) => {
    const data = getData(request, response);
    const payload = getPayload(response, data);
    const key = getKey(response, data);

    const token = jwt.sign(payload, key, { algorithm: 'RS256'});

    const result = {
        token: token
    };

    console.log(`[${new Date()}] done`);

    return result;
}

getData = (request, response) => {
    const body = request.body;

    if (body) {
        console.log(`Body: ${body}`);
    } else {
        throw 'Request body not found';
    }

    return body;
};

getPayload = (response, data) => {
    const payload = data.payload;

    if (!payload) {
        throw 'Payload not found'
    }

    return payload;
};

getKey = (response, data) => {
    const key = data.key;

    if (!key) {
        throw 'Key not found';
    }

    if (key === 'google-api') {
        return keys.google;
    } else {
        throw `Key '${key}' not found`;
    }
};