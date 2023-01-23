// make post request of login and register with password-hash and token provider
const router = require("express").Router();
const UserModel = require("../modules/userModel");
const map_user_req = require("../../helpers/map_user_req");
const passwordHash = require("password-hash");
const JWT = require('jsonwebtoken')
const config = require('../configs/index')

function generateToken(data) {
    const token = JWT.sign({
        _id: data._id,
    },config.JWT_SECRET)
    return token
}

router.get("/", (req, res, next) => {
  console.log('get in user')
  UserModel.find((err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.post("/register", (req, res, next) => {
  const data = req.body;
  const newUser = new UserModel({});
  console.log(data);
  const mappedUser = map_user_req(newUser, data);
  mappedUser.password = passwordHash.generate(data.password);
  mappedUser.save((err, user) => {
    if (err) return next(err);
    res.json(user);
  });
});

router.post("/login", (req, res, next) => {
  const data = req.body;
  console.log('user login ', data)
  UserModel.findOne({
    $or: [{ username: data.username }, { email: data.username }],
  })
    .then((user) => {
      if (!user) {
        return next({
          msg: "User Not Found",
          status: 400,
        });
      }
      // password verification
      const isMatched = passwordHash.verify(req.body.password, user.password);
      if (!isMatched) {
        return next({
          msg: "Invalid Password",
          status: 400,
        });
      }
      const token = generateToken(user)
      res.json({
        user,
        token
      });
    })
    .catch((err) => {
      return next(err);
    });
});

module.exports = router;
