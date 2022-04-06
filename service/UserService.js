const { User, Role } = require("../models");
var bcrypt = require("bcryptjs");

const addUser = (req, res) => {
  bcrypt.hash(req.body.password, 10).then(async (hashPassword) => {
    const user = { ...req.body, password: hashPassword };
    const addedUser = await User.create(user);
    res.status(201).send({ user: addedUser.dataValues });
    // bcrypt.compare(req.body.password, hashPassword).then((match) => {
    //   console.log("match", match);
    // });
  });
};

const getAllUsers = async (req, res) => {
  const allUser = await User.findAll({
    include: Role,
    order: [["user_id", "DESC"]],
  });
  res.status(200).send({ allUser });
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findOne({ where: { user_id: userId } });
  res.status(200).send({ user });
};

const updateUserById = async (req, res) => {
  console.log("req.originalUrl", req.originalUrl);
  const userId = req.params.userId;
  const user = await User.findOne({ where: { user_id: userId } });
  if (user) {
    await User.update(req.body, {
      where: {
        user_id: userId,
      },
    });
    res.status(200).send({
      ...user.dataValues,
      username: req.body.username,
      password: req.body.password,
    });
  } else {
    res.status(400).send({ message: "user not found" });
  }
};

const activateOrDeactivateUserById = async (req, res) => {
  console.log("req.originalUrl", req.originalUrl);
  const userId = req.params.userId;
  const status = req.query.status;
  const user = await User.findOne({ where: { user_id: userId } });
  if (user) {
    await User.update(
      { ...user, status: status },
      {
        where: {
          user_id: userId,
        },
      }
    );
    const updatedUser = await User.findOne({ where: { user_id: userId } });
    res.status(200).send({
      ...updatedUser.dataValues,
    });
  } else {
    res.status(400).send({ message: "user not found" });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  updateUserById,
  activateOrDeactivateUserById,
};
