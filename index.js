// @ts-check
const lro2 = require("@azure/core-lro2");
const lro3 = require("@azure/core-lro3");

const getLro2 = async () => {
  return await lro2.createHttpPoller({
    sendInitialRequest: () => {
      return Promise.resolve({
        flatResponse: {},
        rawResponse: {
          statusCode: 200,
          headers: {},
          body: {
            status: "InProgress",
            retryAfter: 1,
          },
        },
      });
    },
    sendPollRequest: () => {
      return Promise.resolve({
        flatResponse: {},
        rawResponse: {
          statusCode: 200,
          headers: {},
          body: {
            status: "InProgress",
            retryAfter: 1,
          },
        },
      });
    },
  });
};

const getLro3Async = async () => {
  return getLro3Sync();
};

const getLro3Sync = () => {
  return lro3.createHttpPoller({
    sendInitialRequest: () => {
      return Promise.resolve({
        flatResponse: {},
        rawResponse: {
          request: {
            method: "GET",
            url: "http://example.com",
          },
          statusCode: 200,
          headers: {},
          body: {
            status: "InProgress",
            retryAfter: 1,
          },
        },
      });
    },
    sendPollRequest: () => {
      return Promise.resolve({
        flatResponse: {},
        rawResponse: {
          request: {
            method: "GET",
            url: "http://example.com",
          },
          statusCode: 200,
          headers: {},
          body: {
            status: "InProgress",
            retryAfter: 1,
          },
        },
      });
    },
  });
};
async function main() {
  const lr2 = await getLro2();
  const lr3 = getLro3Sync();
  const lr3async = await getLro3Async();
}

main().catch(console.error);
