export default {
  User: {
    itsMe: async (parent, __, ctx) => {
      if (ctx.request === undefined) {
        console.log("parent");
        console.log(parent);
        return parent.itsMe;
      }
      const { userid: userId } = ctx.request.headers;
      return parent.id === userId;
    },
  },
};
