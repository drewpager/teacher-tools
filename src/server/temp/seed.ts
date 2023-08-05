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
      // {_id: new ObjectId(), title:"Diphtheria", video:"https://res.cloudinary.com/drewpager/video/upload/v1690993685/platos-peach-video/Diphtheria_cudu0w.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-50000", endDate:"Present", category:['science', ' disease'], meta:"Diphtheria is a bacterial infection that primarily affects the throat and nose. It can cause a thick, gray coating to form in the throat, making it difficult to breathe. It can also lead to complications such as heart and nerve damage. Vaccination is the most effective way to prevent diphtheria.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Failed Warbirds of World War Two", video:"https://res.cloudinary.com/drewpager/video/upload/v1690993864/platos-peach-video/Failed_Warbirds_of_World_War_Two_vzyiur.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1939-09-01", endDate:"1945-09-02", category:['world military history', ' world war two'], meta:"A collection of warplanes from World War Two that were unsuccessful in their missions or did not meet expectations.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Francis Bacon", video:"https://res.cloudinary.com/drewpager/video/upload/v1690994110/platos-peach-video/Francis_Bacon_qzf658.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1561-01-22", endDate:"1626-04-09", category:['biography'], meta:"Francis Bacon was an English philosopher, statesman, and scientist who is known for his contributions to the scientific method and his influential works on philosophy and politics. He is considered one of the founders of modern science.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Joseph Lister: The Father of Modern Surgery", video:"https://res.cloudinary.com/drewpager/video/upload/v1690994852/platos-peach-video/Joseph_Lister_The_Father_of_Modern_Surgery_uxv9nd.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1827-04-05", endDate:"1912-02-10", category:['science', ' medicine'], meta:"Joseph Lister is known as the Father of Modern Surgery. He introduced antiseptic techniques to prevent infection during surgeries, revolutionizing the field of medicine. His contributions have greatly improved patient outcomes and set the foundation for modern surgical practices.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Milk Sickness", video:"https://res.cloudinary.com/drewpager/video/upload/v1690994867/platos-peach-video/Milk_Sickness_dktyss.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1809", endDate:"1927", category:['science', ' disease'], meta:"Milk sickness is a rare illness caused by consuming milk or meat from cows that have ingested white snakeroot plants. Symptoms include vomiting, tremors, and severe weakness. It can be fatal if not treated promptly.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Jacques Cartier", video:"https://res.cloudinary.com/drewpager/video/upload/v1690994886/platos-peach-video/Jacques_Cartier_rnms5i.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1491-12-23", endDate:"1557-09-01", category:['canadian history'], meta:"Jacques Cartier was a French explorer who is best known for his voyages to North America, where he claimed Canada for France. He is considered one of the most important explorers in Canadian history.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Battle of Quebec", video:"https://res.cloudinary.com/drewpager/video/upload/v1690995540/platos-peach-video/The_Battle_of_Quebec_kck1kc.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1759-06-27", endDate:"1759-09-18", category:['canadian history'], meta:"The Battle of Quebec was a pivotal battle in the French and Indian War, fought between British and French forces in 1759. The British victory led to the end of French control in Canada and marked a turning point in the war.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The English Civil Wars", video:"https://res.cloudinary.com/drewpager/video/upload/v1690995554/platos-peach-video/The_English_Civil_Wars_tlepeo.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1642", endDate:"1651", category:['world military history'], meta:"The English Civil Wars were a series of conflicts fought between the Parliamentarians and the Royalists in the 17th century. These wars resulted in the execution of King Charles I and the establishment of a republican government in England.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Haitian Revolution", video:"https://res.cloudinary.com/drewpager/video/upload/v1690996315/platos-peach-video/The_Haitian_Revolution_najttt.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1791", endDate:"1804", category:['world history'], meta:"The Haitian Revolution was a successful slave rebellion in the late 18th century that led to the establishment of Haiti as the first independent black republic in the Americas. It was a significant event in the fight against slavery and colonialism.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Great Dying", video:"https://res.cloudinary.com/drewpager/video/upload/v1690996374/platos-peach-video/The_Great_Dying_ccezb2.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1616", endDate:"1619", category:['american history', ' native american history'], meta:"The Great Dying refers to the mass extinction event that occurred approximately 252 million years ago, wiping out nearly 90% of all marine species and 70% of terrestrial species. It is considered the most severe extinction event in Earth's history.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Great Fire of New York", video:"https://res.cloudinary.com/drewpager/video/upload/v1690996386/platos-peach-video/The_Great_Fire_of_New_York_City_hntv8i.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1776-09-21", endDate:"1776-09-22", category:['american history', ' revolution & independence'], meta:"The Great Fire of New York City was a devastating fire that occurred in 1835, destroying a large portion of the city and leading to significant changes in fire safety regulations and infrastructure.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Last Cape Horners", video:"https://res.cloudinary.com/drewpager/video/upload/v1690999846/platos-peach-video/The_Last_Cape_Horners_om5ztq.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1818", endDate:"1947", category:['world history'], meta:"A group of sailors known as the Last Cape Horners are celebrated for being the last to sail around Cape Horn, a treacherous route in South America. Their bravery and skill in navigating the dangerous waters is admired by many.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Library of Alexandria", video:"https://res.cloudinary.com/drewpager/video/upload/v1691000100/platos-peach-video/The_Library_of_Alexandria_zq9rdk.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-295", endDate:"Present", category:['geography'], meta:"The Library of Alexandria was a renowned ancient library in Egypt that housed a vast collection of knowledge and literature from various civilizations. It was a center of learning and research, attracting scholars from all over the world. Unfortunately, it was destroyed and its contents lost to history.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Mystic Massacre", video:"https://res.cloudinary.com/drewpager/video/upload/v1691000506/platos-peach-video/The_Mystic_Massacre_kchjjb.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1636", endDate:"1637", category:['american history', ' american indian wars'], meta:"The Mystic Massacre was a violent attack on the Pequot tribe by English colonists in 1637. It resulted in the deaths of hundreds of Native Americans and marked a turning point in the colonization of New England.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"William Shakespeare", video:"https://res.cloudinary.com/drewpager/video/upload/v1689458310/platos-peach-video/William_Shakespeare_xwffmo.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1564-04-23", endDate:"1616-04-23", category:['art', ' literature'], meta:"William Shakespeare was an English playwright, poet, and actor who is widely regarded as one of the greatest writers in the English language. He wrote numerous plays, including Romeo and Juliet, Hamlet, and Macbeth, which continue to be performed and studied today.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Murder of Thomas Becket", video:"https://res.cloudinary.com/drewpager/video/upload/v1689457155/platos-peach-video/The_Murder_of_Thomas_Becket_ftllcf.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1118-12-21", endDate:"1170-12-29", category:['world religions', ' christianity'], meta:"Thomas Becket was the Archbishop of Canterbury, but in 1170 he was assassinated. He was killed by four knights who were believed to be acting on the orders of King Henry II. This event had significant political and religious consequences in medieval England.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Westminster Abbey", video:"https://res.cloudinary.com/drewpager/video/upload/v1689456584/platos-peach-video/Westminster_Abbey_bianmy.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"960", endDate:"Present", category:['geography'], meta:"Westminster Abbey is a famous Gothic church in London, England. It is known for its stunning architecture, rich history, and as the site of numerous royal weddings and coronations. It is also a popular tourist attraction and a UNESCO World Heritage Site.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The July 20 Plot", video:"https://res.cloudinary.com/drewpager/video/upload/v1689455597/platos-peach-video/The_July_20_Plot_bn7aqv.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1944-07-20", endDate:"1944-07-20", category:['world military history', ' world war two'], meta:"The July 20 Plot was a failed assassination attempt on Adolf Hitler by a group of German officers during World War II. The plot, led by Colonel Claus von Stauffenberg, aimed to overthrow the Nazi regime and end the war. However, Hitler survived the bombing and the conspirators were executed.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The History of Barbie Dolls", video:"https://res.cloudinary.com/drewpager/video/upload/v1689455142/platos-peach-video/The_History_of_Barbie_Dolls_fvogle.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1959-03-09", endDate:"Present", category:['world history', ' uncategorized'], meta:"The history of Barbie dolls is a fascinating journey that began in 1959 with the creation of the iconic doll by Ruth Handler. Since then, Barbie has evolved to reflect changing societal norms and has become a cultural icon worldwide.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Great Plague of London", video:"https://res.cloudinary.com/drewpager/video/upload/v1689454650/platos-peach-video/The_Great_Plague_of_London_c2gsle.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1665", endDate:"1666", category:['science', ' medicine'], meta:"The Great Plague of London was a devastating epidemic that occurred in 1665-1666, resulting in the deaths of an estimated 100,000 people. It spread rapidly throughout the city, causing panic and leading to the implementation of various measures to control the outbreak.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Great Fire of London", video:"https://res.cloudinary.com/drewpager/video/upload/v1689454042/platos-peach-video/The_Great_Fire_of_London_ptc2do.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1666-09-02", endDate:"1666-09-06", category:['european history', ' renaissance'], meta:"The Great Fire of London was a devastating fire that swept through the city in 1666, destroying thousands of homes and buildings. It led to significant changes in urban planning and fire safety measures in the city.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Colorado Gold Rush", video:"https://res.cloudinary.com/drewpager/video/upload/v1689453518/platos-peach-video/The_Colorado_Gold_Rush_kcdxkv.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1858", endDate:"1873", category:['american history', ' westward expansion'], meta:"The Colorado Gold Rush was a significant event in the mid-1800s that attracted thousands of people to the region in search of gold. It led to the establishment of mining towns and had a lasting impact on the development of Colorado's economy and society.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Teddy Roosevelt and the River of Doubt", video:"https://res.cloudinary.com/drewpager/video/upload/v1689453184/platos-peach-video/Teddy_Roosevelt_and_the_River_of_Doubt_zsscpq.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1913-11-16", endDate:"1914-04-26", category:['american history', ' uncategorized'], meta:"The adventurous journey of former US President Theodore Roosevelt as he navigates the treacherous River of Doubt in the Amazon rainforest, facing numerous challenges and testing his resilience and leadership skills.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Sandro Botticelli", video:"https://res.cloudinary.com/drewpager/video/upload/v1689452941/platos-peach-video/Sandro_Botticelli_slqreh.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1445", endDate:"1510", category:['art'], meta:"Sandro Botticelli was an Italian painter during the Renaissance period. He is best known for his iconic paintings such as 'The Birth of Venus' and 'Primavera.' His works are characterized by their delicate and graceful figures, vibrant colors, and mythological themes.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Raphael", video:"https://res.cloudinary.com/drewpager/video/upload/v1689452701/platos-peach-video/Raphael_p002dg.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1483", endDate:"1520", category:['art'], meta:"Raphael was an Italian painter and architect of the High Renaissance. He is known for his exquisite paintings, including the famous 'School of Athens.' His works showcased his mastery of composition, color, and perspective, making him one of the most influential artists of his time.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Monkeypox", video:"https://res.cloudinary.com/drewpager/video/upload/v1689452449/platos-peach-video/Monkeypox_yvdst4.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1959", endDate:"Present", category:['science', ' disease'], meta:"Monkeypox is a viral disease that causes a rash and fever in humans. It is similar to smallpox but less severe. The disease is transmitted through contact with infected animals or humans.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Judas and Jesus", video:"https://res.cloudinary.com/drewpager/video/upload/v1688586466/platos-peach-video/Jesus_Judas_y3yld9.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-6", endDate:"30", category:['world religions', ' christianity'], meta:"Wyatt Earp was a famous lawman and gunfighter in the American Old West. He is best known for his involvement in the Gunfight at the O.K. Corral in Tombstone, Arizona, and for his reputation as a tough and skilled lawman.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Geoffrey Chaucer", video:"https://res.cloudinary.com/drewpager/video/upload/v1688586235/platos-peach-video/Geoffrey_Chaucer_jxnf5r.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1340", endDate:"1400", category:['biography'], meta:"Geoffrey Chaucer was a medieval English poet known for his influential works such as 'The Canterbury Tales.' He is often referred to as the 'Father of English literature' and his writings played a significant role in the development of the English language.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Franklin D. Roosevelt", video:"https://res.cloudinary.com/drewpager/video/upload/v1688585776/platos-peach-video/Franklin_D._Roosevelt_hjmi3p.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1882-01-30", endDate:"1945-04-12", category:['biography'], meta:"Franklin D. Roosevelt was the 32nd President of the United States, serving from 1933 until his death in 1945. He led the country through the Great Depression and World War II, implementing the New Deal and establishing the United Nations.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Eleanor of Aquitaine", video:"https://res.cloudinary.com/drewpager/video/upload/v1688584935/platos-peach-video/Elenor_of_Aquitaine_nv8yuj.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1122", endDate:"1204", category:['biography'], meta:"Eleanor of Aquitaine (1122-1204) was a powerful queen consort of France and England, known for her intelligence, political savvy, and patronage of the arts.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Donatello", video:"https://res.cloudinary.com/drewpager/video/upload/v1688584626/platos-peach-video/Donatello_kapdyq.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1386", endDate:"1466", category:['biography'], meta:"Donatello was an Italian sculptor of the Renaissance period. He is known for his innovative techniques and realistic portrayal of human figures. His works, such as the bronze statue of David, had a significant impact on the development of Western art.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Australia's Defeat at Rabaul", video:"https://res.cloudinary.com/drewpager/video/upload/v1688584308/platos-peach-video/Australia_s_Defeat_at_Rabaul_pbik62.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1942-01-04", endDate:"1942-02-09", category:['world military history'], meta:"Australia suffered a major defeat at Rabaul during World War II. The Japanese forces overwhelmed the Australian troops, resulting in the capture of over 1,000 soldiers. This loss had significant implications for Australia's defense strategy in the Pacific.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"America Enters World War Two", video:"https://res.cloudinary.com/drewpager/video/upload/v1688583540/platos-peach-video/American_Enters_World_War_Two_qmr71t.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1941-12-08", endDate:"1945-09-02", category:['world military history', ' world war two'], meta:"December 8, 1941, the day after the Japanese attack on Pearl Harbor, the US enters WWII. The war would drag on until September of 1945.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Navajo Code Talkers of World War Two", video:"https://res.cloudinary.com/drewpager/video/upload/v1688851777/platos-peach-video/Navajo_Code_Talkers_of_World_War_Two_h0l118.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1941-12-08", endDate:"1945-09-02", category:['world military history', ' world war two'], meta:"Native Americans used their languages to cipher/decipher battlefield communications, which left the Nazis unable to intercept the Allies’ battle strategies.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Rosa Parks and the Montgomery Bus Boycott of 1955", video:"https://res.cloudinary.com/drewpager/video/upload/v1688925311/platos-peach-video/Rosa_Parks_and_the_Montgomery_Bus_Boycott_of_1955_omsc7v.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1955-12-01", endDate:"1956-12-20", category:['american history', ' civil rights movement'], meta:"Rosa Parks' refusal to give up her seat on a segregated bus in Montgomery, Alabama sparked the Montgomery Bus Boycott in 1955. This civil rights protest lasted for over a year and ultimately led to the desegregation of buses in the city.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Conquering The Hudson: Building the Lincoln Tunnel", video:"https://res.cloudinary.com/drewpager/video/upload/v1688850371/platos-peach-video/Conquering_The_Hudson_ox1j7o.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1934-03-12", endDate:"1937-12-22", category:['geography'], meta:"The construction of the Lincoln Tunnel, the first mechanically-ventilated underwater tunnel in the world was first opened on December 22nd, 1937.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Chernobyl Suffers a Catastrophic Meltdown", video:"https://res.cloudinary.com/drewpager/video/upload/v1688850134/platos-peach-video/Chernobyl_luidny.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1986", endDate:"Present", category:['world history'], meta:"In 1986, the catastrophic nuclear meltdown in a soviet reactor led to the Chernobyl disaster. Thousands were exposed to cancerous radiation levels and forced to relocate.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Prophesies of Nostradamus", video:"https://res.cloudinary.com/drewpager/video/upload/v1688927371/platos-peach-video/The_Prophesies_of_Nostradamus_yiemi1.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1555", endDate:"Present", category:['biography'], meta:"Nostradamus, a 16th-century French astrologer and physician. His predictions, written in cryptic verses, have been interpreted to predict major historical events such as the rise of Hitler, the French Revolution, and the 9/11 attacks.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Battle of the Somme", video:"https://res.cloudinary.com/drewpager/video/upload/v1688928551/platos-peach-video/The_Battle_of_the_Somme_trjvre.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1916-07-01", endDate:"1916-11-18", category:['world military history', ' world war one'], meta:"One of the bloodiest battles fought in human history, WWI's Battle of the Somme saw 141 days of fighting and over 1 million men wounded or killed in action.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Woodrow Wilson Hallucinates at the Paris Peace Conference", video:"https://res.cloudinary.com/drewpager/video/upload/v1688929060/platos-peach-video/Woodrow_Wilson_Hallucinates_at_the_Paris_Peace_Conference_dtlmdt.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1919", endDate:"1919", category:['world military history', ' world war one'], meta:"President Woodrow Wilson at the Paris Peace Conference had a mental breakdown most likely caused by a high fever associated with the Spanish Flu of 1918.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Greensboro Four Make Civil Rights History", video:"https://res.cloudinary.com/drewpager/video/upload/v1688926512/platos-peach-video/The_Greensboro_Four_Make_Civil_Rights_History_n96gw0.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1960-02-01", endDate:"1960-07-08", category:['american history', ' civil rights movement'], meta:"Four black students refused to vacate a white's only lunch counter in Greensboro, NC, setting off a civil rights movement of peaceful protests and sit ins.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Wounded Knee", video:"https://res.cloudinary.com/drewpager/video/upload/v1688927849/platos-peach-video/Wounded_Knee_lanqi8.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1890-12-15", endDate:"1890-12-29", category:['american history', ' american indian wars'], meta:"The 7th Cavalry was sent to disband ghost dance rituals performed by the Lakota tribe at Wounded Knee Creek. Tensions escalated when the Lakota chief died in custody and efforts to disarm one tribesman resulted in soldiers shooting innocent people.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The 14th Amendment", video:"https://res.cloudinary.com/drewpager/video/upload/v1688925551/platos-peach-video/The_14th_Amendment_kisehi.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1868", endDate:"1964", category:['american history', ' civil rights movement'], meta:"In response to the segregationist black codes enacted in the South after the Civil War, the 14th Amendment expanded the civil and legal rights of all Americans, repealed the three-fifths clause and banned payments to former slaveholders for loss of human property and more. ",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Neolithic Period", video:"https://res.cloudinary.com/drewpager/video/upload/v1688926948/platos-peach-video/The_Neolithic_Period_jfhwpu.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-9000", endDate:"-500", category:['ancient history', ' prehistory'], meta:"The Neolithic Revolution during the last period of the New Stone Age between 9,000 and 2,000 BCE saw developments in agriculture, domestication, social structure and defensive necessity. ",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Battle of Long Island", video:"https://res.cloudinary.com/drewpager/video/upload/v1688925961/platos-peach-video/The_Battle_of_Long_Island_lokwye.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1776-08-27", endDate:"1776-08-27", category:['american military history', ' american revolutionary war'], meta:"As the British attempted to sever American patriot supply lines in the ports surrounding Long Island, George Washington moved his troops to defend Revolutionary War supplies and efforts. The battle would become one of the bloodiest days to date.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Chesapeake Bay Bridge", video:"https://res.cloudinary.com/drewpager/video/upload/v1688926154/platos-peach-video/The_Chesapeake_Bay_Bridge_nujkvg.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1949-01-14", endDate:"Present", category:['geography'], meta:"The Chesapeake Bay Bridge was opened on July 30th, 1952 and a second span added in 1973, serving as a vital 4.3-mile link between Balitmore, Washington D.C., Annapolis, and Atlantic coastal cities. ",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Aztecs of Mesoamerica", video:"https://res.cloudinary.com/drewpager/video/upload/v1688925962/platos-peach-video/The_Aztecs_of_Mesoamerica_weiifl.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1300", endDate:"1521", category:['ancient history', ' mesoamerica'], meta:"The Aztec Empire of Mesoamerica culminated in Tenochtitlán, a civilization that employed sophisticated irrigation and agriculture practices. In 1519, Hernan Cortés would eradicate the city with superior weaponry and foreign disease.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Yom Kippur", video:"https://res.cloudinary.com/drewpager/video/upload/v1688928037/platos-peach-video/Yom_Kippur_g2fyjo.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-1297", endDate:"Present", category:['world religions', ' judaism'], meta:"Yom Kippur is the Jewish holiday culminating the Ten Days of Awe and celebrates atonement and repentance through prayer, fasting, and abstinence. ",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Overland Campaign", video:"https://res.cloudinary.com/drewpager/video/upload/v1688927222/platos-peach-video/The_Overland_Campaign_ojwj7p.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1864-05-05", endDate:"1864-05-08", category:['american military history', ' american civil war'], meta:"Ulysses S. Grant led a six-week and massive three-pronged Union Army offensive now known as the Overland Campaign, intended to crush Robert E. Lee’s Confederate army, while capturing the rebel capital at Richmond before sweeping farther south toward Atlanta.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Red Clouds' War", video:"https://res.cloudinary.com/drewpager/video/upload/v1688852063/platos-peach-video/Red_Cloud_s_War_ugvq0l.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1866", endDate:"1867", category:['american history', ' american indian wars'], meta:"After gold attracted Euro-American miners to Lakota, Cheyenne and Arapaho lands, chief Red Cloud turned to guerrilla-style attacks in what would become Red Cloud's War, which ended in the Treaty of Fort Laramie in 1868. ",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Huey Long", video:"https://res.cloudinary.com/drewpager/video/upload/v1688850620/platos-peach-video/Huey_Long_iw5kch.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1893-08-30", endDate:"1935-09010", category:['biography'], meta:"Huey Long was the youngest Louisiana governor who narrowly escaped impeachment after being accused of nepotism, bribery and even murder. Long was assassinated on September 10th, 1935.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Wilsonianism", video:"https://res.cloudinary.com/drewpager/video/upload/v1688927637/platos-peach-video/Wilsonianism_xfwne6.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1918-01-08", endDate:"1919-06-28", category:['american history'], meta:"Wilsonianism refers to the foreign policy and political philosophy of U.S. President Woodrow Wilson, characterized by a belief in international cooperation, democracy, and self-determination. Wilson's ideas were influential in the creation of the League of Nations and the post-World War I order.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The History of Vacuum Tubes", video:"https://res.cloudinary.com/drewpager/video/upload/v1688926762/platos-peach-video/The_History_of_Vacuum_Tubes_bmwdts.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1883", endDate:"1947", category:['science', ' technology'], meta:"Vacuum tubes, also known as thermionic valves, were first developed in the late 19th century and revolutionized electronics, enabling the creation of early radios, televisions, and computers. They were eventually replaced by transistors in the mid-20th century.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"JFK's Ich Bin Ein Berliner Speech", video:"https://res.cloudinary.com/drewpager/video/upload/v1688850966/platos-peach-video/JFK_s_Ich_Bin_Ein_Berliner_Speech_rmiqaz.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1961-07-25", endDate:"1961-07-25", category:['american history', ' cold war era'], meta:"In 1963, US President John F. Kennedy gave a famous speech in Berlin, Germany, declaring 'Ich bin ein Berliner' (I am a Berliner) in support of the city's people who were divided by the Berlin Wall. The speech symbolized US solidarity with West Berlin and opposition to Soviet control of East Germany.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"March of the Ten Thousand", video:"https://res.cloudinary.com/drewpager/video/upload/v1688851530/platos-peach-video/March_of_the_Ten_Thousand_a3imbl.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-401", endDate:"-401", category:['ancient history'], meta:"The March of the Ten Thousand was a Greek mercenary army's epic journey from Persia to the Black Sea, chronicled by Xenophon in his 'Anabasis' around 401 BCE.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"America's First Jet Aircraft", video:"https://res.cloudinary.com/drewpager/video/upload/v1688848023/platos-peach-video/America_s_First_Jet_Aircraft_tluvzc.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1942-10-01", endDate:"Present", category:['science', ' technology'], meta:"The first jet aircraft in America was the Bell XP-59A, which made its maiden flight in 1942. It was based on British designs and used Whittle engines.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Kristallnacht", video:"https://res.cloudinary.com/drewpager/video/upload/v1688851219/platos-peach-video/Kristallnacht_i0usqb.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1938-11-07", endDate:"1938-11-10", category:['world military history', ' uncategorized'], meta:"Kristallnacht, also known as the Night of Broken Glass, was a violent pogrom against Jews in Nazi Germany on November 9-10, 1938. It resulted in the destruction of Jewish homes, businesses, synagogues, and the arrest of thousands of Jews.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Arlington National Cemetery", video:"https://res.cloudinary.com/drewpager/video/upload/v1688849909/platos-peach-video/Arlington_National_Cemetery_hphoeh.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1861-05-24", endDate:"Present", category:['american military history', ' warriors'], meta:"Arlington National Cemetery is a military cemetery in Virginia, USA, where over 400,000 service members and their families are buried. It is a place of honor and remembrance for those who have served their country.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Sons of Liberty", video:"http://res.cloudinary.com/drewpager/video/upload/v1669575393/platos-peach-video/Sons_of_Liberty_ooddep.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1765", endDate:"1776", category:['american history', ' revolution & independence'], meta:"The Sons of Liberty was an organization of notable founding fathers including Samuel Adams, John Hancock and Paul Revere, that provoked civil disobedience against British rule.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Why Witches Ride Brooms", video:"http://res.cloudinary.com/drewpager/video/upload/v1669743151/platos-peach-video/Why_Witches_Ride_Brooms_s9x2jp.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1600", endDate:"Present", category:['holiday history'], meta:"A popular icon of witchcraft, the witches' broomstick has roots in pagan fertility rituals, broomstick dances, and accounts of witches using brooms to fly up and out their chimneys.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"What's Up With LARPing?", video:"http://res.cloudinary.com/drewpager/video/upload/v1669546734/platos-peach-video/LARPing_oe6ss5.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1972", endDate:"Present", category:['world history', ' uncategorized'], meta:"LARPing or “live-action role-playing' is an event where participants portray characters in a fictional yet physical setting, interacting with other characters participating in the LARP.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Outlaw Jesse James", video:"http://res.cloudinary.com/drewpager/video/upload/v1669541345/platos-peach-video/Jesse_James_and_the_Wild_West_akj2lt.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1847-09-05", endDate:"1882-04-03", category:['american history', ' westward expansion'], meta:"Jesse James was raised in a slave-owning, Confederate-sympathizing family and is believed to have channeled his post-Civil War anger into into robbing trains, stagecoaches, and banks. He was later assassinated by a new recruit to his gang, after a large reward was offered for James' capture.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Battle of Verdun", video:"http://res.cloudinary.com/drewpager/video/upload/v1669593736/platos-peach-video/The_Battle_of_Verdun_awxnpi.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1916-02-21", endDate:"1916-12-18", category:['world military history'], meta:"With German aggression intently focused on taking control of France, the Battle of Verdun would prove one of the longest, deadliest and most decisive in World War One. ",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Titanic", video:"http://res.cloudinary.com/drewpager/video/upload/v1669739326/platos-peach-video/Titanic_hw5gca.mov", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1911-05-31", endDate:"1912-04-15", category:['world history '], meta:"The sinking of the Titanic occurred on April 15th, 1912, despite being touted as the first unsinkable passenger ship. More than 1,500 people died and only about 700 survived.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Pandemic Cholera", video:"http://res.cloudinary.com/drewpager/video/upload/v1669563247/platos-peach-video/Pandemic_Choleera-AP_Edition_yvs1dp.mov", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1817", endDate:"Present", category:['science', ' medicine'], meta:"Pandemic cholera is a disease caused by the bacterium Vibrio cholerae. Understand its symptoms, transmission, treatment, and prevention.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"United Airlines Flight 629", video:"http://res.cloudinary.com/drewpager/video/upload/v1669740906/platos-peach-video/United_Airlines_Flight_629_ep20ec.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1955-11-01", endDate:"1955-11-01", category:['american history'], meta:"On November 1st, 1955, the regularly scheduled flight 629 from Denver to Portland was destroyed by a time bomb, stowed by a passenger's estranged son, taking the lives of 44 innocent bystanders.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Wine Windows of Italy Make a Covid Comeback", video:"http://res.cloudinary.com/drewpager/video/upload/v1669744076/platos-peach-video/Wine_Windows_of_Italy_Make_a_Covid_Comeback_htfgod.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1671", endDate:"2023", category:['science', ' medicine '], meta:"Plagues as early as 14th century prompted merchants in Italy to install wine windows to protect buyers and sellers. COVID-19 brought the windows back in service.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Pandemic Smallpox", video:"http://res.cloudinary.com/drewpager/video/upload/v1669564240/platos-peach-video/Pandemic_Smallpox-AP_Edition_yp678h.mov", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-1350", endDate:"Present", category:['science', ' medicine '], meta:"Smallpox is believed to have emerged around 10,000 BC. It caused numerous epidemics throughout history, including the devastating 20th-century pandemic. In 1980, smallpox became the first disease to be eradicated through a global vaccination campaign, marking a major milestone in public health.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Pandemic Typhus", video:"http://res.cloudinary.com/drewpager/video/upload/v1669565004/platos-peach-video/Pandemic_Typhus-AP_Edition_jpdzka.mov", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1528", endDate:"Present", category:['science', ' medicine '], meta:"Pandemic typhus, also known as louse-borne typhus, is a bacterial infection caused by Rickettsia prowazekii. It has been responsible for several epidemics throughout history, including the devastating outbreaks during World War I and World War II. Improved hygiene and the use of antibiotics have significantly reduced its prevalence in modern times.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Pandemic Typhoid", video:"http://res.cloudinary.com/drewpager/video/upload/v1669564607/platos-peach-video/Pandemic_Typhoid-AP_Edition_ioxfmi.mov", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-430", endDate:"Present", category:['science', ' medicine '], meta:"The pandemic typhoid, caused by the bacterium Salmonella Typhi, emerged in the early 20th century. It spread globally, affecting millions of people and causing high mortality rates. Improved sanitation and the development of vaccines have significantly reduced its impact, but it remains a concern in some regions.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"A Shaky Grand Opening For the Happiest Place on Earth", video:"http://res.cloudinary.com/drewpager/video/upload/v1669497241/platos-peach-video/A_Shaky_Grand_Opening_For_The_Happiest_Place_on_Earth_youtld.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1955-07-17", endDate:"1955-07-17", category:['american history'], meta:"The grand opening day of Disneyland on July 17th, 1955 proved to be anything but a smooth and problem-free first day of operations. See how Walt Disney handled the pressure to reopen the following day.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Sigmund Freud", video:"http://res.cloudinary.com/drewpager/video/upload/v1669573634/platos-peach-video/Sigmund_Freud_gubmzh.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1856-05-06", endDate:"1939-09-23", category:['biography'], meta:"Sigmund Freud was a psychology researcher who had an immense impact on the field from his theories of id, ego, superego, and the Oedipus complex. Freud committed suicide in 1938.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Famous Native Americans", video:"http://res.cloudinary.com/drewpager/video/upload/v1669527629/platos-peach-video/Famous_Native_Americans_rawsmb.mov", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1942", endDate:"Present", category:['biography'], meta:"Most students of American history know of famous Native Americans of yesteryear—names like Crazy Horse, Sitting Bull and Sacagawea come to mind—but today, history has minted a new generation of rewnowned Native Americans.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Anne Frank", video:"https://res.cloudinary.com/drewpager/video/upload/v1672710424/platos-peach-video/Anne_Frank_atjjfk.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1929-06-12", endDate:"1945-04-01", category:['biography'], meta:"Anne Frank was a young Jewish refugee living in Amsterdam during the Nazi invasion. With her family, they would hide in a secret annex for over two years before being discovered.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Blackbeard", video:"https://res.cloudinary.com/drewpager/video/upload/v1672710637/platos-peach-video/Blackbeard_wppdog.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1680", endDate:"1718", category:['american history', ' colonial'], meta:"Blackbeard, whose real name was Edward Teach, was a notorious pirate who terrorized the seas off the coast of North America and the Caribbean during the early 18th century. He was known for his fearsome appearance, including his long black beard. He was eventually killed in a battle with the Royal Navy.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Cowboys of the American West", video:"https://res.cloudinary.com/drewpager/video/upload/v1672711101/platos-peach-video/Cowboys_of_the_American_West_nc2d16.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1519", endDate:"Present", category:['american history', ' world history'], meta:"Cowboys emerged in the American West in the late 1800s as cattle herders and ranchers, known for their skills in riding, roping, and branding cattle.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Early Modern Man and the Last Ice Age", video:"https://res.cloudinary.com/drewpager/video/upload/v1672711360/platos-peach-video/Early_Modern_Man_and_the_Last_Ice_Age_ptoilq.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-24000", endDate:"-21000", category:['ancient history', ' prehistory'], meta:"During the last ice age (120,000-11,700 years ago), early humans migrated and adapted to changing environments. They developed new tools and technologies to survive, laying the foundations for human civilizations. The ice age ended with a warming trend.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Fidel Castro", video:"https://res.cloudinary.com/drewpager/video/upload/v1672711729/platos-peach-video/Fidel_Castro_cwrxva.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1926-08-13", endDate:"2016-11-25", category:['biography'], meta:"Fidel Castro (1926-2016) was a Cuban revolutionary and politician who served as the country's Prime Minister and later President for over five decades.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Franco", video:"https://res.cloudinary.com/drewpager/video/upload/v1672711992/platos-peach-video/Franco_ql1rqw.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1892-12-04", endDate:"1975-11-20", category:['biography'], meta:"Francisco Franco was a Spanish military leader and politician who ruled Spain as a dictator from 1939 until his death in 1975. He led a Nationalist rebellion against the democratically-elected government during the Spanish Civil War and implemented a regime characterized by authoritarianism, repression, and censorship. His legacy remains controversial in Spain today.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Hiroshima, The Day the World Went Nuclear", video:"https://res.cloudinary.com/drewpager/video/upload/v1672712268/platos-peach-video/Hiroshima_The_Day_the_World_Went_Nuclear_ylkc4f.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1945-08-06", endDate:"Present", category:['world military history', ' world war two'], meta:"The bombing of Hiroshima on August 6, 1945, was the first time an atomic bomb was used in warfare. The bombing killed an estimated 140,000 people and led to Japan's surrender, ending World War II. It remains one of the most controversial events in modern history.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Isaac Newton", video:"https://res.cloudinary.com/drewpager/video/upload/v1672712517/platos-peach-video/Isaac_Newton_tnbnvn.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1643-01-04", endDate:"1727-03-31", category:['biography'], meta:"Sir Isaac Newton (1642-1727) was an English mathematician, physicist, and astronomer who made foundational contributions to science and math. He is best known for his laws of motion, universal gravitation, and calculus.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"John Quincy Adams", video:"https://res.cloudinary.com/drewpager/video/upload/v1672712759/platos-peach-video/John_Quincy_Adams_do67gf.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1767-07-11", endDate:"1848-02-23", category:['biography'], meta:"John Quincy Adams was the 6th US President (1825-1829). He was a diplomat and Secretary of State under James Monroe. As president, he supported national infrastructure and education, but faced opposition and was not re-elected. Adams later served in the House of Representatives until his death in 1848.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Life Aboard the Mayflower", video:"https://res.cloudinary.com/drewpager/video/upload/v1672712990/platos-peach-video/Life_Aboard_the_Mayflower_nfdybu.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1620-07-22", endDate:"1621-03-31", category:['american history', ' colonial'], meta:"The Mayflower voyage was a trip from England to America in 1620, by Pilgrims seeking religious freedom. The journey was challenging, but the Pilgrims founded Plymouth Colony and played a key role in shaping American history.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Madam C.J. Walker", video:"https://res.cloudinary.com/drewpager/video/upload/v1672713237/platos-peach-video/Madam_C.J._Walker_ft5jay.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1867-12-23", endDate:"1919-05-25", category:['american history', ' african american history'], meta:"Madam C.J. Walker was an African American entrepreneur, philanthropist, and hair care pioneer. She developed and sold cosmetics and hair care products for Black women. She became America's first self-made female millionaire. ",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Napalm and the Vietnam War", video:"https://res.cloudinary.com/drewpager/video/upload/v1672713508/platos-peach-video/Napalm_and_the_Vietnam_War_skxdeo.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1963", endDate:"1973", category:['military history', ' vietnam war'], meta:"Napalm was used extensively by the US in the Vietnam War as a weapon to burn down jungles, destroy crops, and terrorize enemy forces and civilians.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"RFK's Funeral Train", video:"https://res.cloudinary.com/drewpager/video/upload/v1672714135/platos-peach-video/RFK_s_Funeral_Train_llecer.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1968-06-08", endDate:"1968-06-08", category:['american history', ' american 1960s'], meta:"Robert Kennedy's funeral train traveled from NYC to Washington, DC on June 8, 1968. Mourners lined the tracks to pay their respects as the train carried Kennedy's body to his final resting place at Arlington National Cemetery.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Robert F. Kennedy", video:"https://res.cloudinary.com/drewpager/video/upload/v1672714371/platos-peach-video/Robert_F._Kennedy_kctliy.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1925-11-20", endDate:"1968-06-06", category:['american history', ' biography'], meta:"Robert F. Kennedy was a prominent American politician and attorney, serving as U.S. Attorney General and later as a Senator until his assassination in 1968.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Ruby Bridges", video:"https://res.cloudinary.com/drewpager/video/upload/v1672714603/platos-peach-video/Ruby_Bridges_igmiup.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1954-09-08", endDate:"Present", category:['biography'], meta:"Ruby Bridges was the first African American child to attend an all-white school in New Orleans, symbolizing the fight for racial integration in the US.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Barbary Slave Trade", video:"https://res.cloudinary.com/drewpager/video/upload/v1672714776/platos-peach-video/The_Barbary_Slave_Trade_rxm6we.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1904-05-08", endDate:"1905-03-07", category:['world history'], meta:"Barbary Slave Trade where an approximate 1.2 million white Europeans were enslaved in Africa.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Battle of Pakchon", video:"https://res.cloudinary.com/drewpager/video/upload/v1672714972/platos-peach-video/The_Battle_of_Pakchon_zxvh4w.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1950-11-04", endDate:"1950-11-06", category:['american military history'], meta:"The Battle of Pakchon was fought during the Korean War on November 5-8, 1950, resulting in a decisive victory for UN forces over North Korean troops.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The History of Harmonicas", video:"https://res.cloudinary.com/drewpager/video/upload/v1672715142/platos-peach-video/The_History_of_Harmonicas_mtnvlb.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1822", endDate:"Present", category:['world history'], meta:"The history of the harmonica dates back to an 1100 BC Chinese instrument called a Sheng, until the modern mouth organ debuted in 1820, rapidly spreading across Europe and the US. Beloved by vaudevillians, Hollywood westerns, blues musicians, and more.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Liberation of Paris", video:"https://res.cloudinary.com/drewpager/video/upload/v1672715335/platos-peach-video/The_Liberation_of_Paris_jjlvxx.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1944-08-19", endDate:"1944-08-25", category:['military history', ' world war two'], meta:"The liberation of Paris after the D-Day invasion at Normandy took place on August 25th, 1944. Vive Paris. Vive de Gaulle. Vive La France.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Raid on Son Tay", video:"https://res.cloudinary.com/drewpager/video/upload/v1672715583/platos-peach-video/The_Raid_on_Son_Tay_wqpavk.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1970-11-20", endDate:"1970-11-20", category:['military history', ' vietnam war'], meta:"The Son Tay raid was a U.S. military operation to rescue American prisoners of war in North Vietnam in 1970. The mission was successful but no POWs were found. The raid showed U.S. capability and determination to bring troops home.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Sacramento River Massacre", video:"https://res.cloudinary.com/drewpager/video/upload/v1677703715/platos-peach-video/The_Sacramento_River_Massacre_ykmwlm.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1846-03-30", endDate:"1846-04-05", category:['american history'], meta:"In 1846, John Fremont led a survey party to the Sacramento River, where they massacred innocent Native Americans.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Valhalla", video:"https://res.cloudinary.com/drewpager/video/upload/v1672716262/platos-peach-video/Valhalla_imrkku.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"800", endDate:"1100", category:['world religions', ' world history'], meta:"Valhalla is a hall in Norse mythology where the souls of brave warriors who died in battle were taken by the god Odin to live afterlife.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"VJ Day", video:"https://res.cloudinary.com/drewpager/video/upload/v1672716504/platos-peach-video/VJ_Day_sopvva.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1945-08-14", endDate:"1945-08-14", category:['world military history', ' world history'], meta:"VJ Day marked the end of World War II in the Pacific, as Japan surrendered on August 15, 1945, bringing an end to the war that ravaged the region.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Women's Suffrage", video:"https://res.cloudinary.com/drewpager/video/upload/v1672716743/platos-peach-video/Women_s_Suffrage_aev8wh.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1848", endDate:"1920", category:['american history', ' womens suffrage'], meta:"The women's suffrage movement began in the 1820s, until the Seneca Falls Convention in 1848 finally generated some momentum. After nearly 100 years of struggle and progress, the 19th Amendment was ratified in 1920. ",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"America's First Opioid Crisis", video:"https://res.cloudinary.com/drewpager/video/upload/v1677693207/platos-peach-video/America_s_First_Opioid_Crisis_er5pab.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1861", endDate:"1915", category:['american history', ' american military history'], meta:"The post-Civil War era saw a rise in opioid addiction among veterans and civilians due to widespread availability of morphine and laudanum, leading to public health concerns.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Battle of the Alamo", video:"https://res.cloudinary.com/drewpager/video/upload/v1677693420/platos-peach-video/Battle_of_the_Alamo_f0zkvv.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1836-02-23", endDate:"1836-03-06", category:['american military history'], meta:"The Battle of the Alamo was a pivotal event in the Texas Revolution, fought in 1836 between Texan revolutionaries and the Mexican army.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Brown v. Board of Education", video:"https://res.cloudinary.com/drewpager/video/upload/v1677693675/platos-peach-video/Brown_v._Board_of_Education_uujntd.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1954-05-17", endDate:"Present", category:['american history'], meta:"Brown v. Board of Education was a landmark 1954 US Supreme Court case that ruled segregation in public schools to be unconstitutional. It overturned the 'separate but equal' doctrine.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"California's Immigration History", video:"https://res.cloudinary.com/drewpager/video/upload/v1677693931/platos-peach-video/California_s_Immigration_History_vietbd.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1542", endDate:"Present", category:['american history'], meta:"California's immigration history is rich and complex, with waves of immigrants from various countries contributing to the state's diverse culture and economy over the past two centuries.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Communication Techniques of Early Man", video:"https://res.cloudinary.com/drewpager/video/upload/v1677694199/platos-peach-video/Communication_Techniques_of_Early_Man_srncbh.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-24000", endDate:"-21000", category:['ancient history', ' prehistory'], meta:"Early human communication likely consisted of nonverbal cues such as gestures, facial expressions, and body language, as well as vocalizations, as well as cave paintings that informed others about herd migrations and mating seasons.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Filibusters in Central America", video:"https://res.cloudinary.com/drewpager/video/upload/v1677694626/platos-peach-video/Filibusters_in_Central_America_lywfpf.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1849", endDate:"1861", category:['american history', ' westward expansion'], meta:"The term 'filibuster' refers to the actions of US citizens who attempted to seize control of countries in Central America in the 19th century. These individuals, also known as 'filibusteros,' often acted without the support of the US government and were motivated by various political and economic interests. The filibusters were involved in conflicts in Nicaragua, Honduras, and other countries, but ultimately failed to establish lasting control.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Francisco Pizarro", video:"https://res.cloudinary.com/drewpager/video/upload/v1677694884/platos-peach-video/Francisco_Pizarro_evixoo.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1478-03-16", endDate:"1541-06-26", category:['european history', ' age of exploration'], meta:"Francisco Pizarro (c. 1478-1541) was a Spanish conquistador who conquered the Inca Empire and founded Lima, Peru, in the 16th century.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Germany's Spring Offensive of 1918", video:"https://res.cloudinary.com/drewpager/video/upload/v1677695147/platos-peach-video/Germany_s_Spring_Offensive_of_1918_maipwv.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1918-03-21", endDate:"1918-07-18", category:['world military history'], meta:"The Spring Offensive of 1918 was a series of German offensives on the Western Front during World War I. Although initially successful, they ultimately failed due to a lack of supplies and exhaustion of German troops, leading to the eventual Allied victory. The offensive was Germany's last major effort to win the war.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Greek Mythology", video:"https://res.cloudinary.com/drewpager/video/upload/v1677695613/platos-peach-video/Greek_Mythology_zlfyuo.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-20000", endDate:"800", category:['ancient history', ' greece'], meta:"Greek mythology is a collection of stories about gods and heroes, often featuring battles, love affairs, and betrayals. From Zeus to Achilles, it's a rich tapestry of ancient tales.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Grover Cleveland", video:"https://res.cloudinary.com/drewpager/video/upload/v1677695851/platos-peach-video/Grover_Cleveland_f96ntc.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1837-03-18", endDate:"1908-06-24", category:['biography'], meta:"Grover Cleveland was the 22nd and 24th President of the United States, serving non-consecutive terms from 1885 to 1889 and from 1893 to 1897.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Harry S. Truman", video:"https://res.cloudinary.com/drewpager/video/upload/v1677696121/platos-peach-video/Harry_S._Truman_e5xaia.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1884-05-08", endDate:"1972-12-26", category:['biography'], meta:"Harry S. Truman was the 33rd President of the United States, serving from 1945 to 1953. He is known for his leadership during World War II and the Cold War.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"How to Make a Microchip", video:"https://res.cloudinary.com/drewpager/video/upload/v1677696366/platos-peach-video/How_to_Make_a_Microchip_h3czjp.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1965", endDate:"Present", category:['science', ' technology'], meta:"The process of making a microchip involves creating a semiconductor wafer, adding layers of material and using photolithography to etch microscopic patterns onto the surface. This is followed by doping and metallization to create transistors, wires, and other components, and then testing and packaging.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Joan of Arc", video:"https://res.cloudinary.com/drewpager/video/upload/v1677696602/platos-peach-video/Joan_of_Arc_bletm4.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1412", endDate:"1431", category:['biography'], meta:"Joan of Arc was a French peasant girl who, at the age of 17, led the French army to several important victories during the Hundred Years' War. She was eventually captured by the English and burned at the stake for heresy in 1431. She was later canonized as a saint by the Catholic Church.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"McCulloch v. Maryland", video:"https://res.cloudinary.com/drewpager/video/upload/v1677696861/platos-peach-video/McCulloch_v._Maryland_famxud.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1819-02-27", endDate:"1819-02-27", category:['american history'], meta:"McCulloch v. Maryland was a landmark case in which the Supreme Court ruled that the federal government had the power to establish a national bank and that states could not tax federal institutions. This decision established the principle of federal supremacy over state laws.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Minutemen", video:"https://res.cloudinary.com/drewpager/video/upload/v1677697047/platos-peach-video/Minutemen_jzabdr.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1645", endDate:"1783", category:['american history'], meta:"The Minutemen were American colonists who formed a militia during the American Revolutionary War. They were known for being ready to fight at a minute's notice and played a key role in the Battles of Lexington and Concord in 1775. The term 'Minutemen' is still used today to refer to individuals who are ready to act quickly in defense of their community or country.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Niels Bohr", video:"https://res.cloudinary.com/drewpager/video/upload/v1677697267/platos-peach-video/Niels_Bohr_jwr9ng.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1885-10-07", endDate:"1962-11-18", category:['biography'], meta:"Niels Bohr was a Danish physicist who made significant contributions to atomic structure and quantum mechanics. He received the Nobel Prize in Physics in 1922.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Orford Ness", video:"https://res.cloudinary.com/drewpager/video/upload/v1677697535/platos-peach-video/Orford_Ness_svfxor.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1913", endDate:"Present", category:['world military history'], meta:"Orford Ness is a remote spit of land on the Suffolk coast of England, used as a military testing site during World War II and Cold War era.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Plessy v. Ferguson", video:"https://res.cloudinary.com/drewpager/video/upload/v1677697775/platos-peach-video/Plessy_v._Ferguson_snihce.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1892", endDate:"1964", category:['american history'], meta:"Plessy v. Ferguson was a landmark 1896 US Supreme Court decision that upheld the 'separate but equal' doctrine, allowing racial segregation in public facilities as long as they were deemed equal in quality. It was later overturned by the Brown v. Board of Education decision in 1954.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Queen Anne's War", video:"https://res.cloudinary.com/drewpager/video/upload/v1677698011/platos-peach-video/Queen_Anne_s_War_vtgii8.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1702", endDate:"1713", category:['world military history'], meta:"Queen Anne's War (1702-1713) was a conflict between Britain and France in North America, with Native American involvement. It ended with the Treaty of Utrecht.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Robert Moses, The Man Who Built New York City", video:"https://res.cloudinary.com/drewpager/video/upload/v1677698219/platos-peach-video/Robert_Moses_The_Man_Who_Built_New_York_City_dceiee.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1888-12-18", endDate:"1981-07-29", category:['biography'], meta:"Robert Moses was an American urban planner and public official who worked in the New York City area from the 1920s to the 1970s. He is known for his influential role in shaping the region's infrastructure and public works projects, including parks, highways, and public housing. His legacy is controversial due to accusations of racism, elitism, and a lack of concern for the needs of minority communities.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"S&H Green Stamps", video:"https://res.cloudinary.com/drewpager/video/upload/v1677698684/platos-peach-video/S_H_Green_Stamps_zf7igt.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1896", endDate:"2013", category:['american history'], meta:"S&H Green Stamps were a rewards program popular in the mid-20th century, where shoppers received stamps with their purchases and could redeem them for products from a catalog.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Seneca Village", video:"https://res.cloudinary.com/drewpager/video/upload/v1677698946/platos-peach-video/Seneca_Village_bf1puv.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1825", endDate:"1857", category:['geography'], meta:"Seneca Village was a predominantly African American community in Manhattan, New York City, established in the early 19th century. It was home to about 300 people, and was eventually razed to make way for Central Park in 1857. The village represents an important chapter in New York's history of Black land ownership and community-building, and its erasure highlights the displacement and dispossession experienced by Black Americans in the 19th century.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Susan B. Anthony", video:"https://res.cloudinary.com/drewpager/video/upload/v1677699188/platos-peach-video/Susan_B._Anthony_uxtrqw.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1820-02-15", endDate:"1906-03-13", category:['american history', ' womens suffrage'], meta:"Susan B. Anthony (1820-1906) was a leading figure in the women's suffrage movement in the United States and played a pivotal role in securing women's right to vote.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Tecumseh", video:"https://res.cloudinary.com/drewpager/video/upload/v1677699458/platos-peach-video/Tecumseh_ubua7g.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1768-03-12", endDate:"1813-10-05", category:['biography'], meta:"Tecumseh (1768-1813) was a Native American leader of the Shawnee tribe who fought to unite tribes against U.S. expansion and died in the War of 1812.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Teddy Roosevelt", video:"https://res.cloudinary.com/drewpager/video/upload/v1677699774/platos-peach-video/Teddy_Roosevelt_zu8t0k.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1859-10-26", endDate:"1919-01-06", category:['biography'], meta:"Theodore Roosevelt: 26th President of the United States (1901-1909), conservationist, trust buster, Rough Rider, and advocate for the 'Square Deal.'",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Battle of Amiens", video:"https://res.cloudinary.com/drewpager/video/upload/v1677700328/platos-peach-video/The_Battle_of_Amiens_fekkbw.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1918-08-08", endDate:"1918-11-11", category:['world military history'], meta:"The Battle of Amiens, fought on August 8, 1918, was a decisive Allied victory that marked the beginning of the end of World War I on the Western Front.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Bermuda Triangle", video:"https://res.cloudinary.com/drewpager/video/upload/v1677700583/platos-peach-video/The_Bermuda_Triangle_t0gcun.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1492", endDate:"Present", category:['geography'], meta:"The Bermuda Triangle is a region in the western part of the North Atlantic Ocean where ships and airplanes have disappeared under mysterious circumstances.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Co-evolution of Dogs & Humans", video:"https://res.cloudinary.com/drewpager/video/upload/v1677700853/platos-peach-video/The_Co-evolution_of_Dogs_Humans_pqovgo.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"-100000", endDate:"Present", category:['science'], meta:"Dogs have been domesticated by humans for thousands of years. They were originally used for hunting and protection, but have since become valued companions and service animals. Throughout history, dogs have been featured in art, literature, and mythology, and have played important roles in human society.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Crescent City Tsunami of 1964", video:"https://res.cloudinary.com/drewpager/video/upload/v1677701102/platos-peach-video/The_Crescent_City_Tsunami_of_1964_npmtxk.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1964-03-27", endDate:"1964-03-27", category:['american history'], meta:"The Crescent City tsunami of 1964 was caused by the Great Alaska Earthquake and devastated the coastal town of Crescent City, California, killing 11 people and causing extensive damage to the port.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Discovery of Insulin", video:"https://res.cloudinary.com/drewpager/video/upload/v1677701580/platos-peach-video/The_Discovery_of_Insulin_t77owq.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1886", endDate:"1929", category:['science', ' medicine'], meta:"The discovery of insulin revolutionized the treatment of diabetes, allowing patients to manage their blood sugar levels and live longer, healthier lives.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The History of Transistors", video:"https://res.cloudinary.com/drewpager/video/upload/v1677701811/platos-peach-video/The_Evolution_of_Transistors_zu97mc.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1947-12-16", endDate:"Present", category:['science', ' technology'], meta:"The transistor was invented in 1947 by William Shockley, John Bardeen, and Walter Brattain at Bell Labs. It revolutionized electronics, replacing vacuum tubes and enabling the development of smaller, faster, and more reliable devices, leading to the creation of modern computers and other electronic devices.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The History of Microchips", video:"https://res.cloudinary.com/drewpager/video/upload/v1677702085/platos-peach-video/The_History_of_Microchips_jg6avg.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1959", endDate:"Present", category:['science', ' technology'], meta:"The first microchip, also known as an integrated circuit, was invented in 1958 by Jack Kilby at Texas Instruments and Robert Noyce at Fairchild Semiconductor. It revolutionized electronics, enabling the creation of smaller, faster, and more powerful computers, smartphones, and other devices.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Impeachments of Donald J. Trump", video:"https://res.cloudinary.com/drewpager/video/upload/v1677702366/platos-peach-video/The_Impeachments_of_Donald_J._Trump_hdynsr.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"2020-02-05", endDate:"2021-02-13", category:['american history'], meta:"The impeachment of Donald J. Trump refers to the process of charging the former President of the United States with high crimes and misdemeanors. He was impeached twice by the House of Representatives, but acquitted both times by the Senate.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Marburg Files", video:"https://res.cloudinary.com/drewpager/video/upload/v1677702779/platos-peach-video/The_Marburg_Files_hp15wb.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1937", endDate:"1972", category:['world history'], meta:"The Marburg Files, also known as the Nazi Secret Service Files, were documents detailing espionage activities of the Nazi regime in Central America, Mexico, and the Caribbean before and during World War II. The files were discovered in 1946 and helped to expose the extent of Nazi influence in the region, as well as the complicity of some Latin American governments.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Missouri Compromise", video:"https://res.cloudinary.com/drewpager/video/upload/v1677703028/platos-peach-video/The_Missouri_Compromise_sq2trl.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1818", endDate:"1820", category:['american history'], meta:"The Missouri Compromise was a 1820 agreement that allowed Missouri to enter the Union as a slave state while Maine entered as a free state.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Roswell Incident", video:"https://res.cloudinary.com/drewpager/video/upload/v1677703485/platos-peach-video/The_Roswell_Incident_mik6xk.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1947", endDate:"Present", category:['american history'], meta:"The Roswell Incident was an alleged UFO crash that occurred in 1947 near Roswell, New Mexico. The US military claimed it was a weather balloon.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"The Thirty Years' War", video:"https://res.cloudinary.com/drewpager/video/upload/v1677703969/platos-peach-video/The_Thirty_Years_War_awseto.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1618", endDate:"1648", category:['world military history'], meta:"The Thirty Years' War (1618-1648) was a conflict in central Europe fought between Catholic and Protestant states, leading to significant political and social changes.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Typhoid Mary", video:"https://res.cloudinary.com/drewpager/video/upload/v1677704198/platos-peach-video/Typhoid_Mary_f9truf.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1869-09-23", endDate:"1938-11-11", category:['science', ' medicine'], meta:"Typhoid Mary (1869-1938) was an asymptomatic carrier of typhoid fever who infected at least 51 people, leading to her quarantine for over 20 years.",creator: '116143759549242008910'},
      // {_id: new ObjectId(), title:"Woodrow Wilson ", video:"https://res.cloudinary.com/drewpager/video/upload/v1677704497/platos-peach-video/Woodrow_Wilson_kxdkxc.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1856-12-28", endDate:"1924-02-03", category:['biography'], meta:"Woodrow Wilson was the 28th President of the United States, serving from 1913 to 1921. He led the country through World War I and championed the League of Nations.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Warren G. Harding", video:"https://res.cloudinary.com/drewpager/video/upload/v1685911351/platos-peach-video/Warren_G._Harding_pillfj.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1865-11-02", endDate:"1923-08-02", category:['biography'], meta:"Warren G. Harding was an American politician who served as the 29th President of the United States from 1921 until his death in 1923. He is known for his efforts to promote business and reduce government regulation, as well as for several scandals that occurred during his administration.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The Black Friday Gold Scandal of 1869", video:"https://res.cloudinary.com/drewpager/video/upload/v1685911346/platos-peach-video/The_Black_Friday_Gold_Scandal_of_1869_duheon.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1869-09-24", endDate:"1872-03-20", category:['american history'], meta:"The Black Friday Gold Scandal of 1869 was a financial crisis caused by two investors attempting to corner the gold market, leading to a sharp increase in gold prices and subsequent economic turmoil.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The Cultural Nations of America", video:"https://res.cloudinary.com/drewpager/video/upload/v1685911331/platos-peach-video/The_Cultural_Nations_of_America_mfr7xy.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1620-11-11", endDate:"Present", category:['american history'], meta:"A summary of the cultural nations of America, highlighting the diversity and richness of the continent's various indigenous cultures and traditions.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Max Planck", video:"https://res.cloudinary.com/drewpager/video/upload/v1685911306/platos-peach-video/Max_Planck_omkx7s.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1858-02-23", endDate:"1947-10-04", category:['biography'], meta:"Max Planck was a German physicist who is known for his contributions to quantum theory, including the discovery of Planck's constant. He was awarded the Nobel Prize in Physics in 1918.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Thomas Hobbes", video:"https://res.cloudinary.com/drewpager/video/upload/v1685911306/platos-peach-video/Thomas_Hobbes_jb8l3r.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1588-04-05", endDate:"1679-12-04", category:['biography'], meta:"Thomas Hobbes was an English philosopher who is best known for his work on political philosophy. He believed that humans are inherently selfish and that a strong central government is necessary to maintain order and prevent chaos.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Dante", video:"https://res.cloudinary.com/drewpager/video/upload/v1685911274/platos-peach-video/Dante_fhm4zc.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1265", endDate:"1321-09-14", category:['biography'], meta:"Dante Alighieri was an Italian poet and philosopher born in the 13th century. He is best known for his epic poem, 'The Divine Comedy,' which explores the journey of the soul through Hell, Purgatory, and Heaven. His work had a profound influence on Italian literature and the development of the Italian language.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The Mach Loop", video:"https://res.cloudinary.com/drewpager/video/upload/v1685911137/platos-peach-video/The_Mach_Loop_cdpett.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1939", endDate:"Present", category:['world military history'], meta:"The Mach Loop is a series of valleys in Wales where military aircraft conduct low-level training flights, providing a popular spot for aviation enthusiasts to watch and photograph the planes.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The History of Monkey Bars", video:"https://res.cloudinary.com/drewpager/video/upload/v1685911069/platos-peach-video/The_History_of_Monkey_Bars_cthm4x.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1923-10-23", endDate:"Present", category:['world history'], meta:"The history of monkey bars is a story of how a simple playground equipment has evolved over time to become a popular fixture in parks and playgrounds around the world. From its humble beginnings as a simple metal frame with a few bars, the monkey bars have undergone numerous changes and improvements to become the versatile and challenging obstacle course that we know today.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The Vietnam War Protest Movement", video:"https://res.cloudinary.com/drewpager/video/upload/v1685910989/platos-peach-video/The_Vietnam_War_Protest_Movement_lzotok.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1960", endDate:"1975", category:['world history'], meta:"The Vietnam War Protest Movement was a series of massive and wide spread anti-war protests and activism against US involvement in Vietnam, demanding peace and withdrawal of troops.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The First Slave Revolt in the New World", video:"https://res.cloudinary.com/drewpager/video/upload/v1685910966/platos-peach-video/The_First_Slave_Revolt_in_the_New_World_cv9lsp.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1522", endDate:"1579", category:['american history', ' african american history'], meta:"The first slave revolt in the New World occurred, marking a significant moment in the fight for freedom and equality for enslaved individuals.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The History of Black Friday", video:"https://res.cloudinary.com/drewpager/video/upload/v1685910818/The_History_of_Black_Friday_crr4ob.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1869", endDate:"Present", category:['american history'], meta:"Black Friday originated in the 1960s as a term used by Philadelphia police to describe the chaos and heavy traffic that occurred the day after Thanksgiving. It has since evolved into a major shopping event, with retailers offering significant discounts and deals to attract customers.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The History of Potato Chips", video:"https://res.cloudinary.com/drewpager/video/upload/v1688589161/platos-peach-video/The_History_of_Potato_Chips_vkudvi.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1853", endDate:"Present", category:['american history'], meta:"Although contested, the history of potato chips dates back to 1853 when Cornelius Vanderbilt sent his fried potatoes back to chef George Crum who sliced them as thin as possible before deep-frying them, becoming widely accepted as the inventor of the potato chip. ",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Westminster Abbey", video:"https://res.cloudinary.com/drewpager/video/upload/v1688589161/platos-peach-video/Westminster_Abbey_ssuofb.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"960", endDate:"Present", category:['european history'], meta:"Westminster Abbey is a famous Gothic church in London, England. It is known for its stunning architecture, rich history, and as the site of numerous royal weddings and coronations. It is also a popular tourist attraction and a UNESCO World Heritage Site.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The Explorations of Henry Hudson", video:"https://res.cloudinary.com/drewpager/video/upload/v1688589158/platos-peach-video/The_Explorations_of_Henry_Hudson_k3bos6.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1607", endDate:"1611", category:['european history', ' age of exploration'], meta:"Henry Hudson was a sea-faring explorer and ship's captain who made multiple unsuccessful attempts to find new routes to Asia and the Indies, but made numerous discoveries that bear his namesake like the Hudson river in New York, Hudson Bay in Canada, and more.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The Hudson's Bay Company", video:"https://res.cloudinary.com/drewpager/video/upload/v1688589158/platos-peach-video/The_Explorations_of_Henry_Hudson_k3bos6.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1670-05-02", endDate:"Present", category:['canadian history'], meta:"The Hudson's Bay Company is a Canadian retail business that was established in 1670. It is one of the oldest companies in North America and is known for its department stores and iconic striped blankets.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Squanto and the Pilgrims", video:"https://res.cloudinary.com/drewpager/video/upload/v1688589108/platos-peach-video/Squanto_and_the_Pilgrims_cenn6d.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1620", endDate:"1622", category:['american history', ' colonial'], meta:"The story of Squanto and the Pilgrims is about how Squanto, a Native American, helped the Pilgrims survive in the New World by teaching them how to plant crops and hunt. His assistance was crucial in their survival and the establishment of the Plymouth Colony.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Q-Ships of World War One", video:"https://res.cloudinary.com/drewpager/video/upload/v1688589104/platos-peach-video/Q-ships_of_World_War_One_npgcj9.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1914", endDate:"1918", category:['world military history', ' world war one'], meta:"Q-ships were disguised merchant ships used by the British Navy during World War One to lure and destroy German submarines. They were armed with hidden weapons and would pretend to be defenseless before attacking the unsuspecting enemy.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The Great Acadian Expulsion", video:"https://res.cloudinary.com/drewpager/video/upload/v1688589084/platos-peach-video/The_Great_Acadian_Expulsion_c0x1ao.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1713", endDate:"1763", category:['canadian history'], meta:"The Great Acadian Expulsion refers to the forced deportation of the Acadian people by the British during the French and Indian War. This event resulted in the displacement and suffering of thousands of Acadians, who were forcibly removed from their homes in Nova Scotia.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Samuel de Champlain", video:"https://res.cloudinary.com/drewpager/video/upload/v1688589018/platos-peach-video/Samuel_de_Champlain_hs20m2.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1574", endDate:"1635", category:['canadian history'], meta:"Samuel de Champlain was a French explorer and cartographer who is known as the 'Father of New France' for establishing the first permanent French settlement in North America. He played a crucial role in the early exploration and colonization of Canada.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Misconceived Weapons of World War Two", video:"https://res.cloudinary.com/drewpager/video/upload/v1688589016/platos-peach-video/Misconceived_Weapons_of_World_War_Two_zz09tr.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1939", endDate:"1945", category:['world military history', ' world war two'], meta:"Learn about the production of net new weapons during world war two that didn't have the intended effect.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"The Klondike Gold Rush", video:"https://res.cloudinary.com/drewpager/video/upload/v1688588982/platos-peach-video/The_Klondike_Gold_Rush_s05mix.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1896", endDate:"1899", category:['canadian history'], meta:"The Klondike Gold Rush was a migration of thousands of people to the Klondike region of Yukon, Canada in search of gold in the late 19th century. It was one of the largest and most famous gold rushes in history.",creator: '116143759549242008910'},
      //   {_id: new ObjectId(), title:"Marbury v Madison", video:"https://res.cloudinary.com/drewpager/video/upload/v1688586718/platos-peach-video/Marbury_v_Madison_bx7mbt.mp4", image:"https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png", startDate:"1803-02-10", endDate:"1803-02-10", category:['american history'], meta:"Marbury v Madison was a landmark Supreme Court case in 1803 that established the principle of judicial review, giving the Court the power to declare laws unconstitutional. This case solidified the Court's role as a check on the other branches of government.",creator: '116143759549242008910'},
      // ]
      // const lessons: Lesson[] = [
      //   {
      //     _id: new ObjectId(),
      //     title: "The Migration of Birds",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669707212/platos-peach-video/The_Migration_of_Birds_b3flhz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-60000000",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "The migration of birds is a fascinating area of study as some birds travel up to 6,000 miles without stopping for food, water, sleep, or rest. Some birds make roundtrip flights up to 25,000 miles long. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Hastings",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669588987/platos-peach-video/The_Battle_of_Hastings_qkxveq.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1066-10-14",
      //     endDate: "1066-10-14",
      //     category: ["military history", " medieval"],
      //     meta: "The Battle of Hastings saw the crowning of the first Norman king of England on Christmas Day, 1066. Britain’s submission to the Norman Conquest would have a lasting impact on English language, culture and cuisine.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Martin Luther's 95 Theses",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669553129/platos-peach-video/Martin_Luther_s_95_Theses_siksiu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1517",
      //     endDate: "1517",
      //     category: ["european history", " renaissance"],
      //     meta: "In response to his objections to the Catholic Church's practice of selling indulgences, Martin Luther wrote his 95 theses which led Pope Leo to condemn Luther as a heretic and ultimately the Protestant Reformation.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Gunpowder Plot",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669685615/platos-peach-video/The_Gunpowder_Plot_g0htpk.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1605-11-05",
      //     endDate: "1605-11-05",
      //     category: ["european history", " renaissance"],
      //     meta: "Known as the Gunpowder Plot, on November 5th, 1605, Guy Fawkes and fellow Catholic conspirators attempted to eradicate England's Protestant-led government with 36 barrels of gunpowder rigged beneath the House of Lords.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "King Philip's War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669546158/platos-peach-video/King_Phillip_s_War_zerko7.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1675-06-20",
      //     endDate: "1678-04-12",
      //     category: ["military history", " colonial"],
      //     meta: "Wampanoag chief Metacom, or King Philip--fed up with continued colonial expansion onto Indian land--forcefully defended his people's territory in what became known as King Philip's War, leading to attacks on English colonies throughout Massachusetts, Rhode Island, Connecticut and Maine.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "George Washington",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669532005/platos-peach-video/George_Washington_xqxwue.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1732-02-22",
      //     endDate: "1799-12-14",
      //     category: ["american history", " early republic"],
      //     meta: "George Washington was born in Virginia in 1732 and would soon exhibit both mathematical and leadership abilities that led to his roles as commander-in-chief of the Continental Army and ultimately of the United States. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Life and Works of Thomas Paine",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669702506/platos-peach-video/The_Life_Works_of_Thomas_Paine_dwavd0.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1737-02-09",
      //     endDate: "1809-06-08",
      //     category: ["american history", " revolution & independence"],
      //     meta: "A writer and revolutionary whose works strongly influenced both the American and French Revolutions. His Common Sense pamphlet was the best-selling and most praised in the colonies.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Toussaint Charbonneau",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669739624/platos-peach-video/Toussaint_Charbboneau_macmmw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1767-03-20",
      //     endDate: "1843-08-12",
      //     category: ["american history", " westward expansion"],
      //     meta: "Born in 1767 Montreal, Toussaint Charbonneau would prove a valuable hire as an interpreter by Lewis and Clark during their expedition through Native American territories. Charbonneau married five Native American women, most famously Sacagawea.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Napoleon Bonaparte",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669558123/platos-peach-video/Napoleon_Bonaparte_f74llf.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1769",
      //     endDate: "1821",
      //     category: ["military history", " napoleonic wars"],
      //     meta: "Napoleon Bonaparte ascended through the French Revolution to seize power and conquer much of 19th century Europe. From the Napoleonic wars to his code of law, his impact is felt to this day.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The French Revolution",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669679017/platos-peach-video/The_French_Revolution_xdp5f9.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1789-05-05",
      //     endDate: "1799-11-09",
      //     category: ["european history", " renaissance"],
      //     meta: "The French Revolution was caused by civil unrest on behalf of the impoverished majority versus the aristocratic minority. Rumors of a military coup led citizens to storm the bastille as various groups vied for political control. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Alien and Sedition Acts",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669581020/platos-peach-video/The_Alien_Sedition_Acts_uoy75w.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1798-07-06",
      //     endDate: "1798-07-06",
      //     category: ["american history", " early republic"],
      //     meta: "Friction between the US and France led to fears of foreign spies and sedition in the Adams administration resulting in the Alien and Sedition Acts, a collection of four laws.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Lewis and Clark Expedition",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669701854/platos-peach-video/The_Lewis_and_Clark_Expedition_pjol1i.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1804-05-14",
      //     endDate: "1806-09-23",
      //     category: ["american history", " westward expansion"],
      //     meta: "The Lewis and Clark Expedition began on May 14th, 1804, when Meriwether Lewis and William Clark first plied the Missouri River with their crew of volunteers and paid explorers. The expedition saw two brutal winters during their push to the Pacific Ocean and back, producing invaluable maps and information for the westward flow of pioneers that would follow in their footsteps.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Robert E. Lee",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669570036/platos-peach-video/Robert_E._Lee_z4tqjs.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1807-01-19",
      //     endDate: "1870-10-12",
      //     category: ["american history", " civil war"],
      //     meta: "Robert E. Lee was a West Point-educated soldier who served in the Mexican-American War before becoming commander-in-chief of confederate rebel forces in the Civil War. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Kit Carson and the American Frontier",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669546335/platos-peach-video/Kit_Carson_and_the_American_West_z4onm0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1809-12-24",
      //     endDate: "1868-05-23",
      //     category: ["american history", " westward expansion"],
      //     meta: "Hollywood's picturesque pioneer of the American west, Kit Carson was known as a fur trader, guide, decorated war hero, and ultimately the symbol of Native American mistreatment.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "PT Barnum",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669569178/platos-peach-video/PT_Barnum_zpoick.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1810-07-05",
      //     endDate: "1891-04-07",
      //     category: ["biography"],
      //     meta: "Phineas Taylor Barnum, or PT Barnum, was a centerpiece in nineteenth-century American showmanship and entrepreneurship. At 60 years of age, he partnered with James Bailey to tour the country as The Bailey and Barnum traveling circus of performers, acts and animals.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ada Lovelace: First Female Computer Programmer",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669505994/platos-peach-video/Ada_Lovelace_The_First_Female_Computer_Programmer_jdrquq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1815-12-10",
      //     endDate: "1852-11-27",
      //     category: ["biography"],
      //     meta: "Known as the first female computer programmer, Ada Lovelace was educated in math and science, mentored by inventor Charles Babbage, and creator of loops in software.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Florence Nightingale and the Dawn of Modern Healthcare",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669528960/platos-peach-video/Florence_Nightingale_ewbvz1.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1820-05-12",
      //     endDate: "1910-08-13",
      //     category: ["biography"],
      //     meta: "Florence Nightingale opted to attend nursing school, a rare choice in the Victorian-era, but would soon prove vital in the Crimean War, where she implemented nursing best practices such as sanitation, saving thousands from filth diseases and death.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Life & Masterworks of Rosa Bonheur",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669703138/platos-peach-video/The_Life_and_Masterworks_of_Rosa_Bonheur_ccz3et.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1822-03-16",
      //     endDate: "1899-05-25",
      //     category: ["biography"],
      //     meta: "The richest and most famous female artist of 19th century France, Marie-Rosalie (Rosa) Bonheur spent the last forty years of her life entrenched in her small chateau above the Seine River town of Thomery.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ulysses S. Grant",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669740718/platos-peach-video/Ulysses_S._Grant_f84ehg.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1822-04-27",
      //     endDate: "1885-07-23",
      //     category: ["biography"],
      //     meta: "Ulysses S. Grant was a West Point graduate, Civil War hero, two-term U.S. President, prosecutor of racial injustice and proponent of meritocracy in civil service.   ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Stonewall Jackson",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669577691/platos-peach-video/Stonewall_Jackson_j1clqo.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1824-10-21",
      //     endDate: "1863-05-10",
      //     category: ["american history", " civil war"],
      //     meta: "Stonewall Jackson served in the Mexican-American War where he earned a reputation for bravery and toughness in battle, ultimately leading his Confederate Army forces to many victories against superior numbers of Union soldiers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Nat Turner's Rebellion",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669558565/platos-peach-video/Nat_Turner_s_Rebellion_nwwt50.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1831-08-21",
      //     endDate: "1831-08-23",
      //     category: ["american history", " south & slavery"],
      //     meta: "Nat Turner was an educated and religious African American slave who claimed to hear commandments from God. Nat Turner's Rebellion was a violent insurrection against white slave owners, killing between 55 and 65 white people, but ultimately resulting in the death of three times as many slaves.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Moon Hoax of 1835",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669683814/platos-peach-video/The_Great_Moon_Hoax_of_1835_hqrequ.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1835-08-25",
      //     endDate: "1835-09-16",
      //     category: ["american history", " world history"],
      //     meta: "In 1835, a fictional writer Dr. Andrew Grant published in the New York Sun newspaper about having seen life on the moon through a new high-power telescope in South Africa. The popularity and global phenomena of the six articles would be known as the Great Moon Hoax of 1835.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Andrew Carnegie",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669510617/platos-peach-video/Andrew_Carnegie_t8pjrk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1835-11-25",
      //     endDate: "1919-08-11",
      //     category: ["biography"],
      //     meta: "From an impoverished immigrant family, Andrew Carnegie built himself up to become a self-made billionaire investor, innovator, and philanthropist.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Mexican American War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669706529/platos-peach-video/The_Mexican_American_War_dtiv3f.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1846-04-25",
      //     endDate: "1848-02-02",
      //     category: ["military history", " mexican-american war"],
      //     meta: "After Mexico refused to sell land to U.S. President Polk, his belief in manifest destiny led to his declaration of war in 1846. The Mexican American War would ultimately last for two years, costing Mexico a lot of lives and land",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Wyatt Earp",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669745179/platos-peach-video/Wyatt_Earp_rickxm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1848-03-19",
      //     endDate: "1929-13-01",
      //     category: ["biography"],
      //     meta: "Wyatt Earp was a famous lawman and gunfighter in the American Old West. He is best known for his involvement in the Gunfight at the O.K. Corral in Tombstone, Arizona, and for his reputation as a tough and skilled lawman.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Forgotten Genius of Charles Scott Sherrington",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669678003/platos-peach-video/The_Forgotten_Genius_of_Charles_Scott_Sherrington_ljd7gg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1857-11-27",
      //     endDate: "1954-04-04",
      //     category: ["science", " technology"],
      //     meta: "The life and work of Sir Charles Scott Sherrington, whose seminal breakthroughs in science and human physiology have been largely forgotten in modern times.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "John Brown's Raid on Harpers Ferry",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669542946/platos-peach-video/John_Brown_s_Raid_on_Harpers_Ferry_xyqeay.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1859-10-16",
      //     endDate: "1859-10-18",
      //     category: ["american history", " abolition"],
      //     meta: "John Brown's radical plans for the abolition of slavery culminated in the Harpers Ferry raid, where 22 recruited men helped Brown overtake an armory in Harpers Ferry, Virginia, leading to a fatal and treasonous standoff.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Abraham Lincoln's Emancipation Proclamation",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669526295/platos-peach-video/Emancipation_Proclamation_i0awld.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863-01-01",
      //     endDate: "1863-01-01",
      //     category: ["american history", " civil war"],
      //     meta: "In September of 1862, Abraham Lincoln made his Emancipation Proclamation giving confederate states 100-days to rejoin the Union before their slaves would be set free. Signed on New Years Day, 1863, the proclamation proved a monumental step towards the abolition of US slavery.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Chancellorsville",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669586716/platos-peach-video/The_Battle_of_Chancellorsville_w5ygfl.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863-04-30",
      //     endDate: "1863-05-06",
      //     category: ["military history", " american civil war"],
      //     meta: "The Battle of Chancellorsville showcased General Robert E. Lee's strategic prowess with a Confederate army less than half the size of his Union opponents. The battle saw multiple flanks and ambushes, before the Union Army retreated in defeat.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sherman's March to the Sea",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669573441/platos-peach-video/Sherman_s_March_to_the_Sea_fssjns.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1864-11-15",
      //     endDate: "1864-12-21",
      //     category: ["military history", " american civil war"],
      //     meta: "General William Tecumseh Sherman's march to the sea during the Civil War was a strategy to break the morale of Confederate supporters by marching a division of the Union Army from Atlanta to Charleston, wreaking havoc along the way.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The 13th Amendment",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669578416/platos-peach-video/The_13th_Amendment_curowu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1865-01-31",
      //     endDate: "1865-12-06",
      //     category: ["american history", " civil war"],
      //     meta: "The 13th Amendment was passed by Abraham Lincoln's Republican party on January 31st, 1865. The Amendment formally abolished slavery under federal law.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Little Bighorn",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669590390/platos-peach-video/The_Battle_of_Little_Bighorn_bn6fdw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1876-06-25",
      //     endDate: "1876-06-25",
      //     category: ["military history", " american indian war"],
      //     meta: "The Battle of Little Bighorn was an armed engagement between forces of the Lakota, Northern Cheyenne and Arapaho Indians against the 7th Cavalry Regiment of the United States Army.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mata Hari",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669553593/platos-peach-video/Mata_Hari_wnwssj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1876",
      //     endDate: "1917",
      //     category: ["military history", " world war one"],
      //     meta: "Mata Hari was a famous exotic dancer from the early 20th Century who helped the French during WWI by seducing the Prussian Crown Prince Wilhelm, but would later be sentenced to death for supposed German espionage. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Barney Oldfield, The Fastest Man on Earth",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669512182/platos-peach-video/Barney_Oldfield_The_Fastest_Man_on_Earth_ocvhlp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1878-01-29",
      //     endDate: "1946-10-04",
      //     category: ["biography"],
      //     meta: "Barney Oldfield was a competitive bicycle racer turned motor enthusiast who set auto racing records in the early 1900s after meeting Henry Ford. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Marcus Garvey",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669551868/platos-peach-video/Marcus_Garvey_otibsg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1887-08-17",
      //     endDate: "1940-06-10",
      //     category: ["biography"],
      //     meta: "Marcus Garvey studied law and philosophy in London before sailing to New York City where he became one of the early civil rights voices for black equality.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ho Chi Minh",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669537915/platos-peach-video/Ho_Chi_Minh_ykrfd5.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1890-05-19",
      //     endDate: "1969-09-02",
      //     category: ["biography"],
      //     meta: "Ho Chi Minh was a proponent of communism to liberate Vietnam from the imperialist west and would organize the Viet Minh Party or League for the Independence of Vietnam. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Dwight D. Eisenhower",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669524501/platos-peach-video/Dwight_D._Eisenhower_ronokv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1890-10-14",
      //     endDate: "1969-03-28",
      //     category: ["military history", " world war two"],
      //     meta: "Dwight D. Eisenhower served in WWI and WWII, among other military engagements, before becoming President in 1953 with running mate Richard M. Nixon and serving two terms in office.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Bronze Age",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669597659/platos-peach-video/The_Bonze_Age_n4rtbl.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-3300",
      //     endDate: "-1200",
      //     category: ["ancient history", " prehistory"],
      //     meta: "After the ancient Sumerians likely started the Bronze Age by becoming the first humans to smelt tin with copper, the metallurgical process spread across early civilizations, helping to move early man toward centralized rule, writing, animal husbandry and agriculture. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Amelia Earhart Flies the Pond",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669509242/platos-peach-video/Amelia_Earhart_Flies_the_Pond_gocj99.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1897-07-24",
      //     endDate: "1939-01-05",
      //     category: ["biography"],
      //     meta: "On May 20th, 1932 a 34-year-old Amelia Earhart landed in a pasture at Culmore, Northern Ireland becoming the first woman to achieve a solo transatlantic flight.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ernie Pyle: America's Eyewitness to War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669526784/platos-peach-video/Enie_Pyle_America_s_Eyewitness_to_War_crtgwh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1900-08-03",
      //     endDate: "1945-04-18",
      //     category: ["military history", " world war two"],
      //     meta: "Ernie Pyle was the most famous and beloved war correspondent of World War Two. He advocated for fight pay and died in the line of duty in Okinawa.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Assassination of President McKinley",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669584913/platos-peach-video/The_Assassination_of_President_McKinley_fk8qxe.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1901-09-14",
      //     endDate: "1901-09-14",
      //     category: ["american history", "  gilded age"],
      //     meta: "The 25th US President, William McKinley, was the third sitting president to lose his life to an assassin's bullet. Who assassinated President McKinley and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Lucky Lindy",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669549208/platos-peach-video/Lucky_Lindy_eae9fe.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1902-02-04",
      //     endDate: "1974-08-26",
      //     category: ["biography"],
      //     meta: "In 1927, Charles Lindbergh became a household name when he successfully flew from New York to Paris in The Spirit of St. Louis aircraft. This 3-minute video explains all.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Spy Behind Home Plate",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669726456/platos-peach-video/The_Spy_Behind_Home_Plate_crsgfi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1902-03-02",
      //     endDate: "1972-05-29",
      //     category: ["american history", "  great depression"],
      //     meta: "Moe Berg was a mediocre journeyman baseball player who leveraged his education and multilingualism to travel to Japan and provide espionage for the FDR administration ahead of the outbreak of WWII.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Tuskegee Syphilis Experiment",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669732427/platos-peach-video/The_Tuskegee_Syphilis_Experiment_xdx7tr.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1932",
      //     endDate: "1972",
      //     category: ["american history", " african american history"],
      //     meta: "From 1932 to 1972, the Tuskegee Syphilis Experiment was a study conducted by the U.S. Public Health Service to study the progression of humans infected with untreated syphilis.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ronald Reagan",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669570776/platos-peach-video/Ronald_Reagan_okmcfx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1911",
      //     endDate: "2004",
      //     category: ["american history", " american 1980s"],
      //     meta: "Ronald Reagan was an Actor, President of the Screen Actors Guild, Governor of California and President of the United States. An Assassination Attempt was made on his life during his first 100 days in office.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Babe Didrikson Zaharias",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669511821/platos-peach-video/Babe_Didrikson_Zaharias_kl5lyo.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1911-06-26",
      //     endDate: "1956-09-27",
      //     category: ["biography"],
      //     meta: "Babe Didrikson Zaharias was a record-breaking track and field athlete, olympian, professional golfer, musician, and undeniably one of the most talented people in history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Jutland",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669589768/platos-peach-video/The_Battle_of_Jutland_vvwrvy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1916-05-31",
      //     endDate: "1916-06-01",
      //     category: ["military history", " world war one"],
      //     meta: "On May 31st, 1916, Germany's armada would meet British warships in WWI's battle of Jutland, the largest and possibly last battle fought entirely at sea.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Brusilov Offensive",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669598920/platos-peach-video/The_Brusilov_Offensive_ldmqgd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1916-06-04",
      //     endDate: "1916-09-20",
      //     category: ["military history", " world war one"],
      //     meta: "The Brusilov Offensive was led by Russian General Aleksei Brusilov and was intended to divert Germany's troops from Verdun. Beginning on June 4th, 1916, the summer offensive would cost nearly 2 million lives, one of the deadliest military events in history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Louis Zamperini",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669548756/platos-peach-video/Louis_Zamperini_Survives_the_Uniaginable_s0bua9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1917-01-26",
      //     endDate: "2014-07-02",
      //     category: ["military history", " world war two"],
      //     meta: "A smoker from the age of 5, olympic running was an unlikely path for Louis Zamperini. Unfortunately, too was surviving a plane crash, 47 days at sea, and war camps, but these were real scenarios for Louis.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Doughboys of the First World War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669524257/platos-peach-video/Doughboys_of_World_War_One_pwrpyq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1917-03-06",
      //     endDate: "1918-11-11",
      //     category: ["american history", " world war one"],
      //     meta: "American troops were assigned the nickname 'doughboys' in WW1 although the origins are not entirely known, many statues have been erected to commemorate the American Expeditionary Forces.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Robert Wadlow, the Tallest Man on Earth",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669570222/platos-peach-video/Robert_Wadlow_The_Tallest_Man_on_Earth_pzatmc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1918-02-22",
      //     endDate: "1940-07-15",
      //     category: ["biography"],
      //     meta: "Robert Wadlow, the tallest man in the world, suffered from an overactive pituitary condition causing him to grow to 8 feet, 4 inches with a shoe size of 40.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The 19th Amendment",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669579376/platos-peach-video/The_19th_Amendment_nr8sky.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919",
      //     endDate: "1920",
      //     category: ["american history", " womens suffrage"],
      //     meta: "The 19th Amendment granting American women the right to vote was finally signed into law on August 26, 1920, after decades of efforts on behalf of the Women's suffrage movement.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Edmund Hillary: The First Man at the Top of the World",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669525502/platos-peach-video/Edmund_Hillary_The_First_Man_at_the_Top_of_the_World_q6hveq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919-07-20",
      //     endDate: "2008-01-11",
      //     category: ["biography"],
      //     meta: "After WWII, Edmund Hillary dedicated himself to mountaineering, including the yet unachieved crown jewel of mountain climbing—first to climb Mount Everest.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "George Wallace",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669531478/platos-peach-video/George_Wallace_qdgjjg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919-08-25",
      //     endDate: "1998-09-13",
      //     category: ["biography"],
      //     meta: "George Wallace was elected to the Alabama governorship four times on a platform of segregation before ultimately renouncing his segregationist ideology and seeking reconciliation with civil rights leaders.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "League of Nations",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669547286/platos-peach-video/League_of_Nations_ndi1jb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1920-01-10",
      //     endDate: "1946-04-19",
      //     category: ["military history", " world war one"],
      //     meta: "After WWI, the League of Nations was organized to place limits on the horrors of war, such as the use of chemical and biological weapons. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Albert Schatz, The Biggest Loser in Scientific Discovery",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669507307/platos-peach-video/Albert_Schatz_The_Biggest_Loser_in_Scientific_Discovery_ax2cis.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1920-02-02",
      //     endDate: "2005-01-17",
      //     category: ["biography"],
      //     meta: "Albert Schatz, the scientist who discovered streptomycin, only to have all discovery credit go to Selman Waksman, who would win the Nobel Prize for the discovery — never once giving proper credit to Schatz.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Alan Shepard: First American in Space",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669506657/platos-peach-video/Alan_Shepard_The_First_American_in_Space_jjrmdg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1923-10-18",
      //     endDate: "1998-07-21",
      //     category: ["biography"],
      //     meta: "Selected as one of the original Mercury Seven astronauts in 1959, Alan Shepard proved to be the the right stuff on May 5th, 1961 when he piloted his Mercury-Redstone 3 rocket into space.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Margaret Thatcher",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669549803/platos-peach-video/Magaret_Thatcher_fd8gjx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1925-10-13",
      //     endDate: "2013-04-08",
      //     category: ["biography"],
      //     meta: "Margaret Thatcher was a lawyer who ascended to Prime Minister of England, taking control of the Conservative Party leadership in 1979. Thatcher would face down the Soviet Union during the Cold War, return Hong Kong to the Chinese and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Orlando: Virginia Woolf's Seminal Novel",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669741957/platos-peach-video/Virginia_Woolf_s_Seminal_Novel_Orlando_u61omp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1928-10-11",
      //     endDate: "1928-10-11",
      //     category: ["art", " literature"],
      //     meta: "Virginia Woolf's groundbreaking novel entitled Orlando, which was ahead of its time in terms of understanding fluid sexual orientation and transgenderism.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Martin Luther King Jr.",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669552890/platos-peach-video/Martin_Luther_King_Jr_spmlsj.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1929-01-15",
      //     endDate: "1968-04-04",
      //     category: ["biography"],
      //     meta: "Martin Luther King, Jr was raised by a family of pastors and educated in theology before becoming a leading civil rights activist, Nobel Peace Prize winner, and martyr for racial activism. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "James Dean",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669540613/platos-peach-video/James_Dean_bhmj8m.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1931",
      //     endDate: "1955",
      //     category: ["american history", " american 1950s"],
      //     meta: "James Dean was a struggling actor in Hollywood working as a parking lot attendant before starring in three popular films released within a two-year period, leading to two posthumous Academy Award nominations.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Galloping Gertie",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669530645/platos-peach-video/Galloping_Girdie_ywvlzi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1940-11-07",
      //     endDate: "1940-11-07",
      //     category: ["geography"],
      //     meta: "Tacoma Narrows Bridge, or Galloping Gertie as it was nicknamed, collapsed in 1940 marking one of the biggest engineering failures of suspension bridge construction.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Pearl Harbor",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669566428/platos-peach-video/Pearl_Harbor_qf8qxs.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1941-12-07",
      //     endDate: "1941-12-07",
      //     category: ["military history", " world war two"],
      //     meta: "Japan's attack on Pearl Harbor took months of planning and practice before 8:00 AM on Sunday, December 7th, 1941, when Japanese warplanes filled the sky over Honolulu, Hawaii, wreaking havoc on the American’s idle and unsuspecting Pacific Fleet. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "America Enters World War Two",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669509701/platos-peach-video/American_Enters_World_War_Two_iqnv4m.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1941-12-07",
      //     endDate: "1941-12-07",
      //     category: ["military history", " world war two"],
      //     meta: "December 8, 1941, the day after the Japanese attack on Pearl Harbor, the US enters WWII. The war would drag on until September of 1945.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "How Detroit Out Built Her Enemies During World War Two",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669538533/platos-peach-video/How_Detroit_Out_Built_her_Enemies_During_WW2_qtlhgi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1939",
      //     endDate: "1945",
      //     category: ["military history", " world war two"],
      //     meta: "Detroit automakers showcased their industrial supremacy when they shifted production from cars to war machines to aid allied victory in World War II.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Muhammad Ali",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669557479/platos-peach-video/Muhammed_Ali_ameyan.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942-01-17",
      //     endDate: "2016-06-03",
      //     category: ["biography"],
      //     meta: "Muhammad Ali, the only three-time lineal champion of the heavyweight division, who beat 21 heavyweight boxers to cement his place into the history books of sport highlights.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Imperial Japanese Navy Bombs America",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669696353/platos-peach-video/The_Imperial_Japanese_Navy_Bombs_America_afd5ae.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942-09-09",
      //     endDate: "1942-09-09",
      //     category: ["military history", " world war two"],
      //     meta: "The only Japanese bombing on the continental United States during WWII occurred outside of Brookings, Oregon. Two incendiary bombs intent on starting wildfires failed.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The French Sink their Own Navy",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669679239/platos-peach-video/The_French_Sink_Their_Own_Navy_xbky2u.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942-11-27",
      //     endDate: "1942-11-27",
      //     category: ["military history", " world war two"],
      //     meta: "In Toulon, 1942, the French had to sink their own naval fleet to keep it out of Nazi control. Out of 164 vessels, 77 were successfully scuttled before German capture.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "A Big Week for the Allied Air War in Europe",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669496992/platos-peach-video/A_Big_Week_for_the_Allied_Air_War_in_Europe_syduuz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1944-02-20",
      //     endDate: "1944-02-25",
      //     category: ["military history", " world war two"],
      //     meta: "In 1944, the Allied Air Forces sacrificed bombers as bait to engage the Luftwaffe with the P-51 Mustang in Operation Argument, becoming a big week in the allies campaign for air superiority.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Kamikaze Attacks of WWII",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669545147/platos-peach-video/Kamikaze_Attacks_of_World_War_Two_hufwsm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1944-06-20",
      //     endDate: "1945-09-02",
      //     category: ["military history", " world war two"],
      //     meta: "Kamikaze pilots of WW2 were Japanese airmen who intentionally crashed their explosive-laden fighter planes into Allied naval warships.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Operation Aphrodite Goes Horribly Wrong",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669560626/platos-peach-video/Operation_Aphrodite_Goes_Horribly_Wrong_ngc1wh.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1944-08-04",
      //     endDate: "1945-01-01",
      //     category: ["military history", " world war two"],
      //     meta: "Major General Jimmy Doolittle proposed converting aging B-17 bombers into remote-controlled bombs, codenamed Operation Aphrodite. In one such mission, Joseph P. Kennedy, Jr. was killed in action when the bombs detonated before he could bail out.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Yalta Conference and the Fate of Post-War Europe",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669737037/platos-peach-video/The_Yalta_Conference_ezquvh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-02-04",
      //     endDate: "1945-02-11",
      //     category: ["military history", " world war two"],
      //     meta: "In February of 1945, the Big Three Allied leaders decided the post-WWII fate of Germany and Nazi-occupied Europe at the Yalta Conference.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "A Standout Hero at Hacksaw Ridge",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669505501/platos-peach-video/A_Standout_Hero_at_Hacksaw_Ridge_b7t23n.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-04-01",
      //     endDate: "1945-06-22",
      //     category: ["military history", " world war two"],
      //     meta: "Desmond T. Doss was a United States Army corporal who served as a combat medic during World War II. He was a 'conscientious cooperator' and refused to carry a weapon or kill anyone, instead choosing to serve as a medic, most famously as a hero at Hacksaw Ridge.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Last Days of Adolf Hitler",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669699951/platos-peach-video/The_Last_Days_of_Adolph_Hitler_vc27wa.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-04-22",
      //     endDate: "1945-04-30",
      //     category: ["world war two", " biography"],
      //     meta: "In early 1945, Nazi Germany was on the brink of total military collapse sending Adolf Hitler into an erratic downfall. Hitler's last days were spent trying to execute perceived enemies within his cabinet and marrying longtime girlfriend Eva Braun before they both took their own lives.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "An American Aircrew's Miraculous Final Flight",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669510336/platos-peach-video/An_American_Aircrew_s_Miraculous_Final_Flight_x36c30.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-04-24",
      //     endDate: "1945-05-07",
      //     category: ["military history", " world war two"],
      //     meta: "Having survived eight emergency landings and one shoot down, on the final day of the air war in Europe, the B-24 crew of ten men sustained highly accurate German anti-aircraft artillery fire, taking out three of their four engines. All ten men would survive the crash landing and find adventure waiting for their journey home.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Sabrejet's Role in the Korean War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669721077/platos-peach-video/The_Sabrejet_s_Role_in_the_Korean_War_cxxgrx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1950-06-25",
      //     endDate: "1953-07-27",
      //     category: ["military history", " korean war"],
      //     meta: "The North American F-86 Sabre swept-wing fighter plane exerted air supremacy over the Soviet's MiG-15 fighter during the Korean War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Osan",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669591087/platos-peach-video/The_Battle_of_Osan_igae6t.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1950-07-05",
      //     endDate: "1950-07-05",
      //     category: ["military history", " korean war"],
      //     meta: "The Battle of Osan was in defense of South Korea from the 89,000 troops from the North Korean People's Army that captured the Capital city of Seoul. The battle exposed the poor training and preparedness on behalf of the U.S. troops who were defeated by North Koreans. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Inch’on",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669589202/platos-peach-video/The_Battle_of_Inch_on_etjo87.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1950-09-15",
      //     endDate: "1950-09-19",
      //     category: ["military history", " korean war"],
      //     meta: "The battle of Inchon, or Inch'on, was a decisive engagement during the Korean War where allied forces led by General Douglas MacArthur successfully neutralized North Korean troops and liberated Seoul, South Korea.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Bloody Ridge",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669586255/platos-peach-video/The_Battle_of_Bloody_Ridge_oegsxp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1951-08-19",
      //     endDate: "1951-09-05",
      //     category: ["military history", " korean war"],
      //     meta: "The battle of bloody ridge was a Korean War engagement between the Republic of Korea Army and the U.S. 8th Army regiment, against the Chinese People's Volunteer Army and North Korean communist fighters.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Bay of Pigs Invasion",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669594551/platos-peach-video/The_Bay_of_Pigs_Invasion_ynhng3.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1961-04-17",
      //     endDate: "1961-04-20",
      //     category: ["american history", " cold war era"],
      //     meta: "The Bay of Pigs invasion of Cuba to squash Fidel Castro's increasingly communistic-backed regime. JFK failed to approve air and naval support which doomed the invasion.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Cuban Missile Crisis & The Cold War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669602721/platos-peach-video/The_Cuban_Missile_Crisis_and_the_Cold_War_jawloa.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1962-10-16",
      //     endDate: "1962-10-28",
      //     category: ["american history", " cold war era"],
      //     meta: "The Cuban Missile Crisis stands to this day as the closest time the United States ever came to nuclear war.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Day We Lost Charlie",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669603592/platos-peach-video/The_Day_We_Lost_Charlie_tnzgns.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1962-12-22",
      //     endDate: "1962-12-22",
      //     category: ["military history", " vietnam war"],
      //     meta: "A tragic event leads to the loss of a beloved family member, Charlie, and the family struggles to cope with their grief and find a way to move forward.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Teenage Castaways of 'Ata Island",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669728841/platos-peach-video/The_Teenage_Castaways_of_Ata_Island_m0zyud.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1965-06-14",
      //     endDate: "1966-08-11",
      //     category: ["world history"],
      //     meta: "In 1965, six friends from Tonga attempted sailing to New Zealand, but a storm derailed their plans, leaving them shipwrecked on 'Ata Island and forcing them to survive for 15 months until being miraculously rescued.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Tet Offensive",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669729095/platos-peach-video/The_Tet_Offensive_of_1968_jo8jzq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1968-01-31",
      //     endDate: "1968-09-23",
      //     category: ["military history", " vietnam war"],
      //     meta: "Catching American Generals and GIs completely off guard, The Tet Offensive during the Vietnam War, when Viet Cong soldiers broke a truce and invaded over 100 cities in South Vietnam.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Woodstock Music & Arts Festival",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669736219/platos-peach-video/The_Woodstock_Music_Arts_Festival_n5qeoh.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1969-08-15",
      //     endDate: "1969-08-18",
      //     category: ["american history", " american 1960s"],
      //     meta: "Marking the end of the counter-culture era, Woodstock was a 3-day festival 40-miles outside of Woodstock, New York. Over-capacity crowds took advantage of the major headlining performers in this historic free concert.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Fall of Saigon",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669608478/platos-peach-video/The_Fall_of_Saigon_vuork0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1975-04-30",
      //     endDate: "1975-04-30",
      //     category: ["military history", " vietnam war"],
      //     meta: "Fall of Saigon in 1975 when Communist-backed North Vietnamese forces overthrew the city, forcing Americans and South Vietnamese sympathizers to flee for their lives.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Iran Hostage Crisis",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669697477/platos-peach-video/The_Iran_Hostage_Crisis_gunlu6.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1979-11-04",
      //     endDate: "1981-01-20",
      //     category: ["american history", " american 1970s"],
      //     meta: "The Hostage Crisis in 1979, when revolutionary Iranian students stormed the US Embassy in Tehran, taking 52 Americans hostage for 444 days of forced captivity.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Resurrection of Mary Rose",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669718694/platos-peach-video/The_Ressurection_of_Mary_Rose_lxuhnh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1982-11-11",
      //     endDate: "2013-04-29",
      //     category: ["world history"],
      //     meta: "The Mary Rose ship, Henry VIII's treasured ship and Britain's first dedicated warship was sunk during a naval battle against the French in 1545. The wreckage resurrected in 1982.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Exxon Valdez Oil Spill",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669607469/platos-peach-video/The_Exxon_Valdez_Oil_Spill_tazq4h.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1989-03-24",
      //     endDate: "1992-06-15",
      //     category: ["geography"],
      //     meta: "On March 23rd, 1989, the Exxon Valdez supertanker left Alaska with 53 million gallons of crude oil, soon colliding into a well-known reef before excreting 11 million gallons of crude oil into Prince William Sound.  The ecological and economic devastation that followed was unprecedented at the time in maritime history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Alexander The Great",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669508580/platos-peach-video/Alexander_The_Great_xntx1i.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "0356-07-20",
      //     endDate: "0323-06-10",
      //     category: ["ancient history", " greece"],
      //     meta: "Alexander the Great was born into royalty in Macedonia, educated by Aristotle, and would ascend to the Macedonian throne after his father was assassinated, building one of the largest empires of his time.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Iron Age",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669698262/platos-peach-video/The_Iron_Age_iok0j4.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-1,201",
      //     endDate: "-550",
      //     category: ["ancient history", " prehistory"],
      //     meta: "The Iron Age is argued by scholars to have started around 1200 BCE after shortages of copper and tin led to the forging of stronger metals, iron and carbon, into steel. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Minoan Eruption of Thera",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669707703/platos-peach-video/The_Minoan_Eruption_of_Thera_feepjk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-1,600",
      //     endDate: "-1,600",
      //     category: ["ancient history", " prehistory"],
      //     meta: "Although the exact date is debated, the Thera eruption shot magma 20-miles high, caused a tsunami, and devastated the Minoan civilization.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Neolithic Revolution",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669710308/platos-peach-video/The_Neolithic_Revolution_tjguux.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-10,000",
      //     endDate: "-4500",
      //     category: ["ancient history", " prehistory"],
      //     meta: "The Neolithic Revolution is considered the last period of the New Stone Age and a critical turning point in humanity, witnessing the staggered birth of agriculture and animal husbandry, while converting nomadic hunter-gatherers into sedentary villagers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mesolithic Period of Early Man",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669706314/platos-peach-video/The_Mesolithic_Period_of_Early_Man_y4k4no.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-10,000",
      //     endDate: "-8,000",
      //     category: ["ancient history", " prehistory"],
      //     meta: "The Mesolithic period is nestled between the Paleolithic and Neolithic periods and saw the rise of agriculture and animal husbandry to replace the prevailing hunter-gatherer culture, which archeologists and historians believe was an unevenly-embraced advance.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Christmas Trees",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669687985/platos-peach-video/The_History_of_Christmas_Trees_ya0lub.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-1000",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "From ancient Egyptian palm fronds, to early humans honoring the solstice with evergreen boughs, these origins of the Christmas tree led to its modern day popularity.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Seven Natural Wonders of the World",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669723325/platos-peach-video/The_Seven_Natural_Wonders_of_the_World_jhkwkf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-100000000",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The list of seven natural wonders of the world includes the tallest peak to the ocean floor, massive volcanoes and canyons formed by geologic history, meteorological phenomenon and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Yosemite",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669745849/platos-peach-video/Yosemite_jti5vu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-100000000",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Yosemite national park consists of 1,187 square miles in California, 95% of which is designated remote wilderness. Every year as many as five million visitors come to see a small sliver of Yosemite Valley.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Gladiators of Ancient Rome",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669532708/platos-peach-video/Gladiators_of_Ancient_Rome_jaoreg.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-105",
      //     endDate: "404",
      //     category: ["ancient history", " rome"],
      //     meta: "The Gladiators of Rome were popular attractions around the 1st century A.D. luring bloodthirsty crowds to arenas like the Colosseum to witness the fight to the death combat and animal slaying.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Genghis Khan",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669531272/platos-peach-video/Genhkis_Kahn_udxnuv.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-1162",
      //     endDate: "-1227",
      //     category: ["ancient history", " china"],
      //     meta: "Born in 1162, Genghis Khan became a prolific conqueror, controlling more than twice as much geography as any other person in history, until his death from injuries sustained during battle.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Trojan War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669731350/platos-peach-video/The_Trojan_War_yb7ahi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-1194",
      //     endDate: "-1184",
      //     category: ["military history", " trojan war"],
      //     meta: "After Queen Helen of Sparta eloped with Prince Paris of Troy, King Menelaus convinced his brother Agamemnon to lead a massive retrieval expedition, resulting in the storied events including the deaths of Prince Hector and Achilles and the Trojan Horse.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Silk Road to China",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669724531/platos-peach-video/The_Silk_Road_xmaohn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-130",
      //     endDate: "1453",
      //     category: ["world history", " china"],
      //     meta: "Despite the Silk Road’s obvious link to the trade of Chinese silks, the term “Silk Road” wasn’t coined until 1877. From commodities like vegetables and leather to intangibles like language, culture and philosophy, the Silk Routes were operational from 130 BCE to 1453 when trade with China was banned by the Ottoman Empire. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Mardi Gras",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669690738/platos-peach-video/The_History_of_Mardi_Gras_bvfymw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-133",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Mardi Gras is French for 'Fat Tuesday,' and many scholars believe that Mardi Gras has its roots in the ancient pagan ritual of Saturnalia, which celebrated the coming of spring and the subsequent fertility of plants, animals and humans.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Nefertiti",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669559527/platos-peach-video/Nefertiti_u5rgna.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-1370",
      //     endDate: "-1330",
      //     category: ["ancient history", " egypt"],
      //     meta: "Nefertiti was the queen of Egypt from 1370 to 1330 BCE due to her marriage to Amenhotep IV. Her disappearance from the historical record during Amenhotep's reign has led to speculation of a co-regency in ancient Egypt.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mesopotamia and the Fertile Crescent",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669555240/platos-peach-video/Mesopotamia_and_the_Fertile_Crescent_hfgirm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-14000",
      //     endDate: "-539",
      //     category: ["ancient history", " mesopotamia"],
      //     meta: "Human life and civilization thrived for more than 6,000 years in the fertile crescent known as Mesopotamia, Greek for between two rivers. Agriculture, irrigation, livestock, the wheel, and alcohol are all believed to originate from Mesopotamia.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hatshepsut, The Queen That Would Be King",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669534762/platos-peach-video/Hatshepsut_The_Queen_That_Would_Be_King_emtwpy.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-1479",
      //     endDate: "-1458",
      //     category: ["ancient history", " egypt"],
      //     meta: "Ruling from 1479 to 1458 BCE, Hatshepsut was Queen to Pharoah Thutmose II who died with a young heir, Thutmose III, giving Hatshepsut the opportunity to usurp power.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Shang Dynasty",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669723644/platos-peach-video/The_Shang_Dynasty_gjjcpr.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-1600",
      //     endDate: "-1046",
      //     category: ["ancient history", " china"],
      //     meta: "The Shang Dynasty is responsible for the earliest written records in China and first to use a 365-day calendar. The Kings built palaces, defensive walls, and also functioned as the high priest.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hanukkah",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669533698/platos-peach-video/Hanukkah_q8opy9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-166",
      //     endDate: "Present",
      //     category: ["world religions", " judaism"],
      //     meta: "Hanukkah, or the Festival of Lights, celebrates Judah's liberation of Judaism in Israel when there was only enough oil to light the menorah for one day, but it burned for eight.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Code of Hammurabi",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669600747/platos-peach-video/The_Code_of_Hammurabi_mltejb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-1810",
      //     endDate: "-1750",
      //     category: ["ancient history", " mesopotamia"],
      //     meta: "The Code of Hammurabi is an ancient Mesopotamian code of law first composed in 1754 BC and consisting of 282 laws spanning social engagement to contract law and the applicable punishments.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Gods of Anunnaki",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669681339/platos-peach-video/The_Gods_of_Anunnaki_wtjrd0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-19000",
      //     endDate: "500",
      //     category: ["world religions", " world history"],
      //     meta: "The Anunnaki are a group of deities who appear in the mythological traditions of the ancient Sumerians, Akkadians, Assyrians and Babylonians.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Paleolithic Period",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669714189/platos-peach-video/The_Paleolithic_Period_uviazn.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-2,500,000",
      //     endDate: "-10,000",
      //     category: ["ancient history", " prehistory"],
      //     meta: "The Paleolithic Period in early human history saw the slow adoption of stone tools, increasing survival and productivity rates of hominins starting 3.3 million years ago to the end of the Pleistocene Epoch, approximately 11,650 years ago.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Native Americans and the Buffalo",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669558981/platos-peach-video/Native_Americans_and_the_Buffalo_c7nilx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-200000",
      //     endDate: "1884",
      //     category: ["american history", " native american history"],
      //     meta: "Between 1830 and 1885, European-Americans killed more than 40 million buffalo--an animal heavily depended upon by Native Americans for every aspect of their survival. An Army colonel once said to a guilt-ridden hunter, 'Kill every buffalo that you can. Every buffalo dead is an Indian gone.'",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Han Dynasty",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669533430/platos-peach-video/Han_Dynasty_qr8diw.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-202",
      //     endDate: "-220",
      //     category: ["ancient history", " china"],
      //     meta: "After the Qin Empire fell, Liu Bang became the first Han Dynasty emperor in 202 B.C. The Han Dynasty brought the birth of paper and advances in writing and art until it lost control in 220 A.D. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "History of Hong Kong",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669689248/platos-peach-video/The_History_of_Hong_Kong_l1irqm.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-210",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The modern history of Hong Kong is rooted in the Opium Wars, which resulted in Britain obtaining a 99-year lease on the territory, establishing a financial hub for decades before repatriating Hong Kong to the People's Republic of China in 1997. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Basic Practices of Hinduism",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669585338/platos-peach-video/The_Basic_Practices_of_Hinduism_no1pvi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-2300",
      //     endDate: "Present",
      //     category: ["world religions", " hinduism"],
      //     meta: "Third-largest and arguably the oldest world religion, hinduism embraces a main deity known as the Brahman, as well as practicing Karma, Dharma, and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Leap Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669547531/platos-peach-video/Leap_Day_mbfkyc.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-239",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "Astronomically speaking, Earth's orbit of the Sun takes precisely 365.2421 days — the extra quarter of a day per year necessitating a leap day in the Gregorian calendar every four years to avoid seasonal shift. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "History of Jack O'Lanterns",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669689964/platos-peach-video/The_History_of_Jack_O_Lanterns_rhp9km.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-2500",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "The history of Jack O' Lanterns dates back to the Irish legend of 'Stingy Jack' who swindled the Devil twice and was turned away from both Heaven and Hell, cursed to roam the afterlife with a dimly lit piece of coal; Inspiring the practice of carving pumpkins to ward off evil spirits.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Pyramids of Giza",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669684946/platos-peach-video/The_Great_Pyramids_of_Giza_mmc9bc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-2589",
      //     endDate: "-2566",
      //     category: ["ancient history", " egypt"],
      //     meta: "The great pyramids of Giza, near modern-day Cairo, Egypt, were built for Pharaoh Khufu with the belief that the king's body and supplies would ascend together into heaven.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Mayans",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669705699/platos-peach-video/The_Mayans_ww56e9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-2600",
      //     endDate: "900",
      //     category: ["european history", " age of exploration"],
      //     meta: "The Mayans were a dominant civilization in Mesoamerica from 1800 BCE until they mysteriously vanished around 900 AD, leaving behind archeological ruins and societal impact that still reverberates today.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Punic Wars",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669717319/platos-peach-video/The_Punic_Wars_q3shpy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-264",
      //     endDate: "-146",
      //     category: ["military history", " punic wars"],
      //     meta: "The Punic Wars, lasting between 264 and 164 B.C.E, were a series attacks on the Carthaginians by the growing Roman Empire, ultimately resulting in Rome's borders expanding significantly.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Legend of Werewolves",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669700962/platos-peach-video/The_Legend_of_Werewolves_u3rias.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-2700",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "Scholars argue over the origins of the legend of werewolves, from The Epic of Gilgamesh to Nordic folklore, the belief in lycanthropy, or humans that shape-shift into a wolf, has been popular throughout history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Malaria",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669550353/platos-peach-video/Malaria_frnovm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-2700",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Malaria was one of the worst killers of mankind until its etiology was figured out by scientists in the 19th and 20th Centuries.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Stonehenge",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669577423/platos-peach-video/Stonehenge_hydv5j.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-3,000",
      //     endDate: "-1,500",
      //     category: ["ancient history", " prehistory"],
      //     meta: "Stonehenge is located on the Salisbury Plain of southern England and was started more than 5,000 years ago using primitive tools and unknown methods for moving and erecting multi-ton, non-native stones. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Stone Age of Early Man",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669727458/platos-peach-video/The_Stone_Age_of_Early_Man_nx93hf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-3,300.00",
      //     endDate: "-2,600",
      //     category: ["ancient history", " prehistory"],
      //     meta: "The stone age is believed to have begun 2.6 million years ago and is divided into the Paleolithic, Mesolithic, and Neolithic periods. Evidence has been found for the tools, diet, art, and communication of early humans.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Holy City of Jerusalem",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669694307/platos-peach-video/The_Holy_City_of_Jerusalem_dmvwhj.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-3500",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Jerusalem is one of the oldest cities in the world, and one of the holiest sites for Judaism, Christianity and Islam. It was first settled around 3500 BCE during the Early Bronze Age and has since been the target of control by many.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Ancient Folklores of Halloween",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669583617/platos-peach-video/The_Ancient_Folklores_of_Halloween_sussbq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-3700",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "From witches and werewolves to zombies and the devil himself, the folklore surrounding Halloween and the ancient Celtic festival of Samhain date back as far as 6,000 years ago.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Traditions of Passover",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669730215/platos-peach-video/The_Traditions_of_Passover_z9dov4.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-400",
      //     endDate: "Present",
      //     category: ["world religions", " judaism"],
      //     meta: "The longest-lasting tradition of the Jewish calendar, the week-long Passover commences with the Seder where family and friends come together to eat Jewish foods, read the Haggadah, and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Seven Wonders of the Ancient World",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669723513/platos-peach-video/The_Seven_Wonders_of_the_Ancient_World_pde3lm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-435",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The Seven Wonders of the ancient world are structures with evidence or documentation of early civilization's advanced and bewildering abilities for construction, during a technologically primitive time period. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ides of March",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669695892/platos-peach-video/The_Ides_of_March_adfzjd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-44",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "After Shakespeare's chilling words, 'Beware the Ides of March,' the 15th of March has since been a day synonymous with bad luck. From wars, deadly weather, and viruses, we should all indeed, beware the Ides of March. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Parthenon",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669714888/platos-peach-video/The_Parthenon_oqt9ht.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-447",
      //     endDate: "-432",
      //     category: ["ancient history", " greece"],
      //     meta: "The Parthenon was constructed atop the Acropolis in Athens, Greece between 447 and 432 B.C.E. It has had many purposes, served multiple religions and withstood numerous attacks and natural disaster.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Copper Age",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669602387/platos-peach-video/The_Copper_Age_lsxw6y.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-4500",
      //     endDate: "-2000",
      //     category: ["ancient history", " prehistory"],
      //     meta: "The 1,000-year-long Copper Age, wedged between the Neolithic and Bronze ages, was distinguished by the earliest uses of copper and gold for weapons, tools, jewelry, art and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Socrates",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669574823/platos-peach-video/Socrates_rrfw4z.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-470",
      //     endDate: "-399",
      //     category: ["ancient history", " greece"],
      //     meta: "Socrates was born and raised in the golden age of Athens, studying the writings of contemporary Greek philosophers. Leaving no written records himself, thankfully his students included Plato and historian Xenophon, who wrote down the Socratic Technique and more lessons from Socrates. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Gaelic Festival of Samhain",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669679528/platos-peach-video/The_Gaelic_Festival_of_Samhain_szid3g.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-478",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Samhain is the more than 3,000-year-old Celtic tradition of celebrating life-giving harvests and respect for the dead. Rituals and offerings are made to evil spirits to this day in the Gaelic festival of Samhain.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Leonidas and the Spartan 300",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669548028/platos-peach-video/Leonidas_and_the_Spartan_300_tqxl8z.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-489",
      //     endDate: "-480",
      //     category: ["ancient history", " greece"],
      //     meta: "Trained as a hoplite warrior himself, King Leonidas fought in two Persian invasion attempts during his reign over Sparta. During the Second Persian War, Persian King Xerxes faced Leonidas in the Battle of Thermopylae, where Leonidas and the Spartan 300 fought to the death after King Xerxes outmaneuvered Leonidas' high-ground advantage. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Acropolis",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669579577/platos-peach-video/The_Acropolis_llsbya.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-495",
      //     endDate: "-429",
      //     category: ["ancient history", " greece"],
      //     meta: "The Acropolis of Athens consists of four hills atop the Attica plateau and has been occupied for thousands of years, destroyed during times of war, and rebuilt during times of Greek prosperity. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Anatomy of Tornadoes",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669583164/platos-peach-video/The_Anatomy_of_Tornadoes_vcnjpn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-5000000",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Tornadoes, also known as twisters, are made up of a violently rotating column of air that makes contact with both Earth and a cumulus or cumulonimbus cloud. A tornado can take many forms and are common in the Central United States in springtime.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mount Everest",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669556657/platos-peach-video/Mount_Everest_ktccwd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-55,000,000",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Mount Everest is the highest mountain above sea level at more than 29 thousand feet tall. Split by the border of China and Nepal, nearly 7,000 summits have been recorded with more than 300 deaths.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Satan",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669572651/platos-peach-video/Satan_hr9knk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-550",
      //     endDate: "Present",
      //     category: ["world religions", " world history"],
      //     meta: "The existence of Satan—or the Devil—has been deeply embedded in religion, making an appearance in the Old Testament’s Book of Genesis in the form of a serpent whose temptation of Eve and later Adam, led to their expulsion from the Garden of Eden.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Mirrors",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669691700/platos-peach-video/The_History_of_Mirrors_tmepup.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-6,200",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "One of the earliest human endeavors has been gazing at one's reflection and developing technology to do so more clearly. The history of mirrors dates back to polished obsidian in 5th century Turkey and beyond.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Cleopatra",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669521922/platos-peach-video/Cleopatra_sxglb7.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-69",
      //     endDate: "-30",
      //     category: ["ancient history", " egypt"],
      //     meta: "Cleopatra the 7th was known for her exotic beauty and powers of seduction during her three-decade reign over Egypt, despite repeated attempts to overthrow her rule.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sudden Death at Pompeii",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669577940/platos-peach-video/Sudden_Death_at_Pompeii_fjuuas.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-740",
      //     endDate: "79",
      //     category: ["ancient history", " rome"],
      //     meta: "The once wealthy and vibrant Italian city of Pompeii was destroyed over a two-day period when Mount Vesuvius erupted in 79 AD.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Ancient Civilization of Sparta",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669583411/platos-peach-video/The_Ancient_Civilization_of_Sparta_m5lmyj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-900",
      //     endDate: "-192",
      //     category: ["ancient history", " greece"],
      //     meta: "The civilization of Sparta in ancient Greece was notorious for training their youth to become warriors, while enslaving prisoners to work for their benefit, at the same time giving women equal rights with free men.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Tuberculosis",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669740141/platos-peach-video/Tuberculosis_c6aiik.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-9000",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Still one of the leading causes of infectious death worldwide, the history of tuberculosis is staggering in it's consumptive death toll and human efforts to find a treatment.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Ark of the Covenant",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669583868/platos-peach-video/The_Ark_of_the_Covenant_qgb8s2.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-970",
      //     endDate: "-587",
      //     category: ["world religions", " world history"],
      //     meta: "According to the Hebrew Bible, the Ark of the Covenant was constructed of gold and wood by Moses and the Israelites after they fled Egypt. The location of the Ark is unknown today, despite many theories of its location, making the Ark of the Covenant one of the most important missing artifacts in Judeo-Christian history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Pagan Origins of Halloween",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669714010/platos-peach-video/The_Pagan_Origins_of_Halloween_o9arfc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-978",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Deeply rooted in Celtic tribes, the origins of Halloween stem from their belief in the living and dead roaming freely together, and offering sweets to lure evil spirits away.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Golden Gate Bridge",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669681625/platos-peach-video/The_Golden_Gate_Bridge_nnbfjj.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1933-01-05",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Built in 1937, once the longest main suspension bridge in the world, the Golden Gate Bridge was originally planned to be another color and its toll has experienced a 3,500% price increase.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Groundhog Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669688771/platos-peach-video/The_History_of_Groundhog_Day_csgwwv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1887-02-02",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Groundhog Day originated in Pennsylvania in 1887. It's based on an ancient Celtic holiday, where a badger was used to predict the weather. Now, a groundhog predicts 6 more weeks of winter or an early spring. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Grand Central Station",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669532898/platos-peach-video/Grand_Central_Station_jdhhd3.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1913-02-02",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Grand Central Station, or simply Grand Central, is a New York City train station and the second busiest in the world, behind Manhattan’s Penn Station. The station took 10 years to construct leveraging 10,000 workers and opened in 1913.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Vatican City",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669741328/platos-peach-video/Vatican_City_amxyhb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1929-02-11",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Vatican City is the smallest country in the world with a population of fewer than 1,000 residents and is governed as an absolute monarchy in support of the Pope.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Tax Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669692480/platos-peach-video/The_History_of_Tax_Day_feumyd.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1913-03-01",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "History of income tax started with the Revenue Act of 1861 but was repealed and the Wilson-Gorman Tariff Act was ruled unconstitutional, the 16th amendment was ratified in 1913 granting authority to income tax.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Tōhoku Earthquake of Japan",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669729969/platos-peach-video/The_To%CC%84hoku_Earthquake_of_Japan_lzkicv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2011-03-11",
      //     endDate: "Present",
      //     category: ["world history", " japan"],
      //     meta: "On March 11th, 2011, Japan was hit with a trifecta of tragedy including the Tōhoku earthquake, subsequent Tsunami and the nuclear reactor meltdown of Fukushima. The loss of life, property, and GDP made 3.11 one of the worst events in Japanese history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Empire State Building",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669605589/platos-peach-video/The_Empire_State_Building_gjmcei.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1930-03-17",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The Empire State Building was built in the midst of the Stock Market Crash of 1929 and the subsequent Great Depression of the 1930s. It was the world's tallest skyscraper of its time, measuring 1,250 feet.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of April Fools' Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669687523/platos-peach-video/The_History_of_April_Fools_Day_vgvour.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1700-04-01",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "The history of April fools' day has theories dating back to the 1500s. Today, April 1st is widely known as a day for pranks and hoaxes.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Conspiracy Theories and the Sinking of the Titanic",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669523309/platos-peach-video/Conspiracy_Theories_and_the_Sinking_of_the_Titanic_rbmxsi.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1912-04-15",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "After the unthinkable sinking of the Titanic in 1912, theories of conspiracy among the wealthy and powerful began to emerge to explain the deaths of 1,517 passengers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Cinco de Mayo",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669521337/platos-peach-video/Cinco_de_Mayo_k2owpd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1862-05-05",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Cinco de Mayo, literally the fifth of May, is a holiday that celebrates the date of the Mexican army’s May 5, 1862 victory over France at the Battle of Puebla during the Franco-Mexican War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Memorial Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669596071/platos-peach-video/The_Birth_of_Memorial_Day_z2m9w8.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1868-05-05",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "In honor and memory of all the brave men and women who sacrificed everything so that we can live the American dream. The history of Memorial Day dates back to 1868, after the Civil War claimed the lives of 620,000 Americans, General John A. Logan called for a nationwide day of remembrance.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Bikini Swimsuit Comes of Age",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669595870/platos-peach-video/The_Bikini_Swimsuit_Comes_of_Age_nqyezf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1946-05-01",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The bikini was named after the first atom bomb was detonated on 'bikini atoll.' French fashion designer Jacque Hain launched bikini history on the world July 5th, 1946.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Burning Ghost Town of Centralia Pennsylvania",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669599146/platos-peach-video/The_Burning_Ghost_Town_of_Centralia_Pennsylvania_msa2rs.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1962-05-01",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "In 1962, a massive seam of underground coal caught fire turning Centralia, Pennsylvania into a burning ghost town. The government seized the land under imminent domain, forcing all but five residents from the town.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Miranda Rights",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669555634/platos-peach-video/Miranda_Rights_ftfbxj.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1966-06-13",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "Miranda Rights became a police procedural on June 13th, 1966, when the U.S. Supreme Court handed down its decision on Miranda v. Arizona, establishing a new law enforcement mandate that all criminal suspects must be advised of their rights before interrogation.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Flag Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669688564/platos-peach-video/The_History_of_Flag_Day_n0semz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1885-06-14",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "When the Revolutionary War broke out in 1775, the forefathers realized the need for an American flag. More than 100 years later, the history of flag day started with a Wisconsin teacher, Bernard Cigrand. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The First Four Presidents to get Sick in the White House",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669677065/platos-peach-video/The_First_Four_Presidents_to_get_Sick_in_the_White_House_heafxs.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1789-06-17",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The first four presidents to get sick in office include #1 George Washington, #9 William Henry Harrison, #22 Grover Cleveland and #28 Woodrow Wilson.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Labor Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669690514/platos-peach-video/The_History_of_Labor_Day_fsyt4d.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1894-06-28",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Labor Day is a national holiday in the United States that celebrates the contributions and achievements of American workers. It was first celebrated in 1882 and became a federal holiday in 1894. The holiday is observed on the first Monday in September and is typically marked by parades, picnics, and other festivities.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Independence Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669689716/platos-peach-video/The_History_of_Independence_Day_dixc2o.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1777-07-04",
      //     endDate: "Present",
      //     category: ["american history", " early republic"],
      //     meta: "On July 2nd, 1776, the Continental Congress voted in favor of Independence from Great Britain and formally adopted the Declaration of Independence on July 4th. Celebrations would ensue and the fireworks (?) tradition was established on the first anniversary.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Washington Monument",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669734741/platos-peach-video/The_Washington_Monument_ylkzml.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1848-07-04",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The Washington Monument was first proposed while George Washington was alive, but showcasing his monumental humility and frugality, he vetoed the project. After multiple funding issues paused construction, the 555-foot-tall obelisk was completed in 1884.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Father's Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669688394/platos-peach-video/The_History_of_Father_s_Day_sicouj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1908-07-05",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Dating back to the early 1900s, the history of Father's Day faced pushback from dads themselves, who viewed the holliday as a commercial gimmick, but in 1956, Congress officially recognized Father's Day. Today, over 121 million fathers in the US will receive more than $16 billion in gifts and love.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Geneva Convention",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669680011/platos-peach-video/The_Geneva_Convention_aoho1h.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1929-07-27",
      //     endDate: "Present",
      //     category: ["military history", " geneva convention"],
      //     meta: "The Geneva Convention was a humanitarian agreement regarding the conduct and treatment of wounded, captured, or civilian enemies of war. First signed in 1859 by 12 nations, today the expanded agreement boasts the involvement of 190 countries.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Charlemagne",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669519964/platos-peach-video/Charlemagne_dimo2d.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "0747-04-02",
      //     endDate: "0814-01-28",
      //     category: ["biography"],
      //     meta: "Charlemagne would lead the Germanic peoples for nearly four decades fervently fighting for Christianity while himself having multiple wives and mistresses. He was crowned the Holy Roman Emperor in 800 and died in 814.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Loch Ness Monster",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669703592/platos-peach-video/The_Loch_Ness_Monster_slufra.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "0564-08-22",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The Loch Ness Monster, a piece of Scottish folklore that locals and tourists have posited since the story was first recorded in the sixth century. In 1934, Robert Kenneth Wilson took the infamous picture of an unknown animal in the loch, leading to further speculation, mystery and myth. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Star-Spangled Banner",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669726720/platos-peach-video/The_Star-Spangled_Banner_xlahld.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "0184-09-14",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "During the War of 1812, as Francis Scott Key watched the British bombardment of Fort McHenry, the amateur poet wrote what would become the star-spangled banner lyrics.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Suez Canal Maritime’s Shortcut Through Egypt",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669727706/platos-peach-video/The_Suez_Canal_ie5mmz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1859-09-25",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The Suez Canal first opened in 1869 after a ten-year construction effort costing the lives of 120,000 people. The 120-mile artificial waterway saves thousands of miles from the previous route around Africa.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Jimmy Carter",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669542499/platos-peach-video/Jimmy_Carter_qizxxt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1924-10-01",
      //     endDate: "Present",
      //     category: ["biography"],
      //     meta: "Jimmy Carter was a state senator and governor of Georgia before being elected as the 39th U.S. President. Carter's single-term presidency would be overshadowed by inflation and a challenging series of foreign affairs.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mount Rushmore",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669556846/platos-peach-video/Mount_Rushmore_gzivki.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1927-10-04",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Mount Rushmore was a project conceived by Doane Robinson to attract tourism to South Dakota. Designed and sculpted by Gutzon Borglum, the monument was completed in 1941. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Legend of Bigfoot",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669701576/platos-peach-video/The_Lengend_of_Bigfoot_fzmsrc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1000",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "Also known as sasquatch, the legend of bigfoot is a widely-known yet little-seen creature with over 4,600 professed sightings and a pseudoscience denomination known as cryptozoology attempting to prove its existence. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Weapons of the Middle Ages",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669742754/platos-peach-video/Weapons_of_the_Middle_Ages_dqh9lo.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1066",
      //     endDate: "1485",
      //     category: ["european history", " medieval"],
      //     meta: "Warriors of the middle ages used a dizzying array of brutal medieval weapons from swords, axes, maces, picks, crossbows, daggers, trebuchets, and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Medieval Warfare",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669554801/platos-peach-video/Medieval_Warfare_otzesv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1066",
      //     endDate: "1485",
      //     category: ["military history", " medieval"],
      //     meta: "As medieval weaponry got more sophisticated, medieval warfare became more fierce and deadly in the quest for power, fortune and control. Castles, armored knights, catapults and trebuchets were all common on the battlefields of the middle ages.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Medieval Architecture",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669554323/platos-peach-video/Medieval_Architecture_vtojpx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1066",
      //     endDate: "1485",
      //     category: ["european history", " medieval"],
      //     meta: "Medieval architecture is still visible in many cathedrals, castles, fortifications and government buildings throughout Europe. The period is further distinguished into Pre-Romanesque, Romanesque, and Gothic styles.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The First Crusade",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669615646/platos-peach-video/The_First_Crusade_esbrbw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1096",
      //     endDate: "1099",
      //     category: ["european history", " medieval"],
      //     meta: "The first Crusade when Medieval Christians attempted to eradicate Muslim control over the Holy Land began in 1096.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Veterans Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669693310/platos-peach-video/The_History_of_Veterans_Day_enpg85.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1938-11-11",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "When WWI ended in 1918, at the eleventh hour of the eleventh day of the eleventh month, Armistice Day, as Veterans Day was originally known, was first celebrated on the first anniversary of the conclusion of “the war to end all wars.”",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Suez Crisis",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669727942/platos-peach-video/The_Suez_Crisis_slkafj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1869-11-17",
      //     endDate: "Present",
      //     category: ["military history", " suez crisis"],
      //     meta: "During the Cold War, Egypt took control of the Suez Canal, causing Britain, France, and Israel to strike Egypt in 1956. Known as the Suez Canal Crisis, the Soviets threatened a nuclear response, while the US used economic sanctions to resolve the conflict.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Angkor Wat",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669510825/platos-peach-video/Angkor_Wat_pisgcf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1113",
      //     endDate: "1142",
      //     category: ["world religions", " world history"],
      //     meta: "Rediscovered in the Cambodian jungle in 1860 by a French Naturalist, Angkor Wat, also known as Temple City, is a 400 acre complex honoring Hindu and Buddhist faiths. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Knights Templar",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669699181/platos-peach-video/The_Knights_Templar_pbeefr.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1119",
      //     endDate: "1312",
      //     category: ["world religions", " christianity"],
      //     meta: "The Knights Templar was a protective order in France that established a dominant network of banks, allowing Christian pilgrims to access their money. The order spread throughout Europe, but was eventually dissolved by King Philip. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Incas",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669696588/platos-peach-video/The_Incas_fnjhxz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1150",
      //     endDate: "1566",
      //     category: ["ancient history", " mesoamerica"],
      //     meta: "The Inca Empire began in the 12th Century and expanded through military conquest and diplomacy to span 2,500 miles from modern-day Ecuador to Chile. The Incan empire was conquered by Spanish explorers seeking rumored gold and riches. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Leaning Tower of Pisa",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669700355/platos-peach-video/The_Leaning_Tower_of_Pisa_hcedet.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1173",
      //     endDate: "Present",
      //     category: ["european history", " world history"],
      //     meta: "The Leaning Tower of Pisa was built over a nearly 200-year period, halted by war and time to settle the unstable subsoil that caused the tower to lean. The tower was used by Galileo, Nazi forces, and as a tourist attraction for millions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Samurai of Feudal Japan",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669721522/platos-peach-video/The_Samurai_of_Feudal_Japan_vzsiof.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1185",
      //     endDate: "1876",
      //     category: ["world history", " japan"],
      //     meta: "Samurai History dates back to the Heian Period of feudal Japan, where the warriors were considered military nobility until national jurisdiction abolished them in 1869.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "World War One Mustard Gas Joins the Fight Against Cancer",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669744923/platos-peach-video/World_War_One_Mustard_Gas_Joins_the_Fight_Against_Cancer_z5ont4.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1943-12-02",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "How scientists discovered that the chemical weapon mustard gas reduced the size of cancer tumors, making it the first chemotherapy agent in medical history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Boxing Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669516641/platos-peach-video/Boxing_Day_wukkx1.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1835-12-26",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Boxing day traces back to a Charles Dickens reference to the holiday in 1833, but its origins are widely disputed. Today, the holiday is known as a day of charity, family, and sporting events. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Marco Polo",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669551604/platos-peach-video/Marco_Polo_guepko.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1254-09-15",
      //     endDate: "1324-01-08",
      //     category: ["biography"],
      //     meta: "Marco Polo's father returned to Venice from travels in Asia when Marco was 15 and would return with Marco, beginning Marco's 17-year journey through the Asian continent. When the Polos returned to Venice, Marco was arrested and his cellmate became his successful biographer.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "William Wallace",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669743686/platos-peach-video/William_Wallace_rs2uzl.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1270",
      //     endDate: "1305-08-23",
      //     category: ["biography"],
      //     meta: "William Wallace was a Scottish knight and freedom fighter who led the Scottish rebellion against English rule in the 13th century. He is remembered as a national hero in Scotland and has been portrayed in film and literature as a symbol of resistance against oppression.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Canyon de Chelly and the Dine Nation",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669518588/platos-peach-video/Canyon_de_Chelly_and_the_Dine_Nation_m8uz2j.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1300",
      //     endDate: "Present",
      //     category: ["american history", " native american history"],
      //     meta: "Canyon de Chelly is a Navajo Nation-owned and operated national park with over 83,000 acres and a continuous lineage of Native American inhabitation. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Day of the Dead",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669603349/platos-peach-video/The_Day_of_the_Dead_njjrtz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1300",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "The Day of the Dead, or Día de los Muertos, is a uniquely Mexican holiday where families honor their dead ancestors with food, drink and celebration. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Medieval Christianity",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669554570/platos-peach-video/Medieval_Christianity_p6ef7v.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1066",
      //     endDate: "1485",
      //     category: ["european history", " medieval"],
      //     meta: "Medieval Christianity was marred by the Crusades and beliefs in sacerdotalism, which gave priests unilateral power to extort peasants and nobles alike for high fees to buy passage into heaven. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Barber's Poles",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669687764/platos-peach-video/The_History_of_Barber_s_Poles_ldvbhd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1308",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "History of barber poles dates back to medieval times when barbers assisted with bloodletting, extracting teeth, and other procedures. Learn why red, white, and blue are common colors and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hundred Years' War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669539010/platos-peach-video/Hundred_Years_War_f5jwqk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1337",
      //     endDate: "1453",
      //     category: ["military history", " hundred years war"],
      //     meta: "The hundred years war fought between France and England during the 116-year period 1337 to 1453 did not end with formal treaty, but the acknowledgement of superiority.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Black Death",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669514919/platos-peach-video/Black_Death_dm4l09.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1346",
      //     endDate: "1352",
      //     category: ["european history", " medieval"],
      //     meta: "The Bubonic Plague, also known as the Black Death of 1347, claimed the lives of one-third of Europe's population. The symptoms, infection rate, death rate, and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Historical Upside to Pandemic Disease",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669687183/platos-peach-video/The_Historical_Upside_to_Human_Pandemics_wclqc9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1347",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Pandemics have had some positive repercussions. The historical upside of past pandemics has spawned bold changes in public health, sanitation, building design, social norms and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Wall of China",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669685394/platos-peach-video/The_Great_Wall_of_China_vb5ynq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1368",
      //     endDate: "1644",
      //     category: ["ancient history", " china"],
      //     meta: "Construction of the Great Wall of China dates back to the 7th Century BCE and continued into the Ming dynasty up to 1644 CE. One of the few manmade structures visible by the naked eye from space.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Easter Island",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669525281/platos-peach-video/Easter_Island_cd2ll9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1400",
      //     endDate: "1650",
      //     category: ["geography"],
      //     meta: "Located 2,300 miles west of South America, Easter Island is the most remote inhabited island on earth and where the Rapa Nui people built 887 statues before mysteriously disappearing.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Italian Renaissance",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669698516/platos-peach-video/The_Italian_Renaissance_hoxpxb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1420",
      //     endDate: "1527",
      //     category: ["european history", " renaissance"],
      //     meta: "15th century Italy witnessed an explosion in art, literature, science, and especially the humanities, which became known as the Italian Renaissance. Great thinkers like Leonardo Da Vinci and Galileo were supported by a patronage system but detested by the Catholic church.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The House of Medici",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669695152/platos-peach-video/The_House_of_Medici_i138pf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1434",
      //     endDate: "1530",
      //     category: ["european history", " renaissance"],
      //     meta: "The house of Medici was a powerhouse family of generational wealth in Europe, including bankers, popes, queens, and kings. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Machu Picchu",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669549591/platos-peach-video/Machu_Pichu_buaqjs.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1438",
      //     endDate: "1471",
      //     category: ["ancient history", " mesoamerica"],
      //     meta: "Machu Picchu is a citadel perched 7,874 feet above sea level in the Peruvian Andes mountains. Although its purpose is debated by historians to this day, it is speculated that it's role aided the Inca's towards astronomy and agriculture.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Leonardo da Vinci",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669547768/platos-peach-video/Leonardo_da_Vinci_odcb3u.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1452-04-15",
      //     endDate: "1519-05-02",
      //     category: ["european history", " renaissance"],
      //     meta: "Leonardo da Vinci was a celebrated painter and polymath during the Italian Renaissance. He conceptualized many useful—and some fanciful—inventions and created masterworks like The Last Supper, Mona Lisa and the Vitruvian Man. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ponce de Leon",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669567590/platos-peach-video/Ponce_de_Leon_xwdbeg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1474",
      //     endDate: "1521",
      //     category: ["european history", " age of exploration"],
      //     meta: "From gentleman volunteer with Christopher Columbus to Governor of Puerto Rico, Juan Ponce de Leon would claim Florida for Spain and ultimately die in a battle with natives.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Niccolò Machiavelli",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669560172/platos-peach-video/Niccolo%CC%80_Machiavelli_bvbovj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1469-05-03",
      //     endDate: "1527-06-21",
      //     category: ["biography"],
      //     meta: "Niccolò Machiavelli observed and documented what he believed was necessary brutality and immorality in order to exert power in his book 'The Prince,' having studied the political strategies of the Medici family and the brutal leadership of Cesare Borgia.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Nicolaus Copernicus",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669560430/platos-peach-video/Nicolaus_Copernicus_m3zky0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1473-02-19",
      //     endDate: "1543-05-24",
      //     category: ["biography"],
      //     meta: "Nicolaus Copernicus was a 16th-century astronomer who first introduced the theory of a heliocentric solar system, variations in orbital periods based on distance and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Sistine Chapel",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669725337/platos-peach-video/The_Sistine_Chapel_oohzbf.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1473",
      //     endDate: "Present",
      //     category: ["european history", " world history"],
      //     meta: "Built by Pope Sixtus IV between 1473 and 1481, the Sistine Chapel is a sacred place within the papal state, featuring the papal conclave for pope selection. Michelangelo spent 4 years painting the ceiling's frescoes. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Michelangelo",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669555453/platos-peach-video/Michelangelo_ueeaka.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1475-03-06",
      //     endDate: "1564-02-18",
      //     category: ["biography"],
      //     meta: "Michelangelo was born in 1475 and found his passion for art shortly thereafter, becoming most notable for his sculptures and paintings, but he was also a notable architect and a true renaissance man.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Spanish Inquisition",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669725745/platos-peach-video/The_Spanish_Inquisition_wbeiqp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1478",
      //     endDate: "1834",
      //     category: ["world religions", " christianity"],
      //     meta: "A three-century-long period of antisemitism, the Spanish Inquisition witnessed the Catholic Church's prosecution of an estimated 150,000 people, with more than 4,500 people tortured or executed for their religious beliefs.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hernán Cortés",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669535483/platos-peach-video/Herna%CC%81n_Corte%CC%81s_o4lxmx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1485",
      //     endDate: "1547",
      //     category: ["european history", " age of exploration"],
      //     meta: "Hernán Cortés was born in Medellin Spain in 1485 and by 19 was the apprentice to conquistador Diego Velázquez. In blatant disobedience to Velázquez, Cortés took 11 ships and 500 men to conquer the Aztec Empire.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Hot Dogs",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669689486/platos-peach-video/The_History_of_Hot_Dogs_dcvths.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1487",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The history of hot dogs dates back to Ancient Rome with the invention of the sausage, spreading to Germany and Austria where the more modern frankfurter and wienerwurst were born.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "King Henry VIII of England",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669545907/platos-peach-video/King_Henry_VIII_of_England_qnpizq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1491",
      //     endDate: "1547",
      //     category: ["european history", " world history"],
      //     meta: "One of the most important rulers to sit on the English throne, King Henry VIII was known for his six wives, unsuccessful wars and expensive lifestyle.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Christopher Columbus and the New World",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669520701/platos-peach-video/Christopher_Columbus_and_the_New_World_iixohg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1492",
      //     endDate: "1502",
      //     category: ["european history", " age of exploration"],
      //     meta: "While studying in Portugal, Christopher Columbus became convinced a Northwest Passage to Asia existed and was motivated to find it. Sponsored by the Spanish monarchy, Columbus made three voyages to the New World, mostly throughout the Bahamas. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Early European Contacts in North America",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669525009/platos-peach-video/Early_European_Contacts_in_North_America_kdec81.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1492",
      //     endDate: "1620",
      //     category: ["european history", " age of exploration"],
      //     meta: "As the age of exploration ensued, early contacts between European explorers and North American natives were more frequent and often fraught with exploitation, disease and death.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Bloody Mary",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669515426/platos-peach-video/Bloody_Mary_m3eo2q.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1516-02-18",
      //     endDate: "1558-11-17",
      //     category: ["european history", " renaissance"],
      //     meta: "Bloody Mary was the nickname of Queen Mary I of England, who ruled from 1553 to 1558. She is known for her attempts to restore Roman Catholicism in England and her persecution of Protestants, earning her the nickname 'Bloody Mary.'",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Protestant Reformation",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669717053/platos-peach-video/The_Protestant_Reformation_ezkswl.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1517",
      //     endDate: "1548",
      //     category: ["world religions", " christianity"],
      //     meta: "Beginning with Martin Luther's '95 Theses' in 1517, the Protestant Reformation was a period of religious reform as the Catholic Church grew more powerful, wealthy and corrupt. New denominations of Christianity would emerge with a heavier focus on spirituality.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Dancing Plague of 1518",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669603144/platos-peach-video/The_Dancing_Plague_of_1518_zoqopr.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1518",
      //     endDate: "1518",
      //     category: ["european history", " renaissance"],
      //     meta: "The dancing plague of 1518 was a three-month-long dance marathon where citizens of Strasbourg danced to the point of exhaustion and even death. Some theories pose the dancing plague was caused by hallucinogenic ergot, psychological stress or a religious cult.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Voyage of Ferdinand Magellan",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669734151/platos-peach-video/The_Voyage_of_Ferdinand_Magellan_xgfvjz.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1519",
      //     endDate: "1521",
      //     category: ["european history", " age of exploration"],
      //     meta: "Portuguese turned Spanish explorer, Ferdinand Magellan set sail with funding from the King of Spain to find a quick and lucrative route to the Spice Islands. After traversing the Atlantic Ocean and discovering the Pacific Ocean, Magellan died suddenly, leaving his crew to finish the circumnavigation. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Typhus",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669740351/platos-peach-video/Typhus_iix9cg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1528",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Typhus is a filth disease that spreads through rats, lice and poor sanitation. In addition to fever, rash and nausea, typhus victims experience delirium, stupor and sensitivity to light. Today, typhus prevails in developing countries with inadequate sanitation. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Puritans",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669717534/platos-peach-video/The_Puritans_jozfkt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1533",
      //     endDate: "1630",
      //     category: ["american history", " colonial"],
      //     meta: "The Puritans were a group of religious zealots as a response to King Henry VIII's newly-formed Church of England. Puritans faced friction as their numbers multiplied, forcing them to emigrate to Holland and later New England.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Galileo",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669530482/platos-peach-video/Galileo_csadba.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1564-02-15",
      //     endDate: "1642-01-08",
      //     category: ["biography"],
      //     meta: "Galileo Galilei was a mathematician, physicist and early cosmologist who discovered the moons of Jupiter, details of Earth's moon and more. Galileo's belief in a heliocentric solar system placed him at odds with the earth-centric Catholic Church, who in turn placed him under house arrest for the remainder of his life.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Pocahontas",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669567118/platos-peach-video/Pocahontas_nygwx6.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1596",
      //     endDate: "1617",
      //     category: ["american history", " native american history"],
      //     meta: "Pocahontas was born in Virginia around 1596 and was given her name which means 'playful one' or 'ill-behaved child.' Although legend has it that Pocahontas was in love with John Smith, it was John Rolfe with whom she actually married and bore a child.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Northwest Passage",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669711981/platos-peach-video/The_Northwest_Passage_faglyh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1609",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The age of exploration inspired many mariners to search for the Northwest Passage, which was believed to be a viable shipping route from the west to Asia. It would take more than 300 years and many mistaken Asian landfalls, mutinies, and the lives of sailors before the route was successfully traversed.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Explorations of Henry Hudson",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669606461/platos-peach-video/The_Explorations_of_Henry_Hudson_cen4k1.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1610",
      //     endDate: "1611",
      //     category: ["european history", " age of exploration"],
      //     meta: "Henry Hudson was a sea-faring explorer and ship's captain who made multiple unsuccessful attempts to find new routes to Asia and the Indies, but made numerous discoveries that bear his namesake like the Hudson river in New York, Hudson Bay in Canada, and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Romanov Family",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669720440/platos-peach-video/The_Romanov_Family_ojvydj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1613",
      //     endDate: "1917",
      //     category: ["european history", " world history"],
      //     meta: "The Romanov family was a succession of Russian rulers between 1631 and 1918, including Peter the Great, Catherine the Great, Alexander I, and Czar Nicholas II.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Middle Passage",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669706975/platos-peach-video/The_Middle_Passage_lbcuor.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1619",
      //     endDate: "1808",
      //     category: ["american history", " south & slavery"],
      //     meta: "The Middle Passage was a period from the 16th century until 1865, when 12.5 million Africans were forced into unbearable living conditions aboard slave ships  destined for the Caribbean and the Americas. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The New England Colonies and Native Americans",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669710532/platos-peach-video/The_New_England_Colonies_and_Native_Americans_2_ly63nw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1620",
      //     endDate: "1783",
      //     category: ["american history", " colonial"],
      //     meta: "As Europeans settled the New England Colonies of Plymouth, early trade with Native Americans included the transmission of foreign diseases such as smallpox, tuberculosis, cholera and more, decimating native populations.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Mayflower Compact",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669705985/platos-peach-video/The_Mayflower_Compact_jx31ie.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1620-11-11",
      //     endDate: "1620-11-11",
      //     category: ["american history", " colonial"],
      //     meta: "The Mayflower Compact was a governing document created by the Mayflower passengers and Pilgrims once their contract with the Virginia Company was believed to be nullified. It was signed on November 11th, 1620, the day the Mayflower made landfall.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "First Thanksgiving",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669677557/platos-peach-video/The_First_Thanksgiving_nvq5be.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1621",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "After English-speaking Native American, Squanto, helped the Pilgrims survive in a new land, Governor William Bradford called for the first Thanksgiving feast, which lasted for three days.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Thanksgiving",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669692641/platos-peach-video/The_History_of_Thanksgiving_mbbpkj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1621",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "The tradition of gratitude for an abundant harvest has transitioned from an intermittent celebration to an annual holiday celebrated by millions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "New Amsterdam",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669559728/platos-peach-video/New_Amsterdam_theexz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1624",
      //     endDate: "1664",
      //     category: ["american history", " colonial"],
      //     meta: "Established in 1624, New Amsterdam and New Netherland was a Dutch colony in North America, which lasted until 1664 when the British seized and reincorporated the land as New York City.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Taj Mahal",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669728499/platos-peach-video/The_Taj_Mahal_re5wbb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1631",
      //     endDate: "1648",
      //     category: ["ancient history", " india"],
      //     meta: "The Taj Mahal was built over two decades, using 20,000 workers and 1,000 elephants. The Mausoleum is dedicated to Mumtaz Mahal, the queen to Mughal dynasty ruler, Shah Jahan. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "John Locke",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669543386/platos-peach-video/John_Locke_hsnk7w.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1632-08-29",
      //     endDate: "1704-11-28",
      //     category: ["european history", " world history"],
      //     meta: "John Locke was an Enlightenment thinker, writer and educator, whose work and life have had important and lasting impacts on human governance, curriculums and philosophy.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Yellow Fever",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669745417/platos-peach-video/Yellow_Fever_k3dccp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1648",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Yellow Fever is one of the deadliest killers in infectious disease history. Learn the cause, symptoms, and discovery of a vaccine.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Peter the Great",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669566724/platos-peach-video/Peter_the_Great_sbnwpb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1672",
      //     endDate: "1725",
      //     category: ["biography"],
      //     meta: "During his 43-year reign, Peter The Great transformed Russia's medieval aristocracy, established a formidable navy, prioritized scientific and technological advancement, built Saint Petersburg, and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Bacon's Rebellion",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669512033/platos-peach-video/Bacon_s_Rebellion_a3tbl3.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1676",
      //     endDate: "1676",
      //     category: ["american history", " colonial"],
      //     meta: "Bacon's Rebellion was the result of rising tensions between the Virginia Governor and Nathaniel Bacon, the leader of a group of extremists who burned down the Jamestown colony.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Age of Enlightenment",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669579820/platos-peach-video/The_Age_of_Enlightenment_gumb6f.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1685",
      //     endDate: "1815",
      //     category: ["european history", " renaissance"],
      //     meta: "The age of enlightenment spanned the 17th and 19th centuries with Descartes, Voltaire, Rousseau and other thinker-philosophers contributed amazing ideas that changed the world.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Johann Sebastian Bach",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669542698/platos-peach-video/Johann_Sebastian_Bach_mefuey.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1685-03-31",
      //     endDate: "1750-07-28",
      //     category: ["biography"],
      //     meta: "Johann Sebastian Bach was born into a family of musicians, but after suffering the death of both parents, Bach was taken in by his organist brother, where Bach would hone his skills as a musician and composer. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Glorious Revolution",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669681108/platos-peach-video/The_Glorious_Revolution_sacdee.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1688",
      //     endDate: "1689",
      //     category: ["european history", " world history"],
      //     meta: "The Glorious Revolution, caused by King James II's abuse of power, forced his peers to plead with William of Orange to invade England and remove the king. James fled to France after witnessing mutiny and would become the last absolute monarch with the signing of the English Bill of Rights, which shifted the country to a constitutional monarchy. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Salem Witch Trials",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669721273/platos-peach-video/The_Salem_Witch_Trials_bfxmc1.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1692",
      //     endDate: "1693",
      //     category: ["american history", " colonial"],
      //     meta: "The Salem Witch Trials of 1692 pitted neighbor against neighbor as long-simmering jealousies and resentments were given a thinly-veiled outlet for revenge.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Vivaldi and the Figlie Del Coro",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669742192/platos-peach-video/Vivaldi_and_the_Figlie_Del_Coro_az4da0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1700",
      //     endDate: "1720",
      //     category: ["european history", " renaissance"],
      //     meta: "Disfigured female orphans who sang like angels and played a wide variety of musical instruments, the Figlie del coro worked with composer Vivaldi to create masterful symphonies.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Easter Bunny and his Eggs",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669604957/platos-peach-video/The_Easter_Bunny_and_his_Painted_Eggs_mu4vk1.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1718",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "The history of the easter bunny and origins of easter eggs in America date back to the 1700s when German immigrants introduced the tradition of setting out a nest for the egg-laying hare to deliver colored eggs.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title:
      //       "Onesimus: An African Slave Brings Smallpox Relief to the Colonies",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669509926/platos-peach-video/An_African_Slave_Brings_Smallpox_Relief_to_the_Colonies_tv0rtg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1721",
      //     endDate: "1721",
      //     category: ["science", " biography"],
      //     meta: "West African slave, Onesimus, told his interested owner, Cotton Mather about the African and Asian variolation practice of introducing a small amount of pox discharge into the body for inoculation, saving many Bostonians from small pox.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Samuel Adams",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669572162/platos-peach-video/Samuel_Adams_gg8dc8.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1722-09-27",
      //     endDate: "1803-10-02",
      //     category: ["american history", " revolution & independence"],
      //     meta: "Samuel Adams was a student of philosophy, failed businessman, activist writer and founding father of the US as a vocal proponent of the Revolutionary War, signer of the Declaration of Independence, and contributor to the Articles of Confederation.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Awakening",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669681913/platos-peach-video/The_Great_Awakening_uzikam.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1727",
      //     endDate: "1742",
      //     category: ["american history", " colonial"],
      //     meta: "After the shift in priorities following the Age of Enlightenment in Europe, The Great Awakening was a period in the United States marked by the return of religious practice and fervor. Passionate preachers led the movement, traveling the country delivering sermons to convert non-believers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Catherine The Great",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669519464/platos-peach-video/Catherine_The_Great_hzv1t5.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1729-05-02",
      //     endDate: "1796-11-17",
      //     category: ["biography"],
      //     meta: "Conspiring with political opponents to assassinate her husband, Tsar Peter III, Catherine the Great became the longest female Russian Ruler.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Thirteen Virtues of Ben Franklin",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669729278/platos-peach-video/The_Thirteen_Virtues_of_Ben_Franklin_rd7b8o.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1730",
      //     endDate: "1730",
      //     category: ["american history", " colonial"],
      //     meta: "The thirteen virtues of Ben Franklin, a founding father, inventor, and thinker, which established moral codes for people to live by.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Poor Richard's Almanack",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669568331/platos-peach-video/Poor_Richard_s_Almanack_hayl0t.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1732",
      //     endDate: "1758",
      //     category: ["american history", " colonial"],
      //     meta: "A sounding board for the wisdom of its colonial author, Ben Franklin, Poor Richard's Alamanack was in print uninterrupted from 1732 to 1758.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Patrick Henry",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669565786/platos-peach-video/Patrick_Henry_wsrc3i.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1736-05-29",
      //     endDate: "1799-06-06",
      //     category: ["biography"],
      //     meta: "Patrick Henry studied law and quickly tried cases involving Great Britain, which drove Henry to become a vocal revolutionary. Henry delivered impassioned speeches that influenced Washington, Jefferson, and other signatories of the impending Declaration of Independence. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Plains People",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669684221/platos-peach-video/The_Great_Plains_People_jgabup.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1740",
      //     endDate: "1830",
      //     category: ["american history", " native american history"],
      //     meta: "Rising temperatures after the last Ice Age led a once barren landscape to flourish with life. The great plains people followed an estimated 30 million buffalo into the region, practiced ceremonial dance and created languages for cross-tribe communication.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Benedict Arnold",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669513219/platos-peach-video/Benedict_Arnold_bxpi7w.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1741-01-14",
      //     endDate: "1801-06-14",
      //     category: ["biography"],
      //     meta: "Benedict Arnold was a heroic Patriot during the Revolutionary War but felt unappreciated and overlooked for his contributions, leading him to negotiate treason with the British in exchange for money and power.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Thomas Jefferson",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669738185/platos-peach-video/Thomas_Jefferson_ay7sfi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1743-04-13",
      //     endDate: "1826-07-04",
      //     category: ["biography"],
      //     meta: "Educated as a lawyer, Thomas Jefferson would soon enter the political arena. A delegate to the Continental Congress, Jefferson wrote the first draft of the Declaration of Independence at 33 years of age. He would go on to serve as Vice President and President of the United States.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Liberty Bell",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669702146/platos-peach-video/The_Liberty_Bell_s17fwe.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1753",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The Liberty Bell was cast in London in 1751, arrived in Philadelphia in 1752, and has become the symbol of American independence and liberty for all. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The French & Indian War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669678643/platos-peach-video/The_French_and_Indian_War_oseguy.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1754",
      //     endDate: "1763",
      //     category: ["american history", " american indian wars"],
      //     meta: "The Seven Years’ War, known by American historians as the French and Indian War of 1754 to 1763, began when the French built Fort Duquesne near present-day Pittsburgh, a perceived incursion on British colonial soil.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Alexander Hamilton",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669508205/platos-peach-video/Alexander_Hamilton_loepoc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1755-01-11",
      //     endDate: "1804-07-12",
      //     category: ["american history", " revolution & independence"],
      //     meta: "Alexander Hamilton was born in the Caribbean in 1755 and would move to New York in 1772, just in time to play a pivotal role in America's push for independence. His valor and strategy on the battlefield elevated him to political office before an affair cost him everything. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mozart",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669557048/platos-peach-video/Mozart_xly9ql.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1756-01-27",
      //     endDate: "1791-12-05",
      //     category: ["biography"],
      //     meta: "Mozart was a musical prodigy from childhood, composing his first opera at the age of eleven. He would go on to compose some of the most influential pieces of music in history, despite dealing with physical and mental illness. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Marquis de Lafayette",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669552472/platos-peach-video/Marquis_de_Lafayette_hdcvkt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1757-09-06",
      //     endDate: "1834-05-20",
      //     category: ["american history", " revolution & independence"],
      //     meta: "Marquis De Lafayette was a young and wealthy heir that joined the Continental Army during the American Revolutionary war and then rejoined the French Army in 1781 leading to the July Revolution of 1830.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Robespierre",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669570483/platos-peach-video/Robespierre_q0rkvb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1758-05-06",
      //     endDate: "1794-07-28",
      //     category: ["biography"],
      //     meta: "Maximilien Robespierre was a controversial French statesman and leading figure in the French Revolution, forming a commoner army and was ultimately overthrown in a coup d'état before execution by guillotine.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Industrial Revolution in Great Britain",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669697123/platos-peach-video/The_Industrial_Revolution_in_Great_Britain_oy36l2.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1760",
      //     endDate: "1840",
      //     category: ["american history", " industrial revolution"],
      //     meta: "The industrial revolution in Britain started with the steam engine and other innovations in engineering and manufacturing, leading many to urbanize and work long, dangerous hours in factories. With the rise of industrialization in Great Britain, a wealth divide between the low, middle and upper classes emerged. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Pontiac's War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669567870/platos-peach-video/Pontiac_s_War_defsz0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863",
      //     endDate: "1866",
      //     category: ["american history", " american indian wars"],
      //     meta: "Fed up with British rule, Chief Pontiac formed an alliance with nearly every tribe from Lake Superior to lower Mississippi in an attempt to overthrow the British. The plan of attack would play out in near unison as tribes attempted to invade their nearest British fort, leading to months of bloody standoffs and pitched battles. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Proclamation of 1763",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669716499/platos-peach-video/The_Proclamation_of_1763_afbfgw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1763",
      //     endDate: "1763",
      //     category: ["american history", " revolution & independence"],
      //     meta: "As violence between Native Americans and settlers reached a high point, King George III decreed his Proclamation of 1763, which made all land west of the Appalachian Mountains off-limits to settlers. This overreach of power was a major cause of the American Revolutionary War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Boston Massacre",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669597948/platos-peach-video/The_Boston_Massacre_o55b3f.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1770-03-05",
      //     endDate: "1770-03-05",
      //     category: ["american history", " revolution & independence"],
      //     meta: "Tensions between the British and colonialists had escalated to the Boston Massacre on March 5th, 1770, when redcoats shot five colonialists dead and wounded six more.   ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ludwig van Beethoven",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669549280/platos-peach-video/Ludwig_van_Beethoven_y4keuq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1770-12-01",
      //     endDate: "1827-03-26",
      //     category: ["biography"],
      //     meta: "Ludwig van Beethoven was born in 1770 Germany and raised to be a musician by his father and teachers including Haydn. His eventual deafness forced his later compositions to be created from musical memory, unable to physically hear the notes.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Boston Tea Party",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669516312/platos-peach-video/Boston_Tea_Party_ozubu7.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1773-12-16",
      //     endDate: "1773-12-16",
      //     category: ["american history", " revolution & independence"],
      //     meta: "After Britain levied a tax on imports of tea into the US colonies, Americans protested with the Boston Tea Party where 45 tons of tea was dumped into Boston Harbor over three hours.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Coercive Acts",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669601316/platos-peach-video/The_Coercive_Acts_pj06kl.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1774",
      //     endDate: "1775",
      //     category: ["american history", " revolution & independence"],
      //     meta: "Parliament's response to the Boston Tea Party was the coercive acts that burdened Boston Harbor and its population with intolerable British authority.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Shot Heard Round the World",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669723842/platos-peach-video/The_Shot_Heard_Round_the_World_csvjyi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1775",
      //     endDate: "1914",
      //     category: ["european history", " world history"],
      //     meta: "First coined after the Battles of Lexington and Concord, which kicked off the Revolutionary War, 'Shot Heard Round the World' was later used after the Assassination of Archduke Franz Ferdinand.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Loyalists v. Patriots and the American Revolution",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669548994/platos-peach-video/Loyalists_v._Patriots_and_the_American_Revolution_pncnmc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1775",
      //     endDate: "1783",
      //     category: ["american history", " revolution & independence"],
      //     meta: "The Revolutionary War led residents in America to choose sides in a loyalist vs patriot division. 20% of Americans fought or sided with the British, while 30 to 40% were Patriots, and the remaining were neutral.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ben Franklin's Postal Service Spawns an American Revolution",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669512953/platos-peach-video/Ben_Franklin_s_Postal_Service_Spawns_an_American_Revolution_odatbl.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1775",
      //     endDate: "Present",
      //     category: ["american history", " revolution & independence"],
      //     meta: "Ben Franklin's efficient management of the U.S. Post Office and postal service made the system a vital communication link that fueled the fires of the American Revolution.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Native Americans and the Revolutionary War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669559230/platos-peach-video/Native_Americans_and_the_Revolutionary_War_niwxs0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1775-04-19",
      //     endDate: "1783-09-03",
      //     category: ["american history", " revolution & independence"],
      //     meta: "Native Americans did play a role in the Revolutionary War, divided by tribal support of loyalist and patriot sympathies, ultimately losing their exclusive western settlements with the Treaty of Paris in 1783.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Paul Revere's Midnight Ride",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669566026/platos-peach-video/Paul_Revere_s_Midnight_Ride_g4vbqa.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1775-04-18",
      //     endDate: "1775-04-18",
      //     category: ["american history", " revolution & independence"],
      //     meta: "On April 18th, 1775, Paul Revere and William Dawes were dispatched to spread the news of a British order to seize the patriot's military supplies, the final spark that lit the revolutionary war.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battles of Lexington & Concord",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669594246/platos-peach-video/The_Battles_of_Lexington_Concord_map4fy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1775-04-19",
      //     endDate: "1775-04-19",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "The battles of Lexington and Concord are recognized as the first military engagement of the Revolutionary War as the Redcoats attempted to seize the Patriot's military supplies, the shot heard 'round the world changed the trajectory of American History.   ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Siege of Boston",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669724063/platos-peach-video/The_Siege_of_Boston_sqxasa.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1775-04-19",
      //     endDate: "1775-04-19",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "The Siege of Boston was an early victory in the American Revolutionary War after self-government sentiment peaked in response to British Parliament's taxation.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Bunker Hill",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669586468/platos-peach-video/The_Battle_of_Bunker_Hill_tdcwhg.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1775-06-17",
      //     endDate: "1775-06-17",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "American revolutionary militiamen stood their ground on Breed's Hill against twice as many British redcoats in the Battle of Bunker Hill.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Trenton",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669593499/platos-peach-video/The_Battle_of_Trenton_iq1klm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1776-12-26",
      //     endDate: "1776-12-26",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "After back-to-back morale-deflating defeats, General George Washington inspired his Continental Army to cross the Delaware River to engage in the Battle of Trenton the day after Christmas, achieving a much-needed victory in the Revolutionary War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Articles of Confederation",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669584370/platos-peach-video/The_Articles_of_Confederation_m6mfh3.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1777",
      //     endDate: "1787",
      //     category: ["american history", " revolution & independence"],
      //     meta: "The Articles of Confederation established a central government among the thirteen states but quickly revealed weaknesses such as no authority to demand money or troops from individual states and more. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Princeton",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669591351/platos-peach-video/The_Battle_of_Princeton_uisbl6.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1777-01-03",
      //     endDate: "1777-01-03",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "The Battle of Princeton displayed General George Washington's creativity in war, having strategically moved his men from the Assunpink Creek near Trenton to Princeton, where the patriots would regain control of New Jersey.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Saratoga",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669591642/platos-peach-video/The_Battle_of_Saratoga_wpsygr.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1777-09-19",
      //     endDate: "1777-09-19",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "The Battle of Saratoga was the result of the British intent to control the Hudson River, a crucial supply line for the Continental Army. Fought between September 19th and October 17th, 1777, the U.S. would win the battle--a major turning point in the Revolutionary War.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "A tragic Winter at Valley Forge",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669505775/platos-peach-video/A_tragic_Winter_at_Valley_Forge_qo9bcw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1777-12-19",
      //     endDate: "1778-06-19",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "During the American Revolutionary War, the Continental Army's main winter encampment was Valley Forge, where misery and death were an inevitability.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Cowpens",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669586932/platos-peach-video/The_Battle_of_Cowpens_wnhw4l.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1781-01-17",
      //     endDate: "1781-01-17",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "Following American defeats at Charleston and Camden, the Battle of Cowpens served as a morale-boosting victory for the American Patriots during the Revolutionary War. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of the Chesapeake",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669592760/platos-peach-video/The_Battle_of_the_Chesapeake_f7s8pd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1781-09-05",
      //     endDate: "1781-09-05",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "As British and Franco-American forces vied for control of the Chesapeake as a deep water port, the battle of the Chesapeake took place on September 5th, 1781, proving to be a decisive win for the American cause.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Yorktown",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669593998/platos-peach-video/The_Battle_of_Yorktown_kdpqw4.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1781-09-28",
      //     endDate: "1781-09-28",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "When allied French reinforcements were delayed, George Washington created the illusion of a large soldier encampment, bluffing the British. In the Battle of Yorktown, Alexander Hamilton led a charge with only bayonets and hand-to-hand combat, ending with Cornwallis' surrender. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Treaty of Paris",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669730600/platos-peach-video/The_Treaty_of_Paris_syor4a.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1783-09-03",
      //     endDate: "1783-09-03",
      //     category: ["american history", " revolution & independence"],
      //     meta: "After eight years of Revolutionary War, the Treaty of Paris was signed in 1783 recognizing the United States as an independent nation. John Adams, Ben Franklin, and John Jay were key American signatories of the treaty.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Shays' Rebellion",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669573180/platos-peach-video/Shays_Rebellion_jxrap0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1786",
      //     endDate: "1787",
      //     category: ["american history", " early republic"],
      //     meta: "Nonviolent protests over high taxes to repay Revolutionary War debts turned violent in what is known as Shays' Rebellion. In 1787, a planned attack on the federal arsenal was thwarted and the rebellion squashed but not without legislative repercussions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Checks and Balances",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669520182/platos-peach-video/Checks_and_Balances_jiqf0f.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1787",
      //     endDate: "Present",
      //     category: ["american history", " u.s. constitution"],
      //     meta: "Checks and balances is the method of dividing power, responsibility, and oversight of the three branches of government known as the legislative, executive and judicial branches.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Constitutional Convention of 1787",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669602142/platos-peach-video/The_Constitutional_Convention_of_1787_tiyjjw.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1787",
      //     endDate: "1787",
      //     category: ["american history", " u.s. constitution"],
      //     meta: "While the Articles of Confederation gave no federal rule to demand money or troops from the breakaway American Colonies, in May of 1787, state delegates convened in Philadelphia for the Constitutional Convention, creating the U.S. Constitution and later the Bill of Rights.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Federalist Papers",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669612060/platos-peach-video/The_Federalist_Papers_bhnmco.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1787",
      //     endDate: "1788",
      //     category: ["american history", " u.s. constitution"],
      //     meta: "The Federalist Papers were a collection of 85 essays written predominantly by Alexander Hamilton, but include contributions from James Madison and John Jay. The papers reflected on issues of governance, taxation, regulation, and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Native American Governance and the U.S. Constitution",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669558755/platos-peach-video/Native_American_Governance_and_the_U.S._Constitution_ty0s9t.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1787-05-14",
      //     endDate: "1787-09-17",
      //     category: ["american history", " revolution & independence"],
      //     meta: "Having no European contemporaries to emulate a democracy around, the founding fathers looked to Native American governance for ideas, most notably the structure of the Iroquois Confederacy. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sacagawea",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669571633/platos-peach-video/Sacagawea_blhsep.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1788",
      //     endDate: "1812",
      //     category: ["american history", " westward expansion"],
      //     meta: "Sacagawea was born into the Shoshone tribe before being kidnapped and sold into a non-consensual marriage with a fur-trapper who brought her and their 55-day-old son on the Lewis and Clark Expedition.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Tammany Hall",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669578171/platos-peach-video/Tammany_Hall_b9q8dw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1789",
      //     endDate: "1900",
      //     category: ["american history", "  gilded age"],
      //     meta: "Tammany Hall was a political powerhouse in New York City from 1789 until its slow unraveling in the mid-1900s. Boss Tweed and others would become infamous for corruption and the embezzlement of millions in taxpayer dollars. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Flight to Varennes",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669528563/platos-peach-video/Flight_to_Varennes_mv6v70.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1791",
      //     endDate: "1791",
      //     category: ["european history", " renaissance"],
      //     meta: "In June of 1791, King Louis XVI and Marie Antoinette attempted to escape the French Revolution under the cloak of night and disguise. Still, they were recognized due to the King's portrait featured on French currency, ultimately leading to their execution.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Whiskey Rebellion",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669735666/platos-peach-video/The_Whiskey_Rebellion_bgr3ax.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1791",
      //     endDate: "1794",
      //     category: ["american history", " early republic"],
      //     meta: "After tax on whiskey was levied in 1791, small American whiskey producers were heavily taxed, causing an uprising against collectors known as the whiskey rebellion.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "James Buchanan",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669540403/platos-peach-video/James_Buchanan_mbnznd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1899-12-30",
      //     endDate: "1899-12-30",
      //     category: ["american history", " abolition"],
      //     meta: "James Buchanan was a lawyer by training but a lifelong politician, ultimately becoming U.S. president in 1856 where he would face the rising tension over slavery in America, building towards the Civil War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The White House",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669735843/platos-peach-video/The_White_House_nqymxq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1792",
      //     endDate: "Present",
      //     category: ["american history", " world history"],
      //     meta: "The White House was first built at the turn of the 19th Century, but was burned to the ground by the British during the War of 1812. Rebuilt and remodeled by multiple presidents, the modern White House has 132 rooms totaling 55,000 square feet.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Ottoman Empire",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669713777/platos-peach-video/The_Ottoman_Empire_lswlxn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1792",
      //     endDate: "1923",
      //     category: ["european history", " world history"],
      //     meta: "At its height of power, the Ottoman Empire controlled much of Southeastern Europe, Western Asia and North Africa, between the 14th and early 20th centuries.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Guillotines",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669689037/platos-peach-video/The_History_of_Guillotines_fpg6ne.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1792-04-25",
      //     endDate: "1939-06-17",
      //     category: ["world history"],
      //     meta: "Inspired by middle age beheading devices, the Guillotine became a common fixture in the wake of the French Revolution, severing the heads of thousands, including King Louis the 16th and Marie Antoinette.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Eli Whitney Invents The Cotton Gin",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669525738/platos-peach-video/Eli_Whitney_Invents_The_Cotton_Gin_k4nccs.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1794",
      //     endDate: "1794",
      //     category: ["american history", " south & slavery"],
      //     meta: "After graduating from Yale in 1792, Eli Whitney solved a common problem faced by plantation owners harvesting cotton with the Cotton Gin which quickly separated seeds from fibers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Fallen Timbers",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669587151/platos-peach-video/The_Battle_of_Fallen_Timbers_keobov.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1794-08-20",
      //     endDate: "1794-08-20",
      //     category: ["military history", " american indian war"],
      //     meta: "After the Revolutionary War, aggression against American settlers resulted in the Battle of Fallen Timbers on August 20, 1794, which ended in another crushing defeat for Native Americans.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sojourner Truth",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669575119/platos-peach-video/Sojourner_Truth_ow7ijm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1797",
      //     endDate: "1905-02-25",
      //     category: ["american history", " abolition"],
      //     meta: "Sojourner Truth, born Isabella Baumfree, escaped from slavery leaving four of her five children when she fled. Her previous owner tried to illegally sell her five-year-old son, so she filed a lawsuit and won custody. She dedicated her life to civil rights activism for black Americans. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Presidents' Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669692316/platos-peach-video/The_History_of_Presidents_Day_o0pfya.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1799",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Originally celebrating George Washington's February 22nd birthday, Presidents' Day became a celebration of all 46 former and current US Presidents in the 1960s.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Placebo Effect",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669715467/platos-peach-video/The_Placebo_Effect_hqbfhw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1799",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "When a successful treatment of a patient's diagnosis cannot be attributed to the method of treatment itself, but the patient's belief in its healing properties.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Underground Railroad",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669733249/platos-peach-video/The_Underground_Railroad_egrk9v.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1800",
      //     endDate: "1865",
      //     category: ["american history", " abolition"],
      //     meta: "Elaborate networks of safe houses and anti-slavery sympathizers that helped slaves to freedom, the Underground Railroad was a first in American civil rights movements, literally.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The American Election of 1800",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669582505/platos-peach-video/The_American_Election_of_1800_du88za.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1800-10-31",
      //     endDate: "1801-03-04",
      //     category: ["american history", " early republic"],
      //     meta: "The Founding Fathers' early split into two opposing political parties culminated in the Election of 1800 with the Federalist incumbent John Adams against Republican Thomas Jefferson.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Louisiana Purchase",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669703826/platos-peach-video/The_Louisiana_Purchase_w2vdrp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1803-04-30",
      //     endDate: "1803-04-30",
      //     category: ["american history", " early republic"],
      //     meta: "French territory in early 19th Century America was ideal for US expansion when the Louisiana Purchase was negotiated for $15 million or $0.03 per acre as Napoleon forced France into financial distress during the Napoleonic Wars. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Napoleonic Wars",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669708955/platos-peach-video/The_Napoleonic_Wars_x3pzrq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1803-05-18",
      //     endDate: "1815-11-20",
      //     category: ["military history", " napoleonic wars"],
      //     meta: "The Napoleonic Wars began within a year of Napoleon Bonaparte's rise to power in France, including attempted invasions of much of Europe before his eventual defeat in 1815.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Erie Canal",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669605961/platos-peach-video/The_Erie_Canal_qz3kxm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1808",
      //     endDate: "Present",
      //     category: ["american history", " world history"],
      //     meta: "The first large scale engineering feat in American Industrial Age history, the 363-mile Erie Canal began construction in 1817 and opened in 1825.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Luddites of Great Britain",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669704132/platos-peach-video/The_Luddites_of_Great_Britain_deeoxm.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1811",
      //     endDate: "1816",
      //     category: ["european history", " british industrial revolution"],
      //     meta: "The Luddites were a group of textile workers that took destructive action in response to the textile industry's recent adoption of mechanical looms, a perceived threat to their artisan livelihoods.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Oregon Trail",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669713543/platos-peach-video/The_Oregon_Trail_uoe36l.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1811",
      //     endDate: "1840",
      //     category: ["american history", " westward expansion"],
      //     meta: "As American westward expansion pushed forward in the early 19th century, the Oregon Trail was created to offer safer passage for covered wagons before the transcontinental railroad was built. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Tippecanoe",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669593249/platos-peach-video/The_Battle_of_Tippecanoe_degmcc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1811-11-06",
      //     endDate: "1811-11-07",
      //     category: ["military history", " american indian war"],
      //     meta: "The Battle of Tippecanoe was fought in Indiana in 1811, in which US forces led by William Henry Harrison defeated Tecumseh's confederation of Native American tribes. It was a significant victory for the US, and helped pave the way for Harrison's later presidency.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Uncle Sam",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669692838/platos-peach-video/The_History_of_Uncle_Sam_gdkewa.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1812",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "Uncle Sam is originally linked to Samuel Wilson, an entrepreneurial meat packer and major supplier of beef to the US Army during the War of 1812. Wilson stamped his meat barrels with “U.S.” for United States, but soldiers began referring to the grub as “Uncle Sam’s.”",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Ketchup",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669690286/platos-peach-video/The_History_of_Ketchup_elpdwi.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1812",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The history of ketchup dates back to a fermented fish sauce in 300 B.C.E. China, becoming popular due to its long shelf life. Tomato-based ketchup debuted in 1812 and later grown into a billion-dollar business by Heinz. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Manifest Destiny",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669551022/platos-peach-video/Manifest_Destiny_v8lftu.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1812",
      //     endDate: "1867",
      //     category: ["american history", " westward expansion"],
      //     meta: "During the 19th century, Americans believed westward expansion was their inevitable and preordained right, or their Manifest Destiny, to inhabit new territories such as Texas, California, and the entire western United States of today.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "War of 1812",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669734451/platos-peach-video/The_War_of_1812_e6rn64.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1812-06-18",
      //     endDate: "1815-02-18",
      //     category: ["military history", " war of 1812"],
      //     meta: "After trading blockades and service impressment, President Madison declared war in 1812, which constituted the second war between Britain and the US, both fought on American soil.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of the Thames",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669593007/platos-peach-video/The_Battle_of_the_Thames_ytgujn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1813-10-04",
      //     endDate: "1813-10-05",
      //     category: ["military history", " war of 1812"],
      //     meta: "After losing Fort Detroit and the Great Lakes Region to an alliance of British forces and Native American tribes, future president William Henry Harrison led a ruthless offensive against half-starved soldiers and leading to the death of Tecumseh.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "British Imperialism in India",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669517084/platos-peach-video/British_Imperialism_in_India_hzmntz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1815",
      //     endDate: "1914",
      //     category: ["european history", " european imperialism"],
      //     meta: "In 1858, British Imperialism exerted governance over India for the next 89 years, until Gandhi and others began peaceful protests for independence. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "New Imperialism and the White Man's Burden",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669559964/platos-peach-video/New_Imperialism_and_the_White_Man_s_Burden_k5jyc5.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1867",
      //     endDate: "1903",
      //     category: ["american history", " american imperialism"],
      //     meta: "After the Suez Canal opened up new routes for colonial expansion and the growing need for raw materials, New Imperialism was a period British poet Rudyard Kipling labeled 'The White Man's Burden.'",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Cholera",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669520628/platos-peach-video/Cholera_s2lmui.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1817",
      //     endDate: "Present",
      //     category: ["science", " medicine"],
      //     meta: "Having killed an estimated 30 million people worldwide, Cholera is an infectious disease caused by poor sanitation spreading the vibrio cholerae bacterium.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Frederick Douglass",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669529173/platos-peach-video/Frederick_Douglass_k2n2xn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1817",
      //     endDate: "1895",
      //     category: ["american history", " abolition"],
      //     meta: "Fredrick Douglass was born into slavery in 1818 and repeatedly sold until housewife Sophia Auld taught him the alphabet, which led to his learning to read and write. After escaping to freedom, Douglass became an activist for the abolitionist movement and more. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Age of Queen Victoria",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669580509/platos-peach-video/The_Age_of_Queen_Victoria_h5pwvp.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1819",
      //     endDate: "1901",
      //     category: ["european history", " world history"],
      //     meta: "The Victorian Era, aligning with Queen Victoria's reign from 1837 until 1901, was a period of innovation in technology, healthcare, philosophy, literature and more. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Child Labor in America",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669520411/platos-peach-video/Child_Labor_in_America_lv6zvy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1820",
      //     endDate: "1930",
      //     category: ["american history", " industrial revolution"],
      //     meta: "From colonial times through the industrial revolution, child labor in America grew to a staggering 18% of the American workforce. It wasn't until the 20th Century when reforms would be made. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Clara Barton",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669521558/platos-peach-video/Clara_Barton_qchawn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1821-12-25",
      //     endDate: "1912-04-12",
      //     category: ["biography"],
      //     meta: "Clara Barton was a self-taught nurse who got on-site training during the Civil War, where she tended to the wounded on active battlefields. Barton would successfully start the American Red Cross and Ambulance First Responders. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Harriet Tubman",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669534016/platos-peach-video/Harriet_Tubman_nrwdou.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1822",
      //     endDate: "1913",
      //     category: ["american history", " abolition"],
      //     meta: "Harriet Tubman was born into slavery in 1820 and became an underground railroad conductor when her brothers were destined to be sold away from the family. Tubman would go on to lead no less than 70 slaves to freedom, work with the Union Army, and become a landowner. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Monroe Doctrine",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669708107/platos-peach-video/The_Monroe_Doctrine_cfvn5s.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1823-12-02",
      //     endDate: "1823-12-02",
      //     category: ["american history", " american imperialism"],
      //     meta: "With fears of European powers trying to colonize the western hemisphere yet again, The Monroe Doctrine declared the west off-limits to European interference, although US military enforcement would not be possible for years to come.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Magician of San Francisco",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669704424/platos-peach-video/The_Magician_of_San_Francisco_qbto0r.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1826-01-12",
      //     endDate: "1875-08-27",
      //     category: ["american history", " westward expansion"],
      //     meta: "Nicknamed the magician of San Francisco, William Chapman Ralston made and ultimately lost immense fortunes before his untimely and controversial death.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Trail of Tears",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669730399/platos-peach-video/The_Trail_of_Tears_ryqrsg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1830",
      //     endDate: "1850",
      //     category: ["american history", " american indian wars"],
      //     meta: "The Trail of Tears, when the US government forced 60,000 Native Americans to relocate from their homelands in the American Southeast to new lands west of the Mississippi River.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Second Middle Passage",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669722887/platos-peach-video/The_Second_Middle_Passage_hb87ar.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1830",
      //     endDate: "1860",
      //     category: ["american history", " south & slavery"],
      //     meta: "The Second Middle Passage was the exchange of slaves from the upper south to the lower south as cotton overshadowed tobacco production. Many of the slaves sold during this period would be separated from their families. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sitting Bull",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669574103/platos-peach-video/Sitting_Bull_iersav.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1831",
      //     endDate: "1890",
      //     category: ["biography"],
      //     meta: "Sitting Bull was a proven warrior and leader of the Lakota Sioux tribe during one of the most tumultuous periods for Native Americans as the discovery of gold and subsequent westward expansion forced them from their lands.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Rise and Fall of the Whig Party",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669719158/platos-peach-video/The_Rise_and_Fall_of_the_Whig_Party_rx12jt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1834",
      //     endDate: "1856",
      //     category: ["american history", " abolition"],
      //     meta: "The Whig Party was a short-lived political party rising to power in the United States in 1834 and affiliations included Henry Clay, John Quincy Adams and Abraham Lincoln.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mark Twain",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669552193/platos-peach-video/Mark_Twain_tbgqua.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1835-10-30",
      //     endDate: "1910-04-21",
      //     category: ["biography"],
      //     meta: "Born Samuel Clemens, Mark Twain was a famous author who made an early living as a steamboat captain and reporter before publishing his widely acclaimed books.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "John Muir",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669543598/platos-peach-video/John_Muir_kaed8o.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1838-04-21",
      //     endDate: "1914-12-24",
      //     category: ["biography"],
      //     meta: "John Muir was a Scottish immigrant to America and a deeply religious man. After an early accident that nearly blinded him, Muir found his purpose in nature, becoming a well-regarded conservationist and author.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Opium Wars",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669712887/platos-peach-video/The_Opium_Wars_dmink9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1839",
      //     endDate: "1860",
      //     category: ["military history", " opium wars"],
      //     meta: "When Europeans forced the Chinese to import opium into their country, causing widespread addiction among the population, two Opium Wars would follow.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Cahill's Crossing",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669517499/platos-peach-video/Cahill_s_Crossing_aj9ukl.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1845",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Located in remote Northern Australia, Cahill’s Crossing is a frequently flooded river transit point, notorious for vehicles getting washed off the submerged roadway, especially during the rainy season.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Clipper Ships",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669522359/platos-peach-video/Clipper_Ships_lxafpi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1845",
      //     endDate: "1873",
      //     category: ["american history", " westward expansion"],
      //     meta: "Clipper Ships were built on the Chesapeake Bay between 1795 and 1815. Their unheard-of sailing speeds made them popular for trade and record-setting passages. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Irish Potato Famine",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669697978/platos-peach-video/The_Irish_Potato_Famine_lh0lgh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1845",
      //     endDate: "1852",
      //     category: ["european history", " world history"],
      //     meta: "As potato crops failed in 1845 due to a fungal-like microorganism known as Phytophthora infestans, the Irish Potato Famine would result in millions of Irish poor fleeing the country or dying from starvation and diseases caused by malnutrition. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Donner Party",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669604279/platos-peach-video/The_Donner_Party_gu2sk5.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1846",
      //     endDate: "1847",
      //     category: ["american history", " westward expansion"],
      //     meta: "In 1846, the Donner Party was the last westbound wagon train of the season and the first with wagons to attempt a new route, which forced them to endure a deadly Sierra Nevada winter at Truckee Lake.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "California Genocide",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669518035/platos-peach-video/California_Genocide_afydcd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1846",
      //     endDate: "1873",
      //     category: ["american history", " native american history"],
      //     meta: "As the gold rush brought a steady inflow of white settlers, the California Genocide was a period of racially driven arrest, enslavement, and murder of thousands of native Californians between 1846 and 1873.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Bear Flag Revolt",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669594789/platos-peach-video/The_Bear_Flag_Revolt_d3mrd8.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1846-06-01",
      //     endDate: "1846-07-01",
      //     category: ["american history", " westward expansion"],
      //     meta: "As manifest destiny pushed the American sense of entitlement further west, John Fremont entered California inspired by the Republic of Texas and seized an opportunity in Sonoma County, leading to the Bear Flag Revolt of 1845.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Wilmot Proviso",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669743950/platos-peach-video/Wilmot_Proviso_cwjnii.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1846-08-08",
      //     endDate: "1846-08-08",
      //     category: ["american history", " abolition"],
      //     meta: "The Wilmot Proviso was a bill that failed to become law prohibiting slavery in new U.S. territories west of the Mississippi River. Despite its three-time failure to pass, It did successfully provoke a nationwide debate over slavery.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Alexander Graham Bell",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669507945/platos-peach-video/Alexander_Graham_Bell_iodtoc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1847",
      //     endDate: "1922",
      //     category: ["biography"],
      //     meta: "Alexander Graham Bell was an inventor and entrepreneur, most famous for inventing the first working telephone in 1875. The Bell Telephone Company would be the foundation for today's AT&T.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Thomas Edison",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669737826/platos-peach-video/Thomas_Edison_b6jflr.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1847-02-11",
      //     endDate: "1931-10-18",
      //     category: ["biography"],
      //     meta: "Thomas Edison began his long career as an inventor to resolve his own hearing impairment, filing more than 1,000 patents on innumerable inventions. Edison continued to work into his 80s until his death at age 84.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Birth of Weather Forecasting in America",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669596300/platos-peach-video/The_Birth_of_Weather_Forecasting_in_America_nkompo.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1848",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Weather forecasting has gradually grown in sophistication from its history of almanac algorithms and crowdsourced weather observations to more accurate predictive modeling. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The California Gold Rush",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669599444/platos-peach-video/The_California_Gold_Rush_jkgyvz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1848",
      //     endDate: "1855",
      //     category: ["american history", " westward expansion"],
      //     meta: "After surface gold was discovered in the American River on January 24th, 1848, the California gold rush soon brought droves of 'forty-niners' seeking their gold mining fortunes.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Karl Marx and the Communist Manifesto",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669545365/platos-peach-video/Karl_Marx_and_the_Communist_Manifesto_eejdvv.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1848-02-21",
      //     endDate: "1848-02-21",
      //     category: ["biography"],
      //     meta: "Karl Marx and Friedrich Engels were ideological refugees in 19th century Europe and co-authors of the Communist Manifesto, where they advocated for the end of capitalism. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Seneca Falls Convention",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669723100/platos-peach-video/The_Seneca_Falls_Convention_qvu27w.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1848-07-19",
      //     endDate: "1848-07-20",
      //     category: ["american history", " womens suffrage"],
      //     meta: "Organized and led by abolitionists and women's rights activists such as Elizabeth Cady Stanton, Seneca Falls Convention in 1848 brought 300 people together to pen their manifesto and inspire change. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Industrial Revolution in America",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669696846/platos-peach-video/The_Industrial_Revolution_in_America_wbdhue.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1850",
      //     endDate: "1914",
      //     category: ["american history", " industrial revolution"],
      //     meta: "Beginning in the later half of the 18th century, the Industrial Revolution in America was a major shift to machine-aided, assembly-line production in factories. The Industrial Revolution saw wealth accumulate in the pockets of industrialists, while working conditions and wages remained low for the majority.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Compromise of 1850",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669522885/platos-peach-video/Compromise_of_1850_ggvdy3.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1850",
      //     endDate: "1850",
      //     category: ["american history", " abolition"],
      //     meta: "As the US expanded west, the debate over slavery in new territories led to the Compromise of 1850, leaving many states and citizens divided — particularly over the Fugitive Slave Act.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Calamity Jane",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669517776/platos-peach-video/Calamity_Jane_htq3y1.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1852-05-01",
      //     endDate: "1903-08-01",
      //     category: ["biography"],
      //     meta: "Calamity Jane was known as a frontierswoman, sharpshooter and lurid storyteller, but also a raging alcoholic and intermittent prostitute. Jane was a storyteller in Buffalo Bill's Wild West Show and appeared in the Pan-American Exposition in Buffalo, New York. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Potato Chips",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669692214/platos-peach-video/The_History_of_Potato_Chips_oo3mhq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1853",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "Although contested, the history of potato chips dates back to 1853 when Cornelius Vanderbilt sent his fried potatoes back to chef George Crum who sliced them as thin as possible before deep-frying them, becoming widely accepted as the inventor of the potato chip. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Kansas-Nebraska Act",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669698930/platos-peach-video/The_Kansas-Nebraska_Act_mvinx5.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1854-05-30",
      //     endDate: "1854-05-30",
      //     category: ["american history", " abolition"],
      //     meta: "The Kansas-Nebraska Act of 1854 allowed popular sovereignty in newly created territories, effectively repealing the Missouri Compromise and sparking conflict over the expansion of slavery. It was a major catalyst for the American Civil War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Bleeding Kansas",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669515200/platos-peach-video/Bleeding_Kansas_jw2xay.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1855",
      //     endDate: "1861",
      //     category: ["american history", " abolition"],
      //     meta: "Bleeding Kansas was a period of violent clashes between 1854 and 1861 in the newly-established Kansas territory over the national debate of slavery versus abolition.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Booker T. Washington",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669516023/platos-peach-video/Booker_T._Washington_ab9nap.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1856-04-05",
      //     endDate: "1915-11-14",
      //     category: ["biography"],
      //     meta: "Booker T Washington was born a slave but fled north after the Civil War, where he was educated in the all-black Hampton Institute. Washington went on to principal the Tuskegee Institute, publish five books and deliver powerful speeches on race.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: " Life and Works of Nikolo Tesla",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669702765/platos-peach-video/The_Life_and_Inventions_of_Nikola_Tesla_bkdqfq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1856-07-10",
      //     endDate: "1943-01-07",
      //     category: ["biography"],
      //     meta: "Nikola Tesla was a brilliant inventor who contributed to early radio technology, alternating current, X-rays and more. Despite receiving royalties from Westinghouse, Tesla would die near penniless and plagued by mental illness.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Woodrow Wilson's Racist Policies",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669744590/platos-peach-video/Woodrow_Wilson_s_Racist_Policies_xzzxer.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1856-12-28",
      //     endDate: "1924-02-03",
      //     category: ["american history", " progressive era"],
      //     meta: "Woodrow Wilson was lauded for his leadership during WWI but his views on race, slavery and segregation halted progress toward racial equality during the early 20th century and would tarnish his legacy.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Dred Scott Decision",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669604458/platos-peach-video/The_Dred_Scott_Decision_inhuit.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1857",
      //     endDate: "1857",
      //     category: ["american history", " south & slavery"],
      //     meta: "In March of 1857, the U.S. Supreme Court issued its decision on the Dred Scott case of slavery status within free-states, citing African American exclusion from the Constitution and its unalienable rights.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Mountain Meadows Massacre",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669708447/platos-peach-video/The_Mountain_Meadows_Massacre_doaxbj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1857-09-07",
      //     endDate: "1857-09-07",
      //     category: ["american history", " westward expansion"],
      //     meta: "On September 11, 1857, John D. Lee under supposed orders from Brigham Young, ordered his fellow Mormons and Paiute Indians to execute 120 American pioneers heading west.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Billy the Kid",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669514094/platos-peach-video/Billy_The_Kid_zfw5zi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1859",
      //     endDate: "1881",
      //     category: ["biography"],
      //     meta: "Billy the Kid was orphaned in Wichita, Kansas at 14 and quickly turned to crime and murder to make his mark on the 19th-century American wild west.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "French Imperialism in Southeast Asia",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669530011/platos-peach-video/French_Imperialism_in_Southeast_Asia_o56jdi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1860",
      //     endDate: "1953",
      //     category: ["european history", " european imperialism"],
      //     meta: "Following decades of indigenous pushback against French colonization in Southeast Asia, France’s victory over China in the Sino-French War handed control of modern Vietnam, Thailand and more. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Pony Express",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669715683/platos-peach-video/The_Pony_Express_yhrlhh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1860-04-03",
      //     endDate: "1861-10-26",
      //     category: ["american history", " westward expansion"],
      //     meta: "For a brief 18-month period the Pony Express made it possible for mail to cross the country in 10 days instead of 8 weeks, the prior standard by ship.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Annie Oakley",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669511062/platos-peach-video/Annie_Oakley_gzol8c.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1860-08-13",
      //     endDate: "1926-11-03",
      //     category: ["biography"],
      //     meta: "Annie Oakley was born in 1860 and soon became an expert marksman while hunting in the Darke County, Ohio region. After besting professional sharpshooter Frank Butler, the pair of gunslingers would get married and travel the world as competitive sharpshooters.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The First Battle of Bull Run",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669613028/platos-peach-video/The_First_Battle_of_Bull_Run_d51nrg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1861-07-21",
      //     endDate: "1861-07-21",
      //     category: ["military history", " american civil war"],
      //     meta: "Early Union Army victories gave Abraham Lincoln the confidence to order a strike on Confederate troops in the first battle of bull run with the intent of clearing defensive positions of Richmond, the Confederate capital.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Military Traditions of Taps",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669707470/platos-peach-video/The_Military_Traditions_of_Taps_k2qiqa.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1862",
      //     endDate: "Present",
      //     category: ["military history", " tradition of taps"],
      //     meta: "Taps is a military tradition that originated during the American Civil War and is played at military funerals and ceremonies to honor fallen soldiers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Homestead Act",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669694625/platos-peach-video/The_Homestead_Act_y8k35y.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1862",
      //     endDate: "1976",
      //     category: ["american history", " westward expansion"],
      //     meta: "Abraham Lincoln spearheaded the Homestead Act of 1862 to incentivize westward expansion among citizens and settlers, granting deeds up to 160 acres of land so long as they could prove residency and improvement projects.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Alice In Wonderland",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669508785/platos-peach-video/Alice_In_Wonderland_rpul47.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1862",
      //     endDate: "Present",
      //     category: ["art", " literature"],
      //     meta: "Lewis Carroll created the story for Alice in Wonderland on a River Thames boat ride near Oxford, in which a bored young girl Alice (named after Alice Liddell, another passenger on the boat) falls down a rabbit hole into a subterranean fantasy world populated by peculiar, anthropomorphic creatures.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Shiloh",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669591903/platos-peach-video/The_Battle_of_Shiloh_ynzp1l.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1862-04-06",
      //     endDate: "1862-04-06",
      //     category: ["military history", " american civil war"],
      //     meta: "Conducting a dawn patrol on April 6th, 1862, Union soldiers stumbled upon a battle-ready Confederate line just a mile from the Union Army’s encampment. When attacked, the bluecoats were driven back toward Shiloh Church, beginning the bloody Battle of Shiloh. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Capture of New Orleans",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669599610/platos-peach-video/The_Capture_of_New_Orleans_ob7xvq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1862-04-24",
      //     endDate: "1862-04-29",
      //     category: ["military history", " american civil war"],
      //     meta: "The Capture of New Orleans occurred in 1862 during the American Civil War. Union forces under General Benjamin F. Butler captured the city, securing a major strategic and economic victory for the North. It was a turning point in the war and marked the beginning of Union control of the Mississippi River.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Second Battle of Bull Run",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669722669/platos-peach-video/The_Second_Battle_of_Bull_Run_tsusws.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1862-08-28",
      //     endDate: "1862-08-30",
      //     category: ["military history", " american civil war"],
      //     meta: "As Robert E. Lee's outnumbered Confederate Army faced the Union Army in the Second Battle of Bull Run,  misread strategy predictions would lead to a decisive victory for the Confederates, pushing them to their next battle of Antietam.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Antietam",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669585602/platos-peach-video/The_Battle_of_Antietam_yme9cn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1862-09-17",
      //     endDate: "1862-09-17",
      //     category: ["military history", " american civil war"],
      //     meta: "On the bloodiest day of the American Civil War, the Battle of Antietam was fought near Sharpsburg, Maryland on September 17th, 1862, when the Union Army faced a Confederate offensive into the north. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Fredericksburg",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669587782/platos-peach-video/The_Battle_of_Fredericksburg_mpqvss.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1862-12-11",
      //     endDate: "1862-12-11",
      //     category: ["military history", " american civil war"],
      //     meta: "The Battle of Fredericksburg occurred between December 11th and December 15th, 1862 resulting in victory for the Confederate Army, dealing a painful blow to President Lincoln and the Union Army.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Transcontinental Railroad",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669739916/platos-peach-video/Transcontinental_Railroad_i8ecjb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863",
      //     endDate: "1869",
      //     category: ["american history", " westward expansion"],
      //     meta: "The first transcontinental railroad was completed on May 10th, 1869 but not without immense investment, risk, and ill-gotten rewards.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mosby's Rangers",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669556474/platos-peach-video/Mosby_s_Rangers_l3cytq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863",
      //     endDate: "1865",
      //     category: ["military history", " american civil war"],
      //     meta: "The Confederal hit-and-run guerrilla 43rd Battalion repeatedly caused mayhem and death to Union front lines led by John S. Mosby and his rangers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Wright Brothers",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669736849/platos-peach-video/The_Wright_Brothers_cvmyzt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863",
      //     endDate: "1912",
      //     category: ["biography"],
      //     meta: "Wilbur and Orville Wright had early interests in flight and using money from their bicycle shop, funded early explorations in gas-powered airplanes. In 1903, Wilbur took the first flight in a powered airplane, a major stepping stone in aviation history. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "William Randolph Hearst",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669743415/platos-peach-video/William_Randolph_Hearst_hm4q4m.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863-04-29",
      //     endDate: "1951-08-14",
      //     category: ["biography"],
      //     meta: "William Randolph Hearst inherited the San Francisco Examiner newspaper from his father, ultimately growing his media empire to a national powerhouse through sensationalism and yellow journalism.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Siege of Vicksburg",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669724269/platos-peach-video/The_Siege_of_Vicksburg_lz7ffz.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863-05-18",
      //     endDate: "1863-07-04",
      //     category: ["military history", " american civil war"],
      //     meta: "The Siege of Vicksburg was a 40-day holdout between Confederate troops led by General Pemberton and the Union Army led by Maj General Grant. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Gettysburg",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669588488/platos-peach-video/The_Battle_of_Gettysburg_pg8wjr.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863-07-01",
      //     endDate: "1863-07-03",
      //     category: ["military history", " american civil war"],
      //     meta: "After Robert E. Lee ordered his Confederate Army to attack the North's Union Army, the Battle of Gettysburg was a multiple-day conflict and turning point event in the Civil War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The New York City Draft Riots of 1863",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669711238/platos-peach-video/The_New_York_City_Draft_Riots_of_1863_ajetkm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863-07-11",
      //     endDate: "1863-07-16",
      //     category: ["world history"],
      //     meta: "Remaining the most lethal and destructive riot in American history, the New York City Draft Riots of 1863 started with opposition to Lincoln's draft and morphed into a race war.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Gettysburg Address",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669680250/platos-peach-video/The_Gettysburg_Address_yrlffy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863-11-18",
      //     endDate: "1863-11-18",
      //     category: ["american history", " civil war"],
      //     meta: "On November 19th, 1863, Abraham Lincoln delivered his Gettysburg Address at the dedication of the national cemetery. In less than 275 words, Lincoln eloquently spoke to a crowd of 15,000 people, but his words would go on to reverberate throughout American history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sand Creek Massacre",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669572428/platos-peach-video/Sand_Creek_Massacre_psifen.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1864-11-29",
      //     endDate: "1864-11-29",
      //     category: ["american history", " westward expansion"],
      //     meta: "As Gold-Seeking Anglo Americans forced Native Americans from their land, Colonel John Chivington ordered his soldiers to attack the Cheyenne and Arapahoe encampment, known as the Sand Creek Massacre.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Union Army Propels Lincoln to a Second Term",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669733495/platos-peach-video/The_Union_Army_Propels_Lincoln_to_a_Second_Term_bimttm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1864",
      //     endDate: "1864",
      //     category: ["american history", " civil war"],
      //     meta: "Despite early devotion to General George McClellan from Union Army soldiers, his later dismissal as field commander and anti-war sentiment shifted support to Lincoln's reelection in 1864.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Fort Pillow",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669587380/platos-peach-video/The_Battle_of_Fort_Pillow_ca4vur.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1864-04-12",
      //     endDate: "1864-04-12",
      //     category: ["military history", " american civil war"],
      //     meta: "On April 12th, 1864, the Battle of Fort Pillow found Union defenses greatly outnumbered by Confederate forces. Upon surrender, the mostly African American Union soldiers were gunned down after being refused POW status.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Atlanta",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669586042/platos-peach-video/The_Battle_of_Atlanta_bxe2h0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1864-07-22",
      //     endDate: "1864-07-22",
      //     category: ["military history", " american civil war"],
      //     meta: "In the spring of 1864, General Ulysses S. Grant ordered five simultaneous offensives into the South, vying for the South's largest industrial, logistical, and administrative center outside of Richmond, the Battle of Atlanta.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Freedmen's Bureau",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669678272/platos-peach-video/The_Freedmen_s_Bureau_t5ogwl.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1865",
      //     endDate: "1872",
      //     category: ["american history", " reconstruction"],
      //     meta: "Established by an act of Congress on March 3rd, 1865, the Freedmen’s Bureau was conceived as a temporary agency to last the remainder of the war plus one year to follow. The intent of the act was to help the four million newly-freed blacks transition from slavery to a free-labor economy. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Reconstruction and the Post-Civil War South",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669569802/platos-peach-video/Reconstruction_and_the_Post-Civil_War_South_wxdvwk.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1865",
      //     endDate: "1877",
      //     category: ["american history", " reconstruction"],
      //     meta: "After the Civil War, President Andrew Johnson left reconstruction in the defeated southern states to the states themselves, which resulted in laws known as 'black codes' designed to hinder African American progress.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Juneteenth",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669544998/platos-peach-video/Juneteenth_djb7be.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1865",
      //     endDate: "Present",
      //     category: ["american history", " african american history"],
      //     meta: "In a young nation divided over slavery, on June 19th, 1865, Union Major General Granger declared all enslaved people free from bondage in Texas, leading to Juneteenth as a recognized holiday to celebrate the abolition of slavery in the US.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Carpetbaggers and Scalawags",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669519234/platos-peach-video/Carpetbaggers_and_Scalawags_rjndkw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1865",
      //     endDate: "1877",
      //     category: ["american history", " reconstruction"],
      //     meta: "Carpetbaggers and scalawags were both publicly criticized in the south for their part in the post Civil War reconstruction era. Carpetbaggers were northern opportunists looking to fill the slave labor gap and Scalawags were southern whites that supported civil rights.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Appomattox Court House",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669585817/platos-peach-video/The_Battle_of_Appomattox_Court_House_amscg8.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1865-04-08",
      //     endDate: "1865-04-09",
      //     category: ["military history", " american civil war"],
      //     meta: "The Battle of Appomattox Court House and the subsequent decision would bring an end to the Civil War as Lee's confederate troops dwindled down enough to force surrender to Grant and the Union Army. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Assassination of Abraham Lincoln",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669584705/platos-peach-video/The_Assassination_of_Abraham_Lincoln_atzcwy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1865-04-15",
      //     endDate: "1865-04-15",
      //     category: ["american history", " reconstruction"],
      //     meta: "The assassination of Abraham Lincoln, 16th US President who was assassinated by a group of Confederate sympathizers on April 14th, 1865, one week after the end of the Civil War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Buffalo Soldiers",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669517333/platos-peach-video/Buffalo_Soldiers_ujwqfa.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1867",
      //     endDate: "1896",
      //     category: ["military history", " warriors"],
      //     meta: "The 85-year proud tradition of the Buffalo Soldiers, which were all-black cavalry and infantry regiments who fought from 1866 through the Korean War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Early American Imperialism",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669524765/platos-peach-video/Early_American_Imperialism_njmohf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1867",
      //     endDate: "1903",
      //     category: ["american history", " american imperialism"],
      //     meta: "Early American imperialism was the result of patriotic hubris and a belief in manifest destiny, leading to military conflicts and land grabs, including the cessation of the now western US from Mexico, plus Cuba, Guam, Hawaii and more. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Alaska Purchase",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669506852/platos-peach-video/Alaska_Purchase_ug65om.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1867-03-30",
      //     endDate: "1867-03-30",
      //     category: ["american history", " westward expansion"],
      //     meta: "The Purchase of Alaska from Russia was completed on October 18th, 1867, adding 586,412 square miles to the U.S. territory for only $7.2 million, less than two cents an acre.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Impeached American Presidents",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669539463/platos-peach-video/Impeached_Presidents_of_the_United_States_biqfvh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1868",
      //     endDate: "2020",
      //     category: ["american history", " world history"],
      //     meta: "Although nearly one out of three US Presidents have come under scrutiny by Congress for the potential to be impeached, four Presidents in history have been formally charged with impeachment.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Navajo Treaty of 1868",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669709216/platos-peach-video/The_Navajo_Treaty_of_1868_dxqk3y.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1868",
      //     endDate: "1868",
      //     category: ["american history", " native american history"],
      //     meta: "After years of violence between the Navajo and the U.S. Army, the Navajo People were ordered to relocate from Arizona to New Mexico, only to find barren land and death, which led to the Navajo Treaty of 1868, allowing the tribe to move back home under conditions of peace.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "W.E.B. Du Bois",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669742495/platos-peach-video/W.E.B._Du_Bois_gjikv6.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1868-02-23",
      //     endDate: "1963-08-27",
      //     category: ["biography"],
      //     meta: "William Edward Burghardt Du Bois, or W.E.B. for short, was educated at Fisk University, Harvard and the University of Berlin. Du Bois would publish many influential studies, essays and books on the subject of racism in America before he joined the communist party and moved to Ghana. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Impeachment of Andrew Johnson",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669696141/platos-peach-video/The_Impeachment_of_Andrew_Johnson_ot7hun.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1868-02-24",
      //     endDate: "1868-02-24",
      //     category: ["american history", " reconstruction"],
      //     meta: "The impeachment of Andrew Johnson was caused by the ideological differences between Congress and the president during the post-civil war reconstruction era. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Opelousas Massacre",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669712655/platos-peach-video/The_Opelousas_Massacre_expbzm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1868-09-13",
      //     endDate: "1868-10-12",
      //     category: ["american history", " civil rights movement"],
      //     meta: "The Opelousas Massacre was a politically-charged racist attack on Black residents and republicans in Louisiana in 1868, resulting in the deaths of more than 250 people, mostly African Americans.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Brooklyn Bridge",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669598711/platos-peach-video/The_Brooklyn_Bridge_jkcwt3.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1869",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The Brooklyn Bridge was built between 1870 and 1883 at a cost of $15.5 million or roughly half a billion in today’s currency. It would cost the lives of 27 men and severely injure many more, paralyzing the chief project engineer and bridge designer's son.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mahatma Gandhi",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669550174/platos-peach-video/Mahatma_Gandhi_xlwzyx.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1869-10-02",
      //     endDate: "1948-01-30",
      //     category: ["biography"],
      //     meta: "Mahatma Gandhi was a lawyer by profession, protestor by practice, and peaceful by nature. Gandhi left his mark on South Africa and his birth country, India, before being assassinated by a Hindu fanatic.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The 15th Amendment",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669578759/platos-peach-video/The_15th_Amendment_pvdl4z.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1870",
      //     endDate: "1870",
      //     category: ["american history", " reconstruction"],
      //     meta: "Adding weight behind the First Reconstruction Act to give post-Civil War African Americans their rights, the 15th Amendment supported U.S. voting rights, indiscriminate of race, color, or previous condition of servitude.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Age of Imperialism in China",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669580097/platos-peach-video/The_Age_of_Imperialism_in_China_stk0vi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1870",
      //     endDate: "1914",
      //     category: ["european history", " european imperialism"],
      //     meta: "In response to tensions between China and global trade partners during the Age of Imperialism, China would go through a period of war, nationalism and rebellion in response to outside oppression.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Gilded Age",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669680795/platos-peach-video/The_Gilded_Age_wcgs7d.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1870",
      //     endDate: "1900",
      //     category: ["american history", "  gilded age"],
      //     meta: "The American Gilded Age, a time when industrialist robber barons controlled the money, while the majority of Americans worked long hours for little pay.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Bonanza Kings",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669597089/platos-peach-video/The_Bonanza_Kings_vz9zqs.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1870",
      //     endDate: "1900",
      //     category: ["american history", "  gilded age"],
      //     meta: "The Bonanza Kings were four uneducated Irish immigrants who became the richest men in the world from their silver find in Virginia City, Nevada.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Chicago Fire",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669682389/platos-peach-video/The_Great_Chicago_Fire_tbv7zi.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1871-10-08",
      //     endDate: "1871-10-10",
      //     category: ["world history"],
      //     meta: "The Great Chicago Fire broke out on October 8th, 1871, leaving some 100,000 Chicagoans homeless after the destruction of more than 17,000 structures. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Houdini",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669538304/platos-peach-video/Houdini_go4vtv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1874-03-24",
      //     endDate: "1926-10-31",
      //     category: ["biography"],
      //     meta: "Harry Houdini, born Erich Weisz, was a captivating performer who used his sheer physical strength and abilities to pick conventional locks to escape harrowing situations.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Herbert Hoover",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669535234/platos-peach-video/Herbert_Hoover_we0r2v.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1874-08-10",
      //     endDate: "1964-10-20",
      //     category: ["biography"],
      //     meta: "Herbert Hoover became a multi-millionaire from his mining operations before dedicating his time to public service during WWI and his eventual ascension to the presidency in 1928. His election was poorly timed as the stock market crash and great depression soon followed.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Winston Churchill",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669744349/platos-peach-video/Winston_Churchill_ofelso.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1874-11-30",
      //     endDate: "1965-01-24",
      //     category: ["biography"],
      //     meta: "Winston Churchill saw action during his service in the British Army, which led him to publish a book chronicling his experiences. Entering politics in 1911, Churchill would ascend to Prime Minister in 1939, leading Britain through World War II. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Compromise of 1877",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669601907/platos-peach-video/The_Compromise_of_1877_ah7fho.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1877",
      //     endDate: "1877",
      //     category: ["american history", " reconstruction"],
      //     meta: "The Compromise of 1877 involved collusion and closed-door politics to hand the White House to electoral vote loser Rutherford B. Hayes in exchange for the end of Civil War Reconstruction.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Jim Crow Laws and the Segregated South",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669542077/platos-peach-video/Jim_Crow_Laws_and_the_Segregated_South_y1om7w.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1877",
      //     endDate: "1965",
      //     category: ["american history", " civil rights movement"],
      //     meta: "Designed to marginalize African Americans by limiting their right to vote, access to good paying jobs and higher education, Jim Crow laws and segregation would take many years, social revolutions, and legal precedents to repeal.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Pancho Villa",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669562695/platos-peach-video/Pancho_Villa_sotphu.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1878-06-05",
      //     endDate: "1923-07-20",
      //     category: ["biography"],
      //     meta: "Pancho Villa was a Mexican fugitive turned revolutionary and politician, elected Governor of Chihuahua in 1913. After a failed coup attempt and angered by U.S. support for his opponent, Pancho Villa raided Columbus, New Mexico. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Joseph Stalin",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669544086/platos-peach-video/Joseph_Stalin_qpfk1u.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1878-12-18",
      //     endDate: "1953-03-05",
      //     category: ["biography"],
      //     meta: "Joseph Stalin was a youthful advocate of Marxism during the National Bolshevik Party's ascendance to power and became dictator of the Soviet Union in 1929. Stalin's reign of terror cost the lives of an estimated 20 million Russians.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Thomas Edison Sees the Light",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669737534/platos-peach-video/Thomas_Edison_Sees_the_Light_lpccfe.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1879",
      //     endDate: "1880",
      //     category: ["science", " technology"],
      //     meta: "Thomas Edison was not the first to invent the lightbulb, but he did create a commercially viable incandescent bulb with carbon filament.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Albert Einstein",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669507109/platos-peach-video/Albert_Einstein_c4cclz.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1879-03-14",
      //     endDate: "1955-04-18",
      //     category: ["biography"],
      //     meta: "Albert Einstein, educated in Physics and Math, had his 'marvelous year' of theoretical productivity in 1905, catapulting him into the spotlight of intellectual fame and professorship until his death in 1955. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Social Darwinism",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669574576/platos-peach-video/Social_Darwinism_za8ay4.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1880",
      //     endDate: "1945",
      //     category: ["world history"],
      //     meta: "Charles Darwin's theory of natural selection, the propensity for strong genes to propagate through evolution and weak genes to die, has been applied unnaturally to society in the form of the eugenics movement and gene-editing technologies.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Early History of American Immigration",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669604740/platos-peach-video/The_Early_History_of_American_Immigration_kfqwz6.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1880",
      //     endDate: "1920",
      //     category: ["american history", " early immigration"],
      //     meta: "From Native Americans to migrant workers, the history of immigration in the US includes precedent-setting policy, social pushback, the establishment of Ellis Island and continues to evolve daily.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Helen Keller",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669534996/platos-peach-video/Helen_Keller_ogrl1w.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1880-06-27",
      //     endDate: "1968-06-01",
      //     category: ["biography"],
      //     meta: "Helen Keller lost her sight and hearing at 19 months of age, but despite these handicaps, learned to read and write, eventually graduating from Harvard and authoring fourteen books. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Chinese Exclusion Act",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669599883/platos-peach-video/The_Chinese_Exclusion_Act_cwfsd7.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1882-05-06",
      //     endDate: "1882-05-06",
      //     category: ["american history", " early immigration"],
      //     meta: "After a series of events including war, floods, droughts and crop failures drove tens of thousands of Chinese immigrants to San Francisco, The Chinese Exclusion Act of 1882 suspended Chinese immigration for a ten-year period.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Fiorello La Guardia",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669528166/platos-peach-video/Fiorello_La_Guardia_qpn8zx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1882-12-11",
      //     endDate: "1947-09-20",
      //     category: ["biography"],
      //     meta: "Fiorello La Guardia was a US Congressman and the 99th Mayor of New York City, from 1934 to 1945. He cleaned up corruption, improved city services, and helped the poor. He was a progressive reformer, fought against Tammany Hall, and welcomed immigrants.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Newburgh Conspiracy",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669711435/platos-peach-video/The_Newburgh_Conspiracy_r3pxtt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1783",
      //     endDate: "1783",
      //     category: ["military history", " american revolutionary war"],
      //     meta: "On March 15th, 1783, six months before the signing of the Treaty of Paris, George Washington convened Continental Army officers to deliver his Newburgh Conspiracy speech, convincing rebellious officers to unanimously support congress.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The American Eugenics Movement",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669582923/platos-peach-video/The_American_Eugenics_Movement_hextkx.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1883",
      //     endDate: "1979",
      //     category: ["american history", " world history"],
      //     meta: "Eugenics is the systematic selection and cleansing of the human gene pool through forced sterilization, euthanasia and more, but is entirely subjective and racially biased. The term “Eugenics” was coined by a cousin to Charles Darwin, Sir Francis Galton, in his 1869 publication of Hereditary Genius.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Statue of Liberty",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669726951/platos-peach-video/The_Statue_of_Liberty_yyejgx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1884",
      //     endDate: "Present",
      //     category: ["american history", " world history"],
      //     meta: "The Statue of Liberty was conceived, designed and constructed by the French to honor the centennial of America's Declaration of Independence. The statue arrived in New York Harbor in 1886 and has become an iconic national monument. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Scramble For Africa",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669722430/platos-peach-video/The_Scramble_For_Africa_mkngxx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1885",
      //     endDate: "1914",
      //     category: ["european history", " european imperialism"],
      //     meta: "By the late 1870s, Europe controlled less than 10% of the African continent, but between 1881 and 1914, the New Imperialism or the Scramble for Africa saw 90% of the continent controlled by seven European powers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mohawk Skywalkers",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669556253/platos-peach-video/Mohawk_Skywalkers_tthjbd.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1886",
      //     endDate: "1907",
      //     category: ["american history", " native american history"],
      //     meta: "The Mohawk Skywalkers were ironworkers from the Six Nations Reserve and Akwesasne tribes in New York State and Canada, who worked in dangerous conditions to build bridges and skyscrapers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Haymarket Riot",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669686685/platos-peach-video/The_Haymarket_Riot_fv6o1z.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1886-05-04",
      //     endDate: "1886-05-04",
      //     category: ["american history", " industrial revolution"],
      //     meta: "As protests of wage and working conditions by industrial workers were violently denied by Police, a retaliation rally was organized at Haymarket Square, which soon escalated into a deadly riot.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Eiffel Tower",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669605387/platos-peach-video/The_Eiffel_Tower_yc2d7o.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1887",
      //     endDate: "Present",
      //     category: ["european history", " world history"],
      //     meta: "The Eiffel Tower was built by bridge builder and architect Gustave Eiffel for the 1889 World's Fair and was the tallest structure in the world at the time. It was almost deconstructed twice but found purpose in broadcasting and tourism.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Lawrence of Arabia",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669547048/platos-peach-video/Lawrence_of_Arabia_vmxsbg.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1888-08-16",
      //     endDate: "1935-05-19",
      //     category: ["biography"],
      //     meta: "Thomas Edward Lawrence, known popularly as Lawrence of Arabia, was a British intelligence officer during the Arab Revolt of WWI. Lawrence would contribute many valuable intelligence reports leading to his promotion to Major and would go on to re-enlist in the RAF under a pseudonym.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Johnstown Flood of 1889",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669698712/platos-peach-video/The_Johnstown_Flood_of_1889_aqaweg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1889-05-31",
      //     endDate: "1889-05-31",
      //     category: ["world history"],
      //     meta: "Johnstown flood of 1889, when a poorly-maintained damn gave way, sending a 21-foot-tall wall of water through downtown Johnstown Pennsylvania.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Tong Wars of New York City",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669729712/platos-peach-video/The_Tong_Wars_of_New_York_City_xtiauu.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1890",
      //     endDate: "1920",
      //     category: ["american history", " world history"],
      //     meta: "Beginning in the 1890s, two rival Chinese gangs known as tongs fought in an ongoing bloodfest in New York’s Chinatown, vying for control of the opium trade, illegal gambling and prostitution. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ellis Island",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669526005/platos-peach-video/Ellis_Island_wnq23c.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1892",
      //     endDate: "1954",
      //     category: ["american history", " early immigration"],
      //     meta: "From 1892 to 1924, Ellis Island welcomed over 12 million immigrants to America but not before medical evaluation and interviews of intents.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Red Baron",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669718066/platos-peach-video/The_Red_Baron_icolag.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1892",
      //     endDate: "1918",
      //     category: ["military history", " world war one"],
      //     meta: "Born into nobility in 1892, Baron von Richthofen would become the most feared German fighter pilot in the early aerial combat days of WWI. Flying his blood-red bi-plane, he was given the nickname 'The Red Baron,' and ultimately achieved 80 confirmed aerial victories before his death at age 25. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mao Zedong",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669551270/platos-peach-video/Mao_Zedong_ofgyiz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1905-03-07",
      //     endDate: "1905-05-29",
      //     category: ["biography", " china"],
      //     meta: "Mao Zedong was the communist leader of the People's Republic of China from 1949 until his death in 1976. Mao's initiatives in land reform and social revolution led to the deadliest famine in recorded human history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Peanut Butter",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669691935/platos-peach-video/The_History_of_Peanut_Butter_kye2we.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1895",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "While the Incas first ground peanuts into paste, John Harvey Kellogg was the modern inventor of peanut butter, filing for a patent in 1895. Innovations in processing led to the average American consuming 1,500 PB&J sandwiches before high school graduation.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "J. Edgar Hoover",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669539897/platos-peach-video/J._Edgar_Hoover_d0rypv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1895-01-01",
      //     endDate: "1972-05-02",
      //     category: ["biography"],
      //     meta: "J. Edgar Hoover was a lawyer by training but spent 48 years as Director of the FBI. His controversial tactics and range of power were evident in his many campaigns to identify fascists and communists.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Christy Girls",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669521183/platos-peach-video/Christy_Girls_e7ljsd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1896",
      //     endDate: "1920",
      //     category: ["american history", " world war one"],
      //     meta: "Deemed America's most commercially successful artist during the late 19th- and early 20th-Centuries, Howard Chandler Christy illustrated his Christy Girls, setting the tone for the idealized feminine form and fashion.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Turning Point Presidential Election of 1896",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669731921/platos-peach-video/The_Turning_Point_Presidential_Election_of_1896_frj43a.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1896",
      //     endDate: "1896",
      //     category: ["american history", " world history"],
      //     meta: "The election of 1896 was pivotal for the gold standard as agrarian voters argued for a switch to silver. Voter turnout in 1896 was 79% and William McKinley won by a wide margin.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Yellow Journalism",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669745658/platos-peach-video/Yellow_Journalism_vovhbe.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1896",
      //     endDate: "Present",
      //     category: ["american history", " world history"],
      //     meta: "Yellow Journalism is the strategy deployed by tabloid news magazines and more, Intending to excite public opinion using scare headlines of minor news events, the reliance on pseudoscience data and testimonies from questionable sources. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "F. Scott Fitzgerald",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669527454/platos-peach-video/F._Scott_Fitzgerald_qd7dhw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1896-09-24",
      //     endDate: "1940-12-21",
      //     category: ["american history", "  roaring twenties"],
      //     meta: "F. Scott Fitzgerald was an American writer who rose to popularity during the Roaring 20s. His marriage to Zelda Sayre would end because of his alcoholism and her schizophrenia before his early death at the age of 44.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Progressive Era",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669716755/platos-peach-video/The_Progressive_Era_f3abfs.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1897",
      //     endDate: "1920",
      //     category: ["american history", " progressive era"],
      //     meta: "Lasting from 1896 to 1916, the Progressive Era was a period of social reform after the excesses of the Gilded Age, promoting such causes as prohibition, suffrage, corporate governance and labor laws.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Rough Riders",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669720896/platos-peach-video/The_Rough_Riders_rtrxie.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1898-04-21",
      //     endDate: "1898-12-10",
      //     category: ["military history", " spanish-american war"],
      //     meta: "Teddy Roosevelt and the Rough Riders of the Spanish-American War. Of the three major engagements fought by Rough Riders, Battle of San Juan Hill was the crowning achievement.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Spanish-American War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669726001/platos-peach-video/The_Spanish-American_War_u4omga.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1898-04-21",
      //     endDate: "1898-12-10",
      //     category: ["military history", " spanish-american war"],
      //     meta: "Lasting just seven months and nineteen days in 1898, the Spanish-American War was fought mostly in the waters of the Caribbean around Cuba, but also in the Philippines. The Spanish-American War officially ended with the Treaty of Paris signed on December 10th, 1898.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Al Capone",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669506468/platos-peach-video/Al_Capone_tnacug.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1899-01-17",
      //     endDate: "1947-01-25",
      //     category: ["biography"],
      //     meta: "Al Capone was a prohibition-era bootlegger and gangster who earned the nickname 'scarface' by getting slashed with a knife. After living a high-profile life of crime in Chicago, Capone was convicted on tax-evasion charges.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ernest Hemingway",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669527001/platos-peach-video/Ernest_Hemingway_nlvviz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1899-07-21",
      //     endDate: "1961-07-02",
      //     category: ["biography"],
      //     meta: "Ernest Hemingway was an American Pulitzer Prize-winning author who served in both World Wars, lived a life of adventure, and ultimately committed suicide in 1961.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Boxer Rebellion",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669598216/platos-peach-video/The_Boxer_Rebellion_jkmyat.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1899-11-02",
      //     endDate: "1901-09-07",
      //     category: ["world history", " china"],
      //     meta: "Blaming foreign oppressors in the west as the cause of famine, floods and poverty, the Boxer Rebellion was a secret movement to attack foreigners and Christian converts during China's Qing Dynasty in 1899.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The First Cross-Country Road Trip by Car",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669614990/platos-peach-video/The_First_Cross-Country_Road_Trip_by_Car_ob6qnz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1903",
      //     endDate: "1903",
      //     category: ["american history", " world history"],
      //     meta: "The first cross-country trip by car was completed in less than 65 days by Dr. Horatio Nelson Jackson, bicycle mechanic Sewall Crocker and a bulldog named Bud, winning a fifty-dollar bet that inspired the trip. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Panama Canal",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669714650/platos-peach-video/The_Panama_Canal_a8ef6l.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1904",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Between French and American efforts it took 33 years to complete the Panama Canal. There were 500 deaths per mile of manmade waterway.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The General Slocum Disaster of 1904",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669679757/platos-peach-video/The_General_Slocum_Disaster_of_1904_ifrmeb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1904-06-15",
      //     endDate: "1904-06-15",
      //     category: ["world history"],
      //     meta: "General Slocum disaster of 1904, when a New York City-based excursion paddle wheeler caught fire shortly after the ship departed for a church outing to Long Island Sound.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mutiny of the Pennsylvania Line",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669557739/platos-peach-video/Mutiny_of_the_Pennsylvania_Line_rgyqbn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1904-11-15",
      //     endDate: "1781-01-08",
      //     category: ["american history", " revolution & independence"],
      //     meta: "Considered the most successful insurrection of the Revolutionary War, on January 1st, 1781 continental soldiers prepared to depart the camp without permission, complaining of low pay, horrendous living conditions and a mass insistence that their three-year enlistment terms had expired.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "History of Mother's Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669535689/platos-peach-video/History_of_Mother_s_Day_tmpwnx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1905",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "The history of Mother's Day dates back to ancient Greece and medieval Britain but modern Mother's day was inspired by Anna Jarvis who held a church service handing out white carnations to all the mothers in attendance.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "George Washington Carver",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669531756/platos-peach-video/George_Washington_Carver_frhk7f.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1864-01-01",
      //     endDate: "1943-01-05",
      //     category: ["biography"],
      //     meta: "George Washington Carver was born into slavery but became the first Black man to earn a Bachelor of Science degree before pursuing a Masters degree. Carver invented crop rotation and more than 300 products based on peanuts. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "San Francisco's Earthquake of 1906",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669721736/platos-peach-video/The_San_Francisco_Earthquake_of_1906_glmaku.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1906",
      //     endDate: "1906",
      //     category: ["american history", " westward expansion"],
      //     meta: "San Francisco’s earthquake of 1906 destroyed 500 city blocks when broken gas mains and a crippled water supply burned much of the city. This 3-minute video gives more information about the event.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Model T Ford",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669707896/platos-peach-video/The_Model_T_Ford_m5zg8u.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1908",
      //     endDate: "1927",
      //     category: ["world history"],
      //     meta: "Henry Ford's Model T, one of the longest production models in automotive history sold over 15 million cars between 1908 and 1927.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Thurgood Marshall",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669738706/platos-peach-video/Thurgood_Marshall_drps69.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1908-07-02",
      //     endDate: "1993-01-24",
      //     category: ["biography"],
      //     meta: "Thurgood Marshall was born in Baltimore in 1908, rejected by the University of Maryland School of law due to his race, the basis for a discrimination lawsuit he would eventually win, and went on to become a Supreme Court Justice. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Joseph McCarthy",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669543783/platos-peach-video/Joseph_McCarthy_pqj21t.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1908-11-14",
      //     endDate: "1957-05-02",
      //     category: ["biography"],
      //     meta: "Fiery senator Joseph McCarthy from Wisconsin who fueled the anti-communist Red Scare movement in the United States known as McCarthyism.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Bonnie and Clyde",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669515656/platos-peach-video/Bonnie_and_Clyde_jzazqs.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1930",
      //     endDate: "1934",
      //     category: ["american history", " world history"],
      //     meta: "Bonnie and Clyde became superstar outlaws due to their youthful good looks and lengthy track record of murder, armed robbery and outright contempt for the law. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Migration",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669683568/platos-peach-video/The_Great_Migration_njyt0c.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1910",
      //     endDate: "1970",
      //     category: ["american history", " african american history"],
      //     meta: "The Great Migration was a period during the 20th century when more than six million African Americans relocated from the segregated South to find opportunities and safety in less racist parts of the U.S.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Jacques Cousteau",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669540169/platos-peach-video/Jacques_Cousteau_kyp6nb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1910-06-11",
      //     endDate: "1997-06-25",
      //     category: ["biography"],
      //     meta: "Jacques Cousteau was a deep-sea explorer, inventor, documentarian, author and environmental activist who led many famous expeditions and efforts to understand the ocean. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Triangle Shirtwaist Fire",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669731144/platos-peach-video/The_Triangle_Shirtwaist_Fire_xrnsr1.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1911",
      //     endDate: "1911",
      //     category: ["american history", " industrial revolution"],
      //     meta: "In March of 1911, the Triangle Shirtwaist Factory fire burned the New York City building, trapping many due to fire prevention misconduct and ultimately taking the lives of 146 mostly young immigrant women.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The New England Heatwave of 1911",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669710968/platos-peach-video/The_New_England_Heatwave_of_1911_uoalts.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1911-07-04",
      //     endDate: "1911-07-15",
      //     category: ["world history"],
      //     meta: "In 1911, Americans from Pennsylvania to Maine sweltered under 11 days of a crippling heatwave, long before the advent of air conditioning during New England's record-breaking heatwave.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Stealing Mona Lisa",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669576735/platos-peach-video/Stealing_Mona_Lisa_hufke9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1911-08-21",
      //     endDate: "1913-12-15",
      //     category: ["world history"],
      //     meta: "The Mona Lisa was stolen from the Louvre Museum in 1911, where the painting hung in relative obscurity in a backwater wing of the museum. Picasso was accused, Napoleon was accused, but Vincenzo Perugia was caught for stealing the mona lisa.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Harlem Hellfighters",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669686096/platos-peach-video/The_Harlem_Hellfighters_cxupvt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1913",
      //     endDate: "1946",
      //     category: ["military history", " world war one"],
      //     meta: "The most celebrated African-American fighting regiment during WWI, the Harlem Hellfighters faced racism at home before facing off with Germany longer than any other fighting unit in the war. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Gerald Ford",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669532260/platos-peach-video/Gerald_Ford_z3trid.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1913-07-14",
      //     endDate: "2006-12-26",
      //     category: ["biography"],
      //     meta: "Gerald Ford served in WWII before entering the House of Representatives for 25 years. Ford was appointed Vice President in the wake of Nixon's Watergate Scandal and would soon become the first unelected president after Nixon's resignation from office. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Jesse Owens",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669541587/platos-peach-video/Jesse_Owens_t9uovk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1913-09-12",
      //     endDate: "1980-03-31",
      //     category: ["biography"],
      //     meta: "Jesse Owens was a record-breaking track and field star who became the first African American athlete to sign a sponsorship deal and won four gold medals in the 1936 summer Olympics. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ernest Shackleton Survives the South Pole",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669527243/platos-peach-video/Ernest_Shackleton_Survives_the_South_Pole_argzyv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1914-08-08",
      //     endDate: "1916-08-30",
      //     category: ["biography"],
      //     meta: "In a South Pole expedition, Ernest Shackleton captained the HMS Endurance until it was trapped in the ice, causing her crew to survive for 20 months in Antarctica.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Tannenberg",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669592301/platos-peach-video/The_Battle_of_Tannenberg_v3lnhk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1914-08-26",
      //     endDate: "1914-08-30",
      //     category: ["military history", " world war one"],
      //     meta: "The Battle of Tannenberg was one of the earliest battles of WWI between German and Russian forces. Russians attempted to outflank the Germans but endured three days of punishing assaults before retreating into a victory for Germany.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The First Battle of the Marne",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669614075/platos-peach-video/The_First_Battle_of_the_Marne_wumvlf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1914-09-06",
      //     endDate: "1914-09-12",
      //     category: ["military history", " world war one"],
      //     meta: "The First Battle of the Marne escalated World War I as the German advance on Paris forced French and British forces to defend the French capital, leading to an early allied victory against German aggression. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Christmas Truce of 1914",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669600327/platos-peach-video/The_Christmas_Truce_of_1914_rrviz3.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1914-12-24",
      //     endDate: "1914-12-25",
      //     category: ["military history", " world war one"],
      //     meta: "In spite of WWI leaders' denial of the Pope's plea for a Christmas ceasefire, frontline soldiers along both sides of the western front decided on a Christmas Truce and met halfway in no man's land, exchanging cigarettes, haircuts and even a soccer match.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Armenian Genocide",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669584107/platos-peach-video/The_Armenian_Genocide_icx4fn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1915",
      //     endDate: "1923",
      //     category: ["military history", " world war one"],
      //     meta: "With the outbreak of World War One as a distraction, the Young Turks of the Ottoman Empire took horrific efforts to force the Christian Armenian minority from their homeland, seeking an ethnically pure Islamic Turkey and resulting in the Armenian Genocide of 1915.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Julius and Ethel Rosenberg",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669544691/platos-peach-video/Julius_and_Ethel_Rosenberg_aomy2n.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1915",
      //     endDate: "1953",
      //     category: ["biography"],
      //     meta: "After WWII, the fast pace at which the Soviets achieved nuclear capabilities led to the discovery that design documents had been leaked. Julius and Ethel Rosenberg were ultimately implicated as soviet spies and sentenced to death, sparking an anti-semitic narrative.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Gallipoli",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669588134/platos-peach-video/The_Battle_of_Gallipoli_nbp25a.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1915-02-19",
      //     endDate: "1916-01-09",
      //     category: ["military history", " world war one"],
      //     meta: "In the nearly eleven-month Battle of Gallipoli, some 480,000 Allied troops fought, witnessing 250,000 casualties, including 46,000 deaths, making it one of the bloodiest campaigns of World War One.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Billie Holiday",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669513858/platos-peach-video/Billie_Holiday_pev3gg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1915-04-07",
      //     endDate: "1959-07-17",
      //     category: ["biography"],
      //     meta: "Billie Holiday, born in 1915, was a singer who rose from poverty and prostitution to become one of the most iconic and highest-paid jazz musicians of the 20th century.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Sinking of the Lusitania",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669724729/platos-peach-video/The_Sinking_of_the_Lusitania_e3uihz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1915-05-07",
      //     endDate: "1915-05-07",
      //     category: ["military history", " world war one"],
      //     meta: "The Lusitania was sunk in 1915 when a Germany U-boat torpedoed the passenger liner off the coast of Ireland, taking the lives of 1,200 innocent passengers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Harlem Renaissance",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669686418/platos-peach-video/The_Harlem_Renaissance_bpxmmv.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1917",
      //     endDate: "1939",
      //     category: ["american history", " african american history"],
      //     meta: "The Harlem Renaissance was a golden age for African American writers, artists, and musicians who migrated to Harlem seeking affordable rents during the Great Migration. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Zimmerman Telegram",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669737287/platos-peach-video/The_Zimmerman_Telegram_kz4cvq.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1917",
      //     endDate: "1917",
      //     category: ["military history", " world war one"],
      //     meta: "German foreign secretary Arthur Zimmermann's telegram to Mexico in 1917 was intercepted and deciphered, prompting the U.S. to rescind isolationism and declare war on Germany, officially entering WWI.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Bolshevik Revolution",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669596772/platos-peach-video/The_Bolshevik_Revolution_kqr2ao.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1917",
      //     endDate: "1923",
      //     category: ["european history", " world history"],
      //     meta: "After sustaining the largest WWI casualties of any nation and a ravaged economy, the Russian, or Bolshevik, Revolution resulted in marxist dictators like Lenin and Stalin rising to power.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Halifax Disaster of 1917",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669685857/platos-peach-video/The_Halifax_Disaster_of_1917_qyritn.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1917-12-06",
      //     endDate: "1917-12-06",
      //     category: ["world history"],
      //     meta: "On December 6th, 1917, the Halifax explosion disaster destroyed structures in a half-mile radius after hundreds of tons of explosives ignited in a maritime collision.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mask Slackers and the Spanish Flu of 1918",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669553348/platos-peach-video/Mask_Slackers_and_the_Spanish_Flu_of_1918_dvw8yi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1918",
      //     endDate: "1920",
      //     category: ["american history", " world war one"],
      //     meta: "U.S. health officials were forced to shame and threaten slackers to wear a mask due to a second spike in Spanish Flu cases during the 1918 pandemic.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Weimar Republic",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669735388/platos-peach-video/The_Weimar_Republic_dfudn4.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1918",
      //     endDate: "1933",
      //     category: ["european history", " world history"],
      //     meta: "The Weimar Republic was a post-WWI Germany that defaulted on its foreign debts, leading to hyperinflation and ultimately a rise in nationalism and Hitler's ascension to power.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Spanish Flu of 1918",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669725526/platos-peach-video/The_Spanish_Flu_of_1918_sh0qff.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1918",
      //     endDate: "1920",
      //     category: ["science", " technology"],
      //     meta: "Spanish Flu of 1918, which engulfed the world in two years, killing 50-100 million people in its wake. Far more deadly than the Coronavirus of 2020.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Red Summer of 1919",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669718309/platos-peach-video/The_Red_Summer_of_1919_mbhavl.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919",
      //     endDate: "1919",
      //     category: ["american history", " world history"],
      //     meta: "In 1919, white soldiers returned from WWI to find their jobs filled with southern blacks who had migrated north. The Red Summer of 1919 was a racially tense period of riots, murders, arson, and more. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Palmer Raids",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669714442/platos-peach-video/The_Palmer_Raids_vkjrpu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919",
      //     endDate: "1920",
      //     category: ["american history", " world history"],
      //     meta: "The Palmer Raids were a series of arrests, interrogations and deportations of suspected immigrant anarchists, socialists and communists radicalizing within the United States. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Rise and Fall of Fascism",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669718918/platos-peach-video/The_Rise_and_Fall_of_Fascism_drzege.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919",
      //     endDate: "1945",
      //     category: ["european history", " world history"],
      //     meta: "Fascism was a far-right, authoritarian ultranationalist ideology that emerged from Europe in WWI and ended with WWII. The regimes and results of Mussolini and Hitler sealed the fate of another failed experiment in governance. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Boston Molasses Flood of 1919",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669682088/platos-peach-video/The_Great_Boston_Molasses_Flood_of_1919_friwy7.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919-01-15",
      //     endDate: "1919-01-15",
      //     category: ["world history"],
      //     meta: "The Great Boston molasses flood of 1919 where warm molasses mixed with cold and caused its container to break and take the lives of 21 people.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Treaty of Versailles",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669730907/platos-peach-video/The_Treaty_of_Versailles_sovdhx.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919-06-28",
      //     endDate: "1919-06-28",
      //     category: ["military history", " world war one"],
      //     meta: "In the wake of WWI, the Big Four western nations met at the Paris Peace Conference to discuss war reparations and sanctions against Germany. The Treaty of Versailles would drive Germans to extremism with the rise of Adolf Hitler.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Maurice Hilleman Predicts a Deadly Pandemic",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669553804/platos-peach-video/Maurice_Hilleman_Predicts_a_Deadly_Pandemic_hqnnj5.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919-08-30",
      //     endDate: "2005-04-11",
      //     category: ["science", " technology"],
      //     meta: "In 1957, after a lethal respiratory virus emerged out of Hong Kong, Maurice Hilleman studied the H2N2 strain and predicted a US pandemic. Despite his claims being ignored by government officials, pharmaceutical companies used Hilleman's work to create a vaccine that saved an estimated one million American lives.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sacco & Vanzetti",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669571916/platos-peach-video/Sacco_Vanzetti_phkbhn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1920",
      //     endDate: "1927",
      //     category: ["american history", " world history"],
      //     meta: "Sacco and Vanzetti were Italian anarchists that fit the profile of the suspects in an armed robbery case and were quickly sentenced to death, which sparked outcries over racial profiling and social justice.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Roaring Twenties",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669719668/platos-peach-video/The_Roaring_Twenties_nglcjk.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1920",
      //     endDate: "1920",
      //     category: ["american history", "  roaring twenties"],
      //     meta: "After WWI, the US experienced a decade of decadence known as the roaring 20s. The twenties were a period of rising prosperity but also rising indebtedness, which led to the stock market crash of 1929.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Flappers of the Roaring Twenties",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669528378/platos-peach-video/Flappers_of_the_Roaring_Twenties_jpkwry.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1920",
      //     endDate: "1930",
      //     category: ["american history", "  roaring twenties"],
      //     meta: "Flappers of the roaring 20s were known for their awe-inspiring behaviors like smoking, drinking, bobbing their hair, and wearing revealing dresses.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Prohibition in America",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669568566/platos-peach-video/Prohibition_in_America_vgghqc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1920-01-17",
      //     endDate: "1933-12-05",
      //     category: ["american history", " prohibition"],
      //     meta: "Since the first Europeans landed on Plymouth Rock, alcohol has been a centerpiece in American culture. In response to the negative side effects of alcohol, the prohibition era outlawed the production and consumption of alcohol, ushering in a period of organized crime and illegal consumption.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "John Glenn",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669543140/platos-peach-video/John_Glenn_vfkhs0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1921-07-18",
      //     endDate: "2016-12-08",
      //     category: ["biography"],
      //     meta: "John Glenn was an American pilot and astronaut, having set records for the first supersonic transcontinental flight and the distinction as the oldest person to ever fly in space.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Collapse of the Soviet Union",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669522647/platos-peach-video/Collapse_of_the_Soviet_Union_jkpxos.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1899-12-30",
      //     endDate: "1899-12-30",
      //     category: ["american history", " post-cold war"],
      //     meta: "After the Cold War, the USSR was in a period of economic stagnation and reform towards free market capitalism which led to the loss of their baltic state territories and ultimately the collapse of the Soviet Union.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Rosewood Massacre",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669720671/platos-peach-video/The_Rosewood_Massacre_tnthmy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1923-01-01",
      //     endDate: "1923-01-01",
      //     category: ["american history", " civil rights movement"],
      //     meta: "The Rosewood Massacre occurred after allegations that a black man had assaulted a white woman, resulting in KKK members and other white haters taking violent and murderous action against black citizens of Rosewood, Florida.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Leopold and Loeb",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669548286/platos-peach-video/Leopold_and_Loeb_bogqo5.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1924",
      //     endDate: "1924",
      //     category: ["american history", "  roaring twenties"],
      //     meta: "Leopold and Loeb were intelligent sons of wealthy families in Chicago but decided to use their intellligence to commit a self-described 'perfect crime.' Far from perfect, the murder of Bobby Franks was quickly solved, leading to confessions by Leopold and Loeb.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mein Kampf",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669555015/platos-peach-video/Mein_Kampf_te5x9y.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1925",
      //     endDate: "1925",
      //     category: ["military history", " world war two"],
      //     meta: "Mein Kampf: Hitler's Forewarning Autobiography - Adolf Hitler wrote Mein Kampf while imprisoned after a failed coup d’é·tat of the Bavarian government. The autobiography espouses his racial views and clearly references extermination, indicating future plans for a 'final solution.'",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Medgar Evers",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669554077/platos-peach-video/Medgar_Evers_fguvgp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1925",
      //     endDate: "1963",
      //     category: ["american history", " civil rights movement"],
      //     meta: "Medgar Evers was a WWII veteran and civil rights activist who worked as an NAACP field secretary in Mississippi before he was assassinated by Byron De La Beckwith.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Malcolm X",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669550617/platos-peach-video/Malcolm_X_yzyjch.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1925-05-19",
      //     endDate: "1965-02-21",
      //     category: ["american history", " civil rights movement"],
      //     meta: "Malcolm X, born Malcolm Little, was imprisoned at 21 for larceny and soon introduced to Islam where his violent views for achieving racial equality would form the basis for his eventual assassination.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Scopes Monkey Trial",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669722213/platos-peach-video/The_Scopes_Monkey_Trial_dahr1h.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1925-07-10",
      //     endDate: "1925-07-21",
      //     category: ["american history", " world history"],
      //     meta: "The Scopes Monkey Trial was a public case in Dayton, Tennessee, regarding the teaching of evolution in schools defying the Christian fundamentalist belief in creationism. While evolutionists lost the legal case, Christian fundamentalists lost in the court of public opinion. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Cesar Chavez",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669519743/platos-peach-video/Cesar_Chavez_cfluhe.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1927-03-31",
      //     endDate: "1993-04-23",
      //     category: ["biography"],
      //     meta: "After dropping out of the eighth grade to support his family during the Great Depression, Cesar Chavez became an activist for migrant farm workers improving wages, hours and living conditions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Alexander Fleming Discovers Penicillin",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669507689/platos-peach-video/Alexander_Fleming_Discovers_Penicillin_fw73h3.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1928",
      //     endDate: "1928",
      //     category: ["science", " biography"],
      //     meta: "On September 28, 1928, Alexander Fleming discovered the first antibiotic penicillin while conducting a series of experiments involving staphylococcal bacteria.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hoovervilles of the Great Depression",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669538110/platos-peach-video/Hoovervilles_of_the_Great_Depression_ttf5ao.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1929",
      //     endDate: "1939",
      //     category: ["american history", "  great depression"],
      //     meta: "As the Great Depression peaked, 25% of eligible workers found themselves homeless and unemployed, hundreds of shantytown slums sprang up across America.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Stock Market Crash of 1929",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669727200/platos-peach-video/The_Stock_Market_Crash_of_1929_atyddb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1929",
      //     endDate: "1929",
      //     category: ["american history", "  great depression"],
      //     meta: "After the roaring 20s, overconfidence led many to take on highly leveraged positions which inflated prices to unsustainable levels. Black Monday, Run on Banks, and The Great Depression all followed.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Depression",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669682731/platos-peach-video/The_Great_Depression_kxopnc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1929",
      //     endDate: "1939",
      //     category: ["american history", "  great depression"],
      //     meta: "After the roaring 20s ended with the stock market crash of 1929, the Great Depression was a decade-long period of financial hardship and stagnation. It would take a second world war to bring the nation out of the depression. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Geronimo",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669532490/platos-peach-video/Geronimo_n9mpvk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1929-06-16",
      //     endDate: "1909-02-17",
      //     category: ["american history", " native american history"],
      //     meta: "Geronimo was a Native American hunter and warrior from the Bendonkohe/Apache Chiricahua tribe, who used the murder of his wife and three children to devote himself to avenging usurpers of ancestral lands.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Black Blizzards and the Dust Bowl",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669514719/platos-peach-video/Black_Blizzards_and_the_Dust_Bowl_sc8sqx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1930",
      //     endDate: "1936",
      //     category: ["american history", "  great depression"],
      //     meta: "The Dust Bowl was a period of severe dust storms that damaged the American and Canadian prairies caused by drought and failure by farmers to apply dry land farming techniques to prevent wind erosion.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Big Bang Theory",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669513616/platos-peach-video/Big_Bang_Theory_zvf6ya.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1931",
      //     endDate: "Present",
      //     category: ["science"],
      //     meta: "Big Bang Theory is the widely adopted belief that our universe was born from an infinitely dense and hot point the size of a softball that exploded outward at the speed of light and continues to expand.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Hoover Dam",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669694898/platos-peach-video/The_Hoover_Dam_mi9fud.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1931",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The Hoover Dam is a marvel of human engineering, employing more than 21,000 men to construct with innovative concrete cooling techniques that had never been tested before at such a scale.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Stalin's Famine in the Ukraine",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669576515/platos-peach-video/Stalin_s_Famine_in_the_Ukraine_i7hpti.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1932",
      //     endDate: "1933",
      //     category: ["world history", " soviet union"],
      //     meta: "As Ukraine regained its nationalistic identity in the wake of the Bolshevik Revolution, Stalin's Holodomor Genocide, a forced famine, was intended to break their spirit of independence from Russia.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Bonus Expeditionary Forces of 1932",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669597352/platos-peach-video/The_Bonus_Expeditionary_Forces_of_1932_cigj0u.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1932",
      //     endDate: "1932",
      //     category: ["american history", "  great depression"],
      //     meta: "The Bonus Army Marchers of 1932, when WWI veterans marched on Washington, DC demanding early payment of their bonus money for their wartime sacrifices.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "End of Prohibition",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669605739/platos-peach-video/The_End_of_Prohibition_zyyngx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1933",
      //     endDate: "1933",
      //     category: ["american history", " prohibition"],
      //     meta: "Alcohol was prohibited in the United States between 1919-1933 under prohibition. After the stock market crash and support to legalize alcohol, the 18th Amendment was signed on March 22nd, 1933.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "FDR and the New Deal",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669527902/platos-peach-video/FDR_and_the_New_Deal_dmpujq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1933",
      //     endDate: "1936",
      //     category: ["american history", "  great depression"],
      //     meta: "During President Franklin D. Roosevelt's first term in office he enacted drastic legislation to stimulate the economy during the Great Depression.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Presidency of Franklin D. Roosevelt",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669716260/platos-peach-video/The_Presidency_of_Franklin_D._Roosevelt_hktmlr.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1933-03-04",
      //     endDate: "1945-04-12",
      //     category: ["american history", "  great depression"],
      //     meta: "After beating Herbert Hoover in the election of 1932, the FDR presidency would become the only four-term presidency in American history replete with depression, legislation, war and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Conquering The Hudson",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669523086/platos-peach-video/Conquering_The_Hudson_zggomi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1934",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "The construction of the Lincoln Tunnel, the first mechanically-ventilated underwater tunnel in the world was first opened on December 22nd, 1937.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Alcatraz",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669507539/platos-peach-video/Alcatraz_sw5vg0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1934",
      //     endDate: "Present",
      //     category: ["geography"],
      //     meta: "Alcatraz is an island in San Francisco Bay that was used in the 1850s as a military base and later a military prison. In 1933, the island became a prison for the most dangerous criminals in America. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Works Progress Administration",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669736593/platos-peach-video/The_Works_Progress_Administration_ifjrpz.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1935",
      //     endDate: "1938",
      //     category: ["american history", "  great depression"],
      //     meta: "On May 6th, 1935, President Franklin D. Roosevelt created The Works Progress Administration (WPA) to employ Americans in the construction of infrastructure projects during the darkest days of the Great Depression, when unemployment rates topped 20%.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hitler's Olympic Games",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669536084/platos-peach-video/Hitler_s_Olympic_Games_khftb9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1936",
      //     endDate: "1936",
      //     category: ["military history", " world war two"],
      //     meta: "The 1936 Berlin Olympics were used by Hitler and the Nazi's propaganda machine to show Germany as a kinder, gentler people after German aggressions of World War One.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Hitler Youth of Nazi Germany",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669693535/platos-peach-video/The_Hitler_Youth_of_Nazi_Germany_uowyxj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1936",
      //     endDate: "1945",
      //     category: ["military history", " world war two"],
      //     meta: "Impressionable young Germans of the Hitler Youth were exposed to Nazi ideologies and basic training that focused on self-sacrifice and physical prowess over academics.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Purge",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669684715/platos-peach-video/The_Great_Purge_gyej12.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1936",
      //     endDate: "1938",
      //     category: ["world history", " soviet union"],
      //     meta: "After Joseph Stalin declared himself dictator in 1929, he began his Great Purge of former allies, Bolshevik enemies, or anyone perceived as a threat to Stalin's power. Ultimately, the Great Purge extended into genocide of peasants, ethnic minorities and even children.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Valentina Tereshkova: The First Woman in Space",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669741090/platos-peach-video/Valentina_Tereshkova_eexhtm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1937",
      //     endDate: "Present",
      //     category: ["american history", " space race"],
      //     meta: "With no ambitions of space, Valentina Tereshkova was recruited in the first female soviet cosmonaut program. On June 16, 1963 she became the first woman in space.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Rape of Nanking",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669717810/platos-peach-video/The_Rape_of_Nanking_t9qwkq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1937",
      //     endDate: "1938",
      //     category: ["military history"],
      //     meta: "In December 1937, Japanese forces had overthrown Nanking, the Republic of China's capital. Japanese leaders encouraged rape, murder, torture, theft and arson, because Chinese soldiers dressed as civilians to blend in.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Hindenburg Disaster",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669686961/platos-peach-video/The_Hindenburg_Disaster_p6i1xw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1937-05-06",
      //     endDate: "1937-05-06",
      //     category: ["world history"],
      //     meta: "The Hindenburg Disaster occurred while attempting to moor over Lakehurst, New Jersey. After flying from Germany, the largest airship ever built burst into flames and crashed to the ground, killing or injuring many passengers and ground crew.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Nazis Use of Performance-Enhancing Drugs",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669710073/platos-peach-video/The_Nazis_Use_of_Performance-Enhancing_Drugs_ppxwfh.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1938",
      //     endDate: "1945",
      //     category: ["military history", " world war two"],
      //     meta: "As detailed by Adolf Hitler's personal physician, Nazi high command and soldiers on the frontlines were taking methamphetamines and other performance-enhancing stimulants. Hitler, Göring and other officers also consumed morphine and other opiates. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "27 Club",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669496508/platos-peach-video/27_Club_gfbdrv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1938",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The clout of the elusive 27 Club includes famous artists and musicians who coincidentally died at the ripe age of 27. Members include Kurt Cobain, Jimi Hendrix, Janis Joplin, Amy Winehouse, and far too many more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Zoot Suits",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669746468/platos-peach-video/Zoot_Suits_mlh86l.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1939",
      //     endDate: "Present",
      //     category: ["american history", " world history"],
      //     meta: "The Zoot Suit was a fashion trend to exaggerate movements and gyrations born during the Harlem Renaissance and quickly adopted by minority groups across the country, culminating in the Zoot Suit Riots of 1943. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Codebreakers of World War Two",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669601099/platos-peach-video/The_Codebreakers_of_World_War_Two_lzub7m.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1939",
      //     endDate: "1945",
      //     category: ["military history", " world war two"],
      //     meta: "The codebreakers of WWII comprised an elite assembly of brilliant mathematicians, including Alan Turing, who deciphered the German's Enigma machine codes.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Battle of Britain",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669512712/platos-peach-video/Battle_of_Britain_pbpoix.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1940-07-10",
      //     endDate: "1940-10-31",
      //     category: ["military history", " world war two"],
      //     meta: "The nearly four-month-long attack on Britain by the German Luftwaffe cost the lives of more than 20,000 people and wounded a nearly equal amount.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "R-Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669676681/platos-peach-video/R-Day_neijta.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1940-10-16",
      //     endDate: "1940-10-16",
      //     category: ["military history", " world war two"],
      //     meta: "During World War II, the US implemented a Selective Service (R-Day) on October 16, 1940, requiring all men aged 21-35 to register for military conscription. This was an effort to build up the country's armed forces to fight in the war. Over 10 million men were eventually drafted.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Night Witches of World War Two",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669711722/platos-peach-video/The_Night_Witches_of_World_War_Two_n1lssh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1941",
      //     endDate: "1945",
      //     category: ["military history", " world war two"],
      //     meta: "400 women from the soviet union became known as the night witches of WWII. These courageous pilots endured frigid temperatures, flying without radios or parachutes to deliver 23 thousand tons of bombs on Nazi frontline positions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Ritchie Boys of World War Two",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669719359/platos-peach-video/The_Ritchie_Boys_of_WWII_eaheu7.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1941",
      //     endDate: "1945",
      //     category: ["military history", " world war two"],
      //     meta: "The Ritchie Boys of World War Two were more than 15,000 servicemen who fled Nazi Germany and Austria, becoming instrumental in the allied war effort with their fluency in both the language and cultural psychology.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hatred and Healing at the Birwood Wall",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669534281/platos-peach-video/Hatred_and_Healing_at_the_Birlwood_Wall_od8zax.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1941",
      //     endDate: "Present",
      //     category: ["american history", " civil rights movement"],
      //     meta: "The Birwood Wall or Detroit’s Wailing Wall is a half-mile structure covering three city blocks for the sole purpose of racial segregation. After years of resentment, in 2006, activists and residents came together to paint murals and use the wall for healing instead of hate.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Tuskegee Airmen",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669732196/platos-peach-video/The_Tuskegee_Airmen_losfhd.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1941",
      //     endDate: "1946",
      //     category: ["military history", " world war two"],
      //     meta: "After racial skepticism prohibited African Americans from flying in the US military, the Tuskegee Airmen became decorated heroes against Nazi forces.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Lend-Lease Act of 1941",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669701365/platos-peach-video/The_Lend-Lease_Act_of_1941_sbuoe2.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1941",
      //     endDate: "1941",
      //     category: ["military history", " world war two"],
      //     meta: "Despite America’s preference for isolationism, FDR backed allied forces with military supplies with the passage of the Lend-Lease Act in 1941, giving Britain the artillery and war machines needed to fight nazi aggression.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Rosie the Riveter",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669571388/platos-peach-video/Rosie_the_Riveter_tnnm8a.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1941-12-08",
      //     endDate: "1945-09-02",
      //     category: ["american history", " world war two"],
      //     meta: "By 1943, as WWII dragged on, women filled the labor vacuum with 20 million women going to work outside the home. Many took up physically demanding and dangerous jobs as the ultimate form of patriotism.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hitler’s Atlantic Wall",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669535911/platos-peach-video/Hitler_Wants_a_Wall_ygii6o.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942",
      //     endDate: "1944",
      //     category: ["military history", " world war two"],
      //     meta: "The construction of the Nazi's Atlantic Wall was a network of fortifications that spanned 2,000 miles of Atlantic coastline in Western Europe.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Japanese Internment During WWII",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669541080/platos-peach-video/Japanese_Internment_During_WWII_zxgihi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942",
      //     endDate: "1945",
      //     category: ["american history", " world war two"],
      //     meta: "After Japan attacked Pearl Harbor, FDR signed executive order 9066 leading to the Internment of 120,000 Japanese Americans until nearly six months after WWII ended. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Code Talkers of World War Two",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669600927/platos-peach-video/The_Code_Talkers_of_World_War_Two_pawuhn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942",
      //     endDate: "1945",
      //     category: ["military history", " world war two"],
      //     meta: "Native Americans used their languages to cipher/decipher battlefield communications, which left the Nazis unable to intercept the Allies’ battle strategies.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Bataan Death March of World War Two",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669512541/platos-peach-video/Bataan_Death_March_alr5ba.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942",
      //     endDate: "1942",
      //     category: ["military history", " world war two"],
      //     meta: "In 1942, 50,000 Allied prisoners of war were forced to march in high heat without water for 100 miles to prison camps, known as the Bataan Death March.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Manhattan Project",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669704689/platos-peach-video/The_Manhattan_Project_yy90jd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942",
      //     endDate: "1946",
      //     category: ["military history", " world war two"],
      //     meta: "A joint venture between the U.S., Great Britain and Canada, The Manhattan Project resulted in the first successful development of a nuclear bomb.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "General MacArthur's Mess-up in Manilla",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669530892/platos-peach-video/General_MacArthur_s_Mess-up_in_Manilla_g9pkn3.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942",
      //     endDate: "1942",
      //     category: ["military history", " world war two"],
      //     meta: "After Japan attacked Pearl Harbor, General Douglas MacArthur failed to take decisive action against Japanese forces 300 miles away from Manila, his Philippine command. Resulting in retreat and the brutal Bataan Death March.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Midway",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669590591/platos-peach-video/The_Battle_of_Midway_ybgzha.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942-06-04",
      //     endDate: "1942-06-07",
      //     category: ["military history", " world war two"],
      //     meta: "Turning the tide on Japan's expansionist ambitions in the Pacific, the Battle of Midway would prove America's resolve and prowess in WWII.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Stalingrad",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669592093/platos-peach-video/The_Battle_of_Stalingrad_uoaxcc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942-07-17",
      //     endDate: "1943-02-02",
      //     category: ["military history", " world war two"],
      //     meta: "When Adolf Hitler set his sights on winning the Battle of Stalingrad, he proclaimed all male residents would be killed and women deported, prompting Joseph Stalin to order civilians to take up arms in defense of his namesake city. Historians argue that the Battle of Stalingrad was a significant turning point towards allied victory in WWII.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Guadalcanal",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669588698/platos-peach-video/The_Battle_of_Guadalcanal_d0fhis.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942-08-07",
      //     endDate: "1943-02-09",
      //     category: ["military history", " world war two"],
      //     meta: "A decisive victory for the Allies, which turned the tide on the Japanese expansionism into the South Pacific. The Japanese finally surrendered on September 2nd, 1945.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Expensive Flight of the Spruce Goose",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669606198/platos-peach-video/The_Expensive_Flight_of_the_Spruce_Goose_bs76u9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942-11-13",
      //     endDate: "1947-11-01",
      //     category: ["world history"],
      //     meta: "Destined to fly only once, Howard Hughes would face scrutiny in Washington for the failed Spruce Goose plane, costing taxpayers $350 million in today's currency.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Zoot Suit Riots",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669746220/platos-peach-video/Zoot_Suit_Riots_ar0aiv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1943",
      //     endDate: "1943",
      //     category: ["american history", " world history"],
      //     meta: "The Zoot Suit Riots of 1943 occurred at a time when it was unpatriotic to wear certain materials that defied the war effort narrative, causing friction between minorities who wore zoot suits and servicemen who were offended.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "British Airmen Crash a Nazi Party",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669516784/platos-peach-video/British_Airmen_Crash_a_Nazi_Party_rsevyu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1943-01-20",
      //     endDate: "1943-01-20",
      //     category: ["military history", " world war two"],
      //     meta: "The Royal Air Force's daylight raids of January 30, 1943, when they disrupted Germans in Berlin as they celebrated the tenth anniversary of Hitler's ascension to power.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Operation Overlord",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669561731/platos-peach-video/Operation_Overlord_iiz5tu.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1944-06-06",
      //     endDate: "1944-08-30",
      //     category: ["military history", " world war two"],
      //     meta: "Codenamed Operation Overlord but referred to as D-Day, the June 6 1944 invasion of Normandy would prove to be the largest seaborne invasion in history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Operation Reunion",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669562287/platos-peach-video/Operation_Reunion_zuui4i.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1944-08-31",
      //     endDate: "1944-08-31",
      //     category: ["military history", " world war two"],
      //     meta: "Operation Reunion in late August 1944, when 1,162 captured Allied airmen were repatriated to their airbases. The repatriation spanned 4 days from August 31st to September 3rd.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Operation Market Garden",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669561396/platos-peach-video/Operation_Market_Garden_mfyrsc.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1944-09-17",
      //     endDate: "1944-09-25",
      //     category: ["military history", " world war two"],
      //     meta: "Towards the end of World War II, Operation Market Garden was an attempted allied invasion into the industrial heartland of Germany's Ruhr Valley. Anti-aircraft defenses, bad weather, communication difficulties and more would cause the operation to fail, possibly prolonging the war by six months.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of the Bulge",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669592551/platos-peach-video/The_Battle_of_the_Bulge_tvwocm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1944-12-14",
      //     endDate: "1945-01-25",
      //     category: ["military history", " world war two"],
      //     meta: "One of the bloodiest and most decisive battles of World War Two was fought over six brutal weeks between December 1944 and January 1945.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Operation Magic Carpet",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669561124/platos-peach-video/Operation_Magic_Carpet_t5c1tg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945",
      //     endDate: "1946",
      //     category: ["military history", " world war two"],
      //     meta: "As World War Two ended, Operation Magic Carpet was the US response to the logistical challenge of repatriating more than 8 million servicemen and women to North America. The operation proved to be the largest mass movement of humanity in recorded history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Operation Paperclip",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669562055/platos-peach-video/Operation_Paperclip_wgqngr.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945",
      //     endDate: "1959",
      //     category: ["military history", " world war two"],
      //     meta: "Operation Paperclip was a covert program to recruit and relocate German scientists and engineers to strengthen American scientific and technical abilities, particularly in the emerging field of rocketry.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Blue Baby Operation",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669596549/platos-peach-video/The_Blue_Baby_Operation_yufydq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945",
      //     endDate: "1945",
      //     category: ["science", " technology"],
      //     meta: "Marking the beginning of modern cardiac surgery, the first blue baby operation took place on November 29th, 1944, resolving 18-month-old Eileen Saxon's heart condition.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Japanese Holdouts of World War Two",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669540840/platos-peach-video/Japanese_Holdouts_of_WW2_m0bpgh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945",
      //     endDate: "1974",
      //     category: ["military history", " world war two"],
      //     meta: "After the Japanese surrendered from WWII in 1945, dedicated holdouts refused to acknowledge defeat, staying in hiding for decades after war was over.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Iwo Jima",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669589520/platos-peach-video/The_Battle_of_Iwo_Jima_ru7lfw.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-02-19",
      //     endDate: "1945-03-26",
      //     category: ["military history", " world war two"],
      //     meta: "The battle of Iwo Jima was an allied invasion of the island a mere 750 miles from mainland Japan, but secret fortifications left American troops overwhelmed by Japanese defenses. Despite heavy casualties, Americans finally captured both airfields and would hoist the American flag at the summit, captured in the iconic photograph.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Okinawa",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669590857/platos-peach-video/The_Battle_of_Okinawa_eaalso.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-04-01",
      //     endDate: "1945-06-22",
      //     category: ["military history", " world war two"],
      //     meta: "The Battle of Okinawa began on April 1st, 1945, as World War Two was approaching its end. Okinawa resulted in the death of 49,000 Americans and 150,000+ Japanese, including civilians.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Passing of FDR",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669715054/platos-peach-video/The_Passing_of_FDR_epznrt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-04-12",
      //     endDate: "1945-04-12",
      //     category: ["american history", " world war two"],
      //     meta: "On April 12th, 1945, FDR suddenly complained of a terrific pain in the back of his head, collapsing moments later into an unconscious heap, the victim of a massive cerebral aneurysm.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "VE-Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669741560/platos-peach-video/VE-Day_ptoegq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-05-08",
      //     endDate: "1945-05-08",
      //     category: ["military history", " world war two"],
      //     meta: "Even though the Allies remained at war with Japan, VE-Day was a massive celebration when Germany finally surrendered. 'Victory in Europe' Day of May 8, 1945.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Potsdam Declaration",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669715940/platos-peach-video/The_Potsdam_Declaration_tguvfr.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-07-26",
      //     endDate: "1945-07-26",
      //     category: ["military history", " world war two"],
      //     meta: "Proving to be a calculated bluff to end World War Two, the Potsdam Declaration gave Japan an ultimatum for unconditional surrender or nuclear war.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The USS Indianapolis",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669733775/platos-peach-video/The_USS_Indianapolis_jfzhzz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-07-30",
      //     endDate: "1945-07-30",
      //     category: ["military history", " world war two"],
      //     meta: "The USS Indianapolis successfully delivered the Uranium 235 needed in the atomic weapons used against Japan before Japanese submarines sank the vessel, ultimately leaving 317 of the nearly 1,200 men having survived 4-days of treachery at sea.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Nuremberg Trials",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669712186/platos-peach-video/The_Nuremberg_Trials_jth0wr.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1945-11-20",
      //     endDate: "1946-10-01",
      //     category: ["military history", " world war two"],
      //     meta: "The Nuremberg Trials between 1945 and 1949 attempted to bring Nazi war criminals to justice, including the sentencing of lengthy prison terms and executions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The American Baby Boom",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669582234/platos-peach-video/The_American_Baby_Boom_wyppes.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1946",
      //     endDate: "1964",
      //     category: ["american history", " american 1950s"],
      //     meta: "The American baby boom added 74.6 million people to the American population in the first two post-war decades after World War Two.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Hollywood Ten",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669693980/platos-peach-video/The_Hollywood_Ten_iata3u.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1947",
      //     endDate: "1960",
      //     category: ["american history", " american 1950s"],
      //     meta: "The Hollywood Ten were a group of writers and directors who refused to cooperate with the anti-communism committee proceedings. Their defiance would result in jail time, debt, and Hollywood's blacklist.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Truman Doctrine",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669731594/platos-peach-video/The_Truman_Doctrine_dr8mym.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1947-03-12",
      //     endDate: "1947-03-12",
      //     category: ["american history", " cold war era"],
      //     meta: "In an effort to halt communist expansion and aggression, the Truman Doctrine provided millions in aid to Turkey and Greece after Britain's war-torn economy could support them no longer. Truman's doctrine is arguably the starting point of the Cold War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Cold War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669601576/platos-peach-video/The_Cold_War_yljzv6.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1947-03-12",
      //     endDate: "1991-12-26",
      //     category: ["american history", " cold war era"],
      //     meta: "The Cold War was a 45-year period when the Soviet Union and the United States repeatedly faced the threat of mutually-assured nuclear annihilation including the Cuban Missile Crisis, the Bay of Pigs Invasion, and numerous proxy wars.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Kon-Tiki Expedition",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669699364/platos-peach-video/The_Kon-Tiki_Expedition_ws0uvz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1947-04-28",
      //     endDate: "1947-08-07",
      //     category: ["world history"],
      //     meta: "Kon-Tiki Expedition of 1947 when Thor Heyerdahl embarked on a trans-Pacific passage on a balsa wood raft named 'Kon-Tiki,' sailing from South America to the Polynesian Islands.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Marshall Plan",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669705393/platos-peach-video/The_Marshall_Plan_pykks3.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1947-12-19",
      //     endDate: "1948-04-03",
      //     category: ["american history", " world war two"],
      //     meta: "After WWII decimated Europe's infrastructure and supply chain, US Secretary of State George Marshall proposed his Marshall Plan to distribute $15 billion in aid to 16 European nations, signed by President Truman in April of 1948.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Berlin Airlift",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669595336/platos-peach-video/The_Berlin_Airlift_olhtxs.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1948-06-24",
      //     endDate: "1949-05-12",
      //     category: ["american history", " cold war era"],
      //     meta: "Between 1948 and 1949, the United States and Great Britain agreed to airlift millions of tons of supplies into West Berlin, after the Soviets cut off all land and sea access to the city",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Mann Gulch Fire of 1949",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669704953/platos-peach-video/The_Mann_Gulch_Fire_of_1949_b5e8wb.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1949-08-05",
      //     endDate: "1949-08-05",
      //     category: ["world history"],
      //     meta: "On August 5th, 1949, a grass fire erupted near Helena, Montana, prompting 15 smokejumpers to parachute into the wildfire. When the firefighters' escape plan was thwarted by the the fast-moving fire, of the three survivors, one survivor's quick thinking creat a firefighting technique still used to this day.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The American 1950s",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669581353/platos-peach-video/The_American_1950s_ue2nfz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1950",
      //     endDate: "1960",
      //     category: ["american history", " american 1950s"],
      //     meta: "After the Great Depression and World War Two, the American Dream of the 1950s was to buy a home, start a family and enjoy American capitalism. Despite Cold War concerns, progress in civil rights, culture and entertainment were made in great strides. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Korean War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669699611/platos-peach-video/The_Korean_War_n0mik0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1950-06-25",
      //     endDate: "1953-07-27",
      //     category: ["military history", " korean war"],
      //     meta: "Known as the forgotten war due to overshadowing caused by WWI, WWII and later Vietnam, the Korean War was a conflict against communist North Korea as they pushed through the 38th parallel into South Korea. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Direct-Dial Telephone Service Goes Nationwide",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669523893/platos-peach-video/Direct-Dial_Telephone_Service_Goes_Nationwide_encm0q.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1951",
      //     endDate: "1951",
      //     category: ["american history", " world history"],
      //     meta: "On November 10th, 1951 the first direct dial long-distance telephone call took place between the Mayors of Englewood, New Jersey and Alameda, California.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great London Smog of 1952",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669683236/platos-peach-video/The_Great_London_Smog_of_1952_fdsoyq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1952",
      //     endDate: "1952",
      //     category: ["european history", " world history"],
      //     meta: "In 1952, London was forced to survive five days of choking smog caused by the excessive burning of coal mixed with unfavorable weather patterns.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Project Blue Book",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669568788/platos-peach-video/Project_Blue_Book_qadaqg.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1952-03-15",
      //     endDate: "1969-12-17",
      //     category: ["world history"],
      //     meta: "Project Blue Book was a secret military program to examine reports of UFOs and analyze their threat to national security. Ultimately, the Freedom of Information Act would reveal that while many UFO sightings had an explanation, hundreds were unexplainable.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Coronation of Queen Elizabeth the Second",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669602535/platos-peach-video/The_Coronation_of_Queen_Elizabeth_the_Second_psvoji.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1953",
      //     endDate: "1953",
      //     category: ["european history", " world history"],
      //     meta: "The coronation of Queen Elizabeth the Second of the United Kingdom, months after the death of her father, King George, when she was just 27 years of age.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Domino Theory of the Cold War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669604035/platos-peach-video/The_Domino_Theory_and_the_Cold_War_tiea1c.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1954",
      //     endDate: "1989",
      //     category: ["american history", " cold war era"],
      //     meta: "A popular belief among US politicians between the 1940s and 1970s, the Domino Theory suggested that communism was contagious and would spread to neighboring countries if not contained militarily. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The TV Dinner Comes of Age",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669732658/platos-peach-video/The_TV_Dinner_Comes_of_Age_i9scto.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1954",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "In 1953, Swanson Foods had a 260-ton Turkey surplus after Thanksgiving, prompting the invention of the TV Dinner. The concept proved popular, with 10 million trays sold during its inaugural year. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Rosa Parks and the Montgomery Bus Boycott of 1955",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669570973/platos-peach-video/Rosa_Parks_and_the_Montgomery_Bus_Boycott_of_1955_srzoab.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1955",
      //     endDate: "1955",
      //     category: ["biography"],
      //     meta: "Rosa Parks and the Montgomery Bus Boycott of 1955, when black Americans boycotted for the equal rights granted them in the 14th Amendment to the U.S. Constitution.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Emmett Till",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669526556/platos-peach-video/Emmett_Till_rbkgww.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1955",
      //     endDate: "1955",
      //     category: ["american history", " civil rights movement"],
      //     meta: "Emmett Till was a 14-year-old African American boy who was murdered in cold blood for a racially-charged crime he did not commit. His mother held a 5-day open casket of Emmett's mangled body to show the world the abhorrent injustice. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The National Interstate and Defense Highways Act of 1956",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669697307/platos-peach-video/The_Interstate_and_Defense_Act_of_1956_niskt0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1956",
      //     endDate: "1956",
      //     category: ["american history", " american 1950s"],
      //     meta: "With 65 million cars on American roadways in 1956 and growing, Congress responded by passing the National Interstate and Defense Highways Act.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Hungarian Uprising of 1956",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669695664/platos-peach-video/The_Hungarian_Uprising_of_1956_q3aaav.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1956",
      //     endDate: "1956",
      //     category: ["european history", " world history"],
      //     meta: "Between October and November of 1956, the Hungarian uprising faced military opposition and the Soviet Union crushed Hungary's desire for independence.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Laika, The First Canine in Space",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669546548/platos-peach-video/Laika_The_First_Canine_in_Space_q1v9vx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1957",
      //     endDate: "1957",
      //     category: ["american history", " space race"],
      //     meta: "Laika the space dog was the commander of Sputnik 2 and first living being to visit space. The program had no plan to safely return Laika, leading to the first death in the space race.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Ford Motor Company Lays an Egg",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669677804/platos-peach-video/The_Ford_Motor_Company_Lays_an_Egg_d7fbak.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1957",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The birth and death of the Ford Edsel, known as the largest flop in automotive history costing the Ford Motor Company more than $6 billion in today's dollar.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sputnik and the Birth of the Space Race",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669576087/platos-peach-video/Sputnik_and_the_Birth_of_the_Space_Race_fyvd2k.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1957",
      //     endDate: "1957",
      //     category: ["american history", " space race"],
      //     meta: "Sputnik was launched on October 4th, 1957, signaling Soviet dominance in rocket technology and igniting fears of nuclear war. The space race intensified after a very public launch failure by the Americans before the US pulled ahead with Explorer 1, Mercury, Gemini, Apollo, and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Little Rock Nine",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669703382/platos-peach-video/The_Little_Rock_Nine_wh39sa.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1957-09-25",
      //     endDate: "1957-09-25",
      //     category: ["american history", " civil rights movement"],
      //     meta: "In the face of racial discrimination and bigotry, 9 African American teens stood up for their civil rights to attend Little Rock Central High, a historically whites-only school.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Huey's Role in the Vietnam War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669695410/platos-peach-video/The_Huey_s_Role_in_the_Vietnam_War_noqop9.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1958",
      //     endDate: "1975",
      //     category: ["military history", " vietnam war"],
      //     meta: "Out of the 11 deployed helicopters in Vietnam, the Huey or Bell UH-1D, became most essential. The Huey was ready to insert or extract troops from hot zones or rush the wounded to field hospitals.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Ho Chi Minh Trail",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669693759/platos-peach-video/The_Ho_Chi_Minh_Trail_zqc07j.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1959",
      //     endDate: "1975",
      //     category: ["military history", " vietnam war"],
      //     meta: "During the Vietnam War, The Ho Chi Minh Trail was a network of roads that ran from Communist North Vietnam to American-backed South Vietnam, transecting the kingdoms of Laos and Cambodia in a sparsely populated mountainous region of dense tropical rainforests.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "NASA Picks the Right Stuff",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669558343/platos-peach-video/NASA_Picks_the_Right_Stuff_h8zc2y.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1959",
      //     endDate: "1959",
      //     category: ["american history", " space race"],
      //     meta: "America's first astronauts sprung from Russia's successful satellite launch, Sputnik. NASA went on to promote the likes of Deke Slayton, Gus Grissom, Alan Shepard, John Glenn, and More.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "American 1960s",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669581960/platos-peach-video/The_American_1960s_xof9by.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1960",
      //     endDate: "1970",
      //     category: ["american history", " american 1960s"],
      //     meta: "1960s America was marked by the literal moonshot goal of putting a man on the moon to overshadow Cold War and Vietnam War anxieties. The 60s also saw movements in civil rights, love, drugs, and music, before turning violent near the end of the decade. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "How NASA Sold the Moon to a Skeptical Nation",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669538741/platos-peach-video/How_NASA_Sold_the_Moon_to_a_Skeptical_Nation_ndsz5j.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1960",
      //     endDate: "1972",
      //     category: ["american history", " space race"],
      //     meta: "Considering the mission for a moon landing would cost 4% of the national budget for a decade, it took clever marketing for NASA to convince Congress and the American people to support a moonshot.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The U-2 Spy Plane Incident",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669732857/platos-peach-video/The_U-2_Spy_Plane_Incident_i42nrm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1960-05-01",
      //     endDate: "1960-05-01",
      //     category: ["american history", " cold war era"],
      //     meta: "the U2 spy plane incident of 1960 when Soviet missiles shot down an American spy plane as it made a high-altitude spy flight over Russian soil.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Freedom Riders of 1961",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669529490/platos-peach-video/Freedom_Riders_of_1961_lpa4dg.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1961",
      //     endDate: "1961",
      //     category: ["american history", " civil rights movement"],
      //     meta: "The freedom riders were a group of civil rights activists who set out in buses to evaluate the Supreme Court's ruling that segregation inside transportation facilities is unconstitutional. Facing mobs of white haters, firebombs and beatings, the freedom riders left their mark on the movement.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Berlin Wall",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669595692/platos-peach-video/The_Berlin_Wall_l163vo.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1961-08-12",
      //     endDate: "1989-11-09",
      //     category: ["american history", " cold war era"],
      //     meta: "The 86-mile-long Berlin Wall was built by the Soviet Union after WWII, in response to mass defections by East Berliners into the non-communist zones of Berlin.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Marilyn Monroe Sings Happy Birthday to JFK",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669551998/platos-peach-video/Marilyn_Monroe_Sings_Happy_Birthday_to_JFK_x26vuz.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1962",
      //     endDate: "1962",
      //     category: ["american history", " american 1960s"],
      //     meta: "Marilyn Monroe sang 'happy birthday' to President John F. Kennedy at a Democratic fundraiser in 1962. The performance stunned the audience and JFK became obviously smitten.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Donut Dollies and the Vietnam War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669524094/platos-peach-video/Donut_Dollies_and_the_Vietnam_War_wwapft.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1962",
      //     endDate: "1973",
      //     category: ["american history", " american 1960s"],
      //     meta: "Donut Dollies were young, educated and vivacious women sent into the Vietnam warzone to boost troop morale and a much-needed break from war. Donut Dollies were often caught between mortar and sniper fire, giving them first-hand knowledge of the stressors of war.   ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Agent Orange",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669506212/platos-peach-video/Agent_Orange_cwcljp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1962-01-09",
      //     endDate: "1975-05-07",
      //     category: ["military history", " vietnam war"],
      //     meta: "Agent Orange was a chemical warfare herbicide intended to destroy Vietnam's dense forest coverage and food supply but resulted in deadly toxins, disease and death for U.S. soldiers and Vietnamese citizens alike.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Juanita Moody and the Cuban Missile Crisis",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669544400/platos-peach-video/Juanita_Moody_and_the_Cuban_Missile_Crisis_kj6xli.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1962-10-16",
      //     endDate: "1962-10-28",
      //     category: ["american history", " cold war era"],
      //     meta: "After the initial failure of America's intelligence community to uncover a Soviet nuclear arsenal on Cuba, Juanita Moody used her cryptanalysis training to report on and possibly thwart the escalating situation.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great English Train Robbery of 1963",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669682977/platos-peach-video/The_Great_English_Train_Robbery_of_1963_srbwan.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1963-08-08",
      //     endDate: "1963-08-08",
      //     category: ["world history"],
      //     meta: "The great English train robbery of 1963 when 13 brazen criminals stole away with 2.3 million Pounds Sterling. Robbers Charlie Wilson and Ronnie Biggs would continue their careers in deception.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Ken Kesey and the Merry Pranksters",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669545689/platos-peach-video/Ken_Kesey_and_the_Merry_Pranksters_rizjgv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1964",
      //     endDate: "1969",
      //     category: ["american history", " american 1960s"],
      //     meta: "Ken Kesey and the Merry Pranksters were a group of counterculture individuals who traveled across the United States in a psychedelic bus named 'Furthur' during the 1960s. They were known for their experimental use of drugs and their influence on the hippie movement.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Freedom Summer",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669529737/platos-peach-video/Freedom_Summer_hchx3w.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1964",
      //     endDate: "1964",
      //     category: ["american history", " civil rights movement"],
      //     meta: "In the Mississippi summer of 1964, known as Freedom Summer, civil rights activists intended to register black voters where taxes and tests stymied their rights. After the bodies of student activists were found murdered by the KKK, public outcry eventually led to the passage of civil and voting rights acts.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Society of Lyndon Baines Johnson",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669685202/platos-peach-video/The_Great_Society_of_Lyndon_Baines_Johnson_srjhtg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1964",
      //     endDate: "1965",
      //     category: ["american history", " american 1960s"],
      //     meta: "The great society was a series of progressive programs undertaken by President Lyndon B. Johnson and Congress to eliminate racial discrimination, poverty, and other moral issues in America.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Gulf of Tonkin Resolution",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669533120/platos-peach-video/Gulf_of_Tonkin_Resolution_m5ncud.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1964-04-02",
      //     endDate: "1975-04-30",
      //     category: ["military history", " vietnam war"],
      //     meta: "The Gulf of Tonkin Resolution authorized US military intervention in Vietnam in 1964, following alleged attacks on US ships in the Gulf of Tonkin.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Selma's Bloody Sunday",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669572892/platos-peach-video/Selma_s_Bloody_Sunday_at3l9y.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1965-03-07",
      //     endDate: "1965-03-07",
      //     category: ["american history", " civil rights movement"],
      //     meta: "On Sunday, March 7th, 1965, John Lewis, Martin Luther King Jr., and some 600 protestors marched toward Montgomery before being violently disbanded by police. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Cultural Revolution of China",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669602943/platos-peach-video/The_Cultural_Revolution_in_China_ma7wuy.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1966",
      //     endDate: "1976",
      //     category: ["world history", " china"],
      //     meta: "Chinese communist leader Mao Zedong called upon China's youth to purge the 'Four Olds' in a cultural revolution. The result would be widespread harassment, imprisonment, violence and anarchy.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Jimi Hendrix Storms The Monterey Pop Festival",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669542264/platos-peach-video/Jimi_Hendrix_Storms_The_Monterey_Pop_Festival_pvfrye.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1967",
      //     endDate: "1967",
      //     category: ["american history", " american 1960s"],
      //     meta: "Jimi Hendrix was introduced to American audiences during his openly-sexual performance at the 1967 Monterey Pop Festival. This 3-minute video explains how Hendrix rose to fame globally.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Summer of Love",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669728217/platos-peach-video/The_Summer_of_Love_fpz6t4.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1967",
      //     endDate: "1967",
      //     category: ["american history", " american 1960s"],
      //     meta: "Baby boomer youth from across the United States descended on San Francisco for the summer of 1967, replete with drugs, rock n roll and free love.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The First Successful Human Heart Transplant",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669677332/platos-peach-video/The_First_Successful_Human_Heart_Transplant_bh17bs.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1967-12-03",
      //     endDate: "1967-12-03",
      //     category: ["science", " technology"],
      //     meta: "The first heart transplant in a human occurred on December 3rd, 1967. The six-hour surgery was performed by South African Christiaan Barnard and although the patient died 18 days later, it marks the first successful heart transplant in humans.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Cobra's Role in the Vietnam War",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669600546/platos-peach-video/The_Cobra_s_Role_in_the_Vietnam_War_kfbvlr.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1968",
      //     endDate: "1975",
      //     category: ["military history", " vietnam war"],
      //     meta: "As the Vietnam War progressed, the need for an air escort and attack helicopter for hot zones led to the Cobra helicopter's dominance.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Poor People's Campaign",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669568159/platos-peach-video/Poor_People_s_Campaign_eqlrsk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1968",
      //     endDate: "1968",
      //     category: ["american history", " civil rights movement"],
      //     meta: "After MLK's assassination, his vision for the Poor People's Campaign of civil rights was brought to reality during a six-week protest in Washington D.C., resulting in clashes with police, arrests, and little in the way of resolution.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Khe Sanh",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669590087/platos-peach-video/The_Battle_of_Khe_Sanh_mmiwbm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1968-01-21",
      //     endDate: "1968-07-09",
      //     category: ["military history", " vietnam war"],
      //     meta: "Considered a crucial position for operations, the U.S. base at Khe Sanh was fiercely defended when attacked in January of 1968. The 66-day siege saw the U.S. deliver 100,000 tons of bombs and 158,000 artillery rounds to North Vietnamese belligerents. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Orangeburg Massacre",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669713175/platos-peach-video/The_Orangeburg_Massacre_i8riom.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1968-02-08",
      //     endDate: "1968-02-08",
      //     category: ["american history", " civil rights movement"],
      //     meta: "The widely underreported Orangeburg Massacre caused by a South Carolina bowling alley owner who refused entry to blacks would result in three dead and many more injured by police.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "MLK's Final Speech",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669555934/platos-peach-video/MLK_s_Final_Speech_xzgvw8.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1968-04-03",
      //     endDate: "1968-04-03",
      //     category: ["american history", " civil rights movement"],
      //     meta: "Martin Luther King, Jr.'s final speech before an assassin murdered the civil rights legend at the Lorraine Hotel in Memphis, TN, on April 4th, 1968.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Disruptive Inventors of the Internet",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669603847/platos-peach-video/The_Disruptive_Invenntors_of_the_Internet_hifweu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1969",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "The history of the internet dates back to the government-funded ARPANET of the 1960s, evolving throughout the 70s and 80s with the introduction of TCP/IP and Tim Berners-Lee's world wide web in 1990.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Sino-Soviet Border War of 1969",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669725004/platos-peach-video/The_Sino-Soviet_Border_War_of_1969_olr6lm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1969",
      //     endDate: "1969",
      //     category: ["military history", " sino-soviet war"],
      //     meta: "In 1969, Russian and Chinese hostilities ignited over a disputed border along a Siberian River, resulting in a conflict that almost turned nuclear before the US stepped in to cool the situation.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "A Bad Day For Rock N Roll at the Altamont Music Festival",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669496742/platos-peach-video/A_Bad_Day_For_Rock_N_Roll_at_the_Altamont_Music_Festival_zewfrk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1969",
      //     endDate: "1969",
      //     category: ["american history", " american 1960s"],
      //     meta: "Billed as Woodstock West the Altamont Free Music Festival turned violent after the Rolling Stones hired the Hell's Angels for concert security.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Cleveland's Burning River Sparks an Environmental Revolution",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669522117/platos-peach-video/Cleveland_s_Burning_River_Sparks_an_Environmental_Revolution_dwdgmv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1969-06-22",
      //     endDate: "1969-06-22",
      //     category: ["geography"],
      //     meta: "In 1969, an industrial-era Cuyahoga River fire in Cleveland ignited environmental activism and ultimately the birth of the EPA and environmental policy act.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "America in the 1970s",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669509476/platos-peach-video/America_in_the_1970s_cyviob.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1970",
      //     endDate: "1980",
      //     category: ["american history", " american 1970s"],
      //     meta: "1970s America, coined the 'Me' decade by Tom Wolfe, saw a reversal in the communal attitudes of the 1960s. The decade was marked by environmental protection, racial equality, Nixon's resignation, the Fall of Saigon, disco, and more.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Postal Strike of 1970",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669684456/platos-peach-video/The_Great_Postal_Strike_of_1970_umnedk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1970-03-17",
      //     endDate: "1970-03-25",
      //     category: ["american history", " american 1970s"],
      //     meta: "An ongoing refusal to increase USPS pay led to a boiling point when Congress proposed a 41% pay increase for themselves and a 5.4% increase for postal workers; resulting in the great postal strike of 1970, the largest walkout of federal employees in U.S. history.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Space Shuttle Program",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669575626/platos-peach-video/Space_Shuttle_Program_csx5nk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1972",
      //     endDate: "2011",
      //     category: ["american history", " space race"],
      //     meta: "NASA's space shuttle program flew 135 missions from 1981 to 2011, costing the lives of fourteen astronauts in two devastating accidents. Video of the Challenger and Columbia Disasters plus successful launch missions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Watergate Scandal",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669735159/platos-peach-video/The_Watergate_Scandal_a0sinv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1972",
      //     endDate: "1974",
      //     category: ["american history", " nixon & watergate"],
      //     meta: "During the 1972 re-election campaign of President Nixon, the Watergate Scandal was uncovered by FBI whistleblowers, resulting in Nixon's resignation from office.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Marshmallow Test",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669705481/platos-peach-video/The_Marshmallow_Test_h7qcem.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1972",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "A psychology experiment originally conducted at Stanford University, the 'marshmallow test' offers the subject more long-term value in exchange for self-control and delayed gratification.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Last Men on the Moon",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669700142/platos-peach-video/The_Last_Men_on_the_Moon_kqvt9v.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1972",
      //     endDate: "1972",
      //     category: ["american history", " space race"],
      //     meta: "Before NASA's budget was cut, Apollo 17 became the final mission to put man on the moon. Gene Cernan, Jack Schmitt, and Ronald Evans set many records on their 3-day trip to the lunar surface.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Easter Offensive",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669605175/platos-peach-video/The_Easter_Offensive_snmv4r.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1972-03-30",
      //     endDate: "1972-10-22",
      //     category: ["military history", " vietnam war"],
      //     meta: "The Easter Offensive of 1972 came off the back of the unforeseen Tet Offensive of 1968 and again, Viet Cong forces attacked with unexpected ferocity and resistance.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Stockholm Syndrome",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669577135/platos-peach-video/Stockholm_Syndrom_acwacq.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1973",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "Stockholm Syndrome is a condition in which innocent hostages develop a psychological bond with their captors, forming intense emotional sympathies with otherwise total criminal strangers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Ghost City of Varosha",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669680580/platos-peach-video/The_Ghost_City_of_Varosha_gmmdfs.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1974",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The seaside city of Varosha Cyprus was a luxury destination for celebrities and the wealthy of the 60s and early 70s, until Turkish forces seized control in 1974, driving out residents and tourists and effectively turning Varosha into a maximum-security ghost town.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Resignation of Richard Milhous Nixon",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669718502/platos-peach-video/The_Resignation_of_Richard_Milhous_Nixon_rty8kh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1974",
      //     endDate: "1974",
      //     category: ["american history", " nixon & watergate"],
      //     meta: "On August 9th, 1974, in the face of almost certain impeachment and removal from office, Richard Nixon became the only sitting president to resign from office.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Pol Pot and the Khmer Rouge",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669567356/platos-peach-video/Pol_Pot_and_the_Khmer_Rouge_e5y9ib.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1975",
      //     endDate: "1979",
      //     category: ["biography"],
      //     meta: "Pol Pot was a 20th-Century Cambodian dictator who implemented genocidal measures to enforce conformity, ultimately causing an estimated 20% of citizens to perish. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Spring Offensive of 1975",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669726230/platos-peach-video/The_Spring_Offensive_of_1975_ldbdr6.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1975",
      //     endDate: "1975",
      //     category: ["military history", " vietnam war"],
      //     meta: "On March 10th, 1975, Communist North Vietnamese forces began their Spring Offensive campaign to capture Southern territories. Without US support, the South's army retreated in panic which ultimately led to the fall of Saigon and the end of the Vietnam War. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Operation Babylift",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669560872/platos-peach-video/Operation_Babylift_olbnvs.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1975-04-03",
      //     endDate: "1975-04-26",
      //     category: ["military history", " vietnam war"],
      //     meta: "In 1975, South Vietnam was slowly collapsing to communist forces, prompting the US to evacuate orphans in the largest act of adoption in human history. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great New York City Blackout of 1977",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669683993/platos-peach-video/The_Great_New_York_City_Blackout_of_1977_yivoda.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1977-07-13",
      //     endDate: "1977-07-13",
      //     category: ["world history"],
      //     meta: "The New York City Blackout of 1977, which triggered 24 hours of looting and rioting in 31 of the most impoverished neighborhoods within the five Burroughs that make up the NYC area.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Three Mile Island",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669738434/platos-peach-video/Three_Mile_Island_wt4m2x.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1979-03-28",
      //     endDate: "1993-08-11",
      //     category: ["american history", " american 1970s"],
      //     meta: "On March 28th, 1979, the pressure valve in the Unit Two reactor at Three Mile Island malfunctioned, beginning the meltdown process that was successfully remediated but not without panic and public perception turning against Nuclear's promise of clean energy. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Mariel Boatlift of 1980",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669705133/platos-peach-video/The_Mariel_Boatlift_of_1980_yl0om7.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1980",
      //     endDate: "1980",
      //     category: ["american history", " american 1980s"],
      //     meta: "In 1980, 125,000 Cubans migrated into Florida after Fidel Castro approved emigration with the ulterior motive to rid Cuba of thieves, prostitutes, addicts and other criminals.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The 1980s in America",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669579032/platos-peach-video/The_1980s_in_America_yxifbw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1980",
      //     endDate: "1990",
      //     category: ["american history", " american 1980s"],
      //     meta: "Ronald Reagan's supply-side, trickle-down economic policies were popular in the 1980s after a period of rising inflation, high government spending and crime rates.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Mt. St. Helens Eruption",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669708644/platos-peach-video/The_Mt._St._Helens_Eruption_dbc91b.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1980-05-18",
      //     endDate: "1980-05-18",
      //     category: ["geography"],
      //     meta: "On May 18th, 1980, a 5.1 magnitude earthquake rocked the Mount St. Helens with a disconcerting punch. Within 10 seconds, the mountain erupted and accompanied the biggest landslide ever recorded.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Air Traffic Controllers Strike of 1981",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669580744/platos-peach-video/The_Air_Traffic_Controllers_Strike_of_1981_nz4n2z.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1981",
      //     endDate: "1981",
      //     category: ["american history", " american 1980s"],
      //     meta: "The air traffic controllers strike of 1981, when President Ronald Reagan fired 11,345 striking controllers citing the 'perils to national safety.'",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "HIV-AIDS",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669537685/platos-peach-video/HIV-AIDS_eo6frj.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1981",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "HIV-AIDS is a viral infection that attacks the immune system, leading to a weakened ability to fight off infections and diseases. It is transmitted through bodily fluids and can be managed with antiretroviral therapy, but there is currently no cure.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Iran-Contra Affair",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669697729/platos-peach-video/The_Iran-Contra_Affair_pr6gcy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1986",
      //     endDate: "1987",
      //     category: ["american history", " american 1980s"],
      //     meta: "The Iran-Contra Affair was a 1980s military-industrial complex scandal where Reagan gave tacit approval to his security council to finance the Contras of Nicaragua by over-charing Iran for weapons.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "CRISPR Explained",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669523745/platos-peach-video/CRISPR_Explained_ymul5k.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1987",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "CRISPR is a revolutionary advancement in science that allows scientists to edit and even repair damaged human genes. CRISPR stands for Clustered regularly interspaced short palindromic repeats.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mr. Gorbachev, Tear Down This Wall",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669557268/platos-peach-video/Mr._Gorbachev_Tear_Down_This_Wall_ykprcf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1987",
      //     endDate: "1987",
      //     category: ["american history", " post-cold war"],
      //     meta: "President Ronald Reagan's landmark speech at the Berlin Wall, urging Soviet leader Mikhail Gorbachev to 'tear down this wall.'",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "San Francisco Earthquake of 1989",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669721959/platos-peach-video/The_San_Francisco_Earthquake_of_1989_e92iw9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1989",
      //     endDate: "1989",
      //     category: ["geography"],
      //     meta: "The Loma Prieta earthquake of October 17th, 1989, took the lives of 67 people and injured more than 3,000 others during the 15-second, 6.9 magnitude quake that shook the San Francisco Bay Area, just as game three of the World Series matchup between the San Francisco Giants and the Oakland Athletics was about to start.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Theo Jansen’s Strand Beasts",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669509073/platos-peach-video/Aliens_Invade_Europe_xzpjhf.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1990",
      //     endDate: "Present",
      //     category: ["art", " literature"],
      //     meta: "Dutch physics and art student, Theo Jansen, nearly started a riot with a helium-powered 'UFO' art project. Today, Jansen's Strandbeest sculptures stun audiences around the world.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Oakland Firestorm of 1991",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669712407/platos-peach-video/The_Oakland_Firestorm_of_1991_mnj6ln.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1991-11-19",
      //     endDate: "1991-11-23",
      //     category: ["world history"],
      //     meta: "The Oakland Firestorm of 1991 burned down 2,843 single-family homes and 437 apartment and condominium units.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Firewall of China",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669683164/platos-peach-video/The_Great_Firewall_of_China_vrodou.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1995",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "The great firewall of China is the monitoring, regulation and censorship of the internet by the Chinese government. It blocks access to information like Google Search and favors the country's own internet economy.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Reaching the International Space Station",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669569441/platos-peach-video/Reaching_the_International_Space_Station_rigt5b.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1998",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Every day since November 19th, 1998, the International Space Station or ISS has been orbiting the earth at a speed of 17,100 miles per hour.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Rosh Hashanah",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669571200/platos-peach-video/Rosh_Hashanah_aallzu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "200",
      //     endDate: "Present",
      //     category: ["world religions", " judaism"],
      //     meta: "Rosh Hashanah is the Jewish New Year and translates to the 'head of the year.' For the next ten days leading up to Yom Kippur, practicing Jews believe God judges all living creatures and decides whether they are righteous or condemned to death.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Boxing Day Tsunami of 2004",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669598471/platos-peach-video/The_Boxing_Day_Tsunami_of_2004_assuol.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2004-12-26",
      //     endDate: "2004-12-26",
      //     category: ["world history"],
      //     meta: "The 2004 tsunami on Boxing Day would prove to be the deadliest in recorded history, taking a staggering 230,000 lives after a 9.1 earthquake ripped through an undersea fault in the Indian Ocean.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hurricane Katrina",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669539241/platos-peach-video/Hurricane_Katrina_auplri.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2005",
      //     endDate: "2005",
      //     category: ["american history", " world history"],
      //     meta: "Hurricane Katrina was a category 3 storm that made landfall on August 29th, 2005. New Orleans would be the epicenter of FEMA's failed response with 112,000 people trapped in the Superdome or rapidly flooding homes. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Caligula",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669518357/platos-peach-video/Caligula_n8daca.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2012-08-31",
      //     endDate: "1941-01-24",
      //     category: ["ancient history", " rome"],
      //     meta: "Caligula was a Roman emperor who was the victim of an unknown illness that resulted in erratic, impulsive and sadistic behavior. Caligula's excesses and draining of the treasury would result in a conspiracy among senators to assassinate the mentally ill emperor.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The TMC Dumont, A Study in Form, Function & Design",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669729465/platos-peach-video/The_TMC_Dumont_a_Study_in_Form_Function_and_Design_u7sqdt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2017",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "A radical leap forward in motorcycle design, the TMC Dumont uses a Rolls Royce airplane engine and massive 36-inch hubless silver wheels.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "CAR T Cell Therapy Fights Cancer",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669518802/platos-peach-video/CAR_T_Cell_Therapy_Fights_Cancer_lr40sm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2017",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Chimeric Antigen Receptor, or CAR T Cell Therapy uses the patient's own immune system—with the help of gene-editing technology—to attack cancerous cells, reporting a 93% remission rate for blood cancer patients. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Artificial Intelligence and Suicide Prevention",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669511313/platos-peach-video/Artificial_Intelligence_and_Suicide_Prevention_rtfjff.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2017",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "Pulling from the plethora of personal information on social media, machine learning and AI is now used to detect depression and hopefully prevent suicide.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Birds Aren't Real",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669514475/platos-peach-video/Birds_Aren_t_Real_wyvzgq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2021",
      //     endDate: "Present",
      //     category: ["american history", " world history"],
      //     meta: "The belief that birds are not real is a conspiracy theory that suggests that all birds were killed off in the 1950s and replaced with government surveillance drones.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sign Wars",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669573848/platos-peach-video/Sign_Wars_atria5.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2021",
      //     endDate: "2022",
      //     category: ["world history"],
      //     meta: "The Sign Wars were a series of messages between competing businesses that brought much-needed humor during a time of nationwide stress as news of the pandemic, climate change and more persisted.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Nazca Lines",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669709829/platos-peach-video/The_Nazca_Lines_fpputz.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "22",
      //     endDate: "722",
      //     category: ["world history"],
      //     meta: "Created by ancient Nazca people as long ago as 2000 years, more than 800 lines--sometimes stretching for miles--ancient Nazca Lines form animal, plant and anthropomorphic geoglyphs of debated purpose.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Valentine's Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669693048/platos-peach-video/The_History_of_Valentine_s_Day_bka2wh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "270",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Pagans, Catholics and Christians celebrated romance and some have tales of St. Valentine that add to modern day narrative of the history of Valentine's Day.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Legend of Santa Claus",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669700751/platos-peach-video/The_Legend_of_Santa_Claus_ujbyjp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "280",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "The Legend of a Santa Claus has Greek, British, and Dutch origins. The modern day image of Santa's rotund and jolly self is from a cartoonist, Thomas Nast.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Constantinople",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669523602/platos-peach-video/Constantinople_isnep5.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "330",
      //     endDate: "1453",
      //     category: ["ancient history", " rome"],
      //     meta: "Established in 657 BCE but later renamed by Roman emperor Constantine I, the city of Constantinople served as the Byzantine capital with structures still remaining today in modern-day Istanbul.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Roman Emperor Nero",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669720172/platos-peach-video/The_Roman_Emperor_Nero_n0tud2.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "37-12-15",
      //     endDate: "68-06-09",
      //     category: ["ancient history", " rome"],
      //     meta: "Rising to power at age seventeen, Roman Emperor Nero soon witnessed his half brother, mother and wife mysteriously dying or blatantly murdered. Nero invented the Olympics but also spent the Roman empire into financial distress before committing suicide. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Fall of the Byzantine Empire",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669609451/platos-peach-video/The_Fall_of_the_Byzantine_Empire_uwjjwx.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "395",
      //     endDate: "1453",
      //     category: ["ancient history", " rome"],
      //     meta: "The Byzantine Empire was Constantine I's extension of the Roman Empire until its overzealous military exhausted resources and economic conditions weakened the political environment, leading to the fall of the Byzantine Empire. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Fall of the Western Roman Empire",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669610474/platos-peach-video/The_Fall_of_the_Western_Roman_Empire_aqp7tu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "395",
      //     endDate: "476",
      //     category: ["ancient history", " rome"],
      //     meta: "The fall of the Western Roman Empire was caused by internal division, corruption, tax evasion, labor shortages, religion, and invasions from more powerful invading forces.  ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Attila the Hun",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669511584/platos-peach-video/Atilla_the_Hun_gxtafd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "395",
      //     endDate: "453",
      //     category: ["european history", " world history"],
      //     meta: "Attila the hun was the last strong leader in a long succession of Hun rulers. Attila would showcase his power and strength by storming through the Balkans on multiple occasions to invade, pillage, and pilfer. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Fort Sumter",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669587566/platos-peach-video/The_Battle_of_Fort_Sumter_th3ted.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1861-04-12",
      //     endDate: "1861-04-13",
      //     category: ["military history", " american civil war"],
      //     meta: "Fort Sumter was the first military engagement of the American Civil War when South Carolina rebels made the fall of the fort a priority in their push for sovereignty and independence. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Basic Practices of Buddhism",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669585133/platos-peach-video/The_Basic_Practices_of_Buddhism_vuye9w.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "400",
      //     endDate: "Present",
      //     category: ["world religions", " buddhism"],
      //     meta: "With the ultimate goal to remove human suffering, buddhist practices and beliefs include the universal and noble truths around karma, meditation, and death of suffering.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "History of May Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669690963/platos-peach-video/The_History_of_May_Day_ca8m6s.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "43",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Originating as the Celtic festival of Beltane, the History of May Day has become associated with workers' rights and labor demonstrations. Although it's celebrated by 66 nations, the United States is not one of them.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Krampus: Christmas Devil",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669600094/platos-peach-video/The_Christmas_Devil_Krampus_eng3zm.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "460",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "Krampus, the Christmas devil, is the scary counterpart to Santa Claus, a half-man and half-mutant goat meant to scare naughty Austrian children into changing their ways. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "St. Patrick's Day",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669576239/platos-peach-video/St._Patrick_s_Day_w70xyl.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "461",
      //     endDate: "Present",
      //     category: ["holiday history"],
      //     meta: "After Saint Patrick was enslaved by Irish pirates he became a Priest to convert his Pagan captors to Christianity. We celebrate St. Patrick's Day on March 17th, the day he died in 461 A.D.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Middle Ages",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669706744/platos-peach-video/The_Middle_Ages_cnuwmq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "476",
      //     endDate: "1520",
      //     category: ["european history", " medieval"],
      //     meta: "The Middle Ages or Medieval Period occurred between the fall of Rome in 476 AD and Europe's Renaissance period beginning around the 14th Century. It was marked by religious fervor and crusades, as well as agricultural advances and population growth.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Beliefs and Practices of Islam",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669595070/platos-peach-video/The_Beliefs_and_Practices_of_Islam_lmpmeb.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "610",
      //     endDate: "Present",
      //     category: ["world religions", " islam"],
      //     meta: "Islam is the second-largest religion in the world today, with a belief in the oneness of God, who is all-powerful and all-knowing. In this episode, the filmmakers cover the holy book, the Quran, the five pillars of faith, Ramadan, Mecca and more. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Roman Colosseum",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669719911/platos-peach-video/The_Roman_Colosseum_vlccdq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "70",
      //     endDate: "80",
      //     category: ["ancient history", " rome"],
      //     meta: "After Emperor Nero's decadent rule and flurry of successors, Emperor Vespasian tore down Nero's Palace to build an amphitheater for the people — the Roman Colosseum was completed in 80 A.D. Gladiators, animal fights and mock naval battles were used to entertain Romans.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Beowulf",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669513422/platos-peach-video/Beowulf_jpkjbd.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "700",
      //     endDate: "Present",
      //     category: ["art", " literature"],
      //     meta: "Beowulf is an epic poem in the Norse tradition of heroic mythology, where the protagonist defeats a swamp monster Grendel before reigning as king. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Carolingian Renaissance",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669519015/platos-peach-video/Carolingian_Renaissance_zpijhr.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "750",
      //     endDate: "850",
      //     category: ["european history", " medieval"],
      //     meta: "The Carolingian Renaissance brought an explosive rise in literature, arts, architecture, jurisprudence and efficient management, production, and a surplus economy during the early Middle Ages. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Viking Norsemen",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669741803/platos-peach-video/Viking_Norsement_ngvsuk.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "793",
      //     endDate: "1066",
      //     category: ["european history", " medieval"],
      //     meta: "For nearly 300 years, Vikings or Norsemen sailed from Scandinavia to Europe, the Mediterranean, North Africa, the Middle East and even North America, acquiring slaves, concubines and culture along the way.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Navigators of Polynesia",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669709448/platos-peach-video/The_Navigators_of_Polynesia_ztlzbm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "800",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "Beginning around 800 A.D., navigators set out from Southeast Asia in double-hulled sailing canoes across vast stretches of open ocean, using star maps, sea swells, current and drift to people Polynesia.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Friday the 13th",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669530212/platos-peach-video/Friday_the_13th_ytrk1e.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "800",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The superstition surrounding Friday the 13th dates back to Norse mythology and Jesus' last supper, but to this day, remains a common fear and phobia for millions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Engagement Rings",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669688180/platos-peach-video/The_History_of_Engagement_Rings_hzcmpp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "850",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The history of engagement rings used to declare a man's intent to marry a woman was officially recognized in 850 A.D. by Pope Nicholas I. The first diamond engagement ring was commissioned by Archduke Maximillian of Austria in 1477.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Pizzaioli of Naples",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669715305/platos-peach-video/The_Pizzaioli_of_Naples_qn01c0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "997",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The tradition of making Neapolitan Pizza is passed down through generations to the more than 15,000 pizza chefs or pizzaioli in Naples today.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Pandemics of the Future",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669565507/platos-peach-video/Pandemics_of_the_Future_llvyuq.mov",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "Present",
      //     endDate: "Present",
      //     category: ["science", " technology"],
      //     meta: "The article discusses the potential pandemics of the future and the need for preparedness and global cooperation to prevent and mitigate their impact. It highlights the importance of investing in research and development of vaccines and treatments, as well as improving surveillance and response systems.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Yuri Gagarin: First Man in Space",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669745981/platos-peach-video/Yuri_Gagarin_The_First_Man_in_Space_wl2tnw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1934",
      //     endDate: "1968",
      //     category: ["world history", " space race"],
      //     meta: "Cosmonaut Yuri Gagarin was the first man to fly into space on April 12, 1961, beating American Alan Shepard's flight by three weeks. This 3-minute video explains everything.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "JFK, The First Television President",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669541852/platos-peach-video/JFK_The_First_Television_President_evfebj.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1917",
      //     endDate: "1963",
      //     category: ["american history", " biography"],
      //     meta: "The first family of President JFK and Jackie became global celebrities and American icons with the help of television coverage and mesmerizing mystique.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Tiananmen Square Massacre",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669738942/platos-peach-video/Tiananmen_Square_Massacre_e2r2az.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1989-06-04",
      //     endDate: "1989-06-04",
      //     category: ["world history"],
      //     meta: "The Tiananmen Square Massacre of June 4th, 1989, saw some 300,000 Chinese troops descend on Beijing, murdering protestors, bystanders and students sleeping in their tents. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Skinwalkers of the Navajo Nation",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669574379/platos-peach-video/Skinwalkers_pz4xrh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1000",
      //     endDate: "Present",
      //     category: ["american history", " native american history"],
      //     meta: "The Navajo Nation has a belief in skinwalkers, which are witches or sorcerers who can transform into animals. They are considered taboo and feared by many Navajo people.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Indian Removal Act",
      //     video:
      //       "http://res.cloudinary.com/drewpager/video/upload/v1669539647/platos-peach-video/Indian_Removal_Act_kxpcyb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1830-04-24",
      //     endDate: "1830-05-30",
      //     category: ["american history", " westward expansion"],
      //     meta: "In 1830, President Andrew Jackson gained congressional passage of the Indian Removal Act which by 1837 had forced some 46,000 Native Americans from their homeland to free up 25 million acres for resettlement by European immigrants",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Aaron Burr",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680621205/platos-peach-video/Aaron_Burr_kcppjp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1756-02-06",
      //     endDate: "1836-09-14",
      //     category: ["biography", " american history"],
      //     meta: "Aaron Burr was an American politician and lawyer who served as the third Vice President of the United States under Thomas Jefferson. He is also known for killing Alexander Hamilton in a famous duel in 1804.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Armistice Day",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680621933/platos-peach-video/Armistice_Day_cuoitv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1918-11-11",
      //     endDate: "1918-11-11",
      //     category: ["world history", " world military history"],
      //     meta: "Armistice Day was a celebration and ongoing commemoration of the end of World War I on November 11, 1918, honoring veterans and promoting peace.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Bartolomeu Dias",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680622413/platos-peach-video/Bartolomeu_Dias_zwja0g.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1450",
      //     endDate: "1500",
      //     category: ["age of exploration", " biography", " european history"],
      //     meta: "Bartolomeu Dias was a Portuguese explorer who was the first European to sail around the southern tip of Africa, now known as the Cape of Good Hope, in 1488.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Dodd-Frank Act",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680622869/platos-peach-video/Dodd-Frank_Act_e5t1py.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "2010-07-21",
      //     endDate: "Present",
      //     category: ["american history"],
      //     meta: "The Dodd-Frank Act is a US federal law passed in 2010 to regulate the financial industry and prevent a repeat of the 2008 financial crisis. It established new regulatory agencies, increased oversight and transparency, and imposed stricter rules on banks, credit rating agencies, and other financial institutions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Gandhi's Salt March",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680623488/platos-peach-video/Gandhi_s_Salt_March_svr5c0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1930-03-02",
      //     endDate: "1930-05-05",
      //     category: ["world history", " biography"],
      //     meta: "Gandhi's Salt March was a nonviolent protest against British salt taxes in India. It involved a 240-mile march to the Arabian Sea where Gandhi and his followers made their own salt. The march sparked a wave of civil disobedience and helped India gain independence.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Heaven's Gate",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680624049/platos-peach-video/Heaven_s_Gate_a9hxpy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1975-06-14",
      //     endDate: "1997-03-26",
      //     category: ["american history"],
      //     meta: "Heaven's Gate was a cult founded in the 1970s by Marshall Applewhite and Bonnie Nettles. In 1997, 39 members committed mass suicide to reach an alien spacecraft.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hernando de Soto",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680624530/platos-peach-video/Hernando_de_Soto_lfbmyy.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1500",
      //     endDate: "1541",
      //     category: ["age of exploration", " biography", " european history"],
      //     meta: "Hernando de Soto was a Spanish explorer who played a significant role in the colonization of the Americas. He is best known for his expeditions to Florida, where he established the first European settlement in the United States. De Soto also explored much of the southeastern United States and was instrumental in the conquest of the Inca Empire in South America.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Kaiser Wilhelm II",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680625281/platos-peach-video/Kaiser_Wilhelm_II_v0kobv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1859-01-27",
      //     endDate: "1941-06-04",
      //     category: ["biography", " world history", " world military history"],
      //     meta: "Kaiser Wilhelm II was a German emperor who ruled from 1888 to 1918. He was known for his aggressive foreign policies and played a significant role in the outbreak of World War I. He was forced to abdicate in 1918 and went into exile in the Netherlands.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "King George III",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680625848/platos-peach-video/King_George_III_neev1v.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1738-06-04",
      //     endDate: "1820-01-29",
      //     category: ["biography", " european history"],
      //     meta: "King George III: British monarch from 1760-1820. Ruled during American Revolution, suffered from mental illness, lost colonies, and sparked constitutional changes.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Nelson Mandela",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680626606/platos-peach-video/Nelson_Mandela_r0sn7k.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1918-07-18",
      //     endDate: "2013-12-05",
      //     category: ["biography", " world history "],
      //     meta: "Nelson Mandela, a renowned anti-apartheid activist and South Africa's first black president, fought for equality, reconciliation, and justice, inspiring the world with his unwavering resilience and commitment to freedom.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Plymouth Colony",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680628232/platos-peach-video/Plymouth_Colony_xb9ixb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1620",
      //     endDate: "1691",
      //     category: ["colonial", " american history"],
      //     meta: "Plymouth Colony was an English colonial venture in North America from 1620 to 1691. It was founded by a group of Separatists who had left England seeking religious freedom. The colony played a significant role in the history of the United States, including the first Thanksgiving celebration.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Quantum Mechanics",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680629140/platos-peach-video/Quantum_Mechanics_jh5qgi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1900",
      //     endDate: "Present",
      //     category: ["science and technology"],
      //     meta: "Quantum mechanics is a branch of physics that studies the behavior of matter and energy at the atomic and subatomic level. It is based on the principles of wave-particle duality, uncertainty, and superposition, and has led to the development of technologies such as transistors, lasers, and MRI machines.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Shootout at OK Corral",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680631118/platos-peach-video/Shootout_at_OK_Corral_xvjh8y.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1881",
      //     endDate: "1881",
      //     category: ["westward expansion", " american history"],
      //     meta: "Infamous 1881 shootout at O.K. Corral where Legendary Wild West clash between lawmen and outlaws in Tombstone, Arizona. Gunslinger showdown with lasting historical impact.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sumerian Tablets of Ancient Mesopotamia",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680631535/platos-peach-video/Sumerian_Tablets_of_Ancient_Mesopotamia_ymua4m.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-800",
      //     endDate: "300",
      //     category: ["ancient history"],
      //     meta: "Sumerian tablets are ancient clay tablets from Mesopotamia, containing early forms of writing and records of myths, history, and daily life.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Chickamauga",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680631974/platos-peach-video/The_Battle_of_Chickamauga_way25s.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863-09-19",
      //     endDate: "1863-09-20",
      //     category: ["american military history"],
      //     meta: "The Battle of Chickamauga was fought on September 19-20, 1863, during the American Civil War. It was the second bloodiest battle of the war and resulted in a Confederate victory.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Bread and Roses Strike",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680635046/platos-peach-video/The_Bread_and_Roses_Strike_ogwckq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1912-01-11",
      //     endDate: "1912-03-14",
      //     category: ["progressive era", " american history"],
      //     meta: "The Bread and Roses Strike was a labor strike in 1912 in Lawrence, Massachusetts, where textile workers protested against low wages and poor working conditions. The strike lasted for two months and gained national attention, leading to improved labor laws and better working conditions for workers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Byzantine Empire",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680635670/platos-peach-video/The_Byzantine_Empire_ysua08.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "330",
      //     endDate: "1453",
      //     category: ["ancient history"],
      //     meta: "The Byzantine Empire, also known as the Eastern Roman Empire, was a continuation of the Roman Empire that lasted from 330 to 1453 CE, centered in Constantinople (modern-day Istanbul) and encompassing parts of Europe, Asia, and Africa. It made significant contributions to art, culture, and religion.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Connecticut Compromise",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680636618/platos-peach-video/The_Connecticut_Compromise_emtdbm.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1787-05-25",
      //     endDate: "1787-07-23",
      //     category: ["u.s. constitution", " american history"],
      //     meta: "The Connecticut Compromise, also known as the Great Compromise, was an agreement at the Constitutional Convention of 1787 that created a bicameral legislature with proportional representation in the House of Representatives and equal representation in the Senate. It balanced the interests of large and small states.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Early Years of Jamestown Colony",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680637856/platos-peach-video/The_Early_Years_of_Jamestown_Colony_cuq47p.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1607",
      //     endDate: "1620",
      //     category: ["colonial", " american history"],
      //     meta: "As superpower nations vied for outposts in the Americas, the English King James I chartered another attempt to colonize North America, which resulted in the Jamestown Colony being settled on May 13th, 1607. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Espionage and Sedition Acts",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680638536/platos-peach-video/The_Espionage_and_Sedition_Acts_hhxtqb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1917",
      //     endDate: "Present",
      //     category: ["early immigration", " american history"],
      //     meta: "The Espionage & Sedition Acts were laws passed in the United States during World War I that made it illegal to interfere with military operations or to speak out against the government or the war effort.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Fugitive Slave Act of 1793",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680638957/platos-peach-video/The_Fugitive_Slave_Act_of_1793_qufhft.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1793",
      //     endDate: "1850",
      //     category: [
      //       "south & slavery",
      //       " early republic",
      //       " abolition",
      //       " american history",
      //     ],
      //     meta: "The Fugitive Slave Act of 1793 was a law in the United States that required the return of runaway slaves to their owners. It was passed by Congress and signed into law by President George Washington. The act was controversial and contributed to tensions between the North and South over the issue of slavery.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Fugitive Slave Act of 1850",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680639718/platos-peach-video/The_Fugitive_Slave_Act_of_1850_jg9xum.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1850",
      //     endDate: "1864",
      //     category: ["south & slavery", " abolition", " american history"],
      //     meta: "The Fugitive Slave Act of 1850 was a law that required citizens to assist in the capture and return of runaway slaves. It was highly controversial and contributed to tensions between the North and South leading up to the Civil War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Homestead Strike of 1892",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680640144/platos-peach-video/The_Homestead_Strike_of_1892_oqofr0.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1892-07-01",
      //     endDate: "1892-07-06",
      //     category: ["industrial revolution", " american history"],
      //     meta: "The Homestead Strike of 1892 was a violent labor dispute between the Carnegie Steel Company and its workers over wages and working conditions.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Immigration Act of 1965",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680640941/platos-peach-video/The_Immigration_Act_of_1965_rwoinb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1965-12-01",
      //     endDate: "1965-12-01",
      //     category: [
      //       "civil rights movement",
      //       " american 1960s",
      //       " american history",
      //     ],
      //     meta: "The Immigration Act of 1965 was a law that abolished the national origins quota system and allowed for more immigrants from non-European countries to enter the United States.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Lost Colony of Roanoke",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680641758/platos-peach-video/The_Lost_Colony_of_Roanoke_njcf0k.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1585",
      //     endDate: "1590",
      //     category: ["colonial", " american history"],
      //     meta: "The Lost Colony of Roanoke was a group of English settlers who mysteriously disappeared from their colony in Virginia in the late 16th century.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Quantum Computing",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680642068/platos-peach-video/Quantum_Computing_fxpapg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1985",
      //     endDate: "Present",
      //     category: ["science and technology"],
      //     meta: "Quantum computing is a type of computing that uses quantum bits, or qubits, to perform calculations. It has the potential to solve complex problems that classical computers cannot, such as simulating chemical reactions and breaking encryption codes.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Memphis Sanitation Strike",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680642682/platos-peach-video/The_Memphis_Sanitation_Strike_vnfxak.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1968-02-23",
      //     endDate: "1968-04-20",
      //     category: ["civil rights movement", " american history"],
      //     meta: "In 1968, Memphis sanitation workers, mostly African American, went on strike to demand better pay, working conditions, and union recognition. The strike lasted for 65 days and ended with the assassination of Martin Luther King Jr., who had come to Memphis to support the workers. The strike was a pivotal moment in the civil rights movement and helped to galvanize support for workers' rights.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Napoleonic Code",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680643253/platos-peach-video/The_Napoleonic_Code_r8pwbb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1804-03-21",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "The Napoleonic Code, implemented in 1804, was a civil law system that codified legal principles, influenced legal systems worldwide, and emphasized equality and property rights.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Pullman Strike of 1894",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680643890/platos-peach-video/The_Pullman_Strike_of_1894_yitmf6.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1893",
      //     endDate: "1894",
      //     category: [
      //       "industrial revolution",
      //       " progressive era",
      //       " american history",
      //     ],
      //     meta: "The Pullman Strike of 1894 was a nationwide railroad strike led by Eugene V. Debs and the American Railway Union, protesting wage cuts and poor working conditions for Pullman Palace Car Company employees. The strike was eventually broken up by federal troops, leading to the imprisonment of Debs and the decline of the ARU.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Social Security Act",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680644333/platos-peach-video/The_Social_Security_Act_itobxq.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1935-08-14",
      //     endDate: "Present",
      //     category: ["the great depression", " american history"],
      //     meta: "Social Security Act: U.S. law enacted in 1935. Established social welfare programs, including retirement benefits and assistance for the elderly, disabled, and unemployed. ",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Vietnam War Protest Movement",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680644919/platos-peach-video/The_Vietnam_War_Protest_Movement_mefd0m.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1954",
      //     endDate: "1972",
      //     category: ["american 1960s", " american history"],
      //     meta: "The Vietnam War Protest Movement was a series of massive and wide spread anti-war protests and activism against US involvement in Vietnam, demanding peace and withdrawal of troops.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The War of Mexican Independence",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680645559/platos-peach-video/The_War_of_Mexican_Independence_wuymxc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1810-09-16",
      //     endDate: "1821-09-27",
      //     category: ["world military history"],
      //     meta: "The War of Mexican Independence was an armed conflict from 1810-1821. Mexicans revolted against Spanish rule, seeking independence and self-governance, led by figures like Hidalgo and Morelos.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Eleanor of Aquitaine",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680904746/Eleanor_of_Aquitaine_stiwcf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1122",
      //     endDate: "1204",
      //     category: ["biography", " european History"],
      //     meta: "Eleanor of Aquitaine (1122-1204) was a powerful queen consort of France and England, known for her intelligence, political savvy, and patronage of the arts.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Hitler's Cavalry of the Future",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680905106/Hitler_s_Cavalry_of_the_Future_swxvgl.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1933-01-30",
      //     endDate: "1939-09-01",
      //     category: ["world military history", " world war two"],
      //     meta: "The article discusses Hitler's plan to create a futuristic cavalry using advanced technology during World War II. The plan was ultimately unsuccessful due to logistical and practical issues.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Nazi's Plot to Assassinate the Big Three",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680905784/The_Nazi_s_Plot_to_Assassinate_the_Big_Three_lnvizf.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1943-11-15",
      //     endDate: "1943-11-30",
      //     category: ["world military history", " world war two"],
      //     meta: "The Nazis planned to assassinate the leaders of the Allied powers during World War II, known as the Big Three.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Tuberculosis and the Open-air School Movement",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1680906175/Tuberculosis_and_the_Open-air_School_Movement_z7kyqg.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1904",
      //     endDate: "1950",
      //     category: ["world history", " science", " technology"],
      //     meta: "The Open-air School Movement was a response to the high incidence of tuberculosis in the early 20th century. These schools aimed to improve the health of children by providing fresh air and sunlight, and were successful in reducing the spread of the disease.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Battle of Long Tan",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1681501957/platos-peach-video/Battle_of_Long_Tan_tjwkwn.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1966-08-18",
      //     endDate: "1966-08-19",
      //     category: ["world military history"],
      //     meta: "The Battle of Long Tan was a significant military engagement during the Vietnam War, fought between Australian and Viet Cong forces on August 18, 1966. The Australian troops were outnumbered but managed to hold off the enemy, resulting in a decisive victory.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Everyday Life in Colonial America",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1681502446/platos-peach-video/Everyday_Life_in_Colonial_America_qrx0np.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1620",
      //     endDate: "1776",
      //     category: ["colonial", " american history"],
      //     meta: "Colonial America was characterized by a simple way of life, with most people living in rural areas and relying on agriculture for their livelihood. Daily activities included farming, cooking, and household chores, with limited access to modern conveniences. Social and economic hierarchies were prevalent, with wealthy landowners and merchants at the top and indentured servants and slaves at the bottom.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Famous Presidential Pardons",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1681503107/platos-peach-video/Famous_Presidential_Pardons_mfkgx5.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1794",
      //     endDate: "1977",
      //     category: ["american history"],
      //     meta: "A list of well-known presidential pardons, including Richard Nixon's pardon by Gerald Ford and Bill Clinton's pardon of Marc Rich.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Jimmy Hoffa",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1681503439/platos-peach-video/Jimmy_Hoffa_vkdz80.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1913-02-14",
      //     endDate: "1982-07-30",
      //     category: ["biography", " american history"],
      //     meta: "Jimmy Hoffa is a former American labor union leader who disappeared in 1975 and was declared legally dead in 1982. His disappearance remains a mystery and has been the subject of numerous theories and investigations.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Misconceived Tanks of the Second World War",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1681504426/platos-peach-video/Misconceived_Tanks_of_the_Second_World_War_d8iiek.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1939",
      //     endDate: "1945",
      //     category: ["world military history"],
      //     meta: "Tank designs in World War II had their fair share of failures. Ferdinand Porsche's Maus, an indestructible super tank weighing over 200 tons, suffered constant drivetrain problems and only two prototypes were built. Britain's Covenanter Cruiser Tank lacked sufficient armament and armor protection, while engine cooling issues made it unusable in combat. These tanks were some of the biggest blunders in mechanized warfare.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Great Steel Strike of 1919",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1681504712/platos-peach-video/The_Great_Steel_Strike_of_1919_xj1ak6.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1919-09-22",
      //     endDate: "1920-01-08",
      //     category: [
      //       "progressive era",
      //       " industrial revolution",
      //       " american history",
      //     ],
      //     meta: "The Great Steel Strike of 1919 was a major labor strike in the United States that involved over 350,000 steelworkers. It lasted for several months and resulted in violent clashes between workers and law enforcement. The strike ultimately failed to achieve its goals, but it helped to galvanize the labor movement and led to improvements in working conditions for steelworkers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Eugene Debs",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683411909/Eugene_Debs_vdtrr2.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1855-11-05",
      //     endDate: "1926-10-20",
      //     category: ["progressive era", " industrial revolution", " biography"],
      //     meta: "Eugene Debs was a prominent American socialist and labor leader who ran for president five times as the candidate of the Socialist Party of America. He was a vocal advocate for workers' rights and was imprisoned for his opposition to World War I.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Friendly Fire Casualties at Pearl Harbor",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683412211/Friendly_Fire_Casualties_at_Pearl_Harbor_reaf9a.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1941-12-07",
      //     endDate: "1941-12-08",
      //     category: ["american military history"],
      //     meta: "In all the commotion of Japan's attack on Pearl Harbor, friendly fire casualties were an unfortunate reality resulting in the unnecessary deaths of many Americans.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "John Deere",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414953/John_Deere_c6jh9t.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1804-02-07",
      //     endDate: "1886-05-17",
      //     category: ["westward expansion", " biography"],
      //     meta: "John Deere was an American blacksmith and inventor who founded the Deere & Company, a leading manufacturer of agricultural equipment. He is known for inventing the first commercially successful steel plow, which revolutionized farming in the 19th century.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Leif Erikson",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414796/Leif_Erikson_gynxcc.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "970",
      //     endDate: "1025",
      //     category: ["world history", " biography"],
      //     meta: "Leif Erikson was a Norse explorer who is believed to have been the first European to reach North America, around 1000 AD. He established a settlement in Newfoundland, Canada, which he called Vinland.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Miracle at Dunkirk",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414708/Miracle_at_Dunkirk_ggj5wi.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1940-05-26",
      //     endDate: "1940-06-04",
      //     category: ["world military history", " world war two"],
      //     meta: "A miraculous evacuation of Allied soldiers from Dunkirk, France during World War II is depicted in the film 'Miracle at Dunkirk.'",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Mugwumps",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414536/Mugwumps_kmxa4s.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1884",
      //     endDate: "1894",
      //     category: ["american history", " uncategorized"],
      //     meta: "Mugwumps are a group of independent-minded Republicans who refused to support their party's nominee in the 1884 presidential election. They were known for their anti-corruption stance and support for civil service reform.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Panic of 1893",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414940/Panic_of_1893_ltakjo.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1893-02-20",
      //     endDate: "1897-04-19",
      //     category: ["industrial revolution", " gilded age"],
      //     meta: "The Panic of 1893 was a severe economic depression in the United States that lasted for several years. It was caused by a variety of factors, including overproduction, labor unrest, and a decline in the value of silver. The panic led to widespread unemployment, bank failures, and social unrest.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Psychedelic Cave Raves of Early Man",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414605/Psychedelic_Cave_Raves_of_Early_Man_wzbmku.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-3000",
      //     endDate: "-2800",
      //     category: ["ancient history", " prehistory"],
      //     meta: "Early humans may have held psychedelic cave raves, according to new research. The study suggests that ancient people used mind-altering substances and created art in caves to enhance their spiritual experiences.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "René Descartes",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414597/Ren%C3%A9_Descartes_c3p3jh.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1596-03-31",
      //     endDate: "1650-02-11",
      //     category: ["renaissance", " science", " technology", " biography"],
      //     meta: "René Descartes was a French philosopher, mathematician, and scientist who is considered the father of modern Western philosophy. He is famous for his statement 'Cogito, ergo sum' (I think, therefore I am) and his contributions to the development of analytical geometry.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Robert Watson-Watt",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683415080/Robert_Watson-Watt_flxqrb.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1892-04-14",
      //     endDate: "1973-12-05",
      //     category: ["world military history", " world war two", " biography"],
      //     meta: "Robert Watson-Watt was an engineer and inventor who is credited with developing the first practical radar system during World War II. His work revolutionized air defense and helped to win the war.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Sinking the SS Athenia",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683415003/Sinking_the_SS_Athenia_x3x5yu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1939-09-03",
      //     endDate: "1939-09-03",
      //     category: ["world military history", " world war two"],
      //     meta: "The SS Athenia was sunk, resulting in the loss of many lives.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Assassination of John F. Kennedy",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683415061/The_Assassination_of_John_F._Kennedy_j13wvt.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1963-11-22",
      //     endDate: "1963-11-22",
      //     category: ["american history", " american 1960s"],
      //     meta: "President John F. Kennedy was assassinated in Dallas, Texas on November 22, 1963, by Lee Harvey Oswald. The event shocked the nation and sparked conspiracy theories.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Battle of Chattanooga",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414815/The_Battle_of_Chattanooga_dtytip.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1863-11-23",
      //     endDate: "1863-11-25",
      //     category: ["american military history", " american civil war"],
      //     meta: "The Battle of Chattanooga was a Civil War battle fought in November 1863. Union forces under General Ulysses S. Grant defeated Confederate forces under General Braxton Bragg, securing control of Chattanooga and opening up a path towards Atlanta.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The History of Toilets",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414500/The_History_of_Toilets_rxj4hu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "-3000",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "A brief overview of the history of toilets, from ancient civilizations to modern times.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Scottsboro Boys",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414758/The_Scottsboro_Boys_amjyz3.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1931-03-25",
      //     endDate: "1938-05-16",
      //     category: ["american history", " civil rights movement"],
      //     meta: "The Scottsboro Boys were nine black teenagers who were falsely accused of raping two white women in Alabama in 1931. Their case became a symbol of racial injustice and sparked a national outcry. Despite multiple trials and appeals, most of the boys were convicted and sentenced to death or life in prison.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Third Ypres Campaign",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1683414875/The_Third_Ypres_Campaign_qs5nb9.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1917-07-31",
      //     endDate: "1917-11-06",
      //     category: ["world military history", " world war one"],
      //     meta: "The Third Ypres Campaign was a major battle during World War I that took place in Belgium. It was fought between the Allied forces, led by the British, and the German army. The battle lasted from July to November 1917 and resulted in heavy casualties on both sides.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Alice in Wonderland Syndrome",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538197/Alice_in_Wonderland_Syndrome_s2lvjw.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1955",
      //     endDate: "Present",
      //     category: ["science", " medicine"],
      //     meta: "Alice in Wonderland Syndrome is a rare neurological condition that causes distorted perception of body size, time, and space. It is named after Lewis Carroll's book 'Alice's Adventures in Wonderland' because the main character experiences similar symptoms.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Erasmus of Rotterdam",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538213/Erasmus_of_Rotterdam_rjyiba.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1447-10-28",
      //     endDate: "1536-07-12",
      //     category: ["biography", " world religions"],
      //     meta: "Erasmus of Rotterdam was a Dutch philosopher and theologian who lived during the Renaissance period. He was known for his humanist beliefs and his criticism of the Catholic Church. He was also a prolific writer, producing works on a wide range of topics including education, politics, and religion.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Freemasons",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684537918/Freemasons_nf0fty.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "650",
      //     endDate: "Present",
      //     category: ["world history"],
      //     meta: "Freemasons are a fraternal organization that originated in the late 16th or early 17th century. They are known for their secrecy and rituals, and have been the subject of conspiracy theories and speculation. The organization is based on the principles of brotherhood, charity, and truth.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Howard Hughes",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538234/Howard_Hughes_rzrxiu.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1905-12-24",
      //     endDate: "1976-04-05",
      //     category: ["biography"],
      //     meta: "Howard Hughes was an American business magnate, investor, aviator, engineer, film director, and philanthropist. He was one of the wealthiest people in the world during his lifetime and was known for his eccentric behavior and reclusive lifestyle.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "John Cabot",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538139/John_Cabot_jhlxap.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1450",
      //     endDate: "1498",
      //     category: ["biography", " age of exploration"],
      //     meta: "John Cabot was an Italian explorer who sailed for England in the late 15th century. He is known for his voyages to North America, including Newfoundland and Labrador, and for his role in establishing English claims to the New World.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "John Milton",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684537999/John_Milton_bsvb0q.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1608-12-09",
      //     endDate: "1674-11-08",
      //     category: ["biography", " literature"],
      //     meta: "John Milton was an English poet, polemicist, and civil servant, best known for his epic poem 'Paradise Lost'. He was a prominent figure in the English Civil War and the Commonwealth period, and his works continue to be studied and celebrated today.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Lyndon Baines Johnson",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538200/Lyndon_Baines_Johnson_ba6owp.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1908-08-27",
      //     endDate: "1973-01-22",
      //     category: ["biography", " american history"],
      //     meta: "Lyndon Baines Johnson was an American politician who served as the 36th President of the United States from 1963 to 1969. He was known for his domestic policies, including the Civil Rights Act and the War on Poverty, as well as his involvement in the Vietnam War.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "Operation Torch",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538238/Operation_Torch_mddedl.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1942-11-08",
      //     endDate: "1942-11-16",
      //     category: ["world military history"],
      //     meta: "Operation Torch was a military operation during World War II in which Allied forces invaded North Africa, with the goal of securing the region and opening up a second front against the Axis powers.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Flint Sit-down Strike",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538130/The_Flint_Sit-down_Strike_m7jf6n.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1936-12-30",
      //     endDate: "1937-02-11",
      //     category: ["american history"],
      //     meta: "The Flint Sit-down Strike was a labor strike in 1936-1937 where workers at General Motors' Flint, Michigan plant occupied the factory to demand better working conditions and recognition of their union. The strike was successful and helped establish the United Auto Workers as a major force in American labor.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Immigration Act of 1924",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538192/The_Immigration_Act_of_1924_nyhfww.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1924-05-26",
      //     endDate: "1965-10-03",
      //     category: ["early immigration", " american history"],
      //     meta: "The Immigration Act of 1924 was a law that restricted immigration to the United States based on nationality and established quotas for each country. It aimed to limit the number of immigrants from Southern and Eastern Europe and Asia.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Iroquois Confederacy",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538176/The_Iroquois_Confederacy_ybsrn8.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1142",
      //     endDate: "1779",
      //     category: ["native american history", " american history"],
      //     meta: "The Iroquois Confederacy was a political and cultural union of Native American tribes in the northeastern region of North America. It was formed in the 16th century and consisted of six tribes who worked together to maintain peace and stability in the region.",
      //     creator: "116143759549242008910",
      //   },
      //   {
      //     _id: new ObjectId(),
      //     title: "The Plagues of San Francisco",
      //     video:
      //       "https://res.cloudinary.com/drewpager/video/upload/v1684538225/The_Plagues_of_San_Francisco_nnt8rv.mp4",
      //     image:
      //       "https://res.cloudinary.com/drewpager/image/upload/v1672415283/platos-peach-image/CleanShot_2022-12-30_at_07.47.46_2x_u14lxs.png",
      //     startDate: "1900",
      //     endDate: "1908",
      //     category: ["science", " medicine", " american history"],
      //     meta: "The Plagues of San Francisco is a book that explores the history of epidemics in the city, including the bubonic plague and the 1918 flu pandemic. It examines the social and political responses to these outbreaks and their impact on the city's development.",
      //     creator: "116143759549242008910",
      //   },
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
