import React from "react";

export const formatSlug = (title: any) => {
  return title.replace(/\s+/g, "-").toLowerCase();
};
