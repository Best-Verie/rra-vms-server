const { User, validateData } = require("./../model/user.model");

exports.register = async (req, res) => {
  try {
    const { error } = validateData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({
      names: req.body.names,
      email: req.body.email,
      phone: req.body.phone,
      nationalId: req.body.nationalId,
    });

    const userFound = await User.findOne({ email: req.body.email });
    if (userFound) return res.status(400).send("User already exists");
    user = await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

exports.login = async (req, res) => {
  try {
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User not registered");
    
    const token = await user.generateAuthToken();
    return res.status(200).json({
      user: user,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send(error.toString());
  }
};