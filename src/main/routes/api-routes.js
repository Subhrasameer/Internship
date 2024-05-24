const controller = require("../controller/controller.js");

module.exports = function (app) {
  const AEP_SAMPLE = "/api/sample";
  app.get(AEP_SAMPLE, (req, res) => {
    const data = controller.fetchSampleDataFromServer();
    console.log(data);
    res.send(data);
  });

  const AEP_TO_REGISTER_A_USER = "/api/user/register";
  const AEP_TO_AUTHENTICATE_A_USER = "/api/user/authenticate";
  const AEP_TO_UPDATE_PROFILE_OF_A_USER = "/api/user/profile/:id";
  const AEP_TO_FETCH_ALL_USERS = "/api/user";
  const AEP_TO_FETCH_USER_BY_ID = "/api/user/:id";
  const AEP_TO_PROMOTE_A_USER = "/api/user/promote/:id";
  const AEP_TO_DEMOTE_A_USER = "/api/user/demote/:id";
  const AEP_TO_DELETE_A_USER = "/api/user/terminate/:id";
  const AEP_TO_REQUEST_FOR_ROLE_CHANGE = "/api/user/request/:id";
  const AEP_TO_FETCH_ROLE_CHANGE_REQ = "/api/user/role-change-req";
  

  app.post(AEP_TO_REGISTER_A_USER,(req, res) => {
    controller.registerUser(req, res); 
  });
  app.get(AEP_TO_FETCH_ALL_USERS, (req, res) => {
    const data = controller.fetchAllUsers();
    // console.log(data);
    res.json(data);
  });
  app.get(AEP_TO_FETCH_ROLE_CHANGE_REQ , (req, res) => {
    const data = controller.fetchRoleChangeReq();
    // console.log(data);
    res.json(data);
  });
  
  app.get(AEP_TO_FETCH_USER_BY_ID, (req, res) => {
    const data = controller.fetchUserById(req.params.id);
    // console.log(req.params.id);
    res.json(data);
  });
  



  app.post(AEP_TO_AUTHENTICATE_A_USER, (req, res) => {
    const data = controller.authenticateUser();
    console.log(data);
    res.send(data);
  });


  app.put(AEP_TO_UPDATE_PROFILE_OF_A_USER, (req, res) => {
    const data = controller.updateProfileOfUser();
    console.log(data);
    res.send(data);
  });


  app.patch(AEP_TO_PROMOTE_A_USER, (req, res) => {
    const data = controller.promoteUser();
    console.log(data);
    res.send(data);
  });
  app.patch(AEP_TO_DEMOTE_A_USER, (req, res) => {
    const data = controller.demoteUser();
    console.log(data);
    res.send(data);
  });


  app.post(AEP_TO_REQUEST_FOR_ROLE_CHANGE, (req, res) => {
    const data = controller.requestRoleChange(req);
    // console.log(data);
    // res.send(data);
  });
  

  app.delete(AEP_TO_DELETE_A_USER, (req, res) => {
    const data = controller.deleteUserById(req.params.id)
    res.json(data);
    // res.send(data);
  });
};
