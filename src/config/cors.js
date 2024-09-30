const corsOptions = {
  origin: (origin, callback) => {
    const whitelist = ["http://localhost:5173"];

    if (!origin || whitelist.includes(origin)) {
      return callback(null, true);
    }

    return callback(
      new ApiError(
        StatusCodes.FORBIDDEN,
        `${origin} not allowed by our CORS Policy.`
      )
    );
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

module.exports = corsOptions;
