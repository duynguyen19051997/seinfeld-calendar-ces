const express = require("express");
const jwt = require("jsonwebtoken");

const CheckedDay = require("./../models/CheckedDay");
const checkedController = require("./../controllers/CheckedDayController");
const habitController = require("./../controllers/HabitController");
const util = require("./../utils/functionUtils");

/**
* @swagger
* /checked:
*   post:
*     tags:
*       - CheckedDay
*     name: Checked Day
*     summary: Checked Day
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     produces:
*       - application/json
*     parameters:
*       - in: "body"
*         name: "body"
*         description: "Checked Day of Habit"
*         required: true
*         schema:
*         $ref: '#/definitions/CheckedDay'
*     responses:
*       200:
*         description: Success!
*         content: {}
*         schema:
*           $ref: '#/definitions/CheckedDay'
*       401:
*         description: Fail!
*/

const checkedRouter = express.Router();

function addCheckedDay(request, response, next) {
  const payload = jwt.decode(request.headers.authorization.split(" ")[1]);
  const input = {
    habitID: request.body.habitID,
    userID: payload.userID,
    dayChecked: new Date(request.body.dayChecked),
    note: request.body.note,
    color: "fffff",
    status: request.body.status,
  };
  const checkedDay = checkedController.getItemByDayChecked(
    input.dayChecked, input.userID, input.habitID,
  );
  const habit = habitController.getItemByHabitIDAndUserID(input.habitID, input.userID);
  checkedDay.then((check) => {
    if (isNaN(check)) {
      return response.status(400).json("Checked Day is exist!");
    }
    return habit.then((h) => {
      if (h._id !== null && util.compareDate(input.dayChecked, h.timeEnd) <= 0) {
        if (input.status === 1) {
          h.totalFinishDay += 1;
        } else h.totalUnfinishedDay += 1;
        h.save();
        const result = new CheckedDay(input);
        return result.save(() => {
          checkedController.getCheckedDaysByUserIDAndHabitID(
            input.userID, input.habitID,
          )
            .then(checked => response.status(200).json(checked))
            .catch(err => next(err));
        });
      }
      return response.status(400).json("Checked Day Fail!");
    })
      .catch(err => next(err));
  })
    .catch(err => next(err));
}

checkedRouter.post("/", addCheckedDay);

module.exports = checkedRouter;
