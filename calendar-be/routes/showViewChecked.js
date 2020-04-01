const express = require("express");
const jwt = require("jsonwebtoken");

const habitController = require("./../controllers/HabitController");
const checkController = require("./../controllers/CheckedDayController");


/**
* @swagger
* /show_view_checked:
*   post:
*     tags:
*       - CheckedDay
*       - Habit
*     name: Show View Checked in habitS
*     summary: Show View Checked
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definition/CheckedDay'
*           type: object
*           properties:
*             habitID:
*               type: string
*         required:
*           - habitID
*     responses:
*       200:
*         description: Success
*       400:
*         description: Nothing to show
*/


const route = express.Router();

function showViewChecked(request, response) {
  const payload = jwt.decode(request.headers.authorization.split(" ")[1]);
  const { habitID } = request.body;
  const habit = habitController.getItemByHabitIDAndUserID(habitID, payload.userID);
  const check = checkController.getCheckedDaysByUserIDAndHabitID(payload.userID, habitID);
  habit.then((item) => {
    check.then(items => response.status(200).json({ habit: item, checkedDays: items }))
      .catch(err => response.status(400).json(err));
  }).catch(err => response.status(400).json(err));
}

route.post("/", showViewChecked);

module.exports = route;
