const   ONLINE = "ONLINE";
const OFFLINE = "OFFLINE";
const loggedInReducer = (state = "not logged on", action)=>{
    switch(action.type){
      case ONLINE:
        return action;
      case OFFLINE:
        return action;
      default:
        return state;
    }
}
export default loggedInReducer