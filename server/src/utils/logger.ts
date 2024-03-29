import dayjs from "dayjs";
import logger from "pino";

const log = logger({
  transport: {
    target: "pino-pretty",
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format("DD-MM-YYYY HH:mm:ss")}."`,
});

export default log;
