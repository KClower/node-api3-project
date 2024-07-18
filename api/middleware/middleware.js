const userModel = require('../users/users-model.js');



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
  User.getById(id)
    .then(user => {
      if (user) {
        res.status(200).json(req.user);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    })
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
};