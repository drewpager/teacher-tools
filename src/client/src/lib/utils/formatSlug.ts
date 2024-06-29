import React from "react";

export const formatSlug = (title: any) => {
  return title.replaceAll(/-/g, "_").replace(/ /g, "-").toLowerCase();
};
