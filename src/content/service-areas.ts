import { site } from "./site";

/**
 * The 22 communities we cover, ported from the previous site with the brand
 * name updated. Drives the service-areas index, each city page, and the sitemap.
 */

export type NearbyArea = {
  city: string;
  state: string;
  driveTime: number;
};

export type ServiceAreaFaq = {
  question: string;
  answer: string;
};

export type ServiceArea = {
  slug: string;
  city: string;
  state: string;
  metro: string;
  /** One-line summary shown on cards in the service-areas index. */
  blurb: string;
  /** Minutes from the Monroe shop. */
  driveTime: number;
  zip: string;
  why: string;
  climate: string;
  housingStock: string;
  /** Comma-separated local landmarks. */
  aroundTown: string;
  neighborhoods: string[];
  nearby: NearbyArea[];
  faqs: ServiceAreaFaq[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "monroe",
    city: "Monroe",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "We're headquartered right on S Main Street in Monroe — your neighbors, not a call center. Trucks roll from our shop to your driveway in minutes.",
    driveTime: 0,
    zip: "45050",
    why: "Founded and family-run in Monroe for 20+ years. If your unit dies overnight, we're usually there before your morning coffee.",
    climate: "Monroe sits in the humid-continental band that spikes past 90°F in July and drops below 20°F in January — HVAC systems here work hard year-round.",
    housingStock: "Mix of 1990s–2020 builds in the growth corridor plus older farmhouses south of OH-63. We stock parts for both legacy 80% furnaces and modern variable-speed heat pumps.",
    aroundTown: "Traders World, Monroe Premium Outlets, Monroe Local Schools",
    neighborhoods: ["Downtown Monroe", "Heritage Green", "Trailwoods", "Lemon Township", "Salzman Road corridor"],
    nearby: [
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
      { city: "Hamilton", state: "OH", driveTime: 20 },
    ],
    faqs: [
      {
        question: "How fast can you get to my Monroe home?",
        answer: "Most Monroe calls are on-site within 60 minutes during business hours. Our shop is at 638 S Main St.",
      },
      {
        question: "Do you service both sides of I-75?",
        answer: "Yes — from Salzman Road east to Todhunter and Lebanon-Monroe west of the highway.",
      },
    ],
  },
  {
    slug: "cincinnati",
    city: "Cincinnati",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "From Hyde Park bungalows to Over-the-Rhine walk-ups and Mt. Lookout Cape Cods, we know Cincinnati's older housing stock and the retrofit tricks that keep it comfortable.",
    driveTime: 35,
    zip: "45202",
    why: "We handle everything from steam boiler tune-ups in a 1905 Clifton four-square to full ducted heat-pump conversions in Oakley.",
    climate: "The Ohio River basin traps humidity — Cincinnati summers routinely hit 92°F+ with brutal dew points, which is why oversized AC actually cools worse here.",
    housingStock: "Century-old homes with boilers and radiators are common in Hyde Park, Clifton and OTR. We install high-velocity, ductless mini-split, and hybrid systems that respect the architecture.",
    aroundTown: "Fountain Square, Eden Park, Rookwood Commons",
    neighborhoods: ["Hyde Park", "Oakley", "Mt. Lookout", "Clifton", "Over-the-Rhine", "Pleasant Ridge", "Madisonville"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
      { city: "Hamilton", state: "OH", driveTime: 20 },
    ],
    faqs: [
      {
        question: "Do you work on old boilers and radiators?",
        answer: "Yes. We service and replace steam and hot-water boilers throughout the older Cincinnati neighborhoods.",
      },
      {
        question: "Can you add AC to a home with no ductwork?",
        answer: "Absolutely — ductless mini-splits and high-velocity systems are our specialty for historic Cincinnati homes.",
      },
    ],
  },
  {
    slug: "middletown",
    city: "Middletown",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Middletown is right up the road. From Central Ave to Towne Blvd to Renaissance District rentals, we cover residential and light commercial HVAC across the city.",
    driveTime: 10,
    zip: "45044",
    why: "Local landlords call us for turnaround work between tenants — we can get a unit inspected, repaired, and documented same day.",
    climate: "Same humid Miami Valley pattern as Monroe — long summers, damp basements, and heat pumps that need a proper defrost strategy in January.",
    housingStock: "A lot of 1950s–70s ranches with original ductwork that leaks 20%+. Sealing and balancing often beats a new system.",
    aroundTown: "Atrium Medical Center, Middletown Regional Airport, Smith Park",
    neighborhoods: ["Downtown Middletown", "Wildwood", "Amanda", "Manchester", "Towne Boulevard"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
      { city: "Hamilton", state: "OH", driveTime: 20 },
    ],
    faqs: [
      {
        question: "Do you do landlord-tenant HVAC inspections?",
        answer: "Yes, with written reports suitable for lease documentation.",
      },
      {
        question: "How much does furnace replacement typically cost in Middletown?",
        answer: "Most single-family furnace swaps land between $4,500 and $8,500 installed — we give firm quotes on-site, never over the phone.",
      },
    ],
  },
  {
    slug: "west-chester",
    city: "West Chester",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Newer construction and larger square footage in West Chester means zoning and static-pressure matter. We size and install systems the way the manuals actually say to.",
    driveTime: 15,
    zip: "45069",
    why: "We add zoning, upgrade thermostats, and swap tired builder units for equipment that actually matches the square footage.",
    climate: "Larger, well-insulated homes with 2-story great rooms can overwork a single-zone system. Proper Manual J load calcs are non-negotiable here.",
    housingStock: "Mostly 1998–2015 builds with builder-grade equipment that's aging into replacement now. Multi-stage variable-speed is the sweet spot for these homes.",
    aroundTown: "Streets of West Chester, Voice of America MetroPark, Union Centre Boulevard",
    neighborhoods: ["Beckett Ridge", "Wetherington", "Providence Point", "Meadow Ridge", "Union Centre"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
      { city: "Hamilton", state: "OH", driveTime: 20 },
    ],
    faqs: [
      {
        question: "Can you add a zone to my existing system?",
        answer: "In most West Chester homes yes — we retrofit dampers and controllers to fix hot upstairs bedrooms.",
      },
      {
        question: "What SEER should I get?",
        answer: "For West Chester, SEER2 15.2–17 is the value sweet spot. Anything higher only pays back on very large homes or with high electric rates.",
      },
    ],
  },
  {
    slug: "liberty-township",
    city: "Liberty Township",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Liberty Township homeowners want honest answers, not a sales script. We diagnose first, quote the fix, and only mention replacement when it truly makes sense.",
    driveTime: 12,
    zip: "45011",
    why: "We're Lakota parents ourselves — you'll get straight talk and a quote in writing.",
    climate: "Rolling terrain and larger lots mean wind exposure varies house-to-house — attic insulation and duct sealing usually matter more than raw AC tonnage.",
    housingStock: "Predominantly 2000s+ construction. Original equipment is now 15–20 years old and hitting end-of-life all at once.",
    aroundTown: "Liberty Center, Cincinnati Premium Outlets (nearby), Lakota schools",
    neighborhoods: ["Four Bridges", "Wyndemere", "Yankee Trace of Liberty", "Princeton Square"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Mason", state: "OH", driveTime: 18 },
      { city: "Hamilton", state: "OH", driveTime: 20 },
    ],
    faqs: [
      {
        question: "My 20-year-old builder unit died — should I match it or upgrade?",
        answer: "It depends on your envelope. We measure static pressure and airflow before recommending anything.",
      },
      {
        question: "Do you offer financing?",
        answer: "Yes, with approved credit for full-system installs.",
      },
    ],
  },
  {
    slug: "mason",
    city: "Mason",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Mason's planned communities and larger custom homes need HVAC designed, not just installed. We do load calcs, not guesses.",
    driveTime: 18,
    zip: "45040",
    why: "We've been called in after other contractors couldn't solve airflow issues in Mason custom builds.",
    climate: "Summer weekends near Kings Island mean high grid load — we recommend variable-speed AC to soften utility peaks.",
    housingStock: "High-end custom homes with complex duct layouts. We often find undersized returns and fix airflow before touching the equipment.",
    aroundTown: "Kings Island, Great Wolf Lodge, Western & Southern Open",
    neighborhoods: ["Heritage Club", "Mason Historic District", "Deerfield Township edge", "Kings Mills"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Hamilton", state: "OH", driveTime: 20 },
    ],
    faqs: [
      {
        question: "Do you handle geothermal?",
        answer: "We service most geothermal loops in Mason and can replace the interior air handler and controls.",
      },
      {
        question: "Can you install a whole-home humidifier and IAQ system?",
        answer: "Yes — Aprilaire, Honeywell, and REME HALO are all in regular rotation.",
      },
    ],
  },
  {
    slug: "hamilton",
    city: "Hamilton",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Hamilton's mix of historic districts and industrial edges keeps us on our toes. We do everything from Second Ward bungalows to light commercial rooftop units.",
    driveTime: 20,
    zip: "45011",
    why: "We've worked in Hamilton's historic districts for two decades and know which inspectors want what.",
    climate: "River-adjacent humidity means IAQ and dehumidification are as important as raw cooling capacity.",
    housingStock: "A lot of 1920s–40s brick homes with original chimney-vented equipment. Modern high-efficiency units need proper venting retrofits.",
    aroundTown: "Fitton Center, Great Miami River, Miami University Hamilton",
    neighborhoods: ["German Village", "Dayton Lane Historic District", "Rossville", "Lindenwald"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Can you install a high-efficiency furnace with an old chimney vent?",
        answer: "We add PVC sidewall venting or a chimney liner as needed — no shortcuts.",
      },
      {
        question: "Do you do small commercial?",
        answer: "Yes — package units, splits, and light rooftop work under 10 tons.",
      },
    ],
  },
  {
    slug: "fairfield",
    city: "Fairfield",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Fairfield homeowners get the same straight-forward diagnostic-first approach we give Monroe neighbors. No pressure, no upsells.",
    driveTime: 22,
    zip: "45014",
    why: "Fairfield has been a strong referral base for us for years — most work here comes from neighbor recommendations.",
    climate: "Standard Butler County pattern — plan for 90°F+ AC demand and sub-20°F furnace cycles.",
    housingStock: "Ranches and split-levels from the 60s–80s, plus newer subdivisions off Symmes Road.",
    aroundTown: "Jungle Jim's International Market, Marsh Park, Fairfield High School",
    neighborhoods: ["Village Green", "Winton Ridge", "Symmes-Fairfield line"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Do you honor other companies' quotes for second opinions?",
        answer: "We'll give you our own diagnostic and quote — often we find a repair where others recommended replacement.",
      },
      {
        question: "Emergency after-hours rate?",
        answer: "Yes we work 24/7 for no-heat/no-cool emergencies; after-hours diagnostic fee applies.",
      },
    ],
  },
  {
    slug: "norwood",
    city: "Norwood",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Norwood's tight-lot older housing and small commercial storefronts each need a different playbook — we bring both.",
    driveTime: 32,
    zip: "45212",
    why: "We've installed dozens of mini-splits in Norwood homes where full ductwork would be a nightmare.",
    climate: "Dense urban housing means AC condensers often sit in tight side-yards where airflow matters more than nameplate SEER.",
    housingStock: "Small-footprint 1920s houses with steam or converted forced-air. Ductless splits are frequently the best answer.",
    aroundTown: "Rookwood Commons, Xavier University edge, Surrey Square",
    neighborhoods: ["Central Norwood", "Norwood Heights", "Surrey Square area"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Can you install a mini-split in a rental?",
        answer: "Yes — with owner approval and permits.",
      },
      {
        question: "Do you work on small commercial?",
        answer: "Yes, storefronts and offices up to about 8,000 sq ft.",
      },
    ],
  },
  {
    slug: "blue-ash",
    city: "Blue Ash",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Blue Ash homes and light-industrial offices get the same standard: proper Manual J sizing, clean installs, and 10-year peace of mind.",
    driveTime: 28,
    zip: "45242",
    why: "We do quiet installs — Blue Ash HOAs care about outdoor unit placement and dB ratings.",
    climate: "Elevation slightly higher than the river basin — a few degrees cooler at night, which matters for heat-pump balance points.",
    housingStock: "Established 1970s–90s neighborhoods with builder equipment now aging out. Small commercial offices along Reed Hartman are frequent clients.",
    aroundTown: "Summit Park, Blue Ash Airport (former), Reed Hartman Highway",
    neighborhoods: ["Downtown Blue Ash", "Reed Hartman corridor", "Kenwood line"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Do you offer maintenance agreements for small offices?",
        answer: "Yes — quarterly and semi-annual plans available.",
      },
      {
        question: "What's the quietest AC you install?",
        answer: "Currently our top pick is around 55 dBA at 1 meter — well below most HOA thresholds.",
      },
    ],
  },
  {
    slug: "loveland",
    city: "Loveland",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Loveland's riverfront and hilly terrain create their own micro-climates — we account for them in every install we design.",
    driveTime: 30,
    zip: "45140",
    why: "We're trail-riders ourselves — if you're near the bike trail, we probably know your street.",
    climate: "Wooded hillside lots run several degrees cooler than open developments — heat-pump sizing needs to reflect that.",
    housingStock: "Historic downtown carriage homes plus large newer builds on wooded lots. Both benefit from staged/variable equipment.",
    aroundTown: "Little Miami Scenic Trail, Nisbet Park, Loveland Castle",
    neighborhoods: ["Historic Downtown Loveland", "Loveland Madeira Rd", "Miami Township"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Do you install heat pumps in older homes?",
        answer: "Yes, often with a dual-fuel setup using the existing furnace as backup.",
      },
      {
        question: "How long does a full install take?",
        answer: "Most Loveland single-family jobs finish in one day.",
      },
    ],
  },
  {
    slug: "lebanon",
    city: "Lebanon",
    state: "OH",
    metro: "Cincinnati Metro",
    blurb: "Lebanon's historic homes and newer eastside developments both count on us for straight-forward HVAC without the runaround.",
    driveTime: 18,
    zip: "45036",
    why: "We've replaced systems in Lebanon homes on the Historic Register — permits, aesthetics, and code all handled.",
    climate: "Rural exposure north of Lebanon gets stronger wind loads — infiltration matters as much as insulation.",
    housingStock: "1850s Federals downtown, 1990s ranches on the perimeter — we bring parts and expertise for both.",
    aroundTown: "Golden Lamb Inn, Warren County Fairgrounds, Lebanon Historic District",
    neighborhoods: ["Historic Lebanon", "Countryside YMCA area", "Deerfield Twp edge"],
    nearby: [
      { city: "Monroe", state: "OH", driveTime: 0 },
      { city: "Cincinnati", state: "OH", driveTime: 35 },
      { city: "Middletown", state: "OH", driveTime: 10 },
      { city: "West Chester", state: "OH", driveTime: 15 },
      { city: "Liberty Township", state: "OH", driveTime: 12 },
      { city: "Mason", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Can you install a system without touching the historic exterior?",
        answer: "Usually yes — with careful line-set routing and unit placement.",
      },
      {
        question: "Do you handle geothermal service?",
        answer: "Yes, most brands.",
      },
    ],
  },
  {
    slug: "dayton",
    city: "Dayton",
    state: "OH",
    metro: "Dayton Metro",
    blurb: "Dayton's mix of pre-war bungalows, mid-century ranches, and new builds means no two service calls look the same. We show up ready for all of them.",
    driveTime: 30,
    zip: "45402",
    why: "We serve WPAFB families relocating in and out on PCS timelines — fast estimates, straight answers, no upsell.",
    climate: "Dayton's temperature swings — 95°F July afternoons dropping to 70°F overnight — stress single-stage systems. Two-stage and variable-speed equipment pays back fast here.",
    housingStock: "Older Dayton homes often have knob-and-tube adjacent HVAC or converted-coal furnace footprints. We handle those retrofits without cutting corners.",
    aroundTown: "Dayton Arcade, Fifth Third Field, RiverScape MetroPark",
    neighborhoods: ["South Park", "Oregon District", "Belmont", "Grafton Hill", "Kettering line"],
    nearby: [
      { city: "Springboro", state: "OH", driveTime: 15 },
      { city: "Kettering", state: "OH", driveTime: 25 },
      { city: "Beavercreek", state: "OH", driveTime: 35 },
      { city: "Oakwood", state: "OH", driveTime: 28 },
      { city: "Centerville", state: "OH", driveTime: 22 },
      { city: "Miamisburg", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Can you do a same-day pre-inspection for a home sale?",
        answer: "Yes. We do rapid HVAC evaluations for Dayton realtors and sellers.",
      },
      {
        question: "Do you service Wright-Patt on-base housing?",
        answer: "We service off-base residences in the surrounding Dayton area; on-base housing routes through the base contractor.",
      },
    ],
  },
  {
    slug: "springboro",
    city: "Springboro",
    state: "OH",
    metro: "Dayton Metro",
    blurb: "Springboro is halfway between our Monroe shop and Dayton — we're there quickly, and we know the newer subdivision layouts inside out.",
    driveTime: 15,
    zip: "45066",
    why: "Springboro is one of our top service areas by volume — we're there most days of the week.",
    climate: "Open subdivision layouts mean afternoon sun-load is real — south-facing rooms need extra return-air capacity.",
    housingStock: "Predominantly 1998–2015 builds with two-story great rooms — zoning and staged equipment pay off here.",
    aroundTown: "La Comedia Dinner Theatre, North Park, Springboro schools",
    neighborhoods: ["Settler's Walk", "Clearcreek Crossing", "Historic Downtown Springboro"],
    nearby: [
      { city: "Dayton", state: "OH", driveTime: 30 },
      { city: "Kettering", state: "OH", driveTime: 25 },
      { city: "Beavercreek", state: "OH", driveTime: 35 },
      { city: "Oakwood", state: "OH", driveTime: 28 },
      { city: "Centerville", state: "OH", driveTime: 22 },
      { city: "Miamisburg", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Can you fix hot second-floor bedrooms?",
        answer: "Yes — usually with a mix of return upsizing, damper adjustment, or a small zone add.",
      },
      {
        question: "Do you do new-construction HVAC?",
        answer: "We prefer replacement and retrofit work, not spec-home volume installs.",
      },
    ],
  },
  {
    slug: "kettering",
    city: "Kettering",
    state: "OH",
    metro: "Dayton Metro",
    blurb: "Kettering's mid-century ranches age gracefully — with the right HVAC upgrades. We modernize them without breaking the character.",
    driveTime: 25,
    zip: "45429",
    why: "Kettering has been part of our route since day one — many customers are second-generation clients.",
    climate: "Slightly higher terrain than downtown Dayton — cool nights make heat pumps very effective here.",
    housingStock: "1950s–60s brick ranches with slab ducts. We stay current on best practices for slab-duct sealing and rescue.",
    aroundTown: "Fraze Pavilion, Kettering Health Main Campus, Delco Park",
    neighborhoods: ["Southdale", "Oakwood line", "Van Buren Township edge"],
    nearby: [
      { city: "Dayton", state: "OH", driveTime: 30 },
      { city: "Springboro", state: "OH", driveTime: 15 },
      { city: "Beavercreek", state: "OH", driveTime: 35 },
      { city: "Oakwood", state: "OH", driveTime: 28 },
      { city: "Centerville", state: "OH", driveTime: 22 },
      { city: "Miamisburg", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "My slab ducts are leaking — replace or seal?",
        answer: "We evaluate each home — sometimes aeroseal-style sealing works, sometimes overhead re-ducting is smarter.",
      },
      {
        question: "Do you install heat pumps for Kettering homes?",
        answer: "Yes, they perform very well at this elevation and climate.",
      },
    ],
  },
  {
    slug: "beavercreek",
    city: "Beavercreek",
    state: "OH",
    metro: "Dayton Metro",
    blurb: "Beavercreek's WPAFB-adjacent neighborhoods often see quick turnover — we're used to fast, thorough pre-sale and post-purchase HVAC work.",
    driveTime: 35,
    zip: "45431",
    why: "Priority scheduling for military families on tight PCS timelines — we know the drill.",
    climate: "Suburban sprawl and mature tree cover mixed — heat load varies dramatically house-to-house.",
    housingStock: "1970s–2000s builds, with a large PCS-driven turnover market keeping systems on 8–12 year cycles.",
    aroundTown: "The Mall at Fairfield Commons, The Greene, Wright State University",
    neighborhoods: ["Knollwood", "The Greene area", "Bellbrook line"],
    nearby: [
      { city: "Dayton", state: "OH", driveTime: 30 },
      { city: "Springboro", state: "OH", driveTime: 15 },
      { city: "Kettering", state: "OH", driveTime: 25 },
      { city: "Oakwood", state: "OH", driveTime: 28 },
      { city: "Centerville", state: "OH", driveTime: 22 },
      { city: "Miamisburg", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Can you do a quick move-in HVAC evaluation?",
        answer: "Yes — same-day or next-day in most cases.",
      },
      {
        question: "Do you provide reports for VA loan requirements?",
        answer: "We provide written condition reports suitable for lender review.",
      },
    ],
  },
  {
    slug: "oakwood",
    city: "Oakwood",
    state: "OH",
    metro: "Dayton Metro",
    blurb: "Oakwood's historic Tudors and Arts-and-Crafts homes deserve HVAC that respects the craftsmanship. We do quiet, tidy installs — no shortcuts.",
    driveTime: 28,
    zip: "45419",
    why: "We've done work in some of Oakwood's most architecturally significant homes — with the discretion and cleanup those clients expect.",
    climate: "Mature tree canopy keeps homes cooler in summer but adds pollen and IAQ concerns spring/fall.",
    housingStock: "Century-old homes with radiators, chimneys, and no ductwork are the norm. High-velocity SpacePak and mini-split systems are frequent solutions.",
    aroundTown: "Smith Gardens, Wright Library, Houk Stream Park",
    neighborhoods: ["Ridgeway", "Shafor Park", "Far Hills corridor"],
    nearby: [
      { city: "Dayton", state: "OH", driveTime: 30 },
      { city: "Springboro", state: "OH", driveTime: 15 },
      { city: "Kettering", state: "OH", driveTime: 25 },
      { city: "Beavercreek", state: "OH", driveTime: 35 },
      { city: "Centerville", state: "OH", driveTime: 22 },
      { city: "Miamisburg", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "Can you add central AC to a home with radiators?",
        answer: "Yes — high-velocity mini-duct or ductless mini-splits both work well.",
      },
      {
        question: "Will you use drop cloths and shoe covers?",
        answer: "Always. Every job, every room.",
      },
    ],
  },
  {
    slug: "centerville",
    city: "Centerville",
    state: "OH",
    metro: "Dayton Metro",
    blurb: "Centerville homeowners get the full Service First experience — diagnostic-first repairs, tune-ups that actually improve efficiency, and IAQ that measurably works.",
    driveTime: 22,
    zip: "45459",
    why: "Our IAQ package — UV, MERV 13, humidification, ventilation — is popular in Centerville allergy-conscious households.",
    climate: "Slight ridge elevation gives Centerville some of the mildest overnight lows in the metro — good news for heat-pump economics.",
    housingStock: "Well-kept 1980s–2000s builds. Owners typically here for the long haul, willing to invest in staged/variable equipment.",
    aroundTown: "Yankee Trace Golf Club, Grant Park, Cornerstone of Centerville",
    neighborhoods: ["Yankee Trace", "Cross Pointe", "Historic Centerville"],
    nearby: [
      { city: "Dayton", state: "OH", driveTime: 30 },
      { city: "Springboro", state: "OH", driveTime: 15 },
      { city: "Kettering", state: "OH", driveTime: 25 },
      { city: "Beavercreek", state: "OH", driveTime: 35 },
      { city: "Oakwood", state: "OH", driveTime: 28 },
      { city: "Miamisburg", state: "OH", driveTime: 18 },
    ],
    faqs: [
      {
        question: "What's in your IAQ package?",
        answer: "REME HALO UV, MERV 13 media filter, whole-home humidifier, and optional ERV — priced à la carte.",
      },
      {
        question: "Do you service Trane and Carrier equipment?",
        answer: "Yes, and most other major brands.",
      },
    ],
  },
  {
    slug: "miamisburg",
    city: "Miamisburg",
    state: "OH",
    metro: "Dayton Metro",
    blurb: "Miamisburg is right on our way to Dayton — quick response, fair prices, and no attempt to sell you a system you don't need.",
    driveTime: 18,
    zip: "45342",
    why: "We do a lot of second-opinion work in Miamisburg. Often the first quote was for replacement when a repair was all that was needed.",
    climate: "River-corridor humidity — dehumidification and IAQ are recurring themes here, not just cooling.",
    housingStock: "Older downtown homes plus new Austin Landing developments — two very different service profiles.",
    aroundTown: "Miamisburg Mound, Riverfront Park, Austin Landing",
    neighborhoods: ["Historic Downtown Miamisburg", "Austin Landing", "Miami Township"],
    nearby: [
      { city: "Dayton", state: "OH", driveTime: 30 },
      { city: "Springboro", state: "OH", driveTime: 15 },
      { city: "Kettering", state: "OH", driveTime: 25 },
      { city: "Beavercreek", state: "OH", driveTime: 35 },
      { city: "Oakwood", state: "OH", driveTime: 28 },
      { city: "Centerville", state: "OH", driveTime: 22 },
    ],
    faqs: [
      {
        question: "How do I know if I need a new AC or just a repair?",
        answer: "Age + refrigerant type + cost-of-repair vs replacement. We'll show you the math on paper.",
      },
      {
        question: "Do you handle R-22 systems?",
        answer: "We can service them, but R-22 is expensive and phasing out — usually replacement is the better call.",
      },
    ],
  },
  {
    slug: "huber-heights",
    city: "Huber Heights",
    state: "OH",
    metro: "Dayton Metro",
    blurb: "Huber Heights — the largest community of brick homes in America, they say — has predictable ranch-style HVAC needs we can quote accurately over the phone.",
    driveTime: 40,
    zip: "45424",
    why: "We've worked on hundreds of Huber ranches — we can tell you what typically breaks and how much it costs to fix.",
    climate: "Flat, open exposure means strong wind infiltration and stronger duct-leakage penalties. Sealing pays off fast.",
    housingStock: "Iconic 1950s–60s Huber Home brick ranches with slab or crawlspace ducts. We know these houses cold.",
    aroundTown: "Rose Music Center, Wayne HS",
    neighborhoods: ["Original Huber ranches", "Carriage Trails", "Wayne Township edge"],
    nearby: [
      { city: "Dayton", state: "OH", driveTime: 30 },
      { city: "Springboro", state: "OH", driveTime: 15 },
      { city: "Kettering", state: "OH", driveTime: 25 },
      { city: "Beavercreek", state: "OH", driveTime: 35 },
      { city: "Oakwood", state: "OH", driveTime: 28 },
      { city: "Centerville", state: "OH", driveTime: 22 },
    ],
    faqs: [
      {
        question: "My Huber ranch has slab ducts — is that a problem?",
        answer: "Not automatically. We test airflow and seal or reroute as needed.",
      },
      {
        question: "Do you install two systems for larger Huber homes?",
        answer: "Rare — most are properly served by a single right-sized system.",
      },
    ],
  },
  {
    slug: "fairborn",
    city: "Fairborn",
    state: "OH",
    metro: "Dayton Metro",
    blurb: "Fairborn's proximity to Wright-Patt drives a lot of quick-turn HVAC work — we handle it with fast quotes and no runaround.",
    driveTime: 42,
    zip: "45324",
    why: "We've become a go-to for Fairborn landlords who need repairs done right the first time.",
    climate: "Similar profile to Dayton with slightly more open exposure — attention to duct sealing pays off.",
    housingStock: "Rentals and short-hold homes are common — landlords need documented, code-compliant work quickly.",
    aroundTown: "Wright State University, Wright-Patterson AFB (adjacent), National Museum of the USAF",
    neighborhoods: ["Central Fairborn", "WPAFB perimeter", "Bath Township"],
    nearby: [
      { city: "Dayton", state: "OH", driveTime: 30 },
      { city: "Springboro", state: "OH", driveTime: 15 },
      { city: "Kettering", state: "OH", driveTime: 25 },
      { city: "Beavercreek", state: "OH", driveTime: 35 },
      { city: "Oakwood", state: "OH", driveTime: 28 },
      { city: "Centerville", state: "OH", driveTime: 22 },
    ],
    faqs: [
      {
        question: "Do you invoice landlords directly?",
        answer: "Yes, with tenant sign-off on completion.",
      },
      {
        question: "Can you handle a same-day no-heat call?",
        answer: "Almost always, yes.",
      },
    ],
  },
  {
    slug: "florence-ky",
    city: "Florence",
    state: "KY",
    metro: "Northern Kentucky",
    blurb: "We cross the river for Northern Kentucky customers who want an Ohio-based family shop's pricing without the corporate franchise markup.",
    driveTime: 45,
    zip: "41042",
    why: "KY licensed and insured — you get the same tech and same pricing on either side of the river.",
    climate: "Similar climate to Cincinnati, slightly cooler overnight lows on the ridge.",
    housingStock: "Mostly 1980s–2010s subdivisions plus older stock in Old Florence.",
    aroundTown: "Florence Y'all water tower, Turfway Park, Florence Mall",
    neighborhoods: ["Old Florence", "Turfway", "Union line"],
    nearby: [

    ],
    faqs: [
      {
        question: "Are you licensed in Kentucky?",
        answer: "Yes, we hold current KY HVAC contractor credentials.",
      },
      {
        question: "Is there a trip charge for crossing the river?",
        answer: "No trip charge for repair calls booked during business hours.",
      },
    ],
  },
];

