require("dotenv").config();

import { connectDatabase } from "../database";
import { Lesson, User, Playlist, Quiz } from "../lib/types";
import { ObjectId } from "mongodb";

const seed = async () => {
  try {
    console.log(`[Seed]: running...`);

    const db = await connectDatabase();

    // const quizzes: Quiz[] = [
    //   {
    //     _id: new ObjectId(),
    //     title: "Quiz About Drew's Morning!",
    //     questions: [
    //       {
    //         question:
    //           "What is the difference between Coffee and Athletic Greens?",
    //         answerOptions: [
    //           { answerText: "Coffee is green", isCorrect: false },
    //           { answerText: "AG1 is Black", isCorrect: false },
    //           { answerText: "You Put Cream in AG1", isCorrect: false },
    //           { answerText: "Coffee has caffeine", isCorrect: true },
    //         ],
    //         answerType: "MULTIPLECHOICE",
    //       },
    //       {
    //         question: "What is Drew Page's Middle Name?",
    //         answerOptions: [
    //           { answerText: "Robert", isCorrect: false },
    //           { answerText: "Thomas", isCorrect: true },
    //           { answerText: "Frank", isCorrect: false },
    //           { answerText: "Steven", isCorrect: false },
    //         ],
    //         answerType: "MULTIPLECHOICE",
    //       },
    //       {
    //         question: "Coffee Contains Caffeine",
    //         answerOptions: [
    //           { answerText: "False", isCorrect: false },
    //           { answerText: "True", isCorrect: true },
    //         ],
    //         answerType: "TRUEFALSE",
    //       },
    //     ],
    //     creator: "116143759549242008910",
    //   },
    // ];

    // Don't worry about space in categories [" renaissance"]. Dates must be checked.
    const lessons: Lesson[] = [
      // {
      //   _id: new ObjectId(),
      //   title: "The Great Fire of New York",
      //   video:
      //     "https://res.cloudinary.com/drewpager/video/upload/v1690996386/platos-peach-video/The_Great_Fire_of_New_York_City_hntv8i.mp4",
      //   image:
      //     "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //   startDate: "1776-09-21",
      //   endDate: "1776-09-22",
      //   category: ["american history", " revolution & independence"],
      //   meta: "The Great Fire of New York City was a devastating fire that occurred in 1835, destroying a large portion of the city and leading to significant changes in fire safety regulations and infrastructure.",
      //   creator: "116143759549242008910",
      // },
      // {
      //   _id: new ObjectId(),
      //   title: "The Louisiana Purchase",
      //   video:
      //     "https://res.cloudinary.com/drewpager/video/upload/v1669703826/platos-peach-video/The_Louisiana_Purchase_w2vdrp.mp4",
      //   image:
      //     "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //   startDate: "1801",
      //   endDate: "1803",
      //   category: ["american history", " westward expansion"],
      //   meta: "French territory in early 19th Century America was ideal for US expansion when the Louisiana Purchase was negotiated for $15 million or $0.03 per acre as Napoleon forced France into financial distress during the Napoleonic Wars. ",
      //   creator: "116143759549242008910",
      //   public: true,
      // },
    ];

    for (const lesson of lessons) {
      db.lessons.insertOne(lesson);
    }

    // for (const user of users) {
    //   db.users.insertOne(user);
    // }

    // for (const playlist of playlists) {
    //   db.playlists.insertOne(playlist);
    // }

    // for (const quiz of quizzes) {
    //   db.quizzes.insertOne(quiz);
    // }

    console.log(`[Seed]: Success!`);
  } catch (error) {
    throw new Error("Failed to seed database.");
  }
};

seed();
