import axios from "axios";
import { isEmpty, isUndefined } from "lodash";
import Helper from "./../utils/helper";
import ActionTypes from "constants/ActionTypes";
import messageBus from "utils/messageBus";
import utility from "./../utils/utility";
import jwtDecode from "jwt-decode";
import Config from "config";
import { detect } from "detect-browser";
/**
 * It will build the Req data for the external API according to GET and POST method
 * @params Options
 * @return JSON
 */
const _buildReqData = (options) => {
  const {
    content = {},
    api = "",
    headers = {},
    urlAppend = "",
    dynamicUrl = false,
    dynamicUrlObj = {},
    responseType = "",
    extraHeaders = {},
  } = options;
  let apiDetail = Config["ApiConfig"][api];
  apiDetail = !isUndefined(apiDetail) ? apiDetail : {};
  let { server = "karomi_node", url = "", method = "" } = apiDetail;
  const { protocol, server: apiServer } = Config["ServerConfig"][server];
  const { isRelativeUrl = false } = Config;
  const baseUrl = isRelativeUrl ? `` : `${protocol}://${apiServer}`;
  const apiUrl = `${baseUrl}${url}${urlAppend}`;
  let postData = {};
  postData = setPostData(content, headers, extraHeaders);

  return {
    url: apiUrl,
    method: apiDetail.method,
    responseType, //added for gzip file download
    ...postData,
  };
};

/**
 * It will set the POST data for the request
 * @param content
 * @return JSON
 */
const setPostData = (content, headers, extraHeaders) => {
  return {
    data: content,
    headers: {
      ...setAuthorizationHeader(),
      ...headers,
      ...extraHeaders,
    },
  };
};

/**
 * It will set the Authorization Header for the Request
 * @return JSON
 */
const setAuthorizationHeader = () => {
  const authorizationToken = Helper.getJwtToken();
  const browser = detect();
  return {
    browserName: browser.name,
    browserVersion: browser.version,
    "Content-Type": "application/json",
    Authorization: decodeURIComponent(authorizationToken),
    crossDomain: true,
    "Access-Control-Allow-Origin": "*",
    channelType: utility.isMobile() ? "MOBILE" : "DESKTOP",
  };
};

/**
 * It will set the JWT Cookie if receive in the response header
 */
const setJwtCookie = (headers) => {
  const { authorization = "" } = headers;
  if (!isEmpty(authorization) && typeof authorization == "string") {
    utility.saveToCookie(authorization);
  }
};

/**
 * This function will sanitize the response before sending it to client. Also it will handle the error scenarios
 * @return JSON
 */
const sanitizeResponse = (response, requestType) => {
  const { data, headers } = response;
  setJwtCookie(headers);
  try {
    const { status = {} } = data;
    const { success = false } = status;
    if (success) {
      if (typeof data.payload == "object" && !isEmpty(data.payload)) {
        messageBus.trigger(ActionTypes.REMOVE_GLOBAL_ERROR_EVENT, {
          success,
        });
        return data;
      }
    } else {
      const { errors = [] } = data;
      const [firstError = {}] = errors;
      const { errCode = "", message = "" } = firstError;
      utility.errorToaster(message, 4000, 'error')
      if (!isEmpty(errors) && errCode == "403") {
        setTimeout(() => {
          utility.removeCookie("uuid");
          utility.removeCookie("isConsent");
          utility.removeCookie("employeeId");
          utility.removeCookie("a_uuid");
          utility.removeCookie("adminId");
          utility.removeCookie("logedinuserData");
          window.location.href = window.location.href.includes('admin') ? `/admin/login` : `/login`;
        }, 2000);
      }
      return data;
    }
  } catch (e) {
    console.log(e);
    //catch exception and log error
    messageBus.trigger(ActionTypes.GLOBAL_ERROR_EVENT, {
      success: "false",
      errors: [
        {
          errCode: "100",
          message: "Something went wrong",
          details: "",
        },
      ],
    });
    return data;
  }
};

const ExternalApiRequest = (options, requestType = "") => {
  const reqData = _buildReqData(options);
  messageBus.trigger(ActionTypes.REMOVE_GLOBAL_ERROR_EVENT, {
    success: true,
  });

  return axios(reqData)
    .then((responseData) => {
      return sanitizeResponse(responseData, requestType);
    })
    .catch((err) => {
      messageBus.trigger(ActionTypes.GLOBAL_ERROR_EVENT, {
        success: "false",
        errors: [
          {
            errCode: "100",
            message: "Something went wrong",
            details: "",
          },
        ],
      });
      return err.message;
    });
};

export default ExternalApiRequest;
