const { createLogger, format, transports } = require("winston");

class CustomLogger {
  winstonFileLogger = createLogger({
    level: "info",
    format: format.combine(format.simple()),
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "combined.log" }),
    ],
  });

  async log(message, fromModule = "global", optionalParam) {
    if (optionalParam) {
      this.winstonFileLogger
        .info(new Date().toISOString() + " - " + message)
        .child(optionalParam);
      return;
    }
    this.winstonFileLogger.info(
      `[${fromModule}]` + new Date().toISOString() + " - " + message
    );
  }

  async error(message, fromModule = "global", optionalParam) {
    if (optionalParam) {
      this.winstonFileLogger
        .error(new Date().toISOString() + " - " + message)
        .child(optionalParam);
      return;
    }
    this.winstonFileLogger.error(
      `[${fromModule}]` + new Date().toISOString() + " - " + message
    );
  }
}

module.exports = {
  logger: new CustomLogger(),
};
