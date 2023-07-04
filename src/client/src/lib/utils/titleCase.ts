import React from "react";

export const titleCase = (str: string) => {
  if (str === "u.s. constitution") {
    return "U.S. Constitution";
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};
