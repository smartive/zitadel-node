module.exports = {
  suppress: [
    {
      pathRegExp: '/src/(grpc|grpc-web)/generated',
      codes: [7006, 1259],
    },
  ],
};
