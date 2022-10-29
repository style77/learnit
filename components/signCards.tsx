import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  EmailAuthCredential,
  EmailAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  UserCredential,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { humanizeError } from "../constants";
import { auth, db } from "../saas/firebase";

type Props = {
  setShowRegisterCard: (value: boolean) => void;
  setShowForgotPassword: (value: boolean) => void;
  setAuthProvider: (value: string) => void;
  authProvider?: string;
};

const LoginCard = ({
  setShowRegisterCard,
  setShowForgotPassword,
  setAuthProvider,
}: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = (authType: string) => {
    setAuthProvider(authType);
    if (authType === "google") {
      signInWithPopup(auth, new GoogleAuthProvider())
        .then((result: UserCredential) => {
          if (result) {
            const { isNewUser } = getAdditionalUserInfo(result)!;

            if (isNewUser) {
              setShowRegisterCard(true);
            } else {
              // If user already made account with google but didnt set all the data yet
              getDocs(query(collection(db, "users"), where("uid", "==", result.user.uid))).then(
                (querySnapshot: QuerySnapshot) => {
                  if (querySnapshot.size === 0) {
                    setShowRegisterCard(true);
                    setAuthProvider("google");
                  }
                }
              );
            }
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    } else if (authType === "email") {
      signInWithEmailAndPassword(auth, email, password)
        .then((result: UserCredential) => {
          if (result) {
            const { isNewUser } = getAdditionalUserInfo(result)!;
            if (isNewUser) {
              setShowRegisterCard(true);
              setAuthProvider("email");
            }
          }
        })
        .catch((error: FirebaseError) => {
          setError(error.code);
        });
    }
  };

  return (
    <div className="bg-white text-gray-700 rounded-md p-6 shadow-md">
      <div className="border-b-2 border-gray-400">
        <h1 className="text-2xl font-semibold p-2">Zaloguj się</h1>
      </div>
      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="mail"
                placeholder="Email"
                className="p-2 rounded-lg bg-blue-50 focus:bg-blue-200 border-2 transition"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                placeholder="Hasło"
                className="p-2 rounded-lg bg-blue-50 focus:bg-blue-200 border-2 transition"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-sm p-1 mb-1">
                Nie pamiętasz hasła?{" "}
                <span
                  className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Zresetuj hasło
                </span>
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-500 ">
                {error !== "" ? humanizeError(error) : null}
              </p>
            </div>
            <button
              className="px-6 py-2 bg-blue-300 hover:bg-blue-500 transition rounded-lg"
              type="submit"
              onClick={() => handleAuth("email")}
            >
              Zaloguj
            </button>
          </div>
          <div>
            <p className="text-center mt-2 font-regular">
              Nie masz konta?{" "}
              <span
                className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                onClick={() => setShowRegisterCard(true)}
              >
                Zarejestruj się
              </span>
            </p>
          </div>
          <div>
            <p className="text-center mt-2 font-regular font-semibold">Lub </p>
          </div>
          <div className="flex justify-center items-center w-full mt-2">
            <span
              className="bg-blue-500 hover:bg-blue-600 transition rounded-full p-2.5 cursor-pointer"
              onClick={() => handleAuth("google")}
            >
              <FaGoogle className="text-2xl text-white" />
            </span>
          </div>
        </form>
        <div className="mt-4 border-t-2">
          <p className="text-center mt-2 font-regular">
            Kontynuując, akceptujesz nasze{" "}
            <Link href="/terms">
              <span className="text-blue-500 hover:text-blue-700 transition cursor-pointer">
                warunki użytkowania
              </span>
            </Link>{" "}
            oraz{" "}
            <Link href="/privacy">
              <span className="text-blue-500 hover:text-blue-700 transition cursor-pointer">
                politykę prywatności
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const RegisterCard = ({
  setShowRegisterCard,
  setAuthProvider,
  authProvider,
}: Props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registerUser = (user: User) => {
    addDoc(collection(db, "users"), {
      email: user.email,
      uid: user.uid,
      displayName: user.displayName || name,
      photoURL: user.photoURL || "",
    }).catch((error) => {
      setError(error.message);
    });
  };

  return (
    <div className="bg-white text-gray-700 rounded-md p-6 shadow-md">
      <div className="border-b-2 border-gray-400">
        <h1 className="text-2xl font-semibold p-2">Zarejestruj się</h1>
      </div>
      <div className="p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label htmlFor="name">Nick</label>
              <input
                id="name"
                type="name"
                placeholder="Nick"
                className="p-2 rounded-lg bg-blue-50 focus:bg-blue-200 border-2 transition"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            {authProvider === "email" ? (
              <>
                <div className="flex flex-col">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="mail"
                    placeholder="Email"
                    className="p-2 rounded-lg bg-blue-50 focus:bg-blue-200 border-2 transition"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Hasło</label>
                  <input
                    type="password"
                    placeholder="Hasło"
                    className="p-2 rounded-lg bg-blue-50 focus:bg-blue-200 border-2 transition"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password">Potwierdź Hasło</label>
                  <input
                    type="password"
                    placeholder="Hasło"
                    className="p-2 rounded-lg bg-blue-50 focus:bg-blue-200 border-2 transition"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : null}
            <div className="flex flex-col justify-center items-center">
              <p className="text-red-500 ">
                {error !== "" ? humanizeError(error) : null}
              </p>
            </div>
            <button
              className="px-6 py-2 bg-blue-300 hover:bg-blue-500 transition rounded-lg"
              type="submit"
              onClick={() => {
                if (authProvider === "email") {
                  createUserWithEmailAndPassword(auth, email, password)
                    .then((result: UserCredential) => {
                      registerUser(result.user!);
                    })
                    .catch((error: FirebaseError) => {
                      setError(error.code);
                    });
                } else if (authProvider === "google") {
                  registerUser(auth.currentUser!);
                }
              }}
            >
              Zarejestruj
            </button>
          </div>
          <div>
            <p className="text-center mt-2 font-regular">
              Masz już konto?{" "}
              <span
                className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                onClick={() => setShowRegisterCard(false)}
              >
                Zaloguj się
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export { LoginCard, RegisterCard };
