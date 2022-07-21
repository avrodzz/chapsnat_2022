import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import {collection, doc, getDoc, setDoc } from "firebase/firestore";
import db from "../../firebase"

const auth = getAuth();

export function useAuthentication() {
	const [user, setUser] = useState();
	const [userData, setUserData] = useState();

	useEffect(() => {
		const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/firebase.User
			setUser(user);
			const uid = user.uid;
			console.log("user.uid: ", uid)


			const docRef = doc(db, "Users", user.uid);
			getDoc(docRef).then((dataSnapshot) => {
				
				if (dataSnapshot.exists()) {
					console.log("Document data:", dataSnapshot.data());
					setUserData(dataSnapshot.data())
				}
				else{
					console.log("Document Data is not found");
				}
			})


		} else {
			// User is signed out
			setUser(undefined);
		}
		});

		return unsubscribeFromAuthStatusChanged;
	}, []);

	return {
		user, userData
	};
}