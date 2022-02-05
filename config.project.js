module.exports = {
  microeFrontends: {
    /**@note: if you change the port and want to use the ```npm run build:start``` you may also need to change the port in the package.json */
    home: {
      port: 8080,
    },
    pdp: {
      port: 8081,
    },
    cart: {
      port: 8082,
    },
    addtocart: {
      port: 8083,
    },
  },
  api_server: {
    port: 4000,
  },
};