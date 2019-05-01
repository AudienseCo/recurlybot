module.exports = (incomingWebhook) => {
  const that = {};

  that.send = (channel, msg, cb) => {
    const finalMsg = Object.assign({ channel }, msg);
    return incomingWebhook.send(finalMsg, cb);
  };

  return that;
};
