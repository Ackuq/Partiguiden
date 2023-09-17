import React, { useRef } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TypedJS from "typed.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Typed: React.FC<any> = ({ ...options }) => {
  const typed = useRef<TypedJS | null>(null);

  return (
    <span
      ref={(ref) => {
        if (ref && !typed.current) {
          typed.current = new TypedJS(ref, options);
        }
      }}
    />
  );
};

export default Typed;
