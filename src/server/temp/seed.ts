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
      //   title: "Quantum Chromodynamics",
      //   video:
      //     "https://res.cloudinary.com/drewpager/video/upload/v1703105352/platos-peach-video/Quantum_Chromodynamics_ekwiuw.mov",
      //   image:
      //     "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //   startDate: "Present",
      //   endDate: "Present",
      //   category: ["science", " physics"],
      //   meta: "Quantum Chromodynamics (QCD) is a theory that describes the strong nuclear force, which binds quarks together to form protons, neutrons, and other particles. It is a fundamental theory of particle physics and is part of the Standard Model. QCD involves the study of the interactions between quarks and gluons, which are the carriers of the strong force.",
      //   creator: "116143759549242008910",
      //   public: true,
      // },
      // {
      //   _id: new ObjectId(),
      //   title: "Quantum Electrodynamics",
      //   video:
      //     "https://res.cloudinary.com/drewpager/video/upload/v1703106277/platos-peach-video/Quantum_Electrodynamics_ooryof.mov",
      //   image:
      //     "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //   startDate: "Present",
      //   endDate: "Present",
      //   category: ["science", " physics"],
      //   meta: "Quantum Electrodynamics is a branch of physics that combines quantum mechanics with classical electromagnetism. It describes the interactions between electrically charged particles and electromagnetic fields. It is a highly successful theory that has been used to explain and predict a wide range of phenomena, including the behavior of subatomic particles and the properties of light.",
      //   creator: "116143759549242008910",
      //   public: true,
      // },
      // {
      //   _id: new ObjectId(),
      //   title: "Quarks and Gluons",
      //   video:
      //     "https://res.cloudinary.com/drewpager/video/upload/v1703107396/platos-peach-video/Quarks_and_Gluons_qzwtfv.mov",
      //   image:
      //     "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //   startDate: "Present",
      //   endDate: "Present",
      //   category: ["science", " physics"],
      //   meta: "Quarks and gluons are elementary particles that make up protons and neutrons. Quarks have fractional electric charges and are held together by gluons, which are the carriers of the strong force. They play a crucial role in the structure and interactions of matter, as described by the theory of quantum chromodynamics.",
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
