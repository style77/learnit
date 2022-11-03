import { ReactNode } from "react";

type Props = {
  value: number;
  description: string;
  icon: ReactNode;
};

const UserStats = ({ value, description, icon }: Props) => {
  return (
    <>
      <div className="w-72 h-24">
        <div className="flex flex-row gap-3">
          <div className="flex bg-gray-second rounded-full w-16 h-16 text-4xl justify-center items-center">
            {icon}
          </div>
          <div className="flex flex-col font-medium py-1">
            <span className="text-white text-2xl">{value}</span>
            <span className="text-gray-third text-lg">{description}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export { UserStats };
