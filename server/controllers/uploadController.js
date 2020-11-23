module.exports = {
  uploadImage: function (req, res) {
    res.send(`/${req.file.path.replace(/\\/g, "/")}`);
  },
};
