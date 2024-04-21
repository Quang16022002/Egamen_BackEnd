const User = require("../models/UserModel");
const { genneralAccessToken, genneralRefreshToken } = require("./jwtServices");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
      const { name, email, password, confirmPassword, phone } = newUser
      try {
          const checkUser = await User.findOne({
              email: email
          })
          if (checkUser !== null) {
              resolve({
                  status: 'ERR',
                  message: 'Email đã được sử dụng'
              })
          }
      
          const createdUser = await User.create({
              name,
              email,
              password,
              phone
          })
          if (createdUser) {
              resolve({
                  status: 'OK',
                  message: 'SUCCESS',
                  data: createdUser
              })
          }
      } catch (e) {
          reject(e)
      }
  })
}


const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({ email: email });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "Email không tồn tại",
        });
      }
      if (password != checkUser.password) {
        resolve({
          status: "ERR",
          message: "Mật khẩu không chính xác",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });
      resolve({
        status: "OK",
        message: "SUCCESS ",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "the user is not defined",
        });
      }
      const updateUser = await User.findByIdAndUpdate(id, data, { new: true });


      resolve({
        status: "OK",
        message: "SUCCESS ",
        data: updateUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });
  
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "the user is not defined",
        });
      }
      await User.findByIdAndDelete(id)
      resolve({
        status: "OK",
        message: "Delete user SUCCESS ",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();
      resolve({
        status: "OK",
        message: "List all user  ",
        data: allUser
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ _id: id });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "the user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const refreshTokenService = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      // const user = await User.findOne({ _id: id });
      // if (user === null) {
      //   resolve({
      //     status: "ERR",
      //     message: "the user is not defined",
      //   });
      // }
      console.log('token', token)
      resolve({
        status: "OK",
        message: "SUCCESS",

      });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  refreshTokenService
};
