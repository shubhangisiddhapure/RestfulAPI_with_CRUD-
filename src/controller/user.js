/** @format */

const { validationResult } = require("express-validator");
const config = require("../config/default.json");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// console.log(config);
const validations = (req) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return error;
  } else {
    return false;
  }
};
const getSignedJwtToken = function (
  payload,
  secret =config.jwtSecret,
  expiresIn = 40000
) {
  return jwt.sign(payload, secret, { expiresIn });
};
const userSignup = async (req, res) => {
  const errors = validations(req);
  if (errors) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, password, dateOfbirth, address, description } = req.body;
  try {
    //see user exits
    let user = await User.findOne({ name });
    if (user) {
      res.status(400).json({ errors: [{ msg: "user already exits" }] });
    }
    // Create a User
    user = new User({
      name,
      password,
      dateOfbirth,
      address,
      description,
    });
    //encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    // Save User in the database
    await user.save();

    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
       const result = getSignedJwtToken(payload);
       return res.status(200).send({ msg: "user account craeted", result });
  } catch (error) {
    console.log(error);
    res.status(500).send("Serve error");
  }
};

const userSignin = async (req, res) => {
  const errors = validations(req);
  if (errors) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, password } = req.body;
    //see user exite
    let user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "invalid credentials" }] });
    }
      
    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };
      const result = getSignedJwtToken(payload);
      return res.status(200).send({ result });
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with id " + req.user.id });
    }
    return res.status(200).send({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).send("sever error");
  }
};

const deteleUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.user.id);
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found with id " + req.user.id });
    }
    return res.status(200).send({ message: "User deleted successfully!" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("sever error");
  }
};
const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.user.id, {
        adderse: req.body.adderse,
        description: req.body.description,
      });
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found with id " + req.user.id });
      }
      await user.save();
      return res.status(200).send({ message: "User Updated successfully!" });
    } catch (err) {
      console.log(err);
      return res.status(500).send("sever error");
    }
    
}
module.exports = { userSignup, userSignin, getUser, deteleUser, updateUser };
