import React from "react";

export const formatDate = (date: string) => {
  if (date === "Present") {
    return "Present";
  }

  if (date.length <= 4 && date.startsWith("-", 0)) {
    return `${date.split("-")[1]} BC`;
  }

  if (date.length <= 4) {
    return date;
  }

  if (date.startsWith("-", 0)) {
    return `${date.split("-")[1]} BC`;
  }
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
