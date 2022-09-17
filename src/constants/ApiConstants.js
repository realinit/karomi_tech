let envMod = process.env.NODE_ENV || "development";
let config = require(`../config/${envMod}.js`);
export const staticPath = process.env.STATIC_BASE_URL + "/img/";

export const ENV_CONFIG = config;
