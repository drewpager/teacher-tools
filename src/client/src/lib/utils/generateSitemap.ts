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
    { url: "/plan", changefreq: "daily", priority: 0.9 },
    {
      url: "/plan/military-history-playlist",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/dictators-plus-totalitarianism",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/world-war-two-history",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/u.s.-founding-fathers",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/the-gilded-age",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/westward-expansion",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/battles-of-wwii",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/native-american-history",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/zoot-suit-riots",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/shays'-rebellion",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/historic-diseases-and-pandemics",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/marcus-garvey",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/cuban-missile-crisis",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/halloween",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/world-war-two-timeline",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/women's-suffrage",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/post-civil-war-reconstruction-era",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/new-deal",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/cold-war",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/boston-tea-party",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      url: "/plan/american-imperialism",
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
