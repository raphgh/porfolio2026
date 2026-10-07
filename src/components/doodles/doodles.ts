import { Camera, Coffee, Computer, Guitar, Headphones, Pencil, Terminal } from "./art";

type Placement = { top: string; left: string; size: string };

export type DoodleConfig = {
  id: string;
  label: string;
  Art: (props: { className?: string }) => React.ReactNode;
  /** Resting rotation in degrees. */
  tilt: number;
  /** Seconds for one float cycle — varied so objects never move in sync. */
  float: number;
  desktop: Placement;
  /** Omit to hide the doodle on small screens. */
  mobile?: Placement;
};

/** Positions are relative to the doodle stage, not the page. */
export const doodles: DoodleConfig[] = [
  {
    id: "terminal",
    label: "terminal",
    Art: Terminal,
    tilt: -4,
    float: 7,
    desktop: { top: "4%", left: "0%", size: "44%" },
    mobile: { top: "8%", left: "2%", size: "6.25rem" },
  },
  {
    id: "guitar",
    label: "guitar",
    Art: Guitar,
    tilt: 14,
    float: 8.5,
    desktop: { top: "0%", left: "58%", size: "42%" },
    mobile: { top: "2%", left: "64%", size: "7rem" },
  },
  {
    id: "computer",
    label: "laptop",
    Art: Computer,
    tilt: 3,
    float: 6.5,
    desktop: { top: "30%", left: "16%", size: "54%" },
    mobile: { top: "36%", left: "28%", size: "7.25rem" },
  },
  {
    id: "headphones",
    label: "headphones",
    Art: Headphones,
    tilt: -10,
    float: 9,
    desktop: { top: "40%", left: "66%", size: "34%" },
  },
  {
    id: "camera",
    label: "camera",
    Art: Camera,
    tilt: -7,
    float: 7.5,
    desktop: { top: "60%", left: "0%", size: "38%" },
    mobile: { top: "52%", left: "2%", size: "5.75rem" },
  },
  {
    id: "coffee",
    label: "coffee",
    Art: Coffee,
    tilt: 6,
    float: 6,
    desktop: { top: "64%", left: "62%", size: "32%" },
    mobile: { top: "56%", left: "72%", size: "5.5rem" },
  },
  {
    id: "pencil",
    label: "pencil",
    Art: Pencil,
    tilt: 0,
    float: 10,
    desktop: { top: "18%", left: "40%", size: "26%" },
  },
];
