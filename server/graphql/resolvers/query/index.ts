import type { Resolvers } from "../../resolvers-types";
import { milestones } from "./milestones";
import { projects } from "./projects";
import { tasks } from "./tasks";
import { taskActivities } from "./taskActivities";
import { taskSummary } from "./taskSummary";
import { dateSummary } from "./dateSummary";
import { milestone } from "./milestone";
import { taskWithActivities } from "./taskWithActivities";

export const Query: Resolvers["Query"] = {
  projects,
  milestones,
  milestone,
  tasks,
  taskWithActivities,
  taskActivities,
  taskSummary,
  dateSummary,
};
