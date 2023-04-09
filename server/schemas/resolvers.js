const { AuthenticationError } = require("apollo-server-express");
const User = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, {userId}) => {
      return User.findOne({_id: userId})
    },
    me: async (parent, args, context) => {
      console.log(context.user)
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please login");
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user was found");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials, Try Again");
      }
      const token = signToken(user);
      return { token, user };
    },
    // saveBook: async (parent,  bookData) => {
    //   // console.log(context.user);
    //   console.log(bookData)
    //   console.log(bookData._id);
    //   const book = {"title": bookData.title, "bookId": bookData.bookId, "description": bookData.description}
    //   console.log(book)
    //   if (bookData._id) {
    //     await User.findOneAndUpdate(
    //       { _id: bookData._id },
    //       { $addToSet: { savedBooks: book } },
    //       { new: true, runValidators: true }
    //     );
    //   }
    // }, 
    saveBook: async (parent,  bookData , context) => {
      console.log(context.user);
      console.log(bookData);
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
      }
    },
  },
};

module.exports = resolvers;
