const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const userController = require("./../controllers/UserController");


/**
* @swagger
* /edit:
*   post:
*     tags:
*       - User
*     name: Edit user information
*     summary: Edit user information
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
*           $ref: '#/definitions/User'
*           type: object
*           properties:
*             fullname:
*               type: string
*         required:
*           - fullname
*     responses:
*       200:
*         description: Edit successfully
*       400:
*         description: Error
*/

function editUserInfor(request, response) {
  const payload = jwt.decode(request.headers.authorization.split(" ")[1]);
  userController.getById(payload.userID)
    .then((user) => {
      user.fullname = request.body.fullname;
      user.save(() => response.status(200).json("Edit successfully"));
    })
    .catch(err => response.status(400).json(err));
}

router.post("/", editUserInfor);

module.exports = router;
