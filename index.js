const express = require("express");
// const os = require("os");
const cors = require("cors");
const OSInfo = require("./classes/OSInfo");
const os = require("os");
const app = express();
const osClass = new OSInfo(os);
app.use(cors());

app.get("/os", async (req, res) => {
  await osClass.main();
  res.send((({ main, osModule, ...osClass }) => osClass)(osClass));
  // res.json({
  //   platform: os.platform(),
  //   arch: os.arch(),
  //   cpus: os.cpus().length,
  //   totalmem: os.totalmem(),
  //   freemem: os.freemem(),
  // });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
