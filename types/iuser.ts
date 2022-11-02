import { DocumentReference } from "firebase/firestore";
import { ICourse } from "./course";

type IUser = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  emailVerified: boolean;
  levelExperience: number;
  city: string;
  country: string;
  courses: ICourse[];
  ref: DocumentReference;
};

export default IUser;