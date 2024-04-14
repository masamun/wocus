/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { Column } from './project/resolvers/Column';
import    { DateSummary } from './project/resolvers/DateSummary';
import    { DateSummaryResult } from './project/resolvers/DateSummaryResult';
import    { Decimal } from './project/resolvers/Decimal';
import    { Menu } from './menu/resolvers/Menu';
import    { Milestone } from './project/resolvers/Milestone';
import    { MilestoneField } from './project/resolvers/MilestoneField';
import    { MilestoneSummary } from './project/resolvers/MilestoneSummary';
import    { createMenu as Mutation_createMenu } from './menu/resolvers/Mutation/createMenu';
import    { createMilestone as Mutation_createMilestone } from './project/resolvers/Mutation/createMilestone';
import    { createProject as Mutation_createProject } from './project/resolvers/Mutation/createProject';
import    { createTask as Mutation_createTask } from './project/resolvers/Mutation/createTask';
import    { deleteMenu as Mutation_deleteMenu } from './menu/resolvers/Mutation/deleteMenu';
import    { deleteMilestone as Mutation_deleteMilestone } from './project/resolvers/Mutation/deleteMilestone';
import    { deleteTask as Mutation_deleteTask } from './project/resolvers/Mutation/deleteTask';
import    { renameMenu as Mutation_renameMenu } from './menu/resolvers/Mutation/renameMenu';
import    { renameMilestone as Mutation_renameMilestone } from './project/resolvers/Mutation/renameMilestone';
import    { updateMilestoneField as Mutation_updateMilestoneField } from './project/resolvers/Mutation/updateMilestoneField';
import    { updateMilestoneSummary as Mutation_updateMilestoneSummary } from './project/resolvers/Mutation/updateMilestoneSummary';
import    { updateTaskActivity as Mutation_updateTaskActivity } from './project/resolvers/Mutation/updateTaskActivity';
import    { updateTaskField as Mutation_updateTaskField } from './project/resolvers/Mutation/updateTaskField';
import    { updateTaskOrder as Mutation_updateTaskOrder } from './project/resolvers/Mutation/updateTaskOrder';
import    { Page } from './menu/resolvers/Page';
import    { Project } from './project/resolvers/Project';
import    { dateSummary as Query_dateSummary } from './project/resolvers/Query/dateSummary';
import    { menus as Query_menus } from './menu/resolvers/Query/menus';
import    { milestone as Query_milestone } from './project/resolvers/Query/milestone';
import    { milestones as Query_milestones } from './project/resolvers/Query/milestones';
import    { projects as Query_projects } from './project/resolvers/Query/projects';
import    { taskSummary as Query_taskSummary } from './project/resolvers/Query/taskSummary';
import    { tasks as Query_tasks } from './project/resolvers/Query/tasks';
import    { SummaryInfo } from './project/resolvers/SummaryInfo';
import    { Task } from './project/resolvers/Task';
import    { TaskActivity } from './project/resolvers/TaskActivity';
import    { TaskField } from './project/resolvers/TaskField';
import    { TaskMeta } from './project/resolvers/TaskMeta';
import    { TaskOrder } from './project/resolvers/TaskOrder';
import    { TaskSummary } from './project/resolvers/TaskSummary';
import    { User } from './project/resolvers/User';
import    { DateTimeResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { dateSummary: Query_dateSummary,menus: Query_menus,milestone: Query_milestone,milestones: Query_milestones,projects: Query_projects,taskSummary: Query_taskSummary,tasks: Query_tasks },
      Mutation: { createMenu: Mutation_createMenu,createMilestone: Mutation_createMilestone,createProject: Mutation_createProject,createTask: Mutation_createTask,deleteMenu: Mutation_deleteMenu,deleteMilestone: Mutation_deleteMilestone,deleteTask: Mutation_deleteTask,renameMenu: Mutation_renameMenu,renameMilestone: Mutation_renameMilestone,updateMilestoneField: Mutation_updateMilestoneField,updateMilestoneSummary: Mutation_updateMilestoneSummary,updateTaskActivity: Mutation_updateTaskActivity,updateTaskField: Mutation_updateTaskField,updateTaskOrder: Mutation_updateTaskOrder },
      
      Column: Column,
DateSummary: DateSummary,
DateSummaryResult: DateSummaryResult,
Decimal: Decimal,
Menu: Menu,
Milestone: Milestone,
MilestoneField: MilestoneField,
MilestoneSummary: MilestoneSummary,
Page: Page,
Project: Project,
SummaryInfo: SummaryInfo,
Task: Task,
TaskActivity: TaskActivity,
TaskField: TaskField,
TaskMeta: TaskMeta,
TaskOrder: TaskOrder,
TaskSummary: TaskSummary,
User: User,
DateTime: DateTimeResolver
    }