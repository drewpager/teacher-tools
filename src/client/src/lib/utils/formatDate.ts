import React from 'react';

export const formatDate = (date: string) => {
  if (date.startsWith("-", 0)) {
    return date.replace("-", "") + " BCE"
  }
  return date;
}