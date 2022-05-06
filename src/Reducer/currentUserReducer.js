const   CURRENTUSER = "CURRENTUSER";
const OFF = "OFF";
const currentUserReducer = (state = null, action)=>{
  switch(action.type){
    case CURRENTUSER:
      return action;
    default:
      return state;
  }    
}
export default currentUserReducer