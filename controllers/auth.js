const User = require('../models/User');

module.exports.login = function(request, response){
  response.status(200).json({
    login: {
      email: request.body.email,
      password: request.body.password
    }
  })
};

module.exports.register = async function(request, response){
  //email password
  const candidate = await User.findOne({email: request.body.email});

  if(candidate){
    //user isset -> error
    response.status(409).json({
      message: 'Try enother email. This email is occuped!'
    })
  } else {
    //user is not found
   const user = new User({
     email: request.body.email,
     password: request.body.password
   });

   try{
    await user.save();
    response.status(201).json(user);
   } catch(error){
     console.log(error);
   }
   
  }
};