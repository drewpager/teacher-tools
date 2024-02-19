import React from "react";
import { Lesson, useAllLessonsQuery } from "../../graphql/generated";

type LessonProps = {
  id: number;
  text: string;
};

let uniqueId = 0;
function getItems(count: number) {
  return Array.from({ length: count }, (v, k) => {
    const id = uniqueId++;
    return {
      id: `id:${id}`,
      text: `item ${id}`,
    };
  });
}

const GetLessons = () => {
  let uniqueId = 1001;
  const { data, loading, error } = useAllLessonsQuery({
    variables: {
      limit: 1500,
      page: 1,
    },
  });

  if (loading) {
    console.log("Loading...");
  }
  if (error) {
    console.log("Error...");
  }

  if (!data) {
    console.log("No Data");
  }

  if (data) {
    data.allLessons.result.map((lesson: Lesson, index: number) => {
      const id: number = uniqueId++;
      console.log(lesson.title);
      return {
        id: `id:${id}`,
        text: `${lesson.title}`,
      };
    });
  }
};

const initial = {
  columns: {
    "playlist-column": {
      id: "playlist-column",
      title: "Playlist column",
      items: getItems(1000),
    },
    "lesson-column": {
      id: "lesson-column",
      title: "Lesson Column",
      items: getItems(1000),
    },
  },
  columnOrder: ["playlist-column", "lesson-column"],
};

export default function getInitialData() {
  return initial;
}
