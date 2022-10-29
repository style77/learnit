import ICourse from "./icourse";

type IUser = {
    uid: string;
    name: string;
    email: string;
    photoURL: string;
    emailVerified: boolean;
    courses: ICourse[];
}

export default IUser;