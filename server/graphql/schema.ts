export const typeDefs = `schema {
  query: Query
  mutation: Mutation
}

type Column {
  id: ID!
}

input CreateMilestone {
  name: String!
  project: String!
}

input CreateProject {
  name: String!
}

input CreateTask {
  milestoneId: String!
  order: Float
}

type DateSummary {
  ac: Decimal!
  cpi: Decimal!
  cv: Decimal!
  dac: Decimal!
  date: DateTime!
  dcv: Decimal!
  dev: Decimal!
  dpv: Decimal!
  dsv: Decimal!
  erv: Decimal!
  ev: Decimal!
  prv: Decimal!
  pv: Decimal!
  spi: Decimal!
  sv: Decimal!
}

scalar DateTime

scalar Decimal

input DeleteMilestone {
  milestoneId: String!
}

input DeleteTask {
  taskId: String!
}

type Milestone {
  fields: [MilestoneField!]
  id: ID!
  name: String!
  summaries: [MilestoneSummary!]
}

type MilestoneField {
  deletable: Boolean!
  editable: Boolean!
  group: String!
  id: ID!
  order: Int!
  title: String!
  type: String!
  visible: Boolean!
  width: Int!
}

type MilestoneSummary {
  id: ID!
  order: Int!
  title: String!
  type: String!
  visible: Boolean!
}

type Mutation {
  createMilestone(param: CreateMilestone!): Milestone
  createProject(param: CreateProject!): Project
  createTask(param: CreateTask!): Task
  deleteMilestone(param: DeleteMilestone!): Boolean!
  deleteTask(param: DeleteTask!): Boolean!
  renameMilestone(param: RenameMilestone!): Milestone
  updateMilestoneField(param: UpdateMilestoneField!): Milestone!
  updateMilestoneSummary(param: UpdateMilestoneSummary!): Milestone!
  updateTaskActivity(param: [UpdateTaskActivity!]!): [TaskActivity!]!
  updateTaskField(param: [UpdateTaskField!]!): [Task!]!
  updateTaskOrder(param: UpdateTaskOrder!): [Task!]!
}

type Project {
  id: ID!
  name: String!
}

type Query {
  dateSummary(param: QueryDateSummary): [DateSummary!]!
  milestone(param: QueryMilestone): Milestone
  milestones(param: QueryMilestones): [Milestone!]
  projects: [Project]
  taskActivities(param: QueryTaskActivitiy!): [TaskActivity!]
  taskSummary(param: QueryTaskSummary): TaskSummary
  taskWithActivities(param: QueryTasks): [TaskWithActivity!]
  tasks(param: QueryTasks): [Task!]
}

input QueryColumns {
  milestoneId: String!
}

input QueryDateSummary {
  end_at: DateTime!
  milestoneId: String!
  start_at: DateTime!
}

input QueryMilestone {
  milestoneName: String!
  projectName: String!
}

input QueryMilestoneOptions {
  milestoneId: String!
}

input QueryMilestones {
  projectName: String!
}

input QueryTaskActivitiy {
  end_at: DateTime!
  start_at: DateTime!
  taskIds: [String!]!
}

input QueryTaskSummary {
  date_lt: DateTime!
  taskId: String!
}

input QueryTasks {
  date_at: DateTime
  end_at: DateTime
  milestoneId: String!
  start_at: DateTime
}

input RenameMilestone {
  milestoneId: String!
  name: String!
}

type Task {
  created_at: DateTime
  fields: [TaskField!]
  id: ID!
  milestoneId: String!
  order: TaskOrder!
  updated_at: DateTime
}

type TaskActivity {
  ac: Decimal
  created_at: DateTime!
  date_at: DateTime!
  etc: Decimal
  ev: Decimal
  pv: Decimal
  taskId: String!
  updated_at: DateTime!
}

type TaskField {
  id: ID!
  type: String
  value: String
}

type TaskMeta {
  category1: String
  category2: String
  category3: String
  id: ID!
}

type TaskOrder {
  id: ID!
  order: Float!
}

type TaskSummary {
  ac: Decimal
  date_lt: DateTime!
  ev: Decimal
  pv: Decimal
  taskId: String!
}

type TaskWithActivity {
  activity: [TaskActivity!]
  created_at: DateTime
  fields: [TaskField!]
  id: ID!
  milestoneId: String!
  order: TaskOrder!
  updated_at: DateTime
}

input UpdateMilestoneField {
  milestoneId: String!
  values: [UpdateMilestoneFieldValue!]!
}

input UpdateMilestoneFieldValue {
  type: String!
  visible: Boolean
  width: Int
}

input UpdateMilestoneSummary {
  milestoneId: String!
  values: [UpdateMilestoneSummaryValue!]!
}

input UpdateMilestoneSummaryValue {
  type: String!
  visible: Boolean
}

input UpdateTaskActivity {
  ac: String
  date_at: DateTime!
  ev: String
  pv: String
  taskId: String!
}

input UpdateTaskField {
  taskId: String!
  type: String!
  value: String!
}

input UpdateTaskOrder {
  order: Float!
  refresh: Boolean!
  taskId: String!
}

type User {
  displayName: String
  id: ID!
  name: String!
  password: String
}

scalar Void`