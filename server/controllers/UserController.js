import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT,
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const update = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { fullName, avatarUrl } = req.body;

    jwt.verify(token, process.env.JWT, async (err, user) => {
      if (err) {
        return res.status(400).json({
          message: err,
        });
      }
      if (!user) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      const data = await UserModel.findByIdAndUpdate(
        user._id,
        { fullName, avatarUrl },
        { new: true }
      );

      return res.status(201).json({
        avatarUrl: data.avatarUrl,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        _id: data._id,
        createdAt: data.createdAt,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const { fullName, email, avatarUrl, createdAt } = await UserModel.findById({
      _id: id,
    });

    if (!fullName || !email || !avatarUrl || !createdAt) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    res.json({ fullName, email, avatarUrl, createdAt });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
