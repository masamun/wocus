/* eslint-disable */
import { Decimal } from "@prisma/client/runtime/library";
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type DateString = string & { __dateStringBrand: any };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  Decimal: { input: string; output: string; }
  Void: { input: any; output: any; }
};

export type Column = {
  id: Scalars['ID']['output'];
};

export type CreateMilestone = {
  name: Scalars['String']['input'];
  project: Scalars['String']['input'];
};

export type CreateProject = {
  name: Scalars['String']['input'];
};

export type CreateTask = {
  milestoneId: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Float']['input']>;
};

export type DateSummary = {
  ac: Scalars['Decimal']['output'];
  cpi: Scalars['Decimal']['output'];
  cv: Scalars['Decimal']['output'];
  dac: Scalars['Decimal']['output'];
  date: Scalars['DateTime']['output'];
  dcv: Scalars['Decimal']['output'];
  dev: Scalars['Decimal']['output'];
  dpv: Scalars['Decimal']['output'];
  dsv: Scalars['Decimal']['output'];
  erv: Scalars['Decimal']['output'];
  ev: Scalars['Decimal']['output'];
  prv: Scalars['Decimal']['output'];
  pv: Scalars['Decimal']['output'];
  spi: Scalars['Decimal']['output'];
  sv: Scalars['Decimal']['output'];
};

export type DeleteMilestone = {
  milestoneId: Scalars['String']['input'];
};

export type DeleteTask = {
  taskId: Scalars['String']['input'];
};

export type Milestone = {
  fields: Maybe<Array<MilestoneField>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  summaries: Maybe<Array<MilestoneSummary>>;
};

export type MilestoneField = {
  deletable: Scalars['Boolean']['output'];
  editable: Scalars['Boolean']['output'];
  group: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  visible: Scalars['Boolean']['output'];
  width: Scalars['Int']['output'];
};

export type MilestoneSummary = {
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  visible: Scalars['Boolean']['output'];
};

export type Mutation = {
  createMilestone: Maybe<Milestone>;
  createProject: Maybe<Project>;
  createTask: Maybe<Task>;
  deleteMilestone: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  renameMilestone: Maybe<Milestone>;
  updateMilestoneField: Milestone;
  updateMilestoneSummary: Milestone;
  updateTaskActivity: Array<TaskActivity>;
  updateTaskField: Array<Task>;
  updateTaskOrder: Array<Task>;
};


export type MutationCreateMilestoneArgs = {
  param: CreateMilestone;
};


export type MutationCreateProjectArgs = {
  param: CreateProject;
};


export type MutationCreateTaskArgs = {
  param: CreateTask;
};


export type MutationDeleteMilestoneArgs = {
  param: DeleteMilestone;
};


export type MutationDeleteTaskArgs = {
  param: DeleteTask;
};


export type MutationRenameMilestoneArgs = {
  param: RenameMilestone;
};


export type MutationUpdateMilestoneFieldArgs = {
  param: UpdateMilestoneField;
};


export type MutationUpdateMilestoneSummaryArgs = {
  param: UpdateMilestoneSummary;
};


export type MutationUpdateTaskActivityArgs = {
  param: Array<UpdateTaskActivity>;
};


export type MutationUpdateTaskFieldArgs = {
  param: Array<UpdateTaskField>;
};


export type MutationUpdateTaskOrderArgs = {
  param: UpdateTaskOrder;
};

export type Project = {
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  dateSummary: Array<DateSummary>;
  milestone: Maybe<Milestone>;
  milestones: Maybe<Array<Milestone>>;
  projects: Maybe<Array<Maybe<Project>>>;
  taskActivities: Maybe<Array<TaskActivity>>;
  taskSummary: Maybe<TaskSummary>;
  taskWithActivities: Maybe<Array<TaskWithActivity>>;
  tasks: Maybe<Array<Task>>;
};


export type QueryDateSummaryArgs = {
  param: InputMaybe<QueryDateSummary>;
};


export type QueryMilestoneArgs = {
  param: InputMaybe<QueryMilestone>;
};


export type QueryMilestonesArgs = {
  param: InputMaybe<QueryMilestones>;
};