/** Display order for the grouped index page. */
export const metroOrder = ["Cincinnati Metro", "Dayton Metro", "Northern Kentucky"] as const;

/** Index page copy, carried over from the previous site. */
export const serviceAreasPage = {
  eyebrow: `${site.serviceRadiusMiles}-Mile Service Radius`,
  title: "HVAC Service Areas",
  description:
    "Family-owned heating and cooling service across the Cincinnati and Dayton metros.",
} as const;

/**
 * The "What We Offer in <city>" list. Every city page shows the same six items,
 * worded the way the previous site worded them, each linking into /services.
 */
export const cityOffers: readonly { label: string; href: string }[] = [
  { label: "AC Repair & Installation", href: "/services#air-conditioning" },
  { label: "Furnace Repair & Replacement", href: "/services#heating-systems" },
  { label: "Heat Pump Service", href: "/services#heating-systems" },
  { label: "Maintenance Plans", href: "/services#maintenance-plan" },
  { label: "Indoor Air Quality", href: "/services#indoor-air-quality" },
  { label: "Commercial HVAC", href: "/services#commercial-hvac" },
];

export function getServiceArea(slug: string): ServiceArea | undefined {
  return serviceAreas.find((area) => area.slug === slug);
}

export function serviceAreasByMetro(): { metro: string; areas: ServiceArea[] }[] {
  return metroOrder
    .map((metro) => ({
      metro,
      areas: serviceAreas.filter((area) => area.metro === metro),
    }))
    .filter((group) => group.areas.length > 0);
}
