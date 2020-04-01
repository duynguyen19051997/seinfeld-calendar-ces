const mongoose = require("mongoose");

/**
 *  @swagger
 *  definitions:
 *    Habit:
 *      type: object
 *       properties:
 *          userID: type: string
 *          name: type: string
 *          slogan: type: string
 *          timeBegin: type: string
 *          timeEnd: type: string
 *          after: type: number
 *          repeat: type: number
 *          color: type: string
 *          totalFinishDay: type: number
 *          totalUnfinishedDay: type: number
 *       required:
 *          - name
 *          - slogan
 *          - color
 *          - timeBegin
 *       methods:
 *          getAfter
 */

const habitSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: "idUser is required !",
  },
  name: {
    type: String,
    required: "Name is required !",
  },
  slogan: {
    type: String,
    required: "Slogan is required !",
  },
  timeBegin: {
    type: Date,
    required: "timeBegin is required !",
  },
  timeEnd: { type: Date },
  after: { type: Number },
  repeat: [{ type: Number }],
  color: {
    type: String,
    required: "Color is required !",
  },
  totalFinishDay: { type: Number },
  totalUnfinishedDay: { type: Number },
});

habitSchema.methods.getAfter = (timeBegin, timeEnd) => {
  const secondsTime = timeEnd.getTime() - timeBegin.getTime();
  return secondsTime / (1000 * 3600 * 24);
};

module.exports = mongoose.model("Habit", habitSchema);
