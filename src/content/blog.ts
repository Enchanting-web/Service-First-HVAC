/**
 * Blog posts ported from the previous site. Bodies are stored as typed blocks
 * rather than raw HTML; inline **bold** and *italic* markers are rendered by
 * the RichText component.
 */

export type PostBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "callout"; title: string; text: string }
  | { type: "checklist"; title: string; items: string[] }
  /** Renders the maintenance tiers from services.ts so pricing lives in one place. */
  | { type: "plans" }
  | { type: "cta"; title: string; text: string; label: string; href: string };

export type Post = {
  /** Numeric id, preserved so the previous /blog/<id> URLs keep working. */
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    id: 7,
    slug: "summer-heat-is-here-is-your-aging-ac-ready-to-fail",
    title: "Summer Heat Is Here — Is Your Aging AC Ready to Fail?",
    category: "Tips & Tricks",
    date: "June 07, 2026",
    author: "Bryan Buckley",
    excerpt: "Cincinnati and Dayton are heading into another brutal summer. If your AC is 10+ years old, the odds of a mid-heatwave breakdown go up sharply. Here is what to watch for — and why waiting is the most expensive choice you can make.",
    image: "/blog/summer-heat-ac.jpg",
    body: [
      { type: "paragraph", text: "Every summer we get the same call, dozens of times a week: **\"My AC just quit — can you come today?\"** The answer is almost always yes, but the truth is most of those failures were preventable. They happen on the hottest days of the year, to the oldest units on the block, and almost never at a convenient time." },
      { type: "callout", title: "⚠ Heat Advisory Reality Check", text: "When outdoor temps push past 90°F, AC failure rates jump roughly **3× higher** than mild-weather averages. Same-day appointments fill by mid-morning. Parts on aging systems get back-ordered for days." },
      { type: "heading", text: "Why Older Units Fail in the Heat" },
      { type: "paragraph", text: "An AC system is essentially being asked to move heat *out* of your home into air that is already hot. The hotter it gets outside, the harder every component works — compressor, capacitors, fan motor, refrigerant lines. A unit that limped through last summer may not survive this one." },
      { type: "heading", text: "The Most Common Failures We See on Older Systems" },
      { type: "list", ordered: true, items: ["**Failed capacitors** — the #1 heatwave call. A $20 part that, when it dies, leaves your whole system dark.", "**Burned-out compressors** — the most expensive failure. Often the final straw on units 12+ years old.", "**Low or leaking refrigerant** — older R-22 systems are especially vulnerable, and that refrigerant is no longer manufactured.", "**Frozen evaporator coils** — caused by dirty filters, low refrigerant, or weak airflow on tired blowers.", "**Contactor and relay failure** — small electrical parts that fry under sustained high-load operation."] },
      { type: "heading", text: "Is It Time to Replace, Not Repair?" },
      { type: "paragraph", text: "If your AC is over 10 years old, runs constantly, struggles to keep the house below 75°F on hot afternoons, or has needed multiple repairs in the last two seasons — replacement is almost always the smarter call. Modern high-efficiency units use **30–50% less energy** and come with real warranties. The break-even point usually arrives faster than homeowners expect." },
      { type: "heading", text: "Don't Wait for the Heat Advisory" },
      { type: "paragraph", text: "Once a heat advisory hits, every HVAC company in the region is booked solid. Diagnostics get delayed. Replacement quotes take days. Meanwhile your home sits at 85°F with kids, pets, or elderly family members inside. The cheapest, safest moment to deal with an aging AC is **before** it breaks — not the afternoon it does." },
      {
        type: "cta",
        title: "Beat the rush — book today.",
        text: "Free replacement quotes. Same-day diagnostics. Honest answers about whether to repair or replace.",
        label: "Call (513) 813-1945",
        href: "tel:5138131945",
      },
    ],
  },
  {
    id: 1,
    slug: "5-signs-your-ac-needs-repair",
    title: "5 Signs Your AC Needs Repair",
    category: "Maintenance",
    date: "June 15, 2025",
    author: "Bryan Buckley",
    excerpt: "Is your air conditioner making strange noises or blowing warm air? Learn the early warning signs that indicate you need professional HVAC service before it breaks down completely.",
    image: "/work/residential-ac-unit.jpg",
    body: [
      { type: "paragraph", text: "When the summer heat hits, a malfunctioning air conditioner is the last thing you want. Common signs that your AC needs immediate attention include unusual grinding or squealing noises, weak airflow, frequent cycling, and high humidity levels inside your home." },
      { type: "heading", text: "1. Warm Air" },
      { type: "paragraph", text: "If you feel warm air coming from your vents, check your thermostat first. Make sure it's switched to cooling mode and set lower than your home's current temperature. If your vents still blow warm air, you might have restricted airflow or a compressor issue." },
      { type: "heading", text: "2. Insufficient Airflow" },
      { type: "paragraph", text: "Poor airflow is a common sign that your AC isn't working efficiently or that a blockage is preventing air from moving through your home's ductwork. A clogged air filter, a broken motor, or something even more serious might be to blame." },
      { type: "heading", text: "3. Frequent Cycles" },
      { type: "paragraph", text: "Your AC should go through relatively routine cooling cycles, regardless of the weather. While you can expect your cooling system to turn on more frequently on the hottest days of summer, it shouldn't cycle on and off constantly." },
      { type: "heading", text: "4. High Humidity" },
      { type: "paragraph", text: "During the spring and summer, you can expect sticky weather outdoors. But that doesn't mean you want to experience high humidity indoors. Your AC should moderate humidity levels automatically." },
      { type: "heading", text: "5. Water Leaks" },
      { type: "paragraph", text: "Your air conditioner relies on refrigerant to cool your home and may produce condensation as it operates. However, neither of these liquids should accumulate or leak into your home." },
      { type: "callout", title: "Need help with your AC?", text: "Contact Service First Heating & Air today to schedule an inspection." },
    ],
  },
  {
    id: 2,
    slug: "the-benefits-of-regular-hvac-maintenance",
    title: "The Benefits of Regular HVAC Maintenance",
    category: "Tips & Tricks",
    date: "May 22, 2025",
    author: "Bryan Buckley",
    excerpt: "Discover how annual tune-ups can save you money on energy bills, extend the lifespan of your system, and improve your home's indoor air quality.",
    image: "/blog/hvac-maintenance-benefits.jpg",
    body: [
      { type: "paragraph", text: "Regular HVAC maintenance is like an oil change for your car. It ensures all components are clean, lubricated, and functioning at peak efficiency." },
      { type: "heading", text: "Lower Energy Bills" },
      { type: "paragraph", text: "A well-maintained system runs more efficiently, meaning it uses less energy to heat or cool your home. This translates directly to savings on your monthly utility bills." },
      { type: "heading", text: "Extended Lifespan" },
      { type: "paragraph", text: "Regular tune-ups can significantly extend the lifespan of your furnace and AC unit. By catching small issues before they become major failures, you avoid the high cost of premature replacement." },
      { type: "heading", text: "Improved Air Quality" },
      { type: "paragraph", text: "During a maintenance visit, we clean the components that air passes through, reducing the amount of dust and allergens circulating in your home." },
    ],
  },
  {
    id: 3,
    slug: "choosing-the-right-furnace-for-your-home",
    title: "Choosing the Right Furnace for Your Home",
    category: "Buying Guide",
    date: "April 10, 2025",
    author: "Bryan Buckley",
    excerpt: "Confused about AFUE ratings and heating stages? We break down everything you need to know to select the perfect furnace for your home's size and budget.",
    image: "/blog/choosing-a-furnace.jpg",
    body: [
      { type: "paragraph", text: "Selecting a new furnace involves more than just picking a brand. You need to consider the AFUE (Annual Fuel Utilization Efficiency) rating, which measures how efficiently the unit converts fuel into heat." },
      { type: "heading", text: "Understanding AFUE" },
      { type: "paragraph", text: "Higher ratings mean lower bills. A 95% AFUE rating means 95 cents of every dollar spent on gas goes toward heating your home, while only 5 cents is lost through the chimney." },
      { type: "heading", text: "Heating Stages" },
      { type: "paragraph", text: "You also need to decide between single-stage, two-stage, or modulating furnaces based on your comfort needs and budget. Modulating furnaces provide the most consistent temperature control." },
    ],
  },
  {
    id: 4,
    slug: "indoor-air-quality-why-it-matters",
    title: "Indoor Air Quality: Why It Matters",
    category: "Health",
    date: "March 05, 2025",
    author: "Bryan Buckley",
    excerpt: "Poor indoor air quality can lead to health issues and discomfort. Learn how air purifiers, humidifiers, and regular filter changes can make a difference.",
    image: "/blog/indoor-air-quality.jpg",
    body: [
      { type: "paragraph", text: "We spend up to 90% of our time indoors, making air quality a top health priority. Dust, pollen, pet dander, and mold can accumulate in your ductwork and circulate through your home." },
      { type: "heading", text: "The Importance of Filtration" },
      { type: "paragraph", text: "High-efficiency filters can trap even the smallest particles, preventing them from entering your lungs. Solutions like HEPA filters and UV light purifiers can significantly reduce allergens." },
      { type: "heading", text: "Humidity Control" },
      { type: "paragraph", text: "Whole-home humidifiers and dehumidifiers help maintain the ideal moisture level, preventing mold growth and keeping your skin and respiratory system healthy." },
    ],
  },
  {
    id: 5,
    slug: "preparing-your-hvac-for-winter",
    title: "Preparing Your HVAC for Winter",
    category: "Maintenance",
    date: "October 12, 2024",
    author: "Bryan Buckley",
    excerpt: "Don't get caught in the cold! Follow our comprehensive checklist to ensure your heating system is ready for the freezing temperatures ahead.",
    image: "/blog/hvac-winter-prep.jpg",
    body: [
      { type: "paragraph", text: "Before the first frost, it's essential to test your heating system. Change your filters, clear any debris from around the outdoor unit, and check your thermostat batteries." },
      { type: "heading", text: "The Pre-Winter Checklist" },
      { type: "list", ordered: false, items: ["Change air filters", "Check thermostat settings", "Inspect outdoor unit for debris", "Test carbon monoxide detectors"] },
      { type: "paragraph", text: "A professional pre-winter inspection can identify potential failures before they leave you without heat during a blizzard." },
    ],
  },
  {
    id: 6,
    slug: "introducing-our-new-hvac-maintenance-plan",
    title: "Introducing Our New HVAC Maintenance Plan",
    category: "Announcements",
    date: "March 01, 2026",
    author: "Bryan Buckley",
    excerpt: "Never worry about your heating or cooling again. Discover the peace of mind that comes with our comprehensive maintenance subscription, designed to save you money and prevent emergencies.",
    image: "/blog/maintenance-plan.jpg",
    body: [
      { type: "paragraph", text: "We are thrilled to announce the launch of our new HVAC Maintenance Plan! This plan is designed to provide our customers with total peace of mind, ensuring their systems are always running at peak performance while saving you money on every service call." },
      { type: "heading", text: "3 Plans. One for Every Homeowner." },
      { type: "paragraph", text: "Choose the level of protection that fits your home and budget. All plans include our two core annual visits: a Spring A/C Precision Tune-Up and a Fall Furnace Safety Inspection." },
      { type: "plans" },
      { type: "checklist", title: "★ Platinum Exclusive: Member-Share Benefit", items: ["24/7 Emergency Access", "No Overtime Charges", "20% Off Repairs"] },
      { type: "paragraph", text: "Platinum members can extend their plan benefits to a friend, family member, or neighbor when they need HVAC service." },
      { type: "heading", text: "What We Check During Your Visits" },
      { type: "checklist", title: "Spring A/C Precision Tune-Up", items: ["Inspect & clean condenser coil", "Check refrigerant levels", "Inspect compressor operation", "Test capacitors & components", "Clean condensate drain line", "Check outdoor unit condition"] },
      { type: "checklist", title: "Fall Furnace Safety Inspection", items: ["Inspect heat exchanger for cracks", "Carbon monoxide safety check", "Test ignition system", "Inspect flame sensor & burners", "Inspect flue & venting system", "Check airflow & static pressure"] },
      { type: "heading", text: "Membership Terms" },
      { type: "list", ordered: true, items: ["**12-Month Agreement:** All plans require a 12-month commitment, billed monthly for your convenience.", "**Early Cancellation:** Remaining contract balance becomes due. A $45 processing fee applies to cancellation or payment default.", "**Additional Systems:** Extra heating or cooling units can be added to any plan for just $35/unit/month."] },
      {
        type: "cta",
        title: "Protect Your Home's Comfort All Year Long",
        text: "Don't wait for a breakdown on the hottest day of summer or the coldest night of winter. Priority scheduling starts from day one of your membership.",
        label: "Call to Enroll: (513) 813-1945",
        href: "tel:5138131945",
      },
    ],
  },
];

export const postCategories = [
  "Maintenance",
  "Tips & Tricks",
  "Buying Guide",
  "Health",
  "Announcements",
] as const;

export function getPost(id: string): Post | undefined {
  return posts.find((post) => String(post.id) === id || post.slug === id);
}

/** Newest first, by parsed post date. */
export function postsByDate(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
