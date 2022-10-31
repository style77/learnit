import { DocumentReference } from "firebase/firestore";
import { ICourse } from "./course";

type IUser = {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
    emailVerified: boolean;
    courses: ICourse[];
    ref: DocumentReference;
}

export default IUser;