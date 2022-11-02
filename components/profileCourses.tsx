import { useState } from "react";



const ProfileCourses = () => {

const [during,setDuring]=useState(false)
const [myList,setMyList]=useState(false)
const [ended,setEnded]=useState(false)


  return (
    <>
      <div className="flex flex-row text-blue-400 font-semibold text-4xl gap-12 pt-6 px-24">
        <button>W toku</button>
        <button>Moja lista</button>
        <button>Zakończone</button>
      </div>
    </>
  );
};
export default ProfileCourses;
