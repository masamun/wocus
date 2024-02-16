/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment MilestoneFragment on Milestone {\n    id\n    name\n    fields {\n      id\n      group\n      type\n      order\n      visible\n      editable\n      deletable\n      title\n      width\n    }\n    summaries {\n      id\n      type\n      order\n      visible\n      title\n    }\n  }\n": types.MilestoneFragmentFragmentDoc,
    "\n  fragment TaskFragment on Task {\n    id\n    fields {\n      id\n      type\n      value\n    }\n    order {\n      id\n      order\n    }\n  }\n": types.TaskFragmentFragmentDoc,
    "\n  fragment TaskActivityFragment on TaskActivity {\n    taskId\n    date_at\n    pv\n    ac\n    ev\n    created_at\n    updated_at\n  }\n": types.TaskActivityFragmentFragmentDoc,
    "\n  query getProjects {\n    projects {\n      id\n      name\n    }\n  }\n": types.GetProjectsDocument,
    "\n  mutation createProject($param: CreateProject!) {\n    createProject(param: $param) {\n      id\n      name\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation createMilestone($param: CreateMilestone!) {\n    createMilestone(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n": types.CreateMilestoneDocument,
    "\n  mutation renameMilestone($param: RenameMilestone!) {\n    renameMilestone(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n": types.RenameMilestoneDocument,
    "\n  mutation deleteMilestone($param: DeleteMilestone!) {\n    deleteMilestone(param: $param)\n  }\n": types.DeleteMilestoneDocument,
    "\n  query getMilestone($param: QueryMilestone!) {\n    milestone(param: $param) {\n      id\n    }\n  }\n": types.GetMilestoneDocument,
    "\n  mutation createTask($param: CreateTask!) {\n    createTask(param: $param) {\n      ...TaskFragment\n    }\n  }\n": types.CreateTaskDocument,
    "\n  mutation deleteTask($param: DeleteTask!) {\n    deleteTask(param: $param)\n  }\n": types.DeleteTaskDocument,
    "\n  query getMilestones($param: QueryMilestones!) {\n    milestones(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n": types.GetMilestonesDocument,
    "\n  query getTasks($param: QueryTasks!) {\n    tasks(param: $param) {\n      id\n      fields {\n        id\n        type\n        value\n      }\n      order {\n        id\n        order\n      }\n    }\n  }\n": types.GetTasksDocument,
    "\n  query getTaskWithActivity($param: QueryTasks!) {\n    taskWithActivities(param: $param) {\n      id\n      activity {\n        taskId\n        date_at\n        pv\n        ac\n        ev\n        created_at\n        updated_at\n      }\n      fields {\n        id\n        type\n        value\n      }\n      order {\n        id\n        order\n      }\n    }\n  }\n": types.GetTaskWithActivityDocument,
    "\n  query getTaskActivity($param: QueryTaskActivitiy!) {\n    taskActivities(param: $param) {\n      taskId\n      date_at\n      pv\n      ac\n      ev\n      etc\n      created_at\n      updated_at\n    }\n  }\n": types.GetTaskActivityDocument,
    "\n  query getDateSummery($param: QueryDateSummary!) {\n    dateSummary(param: $param) {\n      info {\n        totalPv\n        beforePeriodPv\n        beforePeriodAc\n        beforePeriodEv\n      }\n      dates {\n        date\n        prv\n        erv\n        pv\n        ev\n        sv\n        ac\n        cv\n        spi\n        cpi\n        dpv\n        dev\n        dac\n        dsv\n        dcv\n      }\n    }\n  }\n": types.GetDateSummeryDocument,
    "\n  mutation updateActivity($param: [UpdateTaskActivity!]!) {\n    updateTaskActivity(param: $param) {\n      taskId\n      date_at\n      pv\n      ac\n      ev\n      etc\n      created_at\n      updated_at\n    }\n  }\n": types.UpdateActivityDocument,
    "\n  mutation updateTaskField($param: [UpdateTaskField!]!) {\n    updateTaskField(param: $param) {\n      id\n      milestoneId\n      created_at\n      updated_at\n      fields {\n        id\n        type\n        value\n      }\n    }\n  }\n": types.UpdateTaskFieldDocument,
    "\n  mutation updateTaskOrder($param: UpdateTaskOrder!) {\n    updateTaskOrder(param: $param) {\n      id\n      milestoneId\n      order {\n        id\n        order\n      }\n    }\n  }\n": types.UpdateTaskOrderDocument,
    "\n  mutation updateMilestoneField($param: UpdateMilestoneField!) {\n    updateMilestoneField(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n": types.UpdateMilestoneFieldDocument,
    "\n  mutation updateMilestoneSummary($param: UpdateMilestoneSummary!) {\n    updateMilestoneSummary(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n": types.UpdateMilestoneSummaryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MilestoneFragment on Milestone {\n    id\n    name\n    fields {\n      id\n      group\n      type\n      order\n      visible\n      editable\n      deletable\n      title\n      width\n    }\n    summaries {\n      id\n      type\n      order\n      visible\n      title\n    }\n  }\n"): (typeof documents)["\n  fragment MilestoneFragment on Milestone {\n    id\n    name\n    fields {\n      id\n      group\n      type\n      order\n      visible\n      editable\n      deletable\n      title\n      width\n    }\n    summaries {\n      id\n      type\n      order\n      visible\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskFragment on Task {\n    id\n    fields {\n      id\n      type\n      value\n    }\n    order {\n      id\n      order\n    }\n  }\n"): (typeof documents)["\n  fragment TaskFragment on Task {\n    id\n    fields {\n      id\n      type\n      value\n    }\n    order {\n      id\n      order\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskActivityFragment on TaskActivity {\n    taskId\n    date_at\n    pv\n    ac\n    ev\n    created_at\n    updated_at\n  }\n"): (typeof documents)["\n  fragment TaskActivityFragment on TaskActivity {\n    taskId\n    date_at\n    pv\n    ac\n    ev\n    created_at\n    updated_at\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getProjects {\n    projects {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query getProjects {\n    projects {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createProject($param: CreateProject!) {\n    createProject(param: $param) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation createProject($param: CreateProject!) {\n    createProject(param: $param) {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createMilestone($param: CreateMilestone!) {\n    createMilestone(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"): (typeof documents)["\n  mutation createMilestone($param: CreateMilestone!) {\n    createMilestone(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation renameMilestone($param: RenameMilestone!) {\n    renameMilestone(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"): (typeof documents)["\n  mutation renameMilestone($param: RenameMilestone!) {\n    renameMilestone(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteMilestone($param: DeleteMilestone!) {\n    deleteMilestone(param: $param)\n  }\n"): (typeof documents)["\n  mutation deleteMilestone($param: DeleteMilestone!) {\n    deleteMilestone(param: $param)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMilestone($param: QueryMilestone!) {\n    milestone(param: $param) {\n      id\n    }\n  }\n"): (typeof documents)["\n  query getMilestone($param: QueryMilestone!) {\n    milestone(param: $param) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTask($param: CreateTask!) {\n    createTask(param: $param) {\n      ...TaskFragment\n    }\n  }\n"): (typeof documents)["\n  mutation createTask($param: CreateTask!) {\n    createTask(param: $param) {\n      ...TaskFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTask($param: DeleteTask!) {\n    deleteTask(param: $param)\n  }\n"): (typeof documents)["\n  mutation deleteTask($param: DeleteTask!) {\n    deleteTask(param: $param)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMilestones($param: QueryMilestones!) {\n    milestones(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"): (typeof documents)["\n  query getMilestones($param: QueryMilestones!) {\n    milestones(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTasks($param: QueryTasks!) {\n    tasks(param: $param) {\n      id\n      fields {\n        id\n        type\n        value\n      }\n      order {\n        id\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  query getTasks($param: QueryTasks!) {\n    tasks(param: $param) {\n      id\n      fields {\n        id\n        type\n        value\n      }\n      order {\n        id\n        order\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTaskWithActivity($param: QueryTasks!) {\n    taskWithActivities(param: $param) {\n      id\n      activity {\n        taskId\n        date_at\n        pv\n        ac\n        ev\n        created_at\n        updated_at\n      }\n      fields {\n        id\n        type\n        value\n      }\n      order {\n        id\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  query getTaskWithActivity($param: QueryTasks!) {\n    taskWithActivities(param: $param) {\n      id\n      activity {\n        taskId\n        date_at\n        pv\n        ac\n        ev\n        created_at\n        updated_at\n      }\n      fields {\n        id\n        type\n        value\n      }\n      order {\n        id\n        order\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTaskActivity($param: QueryTaskActivitiy!) {\n    taskActivities(param: $param) {\n      taskId\n      date_at\n      pv\n      ac\n      ev\n      etc\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  query getTaskActivity($param: QueryTaskActivitiy!) {\n    taskActivities(param: $param) {\n      taskId\n      date_at\n      pv\n      ac\n      ev\n      etc\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getDateSummery($param: QueryDateSummary!) {\n    dateSummary(param: $param) {\n      info {\n        totalPv\n        beforePeriodPv\n        beforePeriodAc\n        beforePeriodEv\n      }\n      dates {\n        date\n        prv\n        erv\n        pv\n        ev\n        sv\n        ac\n        cv\n        spi\n        cpi\n        dpv\n        dev\n        dac\n        dsv\n        dcv\n      }\n    }\n  }\n"): (typeof documents)["\n  query getDateSummery($param: QueryDateSummary!) {\n    dateSummary(param: $param) {\n      info {\n        totalPv\n        beforePeriodPv\n        beforePeriodAc\n        beforePeriodEv\n      }\n      dates {\n        date\n        prv\n        erv\n        pv\n        ev\n        sv\n        ac\n        cv\n        spi\n        cpi\n        dpv\n        dev\n        dac\n        dsv\n        dcv\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateActivity($param: [UpdateTaskActivity!]!) {\n    updateTaskActivity(param: $param) {\n      taskId\n      date_at\n      pv\n      ac\n      ev\n      etc\n      created_at\n      updated_at\n    }\n  }\n"): (typeof documents)["\n  mutation updateActivity($param: [UpdateTaskActivity!]!) {\n    updateTaskActivity(param: $param) {\n      taskId\n      date_at\n      pv\n      ac\n      ev\n      etc\n      created_at\n      updated_at\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTaskField($param: [UpdateTaskField!]!) {\n    updateTaskField(param: $param) {\n      id\n      milestoneId\n      created_at\n      updated_at\n      fields {\n        id\n        type\n        value\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateTaskField($param: [UpdateTaskField!]!) {\n    updateTaskField(param: $param) {\n      id\n      milestoneId\n      created_at\n      updated_at\n      fields {\n        id\n        type\n        value\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTaskOrder($param: UpdateTaskOrder!) {\n    updateTaskOrder(param: $param) {\n      id\n      milestoneId\n      order {\n        id\n        order\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateTaskOrder($param: UpdateTaskOrder!) {\n    updateTaskOrder(param: $param) {\n      id\n      milestoneId\n      order {\n        id\n        order\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMilestoneField($param: UpdateMilestoneField!) {\n    updateMilestoneField(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"): (typeof documents)["\n  mutation updateMilestoneField($param: UpdateMilestoneField!) {\n    updateMilestoneField(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMilestoneSummary($param: UpdateMilestoneSummary!) {\n    updateMilestoneSummary(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"): (typeof documents)["\n  mutation updateMilestoneSummary($param: UpdateMilestoneSummary!) {\n    updateMilestoneSummary(param: $param) {\n      ...MilestoneFragment\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;