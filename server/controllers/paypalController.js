module.exports = {
  config: function (req, res) {
    res.send(process.env.PAYPAL_CLIENT_ID);
  },
};
