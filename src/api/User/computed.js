export default {
  User: {
    itsMe: async (parent, __, request) => {
      const { userId } = request.request.headers;
      return parent.userId === userId;
    },
  },
};
