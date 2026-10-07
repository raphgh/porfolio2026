import type { LabExperiment } from "./types";

/** Small experiments and prototypes, newest first. Low-pressure by design. */
export const lab: LabExperiment[] = [
  {
    id: "experiment-one",
    title: "Experiment One",
    date: "[Date]",
    technology: ["[Technology]"],
    result: "[Result]",
    description: "[One or two lines on what you tried.]",
    status: "ONGOING",
  },
  {
    id: "experiment-two",
    title: "Experiment Two",
    date: "[Date]",
    technology: ["[Technology]"],
    result: "[Result]",
    description: "[One or two lines on what you tried.]",
    status: "SHIPPED",
  },
  {
    id: "experiment-three",
    title: "Experiment Three",
    date: "[Date]",
    technology: ["[Technology]"],
    result: "[Result]",
    description: "[One or two lines on what you tried.]",
    status: "ABANDONED",
  },
];