export type QueryTaskActivitiesArgs = {
  param: QueryTaskActivitiy;
};


export type QueryTaskSummaryArgs = {
  param: InputMaybe<QueryTaskSummary>;
};


export type QueryTaskWithActivitiesArgs = {
  param: InputMaybe<QueryTasks>;
};


export type QueryTasksArgs = {
  param: InputMaybe<QueryTasks>;
};

export type QueryColumns = {
  milestoneId: Scalars['String']['input'];
};

export type QueryDateSummary = {
  end_at: Scalars['DateTime']['input'];
  milestoneId: Scalars['String']['input'];
  start_at: Scalars['DateTime']['input'];
};

export type QueryMilestone = {
  milestoneName: Scalars['String']['input'];
  projectName: Scalars['String']['input'];
};

export type QueryMilestoneOptions = {
  milestoneId: Scalars['String']['input'];
};

export type QueryMilestones = {
  projectName: Scalars['String']['input'];
};

export type QueryTaskActivitiy = {
  end_at: Scalars['DateTime']['input'];
  start_at: Scalars['DateTime']['input'];
  taskIds: Array<Scalars['String']['input']>;
};

export type QueryTaskSummary = {
  date_lt: Scalars['DateTime']['input'];
  taskId: Scalars['String']['input'];
};

export type QueryTasks = {
  date_at?: InputMaybe<Scalars['DateTime']['input']>;
  end_at?: InputMaybe<Scalars['DateTime']['input']>;
  milestoneId: Scalars['String']['input'];
  start_at?: InputMaybe<Scalars['DateTime']['input']>;
};

