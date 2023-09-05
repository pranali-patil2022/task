const express = require("express");
const app = express();
const { data, addNewuser, getSingleuser, getallusers } = require("./data");

app.use(express.json());
// add new user

const validateEmail = (email) => {
  // Regex for a valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  // At least 8 characters, at least one uppercase letter, one lowercase letter, and one digit
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordRegex.test(password);
};

// FOR ADDING NEW USER
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  // email validity
  if (!email || !validateEmail(email)) {
    return res.send("Please enter a valid email address");
  }
  // password validity
  if (!password || !validatePassword(password)) {
    return res.send(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit"
    );
  }

  //   checking whether email is present in data array or not
  const user = getSingleuser(email);

  if (user) {
    return res.send("User already present");
  }

  //   adding user in data array
  addNewuser(req.body);
  res.send("Successfully registered!!");
});

// FOR VALIDATING USER

app.get("/login", (req, res) => {
  const { email, password } = req.body;

  //   checking whether user is present in data or not.
  const user = getSingleuser(email);
  if (!user) {
    return res.send("user not found");
  }
  //   checking whether user adress and password matching or not
  if (user.email === email && user.password === password) {
    return res.send("user validate successfully");
  }
  // checking whether password is correct or incorrect
  if (user.email === email && user.password != password)
    return res.send("incorrect password!!");
});

// FOR GETTING ALL USERS PRESENT IN data Array .
app.get("/getall", (req, res) => {
  const data = getallusers();
  res.send(data);
});
app.listen(3000, () => {
  console.log("server up and running");
});
