import type { TaskActivity, TaskField, TaskOrder } from "@prisma/client";
import type { TaskSummary } from "../types.generated";

export interface TaskMapper {
  activity?: Array<TaskActivity> | null;
  fields?: Array<TaskField> | null;
  id: string;
  milestoneId: string;
  order?: TaskOrder | null;
  summary?: TaskSummary | null;
  created_at?: Date;
  updated_at?: Date;
}
