import log4js from "log4js";

log4js.configure({
  appenders: {
    consoleLog: {
      type: "console",
    },
  },
  categories: {
    default: {
      appenders: ["consoleLog"],
      level: "ALL",
    },
  },
});

export default log4js;
