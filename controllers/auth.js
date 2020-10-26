module.exports.login = function(request, response){
  response.status(200).json({
    login: 'login from controller'
  })
};

module.exports.register = function(request, response){
  response.status(200).json({
    register: 'register from controller'
  })
};