// It's just an example of how to use the component!! Not the real component itself.
// It's styled and made here. It is debatable whether it should be in the `/components/` folder.

import React from "react";
import { styled } from "@stitches/react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

const StyledProgress = styled(ProgressPrimitive.Root, {
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 100%)",
  borderRadius: "99999px",
  width: 300,
  height: 25,

  // Fix overflow clipping in Safari
  // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
  transform: "translateZ(0)",
});

const StyledIndicator = styled(ProgressPrimitive.Indicator, {
  backgroundColor: "#2E90FA",
  width: "100%",
  height: "100%",
  transition: "transform 660ms cubic-bezier(0.65, 0, 0.35, 1)",
});

// Exports
export const Progress = StyledProgress;
export const ProgressIndicator = StyledIndicator;

// Usage
export default function ProgressExample() {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((value) => (value === 100 ? 0 : value + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Progress value={value}>
        <ProgressIndicator
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </Progress>
    </div>
  );
}