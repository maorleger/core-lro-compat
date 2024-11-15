// @ts-check
const lro2 = require("@azure/core-lro2");
const lro3 = require("@azure/core-lro3");

/**
 * In core-lro2, the poller can be created synchronously or asynchronously and returned correctly.
 */
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

/**
 * In core-lro3, the poller can be created synchronously and returned correctly.
 */
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

/**
 * Imagine I have an async function that returns a poller. For example, in core-lro v2 we may have done something like:
 * - Create the poller
 * - await poller.poll()
 * - return the poller
 *
 * Because promises are unwrapped recursively in JavaScript, the poller is returned as a resolved promise of the operation. It's the equivalent of returning the awaited result of the polling operation. There's no way to "shallow" unwrap the promise and return the poller itself.
 */
const getLro3Async = async () => {
  return getLro3Sync();
};

async function main() {
  const lr2 = await getLro2(); // const lr2: lro2.SimplePollerLike<lro2.OperationState<any>, any>
  const lr3 = getLro3Sync(); // const lr3: lro3.PollerLike<lro3.OperationState<any>, any>
  const lr3async = await getLro3Async(); // const lr3async: any
  console.log({ lr2, lr3, lr3async });
}

main().catch(console.error);
