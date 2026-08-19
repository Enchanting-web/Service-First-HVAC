/** Customer reviews carried over from the previous site's reviews page. */
export type Review = {
  quote: string;
  author: string;
  when: string;
  source: "Google" | "Facebook";
};

export const reviews: Review[] = [
  {
    quote:
      "Best service I've ever had with any sort of repair or installation, hands down. Matt got to us very quickly and helped us work within our budget when we needed a whole new furnace at the start of the winter season. He got it up and running on a Friday night. We felt the heat come back on within minutes. What a relief. I can't recommend this company enough.",
    author: "John Andrew",
    when: "2 years ago",
    source: "Google",
  },
  {
    quote:
      "Matt was hands down, fantastic. He genuinely cares for his clients and their wellbeing. Not only did he work quickly to find our family a working furnace, he stayed extremely late to ensure my family was taken care of.",
    author: "Courtney Marquart",
    when: "1 month ago",
    source: "Google",
  },
  {
    quote: "Great experience overall. Scheduling was easy and the team was respectful of my home.",
    author: "Robert L.",
    when: "3 months ago",
    source: "Google",
  },
  {
    quote:
      "They came an hour and a half on a Saturday afternoon, worked four hrs. and repaired my heat. Great job would recommend them 100%.",
    author: "Marie Glenn Wonderleigh",
    when: "4 months ago",
    source: "Facebook",
  },
  {
    quote:
      "Very happy to have this family owned business help us with our air conditioning! Our ac went out last week during one of the hottest weeks of the year! They temporarily helped us while we figured out what was needed to be done. Then fully replaced our system a few days later. Very knowledgeable, friendly, and timely. From first call (JJ) to installation (Bryan, Matt, JT), they were very professional. Highly recommend.",
    author: "Britany Dumford Price",
    when: "5 months ago",
    source: "Facebook",
  },
  {
    quote:
      "90 degrees and the day after the holiday, they took my emergency call and worked me into their schedule SAME DAY! They arrived early and the AC was repaired before they left. As a landlord this is huge because I don't have a hot irritated tenant calling my phone over and over. I will use and refer them to all my associates.",
    author: "Kim Chase Mattocks",
    when: "6 months ago",
    source: "Google",
  },
];

/** Shown on the homepage about row and in the reviews hero. */
export const featuredReview = {
  quote: "He genuinely cares for his clients and their wellbeing.",
  author: "Courtney Marquart",
} as const;

/**
 * The previous site's Google review history was lost in a Google-side issue and
 * could not be recovered, so the reviews page asks past customers for a fresh one.
 */
export const reviewNotice = {
  heading: "A quick favor — our Google reviews were lost",
  body: "Due to a Google issue, our review history was wiped and can't be recovered. If we've serviced your home in the past, a fresh Google review would mean the world to us. New customers — your feedback helps neighbors find us, and we appreciate every word.",
  cta: "Leave a Google review",
} as const;
