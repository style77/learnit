import { useEffect, useState } from "react";
import AceEditor from "react-ace";

// Import themes
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";

// Import languages
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";

// Additonal editor settings tools
import "ace-builds/src-noconflict/ext-language_tools";

type Props = {
  language: string;
  code: string;
  setCode: Function;
};

const Editor = ({language, code, setCode}: Props) => {

  return (
    <div className="flex flex-col items-center flex-grow h-full">
      <AceEditor
        mode={language === "cpp" || language === "c" ? "c_cpp" : language}
        fontSize={16}
        value={code}
        onChange={(e: any) => setCode(e.target.value)}
        name={`${language}_editor`}
        style={{
          width: "100%",
          height: "100%",
        }}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          autoScrollEditorIntoView: true,
          showLineNumbers: true,
          fixedWidthGutter: true,
        }}
      />
    </div>
  );
};

export default Editor;