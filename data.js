const data = [
  {
    email: "pranali@gmail.com",
    password: "pranali@2023",
  },
];

function addNewuser(user) {
  data.push(user);
}

function getSingleuser(email) {
  console.log("email", email);
  const user = data.find((d) => d.email === email);
  return user;
}

function getallusers() {
  return data;
}
module.exports = {
  data,
  addNewuser,
  getSingleuser,
  getallusers,
};
