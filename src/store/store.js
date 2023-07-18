import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// if you pass in an array like below, it will override the middleware and remove the non-serializable value middleware
const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
	Boolean
);

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const persistConfig = {
//   key: 'root',
//   storage,
//   blacklist: ['user'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = configureStore({
	reducer: rootReducer,
	// middleware: middleWares //middlewares is an array and if you pass that in, it will override the default middleware and return the one specified above

	//middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //gets the array of middleware you want

	// middleware: (
	// 	getDefaultMiddleware //below you can set what the defaultMiddleware returns
	// ) =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: false, //serializableCheck (name of middleware) and set it to false
	// 	}).concat(middleWares), //.concat() will add the middlewares logger

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middleWares), //.concat() will add the middlewares logger
});

// export const persistor = persistStore(store);
