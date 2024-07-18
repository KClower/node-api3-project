const express = require('express');
const User = require('./users-model.js');
const Post = require('../posts/posts-model.js');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware.js');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Users could not be found." })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  User.getById(req.params.id)
  res.status(200).json(req.user);

  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  const newUser = req.body;
  if (!newUser.name) {
    return res.status(400).json({ message: "Please provide user name for the post. " });
  }
  User.insert(newUser)
    .then(result => {
      User.getById(result.id)
        .then(createdUser => {
          res.status(201).json({ message: "Created user successfully.", createdUser });
        })
    })
    .catch(error => {
      console, log(error);
      res.status(500).json({ message: "There was an error while saving the user to the database." });
    })
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  const id = req.params.id;
  const changes = req.body;
  if (!changes.name) {
    return res.status(400).json({ message: "Please provide user name for the change." });
  }
  User.update(id, changes)
    .then(updateUser => {
      if (!updateUser) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
      User.getById(id)
        .then(updatedUser => {
          return res.status(200).json({ message: "User updated successfully.", updatedUser });
        })
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The user information could not be modified." });
    });
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  const id = req.params.id;
  User.remove(id)
    .then(id => {
      if (!id) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json({ message: "The user has been successfully deleted." });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "The user could not be deleted." });
    })
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  const userId = req.params.id;
  User.getUserPosts(userId)
    .then(posts => {
      if (posts.length === 0) {
        return res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
      res.status(200).json(posts);
    })
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  const userId = req.params.id;
  const text = req.body.text;
  Post.insert({ user_id: userId, text })
    .then(createdPost => {
      res.status(201).json({ message: "Created post successfully.", createdPost });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "There was an error." })
    })
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;