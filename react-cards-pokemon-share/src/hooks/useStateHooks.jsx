import React, { useState } from "react";

const useSateHooks = (initialState) => {
  const [state, setState] = useState(initialState);

  const resetState = () => {
    setState(initialState);
  };

  return [state, setState, resetState];
};

export default useSateHooks;
