const HISTORY = "HISTORY"
const exercisesReducer = (state = [], action)=>{
    switch(action.type){
    case HISTORY:
        console.log(action, "the action in reducer")
        return action.exercises;
    default:
        return state;
    }
}
export default exercisesReducer