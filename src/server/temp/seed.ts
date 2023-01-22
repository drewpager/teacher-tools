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

    const lessons: Lesson[] = [
      {
        _id: new ObjectId(),
        title: "Charlemagne",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669519964/platos-peach-video/Charlemagne_dimo2d.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "0747-04-02",
        endDate: "0814-01-28",
        category: ["biography"],
        meta: "",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Leonardo da Vinci",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669547768/platos-peach-video/Leonardo_da_Vinci_odcb3u.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1452-04-15",
        endDate: "1519-05-02",
        category: ["biography"],
        meta: "Leonardo da Vinci was a celebrated painter and polymath during the Italian Renaissance. He conceptualized many useful—and some fanciful—inventions and created masterworks like The Last Supper, Mona Lisa and the Vitruvian Man. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Bloody Mary",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669515426/platos-peach-video/Bloody_Mary_m3eo2q.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1516-02-18",
        endDate: "1558-11-17",
        category: ["biography"],
        meta: "Bloody Mary was the nickname of Queen Mary I of England, who ruled from 1553 to 1558. She is known for her attempts to restore Roman Catholicism in England and her persecution of Protestants, earning her the nickname 'Bloody Mary.'",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Michelangelo",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669555453/platos-peach-video/Michelangelo_ueeaka.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1475-03-06",
        endDate: "1564-02-18",
        category: ["biography"],
        meta: "Michelangelo was born in 1475 and found his passion for art shortly thereafter, becoming most notable for his sculptures and paintings, but he was also a notable architect and a true renaissance man.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Mayflower Compact",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669705985/platos-peach-video/The_Mayflower_Compact_jx31ie.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1620-11-11",
        endDate: "1620-11-11",
        category: ["american history", " colonial"],
        meta: "The Mayflower Compact was a governing document created by the Mayflower passengers and Pilgrims once their contract with the Virginia Company was believed to be nullified. It was signed on November 11th, 1620, the day the Mayflower made landfall.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Galileo",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669530482/platos-peach-video/Galileo_csadba.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1564-02-15",
        endDate: "1642-01-08",
        category: ["biography"],
        meta: "Galileo Galilei was a mathematician, physicist and early cosmologist who discovered the moons of Jupiter, details of Earth's moon and more. Galileo's belief in a heliocentric solar system placed him at odds with the earth-centric Catholic Church, who in turn placed him under house arrest for the remainder of his life.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "John Locke",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669543386/platos-peach-video/John_Locke_hsnk7w.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1632-08-29",
        endDate: "1704-11-28",
        category: ["european history", " world history"],
        meta: "John Locke was an Enlightenment thinker, writer and educator, whose work and life have had important and lasting impacts on human governance, curriculums and philosophy.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Johann Sebastian Bach",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669542698/platos-peach-video/Johann_Sebastian_Bach_mefuey.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1685-03-31",
        endDate: "1750-07-28",
        category: ["biography"],
        meta: "Johann Sebastian Bach was born into a family of musicians, but after suffering the death of both parents, Bach was taken in by his organist brother, where Bach would hone his skills as a musician and composer. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Boston Massacre",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669597948/platos-peach-video/The_Boston_Massacre_o55b3f.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1770-03-05",
        endDate: "1770-03-05",
        category: ["american history", " revolution & independence"],
        meta: "Tensions between the British and colonialists had escalated to the Boston Massacre on March 5th, 1770, when redcoats shot five colonialists dead and wounded six more.   ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Boston Tea Party",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669516312/platos-peach-video/Boston_Tea_Party_ozubu7.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1773-12-16",
        endDate: "1773-12-16",
        category: ["american history", " revolution & independence"],
        meta: "After Britain levied a tax on imports of tea into the US colonies, Americans protested with the Boston Tea Party where 45 tons of tea was dumped into Boston Harbor over three hours.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Paul Revere's Midnight Ride",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669566026/platos-peach-video/Paul_Revere_s_Midnight_Ride_g4vbqa.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1775-04-18",
        endDate: "1775-04-18",
        category: ["american history", " revolution & independence"],
        meta: "On April 18th, 1775, Paul Revere and William Dawes were dispatched to spread the news of a British order to seize the patriot's military supplies, the final spark that lit the revolutionary war.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battles of Lexington & Concord",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669594246/platos-peach-video/The_Battles_of_Lexington_Concord_map4fy.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1775-04-19",
        endDate: "1775-04-19",
        category: ["military history", " american revolutionary war"],
        meta: "The battles of Lexington and Concord are recognized as the first military engagement of the Revolutionary War as the Redcoats attempted to seize the Patriot's military supplies, the shot heard 'round the world changed the trajectory of American History.   ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Bunker Hill",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669586468/platos-peach-video/The_Battle_of_Bunker_Hill_tdcwhg.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1775-06-17",
        endDate: "1775-06-17",
        category: ["military history", " american revolutionary war"],
        meta: "American revolutionary militiamen stood their ground on Breed's Hill against twice as many British redcoats in the Battle of Bunker Hill.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Princeton",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669591351/platos-peach-video/The_Battle_of_Princeton_uisbl6.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1777-01-03",
        endDate: "1777-01-03",
        category: ["military history", " american revolutionary war"],
        meta: "The Battle of Princeton displayed General George Washington's creativity in war, having strategically moved his men from the Assunpink Creek near Trenton to Princeton, where the patriots would regain control of New Jersey.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Saratoga",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669591642/platos-peach-video/The_Battle_of_Saratoga_wpsygr.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1777-09-19",
        endDate: "1777-09-19",
        category: ["military history", " american revolutionary war"],
        meta: "The Battle of Saratoga was the result of the British intent to control the Hudson River, a crucial supply line for the Continental Army. Fought between September 19th and October 17th, 1777, the U.S. would win the battle--a major turning point in the Revolutionary War.  ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Mutiny of the Pennsylvania Line",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669557739/platos-peach-video/Mutiny_of_the_Pennsylvania_Line_rgyqbn.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1904-11-15",
        endDate: "1781-01-08",
        category: ["american history", " revolution & independence"],
        meta: "Considered the most successful insurrection of the Revolutionary War, on January 1st, 1781 continental soldiers prepared to depart the camp without permission, complaining of low pay, horrendous living conditions and a mass insistence that their three-year enlistment terms had expired.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Cowpens",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669586932/platos-peach-video/The_Battle_of_Cowpens_wnhw4l.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1781-01-17",
        endDate: "1781-01-17",
        category: ["military history", " american revolutionary war"],
        meta: "Following American defeats at Charleston and Camden, the Battle of Cowpens served as a morale-boosting victory for the American Patriots during the Revolutionary War. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of the Chesapeake",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669592760/platos-peach-video/The_Battle_of_the_Chesapeake_f7s8pd.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1781-09-05",
        endDate: "1781-09-05",
        category: ["military history", " american revolutionary war"],
        meta: "As British and Franco-American forces vied for control of the Chesapeake as a deep water port, the battle of the Chesapeake took place on September 5th, 1781, proving to be a decisive win for the American cause.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Yorktown",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669593998/platos-peach-video/The_Battle_of_Yorktown_kdpqw4.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1781-09-28",
        endDate: "1781-09-28",
        category: ["military history", " american revolutionary war"],
        meta: "When allied French reinforcements were delayed, George Washington created the illusion of a large soldier encampment, bluffing the British. In the Battle of Yorktown, Alexander Hamilton led a charge with only bayonets and hand-to-hand combat, ending with Cornwallis' surrender. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Treaty of Paris",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669730600/platos-peach-video/The_Treaty_of_Paris_syor4a.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1783-09-03",
        endDate: "1783-09-03",
        category: ["american history", " revolution & independence"],
        meta: "After eight years of Revolutionary War, the Treaty of Paris was signed in 1783 recognizing the United States as an independent nation. John Adams, Ben Franklin, and John Jay were key American signatories of the treaty.  ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Native American Governance and the U.S. Constitution",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669558755/platos-peach-video/Native_American_Governance_and_the_U.S._Constitution_ty0s9t.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1787-05-14",
        endDate: "1787-09-17",
        category: ["american history", " native american history"],
        meta: "",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Robespierre",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669570483/platos-peach-video/Robespierre_q0rkvb.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1758-05-06",
        endDate: "1794-07-28",
        category: ["european history", " world history"],
        meta: "Maximilien Robespierre was a controversial French statesman and leading figure in the French Revolution, forming a commoner army and was ultimately overthrown in a coup d'état before execution by guillotine.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Fallen Timbers",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669587151/platos-peach-video/The_Battle_of_Fallen_Timbers_keobov.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1794-08-20",
        endDate: "1794-08-20",
        category: ["american history", " early republic"],
        meta: "After the Revolutionary War, aggression against American settlers resulted in the Battle of Fallen Timbers on August 20, 1794, which ended in another crushing defeat for Native Americans.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Catherine The Great",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669519464/platos-peach-video/Catherine_The_Great_hzv1t5.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1729-05-02",
        endDate: "1796-11-17",
        category: ["biography"],
        meta: "Conspiring with political opponents to assassinate her husband, Tsar Peter III, Catherine the Great became the longest female Russian Ruler.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Patrick Henry",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669565786/platos-peach-video/Patrick_Henry_wsrc3i.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1736-05-29",
        endDate: "1799-06-06",
        category: ["biography"],
        meta: "Patrick Henry studied law and quickly tried cases involving Great Britain, which drove Henry to become a vocal revolutionary. Henry delivered impassioned speeches that influenced Washington, Jefferson, and other signatories of the impending Declaration of Independence. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The American Election of 1800",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669582505/platos-peach-video/The_American_Election_of_1800_du88za.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1800-10-31",
        endDate: "1801-03-04",
        category: ["american history", " early republic"],
        meta: "",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Benedict Arnold",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669513219/platos-peach-video/Benedict_Arnold_bxpi7w.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1741-01-14",
        endDate: "1801-06-14",
        category: ["american history", " revolution & independence"],
        meta: "Benedict Arnold was a heroic Patriot during the Revolutionary War but felt unappreciated and overlooked for his contributions, leading him to negotiate treason with the British in exchange for money and power.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Louisiana Purchase",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669703826/platos-peach-video/The_Louisiana_Purchase_w2vdrp.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1803-04-30",
        endDate: "1803-04-30",
        category: ["american history", " early republic"],
        meta: "French territory in early 19th Century America was ideal for US expansion when the Louisiana Purchase was negotiated for $15 million or $0.03 per acre as Napoleon forced France into financial distress during the Napoleonic Wars. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Tippecanoe",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669593249/platos-peach-video/The_Battle_of_Tippecanoe_degmcc.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1811-11-06",
        endDate: "1811-11-07",
        category: ["military history", " american indian war"],
        meta: "The Battle of Tippecanoe was fought in Indiana in 1811, in which US forces led by William Henry Harrison defeated Tecumseh's confederation of Native American tribes. It was a significant victory for the US, and helped pave the way for Harrison's later presidency.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of the Thames",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669593007/platos-peach-video/The_Battle_of_the_Thames_ytgujn.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1813-10-04",
        endDate: "1813-10-05",
        category: ["military history", " war of 1812"],
        meta: "After losing Fort Detroit and the Great Lakes Region to an alliance of British forces and Native American tribes, future president William Henry Harrison led a ruthless offensive against half-starved soldiers and leading to the death of Tecumseh.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The War of 1812",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669734451/platos-peach-video/The_War_of_1812_e6rn64.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1812-06-18",
        endDate: "1815-02-18",
        category: ["military history", " war of 1812"],
        meta: "After trading blockades and service impressment, President Madison declared war in 1812, which constituted the second war between Britain and the US, both fought on American soil.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Thomas Jefferson",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669738185/platos-peach-video/Thomas_Jefferson_ay7sfi.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1743-04-13",
        endDate: "1826-07-04",
        category: ["biography"],
        meta: "Educated as a lawyer, Thomas Jefferson would soon enter the political arena. A delegate to the Continental Congress, Jefferson wrote the first draft of the Declaration of Independence at 33 years of age. He would go on to serve as Vice President and President of the United States.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Ludwig van Beethoven",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669549280/platos-peach-video/Ludwig_van_Beethoven_y4keuq.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1770-12-01",
        endDate: "1827-03-26",
        category: ["biography"],
        meta: "Ludwig van Beethoven was born in 1770 Germany and raised to be a musician by his father and teachers including Haydn. His eventual deafness forced his later compositions to be created from musical memory, unable to physically hear the notes.  ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Marquis de Lafayette",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669552472/platos-peach-video/Marquis_de_Lafayette_hdcvkt.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1757-09-06",
        endDate: "1834-05-20",
        category: ["biography"],
        meta: "Marquis De Lafayette was a young and wealthy heir that joined the Continental Army during the American Revolutionary war and then rejoined the French Army in 1781 leading to the July Revolution of 1830.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Bear Flag Revolt",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669594789/platos-peach-video/The_Bear_Flag_Revolt_d3mrd8.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1846-06-01",
        endDate: "1846-07-01",
        category: ["american history", " westward expansion"],
        meta: "As manifest destiny pushed the American sense of entitlement further west, John Fremont entered California inspired by the Republic of Texas and seized an opportunity in Sonoma County, leading to the Bear Flag Revolt of 1845.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Karl Marx and the Communist Manifesto",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669545365/platos-peach-video/Karl_Marx_and_the_Communist_Manifesto_eejdvv.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1848-02-21",
        endDate: "1848-02-21",
        category: ["biography"],
        meta: "Karl Marx and Friedrich Engels were ideological refugees in 19th century Europe and co-authors of the Communist Manifesto, where they advocated for the end of capitalism. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Kansas-Nebraska Act",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669698930/platos-peach-video/The_Kansas-Nebraska_Act_mvinx5.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1854-05-30",
        endDate: "1854-05-30",
        category: ["american history", " abolition"],
        meta: "",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The First Battle of Bull Run",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669613028/platos-peach-video/The_First_Battle_of_Bull_Run_d51nrg.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1861-07-21",
        endDate: "1861-07-21",
        category: ["military history", " american civil war"],
        meta: "Early Union Army victories gave Abraham Lincoln the confidence to order a strike on Confederate troops in the first battle of bull run with the intent of clearing defensive positions of Richmond, the Confederate capital.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Capture of New Orleans",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669599610/platos-peach-video/The_Capture_of_New_Orleans_ob7xvq.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1862-04-24",
        endDate: "1862-04-29",
        category: ["military history", " american civil war"],
        meta: "",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Antietam",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669585602/platos-peach-video/The_Battle_of_Antietam_yme9cn.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1862-09-17",
        endDate: "1862-09-17",
        category: ["military history", " american civil war"],
        meta: "On the bloodiest day of the American Civil War, the Battle of Antietam was fought near Sharpsburg, Maryland on September 17th, 1862, when the Union Army faced a Confederate offensive into the north. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Fredericksburg",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669587782/platos-peach-video/The_Battle_of_Fredericksburg_mpqvss.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1862-12-11",
        endDate: "1862-12-11",
        category: ["military history", " american civil war"],
        meta: "The Battle of Fredericksburg occurred between December 11th and December 15th, 1862 resulting in victory for the Confederate Army, dealing a painful blow to President Lincoln and the Union Army.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Gettysburg",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669588488/platos-peach-video/The_Battle_of_Gettysburg_pg8wjr.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1863-07-01",
        endDate: "1863-07-03",
        category: ["military history", " american civil war"],
        meta: "After Robert E. Lee ordered his Confederate Army to attack the North's Union Army, the Battle of Gettysburg was a multiple-day conflict and turning point event in the Civil War.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The New York City Draft Riots of 1863",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669711238/platos-peach-video/The_New_York_City_Draft_Riots_of_1863_ajetkm.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1863-07-11",
        endDate: "1863-07-16",
        category: ["world history"],
        meta: "Remaining the most lethal and destructive riot in American history, the New York City Draft Riots of 1863 started with opposition to Lincoln's draft and morphed into a race war.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Fort Pillow",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669587380/platos-peach-video/The_Battle_of_Fort_Pillow_ca4vur.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1864-04-12",
        endDate: "1864-04-12",
        category: ["military history", " american civil war"],
        meta: "On April 12th, 1864, the Battle of Fort Pillow found Union defenses greatly outnumbered by Confederate forces. Upon surrender, the mostly African American Union soldiers were gunned down after being refused POW status.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Atlanta",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669586042/platos-peach-video/The_Battle_of_Atlanta_bxe2h0.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1864-07-22",
        endDate: "1864-07-22",
        category: ["military history", " american civil war"],
        meta: "In the spring of 1864, General Ulysses S. Grant ordered five simultaneous offensives into the South, vying for the South's largest industrial, logistical, and administrative center outside of Richmond, the Battle of Atlanta.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Appomattox Court House",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669585817/platos-peach-video/The_Battle_of_Appomattox_Court_House_amscg8.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1865-04-08",
        endDate: "1865-04-09",
        category: ["military history", " american civil war"],
        meta: "The Battle of Appomattox Court House and the subsequent decision would bring an end to the Civil War as Lee's confederate troops dwindled down enough to force surrender to Grant and the Union Army. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Impeachment of Andrew Johnson",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669696141/platos-peach-video/The_Impeachment_of_Andrew_Johnson_ot7hun.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1868-02-24",
        endDate: "1868-02-24",
        category: ["american history", " reconstruction"],
        meta: "The impeachment of Andrew Johnson was caused by the ideological differences between Congress and the president during the post-civil war reconstruction era. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "James Buchanan",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669540403/platos-peach-video/James_Buchanan_mbnznd.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1791-04-23",
        endDate: "1868-06-01",
        category: ["biography"],
        meta: "James Buchanan was a lawyer by training but a lifelong politician, ultimately becoming U.S. president in 1856 where he would face the rising tension over slavery in America, building towards the Civil War.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Opelousas Massacre",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669712655/platos-peach-video/The_Opelousas_Massacre_expbzm.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1868-09-13",
        endDate: "1868-10-12",
        category: ["american history", " civil rights movement"],
        meta: "The Opelousas Massacre was a politically-charged racist attack on Black residents and republicans in Louisiana in 1868, resulting in the deaths of more than 250 people, mostly African Americans.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Magician of San Francisco",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669704424/platos-peach-video/The_Magician_of_San_Francisco_qbto0r.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1826-01-12",
        endDate: "1875-08-27",
        category: ["american history", " westward expansion"],
        meta: "Nicknamed the magician of San Francisco, William Chapman Ralston made and ultimately lost immense fortunes before his untimely and controversial death.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Chinese Exclusion Act",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669599883/platos-peach-video/The_Chinese_Exclusion_Act_cwfsd7.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1882-05-06",
        endDate: "1882-05-06",
        category: ["american history", " westward expansion"],
        meta: "After a series of events including war, floods, droughts and crop failures drove tens of thousands of Chinese immigrants to San Francisco, The Chinese Exclusion Act of 1882 suspended Chinese immigration for a ten-year period.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Haymarket Riot",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669686685/platos-peach-video/The_Haymarket_Riot_fv6o1z.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1886-05-04",
        endDate: "1886-05-04",
        category: ["american history", " industrial revolution"],
        meta: "As protests of wage and working conditions by industrial workers were violently denied by Police, a retaliation rally was organized at Haymarket Square, which soon escalated into a deadly riot.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Johnstown Flood of 1889",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669698712/platos-peach-video/The_Johnstown_Flood_of_1889_aqaweg.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1889-05-31",
        endDate: "1889-05-31",
        category: ["world history"],
        meta: "Johnstown flood of 1889, when a poorly-maintained damn gave way, sending a 21-foot-tall wall of water through downtown Johnstown Pennsylvania.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Boxer Rebellion",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669598216/platos-peach-video/The_Boxer_Rebellion_jkmyat.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1899-11-02",
        endDate: "1901-09-07",
        category: ["world history", " china"],
        meta: "Blaming foreign oppressors in the west as the cause of famine, floods and poverty, the Boxer Rebellion was a secret movement to attack foreigners and Christian converts during China's Qing Dynasty in 1899.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Calamity Jane",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669517776/platos-peach-video/Calamity_Jane_htq3y1.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1852-05-01",
        endDate: "1903-08-01",
        category: ["biography"],
        meta: "Calamity Jane was known as a frontierswoman, sharpshooter and lurid storyteller, but also a raging alcoholic and intermittent prostitute. Jane was a storyteller in Buffalo Bill's Wild West Show and appeared in the Pan-American Exposition in Buffalo, New York. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The General Slocum Disaster of 1904",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669679757/platos-peach-video/The_General_Slocum_Disaster_of_1904_ifrmeb.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1904-06-15",
        endDate: "1904-06-15",
        category: ["world history"],
        meta: "General Slocum disaster of 1904, when a New York City-based excursion paddle wheeler caught fire shortly after the ship departed for a church outing to Long Island Sound.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Geronimo",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669532490/platos-peach-video/Geronimo_n9mpvk.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1929-06-16",
        endDate: "1909-02-17",
        category: ["american history", " american indian wars"],
        meta: "Geronimo was a Native American hunter and warrior from the Bendonkohe/Apache Chiricahua tribe, who used the murder of his wife and three children to devote himself to avenging usurpers of ancestral lands.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The New England Heatwave of 1911",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669710968/platos-peach-video/The_New_England_Heatwave_of_1911_uoalts.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1911-07-04",
        endDate: "1911-07-15",
        category: ["world history"],
        meta: "In 1911, Americans from Pennsylvania to Maine sweltered under 11 days of a crippling heatwave, long before the advent of air conditioning during New England's record-breaking heatwave.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Clara Barton",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669521558/platos-peach-video/Clara_Barton_qchawn.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1821-12-25",
        endDate: "1912-04-12",
        category: ["biography"],
        meta: "Clara Barton was a self-taught nurse who got on-site training during the Civil War, where she tended to the wounded on active battlefields. Barton would successfully start the American Red Cross and Ambulance First Responders. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Stealing Mona Lisa",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669576735/platos-peach-video/Stealing_Mona_Lisa_hufke9.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1911-08-21",
        endDate: "1913-12-15",
        category: ["world history"],
        meta: "The Mona Lisa was stolen from the Louvre Museum in 1911, where the painting hung in relative obscurity in a backwater wing of the museum. Picasso was accused, Napoleon was accused, but Vincenzo Perugia was caught for stealing the mona lisa.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Tannenberg",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669592301/platos-peach-video/The_Battle_of_Tannenberg_v3lnhk.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1914-08-26",
        endDate: "1914-08-30",
        category: ["military history", " world war one"],
        meta: "The Battle of Tannenberg was one of the earliest battles of WWI between German and Russian forces. Russians attempted to outflank the Germans but endured three days of punishing assaults before retreating into a victory for Germany.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The First Battle of the Marne",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669614075/platos-peach-video/The_First_Battle_of_the_Marne_wumvlf.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1914-09-06",
        endDate: "1914-09-12",
        category: ["military history", " world war one"],
        meta: "The First Battle of the Marne escalated World War I as the German advance on Paris forced French and British forces to defend the French capital, leading to an early allied victory against German aggression. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Christmas Truce of 1914",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669600327/platos-peach-video/The_Christmas_Truce_of_1914_rrviz3.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1914-12-24",
        endDate: "1914-12-25",
        category: ["military history", " world war one"],
        meta: "In spite of WWI leaders' denial of the Pope's plea for a Christmas ceasefire, frontline soldiers along both sides of the western front decided on a Christmas Truce and met halfway in no man's land, exchanging cigarettes, haircuts and even a soccer match.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Sinking of the Lusitania",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669724729/platos-peach-video/The_Sinking_of_the_Lusitania_e3uihz.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1915-05-07",
        endDate: "1915-05-07",
        category: ["military history", " world war one"],
        meta: "The Lusitania was sunk in 1915 when a Germany U-boat torpedoed the passenger liner off the coast of Ireland, taking the lives of 1,200 innocent passengers.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Booker T. Washington",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669516023/platos-peach-video/Booker_T._Washington_ab9nap.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1856-04-05",
        endDate: "1915-11-14",
        category: ["biography"],
        meta: "Booker T Washington was born a slave but fled north after the Civil War, where he was educated in the all-black Hampton Institute. Washington went on to principal the Tuskegee Institute, publish five books and deliver powerful speeches on race.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Gallipoli",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669588134/platos-peach-video/The_Battle_of_Gallipoli_nbp25a.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1915-02-19",
        endDate: "1916-01-09",
        category: ["military history", " world war one"],
        meta: "In the nearly eleven-month Battle of Gallipoli, some 480,000 Allied troops fought, witnessing 250,000 casualties, including 46,000 deaths, making it one of the bloodiest campaigns of World War One.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Ernest Shackleton Survives the South Pole",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669527243/platos-peach-video/Ernest_Shackleton_Survives_the_South_Pole_argzyv.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1914-08-08",
        endDate: "1916-08-30",
        category: ["biography"],
        meta: "In a South Pole expedition, Ernest Shackleton captained the HMS Endurance until it was trapped in the ice, causing her crew to survive for 20 months in Antarctica.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Great Boston Molasses Flood of 1919",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669682088/platos-peach-video/The_Great_Boston_Molasses_Flood_of_1919_friwy7.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1919-01-15",
        endDate: "1919-01-15",
        category: ["world history"],
        meta: "The Great Boston molasses flood of 1919 where warm molasses mixed with cold and caused its container to break and take the lives of 21 people.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Rosewood Massacre",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669720671/platos-peach-video/The_Rosewood_Massacre_tnthmy.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1923-01-01",
        endDate: "1923-01-01",
        category: ["american history", " civil rights movement"],
        meta: "The Rosewood Massacre occurred after allegations that a black man had assaulted a white woman, resulting in KKK members and other white haters taking violent and murderous action against black citizens of Rosewood, Florida.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Pancho Villa",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669562695/platos-peach-video/Pancho_Villa_sotphu.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1878-06-05",
        endDate: "1923-07-20",
        category: ["biography"],
        meta: "Pancho Villa was a Mexican fugitive turned revolutionary and politician, elected Governor of Chihuahua in 1913. After a failed coup attempt and angered by U.S. support for his opponent, Pancho Villa raided Columbus, New Mexico. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Woodrow Wilson's Racist Policies",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669744590/platos-peach-video/Woodrow_Wilson_s_Racist_Policies_xzzxer.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1856-12-28",
        endDate: "1924-02-03",
        category: ["american history", " progressive era"],
        meta: "Woodrow Wilson was lauded for his leadership during WWI but his views on race, slavery and segregation halted progress toward racial equality during the early 20th century and would tarnish his legacy.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Thomas Edison",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669737826/platos-peach-video/Thomas_Edison_b6jflr.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1847-02-11",
        endDate: "1931-10-18",
        category: ["biography"],
        meta: "Thomas Edison began his long career as an inventor to resolve his own hearing impairment, filing more than 1,000 patents on innumerable inventions. Edison continued to work into his 80s until his death at age 84.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Prohibition in America",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669568566/platos-peach-video/Prohibition_in_America_vgghqc.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1920-01-17",
        endDate: "1933-12-05",
        category: ["american history", "  roaring twenties"],
        meta: "Since the first Europeans landed on Plymouth Rock, alcohol has been a centerpiece in American culture. In response to the negative side effects of alcohol, the prohibition era outlawed the production and consumption of alcohol, ushering in a period of organized crime and illegal consumption.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Lawrence of Arabia",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669547048/platos-peach-video/Lawrence_of_Arabia_vmxsbg.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1888-08-16",
        endDate: "1935-05-19",
        category: ["biography"],
        meta: "Thomas Edward Lawrence, known popularly as Lawrence of Arabia, was a British intelligence officer during the Arab Revolt of WWI. Lawrence would contribute many valuable intelligence reports leading to his promotion to Major and would go on to re-enlist in the RAF under a pseudonym.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The History of Guillotines",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669689037/platos-peach-video/The_History_of_Guillotines_fpg6ne.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1792-04-25",
        endDate: "1939-06-17",
        category: ["world history"],
        meta: "Inspired by middle age beheading devices, the Guillotine became a common fixture in the wake of the French Revolution, severing the heads of thousands, including King Louis the 16th and Marie Antoinette.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "R-Day",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669676681/platos-peach-video/R-Day_neijta.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1940-10-16",
        endDate: "1940-10-16",
        category: ["military history", " world war two"],
        meta: "",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Battle of Britain",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669512712/platos-peach-video/Battle_of_Britain_pbpoix.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1940-07-10",
        endDate: "1940-10-31",
        category: ["military history", " world war two"],
        meta: "The nearly four-month-long attack on Britain by the German Luftwaffe cost the lives of more than 20,000 people and wounded a nearly equal amount.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Caligula",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669518357/platos-peach-video/Caligula_n8daca.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "2012-08-31",
        endDate: "1941-01-24",
        category: ["ancient history", " rome"],
        meta: "Caligula was a Roman emperor who was the victim of an unknown illness that resulted in erratic, impulsive and sadistic behavior. Caligula's excesses and draining of the treasury would result in a conspiracy among senators to assassinate the mentally ill emperor.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "George Washington Carver",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669531756/platos-peach-video/George_Washington_Carver_frhk7f.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1905-02-06",
        endDate: "1942-01-05",
        category: ["biography"],
        meta: "George Washington Carver was born into slavery but became the first Black man to earn a Bachelor of Science degree before pursuing a Masters degree. Carver invented crop rotation and more than 300 products based on peanuts. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Midway",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669590591/platos-peach-video/The_Battle_of_Midway_ybgzha.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1942-06-04",
        endDate: "1942-06-07",
        category: ["military history", " world war two"],
        meta: "Turning the tide on Japan's expansionist ambitions in the Pacific, the Battle of Midway would prove America's resolve and prowess in WWII.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "British Airmen Crash a Nazi Party",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669516784/platos-peach-video/British_Airmen_Crash_a_Nazi_Party_rsevyu.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1943-01-20",
        endDate: "1943-01-20",
        category: ["military history", " world war two"],
        meta: "The Royal Air Force's daylight raids of January 30, 1943, when they disrupted Germans in Berlin as they celebrated the tenth anniversary of Hitler's ascension to power.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Stalingrad",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669592093/platos-peach-video/The_Battle_of_Stalingrad_uoaxcc.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1942-07-17",
        endDate: "1943-02-02",
        category: ["military history", " world war two"],
        meta: "When Adolf Hitler set his sights on winning the Battle of Stalingrad, he proclaimed all male residents would be killed and women deported, prompting Joseph Stalin to order civilians to take up arms in defense of his namesake city. Historians argue that the Battle of Stalingrad was a significant turning point towards allied victory in WWII.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Guadalcanal",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669588698/platos-peach-video/The_Battle_of_Guadalcanal_d0fhis.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1942-08-07",
        endDate: "1943-02-09",
        category: ["military history", " world war two"],
        meta: "A decisive victory for the Allies, which turned the tide on the Japanese expansionism into the South Pacific. The Japanese finally surrendered on September 2nd, 1945.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Operation Market Garden",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669561396/platos-peach-video/Operation_Market_Garden_mfyrsc.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1944-09-17",
        endDate: "1944-09-25",
        category: ["military history", " world war two"],
        meta: "Towards the end of World War II, Operation Market Garden was an attempted allied invasion into the industrial heartland of Germany's Ruhr Valley. Anti-aircraft defenses, bad weather, communication difficulties and more would cause the operation to fail, possibly prolonging the war by six months.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of the Bulge",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669592551/platos-peach-video/The_Battle_of_the_Bulge_tvwocm.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1944-12-14",
        endDate: "1945-01-25",
        category: ["military history", " world war two"],
        meta: "One of the bloodiest and most decisive battles of World War Two was fought over six brutal weeks between December 1944 and January 1945.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Iwo Jima",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669589520/platos-peach-video/The_Battle_of_Iwo_Jima_ru7lfw.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1945-02-19",
        endDate: "1945-03-26",
        category: ["military history", " world war two"],
        meta: "The battle of Iwo Jima was an allied invasion of the island a mere 750 miles from mainland Japan, but secret fortifications left American troops overwhelmed by Japanese defenses. Despite heavy casualties, Americans finally captured both airfields and would hoist the American flag at the summit, captured in the iconic photograph.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Passing of FDR",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669715054/platos-peach-video/The_Passing_of_FDR_epznrt.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1945-04-12",
        endDate: "1945-04-12",
        category: ["american history", " world war two"],
        meta: "On April 12th, 1945, FDR suddenly complained of a terrific pain in the back of his head, collapsing moments later into an unconscious heap, the victim of a massive cerebral aneurysm.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "VE-Day",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669741560/platos-peach-video/VE-Day_ptoegq.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1945-05-08",
        endDate: "1945-05-08",
        category: ["military history", " world war two"],
        meta: "Even though the Allies remained at war with Japan, VE-Day was a massive celebration when Germany finally surrendered. 'Victory in Europe' Day of May 8, 1945.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Okinawa",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669590857/platos-peach-video/The_Battle_of_Okinawa_eaalso.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1945-04-01",
        endDate: "1945-06-22",
        category: ["military history", " world war two"],
        meta: "The Battle of Okinawa began on April 1st, 1945, as World War Two was approaching its end. Okinawa resulted in the death of 49,000 Americans and 150,000+ Japanese, including civilians.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Rosie the Riveter",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669571388/platos-peach-video/Rosie_the_Riveter_tnnm8a.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1941-12-08",
        endDate: "1945-09-02",
        category: ["american history", " world war two"],
        meta: "By 1943, as WWII dragged on, women filled the labor vacuum with 20 million women going to work outside the home. Many took up physically demanding and dangerous jobs as the ultimate form of patriotism.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Nuremberg Trials",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669712186/platos-peach-video/The_Nuremberg_Trials_jth0wr.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1945-11-20",
        endDate: "1946-10-01",
        category: ["military history", " world war two"],
        meta: "The Nuremberg Trials between 1945 and 1949 attempted to bring Nazi war criminals to justice, including the sentencing of lengthy prison terms and executions.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Truman Doctrine",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669731594/platos-peach-video/The_Truman_Doctrine_dr8mym.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1947-03-12",
        endDate: "1947-03-12",
        category: ["american history", " cold war era"],
        meta: "In an effort to halt communist expansion and aggression, the Truman Doctrine provided millions in aid to Turkey and Greece after Britain's war-torn economy could support them no longer. Truman's doctrine is arguably the starting point of the Cold War.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Kon-Tiki Expedition",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669699364/platos-peach-video/The_Kon-Tiki_Expedition_ws0uvz.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1947-04-28",
        endDate: "1947-08-07",
        category: ["world history"],
        meta: "Kon-Tiki Expedition of 1947 when Thor Heyerdahl embarked on a trans-Pacific passage on a balsa wood raft named 'Kon-Tiki,' sailing from South America to the Polynesian Islands.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Expensive Flight of the Spruce Goose",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669606198/platos-peach-video/The_Expensive_Flight_of_the_Spruce_Goose_bs76u9.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1942-11-13",
        endDate: "1947-11-01",
        category: ["world history"],
        meta: "Destined to fly only once, Howard Hughes would face scrutiny in Washington for the failed Spruce Goose plane, costing taxpayers $350 million in today's currency.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Mahatma Gandhi",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669550174/platos-peach-video/Mahatma_Gandhi_xlwzyx.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1869-10-02",
        endDate: "1948-01-30",
        category: ["world religions", " hinduism"],
        meta: "Mahatma Gandhi was a lawyer by profession, protestor by practice, and peaceful by nature. Gandhi left his mark on South Africa and his birth country, India, before being assassinated by a Hindu fanatic.  ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Marshall Plan",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669705393/platos-peach-video/The_Marshall_Plan_pykks3.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1947-12-19",
        endDate: "1948-04-03",
        category: ["american history", " world war two"],
        meta: "After WWII decimated Europe's infrastructure and supply chain, US Secretary of State George Marshall proposed his Marshall Plan to distribute $15 billion in aid to 16 European nations, signed by President Truman in April of 1948.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Berlin Airlift",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669595336/platos-peach-video/The_Berlin_Airlift_olhtxs.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1948-06-24",
        endDate: "1949-05-12",
        category: ["american history", " cold war era"],
        meta: "Between 1948 and 1949, the United States and Great Britain agreed to airlift millions of tons of supplies into West Berlin, after the Soviets cut off all land and sea access to the city",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Mann Gulch Fire of 1949",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669704953/platos-peach-video/The_Mann_Gulch_Fire_of_1949_b5e8wb.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1949-08-05",
        endDate: "1949-08-05",
        category: ["world history"],
        meta: "On August 5th, 1949, a grass fire erupted near Helena, Montana, prompting 15 smokejumpers to parachute into the wildfire. When the firefighters' escape plan was thwarted by the the fast-moving fire, of the three survivors, one survivor's quick thinking creat a firefighting technique still used to this day.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "William Randolph Hearst",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669743415/platos-peach-video/William_Randolph_Hearst_hm4q4m.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1863-04-29",
        endDate: "1951-08-14",
        category: ["biography"],
        meta: "William Randolph Hearst inherited the San Francisco Examiner newspaper from his father, ultimately growing his media empire to a national powerhouse through sensationalism and yellow journalism.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Joseph Stalin",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669544086/platos-peach-video/Joseph_Stalin_qpfk1u.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1878-12-18",
        endDate: "1953-03-05",
        category: ["biography"],
        meta: "Joseph Stalin was a youthful advocate of Marxism during the National Bolshevik Party's ascendance to power and became dictator of the Soviet Union in 1929. Stalin's reign of terror cost the lives of an estimated 20 million Russians.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Joseph McCarthy",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669543783/platos-peach-video/Joseph_McCarthy_pqj21t.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1908-11-14",
        endDate: "1957-05-02",
        category: ["american history", " cold war era"],
        meta: "Fiery senator Joseph McCarthy from Wisconsin who fueled the anti-communist Red Scare movement in the United States known as McCarthyism.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Billie Holiday",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669513858/platos-peach-video/Billie_Holiday_pev3gg.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1915-04-07",
        endDate: "1959-07-17",
        category: ["biography"],
        meta: "Billie Holiday, born in 1915, was a singer who rose from poverty and prostitution to become one of the most iconic and highest-paid jazz musicians of the 20th century.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The U-2 Spy Plane Incident",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669732857/platos-peach-video/The_U-2_Spy_Plane_Incident_i42nrm.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1960-05-01",
        endDate: "1960-05-01",
        category: ["american history", " cold war era"],
        meta: "the U2 spy plane incident of 1960 when Soviet missiles shot down an American spy plane as it made a high-altitude spy flight over Russian soil.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Ernest Hemingway",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669527001/platos-peach-video/Ernest_Hemingway_nlvviz.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1899-07-21",
        endDate: "1961-07-02",
        category: ["biography"],
        meta: "Ernest Hemingway was an American Pulitzer Prize-winning author who served in both World Wars, lived a life of adventure, and ultimately committed suicide in 1961.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Great English Train Robbery of 1963",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669682977/platos-peach-video/The_Great_English_Train_Robbery_of_1963_srbwan.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1963-08-08",
        endDate: "1963-08-08",
        category: ["world history"],
        meta: "The great English train robbery of 1963 when 13 brazen criminals stole away with 2.3 million Pounds Sterling. Robbers Charlie Wilson and Ronnie Biggs would continue their careers in deception.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Herbert Hoover",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669535234/platos-peach-video/Herbert_Hoover_we0r2v.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1874-08-10",
        endDate: "1964-10-20",
        category: ["biography"],
        meta: "Herbert Hoover became a multi-millionaire from his mining operations before dedicating his time to public service during WWI and his eventual ascension to the presidency in 1928. His election was poorly timed as the stock market crash and great depression soon followed.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Winston Churchill",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669744349/platos-peach-video/Winston_Churchill_ofelso.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1874-11-30",
        endDate: "1965-01-24",
        category: ["biography"],
        meta: "Winston Churchill saw action during his service in the British Army, which led him to publish a book chronicling his experiences. Entering politics in 1911, Churchill would ascend to Prime Minister in 1939, leading Britain through World War II. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Malcolm X",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669550617/platos-peach-video/Malcolm_X_yzyjch.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1925-05-19",
        endDate: "1965-02-21",
        category: ["american history", " civil rights movement"],
        meta: "Malcolm X, born Malcolm Little, was imprisoned at 21 for larceny and soon introduced to Islam where his violent views for achieving racial equality would form the basis for his eventual assassination.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Selma's Bloody Sunday",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669572892/platos-peach-video/Selma_s_Bloody_Sunday_at3l9y.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1965-03-07",
        endDate: "1965-03-07",
        category: ["american history", " civil rights movement"],
        meta: "On Sunday, March 7th, 1965, John Lewis, Martin Luther King Jr., and some 600 protestors marched toward Montgomery before being violently disbanded by police. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The First Successful Human Heart Transplant",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669677332/platos-peach-video/The_First_Successful_Human_Heart_Transplant_bh17bs.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1967-12-03",
        endDate: "1967-12-03",
        category: ["science & technology"],
        meta: "The first heart transplant in a human occurred on December 3rd, 1967. The six-hour surgery was performed by South African Christiaan Barnard and although the patient died 18 days later, it marks the first successful heart transplant in humans.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Orangeburg Massacre",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669713175/platos-peach-video/The_Orangeburg_Massacre_i8riom.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1968-02-08",
        endDate: "1968-02-08",
        category: ["american history", " civil rights movement"],
        meta: "The widely underreported Orangeburg Massacre caused by a South Carolina bowling alley owner who refused entry to blacks would result in three dead and many more injured by police.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "MLK's Final Speech",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669555934/platos-peach-video/MLK_s_Final_Speech_xzgvw8.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1968-04-03",
        endDate: "1968-04-03",
        category: ["american history", " civil rights movement"],
        meta: "Martin Luther King, Jr.'s final speech before an assassin murdered the civil rights legend at the Lorraine Hotel in Memphis, TN, on April 4th, 1968.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Khe Sanh",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669590087/platos-peach-video/The_Battle_of_Khe_Sanh_mmiwbm.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1968-01-21",
        endDate: "1968-07-09",
        category: ["military history", " vietnam war"],
        meta: "Considered a crucial position for operations, the U.S. base at Khe Sanh was fiercely defended when attacked in January of 1968. The 66-day siege saw the U.S. deliver 100,000 tons of bombs and 158,000 artillery rounds to North Vietnamese belligerents. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Cleveland's Burning River Sparks an Environmental Revolution",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669522117/platos-peach-video/Cleveland_s_Burning_River_Sparks_an_Environmental_Revolution_dwdgmv.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1969-06-22",
        endDate: "1969-06-22",
        category: ["geography"],
        meta: "In 1969, an industrial-era Cuyahoga River fire in Cleveland ignited environmental activism and ultimately the birth of the EPA and environmental policy act.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Great Postal Strike of 1970",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669684456/platos-peach-video/The_Great_Postal_Strike_of_1970_umnedk.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1970-03-17",
        endDate: "1970-03-25",
        category: ["american history", " american 1970s"],
        meta: "An ongoing refusal to increase USPS pay led to a boiling point when Congress proposed a 41% pay increase for themselves and a 5.4% increase for postal workers; resulting in the great postal strike of 1970, the largest walkout of federal employees in U.S. history.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Easter Offensive",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669605175/platos-peach-video/The_Easter_Offensive_snmv4r.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1972-03-30",
        endDate: "1972-10-22",
        category: ["military history", " vietnam war"],
        meta: "The Easter Offensive of 1972 came off the back of the unforeseen Tet Offensive of 1968 and again, Viet Cong forces attacked with unexpected ferocity and resistance.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Operation Babylift",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669560872/platos-peach-video/Operation_Babylift_olbnvs.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1975-04-03",
        endDate: "1975-04-26",
        category: ["military history", " vietnam war"],
        meta: "In 1975, South Vietnam was slowly collapsing to communist forces, prompting the US to evacuate orphans in the largest act of adoption in human history. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Gulf of Tonkin Resolution",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669533120/platos-peach-video/Gulf_of_Tonkin_Resolution_m5ncud.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1964-04-02",
        endDate: "1975-04-30",
        category: ["military history", " vietnam war"],
        meta: "The Gulf of Tonkin Resolution authorized US military intervention in Vietnam in 1964, following alleged attacks on US ships in the Gulf of Tonkin.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Mao Zedong",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669551270/platos-peach-video/Mao_Zedong_ofgyiz.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1893-12-26",
        endDate: "1976-09-09",
        category: ["biography"],
        meta: "Mao Zedong was the communist leader of the People's Republic of China from 1949 until his death in 1976. Mao's initiatives in land reform and social revolution led to the deadliest famine in recorded human history.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Great New York City Blackout of 1977",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669683993/platos-peach-video/The_Great_New_York_City_Blackout_of_1977_yivoda.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1977-07-13",
        endDate: "1977-07-13",
        category: ["world history"],
        meta: "The New York City Blackout of 1977, which triggered 24 hours of looting and rioting in 31 of the most impoverished neighborhoods within the five Burroughs that make up the NYC area.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Jesse Owens",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669541587/platos-peach-video/Jesse_Owens_t9uovk.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1913-09-12",
        endDate: "1980-03-31",
        category: ["biography"],
        meta: "Jesse Owens was a record-breaking track and field star who became the first African American athlete to sign a sponsorship deal and won four gold medals in the 1936 summer Olympics. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Mt. St. Helens Eruption",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669708644/platos-peach-video/The_Mt._St._Helens_Eruption_dbc91b.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1980-05-18",
        endDate: "1980-05-18",
        category: ["geography"],
        meta: "On May 18th, 1980, a 5.1 magnitude earthquake rocked the Mount St. Helens with a disconcerting punch. Within 10 seconds, the mountain erupted and accompanied the biggest landslide ever recorded.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Collapse of the Soviet Union",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669522647/platos-peach-video/Collapse_of_the_Soviet_Union_jkpxos.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1922-12-30",
        endDate: "1991-12-25",
        category: ["american history", " cold war era"],
        meta: "After the Cold War, the USSR was in a period of economic stagnation and reform towards free market capitalism which led to the loss of their baltic state territories and ultimately the collapse of the Soviet Union.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Cold War",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669601576/platos-peach-video/The_Cold_War_yljzv6.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1947-03-12",
        endDate: "1991-12-26",
        category: ["american history", " cold war era"],
        meta: "The Cold War was a 45-year period when the Soviet Union and the United States repeatedly faced the threat of mutually-assured nuclear annihilation including the Cuban Missile Crisis, the Bay of Pigs Invasion, and numerous proxy wars.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Thurgood Marshall",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669738706/platos-peach-video/Thurgood_Marshall_drps69.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1908-07-02",
        endDate: "1993-01-24",
        category: ["biography"],
        meta: "Thurgood Marshall was born in Baltimore in 1908, rejected by the University of Maryland School of law due to his race, the basis for a discrimination lawsuit he would eventually win, and went on to become a Supreme Court Justice. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Cesar Chavez",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669519743/platos-peach-video/Cesar_Chavez_cfluhe.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1927-03-31",
        endDate: "1993-04-23",
        category: ["biography"],
        meta: "After dropping out of the eighth grade to support his family during the Great Depression, Cesar Chavez became an activist for migrant farm workers improving wages, hours and living conditions.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Three Mile Island",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669738434/platos-peach-video/Three_Mile_Island_wt4m2x.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1979-03-28",
        endDate: "1993-08-11",
        category: ["american history", " american 1970s"],
        meta: "On March 28th, 1979, the pressure valve in the Unit Two reactor at Three Mile Island malfunctioned, beginning the meltdown process that was successfully remediated but not without panic and public perception turning against Nuclear's promise of clean energy. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Boxing Day Tsunami of 2004",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669598471/platos-peach-video/The_Boxing_Day_Tsunami_of_2004_assuol.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "2004-12-26",
        endDate: "2004-12-26",
        category: ["world history"],
        meta: "The 2004 tsunami on Boxing Day would prove to be the deadliest in recorded history, taking a staggering 230,000 lives after a 9.1 earthquake ripped through an undersea fault in the Indian Ocean.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Maurice Hilleman Predicts a Deadly Pandemic",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669553804/platos-peach-video/Maurice_Hilleman_Predicts_a_Deadly_Pandemic_hqnnj5.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1919-08-30",
        endDate: "2005-04-11",
        category: ["science & technology"],
        meta: "In 1957, after a lethal respiratory virus emerged out of Hong Kong, Maurice Hilleman studied the H2N2 strain and predicted a US pandemic. Despite his claims being ignored by government officials, pharmaceutical companies used Hilleman's work to create a vaccine that saved an estimated one million American lives.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Stonehenge",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669577423/platos-peach-video/Stonehenge_hydv5j.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-3,000",
        endDate: "-1,500",
        category: ["ancient history", " prehistory"],
        meta: "Stonehenge is located on the Salisbury Plain of southern England and was started more than 5,000 years ago using primitive tools and unknown methods for moving and erecting multi-ton, non-native stones. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Minoan Eruption of Thera",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669707703/platos-peach-video/The_Minoan_Eruption_of_Thera_feepjk.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-1,600",
        endDate: "-1,600",
        category: ["ancient history", " prehistory"],
        meta: "Although the exact date is debated, the Thera eruption shot magma 20-miles high, caused a tsunami, and devastated the Minoan civilization.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Nefertiti",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669559527/platos-peach-video/Nefertiti_u5rgna.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-1370",
        endDate: "-1330",
        category: ["ancient history", " egypt"],
        meta: "Nefertiti was the queen of Egypt from 1370 to 1330 BCE due to her marriage to Amenhotep IV. Her disappearance from the historical record during Amenhotep's reign has led to speculation of a co-regency in ancient Egypt.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Punic Wars",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669717319/platos-peach-video/The_Punic_Wars_q3shpy.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-264",
        endDate: "-146",
        category: ["military history", " punic wars"],
        meta: "Punic Wars: Rome's Carnage on Carthage and More - The Punic Wars, lasting between 264 and 164 B.C.E, were a series attacks on the Carthaginians by the growing Roman Empire, ultimately resulting in Rome's borders expanding significantly.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Ancient Civilization of Sparta",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669583411/platos-peach-video/The_Ancient_Civilization_of_Sparta_m5lmyj.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-900",
        endDate: "-192",
        category: ["ancient history", " greece"],
        meta: "The civilization of Sparta in ancient Greece was notorious for training their youth to become warriors, while enslaving prisoners to work for their benefit, at the same time giving women equal rights with free men.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Copper Age",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669602387/platos-peach-video/The_Copper_Age_lsxw6y.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-4500",
        endDate: "-2000",
        category: ["ancient history", " prehistory"],
        meta: "The 1,000-year-long Copper Age, wedged between the Neolithic and Bronze ages, was distinguished by the earliest uses of copper and gold for weapons, tools, jewelry, art and more.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Han Dynasty",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669533430/platos-peach-video/Han_Dynasty_qr8diw.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-202",
        endDate: "-220",
        category: ["ancient history", " china"],
        meta: "After the Qin Empire fell, Liu Bang became the first Han Dynasty emperor in 202 B.C. The Han Dynasty brought the birth of paper and advances in writing and art until it lost control in 220 A.D. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Great Pyramids of Giza",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669684946/platos-peach-video/The_Great_Pyramids_of_Giza_mmc9bc.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-2589",
        endDate: "-2566",
        category: ["ancient history", " egypt"],
        meta: "The great pyramids of Giza, near modern-day Cairo, Egypt, were built for Pharaoh Khufu with the belief that the king's body and supplies would ascend together into heaven.  ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Cleopatra",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669521922/platos-peach-video/Cleopatra_sxglb7.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-69",
        endDate: "-30",
        category: ["biography"],
        meta: "Cleopatra the 7th was known for her exotic beauty and powers of seduction during her three-decade reign over Egypt, despite repeated attempts to overthrow her rule.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Socrates",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669574823/platos-peach-video/Socrates_rrfw4z.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-470",
        endDate: "-399",
        category: ["ancient history", " greece"],
        meta: "Socrates was born and raised in the golden age of Athens, studying the writings of contemporary Greek philosophers. Leaving no written records himself, thankfully his students included Plato and historian Xenophon, who wrote down the Socratic Technique and more lessons from Socrates. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Acropolis",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669579577/platos-peach-video/The_Acropolis_llsbya.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-495",
        endDate: "-429",
        category: ["ancient history", " greece"],
        meta: "The Acropolis of Athens consists of four hills atop the Attica plateau and has been occupied for thousands of years, destroyed during times of war, and rebuilt during times of Greek prosperity. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Mesopotamia and the Fertile Crescent",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669555240/platos-peach-video/Mesopotamia_and_the_Fertile_Crescent_hfgirm.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-14000",
        endDate: "-539",
        category: ["ancient history", " mesopotamia"],
        meta: "Human life and civilization thrived for more than 6,000 years in the fertile crescent known as Mesopotamia, Greek for between two rivers. Agriculture, irrigation, livestock, the wheel, and alcohol are all believed to originate from Mesopotamia.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Iron Age",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669698262/platos-peach-video/The_Iron_Age_iok0j4.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-1,201",
        endDate: "-550",
        category: ["ancient history", " prehistory"],
        meta: "The Iron Age is argued by scholars to have started around 1200 BCE after shortages of copper and tin led to the forging of stronger metals, iron and carbon, into steel. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Ark of the Covenant",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669583868/platos-peach-video/The_Ark_of_the_Covenant_qgb8s2.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-970",
        endDate: "-587",
        category: ["world religions", " world history"],
        meta: "According to the Hebrew Bible, the Ark of the Covenant was constructed of gold and wood by Moses and the Israelites after they fled Egypt. The location of the Ark is unknown today, despite many theories of its location, making the Ark of the Covenant one of the most important missing artifacts in Judeo-Christian history.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Native Americans and the Buffalo",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669558981/platos-peach-video/Native_Americans_and_the_Buffalo_c7nilx.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-200000",
        endDate: "1884",
        category: ["american history", " native american history"],
        meta: "Between 1830 and 1885, European-Americans killed more than 40 million buffalo--an animal heavily depended upon by Native Americans for every aspect of their survival. An Army colonel once said to a guilt-ridden hunter, 'Kill every buffalo that you can. Every buffalo dead is an Indian gone.'",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Roman Emperor Nero",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669720172/platos-peach-video/The_Roman_Emperor_Nero_n0tud2.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "37-12-15",
        endDate: "68-06-09",
        category: ["ancient history", " rome"],
        meta: "Rising to power at age seventeen, Roman Emperor Nero soon witnessed his half brother, mother and wife mysteriously dying or blatantly murdered. Nero invented the Olympics but also spent the Roman empire into financial distress before committing suicide. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Basic Practices of Hinduism",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669585338/platos-peach-video/The_Basic_Practices_of_Hinduism_no1pvi.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-2300",
        endDate: "Present",
        category: ["world religions", " hinduism"],
        meta: "Third-largest and arguably the oldest world religion, hinduism embraces a main deity known as the Brahman, as well as practicing Karma, Dharma, and more.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Holy City of Jerusalem",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669694307/platos-peach-video/The_Holy_City_of_Jerusalem_dmvwhj.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-3500",
        endDate: "Present",
        category: ["geography"],
        meta: "Jerusalem is one of the oldest cities in the world, and one of the holiest sites for Judaism, Christianity and Islam. It was first settled around 3500 BCE during the Early Bronze Age and has since been the target of control by many.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Leap Day",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669547531/platos-peach-video/Leap_Day_mbfkyc.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-239",
        endDate: "Present",
        category: ["world history"],
        meta: "Astronomically speaking, Earth's orbit of the Sun takes precisely 365.2421 days — the extra quarter of a day per year necessitating a leap day in the Gregorian calendar every four years to avoid seasonal shift. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Satan",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669572651/platos-peach-video/Satan_hr9knk.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-550",
        endDate: "Present",
        category: ["world religions", " world history"],
        meta: "The existence of Satan—or the Devil—has been deeply embedded in religion, making an appearance in the Old Testament’s Book of Genesis in the form of a serpent whose temptation of Eve and later Adam, led to their expulsion from the Garden of Eden.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Hanukkah",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669533698/platos-peach-video/Hanukkah_q8opy9.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-166",
        endDate: "Present",
        category: ["world religions", " judaism"],
        meta: "Hanukkah, or the Festival of Lights, celebrates Judah's liberation of Judaism in Israel when there was only enough oil to light the menorah for one day, but it burned for eight.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Legend of Werewolves",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669700962/platos-peach-video/The_Legend_of_Werewolves_u3rias.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-2700",
        endDate: "Present",
        category: ["world history"],
        meta: "Scholars argue over the origins of the legend of werewolves, from The Epic of Gilgamesh to Nordic folklore, the belief in lycanthropy, or humans that shape-shift into a wolf, has been popular throughout history.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Mount Everest",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669556657/platos-peach-video/Mount_Everest_ktccwd.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-55,000,000",
        endDate: "Present",
        category: ["geography"],
        meta: "Mount Everest is the highest mountain above sea level at more than 29 thousand feet tall. Split by the border of China and Nepal, nearly 7,000 summits have been recorded with more than 300 deaths.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Seven Natural Wonders of the World",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669723325/platos-peach-video/The_Seven_Natural_Wonders_of_the_World_jhkwkf.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-100000000",
        endDate: "Present",
        category: ["geography"],
        meta: "The list of seven natural wonders of the world includes the tallest peak to the ocean floor, massive volcanoes and canyons formed by geologic history, meteorological phenomenon and more.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Rough Riders",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669720896/platos-peach-video/The_Rough_Riders_rtrxie.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1898-04-21",
        endDate: "1898-12-10",
        category: ["military history", " spanish-american war"],
        meta: "Teddy Roosevelt and the Rough Riders of the Spanish-American War. Of the three major engagements fought by Rough Riders, Battle of San Juan Hill was the crowning achievement.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Berlin Wall",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669595692/platos-peach-video/The_Berlin_Wall_l163vo.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1961-08-12",
        endDate: "1989-11-09",
        category: ["american history", " cold war era"],
        meta: "The 86-mile-long Berlin Wall was built by the Soviet Union after WWII, in response to mass defections by East Berliners into the non-communist zones of Berlin.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Trenton",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669593499/platos-peach-video/The_Battle_of_Trenton_iq1klm.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1776-12-26",
        endDate: "1776-12-26",
        category: ["military history", " american revolutionary war"],
        meta: "After back-to-back morale-deflating defeats, General George Washington inspired his Continental Army to cross the Delaware River to engage in the Battle of Trenton the day after Christmas, achieving a much-needed victory in the Revolutionary War.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "John Muir",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669543598/platos-peach-video/John_Muir_kaed8o.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1838-04-21",
        endDate: "1914-12-24",
        category: ["biography"],
        meta: "John Muir was a Scottish immigrant to America and a deeply religious man. After an early accident that nearly blinded him, Muir found his purpose in nature, becoming a well-regarded conservationist and author.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Spanish-American War",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669726001/platos-peach-video/The_Spanish-American_War_u4omga.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1898-04-21",
        endDate: "1898-12-10",
        category: ["military history", " spanish-american war"],
        meta: "Lasting just seven months and nineteen days in 1898, the Spanish-American War was fought mostly in the waters of the Caribbean around Cuba, but also in the Philippines. The Spanish-American War officially ended with the Treaty of Paris signed on December 10th, 1898.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Seven Wonders of the Ancient World",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669723513/platos-peach-video/The_Seven_Wonders_of_the_Ancient_World_pde3lm.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-435",
        endDate: "Present",
        category: ["geography"],
        meta: "The Seven Wonders of the ancient world are structures with evidence or documentation of early civilization's advanced and bewildering abilities for construction, during a technologically primitive time period. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Great Chicago Fire",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669682389/platos-peach-video/The_Great_Chicago_Fire_tbv7zi.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1871-10-08",
        endDate: "1871-10-10",
        category: ["world history"],
        meta: "The Great Chicago Fire broke out on October 8th, 1871, leaving some 100,000 Chicagoans homeless after the destruction of more than 17,000 structures. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Juanita Moody and the Cuban Missile Crisis",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669544400/platos-peach-video/Juanita_Moody_and_the_Cuban_Missile_Crisis_kj6xli.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1962-10-16",
        endDate: "1962-10-28",
        category: ["american history", " cold war era"],
        meta: "After the initial failure of America's intelligence community to uncover a Soviet nuclear arsenal on Cuba, Juanita Moody used her cryptanalysis training to report on and possibly thwart the escalating situation.  ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Oakland Firestorm of 1991",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669712407/platos-peach-video/The_Oakland_Firestorm_of_1991_mnj6ln.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1991-11-19",
        endDate: "1991-11-23",
        category: ["world history"],
        meta: "The Oakland Firestorm of 1991 burned down 2,843 single-family homes and 437 apartment and condominium units.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Operation Reunion",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669562287/platos-peach-video/Operation_Reunion_zuui4i.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1944-08-31",
        endDate: "1944-08-31",
        category: ["military history", " world war two"],
        meta: "Operation Reunion in late August 1944, when 1,162 captured Allied airmen were repatriated to their airbases. The repatriation spanned 4 days from August 31st to September 3rd.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Pony Express",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669715683/platos-peach-video/The_Pony_Express_yhrlhh.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1860-04-03",
        endDate: "1861-10-26",
        category: ["american history", " westward expansion"],
        meta: "For a brief 18-month period the Pony Express made it possible for mail to cross the country in 10 days instead of 8 weeks, the prior standard by ship.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Mayans",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669705699/platos-peach-video/The_Mayans_ww56e9.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-2600",
        endDate: "900",
        category: ["european history", " age of exploration"],
        meta: "The Mayans were a dominant civilization in Mesoamerica from 1800 BCE until they mysteriously vanished around 900 AD, leaving behind archeological ruins and societal impact that still reverberates today.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Second Battle of Bull Run",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669722669/platos-peach-video/The_Second_Battle_of_Bull_Run_tsusws.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1862-08-28",
        endDate: "1862-08-30",
        category: ["military history", " american civil war"],
        meta: "",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Gods of Anunnaki",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669681339/platos-peach-video/The_Gods_of_Anunnaki_wtjrd0.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-19000",
        endDate: "500",
        category: ["world religions", " world history"],
        meta: "The Anunnaki are a group of deities who appear in the mythological traditions of the ancient Sumerians, Akkadians, Assyrians and Babylonians.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Anatomy of Tornadoes",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669583164/platos-peach-video/The_Anatomy_of_Tornadoes_vcnjpn.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-5000000",
        endDate: "Present",
        category: ["science & technology"],
        meta: "Tornadoes, also known as twisters, are made up of a violently rotating column of air that makes contact with both Earth and a cumulus or cumulonimbus cloud. A tornado can take many forms and are common in the Central United States in springtime.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "W.E.B. Du Bois",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669742495/platos-peach-video/W.E.B._Du_Bois_gjikv6.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1868-02-23",
        endDate: "1963-08-27",
        category: ["biography"],
        meta: "William Edward Burghardt Du Bois, or W.E.B. for short, was educated at Fisk University, Harvard and the University of Berlin. Du Bois would publish many influential studies, essays and books on the subject of racism in America before he joined the communist party and moved to Ghana. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Mountain Meadows Massacre",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669708447/platos-peach-video/The_Mountain_Meadows_Massacre_doaxbj.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1857-09-07",
        endDate: "1857-09-07",
        category: ["american history", " westward expansion"],
        meta: "On September 11, 1857, John D. Lee under supposed orders from Brigham Young, ordered his fellow Mormons and Paiute Indians to execute 120 American pioneers heading west.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Tuberculosis",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669740141/platos-peach-video/Tuberculosis_c6aiik.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-9000",
        endDate: "Present",
        category: ["science & technology"],
        meta: "Still one of the leading causes of infectious death worldwide, the history of tuberculosis is staggering in it's consumptive death toll and human efforts to find a treatment.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Jacques Cousteau",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669540169/platos-peach-video/Jacques_Cousteau_kyp6nb.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1910-06-11",
        endDate: "1997-06-25",
        category: ["biography"],
        meta: "Jacques Cousteau was a deep-sea explorer, inventor, documentarian, author and environmental activist who led many famous expeditions and efforts to understand the ocean. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Helen Keller",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669534996/platos-peach-video/Helen_Keller_ogrl1w.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1880-06-27",
        endDate: "1968-06-01",
        category: ["biography"],
        meta: "Helen Keller lost her sight and hearing at 19 months of age, but despite these handicaps, learned to read and write, eventually graduating from Harvard and authoring fourteen books. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The History of Mirrors",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669691700/platos-peach-video/The_History_of_Mirrors_tmepup.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-6,200",
        endDate: "Present",
        category: ["world history"],
        meta: "One of the earliest human endeavors has been gazing at one's reflection and developing technology to do so more clearly. The history of mirrors dates back to polished obsidian in 5th century Turkey and beyond.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Korean War",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669699611/platos-peach-video/The_Korean_War_n0mik0.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1950-06-25",
        endDate: "1953-07-27",
        category: ["military history", " korean war"],
        meta: "Known as the forgotten war due to overshadowing caused by WWI, WWII and later Vietnam, the Korean War was a conflict against communist North Korea as they pushed through the 38th parallel into South Korea. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Potsdam Declaration",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669715940/platos-peach-video/The_Potsdam_Declaration_tguvfr.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1945-07-26",
        endDate: "1945-07-26",
        category: ["military history", " world war two"],
        meta: "Proving to be a calculated bluff to end World War Two, the Potsdam Declaration gave Japan an ultimatum for unconditional surrender or nuclear war.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Little Rock Nine",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669703382/platos-peach-video/The_Little_Rock_Nine_wh39sa.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1957-09-25",
        endDate: "1957-09-25",
        category: ["american history", " civil rights movement"],
        meta: "In the face of racial discrimination and bigotry, 9 African American teens stood up for their civil rights to attend Little Rock Central High, a historically whites-only school.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Houdini",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669538304/platos-peach-video/Houdini_go4vtv.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1874-03-24",
        endDate: "1926-10-31",
        category: ["biography"],
        meta: "Harry Houdini, born Erich Weisz, was a captivating performer who used his sheer physical strength and abilities to pick conventional locks to escape harrowing situations.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Halifax Disaster of 1917",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669685857/platos-peach-video/The_Halifax_Disaster_of_1917_qyritn.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1917-12-06",
        endDate: "1917-12-06",
        category: ["world history"],
        meta: "On December 6th, 1917, the Halifax explosion disaster destroyed structures in a half-mile radius after hundreds of tons of explosives ignited in a maritime collision.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Gettysburg Address",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669680250/platos-peach-video/The_Gettysburg_Address_yrlffy.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1863-11-18",
        endDate: "1863-11-18",
        category: ["american history", " civil war"],
        meta: "On November 19th, 1863, Abraham Lincoln delivered his Gettysburg Address at the dedication of the national cemetery. In less than 275 words, Lincoln eloquently spoke to a crowd of 15,000 people, but his words would go on to reverberate throughout American history.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The USS Indianapolis",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669733775/platos-peach-video/The_USS_Indianapolis_jfzhzz.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1945-07-30",
        endDate: "1945-07-30",
        category: ["military history", " world war two"],
        meta: "The USS Indianapolis successfully delivered the Uranium 235 needed in the atomic weapons used against Japan before Japanese submarines sank the vessel, ultimately leaving 317 of the nearly 1,200 men having survived 4-days of treachery at sea.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Hindenburg Disaster",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669686961/platos-peach-video/The_Hindenburg_Disaster_p6i1xw.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1937-05-06",
        endDate: "1937-05-06",
        category: ["world history"],
        meta: "The Hindenburg Disaster occurred while attempting to moor over Lakehurst, New Jersey. After flying from Germany, the largest airship ever built burst into flames and crashed to the ground, killing or injuring many passengers and ground crew.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Monroe Doctrine",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669708107/platos-peach-video/The_Monroe_Doctrine_cfvn5s.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1823-12-02",
        endDate: "1823-12-02",
        category: ["american history", " american imperialism"],
        meta: "With fears of European powers trying to colonize the western hemisphere yet again, The Monroe Doctrine declared the west off-limits to European interference, although US military enforcement would not be possible for years to come.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Assassination of Abraham Lincoln",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669584705/platos-peach-video/The_Assassination_of_Abraham_Lincoln_atzcwy.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1865-04-15",
        endDate: "1865-04-15",
        category: ["american history", " reconstruction"],
        meta: "The assassination of Abraham Lincoln, 16th US President who was assassinated by a group of Confederate sympathizers on April 14th, 1865, one week after the end of the Civil War.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Project Blue Book",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669568788/platos-peach-video/Project_Blue_Book_qadaqg.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1952-03-15",
        endDate: "1969-12-17",
        category: ["world history"],
        meta: "Project Blue Book was a secret military program to examine reports of UFOs and analyze their threat to national security. Ultimately, the Freedom of Information Act would reveal that while many UFO sightings had an explanation, hundreds were unexplainable.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Operation Overlord",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669561731/platos-peach-video/Operation_Overlord_iiz5tu.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1944-06-06",
        endDate: "1944-08-30",
        category: ["military history", " world war two"],
        meta: "Codenamed Operation Overlord but referred to as D-Day, the June 6 1944 invasion of Normandy would prove to be the largest seaborne invasion in history.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Yosemite",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669745849/platos-peach-video/Yosemite_jti5vu.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-100000000",
        endDate: "Present",
        category: ["geography"],
        meta: "Yosemite national park consists of 1,187 square miles in California, 95% of which is designated remote wilderness. Every year as many as five million visitors come to see a small sliver of Yosemite Valley.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Fiorello La Guardia",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669528166/platos-peach-video/Fiorello_La_Guardia_qpn8zx.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1882-12-11",
        endDate: "1947-09-20",
        category: ["american history", "  great depression"],
        meta: "",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "F. Scott Fitzgerald",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669527454/platos-peach-video/F._Scott_Fitzgerald_qd7dhw.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1896-09-24",
        endDate: "1940-12-21",
        category: ["american history", "  roaring twenties"],
        meta: "F. Scott Fitzgerald was an American writer who rose to popularity during the Roaring 20s. His marriage to Zelda Sayre would end because of his alcoholism and her schizophrenia before his early death at the age of 44.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Treaty of Versailles",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669730907/platos-peach-video/The_Treaty_of_Versailles_sovdhx.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1919-06-28",
        endDate: "1919-06-28",
        category: ["military history", " world war one"],
        meta: "In the wake of WWI, the Big Four western nations met at the Paris Peace Conference to discuss war reparations and sanctions against Germany. The Treaty of Versailles would drive Germans to extremism with the rise of Adolf Hitler.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Siege of Boston",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669724063/platos-peach-video/The_Siege_of_Boston_sqxasa.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1775-04-19",
        endDate: "1775-04-19",
        category: ["military history", " american revolutionary war"],
        meta: "The Siege of Boston was an early victory in the American Revolutionary War after self-government sentiment peaked in response to British Parliament's taxation.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Malaria",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669550353/platos-peach-video/Malaria_frnovm.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-2700",
        endDate: "Present",
        category: ["science & technology"],
        meta: "Malaria was one of the worst killers of mankind until its etiology was figured out by scientists in the 19th and 20th Centuries.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Napoleonic Wars",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669708955/platos-peach-video/The_Napoleonic_Wars_x3pzrq.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1803-05-18",
        endDate: "1815-11-20",
        category: ["military history", " napoleonic wars"],
        meta: "The Napoleonic Wars began within a year of Napoleon Bonaparte's rise to power in France, including attempted invasions of much of Europe before his eventual defeat in 1815.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Wilmot Proviso",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669743950/platos-peach-video/Wilmot_Proviso_cwjnii.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1846-08-08",
        endDate: "1846-08-08",
        category: ["american history", " abolition"],
        meta: "The Wilmot Proviso was a bill that failed to become law prohibiting slavery in new U.S. territories west of the Mississippi River. Despite its three-time failure to pass, It did successfully provoke a nationwide debate over slavery.  ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Mark Twain",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669552193/platos-peach-video/Mark_Twain_tbgqua.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1835-10-30",
        endDate: "1910-04-21",
        category: ["biography"],
        meta: "Born Samuel Clemens, Mark Twain was a famous author who made an early living as a steamboat captain and reporter before publishing his widely acclaimed books.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Life and Works of Nikolo Tesla",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669702765/platos-peach-video/The_Life_and_Inventions_of_Nikola_Tesla_bkdqfq.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1856-07-10",
        endDate: "1943-01-07",
        category: ["biography"],
        meta: "Nikola Tesla was a brilliant inventor who contributed to early radio technology, alternating current, X-rays and more. Despite receiving royalties from Westinghouse, Tesla would die near penniless and plagued by mental illness.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Presidency of Franklin D. Roosevelt",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669716260/platos-peach-video/The_Presidency_of_Franklin_D._Roosevelt_hktmlr.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1933-03-04",
        endDate: "1945-04-12",
        category: ["american history", "  great depression"],
        meta: "After beating Herbert Hoover in the election of 1932, the FDR presidency would become the only four-term presidency in American history replete with depression, legislation, war and more.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Scopes Monkey Trial",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669722213/platos-peach-video/The_Scopes_Monkey_Trial_dahr1h.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1925-07-10",
        endDate: "1925-07-21",
        category: ["american history", " world history"],
        meta: "The Scopes Monkey Trial was a public case in Dayton, Tennessee, regarding the teaching of evolution in schools defying the Christian fundamentalist belief in creationism. While evolutionists lost the legal case, Christian fundamentalists lost in the court of public opinion. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Siege of Vicksburg",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669724269/platos-peach-video/The_Siege_of_Vicksburg_lz7ffz.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1863-05-18",
        endDate: "1863-07-04",
        category: ["military history", " american civil war"],
        meta: "The Siege of Vicksburg was a 40-day holdout between Confederate troops led by General Pemberton and the Union Army led by Maj General Grant. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Alexander Hamilton",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669508205/platos-peach-video/Alexander_Hamilton_loepoc.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1755-01-11",
        endDate: "1804-07-12",
        category: ["american history", " revolution & independence"],
        meta: "Alexander Hamilton was born in the Caribbean in 1755 and would move to New York in 1772, just in time to play a pivotal role in America's push for independence. His valor and strategy on the battlefield elevated him to political office before an affair cost him everything. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "A tragic Winter at Valley Forge",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669505775/platos-peach-video/A_tragic_Winter_at_Valley_Forge_qo9bcw.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1777-12-19",
        endDate: "1778-06-19",
        category: ["military history", " american revolutionary war"],
        meta: "During the American Revolutionary War, the Continental Army's main winter encampment was Valley Forge, where misery and death were an inevitability.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Annie Oakley",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669511062/platos-peach-video/Annie_Oakley_gzol8c.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1860-08-13",
        endDate: "1926-11-03",
        category: ["biography"],
        meta: "Annie Oakley was born in 1860 and soon became an expert marksman while hunting in the Darke County, Ohio region. After besting professional sharpshooter Frank Butler, the pair of gunslingers would get married and travel the world as competitive sharpshooters.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Alexander The Great",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669508580/platos-peach-video/Alexander_The_Great_xntx1i.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-07/20/356",
        endDate: "-6/10/323",
        category: ["ancient history", " greece"],
        meta: "Alexander the Great was born into royalty in Macedonia, educated by Aristotle, and would ascend to the Macedonian throne after his father was assassinated, building one of the largest empires of his time.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Parthenon",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669714888/platos-peach-video/The_Parthenon_oqt9ht.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-447",
        endDate: "-432",
        category: ["ancient history", " greece"],
        meta: "The Parthenon was constructed atop the Acropolis in Athens, Greece between 447 and 432 B.C.E. It has had many purposes, served multiple religions and withstood numerous attacks and natural disaster.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Albert Einstein",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669507109/platos-peach-video/Albert_Einstein_c4cclz.mov",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1879-03-14",
        endDate: "1955-04-18",
        category: ["biography"],
        meta: "Albert Einstein, educated in Physics and Math, had his 'marvelous year' of theoretical productivity in 1905, catapulting him into the spotlight of intellectual fame and professorship until his death in 1955. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Alaska Purchase",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669506852/platos-peach-video/Alaska_Purchase_ug65om.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1867-03-30",
        endDate: "1867-03-30",
        category: ["american history", " westward expansion"],
        meta: "The Purchase of Alaska from Russia was completed on October 18th, 1867, adding 586,412 square miles to the U.S. territory for only $7.2 million, less than two cents an acre.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Al Capone",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669506468/platos-peach-video/Al_Capone_tnacug.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1899-01-17",
        endDate: "1947-01-25",
        category: ["biography"],
        meta: "Al Capone was a prohibition-era bootlegger and gangster who earned the nickname 'scarface' by getting slashed with a knife. After living a high-profile life of crime in Chicago, Capone was convicted on tax-evasion charges.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Mozart",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669557048/platos-peach-video/Mozart_xly9ql.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1756-01-27",
        endDate: "1791-12-05",
        category: ["biography"],
        meta: "Mozart was a musical prodigy from childhood, composing his first opera at the age of eleven. He would go on to compose some of the most influential pieces of music in history, despite dealing with physical and mental illness. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Sudden Death at Pompeii",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669577940/platos-peach-video/Sudden_Death_at_Pompeii_fjuuas.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-740",
        endDate: "79",
        category: ["ancient history", " rome"],
        meta: "The once wealthy and vibrant Italian city of Pompeii was destroyed over a two-day period when Mount Vesuvius erupted in 79 AD.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Seneca Falls Convention",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669723100/platos-peach-video/The_Seneca_Falls_Convention_qvu27w.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1848-07-19",
        endDate: "1848-07-20",
        category: ["american history", " womens suffrage"],
        meta: "Organized and led by abolitionists and women's rights activists such as Elizabeth Cady Stanton, Seneca Falls Convention in 1848 brought 300 people together to pen their manifesto and inspire change. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Gerald Ford",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669532260/platos-peach-video/Gerald_Ford_z3trid.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1913-07-14",
        endDate: "2006-12-26",
        category: ["biography"],
        meta: "Gerald Ford served in WWII before entering the House of Representatives for 25 years. Ford was appointed Vice President in the wake of Nixon's Watergate Scandal and would soon become the first unelected president after Nixon's resignation from office. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "Samuel Adams",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669572162/platos-peach-video/Samuel_Adams_gg8dc8.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1722-09-27",
        endDate: "1803-10-02",
        category: ["american history", " revolution & independence"],
        meta: "Samuel Adams was a student of philosophy, failed businessman, activist writer and founding father of the US as a vocal proponent of the Revolutionary War, signer of the Declaration of Independence, and contributor to the Articles of Confederation.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "J. Edgar Hoover",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669539897/platos-peach-video/J._Edgar_Hoover_d0rypv.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1895-01-01",
        endDate: "1972-05-02",
        category: ["biography"],
        meta: "J. Edgar Hoover was a lawyer by training but spent 48 years as Director of the FBI. His controversial tactics and range of power were evident in his many campaigns to identify fascists and communists.",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Battle of Shiloh",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669591903/platos-peach-video/The_Battle_of_Shiloh_ynzp1l.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "1862-04-06",
        endDate: "-13782",
        category: ["military history", " american civil war"],
        meta: "Conducting a dawn patrol on April 6th, 1862, Union soldiers stumbled upon a battle-ready Confederate line just a mile from the Union Army’s encampment. When attacked, the bluecoats were driven back toward Shiloh Church, beginning the bloody Battle of Shiloh. ",
        creator: "116143759549242008910",
      },
      {
        _id: new ObjectId(),
        title: "The Migration of Birds",
        video:
          "http://res.cloudinary.com/drewpager/video/upload/v1669707212/platos-peach-video/The_Migration_of_Birds_b3flhz.mp4",
        image:
          "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
        startDate: "-60000000",
        endDate: "Present",
        category: ["science & technology"],
        meta: "The migration of birds is a fascinating area of study as some birds travel up to 6,000 miles without stopping for food, water, sleep, or rest. Some birds make roundtrip flights up to 25,000 miles long. ",
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
