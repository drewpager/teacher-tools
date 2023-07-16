import React from "react";

export const titleCase = (str: string) => {
  if (str === "u.s. constitution") {
    return "U.S. Constitution";
  }
  if (str === "mexican-american war") {
    return "Mexican-American War";
  }
  if (str === "spanish-american war") {
    return "Spanish-American War";
  }
  if (str === "sino-soviet war") {
    return "Sino-Soviet War";
  }
  if (str === "post-cold war") {
    return "Post-Cold War";
  }
  if (str === "war of 1812") {
    return "War of 1812";
  }
  if (str === "age of exploration") {
    return "Age of Exploration";
  }
  if (str === "tradition of taps") {
    return "Tradition of Taps";
  }
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
};
