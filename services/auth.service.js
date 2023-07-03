const User = require("../models/user.model");

const signup = ({ name, email, password }) => {
  const user = User.create({
    name: name,
    email: email,
    password: password,
  });

  user.save()
    .then(()=>{
        
    })
    .catch((e)=>{

    })
};

module.exports = {
  signup,
};
