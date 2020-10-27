const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function(request, response){
  try {
    const categories = await Category.find({user: request.user.id});
    response.status(200).json(categories);
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.getById = async function(request, response){
  try {
    const category = await Category.findById(request.params.id);
    response.status(200).json(category);
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.remove = async function(request, response){
  try {
    await Category.remove({_id: request.params.id});
    await Position.remove({category: request.params.id});
    response.status(200).json({message: 'Category been removed'});
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.create = async function(request, response){
  try {
    
  } catch (error) {
    errorHandler(response, error)
  }
}

module.exports.update = async function(request, response){
  try {
    
  } catch (error) {
    errorHandler(response, error)
  }
}