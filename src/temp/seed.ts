require("dotenv").config();

import { connectDatabase } from "../server/database";
import { Lesson } from "../server/lib/types";
import { ObjectId } from 'mongodb';

const seed = async () => {
  try {
    console.log(`[Seed]: running...`)

    const db = await connectDatabase();
    
    const lessons: Lesson[] = [
      {
        _id: new ObjectId,
        category: ["Prehistory"],
        title: "The Paleolithic Period of Early Man",
        meta: "The Paleolithic Period in early human history saw the slow adoption of stone tools, increasing survival and productivity rates of hominins starting 3.3 million years ago to the end of the Pleistocene Epoch, approximately 11,650 years ago.",
        video: "https://youtu.be/-xBQZoeFVmA",
        image: "https://res.cloudinary.com/drewpager/image/upload/v1637073017/paleolithic-age.png",
        startDate: -2500000,
        endDate: -10000,
      },
      {
        _id: new ObjectId,
        category: ["Prehistory", "World History"],
        title: "The Mesolithic Period of Early Man",
        meta: "The Mesolithic period is nestled between the Paleolithic and Neolithic periods and saw the rise of agriculture and animal husbandry to replace the prevailing hunter-gatherer culture, which archeologists and historians believe was an unevenly-embraced advance.  ",
        video: "https://youtu.be/1HL-aO2FGb4",
        image: "https://res.cloudinary.com/drewpager/image/upload/v1638115001/mesolithic-period.png",
        startDate: -10000,
        endDate: -8000,
      },
      {
        _id: new ObjectId,
        category: ["Egypt"],
        title: "Cleopatra",
        meta: "Cleopatra the 7th was known for her exotic beauty and powers of seduction during her three-decade reign over Egypt, despite repeated attempts to overthrow her rule.",
        video: "https://youtu.be/ll5LTsveyG4",
        image: "https://res.cloudinary.com/drewpager/image/upload/v1630419045/cleopatra.png",
        startDate: -69,
        endDate: -30,
      }
    ];

    for (const lesson of lessons) {
      db.lessons.insertOne(lesson);
    }
    
    console.log(`[Seed]: Success!`);

  } catch (error) {
    throw new Error("Failed to seed database.")
  }
};

seed();