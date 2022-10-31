import {
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../saas/firebase";
import IUser from "../types/iuser";

const useAuth = () => {
  const [user, setUser] = useState<IUser>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user && user.uid ? true : false);

      if (user && user.uid) {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        getDocs(q).then((querySnapshot: QuerySnapshot) => {
          querySnapshot.forEach((doc: DocumentData) => {
            setUser({ ...user, ...doc.data() });
          });
        });
      }
    });
  }, []);
  return { user, isLoggedIn };
};
export default useAuth;