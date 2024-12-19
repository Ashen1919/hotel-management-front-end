import React, { useEffect } from "react";

const TawkToWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/67628922af5bfec1dbddc914/1ifcefceh";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; 
};

export default TawkToWidget;
