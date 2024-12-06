"use client";

import React, { useEffect } from "react";

function PrintMe() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.print();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return <div></div>;
}

export default PrintMe;
