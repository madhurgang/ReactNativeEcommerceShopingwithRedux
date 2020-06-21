import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import { mainReducer } from "./reducers/reducer";

const reducers = combineReducers({
  mainReducer: mainReducer
});

const middleware = applyMiddleware(logger, thunk);

let store = createStore(reducers, middleware);

export default store;