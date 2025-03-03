import { Request, Response } from "express";
import fs from "fs";
// cloudinary
import cloudinary from "../config/cloudinary";

// models
// profiles
import Profiles from "../models/profiles.model";
// users
import Users from "../models/users.model";

// get profiles
export const getProfiles = async (req: Request, res: Response) => {
  try {
    const profiles = await Profiles.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "userDetail",
        },
      },
      {
        $unwind: "$userDetail",
      },
      {
        $group: {
          _id: "$author",
          profiles: {
            $push: {
              _id: "$_id",
              file: "$file",
              flag: "$flag",
              public_id: "$public_id",
            },
          },
        },
      },
      {
        $project: {
          author: "$_id",
          profiles: 1,
          _id: 0,
        },
      },
    ]);
    return res.status(200).json({ profiles });
  } catch (err) {
    return res.status(400).json({
      errors: {
        flag: "get profiles failed",
      },
    });
  }
};

// add new profile
export const addNewProfile = async (req: Request, res: Response) => {
  try {
    const user = await Users.findById(req._id);
    const folder = `tms/user_${user?.username}`;
    const { flag } = req.body;
    const author = req._id;

    if (!req.file) {
      res
        .status(200)
        .json({ errors: { flag: "select profile image file please" } });
      return;
    }

    const isProfileExist = await Profiles.findOne({ author, flag });

    if (isProfileExist) {
      const deleteResult = await cloudinary.uploader.destroy(
        isProfileExist.public_id
      );
      const result = await cloudinary.uploader.upload(req.file?.path || "", {
        folder,
      });
      fs.unlinkSync(req.file?.path);
      const updatedProfile = await Profiles.findByIdAndUpdate(
        isProfileExist._id,
        {
          file: result.secure_url,
          public_id: result.public_id,
        },
        { new: true, runValidators: true }
      );
      res.status(200).json({ profile: updatedProfile });
      return;
    }
    const result = await cloudinary.uploader.upload(req.file?.path || "", {
      folder,
    });
    fs.unlinkSync(req.file?.path);

    const file = result.secure_url;
    const public_id = result.public_id;

    const newProfile = await Profiles.create({
      author,
      public_id,
      file,
      flag,
    });
    res.status(200).json({ profile: newProfile });
    return;
  } catch (err) {
    res.status(400).json({ errors: { flag: "add new profile image error" } });
    return;
  }
};
