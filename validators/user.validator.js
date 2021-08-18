const Joi = require('joi');

// add Joi schema
const schemas = {
  createAdminUser: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),

  signInAdminUser: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),

  addUser: Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
  }),

  editUser: Joi.object().keys({
    name: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
  }),
};

const options = {
  // generic option
  basic: {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    stripUnknown: true,
  },
  // Options for Array of array
  array: {
    abortEarly: false,
    convert: true,
    allowUnknown: true,
    stripUnknown: {
      objects: true,
    },
  },
};

module.exports = {
  // exports validate admin signin
  createAdminUser: (req, res, next) => {
    // getting the schemas
    let schema = schemas.createAdminUser;
    let option = options.basic;

    // validating the schema
    var { error, value } = schema.validate(req.body, option);
    if(error){
      // returning the response 
      let errors = error.details.reduce((prev, curr) => {
        prev[curr.path[0]] = curr.message.replace(/"/g, '');
        return prev;
      }, {});
      let message = "Bad Request";
  
      let status = 500;

      return res.status(status).json({
        status,
        message,
        errors
      });
    }
    else{
      next()
    }
  },

  signInAdminUser: (req, res, next) => {
    let schema = schemas.signInAdminUser;
    let option = options.basic;

    // validating the schema
    var { error, value } = schema.validate(req.body, option);
    if(error){
      // returning the response 
      let errors = error.details.reduce((prev, curr) => {
        prev[curr.path[0]] = curr.message.replace(/"/g, '');
        return prev;
      }, {});
      let message = "Bad Request";
  
      let status = 500;

      return res.status(status).json({
        status,
        message,
        errors
      });
    }
    else{
      next()
    }
  },

  addUser: (req, res, next) => {
    let schema = schemas.addUser;
    let option = options.basic;

    // validating the schema
    var { error, value } = schema.validate(req.body, option);
    if(error){
      // returning the response 
      let errors = error.details.reduce((prev, curr) => {
        prev[curr.path[0]] = curr.message.replace(/"/g, '');
        return prev;
      }, {});
      let message = "Bad Request";
  
      let status = 500;

      return res.status(status).json({
        status,
        message,
        errors
      });
    }
    else{
      next()
    }
  },

  editUser: (req, res, next) => {
    let schema = schemas.editUser;
    let option = options.basic;

    // validating the schema
    var { error, value } = schema.validate(req.body, option);
    if(error){
      // returning the response 
      let errors = error.details.reduce((prev, curr) => {
        prev[curr.path[0]] = curr.message.replace(/"/g, '');
        return prev;
      }, {});
      let message = "Bad Request";
  
      let status = 500;

      return res.status(status).json({
        status,
        message,
        errors
      });
    }
    else{
      next()
    }
  },
};
