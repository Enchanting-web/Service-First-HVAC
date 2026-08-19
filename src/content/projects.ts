/** Recent jobs shown on the Our Work page, with the real job-site photography. */
export type ProjectCategory = "Commercial" | "Residential" | "Maintenance" | "Service";

export type Project = {
  title: string;
  category: ProjectCategory;
  image: string;
};

export const projectCategories = [
  "All",
  "Commercial",
  "Residential",
  "Maintenance",
  "Service",
] as const;

export const projects: Project[] = [
  {
    title: "Commercial HVAC Installation",
    category: "Commercial",
    image: "/work/commercial-hvac-installation.jpg",
  },
  {
    title: "Residential Furnace Upgrade",
    category: "Residential",
    image: "/work/residential-furnace-upgrade.jpg",
  },
  {
    title: "Residential AC Unit",
    category: "Maintenance",
    image: "/work/residential-ac-unit.jpg",
  },
  {
    title: "Lennox Control Panel",
    category: "Commercial",
    image: "/work/lennox-control-panel.jpg",
  },
  {
    title: "AC System Install",
    category: "Residential",
    image: "/work/ac-system-install.jpg",
  },
  {
    title: "Emergency Repair",
    category: "Service",
    image: "/work/emergency-repair.jpg",
  },
];

/** Every photo in the media library, project cards included. */
const allPhotos: { src: string; alt: string }[] = [
  { src: "/work/commercial-hvac-installation.jpg", alt: "Commercial rooftop HVAC installation" },
  { src: "/work/residential-furnace-upgrade.jpg", alt: "New residential furnace after upgrade" },
  { src: "/work/residential-ac-unit.jpg", alt: "Serviced residential air conditioning unit" },
  { src: "/work/lennox-control-panel.jpg", alt: "Lennox commercial control panel wiring" },
  { src: "/work/ac-system-install.jpg", alt: "Air conditioning system install in progress" },
  { src: "/work/emergency-repair.jpg", alt: "Technician completing an emergency HVAC repair" },
  { src: "/work/york-ac-unit-wall-mount.jpg", alt: "Wall-mounted York air conditioning unit" },
  { src: "/work/ac-cleaning-before-after.jpg", alt: "Air conditioner coil cleaning before and after" },
  { src: "/team/crew.jpg", alt: "The Service First crew in front of the service van" },
];

/**
 * The "A Closer Look" strip, derived so it can never repeat a photo the project
 * cards already show above it. Adding a project drops its photo from here.
 */
export const galleryImages = allPhotos.filter(
  (photo) => !projects.some((project) => project.image === photo.src),
);
