const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "mtuser123",
        mongodb_password: "mtuser123",
        mongodb_cluster: "sandbox",
        mongodb_database: "my-site",
      },
    };
  }

  return {
    env: {
      mongodb_username: "mtuser123",
      mongodb_password: "mtuser123",
      mongodb_cluster: "sandbox",
      mongodb_database: "my-site",
    },
  };
};
