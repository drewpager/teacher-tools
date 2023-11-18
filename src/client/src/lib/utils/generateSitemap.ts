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
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/biographies",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/dictators-plus-totalitarianism",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/world-war-two-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/u.s.-founding-fathers",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/the-gilded-age",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/battles-of-wwii",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/westward-expansion",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/battles-of-wwii",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/native-american-history",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/zoot-suit-riots",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/shays'-rebellion",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/historic-diseases-and-pandemics",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/marcus-garvey",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/cuban-missile-crisis",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/the-gilded-age",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/halloween",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/world-war-two-timeline",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/world-war-two-timeline",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/women's-suffrage",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/post-civil-war-reconstruction-era-",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/new-deal",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/new-deal",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/cold-war",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/boston-tea-party",
      changefreq: "daily",
      priority: 0.9,
    },
    {
      url: "/plan/american-imperialism",
      changefreq: "daily",
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
