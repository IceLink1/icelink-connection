import Comment from "../models/Comment.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const create = async (req, res) => {
  try {
    const { PostId } = req.body;
    const user = await User.findById({ _id: req.userId });

    if (!user) {
      return res.status(402).json("Нет доступа");
    }
    const doc = new Comment({
      refPost: PostId,
      text: req.body.text,
      user: {
        _id: user._id,
        fullName: user.fullName,
        avatarUrl: user.avatarUrl,
      },
    });

    await Post.findByIdAndUpdate(
      {
        _id: PostId,
      },
      {
        $inc: { commentCount: 1 },
      }
    );
    const comment = await doc.save();

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать комментарию",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5

    if (!id) {
      return res.status(400).json("Комментарии не найдены");
    }
    const comments = await Comment.find({ refPost: id }).limit(limit).sort({ createdAt: -1 })

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json("Комментария не найдена");
    }

    await Comment.findByIdAndDelete({ _id: id });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};

export const update = async (req, res) => {
  try {
    const { _id, text } = req.body;

    if (!_id) {
      return res.status(400).json("Комментария не найдена");
    }

    const comment = await Comment.findByIdAndUpdate(
      { _id },
      { text },
      { new: true }
    );

    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};

export const getLastComments = async (req, res) => {
  try {
    const comments = await Comment.find().limit(5).sort({ createdAt: -1 }).exec();

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить комментарии",
    });
  }
};
