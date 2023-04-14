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
    saveBook: async (parent,  {authors, description, title, bookId, link, image} , context) => {
      console.log(context.user);
      console.log(authors, description, title, bookId);
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: {savedBooks: { authors: authors, description: description, bookId: bookId, title: title, link: link, image: image }, },},
          { new: true, runValidators: true }
        );
      }
    },
    removeBook: async (parent, { bookId, userId }, context) => {
      if (context.user) {
        console.log(context.user)
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks:{ bookId: bookId} } },
          // { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
