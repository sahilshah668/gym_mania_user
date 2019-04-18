const passport = require("passport");

module.exports = security = () => {
  return passport.authenticate("jwt", { session: false });
};
