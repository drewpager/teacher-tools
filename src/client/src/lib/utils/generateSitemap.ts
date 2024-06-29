const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream, write } = require("fs");
// Function to fetch all your routes (might be from a file, API, etc.)
const FetchRoutes = async () => {
  // Fetch your dynamic routes (e.g., from an API)
  return [
    { url: "/", changefreq: "weekly", priority: 0.9 },
    { url: "/catalog", changefreq: "weekly", priority: 0.9 },
    { url: "/signup", changefreq: "monthly", priority: 0.9 },
    { url: "/login", changefreq: "monthly", priority: 0.7 },
    { url: "/contact", changefreq: "monthly", priority: 0.7 },
    { url: "/lesson/create", changefreq: "monthly", priority: 0.9 },
    { url: "/article/create", changefreq: "monthly", priority: 0.9 },
    { url: "/quiz/create", changefreq: "monthly", priority: 0.9 },
    { url: "/playlist/create", changefreq: "monthly", priority: 0.9 },
    { url: "/donate", changefreq: "monthly", priority: 0.8 },
    { url: "/plans", changefreq: "daily", priority: 0.9 },
    { url: "/plan/4th-grade", changefreq: "daily", priority: 0.9 },
    { url: "/plan/5th-grade", changefreq: "daily", priority: 0.9 },
    { url: "/plan/6th-grade", changefreq: "daily", priority: 0.9 },
    { url: "/plan/7th-grade", changefreq: "daily", priority: 0.9 },
    { url: "/plan/8th-grade", changefreq: "daily", priority: 0.9 },
    { url: "/plan/9th-grade", changefreq: "daily", priority: 0.9 },
    { url: "/plan/10th-grade", changefreq: "daily", priority: 0.9 },
    { url: "/plan/11th-grade", changefreq: "daily", priority: 0.9 },
    { url: "/plan/12th-grade", changefreq: "daily", priority: 0.9 },
    {
      url: "/plan/4th-grade/american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/5th-grade/american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/6th-grade/american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/7th-grade/american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/8th-grade/american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/9th-grade/american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/10th-grade/american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/11th-grade/american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/12th-grade/american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plans/military-history-playlist",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/dictators-plus-totalitarianism",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/world-war-two-history",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/u.s.-founding-fathers",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/the-gilded-age",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/westward-expansion",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/battles-of-wwii",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/native-american-history",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/zoot-suit-riots",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/shays'-rebellion",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/historic-diseases-and-pandemics",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/marcus-garvey",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/cuban-missile-crisis",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/halloween",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/world-war-two-timeline",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/women's-suffrage",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/post-civil-war-reconstruction-era",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/new-deal",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/cold-war",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/boston-tea-party",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/american-imperialism",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/pearl-harbor",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/prohibition",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/desegregation-in-schools",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/child-labor-in-america",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/history-of-computing",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/lewis-and-clark-expedition",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/patrick-henry",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/gettysburg-address",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/transcontinental-railroad",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/code-of-hammurabi",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/underground-railroad",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/marbury-v-madison",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/civil-rights-movement",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/rosa-parks",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/martin-luther-king-jr",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/cesar-chavez",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/harlem-renaissance",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/abolitionist-movement",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/trail-of-tears",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/salem-witch-trials",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/war-of-1812",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/roaring-twenties",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/early-humans",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/french-revolution",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/incas",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/american-civil-war-battles",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/great-depression",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/mexican-american-war",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/kristallnacht",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/social-darwinism",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plans/panama-canal",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6506066343ae84356582d1f8",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6508640fa55e7a359d8e3753",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/65086463a55e7a359d8e3754",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/650b0a5c12a6b731d2e84aab",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/650b0aa912a6b731d2e84aac",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/650d9c712af1d0ff933e3b44",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/650da1752af1d0ff933e3b45",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/650da1e52af1d0ff933e3b46",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/650da37a2af1d0ff933e3b47",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6511866045d1d65a489d1f60",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6511897245d1d65a489d1f61",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/65118aa145d1d65a489d1f62",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/65118ba545d1d65a489d1f63",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/65118d0645d1d65a489d1f64",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/65201a016766970d1e8e43a8",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/65387656a8be3707f22f87f9",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/653876b1a8be3707f22f87fa",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6543b365126e4e5671bf6244",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6543b3ab126e4e5671bf6245",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6543bae7126e4e5671bf6246",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6548fcc01f6bd29831a39a45",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6548fd221f6bd29831a39a46",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6548fd8d1f6bd29831a39a47",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6548fdd01f6bd29831a39a48",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6548fe7e1f6bd29831a39a49",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/654fb43adf21cdc667959986",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/654fb6ebdf21cdc667959987",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/654fb835df21cdc667959988",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6554ea7d92b184e4026e5467",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6554eca392b184e4026e5468",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/6554eecc92b184e4026e5469",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/65562cc892b184e4026e546c",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/article/65562de892b184e4026e546d",
      changefreq: "monthly",
      priority: 0.9,
    },
    [
      {
        url: "/lesson/the-migration-of-birds",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-hastings",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/martin-luther's-95-theses",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/george-washington",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/king-philip's-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-and-works-of-thomas-paine",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/toussaint-charbonneau",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/napoleon-bonaparte",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-lewis-and-clark-expedition",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/kit-carson-and-the-american-frontier",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-alien-and-sedition-acts",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/robert-e.-lee",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pt-barnum",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/florence-nightingale-and-the-dawn-of-modern-healthcare",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ulysses-s.-grant",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/stonewall-jackson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/nat-turner's-rebellion",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ada-lovelace:-first-female-computer-programmer",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-&-masterworks-of-rosa-bonheur",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/wyatt-earp",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-mexican_american-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/andrew-carnegie",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-forgotten-genius-of-charles-scott-sherrington",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/abraham-lincoln's-emancipation-proclamation",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/john-brown's-raid-on-harpers-ferry",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-moon-hoax-of-1835",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-chancellorsville",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sherman's-march-to-the-sea",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-13th-amendment",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/marcus-garvey",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mata-hari",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-little-bighorn",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/barney-oldfield,-the-fastest-man-on-earth",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ho-chi-minh",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ernie-pyle:-america's-eyewitness-to-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/dwight-d.-eisenhower",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bronze-age",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/amelia-earhart-flies-the-pond",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/lucky-lindy",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-spy-behind-home-plate",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-assassination-of-president-mckinley",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-tuskegee-syphilis-experiment",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ronald-reagan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-jutland",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/louis-zamperini",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/edmund-hillary:-the-first-man-at-the-top-of-the-world",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/doughboys-of-the-first-world-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/babe-didrikson-zaharias",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-19th-amendment",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/league-of-nations",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/robert-wadlow,-the-tallest-man-on-earth",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/george-wallace",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-brusilov-offensive",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/orlando:-virginia-woolf's-seminal-novel",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/alan-shepard:-first-american-in-space",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/margaret-thatcher",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/martin-luther-king-jr.",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/albert-schatz,-the-biggest-loser-in-scientific-discovery",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/james-dean",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/galloping-gertie",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/how-detroit-out-built-her-enemies-during-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pearl-harbor",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/muhammad-ali",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/a-big-week-for-the-allied-air-war-in-europe",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/kamikaze-attacks-of-wwii",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-french-sink-their-own-navy",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-yalta-conference-and-the-fate-of-post_war-europe",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-sabrejet's-role-in-the-korean-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-aphrodite-goes-horribly-wrong",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/a-standout-hero-at-hacksaw-ridge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-osan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-last-days-of-adolf-hitler",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/an-american-aircrew's-miraculous-final-flight",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/imperial-japanese-navy-bombs-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-inch’on",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-fall-of-saigon",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-tet-offensive",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/exxon-valdez-oil-spill",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/teenage-castaways-of-'ata-island",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-cuban-missile-crisis-&-the-cold-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-woodstock-music-&-arts-festival",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/iran-hostage-crisis",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-bloody-ridge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-resurrection-of-mary-rose",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bay-of-pigs-invasion",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-day-we-lost-charlie",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/alexander-the-great",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-iron-age",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-seven-natural-wonders-of-the-world",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mesolithic-period-of-early-man",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/genghis-khan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-mardi-gras",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/yosemite",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mesopotamia-and-the-fertile-crescent",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-christmas-trees",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/trojan-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/nefertiti",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/silk-road-to-china",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-neolithic-revolution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-minoan-eruption-of-thera",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/gladiators-of-ancient-rome",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hatshepsut,-the-queen-that-would-be-king",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/native-americans-and-the-buffalo",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hanukkah",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/han-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/shang-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/history-of-hong-kong",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-code-of-hammurabi",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-gods-of-anunnaki",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-paleolithic-period",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-basic-practices-of-hinduism",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-punic-wars",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-pyramids-of-giza",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-mayans",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/history-of-jack-o'lanterns",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/leap-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-legend-of-werewolves",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ancient-folklores-of-halloween",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/stonehenge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-traditions-of-passover",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/leonidas-and-the-spartan-300",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/malaria",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-stone-age-of-early-man",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-parthenon",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/socrates",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-gaelic-festival-of-samhain",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-copper-age",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ides-of-march",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-seven-wonders-of-the-ancient-world",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mount-everest",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-anatomy-of-tornadoes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-holy-city-of-jerusalem",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-acropolis",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-mirrors",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sudden-death-at-pompeii",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/cleopatra",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/tuberculosis",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/satan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ancient-civilization-of-sparta",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ark-of-the-covenant",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/grand-central-station",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-groundhog-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-empire-state-building",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/vatican-city",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-tōhoku-earthquake-of-japan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-golden-gate-bridge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-pagan-origins-of-halloween",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-april-fools'-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-tax-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/conspiracy-theories-and-the-sinking-of-the-titanic",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-flag-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-miranda-rights",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bikini-swimsuit-comes-of-age",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/cinco-de-mayo",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-labor-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-memorial-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-burning-ghost-town-of-centralia-pennsylvania",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-independence-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-first-four-presidents-to-get-sick-in-the-white-house",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-star_spangled-banner",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mount-rushmore",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-loch-ness-monster",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/jimmy-carter",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-father's-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/charlemagne",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-suez-canal-maritime’s-shortcut-through-egypt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-geneva-convention",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-washington-monument",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/medieval-architecture",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/medieval-warfare",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-first-crusade",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/weapons-of-the-middle-ages",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-incas",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-samurai-of-feudal-japan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-knights-templar",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-legend-of-bigfoot",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/marco-polo",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/canyon-de-chelly-and-the-dine-nation",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/medieval-christianity",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-day-of-the-dead",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/angkor-wat",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-suez-crisis",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/boxing-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-leaning-tower-of-pisa",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-veterans-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/world-war-one-mustard-gas-joins-the-fight-against-cancer",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/william-wallace",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-wall-of-china",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-historical-upside-to-pandemic-disease",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-barber's-poles",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-italian-renaissance",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/machu-picchu",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hundred-years'-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/leonardo-da-vinci",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ponce-de-leon",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/easter-island",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-house-of-medici",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/black-death",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/nicolaus-copernicus",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hernán-cortés",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/niccolò-machiavelli",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/michelangelo",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-sistine-chapel",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-spanish-inquisition",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/christopher-columbus-and-the-new-world",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/king-henry-viii-of-england",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-hot-dogs",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/bloody-mary",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/dancing-plague-of-1518",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/typhus",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/early-european-contacts-in-north-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/new-amsterdam",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-new-england-colonies-and-native-americans",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-middle-passage",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-thanksgiving",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-northwest-passage",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-protestant-reformation",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-taj-mahal",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-puritans",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-voyage-of-ferdinand-magellan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/first-thanksgiving",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pocahontas",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-mayflower-compact",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/john-locke",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/galileo",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/yellow-fever",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-romanov-family",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-salem-witch-trials",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/bacon's-rebellion",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/vivaldi-and-the-figlie-del-coro",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/age-of-enlightenment",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/glorious-revolution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/johann-sebastian-bach",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/samuel-adams",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-easter-bunny-and-his-eggs",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/onesimus:-an-african-slave-brings-smallpox-relief-to-the-colonies",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-awakening",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/catherine-the-great",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/peter-the-great",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-thirteen-virtues-of-ben-franklin",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/benedict-arnold",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/patrick-henry",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-french-&-indian-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-plains-people",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/poor-richard's-almanack",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/liberty-bell",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/thomas-jefferson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/alexander-hamilton",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mozart",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-proclamation-of-1763",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/robespierre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/marquis-de-lafayette",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pontiac's-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-industrial-revolution-in-great-britain",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/shot-heard-round-the-world",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-coercive-acts",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-articles-of-confederation",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/native-americans-and-the-revolutionary-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/paul-revere's-midnight-ride",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-boston-massacre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ben-franklin's-postal-service-spawns-an-american-revolution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battles-of-lexington-&-concord",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ludwig-van-beethoven",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/loyalists-v.-patriots-and-the-american-revolution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/boston-tea-party",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-princeton",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-bunker-hill",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-siege-of-boston",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-trenton",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-saratoga",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/a-tragic-winter-at-valley-forge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-cowpens",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/shays'-rebellion",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-yorktown",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/checks-and-balances",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-treaty-of-paris",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/constitutional-convention-of-1787",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-federalist-papers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-american-election-of-1800",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sojourner-truth",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-whiskey-rebellion",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-guillotines",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/james-buchanan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-underground-railroad",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-the-chesapeake",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-fallen-timbers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ottoman-empire",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sacagawea",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/eli-whitney-invents-the-cotton-gin",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/tammany-hall",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/flight-to-varennes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-placebo-effect",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-white-house",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/native-american-governance-and-the-u.s.-constitution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-presidents'-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-tippecanoe",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-luddites-of-great-britain",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-erie-canal",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-oregon-trail",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/frederick-douglass",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-the-thames",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/war-of-1812",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-ketchup",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/british-imperialism-in-india",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/manifest-destiny",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-napoleonic-wars",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/new-imperialism-and-the-white-man's-burden",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-age-of-queen-victoria",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/clara-barton",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/harriet-tubman",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/cholera",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-uncle-sam",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-magician-of-san-francisco",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-monroe-doctrine",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-second-middle-passage",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-rise-and-fall-of-the-whig-party",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/trail-of-tears",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sitting-bull",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/child-labor-in-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mark-twain",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/booker-t.-washington",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/birth-of-weather-forecasting-in-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/wilmot-proviso",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-kansas_nebraska-act",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/clipper-ships",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/thomas-edison",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/alexander-graham-bell",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/calamity-jane",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/california-genocide",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bear-flag-revolt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/karl-marx-and-the-communist-manifesto",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/cahill's-crossing",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/life-and-works-of-nikola-tesla",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-potato-chips",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-opium-wars",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/bleeding-kansas",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-donner-party",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/john-muir",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-irish-potato-famine",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-california-gold-rush",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-mountain-meadows-massacre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-industrial-revolution-in-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/woodrow-wilson's-racist-policies",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-dred-scott-decision",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-seneca-falls-convention",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/french-imperialism-in-southeast-asia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-homestead-act",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-pony-express",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-military-traditions-of-taps",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/annie-oakley",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-second-battle-of-bull-run",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-shiloh",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-first-battle-of-bull-run",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-capture-of-new-orleans",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/billy-the-kid",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/alice-in-wonderland",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-fredericksburg",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-atlanta",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-freedmen's-bureau",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-siege-of-vicksburg",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-new-york-city-draft-riots-of-1863",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/transcontinental-railroad",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-union-army-propels-lincoln-to-a-second-term",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/reconstruction-and-the-post_civil-war-south",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/william-randolph-hearst",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-antietam",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-gettysburg-address",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-fort-pillow",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-gettysburg",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-wright-brothers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sand-creek-massacre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mosby's-rangers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/carpetbaggers-and-scalawags",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-appomattox-court-house",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-assassination-of-abraham-lincoln",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/buffalo-soldiers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/juneteenth",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-brooklyn-bridge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-15th-amendment",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mahatma-gandhi",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bonanza-kings",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-chicago-fire",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-gilded-age",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/houdini",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-navajo-treaty-of-1868",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-impeachment-of-andrew-johnson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/w.e.b.-du-bois",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-age-of-imperialism-in-china",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/winston-churchill",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/herbert-hoover",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/alaska-purchase",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-compromise-of-1877",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/early-american-imperialism",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-opelousas-massacre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/jim-crow-laws-and-the-segregated-south",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/impeached-american-presidents",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/thomas-edison-sees-the-light",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/albert-einstein",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pancho-villa",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/joseph-stalin",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-american-eugenics-movement",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/fiorello-la-guardia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/social-darwinism",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-johnstown-flood-of-1889",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-red-baron",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/helen-keller",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-scramble-for-africa",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-early-history-of-american-immigration",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-newburgh-conspiracy",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mohawk-skywalkers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-peanut-butter",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/lawrence-of-arabia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-eiffel-tower",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-haymarket-riot",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/christy-girls",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-statue-of-liberty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/yellow-journalism",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ernest-hemingway",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-tong-wars-of-new-york-city",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-rough-riders",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-progressive-era",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/al-capone",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mao-zedong",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-chinese-exclusion-act",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/f.-scott-fitzgerald",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-spanish_american-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/j.-edgar-hoover",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ellis-island",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-turning-point-presidential-election-of-1896",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-first-cross_country-road-trip-by-car",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-tannenberg",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/stealing-mona-lisa",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-boxer-rebellion",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-model-t-ford",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-first-battle-of-the-marne",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/history-of-mother's-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/george-washington-carver",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/san-francisco's-earthquake-of-1906",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-armenian-genocide",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-general-slocum-disaster-of-1904",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mutiny-of-the-pennsylvania-line",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-triangle-shirtwaist-fire",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-sinking-of-the-lusitania",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-new-england-heatwave-of-1911",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/julius-and-ethel-rosenberg",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/jacques-cousteau",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-panama-canal",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/jesse-owens",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/joseph-mccarthy",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/gerald-ford",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-christmas-truce-of-1914",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/thurgood-marshall",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/billie-holiday",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-migration",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-harlem-hellfighters",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ernest-shackleton-survives-the-south-pole",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/harlem-renaissance",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-gallipoli",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/bonnie-and-clyde",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-weimar-republic",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-spanish-flu-of-1918",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mask-slackers-and-the-spanish-flu-of-1918",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-roaring-twenties",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sacco-&-vanzetti",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-rise-and-fall-of-fascism",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-boston-molasses-flood-of-1919",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-halifax-disaster-of-1917",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-red-summer-of-1919",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bolshevik-revolution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/maurice-hilleman-predicts-a-deadly-pandemic",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-treaty-of-versailles",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/zimmerman-telegram",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-palmer-raids",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/john-glenn",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-scopes-monkey-trial",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/flappers-of-the-roaring-twenties",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/alexander-fleming-discovers-penicillin",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hoovervilles-of-the-great-depression",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/black-blizzards-and-the-dust-bowl",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-depression",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-stock-market-crash-of-1929",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/leopold-and-loeb",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/medgar-evers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/prohibition-in-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/malcolm-x",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/collapse-of-the-soviet-union",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mein-kampf",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-rosewood-massacre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/cesar-chavez",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/geronimo",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-hoover-dam",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/big-bang-theory",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/alcatraz",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-night-witches-of-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-codebreakers-of-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-hitler-youth-of-nazi-germany",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/zoot-suits",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hatred-and-healing-at-the-birwood-wall",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/conquering-the-hudson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/works-progress-administration",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bonus-expeditionary-forces-of-1932",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/stalin's-famine-in-the-ukraine",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-hindenburg-disaster",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hitler's-olympic-games",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/fdr-and-the-new-deal",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/r_day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ritchie-boys-of-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-rape-of-nanking",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/end-of-prohibition",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-presidency-of-franklin-d.-roosevelt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/nazis-use-of-performance_enhancing-drugs",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/valentina-tereshkova:-the-first-woman-in-space",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-tuskegee-airmen",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-purge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-lend_lease-act-of-1941",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hitler’s-atlantic-wall",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-code-talkers-of-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/bataan-death-march-of-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/rosie-the-riveter",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/japanese-internment-during-wwii",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/battle-of-britain",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/27-club",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/zoot-suit-riots",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-stalingrad",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-manhattan-project",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-midway",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/general-macarthur's-mess_up-in-manilla",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/british-airmen-crash-a-nazi-party",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-overlord",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-expensive-flight-of-the-spruce-goose",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-guadalcanal",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-market-garden",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-blue-baby-operation",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-reunion",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-magic-carpet",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-paperclip",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-the-bulge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-american-1950s",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-berlin-airlift",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-uss-indianapolis",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-kon_tiki-expedition",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-cold-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-truman-doctrine",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-iwo-jima",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-marshall-plan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ve_day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-okinawa",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-nuremberg-trials",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/japanese-holdouts-of-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-hollywood-ten",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-korean-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-passing-of-fdr",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-potsdam-declaration",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-american-baby-boom",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-mann-gulch-fire-of-1949",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-london-smog-of-1952",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ho-chi-minh-trail",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-coronation-of-queen-elizabeth-the-second",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sputnik-and-the-birth-of-the-space-race",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/marilyn-monroe-sings-happy-birthday-to-jfk",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-u_2-spy-plane-incident",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-national-interstate-and-defense-highways-act-of-1956",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/laika,-the-first-canine-in-space",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-society-of-lyndon-baines-johnson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/nasa-picks-the-right-stuff",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-berlin-wall",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/project-blue-book",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/emmett-till",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/freedom-summer",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-little-rock-nine",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/donut-dollies-and-the-vietnam-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-hungarian-uprising-of-1956",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-domino-theory-of-the-cold-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-tv-dinner-comes-of-age",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-american-1960s",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/freedom-riders-of-1961",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-huey's-role-in-the-vietnam-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ford-motor-company-lays-an-egg",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/direct_dial-telephone-service-goes-nationwide",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/how-nasa-sold-the-moon-to-a-skeptical-nation",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/gulf-of-tonkin-resolution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/cultural-revolution-of-china",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ken-kesey-and-the-merry-pranksters",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/selma's-bloody-sunday",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-english-train-robbery-of-1963",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/jimi-hendrix-storms-the-monterey-pop-festival",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/agent-orange",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/juanita-moody-and-the-cuban-missile-crisis",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/poor-people's-campaign",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-first-successful-human-heart-transplant",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-khe-sanh",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-cobra's-role-in-the-vietnam-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-summer-of-love",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-disruptive-inventors-of-the-internet",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/a-bad-day-for-rock-n-roll-at-the-altamont-music-festival",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mlk's-final-speech",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-sino_soviet-border-war-of-1969",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-orangeburg-massacre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-easter-offensive",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/cleveland's-burning-river-sparks-an-environmental-revolution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-marshmallow-test",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-last-men-on-the-moon",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-space-shuttle-program",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-postal-strike-of-1970",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/america-in-the-1970s",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-watergate-scandal",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-new-york-city-blackout-of-1977",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/stockholm-syndrome",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-mariel-boatlift-of-1980",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hiv_aids",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pol-pot-and-the-khmer-rouge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ghost-city-of-varosha",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-mt.-st.-helens-eruption",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-spring-offensive-of-1975",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-babylift",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-1980s-in-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/three-mile-island",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-resignation-of-richard-milhous-nixon",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-air-traffic-controllers-strike-of-1981",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-iran_contra-affair",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/san-francisco-earthquake-of-1989",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mr.-gorbachev,-tear-down-this-wall",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/crispr-explained",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/theo-jansen’s-strand-beasts",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-basic-practices-of-buddhism",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/birds-aren't-real",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/fall-of-the-western-roman-empire",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-nazca-lines",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-oakland-firestorm-of-1991",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-legend-of-santa-claus",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-tmc-dumont,-a-study-in-form,-function-&-design",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sign-wars",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-fort-sumter",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/attila-the-hun",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/reaching-the-international-space-station",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-fall-of-the-byzantine-empire",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-firewall-of-china",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/caligula",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-valentine's-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/constantinople",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/rosh-hashanah",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hurricane-katrina",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/car-t-cell-therapy-fights-cancer",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/history-of-may-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/krampus:-christmas-devil",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-roman-emperor-nero",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/artificial-intelligence-and-suicide-prevention",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-boxing-day-tsunami-of-2004",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-beliefs-and-practices-of-islam",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-pizzaioli-of-naples",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-roman-colosseum",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-middle-ages",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-engagement-rings",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/beowulf",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/friday-the-13th",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/carolingian-renaissance",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-navigators-of-polynesia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/st.-patrick's-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/viking-norsemen",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/yuri-gagarin:-first-man-in-space",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/jfk,-the-first-television-president",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/armistice-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hernando-de-soto",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/tiananmen-square-massacre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-indian-removal-act",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/aaron-burr",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/dodd_frank-act",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/heaven's-gate",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/bartolomeu-dias",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/kaiser-wilhelm-ii",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/gandhi's-salt-march",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pandemics-of-the-future",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/skinwalkers-of-the-navajo-nation",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/nelson-mandela",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/king-george-iii",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-immigration-act-of-1965",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-early-years-of-jamestown-colony",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/shootout-at-ok-corral",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-lost-colony-of-roanoke",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-chickamauga",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-fugitive-slave-act-of-1793",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/plymouth-colony",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/quantum-mechanics",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-fugitive-slave-act-of-1850",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sumerian-tablets-of-ancient-mesopotamia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-pullman-strike-of-1894",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/quantum-computing",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bread-and-roses-strike",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-memphis-sanitation-strike",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-byzantine-empire",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-homestead-strike-of-1892",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-connecticut-compromise",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-vietnam-war-protest-movement",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-espionage-and-sedition-acts",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-napoleonic-code",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-social-security-act",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/tuberculosis-and-the-open_air-school-movement",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hitler's-cavalry-of-the-future",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-war-of-mexican-independence",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/jimmy-hoffa",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/famous-presidential-pardons",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/battle-of-long-tan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/everyday-life-in-colonial-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/misconceived-tanks-of-the-second-world-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-nazi's-plot-to-assassinate-the-big-three",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/friendly-fire-casualties-at-pearl-harbor",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/miracle-at-dunkirk",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/rené-descartes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/robert-watson_watt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/john-deere",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/leif-erikson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-steel-strike-of-1919",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mugwumps",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/panic-of-1893",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/alice-in-wonderland-syndrome",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-flint-sit_down-strike",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-iroquois-confederacy",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-torch",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-toilets",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/john-milton",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-scottsboro-boys",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-third-ypres-campaign",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/erasmus-of-rotterdam",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/howard-hughes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-immigration-act-of-1924",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-chattanooga",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/eugene-debs",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/lyndon-baines-johnson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/freemasons",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/john-cabot",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/psychedelic-cave-raves-of-early-man",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sinking-the-ss-athenia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-assassination-of-john-f.-kennedy",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-plagues-of-san-francisco",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sons-of-liberty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/what's-up-with-larping?",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/why-witches-ride-brooms",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-verdun",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/titanic",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-outlaw-jesse-james",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/wine-windows-of-italy-make-a-covid-comeback",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/united-airlines-flight-629",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pandemic-cholera",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pandemic-smallpox",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pandemic-typhus",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sigmund-freud",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/a-shaky-grand-opening-for-the-happiest-place-on-earth",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/pandemic-typhoid",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/famous-native-americans",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/anne-frank",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/blackbeard",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/cowboys-of-the-american-west",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/franco",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/fidel-castro",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/early-modern-man-and-the-last-ice-age",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/isaac-newton",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hiroshima,-the-day-the-world-went-nuclear",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/john-quincy-adams",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/life-aboard-the-mayflower",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/napalm-and-the-vietnam-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/rfk's-funeral-train",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/madam-c.j.-walker",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ruby-bridges",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/robert-f.-kennedy",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-harmonicas",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-barbary-slave-trade",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-pakchon",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-liberation-of-paris",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-raid-on-son-tay",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-sacramento-river-massacre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/women's-suffrage",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/vj-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/valhalla",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/battle-of-the-alamo",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/america's-first-opioid-crisis",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/california's-immigration-history",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/brown-v.-board-of-education",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/communication-techniques-of-early-man",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/francisco-pizarro",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/filibusters-in-central-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/grover-cleveland",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/harry-s.-truman",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/greek-mythology",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/germany's-spring-offensive-of-1918",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/how-to-make-a-microchip",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/joan-of-arc",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/orford-ness",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/robert-moses,-the-man-who-built-new-york-city",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/plessy-v.-ferguson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/s&h-green-stamps",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mcculloch-v.-maryland",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/minutemen",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/niels-bohr",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/queen-anne's-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/teddy-roosevelt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bermuda-triangle",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-amiens",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/tecumseh",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/seneca-village",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/susan-b.-anthony",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-discovery-of-insulin",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-crescent-city-tsunami-of-1964",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-co_evolution-of-dogs-&-humans",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-transistors",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-marburg-files",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-impeachments-of-donald-j.-trump",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-missouri-compromise",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-microchips",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/woodrow-wilson-",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-thirty-years'-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/typhoid-mary",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-roswell-incident",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/warren-g.-harding",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-black-friday-gold-scandal-of-1869",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-cultural-nations-of-america",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/max-planck",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/dante",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/thomas-hobbes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-monkey-bars",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-first-slave-revolt-in-the-new-world",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-mach-loop",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-hudson's-bay-company",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/westminster-abbey",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-explorations-of-henry-hudson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-black-friday",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-acadian-expulsion",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/samuel-de-champlain",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/misconceived-weapons-of-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/q_ships-of-world-war-one",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/squanto-and-the-pilgrims",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-klondike-gold-rush",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/marbury-v-madison",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/judas-and-jesus",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/franklin-d.-roosevelt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/geoffrey-chaucer",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/australia's-defeat-at-rabaul",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/donatello",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/eleanor-of-aquitaine",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/rosa-parks-and-the-montgomery-bus-boycott-of-1955",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/conquering-the-hudson:-building-the-lincoln-tunnel",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/america-enters-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/navajo-code-talkers-of-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-the-somme",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-prophesies-of-nostradamus",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/chernobyl-suffers-a-catastrophic-meltdown",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/woodrow-wilson-hallucinates-at-the-paris-peace-conference",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-greensboro-four-make-civil-rights-history",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-neolithic-period",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-14th-amendment",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-long-island",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-aztecs-of-mesoamerica",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/wounded-knee",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-chesapeake-bay-bridge",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/red-clouds'-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/huey-long",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/yom-kippur",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-overland-campaign",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-vacuum-tubes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/wilsonianism",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/jfk's-ich-bin-ein-berliner-speech",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/arlington-national-cemetery",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/america's-first-jet-aircraft",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/kristallnacht",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/march-of-the-ten-thousand",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/william-shakespeare",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-murder-of-thomas-becket",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-july-20-plot",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-plague-of-london",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-barbie-dolls",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-fire-of-london",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-colorado-gold-rush",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/teddy-roosevelt-and-the-river-of-doubt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sandro-botticelli",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/monkeypox",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/raphael",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/diphtheria",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/failed-warbirds-of-world-war-two",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/francis-bacon",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/jacques-cartier",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/joseph-lister:-the-father-of-modern-surgery",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/milk-sickness",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-haitian-revolution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-dying",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-quebec",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-english-civil-wars",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-library-of-alexandria",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-last-cape-horners",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-mystic-massacre",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-fire-of-new-york",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/bonfire-of-the-vanities",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/adoptive-cell-transfer-therapy",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-compromise-of-1850",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/bomba-puertorriqueña",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/high-score-u.s.-submarines-of-wwii",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/eleanor-roosevelt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-first-men-on-the-moon",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-zhou-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-little-ice-age",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hippocrates",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-qin-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/gunpowder-plot",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-massachusetts-bay-colony",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-pequot-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-reichstag-fire",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ming-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/irwin-rommel",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/louis-pasteur",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/robert-koch",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/click-chemistry-fights-cancer",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-whales",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/credible-ufo-sightings-of-the-21st-century",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-french-revolution",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-hawthorne-effect",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-sui-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-flies",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-tang-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-lighthouse-of-alexandria",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-louisiana-purchase",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/martin-van-buren",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-american-1940s",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-american-1930s",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-song-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-bats",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/u_boats-of-ww1",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/a-drunk-future-president",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/blitzkrieg",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/bombing-dresden",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/francisco-coronado",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/gutenberg's-printing-press",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/god-save-the-queen",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/hitler-invades-poland",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/samuel-johnson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/japan's-occupation-of-korea",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-deer",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-trick_or_treat",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/history-of-baseball",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/sharecropping-in-the-american-south",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-history-of-typewriters",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-bears",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-qing-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-peloponnesian-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-giraffes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-frogs",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-yuan-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/abandoned-civil-war-shelters-of-spain",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/anne-hutchinson",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/emiliano-zapata",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/emerging-therapies-for-glioma-patients",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-antikythera-mechanism",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/burning-the-library-of-alexandria",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/john-hancock",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-black-panthers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-caning-of-charles-sumner",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bomber-mafia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-black-panthers-of-ww2",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-coyotes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-collapse-of-the-bronze-age",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-zebras",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-hyenas",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-spanish-civil-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-lincoln_douglas-debates-of-1858",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-forbidden-city",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-tigers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-minks",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-rabbits",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-kursk",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-boer-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-goths",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/rembrandt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-barbarossa",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/roger-williams",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/mother-teresa",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/glenn-curtiss,-the-fastest-man-alive",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/galen",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/apartheid",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/erwin-rommel",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/fdr-and-churchill",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/fighting-joe-hooker-cleans-house",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/antibody-drug-conjugates-fight-cancer",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/george-h.-w.-bush",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/imperialism-and-the-slaveholding-south",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/james-cook",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/philippine-independence-day",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/quantum-electrodynamics",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/quantum-chromodynamics",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/philippine-occupation-and-independence",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/quarks-and-gluons",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-birth-of-gospel",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-wild-turkeys",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-wolverines",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-buffalo",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-peshtigo-fire-of-1871",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-croatia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-alaska",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-red-turban-rebellion",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-afghanistan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-reconstruction-acts-of-1867",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-hawaii",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-skunks",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-maryland",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-cheetahs",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-confiscation-acts",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-dew-line",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-elephants",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-honda-point-disaster",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-seven-pines",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-bull-of-scapa-flow",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/lady-columbia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-san-jacinto",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/skipjacks-of-the-chesapeake-bay",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/forrest-city",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/breakthroughs-in-antimatter",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/goody-two_shoes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/car-t-cells-fight-autoimmune-disease",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-franco_prussian-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/convoys-of-the-second-world-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/charles-darwin",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/giulia-tofana:-the-poison-queen-of-italy",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-great-california-flood-of-1862",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-jewish-expulsion-from-spain",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/darwinian-medicine",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-gullah-geechee",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-jewish-massacre-of-1391",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-wolves-",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-muskrats",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-beavers",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/vichy-france",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-patent-office-fire-of-1836",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-estonia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-resignation-of-george-washington",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-domesticated-house-cats",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-japan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-georgia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/black-holes",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/delta-blues",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/george-s.-patton",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/nanoparticles-fight-brain-cancer",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-dreyfus-affair",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/operation-plunder",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-sharks",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-rats",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-chimpanzees",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-kuiper-belt",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-physics-of-thermodynamics",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-kuwait",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-spanish_american-war",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-maine",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-physics-of-light",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/woodrow-wilson's-white-house-sheep",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/famous-gamblers-in-history",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/advances-in-anti_aging",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-texas",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/chemogenetics-fights-dementia",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/gothic-architecture",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-locusts",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/kublai-khan",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-battle-of-gazala",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/large-language-models-and-ai",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/galaxies",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-ghost-army-of-ww2",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-moose",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-physics-of-general-relativity",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-physics-of-vibrations-&-waves",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-physics-of-electricity",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-penguins",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/tiffany-girls",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-ireland",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-colorado",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-austria",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/breakthroughs-in-antibody-drug-development",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-fall-of-the-nasrid-dynasty",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-orangutans",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/lady-justice",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/in-search-of-ghost-particles",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-isle-of-man-motorcycle-race",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-aardvarks",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/ambush-at-nam-dong",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-life-of-sloths",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-physics-of-electromagnetism",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-tragedies-of-mary-&-abraham-lincoln",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-india",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-physics-of-balance",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/the-panic-of-1837",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-indiana",
        changefreq: "monthly",
        priority: 0.9,
      },
      {
        url: "/lesson/where-in-the-world-is-cambodia",
        changefreq: "monthly",
        priority: 0.9,
      },
    ],
  ];
};

// Remove export before running npm run generate-sitemap, replace after for build process
export const generateSitemap = async () => {
  const routes = await FetchRoutes();
  const sitemapStream = new SitemapStream({
    hostname: "https://www.platospeach.com",
  });
  const writeStream = createWriteStream("public/sitemap.xml");
  sitemapStream.pipe(writeStream);
  routes?.forEach((route) => {
    sitemapStream.write(route);
  });
  sitemapStream.end();
  console.log("Sitemap generated");
};

generateSitemap();
