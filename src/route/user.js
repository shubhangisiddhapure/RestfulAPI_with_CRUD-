/** @format */

const express = require("express");

const auth = require("../middelware/auth");
const { check} = require("express-validator/check"); 
const { userSignup } = require('../controller/user'); 
const { userSignin } = require("../controller/user");
const { getUser } = require("../controller/user");
const { deteleUser } = require("../controller/user");
const { updateUser } = require("../controller/user");
const router = express.Router();
// Create and Save a new User
router.post(
  "/create",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("dateOfbirth", "Date Of Birth is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty().exists(),
  ],
  userSignup
);

//Log-in a user for token
  router.post(
    "/login",
    [
      check("name", "please enter a valid Name").not().isEmpty(),
      check("password", "please enter valid password").not().isEmpty().exists(),
    ],
    userSignin
  );
// Find a single User with a UserId
router.get("/getUser", auth, getUser);

// Delete a user with the specified UserId in the request
router.delete("/deleteUser", auth, deteleUser);

// Update a User identified by the UserId in the request
router.put("/updateUser", auth, updateUser);

module.exports = router;
