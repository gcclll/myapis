const os = require("os");

const ifaces = os.networkInterfaces();
exports.getIp = () =>
  Object.keys(ifaces)
    .map(
      (key) =>
        ifaces[key].filter(
          (detail) =>
            detail.family.toLowerCase() === "ipv4" &&
            !/^169.254/.test(detail.address) &&
            !detail.internal
        )[0]
    )
    .filter((i) => i)[0].address;
