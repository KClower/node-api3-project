const usersModel = require('../users/users-model.js');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const id = req.params.id;
  usersModel.getById(id)
    .then(foundUser => {

      if (!foundUser) {
        return res.status(404).json({ message: "user not found" })
      }
      req.user = foundUser
      next()
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ message: "Internal server error." })
    })

}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name)
    return res.status(400).json({ message: "missing required name field" })
  next()
}


function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text)
    return res.status(400).json({ message: "missing required text field" })
  next()
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};