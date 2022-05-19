export default {
  PORT: process.env.PORT || 8080,
  mongoRemote: {
    client: "mongodb",
    url: "mongodb+srv://prueba:test@coderhouse.xjmoc.mongodb.net/?retryWrites=true&w=majority",
    advancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  sessionSecret: process.env.sessionSecret || "t936f739yoXZOrX",
};
