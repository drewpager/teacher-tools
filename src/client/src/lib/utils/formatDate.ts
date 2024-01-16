import React from "react";

export const formatDate = (date: string) => {
  const dated = new Date(`${date}`);

  if (date === "Present") {
    return "Present";
  }

  if (date === "Infinity") {
    return "Infinity";
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

  return new Date(
    dated.getFullYear(),
    dated.getMonth(),
    dated.getDate() + 1
  ).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
