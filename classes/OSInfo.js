const { default: axios } = require("axios");
const os = require("os");
module.exports = class OSInfo {
  /**
   *
   * @param {os} os
   */
  constructor(os) {
    this.osModule = os;
  }
  async main() {
    let osType = "";

    //! THE PLATFORM
    switch (this.osModule.platform()) {
      case "linux":
        osType = "Linux";
        break;
      case "win32":
        osType = "Windows";
        break;
      case "openbsd":
        osType = "BSD";
        break;
      case "darwin":
        osType = "MacOS";
        break;
      default:
        osType = this.osModule.platform();
    }
    this.platform = osType;

    //! THE IPS
    const ips =
      this.osModule.networkInterfaces().eth0 ||
      this.osModule.networkInterfaces().Ethernet;
    const localIP = ips.filter((eth) => (eth.family = "IPv4"));
    const publicIP = await axios.get("https://api64.ipify.org").data;
    this.localIP = localIP;
    this.publicIP = publicIP;
    this.hostname = this.osModule.hostname();

    //! USER-INFO
    const object = {
      homedir: this.osModule.userInfo().homedir,
      username: this.osModule.userInfo().username,
    };
    this.user = object;
    //! UPTIME
    const hours = this.osModule.uptime() / 60 / 60;
    const minutes = (this.osModule.uptime - hours * 60 * 60) / 60;
    const string = `${hours} Hours, ${minutes} Minutes`;
    this.uptime = string;
  }
};
