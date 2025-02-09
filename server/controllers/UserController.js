import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const checkUser = await UserModel.find({ email: req.body.email });

    if (checkUser.length) {
      return res.status(400).json({
        message: "Пользователь с таким email уже существует",
      });
    }

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
      message: "Не удалось авторизоваться",
    });
  }
};

export const update = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { sex, location, bio, birthday, fullName, avatarUrl } = req.body;

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
        { sex, location, bio, birthday, fullName, avatarUrl },
        { new: true }
      );

      return res.status(201).json({
        avatarUrl: data.avatarUrl,
        birthday: data.birthday,
        fullName: data.fullName,
        location: data.location,
        email: data.email,
        role: data.role,
        bio: data.bio,
        _id: data._id,
        sex: data.sex,
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
    const {
      sex,
      location,
      bio,
      birthday,
      fullName,
      email,
      avatarUrl,
      createdAt,
    } = await UserModel.findById({
      _id: id,
    });

    if (!fullName || !email || !avatarUrl || !createdAt) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    res.json({
      sex,
      location,
      bio,
      birthday,
      fullName,
      email,
      avatarUrl,
      createdAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
