// Card component that's used in courses page
// Usage: <Card language="" TBA /> where TBA is a boolean,
// if true, the card will be grayed out and it won't be clickable (TBA = "To Be Announced")
// language is a string, it's used to determine the language of the course - there are currently 9 options all specified in constants.ts file

import Image from "next/image";
import { useEffect, useState } from "react";
import { Course } from "../types/course";

type Props = {
    data: Course;
}

const Card = ({data}: Props) => {
  return (
    <div
      data-tba={data.TBA}
      className="group cursor-pointer w-96 h-64 rounded-md shadow-md text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-50 data-[TBA=true]:bg-gray-900 data-[TBA=true]:text-gray-600 data-[TBA=true]:hover:bg-gray-800 data-[TBA=true]:hover:text-gray-300 data-[TBA=true]:cursor-not-allowed transition"
    >
      <div className="flex flex-col p-4 h-full">
        <div className="flex flex-col">
          <div className="flex flex-col items-center w-full text-center gap-2">
            <div className="flex flex-row items-center justify-center gap-2 border-b-[1px] border-gray-400 w-full py-1">
              <h1 className="text-xl font-bold">{data.title}</h1>
              <Image
                src={data.image}
                alt={`${data.language} logo`}
                width={25}
                height={25}
                data-tba={data.TBA}
                className="rounded-md data-[TBA=true]:opacity-50 group-hover:opacity-100 transition"
              />
            </div>
            <h3 className="text-sm font-semibold">{data.description}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
