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
    { url: "/pricing", changefreq: "monthly", priority: 0.8 },
    { url: "/plans", changefreq: "daily", priority: 0.9 },
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
    {
      url: "/lesson/647b649f6861ea1f2917c9d1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9d2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9d3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9d6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9d5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9d7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9d8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9d9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9dc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9de",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9db",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9dd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9df",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9ea",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9ec",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9eb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9e6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9ed",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9ee",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9ef",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9fa",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9fb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9f9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9fc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9fd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9ff",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca01",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca05",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca02",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917c9fe",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca04",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca07",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca03",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca06",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca00",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca0b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca09",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca0a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca0c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca08",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca0d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca0e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca11",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca0f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca12",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca15",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca16",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca14",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca18",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca1c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca17",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca19",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca1d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca1a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca1b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca13",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca1e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca26",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca24",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca29",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca23",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca21",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca25",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca27",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca1f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca28",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca20",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca22",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca2a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca2b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca30",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca2e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca33",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca36",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca31",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca38",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca2f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca34",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca37",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca35",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca2d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca2c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca32",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca39",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca3f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca3b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca40",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca3a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca41",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca3c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca3d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca3e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca42",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca47",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca45",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca46",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca44",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca43",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca48",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca4d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca4a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca4e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca55",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca49",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca4b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca51",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca53",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca54",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca52",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca50",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca4f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca58",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca57",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca4c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca56",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca5a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca5c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca5b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca5e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca59",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca5d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca5f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca63",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca62",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca67",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca64",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca66",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca61",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca60",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca68",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca65",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca69",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca6f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca6e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca6c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca6a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca71",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca6b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca6d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca72",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca70",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca78",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca7b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca77",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca7a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca74",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca76",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca79",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca75",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca73",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca7f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca7e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca80",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca7d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca85",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca87",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca84",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca7c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca8a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca8c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca8e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca8d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca83",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca82",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca89",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca86",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca81",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca88",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca8b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca93",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca92",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca8f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca95",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca97",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca90",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca98",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca99",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca94",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca96",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca91",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca9b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca9f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca9a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca9d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca9c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ca9e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caaf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caac",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caa7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caab",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caaa",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caae",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cabd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cabe",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caba",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cabc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cabb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cabf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cab8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cacb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caca",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cac9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cacc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cacd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cacf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cace",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cada",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cadb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cadc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cad5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cade",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cadd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cadf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caea",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caeb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cafb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cafa",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cae5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caed",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caee",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caef",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caec",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caf8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb01",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917caff",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cafe",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb00",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb0a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb06",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb05",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb03",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb07",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb04",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cafd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb08",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb0b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb0d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb0e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb09",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb02",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb10",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb0f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb12",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb14",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb11",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb13",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb0c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb15",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb2b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb21",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb1e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb29",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb19",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb20",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb1f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb27",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb1c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb1d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb23",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb18",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb2c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb28",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb17",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb2a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb1b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb16",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb1a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb22",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb2f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb25",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb2d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb2e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb24",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb31",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb36",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb32",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb35",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb33",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb3a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb38",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb34",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb39",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb30",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb37",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb3c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb48",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb49",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb41",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb43",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb3d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb46",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb4a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb40",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb3b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb44",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb47",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb42",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb3f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb45",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb3e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb4c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb4d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb4e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb4f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb4b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb57",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb59",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb58",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb5c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb5d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb5b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb5e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb53",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb55",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb54",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb5a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb60",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb5f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb51",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb61",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb50",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb56",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb62",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb52",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb65",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb66",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb63",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb64",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb6d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb6b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb67",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb74",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb77",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb69",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb6f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb68",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb6c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb70",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb79",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb73",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb72",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb71",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb7b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb6e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb7d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb83",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb75",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb80",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb7f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb82",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb78",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb6a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb7e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb81",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb7a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb76",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb7c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb85",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb99",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb94",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb84",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb8c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb9a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb89",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb8a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb8b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb9c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb87",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb88",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb92",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb93",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb9d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb91",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb86",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb97",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb8e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb96",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb9b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb8d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb9f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb90",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb95",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb98",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb9e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cb8f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbaf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbae",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbaa",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbab",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbad",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbac",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cba9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbbb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbbc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbbe",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbbd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbb4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbba",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbbf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbcc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbca",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbcb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbcf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbc7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbce",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbda",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbcd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbdb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbdd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbdf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbdc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbde",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbd2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbe5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbeb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbef",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbea",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbed",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbee",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbec",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc00",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbfe",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbfc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbfb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbfa",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbfd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc01",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbf8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cbff",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc03",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc11",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc05",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc0e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc18",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc15",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc0a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc0c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc1f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc12",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc17",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc04",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc09",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc1e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc0f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc19",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc0b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc06",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc07",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc13",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc16",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc10",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc0d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc02",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc14",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc20",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc22",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc1d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc21",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc1c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc23",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc1a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc1b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc27",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc25",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc28",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc26",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc24",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc2b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc2d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc2a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc2c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc29",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc35",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc2e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc33",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc34",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc31",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc30",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc2f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc32",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc3c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc36",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc3e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc42",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc39",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc37",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc40",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc3a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc3b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc3f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc3d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc38",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc41",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc43",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc46",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc45",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc44",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc47",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc5d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc52",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc5a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc54",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc48",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc56",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc4f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc53",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc5c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc5b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc4a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc59",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc49",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc4e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc55",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc57",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc4b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc4d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc50",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc5e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc5f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc58",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc51",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc4c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc62",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc6a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc63",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc61",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc69",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc64",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc68",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc65",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc67",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc60",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc66",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc6c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc6d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc72",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc77",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc6e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc70",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc71",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc74",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc76",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc73",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc78",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc75",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc6b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc6f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc7a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc79",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc88",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc83",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc7d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc89",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc7f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc85",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc7b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc7c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc86",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc7e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc8d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc8a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc80",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc8b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc81",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc87",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc82",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc8f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc84",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc8c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc8e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc94",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc92",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc90",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc98",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc97",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc95",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc96",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc99",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc93",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc9c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc9f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc9d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc9e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc9a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccab",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccb3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccb5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccb2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccb0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccaa",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccac",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccae",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccb4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cc9b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccb1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccad",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccaf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917cca6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/647b649f6861ea1f2917ccb6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd73",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd75",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd74",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd77",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd78",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd76",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd7b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd7a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd79",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd7c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd7d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd80",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd7f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd7e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d45a7164db605ca2fd81",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5c1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5c2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5c3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5c6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5c5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5c4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5c8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5c7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5c9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5ca",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5cc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5cd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5cb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5cf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5ce",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5da",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5d9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5dc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5db",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5dd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5df",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5de",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5ec",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5ea",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5ed",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5e8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5eb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5ee",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5ef",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5fa",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5fb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5f8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5ff",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5fd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5fe",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6d6102a80a71b0abac5fc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684113c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684113d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684113e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684113f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841141",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841140",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841143",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841145",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841142",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684114a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841148",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841149",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841146",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684114d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684114e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684114f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684114c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db3684114b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841150",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64a6dcbf6865f2db36841151",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793ba8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793baa",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793ba9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bad",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bac",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bab",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bae",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793baf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bba",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bbc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bb7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bbb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bbf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bc0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bbd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bbe",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bc2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bc1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bc3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bc7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bc5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bc6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64aca768ef6e34bbf6793bc4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add4d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add4e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add50",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add52",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add51",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add53",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add54",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add55",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add56",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add58",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64b7f8b17fd2cbbaca2add57",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc265",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc266",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc267",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc26a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc268",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc269",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc26d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc26e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc26b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc26c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc271",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc270",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc272",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64ce9c57ca57d2b7ed9cc26f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a11",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a10",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a13",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a12",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a15",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a14",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a18",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a19",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a1a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a16",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a1c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a1f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a1d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a1b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a1e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a20",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a24",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a23",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a26",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a21",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a27",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a22",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a2a",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a28",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a2c",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a29",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a2b",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/64fe4f4e32e96814733c9a2d",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/655635612b4a870e73171f2e",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b0659f",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065aa",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065a9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065ab",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065ad",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065ac",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065b1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065b0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065af",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065ae",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065b2",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065b3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065b8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065b7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065b5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065b4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065b9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065ba",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065bc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065bd",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065be",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065c1",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065bb",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065bf",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065c0",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065c5",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065c4",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065c3",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065c7",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065c6",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065c9",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065c8",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065ca",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065cc",
      changefreq: "yearly",
      priority: 0.8,
    },
    {
      url: "/lesson/6557b8b6433167a730b065cd",
      changefreq: "yearly",
      priority: 0.8,
    },
  ];
};

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
