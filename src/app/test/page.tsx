// loadings
// icons
// suggestのlocation, country

import React from "react";
import Loading from "../loading";

const about = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2500));
  return (
    <div className="">
      <Loading />
    </div>
  );
};

export default about;
