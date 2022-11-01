import { useState } from "react";
import { compile } from "../pages/api/compiler/compile";

type Props = {
  language: string;
  script: string;
  setOutput: Function;
};

const CompileButton = ({ language, script, setOutput }: Props) => {
  const [isCompiling, setIsCompiling] = useState(false);

  const handleSubmission = async () => {
    setIsCompiling(true);

    const body = JSON.stringify({
      script: script,
      language,
    });

    const data = await compile(body, language);
    console.log(data);
    setOutput(data);

    setIsCompiling(false);
  };

  return (
    <button onClick={handleSubmission} className="py-2 px-4 h-12 justify-center items-center rounded-md border-2 bg-gray-900 hover:bg-gray-800 transition border-gray-800 text-gray-200">
      <span className="text-gray-200 font-regular">
        {isCompiling ? "Kompilowanie..." : "Wykonaj kod"}
      </span>
    </button>
  );
};

export default CompileButton;
