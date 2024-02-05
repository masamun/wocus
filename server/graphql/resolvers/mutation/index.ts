import type { Resolvers } from "../../resolvers-types";
import { createMilestone } from "./createMilestone";
import { createProject } from "./createProject";
import { createTask } from "./createTask";
import { deleteTask } from "./deleteTask";
import { updateMilestoneField } from "./updateMilestoneField";
import { updateMilestoneSummary } from "./updateMilestoneSummary";
import { updateTaskActivity } from "./updateTaskActivities";
import { updateTaskField } from "./updateTaskField";
import { updateTaskOrder } from "./updateTaskOrder";
import { renameMilestone } from "./renameMilestone";
import { deleteMilestone } from "./deleteMilestone";

export const Mutation: Resolvers["Mutation"] = {
  createProject,
  createMilestone,
  createTask,
  deleteTask,
  updateTaskActivity,
  updateTaskField,
  updateTaskOrder,
  updateMilestoneField,
  updateMilestoneSummary,
  renameMilestone,
  deleteMilestone,
};
