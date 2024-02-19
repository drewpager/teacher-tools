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
      {
        _id: new ObjectId(),
        title: "Where in the World is Afghanistan",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705860572/platos-peach-video/Where_in_the_World_is_Afghanistan_zhmhjy.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1919",
        endDate: "Present",
        category: ["geography"],
        meta: "Afghanistan is a landlocked country located in South Asia, bordered by Pakistan, Iran, Turkmenistan, Uzbekistan, Tajikistan, and China. It has a diverse landscape of mountains, deserts, and valleys, and has been a strategic location for trade and conflict throughout history. The country has faced ongoing political instability and conflict, particularly with the presence of the Taliban.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Reconstruction Acts of 1867",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705860565/platos-peach-video/The_Reconstruction_Acts_of_1867_cwtvqo.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1867",
        endDate: "1877",
        category: ["american history", " reconstruction"],
        meta: "The Reconstruction Acts of 1867 were a series of laws passed by Congress to establish military rule in the Southern states and oversee their readmission to the Union after the Civil War. These acts divided the South into five military districts and required the states to ratify the 14th Amendment and grant voting rights to African Americans.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Where in the World is Hawaii",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705860501/platos-peach-video/Where_in_the_World_is_Hawaii_pacijt.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1959",
        endDate: "Present",
        category: ["geography"],
        meta: "Hawaii is located in the Pacific Ocean, specifically in the central part of the Pacific. It is an archipelago made up of several islands, with the main ones being Hawaii Island (also known as the Big Island), Maui, Oahu, Kauai, Molokai, and Lanai.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Where in the World is Maryland",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705860481/platos-peach-video/Where_in_the_World_is_Maryland_a380cg.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1632",
        endDate: "Present",
        category: ["geography"],
        meta: "Maryland is located in the Mid-Atlantic region of the United States. It is bordered by Pennsylvania to the north, Delaware and the Atlantic Ocean to the east, Virginia to the south, and West Virginia to the west.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Life of Skunks",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705860472/platos-peach-video/The_Life_of_Skunks_rjfdrw.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-12000000",
        endDate: "Present",
        category: ["science", " zoology"],
        meta: "The life of skunks is characterized by their unique black and white markings, strong sense of smell, and ability to spray a foul-smelling liquid as a defense mechanism. Skunks are nocturnal animals that primarily feed on insects, small mammals, and plants. They are solitary creatures that are known for their distinctive waddling gait.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Life of Cheetahs",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705859954/platos-peach-video/The_Life_of_Cheetahs_e9ild4.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-6000000",
        endDate: "Present",
        category: ["science", " zoology"],
        meta: "The life of cheetahs is characterized by their incredible speed, agility, and hunting prowess. These majestic big cats are solitary animals that roam vast territories in search of prey. Cheetahs are known for their distinctive spotted coats and are considered one of the most iconic predators in the animal kingdom.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Life of Elephants",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705859934/platos-peach-video/The_Life_of_Elephants_qqgt8s.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-60000000",
        endDate: "Present",
        category: ["science", " zoology"],
        meta: "Elephants are the largest land animals, known for their distinctive trunks and tusks. They have a complex social structure, living in herds led by a matriarch. Elephants are herbivores, consuming up to 300 pounds of vegetation daily. They have a long gestation period of around 22 months and give birth to a single calf. Elephants are highly intelligent and exhibit advanced communication skills. Unfortunately, they are currently threatened by habitat loss and poaching for their ivory tusks.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Confiscation Acts",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705859935/platos-peach-video/The_Confiscation_Acts_sduddq.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1861-08-06",
        endDate: "1865-04-09",
        category: ["american history", " civil war"],
        meta: "The Confiscation Acts were a series of laws passed by the United States Congress during the Civil War that allowed for the seizure of property, including slaves, from Confederate supporters. These acts were aimed at weakening the Confederacy and punishing those who supported the rebellion.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Honda Point Disaster",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705859915/platos-peach-video/The_Honda_Point_Disaster_nq8x0c.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1923-09-08",
        endDate: "1923-09-08",
        category: ["american history"],
        meta: "The Honda Point Disaster was a naval accident that occurred in 1923 off the coast of California. It involved the grounding and subsequent destruction of seven United States Navy destroyers. The incident resulted in the loss of 23 lives and is considered one of the worst peacetime naval disasters in American history.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The DEW Line",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705859880/platos-peach-video/The_DEW_Line_jopbhs.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1952",
        endDate: "1985",
        category: ["american history", " cold war era"],
        meta: "The DEW Line, or Distant Early Warning Line, was a system of radar stations established in the Arctic during the Cold War to detect and track potential Soviet bomber attacks. It stretched across Alaska, Canada, and Greenland, providing early warning of any incoming threats. The DEW Line played a crucial role in the defense strategy of North America.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Bull of Scapa Flow",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705859338/platos-peach-video/The_Bull_of_Scapa_Flow_ay3pfz.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1939-08-19",
        endDate: "1941-03-07",
        category: ["world military history"],
        meta: "Günther Prien was a German U-boat commander during World War II. He is best known for his successful attack on the British battleship HMS Royal Oak in Scapa Flow in 1939, which resulted in the sinking of the ship and the loss of over 800 lives. Prien was awarded the Knight's Cross of the Iron Cross for his actions and became a hero in Nazi Germany.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Seven Pines",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705859289/platos-peach-video/The_Battle_of_Seven_Pines_l2somh.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1862-05-31",
        endDate: "1862-06-01",
        category: ["american military history", " civil war"],
        meta: "The Battle of Seven Pines, fought in May 1862 during the American Civil War, was a bloody and inconclusive battle between Union forces led by General George McClellan and Confederate forces under General Joseph E. Johnston. Despite heavy casualties on both sides, neither army was able to achieve a decisive victory.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Battle of San Jacinto",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705859266/platos-peach-video/The_Battle_of_San_Jacinto_rmc6j7.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1836-04-01",
        endDate: "1836-04-01",
        category: ["american military history"],
        meta: "The Battle of San Jacinto was a decisive battle in the Texas Revolution. It took place on April 21, 1836, near present-day Houston, Texas. Led by General Sam Houston, the Texian army defeated the Mexican army led by General Antonio López de Santa Anna, securing Texas' independence from Mexico.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Skipjacks of the Chesapeake Bay",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705858857/platos-peach-video/Skipjacks_of_the_Chesapeake_Bay_jyjr5a.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1890",
        endDate: "Present",
        category: ["american history"],
        meta: "Skipjacks are traditional wooden sailing boats used for oyster dredging in the Chesapeake Bay. They have a shallow draft and a large sail area, allowing them to navigate the bay's shallow waters. Skipjacks are an iconic symbol of the Chesapeake Bay and are still used today by a few oystermen.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Lady Columbia",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705858595/platos-peach-video/Lady_Columbia_kz1xnj.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1697",
        endDate: "1886",
        category: ["american history"],
        meta: "Lady Columbia is a personification of the United States of America. She is often depicted as a strong and patriotic woman, wearing a crown of stars and holding a shield and a sword. She represents liberty, freedom, and democracy, and is a symbol of American ideals and values.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Goody Two-Shoes",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705858578/platos-peach-video/Goody_Two-Shoes_a1povp.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1765",
        endDate: "Present",
        category: ["art", " literature"],
        meta: "Goody Two-Shoes is a term used to describe someone who is excessively virtuous or well-behaved. It originated from a children's book published in 1765, titled 'The History of Little Goody Two-Shoes.' The story follows a poor orphan girl who becomes successful through her good behavior and hard work.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Forrest City",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705858271/platos-peach-video/Forrest_City_omn9lv.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "2016",
        endDate: "Present",
        category: ["geography"],
        meta: "Forrest City is a luxurious mixed-use development located in the state of Johor, Malaysia. It features residential, commercial, and recreational facilities, including high-rise apartments, shopping malls, and green spaces. Unfortunately, demand for the city has been less than expected, resulting in a ghost city at 10% the planned capacity.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Breakthroughs in Antimatter",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1705857922/platos-peach-video/Breakthroughs_in_Antimatter_kcimld.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1915",
        endDate: "Present",
        category: ["science", " physics"],
        meta: "Recent advancements in antimatter research have led to groundbreaking breakthroughs in the field. Scientists have successfully trapped and studied antimatter particles, shedding light on their properties and potential applications. These developments have the potential to revolutionize our understanding of the universe and could lead to significant technological advancements in the future.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "CAR T Cells Fight Autoimmune Disease",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708212639/platos-peach-video/CAR_T_Cells_Fight_Autoimmune_Disease_ktetra.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "2017",
        endDate: "Present",
        category: ["science", " medicine"],
        meta: "CAR T cells, typically used in cancer treatment, are now being explored as a potential therapy for autoimmune diseases. By genetically modifying these immune cells to target specific antigens, researchers hope to harness their ability to attack and eliminate harmful cells in the body. This innovative approach shows promise in treating conditions like multiple sclerosis and lupus.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Franco-Prussian War",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708213725/platos-peach-video/The_Franco-Prussian_War_jj8b0g.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1870-07-15",
        endDate: "1871-05-10",
        category: ["world military history"],
        meta: "The Franco-Prussian War was a conflict between France and Prussia from 1870 to 1871. It resulted in the defeat of France and the unification of Germany under Prussian leadership. The war also led to the establishment of the German Empire and marked the end of French dominance in Europe.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Convoys of the Second World War",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708212944/platos-peach-video/Convoys_of_the_Second_World_War_rr1knu.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1939-09-16",
        endDate: "1945-09-02",
        category: ["world military history", " world war two"],
        meta: "During the Second World War, convoys played a crucial role in protecting merchant ships from enemy attacks. These convoys consisted of groups of ships traveling together for mutual protection. They were escorted by naval vessels and aircraft to defend against German U-boats and surface raiders. The convoys helped ensure the safe passage of vital supplies and troops across the Atlantic Ocean.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Charles Darwin",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708212998/platos-peach-video/Charles_Darwin_hucvuj.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1809-02-12",
        endDate: "1882-04-19",
        category: ["biography"],
        meta: "Charles Darwin was a British naturalist and biologist known for his theory of evolution by natural selection. His groundbreaking work 'On the Origin of Species' published in 1859, revolutionized the field of biology and our understanding of the diversity of life on Earth. Darwin's ideas continue to influence scientific thought and research to this day.",
        creator: "116143759549242008910",
        public: true,
      },
      // {
      //   _id: new ObjectId(),
      //   title: "Economic Opportunity Cost",
      //   video:
      //     "https://res.cloudinary.com/drewpager/video/upload/v1708213262/platos-peach-video/Economic_Opportunity_Cost_js5uhv.mov",
      //   image:
      //     "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //   startDate: "1917",
      //   endDate: "Present",
      //   category: ["economics"],
      //   meta: "Economic opportunity cost refers to the potential benefits or profits that are forgone when choosing one option over another. It is the value of the next best alternative that is sacrificed in order to pursue a particular course of action. Understanding economic opportunity cost is essential for making informed decisions in business and personal finance.",
      //   creator: "116143759549242008910",
      //   public: true,
      // },
      {
        _id: new ObjectId(),
        title: "Darwinian Medicine",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708213328/platos-peach-video/Darwinian_Medicine_iqfgdk.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1991",
        endDate: "Present",
        category: ["science", " medicine"],
        meta: "Darwinian Medicine is a branch of evolutionary biology that applies the principles of natural selection to understanding human health and disease. It explores how our evolutionary history has shaped our susceptibility to certain illnesses and conditions, and how this knowledge can inform medical treatments and interventions.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Giulia Tofana: The Poison Queen of Italy",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708213806/platos-peach-video/Giulia_Tofano_The_Poison_Queen_of_Italy_iptfx2.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1620",
        endDate: "1651",
        category: ["biography"],
        meta: "Giulia Tofana was a notorious Italian woman known as 'The Poison Queen' for selling toxic concoctions to women seeking to escape abusive marriages. Operating in the 17th century, she was eventually caught and executed for her crimes. Tofana's actions shed light on the desperate measures some women took to gain freedom in a patriarchal society.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Great California Flood of 1862",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708213851/platos-peach-video/The_Great_California_Flood_of_1862_ykzpc9.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1861-12-24",
        endDate: "1862-02-04",
        category: ["american history"],
        meta: "The Great California Flood of 1862 was a catastrophic event that resulted from weeks of heavy rainfall, causing widespread flooding throughout the state. The flood destroyed homes, farms, and infrastructure, leading to significant economic and social impacts. It remains one of the most devastating natural disasters in California's history.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Jewish Expulsion from Spain",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708214182/platos-peach-video/The_Jewish_Expulsion_From_Spain_es5otm.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1492",
        endDate: "1492",
        category: ["world history"],
        meta: "The Jewish expulsion from Spain in 1492 was a significant event in history, as thousands of Jews were forced to leave the country or convert to Christianity. This expulsion marked the end of centuries of Jewish presence in Spain and had far-reaching consequences for the Jewish community, leading to diaspora and persecution in other parts of Europe.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Gullah Geechee",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708214276/platos-peach-video/The_Gullah_Geechee_doci5a.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1663",
        endDate: "Present",
        category: ["american history", " south & slavery"],
        meta: "The Gullah Geechee are descendants of enslaved Africans who have preserved their unique culture and language in the coastal regions of the southeastern United States. They have a rich heritage of storytelling, music, and cuisine that reflects their African roots and the hardships they endured during slavery. Today, they continue to celebrate and honor their heritage through festivals and cultural events.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Jewish Massacre of 1391",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708214295/platos-peach-video/The_Jewish_Massacre_of_1391_zunuwy.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1391-06-06",
        endDate: "1391-09-04",
        category: ["world history"],
        meta: "The Jewish Massacre of 1391 was a series of violent attacks against Jewish communities in Spain, resulting in the deaths of thousands of Jews. The massacres were fueled by anti-Semitic sentiments and led to widespread destruction of Jewish homes and synagogues. This event marked a dark period in Spanish history and had lasting effects on the Jewish population.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Life of Domesticated House Cats",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708214673/platos-peach-video/The_Life_of_Domesticated_House_Cats_rsystn.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-12000",
        endDate: "Present",
        category: ["science", " zoology"],
        meta: "Domesticated house cats are popular pets known for their independent nature and playful behavior. They have been companions to humans for thousands of years, with origins traced back to ancient Egypt. Cats are skilled hunters and have adapted well to living in human households, forming strong bonds with their owners.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Life of Beavers",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708214702/platos-peach-video/The_Life_of_Beavers_vsxfxa.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-10000000",
        endDate: "Present",
        category: ["science", " zoology"],
        meta: "The life of beavers revolves around building dams, creating lodges, and maintaining their aquatic habitats. These industrious creatures are known for their engineering skills and ability to transform landscapes. Beavers play a crucial role in shaping ecosystems and providing habitat for a variety of other species.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Life of Wolves ",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708214733/platos-peach-video/The_Life_of_Wolves_nmx75v.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-1000000",
        endDate: "Present",
        category: ["science", " zoology"],
        meta: "The Life of Wolves explores the behavior, social structure, and hunting techniques of these fascinating creatures. From their pack dynamics to their communication methods, this documentary delves into the daily lives of wolves in the wild. Viewers will gain a deeper understanding and appreciation for these majestic animals and their important role in the ecosystem.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Life of Muskrats",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708215260/platos-peach-video/The_Life_of_Muskrats_xps6xw.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-5000000",
        endDate: "Present",
        category: ["science", " zoology"],
        meta: "The life of muskrats revolves around their semi-aquatic habitat, where they build dome-shaped lodges near water bodies. These small mammals are excellent swimmers and feed on aquatic plants, roots, and small animals. Muskrats are known for their ability to adapt to various environments and are an important part of wetland ecosystems.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Resignation of George Washington",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708215591/platos-peach-video/The_Resignation_of_George_Washington_usqm9i.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1783-12-23",
        endDate: "1783-12-23",
        category: ["american history"],
        meta: "George Washington resigned as the first President of the United States in 1796, setting a precedent for peaceful transitions of power. His farewell address warned against political factions and foreign entanglements, emphasizing the importance of unity and national sovereignty. Washington's resignation solidified his reputation as a selfless leader dedicated to the principles of democracy.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "The Patent Office Fire of 1836",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708215605/platos-peach-video/The_Patent_Office_Fire_of_1836_jyreje.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1836-12-15",
        endDate: "1836-12-15",
        category: ["american history"],
        meta: "The Patent Office Fire of 1836 in Washington D.C. destroyed thousands of patent records and models, leading to a significant loss of valuable intellectual property. The cause of the fire was never definitively determined, but it highlighted the need for better fire prevention measures and the importance of protecting intellectual property.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Vichy France",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708215621/platos-peach-video/Vichy_France_dicpzo.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1940-06-22",
        endDate: "1945-08-08",
        category: ["european history"],
        meta: "Vichy France was the collaborationist government established in 1940 during World War II in the unoccupied zone of France. Led by Marshal Philippe Pétain, it cooperated with Nazi Germany and enacted anti-Semitic laws. Vichy France was dissolved after the liberation of France in 1944.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Where in the World is Estonia",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708216066/platos-peach-video/Where_in_the_World_is_Estonia_qtjkeq.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1991-08-20",
        endDate: "Present",
        category: ["geography"],
        meta: "Estonia is a small country located in Northern Europe, bordered by Latvia, Russia, and the Baltic Sea. Known for its advanced digital infrastructure and stunning natural landscapes, Estonia has a rich history dating back to medieval times. The capital city, Tallinn, is famous for its well-preserved Old Town and vibrant cultural scene.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Where in the World is Japan",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708216065/platos-peach-video/Where_in_the_World_is_Japan_maelxw.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-600",
        endDate: "Present",
        category: ["geography"],
        meta: "Japan is an island nation located in East Asia, consisting of four main islands: Honshu, Hokkaido, Kyushu, and Shikoku. It is surrounded by the Pacific Ocean, Sea of Japan, and East China Sea. The country is mountainous, with over 70% of its land covered in forests and mountains, including the iconic Mount Fuji. Japan is also prone to earthquakes and tsunamis due to its location on the Pacific Ring of Fire.",
        creator: "116143759549242008910",
        public: true,
      },
      {
        _id: new ObjectId(),
        title: "Where in the World is Georgia",
        video:
          "https://res.cloudinary.com/drewpager/video/upload/v1708216113/platos-peach-video/Where_in_the_World_is_Georgia_lfihhj.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1991-04-09",
        endDate: "Present",
        category: ["geography"],
        meta: "Georgia is located at the crossroads of Eastern Europe and Western Asia, bordered by Russia to the north, Turkey and Armenia to the south, and Azerbaijan to the southeast. The country is characterized by rugged mountains, lush forests, and a subtropical coastline along the Black Sea. The capital city, Tbilisi, lies in the eastern part of the country.",
        creator: "116143759549242008910",
        public: true,
      },
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
