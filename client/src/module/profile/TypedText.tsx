import React, {useEffect, useRef} from "react";
import Typed from "typed.js";

const TypedText = (): JSX.Element => {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Web Developer", "Mobile Developer", "Bridge System Engineer"],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1300,
      loop: true,
    };
    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return <span className="text" ref={typedRef}></span>;
};

export default TypedText;
