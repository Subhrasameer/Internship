const fs = require("fs");
const path = require("path");
const USER_DATA = path.join(__dirname, "../database/json-data/jsonData.json");
const REQ_DATA = path.join(__dirname, "../database/json-data/requestData.json");
const ACCEPTED_LOG = path.join(__dirname, "../database/json-data/approvedReqLog.json");
const REJECTED_LOG = path.join(__dirname, "../database/json-data/deniedReqLog.json");
const RESERVED_EMAILS = path.join(__dirname, "../database/json-data/reserved.json");
const OTPEMAIL = path.join(__dirname, "../database/json-data/otp-email.json");

class JsonController {
  fetchSampleData() {
    return { name: "Nuez Technologies" };
  }
    /////////// DO NOT CHANGE /////////////////////
    readDatabase (DATA_FILE)  {
      try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        throw new Error('Unable to read database: ' + error.message);
      }
    };
  
    writeDatabase (DATA_FILE,data){
      try {
        const jsonData = JSON.stringify(data, null, 2); 
        fs.writeFileSync(DATA_FILE, jsonData, 'utf8');
      } catch (error) {
        throw new Error('Unable to write to the database: ' + error.message);
      }
    };

    createNewUserId (lastUserId){
      if(lastUserId=="-1") return "user_1";
      let numericPart = parseInt(lastUserId.split('_')[1]);
      numericPart++;
      let newUserId = `user_${numericPart}`;
      return newUserId;

    }
  /////////// DO NOT CHANGE /////////////////////

  postUserDataToServer =  (user) => {
    try {
      const data =  this.readDatabase(USER_DATA);
      const hasUser = Object.keys(data).length > 0;
      const usersIds =Object.keys(data);
      let lastUserId;
      if(hasUser){
        lastUserId=usersIds[usersIds.length-1];
      }
      else{
        lastUserId="-1"
      }
      const newUserId=this.createNewUserId(lastUserId);
      const newUser = {
        ...user,
      };
      
      newUser.role='consumer';
      data[newUserId]=newUser;
      
       this.writeDatabase(USER_DATA,data);
  
       console.log(`${newUser.name} successfully registered`);
      return newUserId;
    } catch (error) {
      throw new Error('Failed to post user data: ' + error.message);
    }
  };
  postUserRequestToServer =  async (userId,reqRole) => {
    try {
      const data = await this.readDatabase(REQ_DATA);
      const users = await this.readDatabase(USER_DATA);
      const currRole=users[userId].role;
      const userName= users[userId].name;
      // const reqRole=(user.role==="consumer")?"admin":"consumers"
      const newReq = {
        name: userName,
        // 'current-role': "consumer",
        // 'requested-role': "admin",
        // 'request-status': "pending"
        currentRole:currRole,
        requestedRole:reqRole,
        "requestStatus": "pending"
      };
      data[userId]=newReq;
      
      await this.writeDatabase(REQ_DATA,data);
  
      // return newUser;
      console.log(`${newReq.name} successfully added request`);
    } catch (error) {
      throw new Error('Failed to post user request: ' + error.message);
    }
  };
  ///// FETCH ALL USER DATA FROM THE DATABASE//////
  async fetchAllUsers(){
    const db=await this.readDatabase(USER_DATA);
    return db;
  }
  ////// FETCH ALL ROLE CHANGE REQUEST FROM THE DATABASE/////
  async fetchRoleChangeReq(){
    
    const db=await this.readDatabase(REQ_DATA);
   
    return db;
  }
  async fetchApprovedLog(){
    const db=await this.readDatabase(ACCEPTED_LOG);
    return db;
  }
  async fetchRejectedLog(){
    const db=await this.readDatabase(REJECTED_LOG);
    return db;
  }


////////  NOT USED CURRENTLY ////////
//// TO DELETE A PARTICULAR USER BY ID FROM THE MAIN DATABASE/////
 async deleteUserById(userId){
    const data =await this.readDatabase(USER_DATA);
    const userIndex=await data.users.findIndex(it=> it._id===userId)
    const deletedUser=await data.users.splice(userIndex,1)[0];
    await this.writeDatabase(USER_DATA,data);
    console.log(`${deletedUser.name} has been deleted successfully`)
    return deletedUser;
    
  }


  async deleteReqByUserId(userId){
    const data =await this.readDatabase(REQ_DATA);
    const deletedUser= data[userId];
    delete data[userId];
    await this.writeDatabase(REQ_DATA,data);
    console.log(`${deletedUser.name} has been deleted successfully from role req table`)
    return deletedUser;
  }
  
  async addResponseToLog(delUser,userData,timeStamp){
    const LOG_DB =(userData.action==="approved") ?ACCEPTED_LOG:REJECTED_LOG;
    try {
      const data = await this.readDatabase(LOG_DB);
      // const now=new Date();
      // console.log(now.toLocaleString());
      // const dateTime=now.toLocaleString();
      
      
      const newLog ={
        _id : userData._id,
        name : delUser.name,
        roleRequested : delUser.requestedRole,
        actionTaken : userData.action,
        timeStamp : timeStamp
      }
      data.push(newLog)
       await this.writeDatabase(LOG_DB,data);
  
      // return newUser;
      console.log(`${newLog.name} successfully added request`);
    } catch (error) {
      throw new Error('Failed to post user request: ' + error.message);
    }
  }

  async roleChange(userId){
    const data =await this.readDatabase(USER_DATA);
    if(data[userId].role==="consumer"){
      data[userId].role="admin"
    }
    else{
      data[userId].role="consumer"
    }
    
    await this.writeDatabase(USER_DATA,data);
  }

  async isEmailReserved(email) {
    try {
        const reservedData = this.readDatabase(RESERVED_EMAILS);
        const reservedEmails = reservedData.reserved_emails;
        return reservedEmails.includes(email);
    } catch (error) {
        throw new Error('Failed to check if email is reserved: ' + error.message);
    }
}

  async saveotpemail(otp,email){
    const data = {}
      data[email]=otp;
    
    await this.writeDatabase(OTPEMAIL,data);
    console.log(`${email} otp has been saved successfully`)
    return email;
  }
  async updateotpemail(otp,email){
    const data =await this.readDatabase(OTPEMAIL);
     data[email]=otp;
    await this.writeDatabase(OTPEMAIL,data);
    console.log(`${email} otp has been updated successfully`)
    return email;
  }
  
  async isOTPRequested(email){
    const data = await this.readDatabase(OTPEMAIL);
    if(data[email])return 1;
    return 0;
  }

  async findOTPByEmail(email){
    const data =await this.readDatabase(OTPEMAIL);
    return await data[email];
  }
   
  async deleteOTPByEmail(email){
    const data =await this.readDatabase(OTPEMAIL);
    delete data[email];
    await this.writeDatabase(OTPEMAIL,data);
  }
}
module.exports = new JsonController();
