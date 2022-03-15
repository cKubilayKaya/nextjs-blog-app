import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
import jwt from "jsonwebtoken";

dbConnect();

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const user = await User.findOne({ email: req.body.email });
        if (user && user.password == req.body.password) {
          const token = await jwt.sign(
            {
              _id: user._id,
              email: user.email,
              name: user.name,
            },
            "secretkey",
            { expiresIn: "5h" }
          );
          res.status(201).json({
            success: true,
            data: {
              user: { _id: user._id, email: user.email, name: user.name },
              token: token,
            },
          });
        } else {
          res.status(400).json({ success: false, error });
        }
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
