import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const PreLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default PreLoader;
