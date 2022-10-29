import { FirebaseError } from "firebase/app";
import {
  EmailAuthCredential,
  EmailAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { humanizeError } from "../constants";
import { auth } from "../saas/firebase";

type Props = {
  setShowRegisterCard: (value: boolean) => void;
  setShowForgotPassword: (value: boolean) => void;
  setAuthProvider: (value: string) => void;
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
            }
          }
        })
        .catch((error: FirebaseError) => {
          console.log(error.code)
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
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Hasło</label>
              <input
                type="password"
                placeholder="Hasło"
                className="p-2 rounded-lg bg-blue-50 focus:bg-blue-200 border-2 transition"
                onChange={(e) => setPassword(e.target.value)}
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
              <p className="text-red-500 ">{error !== "" ? humanizeError(error) : null }</p>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-300 hover:bg-blue-500 transition rounded-lg"
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
            <button
              className="bg-blue-500 hover:bg-blue-600 transition rounded-full p-2.5"
              onClick={() => handleAuth("google")}
            >
              <FaGoogle className="text-2xl text-white" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { LoginCard };
