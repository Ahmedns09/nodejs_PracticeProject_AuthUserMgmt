const express = require("express");

const router = express.Router();

let friends = {
  "johnsmith@gamil.com": {
    firstName: "John",
    lastName: "Doe",
    DOB: "22-12-1990",
  },
  "annasmith@gamil.com": {
    firstName: "Anna",
    lastName: "smith",
    DOB: "02-07-1983",
  },
  "peterjones@gamil.com": {
    firstName: "Peter",
    lastName: "Jones",
    DOB: "21-03-1989",
  },
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
  // Update the code here

  res.send(JSON.stringify(friends, null, 4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
  // Update the code here
  const email = req.params.email;
  if (friends[email]) {
    return res.send(friends[email]);
  }
  res.send("Invalid User Email!");
});

// POST request: Add a new friend
router.post("/", (req, res) => {
  // Update the code here
  // Check if email is provided in the request body
  if (req.body.email) {
    // Create or update friend's details based on provided email
    friends[req.body.email] = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
    };
  }

  // Send response indicating user addition
  res.send("The user " + " " + req.body.firstName + " has been added!");
});

// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  // Update the code here

  const email = req.params.email;
  let friend = friends[email];
  if (friend) {
    let DOB = req.body.DOB;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if (DOB) {
      friend.DOB = DOB;
    }
    if (firstName) {
      friend.firstName = firstName;
    }
    if (lastName) {
      friend.lastName = lastName;
    }

    friends[email] = friend;
    res.send(`Friend with email $(email) has been updated.`);
  } else {
    res.send("Unable to find friend with email " + email);
  }
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  // Update the code here

  const email = req.params.email;
  if (friends[email]) {
    delete friends[email];
  }

  // Send response confirming deletion of friend
  res.send(`Friend with email ${email} has been deleted.`);
});

module.exports = router;
