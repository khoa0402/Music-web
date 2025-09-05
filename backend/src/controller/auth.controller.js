import { User } from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userID" });
    }

    //kiểm tra nếu người dùng đã tồn tại
    let user = await User.findOne({ clerkId: id });

    //đăng kí nếu người dùng chưa tồn tại
    if (!user) {
      //đăng kí người dùng mới
      user = await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        avatar: imageUrl,
      });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};
