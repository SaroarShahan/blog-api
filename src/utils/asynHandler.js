const asyncHandler = (cb) =>
  function asyncWrapper(...args) {
    const fnReturn = cb(...args);
    const next = args[args.length - 1];

    return Promise.resolve(fnReturn).catch(next);
  };

export default asyncHandler;
