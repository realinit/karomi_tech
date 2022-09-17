import ApiConfig from "./apiConfig";
const cookieDomain = process.env.COOKIE_DOMAIN || "karomi.com";
const serviceProtocol = process.env.SERVICE_PROTOCOL || "http";
const afterLogoutPath = process.env.LOGOUT_PATH || "/login";

const ServerConfig = {
  karomi_node: {
    protocol: `${serviceProtocol}`,
    server: `localhost:4000`,
    port: "4000",
  },
};

const Config = {
  ServerConfig,
  ApiConfig,
  afterLogoutPath,
  cookieDomain,
};

export default Config;
