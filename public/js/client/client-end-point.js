const AEP_SAMPLE = "/api/sample";
export function getApiToFetchSampleDataFromServer() {
  return AEP_SAMPLE;
}

const AEP_TO_REGISTER_A_USER = "/api/user/register";
const AEP_TO_AUTHENTICATE_A_USER = "/api/user/authenticate";
const AEP_TO_UPDATE_PROFILE_OF_A_USER = "/api/user/profile";
const AEP_TO_FETCH_USER_BY_ID = "/api/user";
const AEP_TO_REQUEST_FOR_ROLE_CHANGE = "/api/user/request";
const AEP_TO_FETCH_ROLE_CHANGE_REQ = "/api/user/role-change-req";
const AEP_FOR_ROLE_CHANGE_RESPONSE = "/api/user/response";
const AEP_TO_FETCH_ALL_CONSUMERS = "/api/consumer";
const AEP_TO_FETCH_ALL_ADMINS = "/api/admin";
const AEP_TO_FETCH_APPROVED_LOG = "/api/response/approved";
const AEP_TO_FETCH_DENIED_LOG = "/api/response/denied";
const AEP_TO_DELETE_A_USER = "/api/user/terminate/:id";
const AEP_TO_GENERATE_OTP="/api/generateotp";
const AEP_TO_VERIFY_OTP ="/api/verifyotp"

/// 

const AEP_TO_FETCH_ALL_ADMINS_TO_SITES = "/api/admin/admintosite";
const AEP_TO_FETCH_ALL_SITES = "/api/admin/sites"

const AEP_TO_FETCH_ALL_SITES_TO_DEVICES = "/api/admin/sitetodevice";
const AEP_TO_FETCH_ALL_DEVICES = '/api/admin/devices';

export function getApiToRegisterUser() {
  return AEP_TO_REGISTER_A_USER;
}

export function getApiToAuthenticateUser() {
  return AEP_TO_AUTHENTICATE_A_USER;
}

export function getApiToUpdateProfileOfUser(id) {
  return `${AEP_TO_UPDATE_PROFILE_OF_A_USER}/${id}`;
}

export function getApiToFetchConsumerDetailsForAll() {
  return AEP_TO_FETCH_ALL_CONSUMERS;
}

export function getApiToFetchAdminDetailsForAll() {
  return AEP_TO_FETCH_ALL_ADMINS;
}

export function getApiToFetchUserDetailsById(id) {
  return `${AEP_TO_FETCH_USER_BY_ID}/${id}`;
}

export function getApiToPromoteUser(id) {
  return `${AEP_TO_PROMOTE_A_USER}/${id}`;
}

export function getApiToDemoteUser(id) {
  return `${AEP_TO_DEMOTE_A_USER}/${id}`;
}

export function getApiToRequestRoleChange(userId) {
  return `${AEP_TO_REQUEST_FOR_ROLE_CHANGE}/${userId}`;
}

export function getApiToApproveRoleChange(id) {
  return `${AEP_FOR_ROLE_CHANGE_RESPONSE}/${id}`;
}

export function getApiToRejectRoleChange(id) {
  return `${AEP_FOR_ROLE_CHANGE_RESPONSE}/${id}`;
}

export function getApiToRoleChangeRequest() {
  return AEP_TO_FETCH_ROLE_CHANGE_REQ;
}

export function getApiToFetchApprovedLog() {
  return AEP_TO_FETCH_APPROVED_LOG;
}

export function getApiToFetchDeniedLog() {
  return AEP_TO_FETCH_DENIED_LOG;
}

export function getApiToGenerateOTP() {
  return AEP_TO_GENERATE_OTP;
}
export function getApiToVerifyOTP() {
  return AEP_TO_VERIFY_OTP;
}


//ADMIN PAGE ADMIN_TO_SITE_MAPPING
export function getApiToFetchAdminSiteMapping() {
  return AEP_TO_FETCH_ALL_ADMINS_TO_SITES;
}

export function getApitoFetchAllSitesData() {
  return AEP_TO_FETCH_ALL_SITES;
}
// SITE DEVICE PAGE
export function getApitoFetchAllDevicesData() {
  return AEP_TO_FETCH_ALL_DEVICES;
}

export function getApiToFetchSiteDeviceMapping() {
  return AEP_TO_FETCH_ALL_SITES_TO_DEVICES;  //MAPPING SITE->DEVICE
}

export async function fetchPost(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}




export async function fetchDataFromServer(api) {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}