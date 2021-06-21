// export a function that checks for all required EVN vars
// If fails, returns error
// Check against only the ones without a fallback (or default values)
/*
[
  "APP_ID",
  "TOKEN_LIVE",
  "TOKEN_DEMO",
  "TIME_FRAME",
  "HISTORY_SIZE",
  "EMA_PERIOD",
  "EMA_GRADIENT_LOOKBACK",
  "STAKE",
  "RISK_FACTOR",
  "CLEARANCE",
  "BASE_URL",
].forEach((field) => {
  if (!process.env[field])
    throw new Error(`${field} is a required environment variable`);
});
*/
