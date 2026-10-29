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

/** Positions are relative to the hero (the doodle stage), framing the centered intro. */
export const doodles: DoodleConfig[] = [
  {
    id: "terminal",
    label: "terminal",
    Art: Terminal,
    tilt: -4,
    float: 7,
    desktop: { top: "8%", left: "1%", size: "13%" },
    mobile: { top: "1.25rem", left: "0%", size: "5.5rem" },
  },
  {
    id: "guitar",
    label: "guitar",
    Art: Guitar,
    tilt: 14,
    float: 8.5,
    desktop: { top: "3%", left: "86%", size: "10%" },
    mobile: { top: "0.5rem", left: "calc(100% - 5.5rem)", size: "4.75rem" },
  },
  {
    id: "computer",
    label: "laptop",
    Art: Computer,
    tilt: 3,
    float: 6.5,
    desktop: { top: "40%", left: "80%", size: "15%" },
    mobile: { top: "calc(100% - 7rem)", left: "calc(50% - 3.25rem)", size: "6.5rem" },
  },
  {
    id: "headphones",
    label: "headphones",
    Art: Headphones,
    tilt: -10,
    float: 9,
    desktop: { top: "44%", left: "8%", size: "9%" },
  },
  {
    id: "camera",
    label: "camera",
    Art: Camera,
    tilt: -7,
    float: 7.5,
    desktop: { top: "72%", left: "2%", size: "11%" },
    mobile: { top: "calc(100% - 5.5rem)", left: "0%", size: "5rem" },
  },
  {
    id: "coffee",
    label: "coffee",
    Art: Coffee,
    tilt: 6,
    float: 6,
    desktop: { top: "74%", left: "88%", size: "8%" },
    mobile: { top: "calc(100% - 5.5rem)", left: "calc(100% - 5.25rem)", size: "4.5rem" },
  },
  {
    id: "pencil",
    label: "pencil",
    Art: Pencil,
    tilt: 0,
    float: 10,
    desktop: { top: "24%", left: "14%", size: "6%" },
  },
];
