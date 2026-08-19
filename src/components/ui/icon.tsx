import {
  ArrowRight,
  Building2,
  Calendar,
  CalendarCheck,
  Check,
  ChevronDown,
  CircleCheck,
  ClipboardCheck,
  Clock,
  ClockAlert,
  Flame,
  Gauge,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  PiggyBank,
  Quote,
  Send,
  Shield,
  ShieldCheck,
  Siren,
  Snowflake,
  Sparkles,
  Star,
  Thermometer,
  Timer,
  TriangleAlert,
  Users,
  Wind,
  Wrench,
  X,
  type LucideProps,
} from "lucide-react";

/**
 * Icon registry. Content modules refer to icons by name so they stay free of
 * JSX, and every name is checked at compile time.
 */
const ICONS = {
  "arrow-right": ArrowRight,
  building: Building2,
  calendar: Calendar,
  "calendar-check": CalendarCheck,
  check: Check,
  "chevron-down": ChevronDown,
  "circle-check": CircleCheck,
  "clipboard-check": ClipboardCheck,
  clock: Clock,
  "clock-alert": ClockAlert,
  flame: Flame,
  gauge: Gauge,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  "message-circle": MessageCircle,
  phone: Phone,
  "piggy-bank": PiggyBank,
  quote: Quote,
  send: Send,
  shield: Shield,
  "shield-check": ShieldCheck,
  siren: Siren,
  snowflake: Snowflake,
  sparkles: Sparkles,
  star: Star,
  thermometer: Thermometer,
  timer: Timer,
  "triangle-alert": TriangleAlert,
  users: Users,
  wind: Wind,
  wrench: Wrench,
  x: X,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = ICONS[name];
  return <Component aria-hidden {...props} />;
}
