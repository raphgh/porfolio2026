export const process = {
  flow: ["Problem", "System", "Interface", "Implementation", "Product"],
  steps: [
    {
      name: "Understand",
      body: "The problem, the constraints, the people using it, and what the system actually needs to do.",
      outputs: ["Constraints", "Requirements", "Users", "Scope"],
    },
    {
      name: "Design",
      body: "Architecture, data, interaction and information structure — the decisions that are expensive to change later.",
      outputs: ["Architecture", "Data model", "Interaction", "Product calls"],
    },
    {
      name: "Build",
      body: "The real thing: frontend, backend, APIs, infrastructure. Whatever layer the problem lives in.",
      outputs: ["Frontend", "Backend", "APIs", "Infrastructure"],
    },
    {
      name: "Ship",
      body: "Test it, deploy it, watch how it’s used, and keep improving it.",
      outputs: ["Testing", "Deployment", "Feedback", "Iteration"],
    },
  ],
} as const;
