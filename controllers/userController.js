const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  const result = await mongodb.getDatabase().db().collection('users').find();
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users[0]);
  });
};

const addNewUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .insertOne(user);

  if (0 < result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'some error occurred while adding a new user');
  }
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .replaceOne({ _id: userId }, user);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'some error occurred while updating the user');
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection('users')
    .deleteOne({ _id: userId }, true);
  if (0 < result.deletedCount) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'some error occurred while deleting the user');
  }
};

module.exports = {
  getAll,
  getSingle,
  addNewUser,
  updateUser,
  deleteUser,
};
