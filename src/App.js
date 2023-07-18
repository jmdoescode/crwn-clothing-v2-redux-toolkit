import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.reducer";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}

			//How to get a non-serialized value from user
			//pick off the values you want from the user
			//({ accessToken, email }) => ({ accessToken, email }) generates an object with just the picked values (accessToken and email)
			//then invoke it into a new object (user)
			const pickedUser =
				user && (({ accessToken, email }) => ({ accessToken, email }))(user);
			console.log("pickedUser", pickedUser);

			// console.log(setCurrentUser(user));
			// dispatch(setCurrentUser(user));

			console.log(setCurrentUser(pickedUser));
			dispatch(setCurrentUser(pickedUser));
		});

		return unsubscribe;
	}, []);

	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="shop/*" element={<Shop />} />
				<Route path="auth" element={<Authentication />} />
				<Route path="checkout" element={<Checkout />} />
			</Route>
		</Routes>
	);
};

export default App;
