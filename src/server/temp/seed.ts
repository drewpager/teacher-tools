require("dotenv").config();

import { connectDatabase } from "../server/database";
import { Lesson, User, Playlist, Quiz } from "../server/lib/types";
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

    const lessons: Lesson[] = [
      {
        _id: new ObjectId(),
        title: "27 Club",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669496508/platos-peach-video/27_Club_gfbdrv.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1938",
        endDate: "2022",
        category: ["world history"],
        meta: "The clout of the elusive 27 Club includes famous artists and musicians who coincidentally died at the ripe age of 27. Members include Kurt Cobain, Jimi Hendrix, Janis Joplin, Amy Winehouse, and far too many more.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "A Standout Hero at Hacksaw Ridge",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669505501/platos-peach-video/A_Standout_Hero_at_Hacksaw_Ridge_b7t23n.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1945/04/01",
        endDate: "1945/06/22",
        category: ["military history", " world war two"],
        meta: "Desmond T. Doss was a United States Army corporal who served as a combat medic during World War II. He was a 'conscientious cooperator' and refused to carry a weapon or kill anyone, instead choosing to serve as a medic, most famously as a hero at Hacksaw Ridge.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "A tragic Winter at Valley Forge",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669505775/platos-peach-video/A_tragic_Winter_at_Valley_Forge_qo9bcw.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "12/19/1777",
        endDate: "06/19/1778",
        category: ["military history", " american revolutionary war"],
        meta: "",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Alaska Purchase",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669506852/platos-peach-video/Alaska_Purchase_ug65om.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "03/30/1867",
        endDate: "03/30/1867",
        category: ["american history", " westward expansion"],
        meta: "The Purchase of Alaska from Russia was completed on October 18th, 1867, adding 586,412 square miles to the U.S. territory for only $7.2 million, less than two cents an acre.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Albert Einstein",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669507109/platos-peach-video/Albert_Einstein_c4cclz.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "03/14/1879",
        endDate: "04/18/1955",
        category: ["biography"],
        meta: "Albert Einstein, educated in Physics and Math, had his 'marvelous year' of theoretical productivity in 1905, catapulting him into the spotlight of intellectual fame and professorship until his death in 1955. ",
        creator: "116143759549242008910",
      },
    ];
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
