const axios = require("axios");
const cheerio = require("cheerio");

async function auditWebsite(url) {
  try {
    // Normalise URL
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    const response = await axios.get(url, {
      timeout: 8000,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SingSinghBot/1.0; +https://singsinghai.com.au)",
        "Accept": "text/html,application/xhtml+xml",
        "Accept-Language": "en-AU,en;q=0.9",
      },
      maxRedirects: 3,
    });

    const $ = cheerio.load(response.data);

    // Extract metadata
    const title = $("title").first().text().trim() || "";
    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      "";

    // Remove noise elements
    $("script, style, nav, footer, header, .cookie-banner, .popup, noscript, iframe").remove();

    // Extract clean body text
    const bodyText = $("body").text().replace(/\s+/g, " ").trim().slice(0, 2500);

    // Tech stack signals
    const html = response.data.toLowerCase();
    const techSignals = [];
    if (html.includes("xero")) techSignals.push("Xero");
    if (html.includes("quickbooks") || html.includes("quickbook")) techSignals.push("QuickBooks");
    if (html.includes("salesforce")) techSignals.push("Salesforce");
    if (html.includes("hubspot")) techSignals.push("HubSpot");
    if (html.includes("shopify")) techSignals.push("Shopify");
    if (html.includes("woocommerce")) techSignals.push("WooCommerce");
    if (html.includes("wordpress")) techSignals.push("WordPress");
    if (html.includes("squarespace")) techSignals.push("Squarespace");
    if (html.includes("mailchimp")) techSignals.push("Mailchimp");
    if (html.includes("google analytics") || html.includes("gtag")) techSignals.push("Google Analytics");
    if (html.includes("stripe")) techSignals.push("Stripe");
    if (html.includes("myob")) techSignals.push("MYOB");

    // Pain point signals
    const painPoints = [];
    if (/(manual|spreadsheet|excel|data entry)/i.test(bodyText)) painPoints.push("Manual data processes");
    if (/(appointment|booking|schedul)/i.test(bodyText)) painPoints.push("Appointment/scheduling workflow");
    if (/(report|analytics|insight)/i.test(bodyText)) painPoints.push("Reporting & analytics");
    if (/(customer support|helpdesk|ticket|inquiry)/i.test(bodyText)) painPoints.push("Customer support");
    if (/(compli|regulation|audit|legal)/i.test(bodyText)) painPoints.push("Compliance & regulation");

    // Infer industry
    let industry = "General Business";
    if (/(accountant|accounting|bookkeep|tax|audit|cpa|financial service)/i.test(bodyText + title)) industry = "Accounting & Finance";
    else if (/(real estate|property|rental|landlord|tenant|leasing)/i.test(bodyText + title)) industry = "Property Management";
    else if (/(clinic|medical|health|doctor|patient|dental|physio)/i.test(bodyText + title)) industry = "Healthcare";
    else if (/(shop|store|ecommerce|e-commerce|product|retail)/i.test(bodyText + title)) industry = "E-commerce & Retail";
    else if (/(marketing|agency|campaign|digital|seo|ads)/i.test(bodyText + title)) industry = "Marketing Agency";
    else if (/(law|legal|solicitor|barrister|conveyancing)/i.test(bodyText + title)) industry = "Legal Services";
    else if (/(consult|advisor|professional service|firm)/i.test(bodyText + title)) industry = "Professional Services";

    return {
      url,
      title,
      description: description.slice(0, 200),
      industry,
      tech_signals: techSignals,
      pain_points_detected: painPoints,
      content_sample: bodyText.slice(0, 600),
      error: null,
    };
  } catch (err) {
    return {
      url,
      error: `Could not fetch website: ${err.message}`,
      title: null,
      description: null,
      industry: null,
      tech_signals: [],
      pain_points_detected: [],
      content_sample: null,
    };
  }
}

module.exports = { auditWebsite };
