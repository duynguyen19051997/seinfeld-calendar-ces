const express = require("express");
const jwt = require("jsonwebtoken");

const habitController = require("./../controllers/HabitController");
const userController = require("./../controllers/UserController");

/**
* @swagger
* /profile:
*   get:
*     tags:
*       - User
*       - Habit
*     name: Profile
*     summary: Profile and show list of habits
*     security:
*        - bearerAuth: []
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: successfully
*       400:
*          desxription: Error
*/

const profileRouter = express.Router();

function profile(request, response) {
  const payload = jwt.decode(request.headers.authorization.split(" ")[1]);
  const userInfor = userController.getById(payload.userID);
  habitController.getItemsByUserID(payload.userID)
    .then((habits) => {
      userInfor.then((user) => {
        response.status(200).json({ userInformation: user, listOfHabits: habits });
      }).catch(err => response.status(404).json(err));
    })
    .catch(err => response.status(404).json(err));
}

profileRouter.get("/", profile);

module.exports = profileRouter;
