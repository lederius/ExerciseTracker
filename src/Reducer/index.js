import { combineReducers} from "redux";
import loggedInReducer from "./loggedInReducer";
import exercisesReducer from './exercisesReducer';
import currentUserReducer from './currentUserReducer'

const rootRedcuer = combineReducers({
    loggedIn : loggedInReducer,
    currentUser: currentUserReducer,
    exercises: exercisesReducer
});

export default rootRedcuer