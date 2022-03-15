import dbConnect from "../../../utils/dbConnect";
import Post from "../../../models/Post";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const post = await Post.findById(id);

        if (!post) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }

      break;

    case "PUT":
      try {
        const post = await Post.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!post) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: post });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "DELETE":
      try {
        const deletedPost = await Post.deleteOne({ _id: id });

        if (!deletedPost) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: deletedPost });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
