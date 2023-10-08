import bcrypt, { hash } from "bcrypt";
import User from "../../models/User.js";
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import Team from "../../models/team/team.js";
import Driver from "../../models/driver.js";

const UserController = {
   async loginUser(req, res) {
      try {
         const { email, password } = req.body;
         if (email && password) {
            let user = await User.findOne({ email: email });
            if (user) {
               const isMatch = await bcrypt.compare(password, user.password);
               if (isMatch) {
                  user = { ...user.toObject() };
                  delete user.password;

                  const payload = {
                     id: user._id,
                     role: user.role,
                  };
                  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
                     expiresIn: "2d",
                  });
                  res.status(200).json({
                     status: 200,
                     message: "Login sucessfully.",
                     data: {
                        accessToken: token,
                        user,
                     }
                  });
               } else {
                  res.status(401).json({
                     status: "unauthorized",
                     message: "Email or Password is incorrect",
                  });
               }
            } else {
               res.status(404).json({
                  status: 404,
                  message: "User not found",
               });
            }
         } else {
            res.status(400).json({
               status: "failed",
               message: "All fields are required!",
            });
         }
      } catch (error) {
         console.log("error: ", error);
         res.status(400).json({
            status: "Failed",
            message: "Unable to login",
            error: error,
         });
      }
   },

   async signup(req, res) {
      const { firstName, lastName, username, email, role, phoneNumber, password, avatar } = req.body
      // Validation
      const fileName = req?.file?.filename
      const userSchema = Joi.object({
         username: Joi.string().required(),
         firstName: Joi.string().required(),
         lastName: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
         role: Joi.string(),
         phoneNumber: Joi.string().allow(""),
         avatar: Joi.string().allow("")
      })

      // Validation error handler
      const { error } = userSchema.validate(req.body);
      if (error) {
         return res.status(400).json({
            status: 400,
            message: "Invalid fields.",
            error
         })
      }
      const userOld = await User.findOne({ email: email })
      if (userOld) {
         return res.status(400).json({
            status: 400,
            message: "User Already exist.",
         })
      }
      try {
         //Hash Password
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt);
         const formData = {
            username,
            firstName,
            lastName,
            email,
            password: hashPassword,
            role,
            phoneNumber,
            avatar: fileName
         }
         const createUser = await User.create(formData)
         if (createUser) {
            res.status(201).json({
               status: 201,
               message: "User registered successfully",
            })
         }
      } catch (error) {

         res.status(400).json({ success: false })
      }
   },
   async addUser(req, res) {
      const userId = req.user.id
      const { firstName, lastName, username, email, role, phoneNumber, password, avatar } = req.body
      // Validation
      const fileName = req?.file?.filename
      const userSchema = Joi.object({
         username: Joi.string().required(),
         firstName: Joi.string().required(),
         lastName: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
         role: Joi.string(),
         phoneNumber: Joi.string().allow(""),
         avatar: Joi.string().allow("")
      })

      // Validation error handler
      const { error } = userSchema.validate(req.body);
      if (error) {
         return res.status(400).json({
            status: 400,
            message: "Invalid fields.",
            error
         })
      }
      const adminExist = await User.exists({ _id: userId })
      if (!adminExist) {
         return res.status(400).json({
            status: 400,
            message: "Un Authorized",
         })
      }

      const userOld = await User.findOne({ email: email })
      if (userOld) {
         return res.status(400).json({
            status: 400,
            message: "User Already exist.",
         })
      }
      try {
         //Hash Password
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt);
         const formData = {
            username,
            firstName,
            lastName,
            email,
            password: hashPassword,
            role,
            phoneNumber,
            avatar: fileName,
            createdBy: userId
         }
         const createUser = await User.create(formData)
         if (createUser) {
            res.status(201).json({
               status: 201,
               message: "User registered successfully",
               createUser
            })
         }
      } catch (error) {

         res.status(400).json({ success: false })
      }
   },

   async addDriver(req, res) {
      const userId = req.user.id
      console.log("ssssssssssssssssssssssssss")
      const { firstName, lastName, username, email, role, phoneNumber, password, avatar,
         address,
         city,
         state,
         zipCode,
         model,
         licensePlate,
         color,
         team } = req.body
      const teamExist = await Team.findOne({ _id: team })
      if (!teamExist) {
         return res.state(404).json("Team not found.")
      }
      console.log("lllllllllllllllllllllllllssss", teamExist)

      // Validation
      const fileName = req?.file?.filename
      const userSchema = Joi.object({
         username: Joi.string().required(),
         firstName: Joi.string().required(),
         lastName: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
         role: Joi.string(),
         phoneNumber: Joi.string().allow(""),
         avatar: Joi.string().allow(""),
         address: Joi.string().allow(""),
         city: Joi.string().allow(""),
         state: Joi.string().allow(""),
         zipCode: Joi.string().allow(""),
         model: Joi.string().allow(""),
         licensePlate: Joi.string().allow(""),
         color: Joi.string().allow(""),
         team: Joi.string().allow("")
      })

      // Validation error handler
      const { error } = userSchema.validate(req.body);
      if (error) {
         return res.status(400).json({
            status: 400,
            message: "Invalid fields.",
            error
         })
      }
      const adminExist = await User.exists({ _id: userId })
      if (!adminExist) {
         return res.status(400).json({
            status: 400,
            message: "Un Authorized",
         })
      }

      const userOld = await User.findOne({ email: email })
      if (userOld) {
         return res.status(400).json({
            status: 400,
            message: "User Already exist.",
         })
      }
      try {
         //Hash Password
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt);
         const formData = {
            username,
            firstName,
            lastName,
            email,
            password: hashPassword,
            role,
            phoneNumber,
            avatar: fileName,
            createdBy: userId,
            address,
            city,
            state,
            zipCode,
            transportation: {
               model,
               licensePlate,
               color
            },
            team
         }
         const createUser = await Driver.create(formData)
         if (createUser) {
            teamExist.members.unshift(createUser._id)
            teamExist.save().then((updated) => {
               res.status(201).json({
                  status: 201,
                  message: "User registered successfully",
                  createUser
               })
            }).catch((error) => {

               res.status(400).json({ success: false })
            })
         }
      } catch (error) {

         res.status(400).json({ success: false })
      }
   },
   async editUser(req, res) {
      const { userId, firstName, lastName, userName, email, role, phoneNumber, password, avatar } = req.body
      // Validation
      const fileName = req?.file?.filename
      const userSchema = Joi.object({
         userId: Joi.string().required(),
         userName: Joi.string(),
         firstName: Joi.string(),
         lastName: Joi.string(),
         email: Joi.string().email(),
         password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
         role: Joi.string(),
         phoneNumber: Joi.string().allow(""),
         avatar: Joi.string().allow("")
      })

      // Validation error handler
      const { error } = userSchema.validate(req.body);
      if (error) {
         return res.status(400).json({
            status: 400,
            message: "Invalid fields.",
            error
         })
      }

      try {

         const formData = {
            userName,
            firstName,
            lastName,
            email,
            role,
            phoneNumber,
            avatar: fileName,
         }
         if (password) {
            //Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            formData.password = hashPassword;
         }
         User.findOneAndUpdate({ _id: userId }, formData, { new: true }).then((updated) => {
            if (updated) {
               res.status(200).json({
                  status: 200,
                  message: "User updated successfully",
                  data: { user: updated }
               })
            } else {
               res.status(404).json({
                  status: 404,
                  message: "User not found",
               })
            }
         })
      } catch (error) {
         res.status(400).json({ success: false })
      }
   },

   async myProfile(req, res) {
      const id = req.user.id

      let user = await User.findOne({ _id: id }).populate({ path: 'createdBy', select: 'email username' })
      if (!user) {
         return res.status(404).json({
            status: 404,
            message: "User not found.",
         })
      }
      user = { ...user.toObject() };
      delete user.password;
      res.status(200).json({ status: 200, user })
   },
   async getUserByID(req, res) {
      const id = req.query.id
      let user = await User.findOne({ _id: id }).populate({ path: 'createdBy', select: 'email username' })
      if (!user) {
         return res.status(404).json({
            status: 404,
            message: "User not found.",
         })
      }
      user = { ...user.toObject() };
      delete user.password;
      res.status(200).json({ status: 200, user })
   },

   async getAllUsers(req, res) {
      const projection = { password: 0 };
      let users = await User.find({}, projection).populate({ path: 'createdBy', select: 'email username' })
      if (!(users.length > 0)) {
         return res.status(404).json({
            status: 404,
            message: "No User found.",
         })
      }
      res.status(200).json({ status: 200, data: { users } })
   },
   async deleteUserById(req, res) {
      const id = req.query.id
      try {
         const response = await User.findOneAndDelete({ _id: id })
         console.log("response", response)
         if (response) {
            res.status(200).json({
               status: 200,
               message: "Deleted sucessfully.",
            })
         } else {
            res.status(404).json({
               status: 404,
               message: "Not found",
            })
         }
      }
      catch (error) {
         res.status(400).json({
            status: "Failed",
            error: error,
         });
      }
   },
   async deleteMyAccount(req, res) {
      const id = req.user.id
      try {
         const response = await User.findOneAndDelete({ _id: id })
         if (response) {
            await CandidateResume.deleteMany({ user: id })
            await CandidateProfile.deleteOne({ user: id })
            await CompanyProfile.deleteOne({ user: id })
            res.status(200).json({
               status: 200,
               message: "Deleted sucessfully.",
            })
         } else {
            res.status(404).json({
               status: 404,
               message: "Not found",
            })
         }
      }
      catch (error) {
         res.status(400).json({
            status: "Failed",
            error: error,
         });
      }
   },





}

export default UserController;
