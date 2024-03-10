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
    "fragment MilestoneFragment on Milestone {\n  id\n  name\n  fields {\n    id\n    group\n    type\n    order\n    visible\n    editable\n    deletable\n    title\n    width\n  }\n  summaries {\n    id\n    type\n    order\n    visible\n    title\n  }\n}\n\nfragment TaskFragment on Task {\n  id\n  fields {\n    id\n    type\n    value\n  }\n  order {\n    id\n    order\n  }\n}\n\nfragment TaskActivityFragment on TaskActivity {\n  taskId\n  date_at\n  pv\n  ac\n  ev\n}": types.MilestoneFragmentFragmentDoc,
    "query getProjects {\n  projects {\n    id\n    name\n  }\n}\n\nmutation createProject($param: CreateProject!) {\n  createProject(param: $param) {\n    id\n    name\n  }\n}\n\nmutation createMilestone($param: CreateMilestone!) {\n  createMilestone(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nmutation renameMilestone($param: RenameMilestone!) {\n  renameMilestone(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nmutation deleteMilestone($param: DeleteMilestone!) {\n  deleteMilestone(param: $param)\n}\n\nquery getMilestone($param: QueryMilestone!) {\n  milestone(param: $param) {\n    id\n  }\n}\n\nmutation createTask($param: CreateTask!) {\n  createTask(param: $param) {\n    ...TaskFragment\n  }\n}\n\nmutation deleteTask($param: DeleteTask!) {\n  deleteTask(param: $param)\n}\n\nquery getMilestones($param: QueryMilestones!) {\n  milestones(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nquery getTasks($param: QueryTasks!, $range: DateRange!) {\n  tasks(param: $param) {\n    id\n    activity(range: $range) {\n      taskId\n      date_at\n      pv\n      ac\n      ev\n      created_at\n      updated_at\n    }\n    fields {\n      id\n      type\n      value\n    }\n    order {\n      id\n      order\n    }\n    summary {\n      taskId\n      date_lt\n      plan_start_date\n      plan_end_date\n      actual_start_date\n      actual_end_date\n      pv\n      ac\n      ev\n      sv\n      spi\n      cpi\n    }\n  }\n}\n\nquery getDateSummery($param: QueryDateSummary!) {\n  dateSummary(param: $param) {\n    info {\n      totalPv\n      beforePeriodPv\n      beforePeriodAc\n      beforePeriodEv\n    }\n    dates {\n      date\n      prv\n      erv\n      pv\n      ev\n      sv\n      ac\n      cv\n      spi\n      cpi\n      dpv\n      dev\n      dac\n      dsv\n      dcv\n    }\n  }\n}\n\nmutation updateActivity($param: [UpdateTaskActivity!]!) {\n  updateTaskActivity(param: $param) {\n    taskId\n    date_at\n    pv\n    ac\n    ev\n    etc\n    created_at\n    updated_at\n  }\n}\n\nmutation updateTaskField($param: [UpdateTaskField!]!) {\n  updateTaskField(param: $param) {\n    id\n    milestoneId\n    created_at\n    updated_at\n    fields {\n      id\n      type\n      value\n    }\n  }\n}\n\nmutation updateTaskOrder($param: UpdateTaskOrder!) {\n  updateTaskOrder(param: $param) {\n    id\n    milestoneId\n    order {\n      id\n      order\n    }\n  }\n}\n\nmutation updateMilestoneField($param: UpdateMilestoneField!) {\n  updateMilestoneField(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nmutation updateMilestoneSummary($param: UpdateMilestoneSummary!) {\n  updateMilestoneSummary(param: $param) {\n    ...MilestoneFragment\n  }\n}": types.GetProjectsDocument,
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
export function graphql(source: "fragment MilestoneFragment on Milestone {\n  id\n  name\n  fields {\n    id\n    group\n    type\n    order\n    visible\n    editable\n    deletable\n    title\n    width\n  }\n  summaries {\n    id\n    type\n    order\n    visible\n    title\n  }\n}\n\nfragment TaskFragment on Task {\n  id\n  fields {\n    id\n    type\n    value\n  }\n  order {\n    id\n    order\n  }\n}\n\nfragment TaskActivityFragment on TaskActivity {\n  taskId\n  date_at\n  pv\n  ac\n  ev\n}"): (typeof documents)["fragment MilestoneFragment on Milestone {\n  id\n  name\n  fields {\n    id\n    group\n    type\n    order\n    visible\n    editable\n    deletable\n    title\n    width\n  }\n  summaries {\n    id\n    type\n    order\n    visible\n    title\n  }\n}\n\nfragment TaskFragment on Task {\n  id\n  fields {\n    id\n    type\n    value\n  }\n  order {\n    id\n    order\n  }\n}\n\nfragment TaskActivityFragment on TaskActivity {\n  taskId\n  date_at\n  pv\n  ac\n  ev\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query getProjects {\n  projects {\n    id\n    name\n  }\n}\n\nmutation createProject($param: CreateProject!) {\n  createProject(param: $param) {\n    id\n    name\n  }\n}\n\nmutation createMilestone($param: CreateMilestone!) {\n  createMilestone(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nmutation renameMilestone($param: RenameMilestone!) {\n  renameMilestone(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nmutation deleteMilestone($param: DeleteMilestone!) {\n  deleteMilestone(param: $param)\n}\n\nquery getMilestone($param: QueryMilestone!) {\n  milestone(param: $param) {\n    id\n  }\n}\n\nmutation createTask($param: CreateTask!) {\n  createTask(param: $param) {\n    ...TaskFragment\n  }\n}\n\nmutation deleteTask($param: DeleteTask!) {\n  deleteTask(param: $param)\n}\n\nquery getMilestones($param: QueryMilestones!) {\n  milestones(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nquery getTasks($param: QueryTasks!, $range: DateRange!) {\n  tasks(param: $param) {\n    id\n    activity(range: $range) {\n      taskId\n      date_at\n      pv\n      ac\n      ev\n      created_at\n      updated_at\n    }\n    fields {\n      id\n      type\n      value\n    }\n    order {\n      id\n      order\n    }\n    summary {\n      taskId\n      date_lt\n      plan_start_date\n      plan_end_date\n      actual_start_date\n      actual_end_date\n      pv\n      ac\n      ev\n      sv\n      spi\n      cpi\n    }\n  }\n}\n\nquery getDateSummery($param: QueryDateSummary!) {\n  dateSummary(param: $param) {\n    info {\n      totalPv\n      beforePeriodPv\n      beforePeriodAc\n      beforePeriodEv\n    }\n    dates {\n      date\n      prv\n      erv\n      pv\n      ev\n      sv\n      ac\n      cv\n      spi\n      cpi\n      dpv\n      dev\n      dac\n      dsv\n      dcv\n    }\n  }\n}\n\nmutation updateActivity($param: [UpdateTaskActivity!]!) {\n  updateTaskActivity(param: $param) {\n    taskId\n    date_at\n    pv\n    ac\n    ev\n    etc\n    created_at\n    updated_at\n  }\n}\n\nmutation updateTaskField($param: [UpdateTaskField!]!) {\n  updateTaskField(param: $param) {\n    id\n    milestoneId\n    created_at\n    updated_at\n    fields {\n      id\n      type\n      value\n    }\n  }\n}\n\nmutation updateTaskOrder($param: UpdateTaskOrder!) {\n  updateTaskOrder(param: $param) {\n    id\n    milestoneId\n    order {\n      id\n      order\n    }\n  }\n}\n\nmutation updateMilestoneField($param: UpdateMilestoneField!) {\n  updateMilestoneField(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nmutation updateMilestoneSummary($param: UpdateMilestoneSummary!) {\n  updateMilestoneSummary(param: $param) {\n    ...MilestoneFragment\n  }\n}"): (typeof documents)["query getProjects {\n  projects {\n    id\n    name\n  }\n}\n\nmutation createProject($param: CreateProject!) {\n  createProject(param: $param) {\n    id\n    name\n  }\n}\n\nmutation createMilestone($param: CreateMilestone!) {\n  createMilestone(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nmutation renameMilestone($param: RenameMilestone!) {\n  renameMilestone(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nmutation deleteMilestone($param: DeleteMilestone!) {\n  deleteMilestone(param: $param)\n}\n\nquery getMilestone($param: QueryMilestone!) {\n  milestone(param: $param) {\n    id\n  }\n}\n\nmutation createTask($param: CreateTask!) {\n  createTask(param: $param) {\n    ...TaskFragment\n  }\n}\n\nmutation deleteTask($param: DeleteTask!) {\n  deleteTask(param: $param)\n}\n\nquery getMilestones($param: QueryMilestones!) {\n  milestones(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nquery getTasks($param: QueryTasks!, $range: DateRange!) {\n  tasks(param: $param) {\n    id\n    activity(range: $range) {\n      taskId\n      date_at\n      pv\n      ac\n      ev\n      created_at\n      updated_at\n    }\n    fields {\n      id\n      type\n      value\n    }\n    order {\n      id\n      order\n    }\n    summary {\n      taskId\n      date_lt\n      plan_start_date\n      plan_end_date\n      actual_start_date\n      actual_end_date\n      pv\n      ac\n      ev\n      sv\n      spi\n      cpi\n    }\n  }\n}\n\nquery getDateSummery($param: QueryDateSummary!) {\n  dateSummary(param: $param) {\n    info {\n      totalPv\n      beforePeriodPv\n      beforePeriodAc\n      beforePeriodEv\n    }\n    dates {\n      date\n      prv\n      erv\n      pv\n      ev\n      sv\n      ac\n      cv\n      spi\n      cpi\n      dpv\n      dev\n      dac\n      dsv\n      dcv\n    }\n  }\n}\n\nmutation updateActivity($param: [UpdateTaskActivity!]!) {\n  updateTaskActivity(param: $param) {\n    taskId\n    date_at\n    pv\n    ac\n    ev\n    etc\n    created_at\n    updated_at\n  }\n}\n\nmutation updateTaskField($param: [UpdateTaskField!]!) {\n  updateTaskField(param: $param) {\n    id\n    milestoneId\n    created_at\n    updated_at\n    fields {\n      id\n      type\n      value\n    }\n  }\n}\n\nmutation updateTaskOrder($param: UpdateTaskOrder!) {\n  updateTaskOrder(param: $param) {\n    id\n    milestoneId\n    order {\n      id\n      order\n    }\n  }\n}\n\nmutation updateMilestoneField($param: UpdateMilestoneField!) {\n  updateMilestoneField(param: $param) {\n    ...MilestoneFragment\n  }\n}\n\nmutation updateMilestoneSummary($param: UpdateMilestoneSummary!) {\n  updateMilestoneSummary(param: $param) {\n    ...MilestoneFragment\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;