require("dotenv").config();

import { connectDatabase } from "../server/database";
import { Lesson, User, Playlist, Quiz } from "../server/lib/types";
import { ObjectId } from 'mongodb';

const seed = async () => {
  try {
    console.log(`[Seed]: running...`)

    const db = await connectDatabase();

    const quizzes: Quiz[] = [
      {
        _id: new ObjectId,
        questions: [
          {
            question: "What is the difference between Coffee and Athletic Greens?",
            correctAnswer: "Coffee has caffeine, AG1 Doesn't",
            answerOptions: ["Coffee is green", "AG1 is Black", "You Put Cream in AG1"],
            answerType: "MULTIPLECHOICE",
          },
          {
            question: "What is Drew Page's Middle Name?",
            correctAnswer: "Thomas",
            answerOptions: ["Robert", "Frank", "Steven"],    
            answerType: "MULTIPLECHOICE",
          },
          {
            question: "Coffee Contains Caffeine",
            correctAnswer: "True",
            answerOptions: ["False"],    
            answerType: "TRUEFALSE",
          }
        ],
        creator: "116143759549242008910"
      }
    ]
    
    // const lessons: Lesson[] = [
    //   {
    //     _id: new ObjectId,
    //     category: ["Prehistory"],
    //     title: "The Paleolithic Period of Early Man",
    //     meta: "The Paleolithic Period in early human history saw the slow adoption of stone tools, increasing survival and productivity rates of hominins starting 3.3 million years ago to the end of the Pleistocene Epoch, approximately 11,650 years ago.",
    //     video: "https://youtu.be/-xBQZoeFVmA",
    //     image: "https://res.cloudinary.com/drewpager/image/upload/v1637073017/paleolithic-age.png",
    //     startDate: -2500000,
    //     endDate: -10000,
    //     creator: "001"
    //   },
    //   {
    //     _id: new ObjectId,
    //     category: ["Prehistory", "World History"],
    //     title: "The Mesolithic Period of Early Man",
    //     meta: "The Mesolithic period is nestled between the Paleolithic and Neolithic periods and saw the rise of agriculture and animal husbandry to replace the prevailing hunter-gatherer culture, which archeologists and historians believe was an unevenly-embraced advance.  ",
    //     video: "https://youtu.be/1HL-aO2FGb4",
    //     image: "https://res.cloudinary.com/drewpager/image/upload/v1638115001/mesolithic-period.png",
    //     startDate: -10000,
    //     endDate: -8000,
    //     creator: "5d378db94e84753160e08b54"
    //   },
    //   {
    //     _id: new ObjectId,
    //     category: ["Egypt"],
    //     title: "Cleopatra",
    //     meta: "Cleopatra the 7th was known for her exotic beauty and powers of seduction during her three-decade reign over Egypt, despite repeated attempts to overthrow her rule.",
    //     video: "https://youtu.be/ll5LTsveyG4",
    //     image: "https://res.cloudinary.com/drewpager/image/upload/v1630419045/cleopatra.png",
    //     startDate: -69,
    //     endDate: -30,
    //     creator: "5d378db94e84753160e08b54"
    //   }
    // ];

    // const users: User[] = [
    //   {
    //     _id: "5d378db94e84753160e08b54",
    //     token: "token_84753160e08b55",
    //     name: "Drew P.",
    //     avatar:
    //       "https://cloudinary-res.cloudinary.com/image/upload/bo_1px_solid_rgb:eee,c_thumb,dpr_2.0,f_auto,fl_lossy,g_face,h_42,q_auto,r_max,w_42,z_0.8/profile_nadav_soferman.jpg",
    //     contact: "drew@siegemedia.com",
    //     watched: ["https://youtu.be/ll5LTsveyG4"],
    //     lessons: [
    //       {
    //         _id: new ObjectId,
    //         category: ["Prehistory", "World History"],
    //         title: "The Mesolithic Period of Early Man",
    //         meta: "The Mesolithic period is nestled between the Paleolithic and Neolithic periods and saw the rise of agriculture and animal husbandry to replace the prevailing hunter-gatherer culture, which archeologists and historians believe was an unevenly-embraced advance.  ",
    //         video: "https://youtu.be/1HL-aO2FGb4",
    //         image: "https://res.cloudinary.com/drewpager/image/upload/v1638115001/mesolithic-period.png",
    //         startDate: -10000,
    //         endDate: -8000,
    //         creator: "5d378db94e84753160e08b54"
    //       },
    //       {
    //         _id: new ObjectId,
    //         category: ["Egypt"],
    //         title: "Cleopatra",
    //         meta: "Cleopatra the 7th was known for her exotic beauty and powers of seduction during her three-decade reign over Egypt, despite repeated attempts to overthrow her rule.",
    //         video: "https://youtu.be/ll5LTsveyG4",
    //         image: "https://res.cloudinary.com/drewpager/image/upload/v1630419045/cleopatra.png",
    //         startDate: -69,
    //         endDate: -30,
    //         creator: "5d378db94e84753160e08b54"
    //       }
    //     ],
    //     playlists: [
    //       {
    //         _id: new ObjectId,
    //         name: "History 101",
    //         creator: "5d378db94e84753160e08b54",
    //         plan: [
    //            {
    //             _id: new ObjectId,
    //             category: ["Prehistory", "World History"],
    //             title: "The Mesolithic Period of Early Man",
    //             meta: "The Mesolithic period is nestled between the Paleolithic and Neolithic periods and saw the rise of agriculture and animal husbandry to replace the prevailing hunter-gatherer culture, which archeologists and historians believe was an unevenly-embraced advance.  ",
    //             video: "https://youtu.be/1HL-aO2FGb4",
    //             image: "https://res.cloudinary.com/drewpager/image/upload/v1638115001/mesolithic-period.png",
    //             startDate: -10000,
    //             endDate: -8000,
    //             creator: "001"
    //           },
    //           {
    //             _id: new ObjectId,
    //             category: ["Prehistory"],
    //             title: "The Paleolithic Period of Early Man",
    //             meta: "The Paleolithic Period in early human history saw the slow adoption of stone tools, increasing survival and productivity rates of hominins starting 3.3 million years ago to the end of the Pleistocene Epoch, approximately 11,650 years ago.",
    //             video: "https://youtu.be/-xBQZoeFVmA",
    //             image: "https://res.cloudinary.com/drewpager/image/upload/v1637073017/paleolithic-age.png",
    //             startDate: -2500000,
    //             endDate: -10000,
    //             creator: "001"
    //           }
    //         ]
    //       }
    //     ]
    //   },
    //   {
    //     _id: "5d378db94e84753160e08b53",
    //     token: "token_84753160e08b54",
    //     name: "Zelda",
    //     avatar:
    //       "https://cloudinary-res.cloudinary.com/image/upload/bo_1px_solid_rgb:eee,c_thumb,dpr_2.0,f_auto,fl_lossy,g_face,h_42,q_auto,r_max,w_42,z_0.8/profile_itai_lahan.jpg",
    //     contact: "tcpager@me.com",
    //     watched: ["https://youtu.be/ll5LTsveyG4"],
    //     playlists: [
    //       {
    //         _id: new ObjectId,
    //         name: "History 102",
    //         creator: "5d378db94e84753160e08b53",
    //         plan: [
    //            {
    //             _id: new ObjectId,
    //             category: ["Prehistory", "World History"],
    //             title: "The Mesolithic Period of Early Man",
    //             meta: "The Mesolithic period is nestled between the Paleolithic and Neolithic periods and saw the rise of agriculture and animal husbandry to replace the prevailing hunter-gatherer culture, which archeologists and historians believe was an unevenly-embraced advance.  ",
    //             video: "https://youtu.be/1HL-aO2FGb4",
    //             image: "https://res.cloudinary.com/drewpager/image/upload/v1638115001/mesolithic-period.png",
    //             startDate: -10000,
    //             endDate: -8000,
    //             creator: "001"
    //           },
    //           {
    //             _id: new ObjectId,
    //             category: ["Egypt"],
    //             title: "Cleopatra",
    //             meta: "Cleopatra the 7th was known for her exotic beauty and powers of seduction during her three-decade reign over Egypt, despite repeated attempts to overthrow her rule.",
    //             video: "https://youtu.be/ll5LTsveyG4",
    //             image: "https://res.cloudinary.com/drewpager/image/upload/v1630419045/cleopatra.png",
    //             startDate: -69,
    //             endDate: -30,
    //             creator: "001"
    //           }
    //         ]
    //       },
    //       {
    //         _id: new ObjectId,
    //         name: "History 103",
    //         creator: "5d378db94e84753160e08b54",
    //         plan: [
    //            {
    //             _id: new ObjectId,
    //             category: ["Prehistory", "World History"],
    //             title: "The Mesolithic Period of Early Man",
    //             meta: "The Mesolithic period is nestled between the Paleolithic and Neolithic periods and saw the rise of agriculture and animal husbandry to replace the prevailing hunter-gatherer culture, which archeologists and historians believe was an unevenly-embraced advance.  ",
    //             video: "https://youtu.be/1HL-aO2FGb4",
    //             image: "https://res.cloudinary.com/drewpager/image/upload/v1638115001/mesolithic-period.png",
    //             startDate: -10000,
    //             endDate: -8000,
    //             creator: "001"
    //           },
    //           {
    //             _id: new ObjectId,
    //             category: ["Egypt"],
    //             title: "Cleopatra",
    //             meta: "Cleopatra the 7th was known for her exotic beauty and powers of seduction during her three-decade reign over Egypt, despite repeated attempts to overthrow her rule.",
    //             video: "https://youtu.be/ll5LTsveyG4",
    //             image: "https://res.cloudinary.com/drewpager/image/upload/v1630419045/cleopatra.png",
    //             startDate: -69,
    //             endDate: -30,
    //             creator: "001"
    //           }
    //         ]
    //       },
    //     ],
    //   },
    // ];
    
    // const playlists: Playlist[] = [
    //   {
    //     _id: new ObjectId,
    //     name: "History 102",
    //     creator: "5d378db94e84753160e08b53",
    //     plan: [
    //        {
    //         _id: new ObjectId,
    //         category: ["Prehistory", "World History"],
    //         title: "The Mesolithic Period of Early Man",
    //         meta: "The Mesolithic period is nestled between the Paleolithic and Neolithic periods and saw the rise of agriculture and animal husbandry to replace the prevailing hunter-gatherer culture, which archeologists and historians believe was an unevenly-embraced advance.  ",
    //         video: "https://youtu.be/1HL-aO2FGb4",
    //         image: "https://res.cloudinary.com/drewpager/image/upload/v1638115001/mesolithic-period.png",
    //         startDate: -10000,
    //         endDate: -8000,
    //         creator: "001"
    //       },
    //       {
    //         _id: new ObjectId,
    //         category: ["Egypt"],
    //         title: "Cleopatra",
    //         meta: "Cleopatra the 7th was known for her exotic beauty and powers of seduction during her three-decade reign over Egypt, despite repeated attempts to overthrow her rule.",
    //         video: "https://youtu.be/ll5LTsveyG4",
    //         image: "https://res.cloudinary.com/drewpager/image/upload/v1630419045/cleopatra.png",
    //         startDate: -69,
    //         endDate: -30,
    //         creator: "001"
    //       }
    //     ]
    //   },
    //   {
    //     _id: new ObjectId,
    //     name: "History 103",
    //     creator: "5d378db94e84753160e08b54",
    //     plan: [
    //        {
    //         _id: new ObjectId,
    //         category: ["Prehistory", "World History"],
    //         title: "The Mesolithic Period of Early Man",
    //         meta: "The Mesolithic period is nestled between the Paleolithic and Neolithic periods and saw the rise of agriculture and animal husbandry to replace the prevailing hunter-gatherer culture, which archeologists and historians believe was an unevenly-embraced advance.  ",
    //         video: "https://youtu.be/1HL-aO2FGb4",
    //         image: "https://res.cloudinary.com/drewpager/image/upload/v1638115001/mesolithic-period.png",
    //         startDate: -10000,
    //         endDate: -8000,
    //         creator: "001"
    //       },
    //       {
    //         _id: new ObjectId,
    //         category: ["Egypt"],
    //         title: "Cleopatra",
    //         meta: "Cleopatra the 7th was known for her exotic beauty and powers of seduction during her three-decade reign over Egypt, despite repeated attempts to overthrow her rule.",
    //         video: "https://youtu.be/ll5LTsveyG4",
    //         image: "https://res.cloudinary.com/drewpager/image/upload/v1630419045/cleopatra.png",
    //         startDate: -69,
    //         endDate: -30,
    //         creator: "001"
    //       }
    //     ]
    //   },
    // ];

    // for (const lesson of lessons) {
    //   db.lessons.insertOne(lesson);
    // }

    // for (const user of users) {
    //   db.users.insertOne(user);
    // }

    // for (const playlist of playlists) {
    //   db.playlists.insertOne(playlist);
    // }

    for (const quiz of quizzes) {
      db.quizzes.insertOne(quiz);
    }
    
    console.log(`[Seed]: Success!`);

  } catch (error) {
    throw new Error("Failed to seed database.")
  }
};

seed();