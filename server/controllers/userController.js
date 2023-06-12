const User = require("../model/userModel");
const bcrypt = require("bcrypt"); //encrypt the password

//REGISTER CONTROLLER
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //if username present it will return true and if not then false,
    // if its true then it means username , email already present

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10); //10 is salt value

    //Finally create the User with hashedPassword if nothing already exists
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    //this will return the userId and all the info of the users so we delete the password
    delete user.password;
    return res.json({ status: true, user });

    //status is sent true
  } catch (error) {
    //next() function to call the next middleware function if the response of the current middleware is not terminated
    next(error);
  }
};

// LOGIN CONTROLLER
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //if username present it will return true and if not then false,
    // if its false that means username not found

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        msg: "Incorrect Username or Password",
        status: false,
      });
    }
    //compare the password present inside the database and entered password in frontEnd

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    //this will return the userId and all the info of the users so we delete the password
    delete user.password;
    return res.json({ status: true, user });

    //status is sent true
  } catch (error) {
    next(error);
  }
};

//SETTING AVATAR
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

//Getting all user details to show
module.exports.getAllUsers = async (req, res, next) => {
  try {
    let myselfID = req.params.id; // MY OWN ID
    //$ne will select all the ids but not me

    const users = await User.find({ _id: { $ne: myselfID } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