export type RenameMilestone = {
  milestoneId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Task = {
  created_at: Maybe<Scalars['DateTime']['output']>;
  fields: Maybe<Array<TaskField>>;
  id: Scalars['ID']['output'];
  milestoneId: Scalars['String']['output'];
  order: TaskOrder;
  updated_at: Maybe<Scalars['DateTime']['output']>;
};

export type TaskActivity = {
  ac: Maybe<Scalars['Decimal']['output']>;
  created_at: Scalars['DateTime']['output'];
  date_at: Scalars['DateTime']['output'];
  etc: Maybe<Scalars['Decimal']['output']>;
  ev: Maybe<Scalars['Decimal']['output']>;
  pv: Maybe<Scalars['Decimal']['output']>;
  taskId: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type TaskField = {
  id: Scalars['ID']['output'];
  type: Maybe<Scalars['String']['output']>;
  value: Maybe<Scalars['String']['output']>;
};

export type TaskMeta = {
  category1: Maybe<Scalars['String']['output']>;
  category2: Maybe<Scalars['String']['output']>;
  category3: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type TaskOrder = {
  id: Scalars['ID']['output'];
  order: Scalars['Float']['output'];
};

export type TaskSummary = {
  ac: Maybe<Scalars['Decimal']['output']>;
  date_lt: Scalars['DateTime']['output'];
  ev: Maybe<Scalars['Decimal']['output']>;
  pv: Maybe<Scalars['Decimal']['output']>;
  taskId: Scalars['String']['output'];
};

export type TaskWithActivity = {
  activity: Maybe<Array<TaskActivity>>;
  created_at: Maybe<Scalars['DateTime']['output']>;
  fields: Maybe<Array<TaskField>>;
  id: Scalars['ID']['output'];
  milestoneId: Scalars['String']['output'];
  order: TaskOrder;
  updated_at: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateMilestoneField = {
  milestoneId: Scalars['String']['input'];
  values: Array<UpdateMilestoneFieldValue>;
};

export type UpdateMilestoneFieldValue = {
  type: Scalars['String']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateMilestoneSummary = {
  milestoneId: Scalars['String']['input'];
  values: Array<UpdateMilestoneSummaryValue>;
};

export type UpdateMilestoneSummaryValue = {
  type: Scalars['String']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateTaskActivity = {
  ac?: InputMaybe<Scalars['String']['input']>;
  date_at: Scalars['DateTime']['input'];
  ev?: InputMaybe<Scalars['String']['input']>;
  pv?: InputMaybe<Scalars['String']['input']>;
  taskId: Scalars['String']['input'];
};

export type UpdateTaskField = {
  taskId: Scalars['String']['input'];
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type UpdateTaskOrder = {
  order: Scalars['Float']['input'];
  refresh: Scalars['Boolean']['input'];
  taskId: Scalars['String']['input'];
};

export type User = {
  displayName: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Maybe<Scalars['String']['output']>;
};

export type MilestoneFragmentFragment = { id: string, name: string, fields: Array<{ id: string, group: string, type: string, order: number, visible: boolean, editable: boolean, deletable: boolean, title: string, width: number }> | null, summaries: Array<{ id: string, type: string, order: number, visible: boolean, title: string }> | null };

export type TaskFragmentFragment = { id: string, fields: Array<{ id: string, type: string | null, value: string | null }> | null, order: { id: string, order: number } };

export type TaskActivityFragmentFragment = { taskId: string, date_at: Date, pv: string | null, ac: string | null, ev: string | null, created_at: Date, updated_at: Date };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { projects: Array<{ id: string, name: string } | null> | null };

export type CreateProjectMutationVariables = Exact<{
  param: CreateProject;
}>;


export type CreateProjectMutation = { createProject: { id: string, name: string } | null };

export type CreateMilestoneMutationVariables = Exact<{
  param: CreateMilestone;
}>;


export type CreateMilestoneMutation = { createMilestone: { id: string, name: string, fields: Array<{ id: string, group: string, type: string, order: number, visible: boolean, editable: boolean, deletable: boolean, title: string, width: number }> | null, summaries: Array<{ id: string, type: string, order: number, visible: boolean, title: string }> | null } | null };

export type RenameMilestoneMutationVariables = Exact<{
  param: RenameMilestone;
}>;


export type RenameMilestoneMutation = { renameMilestone: { id: string, name: string, fields: Array<{ id: string, group: string, type: string, order: number, visible: boolean, editable: boolean, deletable: boolean, title: string, width: number }> | null, summaries: Array<{ id: string, type: string, order: number, visible: boolean, title: string }> | null } | null };

export type DeleteMilestoneMutationVariables = Exact<{
  param: DeleteMilestone;
}>;


export type DeleteMilestoneMutation = { deleteMilestone: boolean };

export type GetMilestoneQueryVariables = Exact<{
  param: InputMaybe<QueryMilestone>;
}>;


export type GetMilestoneQuery = { milestone: { id: string } | null };

export type CreateTaskMutationVariables = Exact<{
  param: CreateTask;
}>;


export type CreateTaskMutation = { createTask: { id: string, fields: Array<{ id: string, type: string | null, value: string | null }> | null, order: { id: string, order: number } } | null };

export type DeleteTaskMutationVariables = Exact<{
  param: DeleteTask;
}>;


export type DeleteTaskMutation = { deleteTask: boolean };

export type GetMilestonesQueryVariables = Exact<{
  param: InputMaybe<QueryMilestones>;
}>;


export type GetMilestonesQuery = { milestones: Array<{ id: string, name: string, fields: Array<{ id: string, group: string, type: string, order: number, visible: boolean, editable: boolean, deletable: boolean, title: string, width: number }> | null, summaries: Array<{ id: string, type: string, order: number, visible: boolean, title: string }> | null }> | null };

export type GetTasksQueryVariables = Exact<{
  param: InputMaybe<QueryTasks>;
}>;


export type GetTasksQuery = { tasks: Array<{ id: string, fields: Array<{ id: string, type: string | null, value: string | null }> | null, order: { id: string, order: number } }> | null };

export type GetTaskWithActivityQueryVariables = Exact<{
  param: InputMaybe<QueryTasks>;
}>;


export type GetTaskWithActivityQuery = { taskWithActivities: Array<{ id: string, activity: Array<{ taskId: string, date_at: Date, pv: string | null, ac: string | null, ev: string | null, created_at: Date, updated_at: Date }> | null, fields: Array<{ id: string, type: string | null, value: string | null }> | null, order: { id: string, order: number } }> | null };

export type GetTaskActivityQueryVariables = Exact<{
  param: QueryTaskActivitiy;
}>;


export type GetTaskActivityQuery = { taskActivities: Array<{ taskId: string, date_at: Date, pv: string | null, ac: string | null, ev: string | null, etc: string | null, created_at: Date, updated_at: Date }> | null };

export type GetDateSummeryQueryVariables = Exact<{
  param: InputMaybe<QueryDateSummary>;
}>;


export type GetDateSummeryQuery = { dateSummary: Array<{ date: Date, prv: string, erv: string, pv: string, ev: string, sv: string, ac: string, cv: string, spi: string, cpi: string, dpv: string, dev: string, dac: string, dsv: string, dcv: string }> };

export type UpdateActivityMutationVariables = Exact<{
  param: Array<UpdateTaskActivity> | UpdateTaskActivity;
}>;


export type UpdateActivityMutation = { updateTaskActivity: Array<{ taskId: string, date_at: Date, pv: string | null, ac: string | null, ev: string | null, etc: string | null, created_at: Date, updated_at: Date }> };

export type UpdateTaskFieldMutationVariables = Exact<{
  param: Array<UpdateTaskField> | UpdateTaskField;
}>;


export type UpdateTaskFieldMutation = { updateTaskField: Array<{ id: string, milestoneId: string, created_at: Date | null, updated_at: Date | null, fields: Array<{ id: string, type: string | null, value: string | null }> | null }> };

export type UpdateTaskOrderMutationVariables = Exact<{
  param: UpdateTaskOrder;
}>;


export type UpdateTaskOrderMutation = { updateTaskOrder: Array<{ id: string, milestoneId: string, order: { id: string, order: number } }> };

export type UpdateMilestoneFieldMutationVariables = Exact<{
  param: UpdateMilestoneField;
}>;


export type UpdateMilestoneFieldMutation = { updateMilestoneField: { id: string, name: string, fields: Array<{ id: string, group: string, type: string, order: number, visible: boolean, editable: boolean, deletable: boolean, title: string, width: number }> | null, summaries: Array<{ id: string, type: string, order: number, visible: boolean, title: string }> | null } };

export type UpdateMilestoneSummaryMutationVariables = Exact<{
  param: UpdateMilestoneSummary;
}>;


export type UpdateMilestoneSummaryMutation = { updateMilestoneSummary: { id: string, name: string, fields: Array<{ id: string, group: string, type: string, order: number, visible: boolean, editable: boolean, deletable: boolean, title: string, width: number }> | null, summaries: Array<{ id: string, type: string, order: number, visible: boolean, title: string }> | null } };

export const MilestoneFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MilestoneFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Milestone"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"editable"}},{"kind":"Field","name":{"kind":"Name","value":"deletable"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"summaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<MilestoneFragmentFragment, unknown>;
export const TaskFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]} as unknown as DocumentNode<TaskFragmentFragment, unknown>;
export const TaskActivityFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskActivityFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskActivity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"date_at"}},{"kind":"Field","name":{"kind":"Name","value":"pv"}},{"kind":"Field","name":{"kind":"Name","value":"ac"}},{"kind":"Field","name":{"kind":"Name","value":"ev"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]} as unknown as DocumentNode<TaskActivityFragmentFragment, unknown>;
export const GetProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProject"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateMilestoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createMilestone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMilestone"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMilestone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MilestoneFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MilestoneFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Milestone"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"editable"}},{"kind":"Field","name":{"kind":"Name","value":"deletable"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"summaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateMilestoneMutation, CreateMilestoneMutationVariables>;
export const RenameMilestoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"renameMilestone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RenameMilestone"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"renameMilestone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MilestoneFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MilestoneFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Milestone"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"editable"}},{"kind":"Field","name":{"kind":"Name","value":"deletable"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"summaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<RenameMilestoneMutation, RenameMilestoneMutationVariables>;
export const DeleteMilestoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMilestone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMilestone"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMilestone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}]}]}}]} as unknown as DocumentNode<DeleteMilestoneMutation, DeleteMilestoneMutationVariables>;
export const GetMilestoneDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMilestone"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryMilestone"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"milestone"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetMilestoneQuery, GetMilestoneQueryVariables>;
export const CreateTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTask"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Task"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]} as unknown as DocumentNode<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteTask"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}]}]}}]} as unknown as DocumentNode<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetMilestonesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMilestones"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryMilestones"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"milestones"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MilestoneFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MilestoneFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Milestone"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"editable"}},{"kind":"Field","name":{"kind":"Name","value":"deletable"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"summaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetMilestonesQuery, GetMilestonesQueryVariables>;
export const GetTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryTasks"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<GetTasksQuery, GetTasksQueryVariables>;
export const GetTaskWithActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTaskWithActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryTasks"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskWithActivities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"activity"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"date_at"}},{"kind":"Field","name":{"kind":"Name","value":"pv"}},{"kind":"Field","name":{"kind":"Name","value":"ac"}},{"kind":"Field","name":{"kind":"Name","value":"ev"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<GetTaskWithActivityQuery, GetTaskWithActivityQueryVariables>;
export const GetTaskActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTaskActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryTaskActivitiy"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskActivities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"date_at"}},{"kind":"Field","name":{"kind":"Name","value":"pv"}},{"kind":"Field","name":{"kind":"Name","value":"ac"}},{"kind":"Field","name":{"kind":"Name","value":"ev"}},{"kind":"Field","name":{"kind":"Name","value":"etc"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<GetTaskActivityQuery, GetTaskActivityQueryVariables>;
export const GetDateSummeryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDateSummery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryDateSummary"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dateSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"prv"}},{"kind":"Field","name":{"kind":"Name","value":"erv"}},{"kind":"Field","name":{"kind":"Name","value":"pv"}},{"kind":"Field","name":{"kind":"Name","value":"ev"}},{"kind":"Field","name":{"kind":"Name","value":"sv"}},{"kind":"Field","name":{"kind":"Name","value":"ac"}},{"kind":"Field","name":{"kind":"Name","value":"cv"}},{"kind":"Field","name":{"kind":"Name","value":"spi"}},{"kind":"Field","name":{"kind":"Name","value":"cpi"}},{"kind":"Field","name":{"kind":"Name","value":"dpv"}},{"kind":"Field","name":{"kind":"Name","value":"dev"}},{"kind":"Field","name":{"kind":"Name","value":"dac"}},{"kind":"Field","name":{"kind":"Name","value":"dsv"}},{"kind":"Field","name":{"kind":"Name","value":"dcv"}}]}}]}}]} as unknown as DocumentNode<GetDateSummeryQuery, GetDateSummeryQueryVariables>;
export const UpdateActivityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateActivity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskActivity"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskActivity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"date_at"}},{"kind":"Field","name":{"kind":"Name","value":"pv"}},{"kind":"Field","name":{"kind":"Name","value":"ac"}},{"kind":"Field","name":{"kind":"Name","value":"ev"}},{"kind":"Field","name":{"kind":"Name","value":"etc"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpdateActivityMutation, UpdateActivityMutationVariables>;
export const UpdateTaskFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskField"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"milestoneId"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskFieldMutation, UpdateTaskFieldMutationVariables>;
export const UpdateTaskOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTaskOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTaskOrder"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTaskOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"milestoneId"}},{"kind":"Field","name":{"kind":"Name","value":"order"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTaskOrderMutation, UpdateTaskOrderMutationVariables>;
export const UpdateMilestoneFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMilestoneField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMilestoneField"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMilestoneField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MilestoneFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MilestoneFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Milestone"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"editable"}},{"kind":"Field","name":{"kind":"Name","value":"deletable"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"summaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateMilestoneFieldMutation, UpdateMilestoneFieldMutationVariables>;
export const UpdateMilestoneSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMilestoneSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"param"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMilestoneSummary"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMilestoneSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"param"},"value":{"kind":"Variable","name":{"kind":"Name","value":"param"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MilestoneFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MilestoneFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Milestone"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"editable"}},{"kind":"Field","name":{"kind":"Name","value":"deletable"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}},{"kind":"Field","name":{"kind":"Name","value":"summaries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<UpdateMilestoneSummaryMutation, UpdateMilestoneSummaryMutationVariables>;