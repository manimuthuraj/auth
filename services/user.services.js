require("dotenv/config");
const { user, adminUser } = require("../database/models");
var ObjectId = require("mongodb").ObjectID;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { statusCodes } = require("../config");
const authMethods = require("../utils/authMethods");

class UserService {}

UserService.signupAdmin = async (body) => {
  try {
    //check user name already exist
    const findUser = await adminUser.findOne({ userName: body.userName });
    if (findUser) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: "UserName Already Exist",
      };
    }

    //Hasing password
    const hashPassword = await bcrypt.hashSync(
      body.password,
      bcrypt.genSaltSync(8),
      null
    );

    //creating user
    const createUserAdmin = await adminUser.create({
      userName: body.userName,
      password: hashPassword,
    });

    if (!createUserAdmin) {
      return {
        code: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        message: "SomeThing Went Worng",
      };
    }
    return {
      code: statusCodes.HTTP_OK,
      message: "Successfull Now Login",
    };
  } catch (err) {
    throw new Error(err);
  }
};

UserService.signInAdmin = async (body) => {
  try {
    //checking user exist
    const findUser = await adminUser.findOne({ userName: body.userName });
    if (!findUser) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: "Wrong UserName",
      };
    }

    //comparing password
    const comparePassword = await bcrypt.compare(
      body.password,
      findUser.password
    );

    if (!comparePassword) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: "Wrong Password",
      };
    }

    //creating token
    let token = await authMethods.generateToken(
      {
        _id: findUser._id,
        userName: findUser.userName,
      },
      process.env.JWT_SECRET
    );

    const data = {
      userId: findUser._id,
      userName: findUser.userName,
      token: token,
    };

    return {
      code: statusCodes.HTTP_OK,
      message: "Successfully  LogedIn",
      data: data,
    };
  } catch (err) {
    throw new Error(err);
  }
};

UserService.createUser = async (body) => {
  try {
    //check user name already exist
    const findUser = await user.findOne({ name: body.name });
    if (findUser) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: "Name Already Exist",
      };
    }

    //creating user
    const createUser = await user.create({
      name: body.name,
      state: body.state,
      address: body.address,
      phoneNumber: body.phoneNumber,
      city: body.city,
    });

    if (!createUser) {
      return {
        code: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        message: "SomeThing Went Worng",
      };
    }
    return {
      code: statusCodes.HTTP_OK,
      message: "User created successfully",
      data: createUser,
    };
  } catch (err) {
    throw new Error(err);
  }
};

UserService.getUser = async (body) => {
  try {
    //check user name already exist
    const getUser = await user.find({});

    if (!getUser) {
      return {
        code: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        message: "SomeThing Went Worng",
      };
    }
    return {
      code: statusCodes.HTTP_OK,
      message: "User listed successfully",
      data: getUser,
    };
  } catch (err) {
    throw new Error(err);
  }
};

UserService.updateUser = async (body) => {
  try {
    //check user  exist
    const findUser = await user.findOne({ _id: body._id });
    if (!findUser) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: "User Not Found",
      };
    }

    //update user
    const updateUser = await user.findOneAndUpdate({ _id: Object(body._id) },{ $set: body },{ new: true });

    if (!updateUser) {
      return {
        code: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        message: "SomeThing Went Worng",
      };
    }
    return {
      code: statusCodes.HTTP_OK,
      message: "User updated successfully",
      data: updateUser,
    };
  } catch (err) {
    throw new Error(err);
  }
};

UserService.deleteUser = async (body) => {
  try {
    //check user exist
    const findUser = await user.findOne({ _id: body._id });
    if (!findUser) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: "User Not Found",
      };
    }

    //update user
    const deleteUser = await user.findByIdAndRemove({ _id: Object(body._id) });

    if (!deleteUser) {
      return {
        code: statusCodes.HTTP_INTERNAL_SERVER_ERROR,
        message: "SomeThing Went Worng",
      };
    }
    return {
      code: statusCodes.HTTP_OK,
      message: "User deleted successfully",
    };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = UserService;
