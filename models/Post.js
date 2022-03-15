const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title."],
    trim: true,
    maxlength: [40, "Title cannot be more than 40 characters."],
  },
  description: {
    type: String,
    required: [true, "Please add a description."],
    maxlength: [200, "Description cannot be more than 200 characters."],
  },
  userName: {},
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);
