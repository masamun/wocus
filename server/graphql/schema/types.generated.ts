import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { DateSummaryResultMapper, TaskMapper } from './project/schema.mappers';
import type { WocusContext } from '@/server/graphql/context/';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  Decimal: { input: any; output: any; }
};

export type Column = {
  __typename?: 'Column';
  id: Scalars['ID']['output'];
};

export type CreateMenu = {
  name: Scalars['String']['input'];
  order: Scalars['Float']['input'];
  parentMenuId?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateMilestone = {
  name: Scalars['String']['input'];
  projectId: Scalars['String']['input'];
};

export type CreateProject = {
  name: Scalars['String']['input'];
};

export type CreateTask = {
  milestoneId: Scalars['String']['input'];
  order?: InputMaybe<Scalars['Float']['input']>;
};

export type DateAt = {
  date_at: Scalars['DateTime']['input'];
};

export type DateRange = {
  end_at: Scalars['DateTime']['input'];
  start_at: Scalars['DateTime']['input'];
};

export type DateSummary = {
  __typename?: 'DateSummary';
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

export type DateSummaryResult = {
  __typename?: 'DateSummaryResult';
  dates: Array<DateSummary>;
  info: SummaryInfo;
};

export type DeleteMenu = {
  menuId: Scalars['String']['input'];
  recursive?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DeleteMilestone = {
  milestoneId: Scalars['String']['input'];
};

export type DeleteTask = {
  taskId: Scalars['String']['input'];
};

export type Markdown = {
  __typename?: 'Markdown';
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type Menu = {
  __typename?: 'Menu';
  hierarchy: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  order: Scalars['Float']['output'];
  pageId: Scalars['String']['output'];
  parentId?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type Milestone = {
  __typename?: 'Milestone';
  fields?: Maybe<Array<MilestoneField>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  summaries?: Maybe<Array<MilestoneSummary>>;
};

export type MilestoneField = {
  __typename?: 'MilestoneField';
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
  __typename?: 'MilestoneSummary';
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  visible: Scalars['Boolean']['output'];
};

export type MoveMenu = {
  menuId: Scalars['String']['input'];
  newOrder: Scalars['Float']['input'];
  oldOrder: Scalars['Float']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMenu?: Maybe<Menu>;
  createMilestone?: Maybe<Milestone>;
  createProject?: Maybe<Project>;
  createTask?: Maybe<Task>;
  deleteMenu?: Maybe<Scalars['Boolean']['output']>;
  deleteMilestone: Scalars['Boolean']['output'];
  deleteTask: Scalars['Boolean']['output'];
  renameMenu?: Maybe<Scalars['Boolean']['output']>;
  renameMilestone?: Maybe<Milestone>;
  updateMarkdown: Scalars['Boolean']['output'];
  updateMilestoneField: Milestone;
  updateMilestoneSummary: Milestone;
  updateTaskActivity: Array<TaskActivity>;
  updateTaskField: Array<Task>;
  updateTaskOrder: Array<Task>;
};


export type MutationcreateMenuArgs = {
  param: CreateMenu;
};


export type MutationcreateMilestoneArgs = {
  param: CreateMilestone;
};


export type MutationcreateProjectArgs = {
  param: CreateProject;
};


export type MutationcreateTaskArgs = {
  param: CreateTask;
};


export type MutationdeleteMenuArgs = {
  param: DeleteMenu;
};


export type MutationdeleteMilestoneArgs = {
  param: DeleteMilestone;
};


export type MutationdeleteTaskArgs = {
  param: DeleteTask;
};


export type MutationrenameMenuArgs = {
  param: RenameMenu;
};


export type MutationrenameMilestoneArgs = {
  param: RenameMilestone;
};


export type MutationupdateMarkdownArgs = {
  param: UpdateMarkdown;
};


export type MutationupdateMilestoneFieldArgs = {
  param: UpdateMilestoneField;
};


export type MutationupdateMilestoneSummaryArgs = {
  param: UpdateMilestoneSummary;
};


export type MutationupdateTaskActivityArgs = {
  param: Array<UpdateTaskActivity>;
};


export type MutationupdateTaskFieldArgs = {
  param: Array<UpdateTaskField>;
};


export type MutationupdateTaskOrderArgs = {
  param: UpdateTaskOrder;
};

export type Page = {
  __typename?: 'Page';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  dateSummary: DateSummaryResult;
  markdown?: Maybe<Markdown>;
  menus: Array<Menu>;
  milestone?: Maybe<Milestone>;
  milestones: Array<Milestone>;
  projects: Array<Maybe<Project>>;
  taskSummary?: Maybe<TaskSummary>;
  tasks: Array<Task>;
};


export type QuerydateSummaryArgs = {
  param: QueryDateSummary;
};


export type QuerymarkdownArgs = {
  param: QueryMarkdown;
};


export type QuerymenusArgs = {
  param: QueryMenus;
};


export type QuerymilestoneArgs = {
  param: QueryPage;
};


export type QuerymilestonesArgs = {
  param: QueryMilestones;
};


export type QuerytaskSummaryArgs = {
  param: QueryTaskSummary;
};


export type QuerytasksArgs = {
  param: QueryTasks;
};

export type QueryColumns = {
  milestoneId: Scalars['String']['input'];
};

export type QueryDateSummary = {
  end_at: Scalars['DateTime']['input'];
  milestoneId: Scalars['String']['input'];
  start_at: Scalars['DateTime']['input'];
};

export type QueryMarkdown = {
  markdownId: Scalars['ID']['input'];
};

export type QueryMenus = {
  projectId: Scalars['String']['input'];
};

export type QueryMilestoneOptions = {
  milestoneId: Scalars['String']['input'];
};

export type QueryMilestones = {
  projectName: Scalars['String']['input'];
};

export type QueryPage = {
  pageId: Scalars['String']['input'];
};

export type QueryTask = {
  date_at?: InputMaybe<Scalars['DateTime']['input']>;
  end_at: Scalars['DateTime']['input'];
  start_at: Scalars['DateTime']['input'];
  taskId: Scalars['String']['input'];
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
  end_at: Scalars['DateTime']['input'];
  milestoneId: Scalars['String']['input'];
  start_at: Scalars['DateTime']['input'];
};

export type RenameMenu = {
  menuId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type RenameMilestone = {
  milestoneId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type SummaryInfo = {
  __typename?: 'SummaryInfo';
  beforePeriodAc: Scalars['Decimal']['output'];
  beforePeriodEv: Scalars['Decimal']['output'];
  beforePeriodPv: Scalars['Decimal']['output'];
  totalPv: Scalars['Decimal']['output'];
};

export type Task = {
  __typename?: 'Task';
  activity: Array<TaskActivity>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  fields: Array<TaskField>;
  id: Scalars['ID']['output'];
  milestoneId: Scalars['String']['output'];
  order?: Maybe<TaskOrder>;
  summary?: Maybe<TaskSummary>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};


export type TaskactivityArgs = {
  range?: InputMaybe<DateRange>;
};


export type TasksummaryArgs = {
  date_at?: InputMaybe<DateAt>;
};

export type TaskActivity = {
  __typename?: 'TaskActivity';
  ac?: Maybe<Scalars['Decimal']['output']>;
  created_at: Scalars['DateTime']['output'];
  date_at: Scalars['DateTime']['output'];
  etc?: Maybe<Scalars['Decimal']['output']>;
  ev?: Maybe<Scalars['Decimal']['output']>;
  pv?: Maybe<Scalars['Decimal']['output']>;
  taskId: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type TaskField = {
  __typename?: 'TaskField';
  id: Scalars['ID']['output'];
  type?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type TaskMeta = {
  __typename?: 'TaskMeta';
  category1?: Maybe<Scalars['String']['output']>;
  category2?: Maybe<Scalars['String']['output']>;
  category3?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type TaskOrder = {
  __typename?: 'TaskOrder';
  id: Scalars['ID']['output'];
  order: Scalars['Float']['output'];
};

export type TaskSummary = {
  __typename?: 'TaskSummary';
  ac: Scalars['Decimal']['output'];
  actual_end_date?: Maybe<Scalars['DateTime']['output']>;
  actual_start_date?: Maybe<Scalars['DateTime']['output']>;
  cpi: Scalars['Decimal']['output'];
  cv: Scalars['Decimal']['output'];
  date_lt: Scalars['DateTime']['output'];
  ev: Scalars['Decimal']['output'];
  plan_end_date?: Maybe<Scalars['DateTime']['output']>;
  plan_start_date?: Maybe<Scalars['DateTime']['output']>;
  pv: Scalars['Decimal']['output'];
  spi: Scalars['Decimal']['output'];
  sv: Scalars['Decimal']['output'];
  taskId: Scalars['String']['output'];
};

export type UpdateMarkdown = {
  markdownId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
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
  __typename?: 'User';
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Column: ResolverTypeWrapper<Column>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  CreateMenu: CreateMenu;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  CreateMilestone: CreateMilestone;
  CreateProject: CreateProject;
  CreateTask: CreateTask;
  DateAt: DateAt;
  DateRange: DateRange;
  DateSummary: ResolverTypeWrapper<DateSummary>;
  DateSummaryResult: ResolverTypeWrapper<DateSummaryResultMapper>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  DeleteMenu: DeleteMenu;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DeleteMilestone: DeleteMilestone;
  DeleteTask: DeleteTask;
  Markdown: ResolverTypeWrapper<Markdown>;
  Menu: ResolverTypeWrapper<Menu>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Milestone: ResolverTypeWrapper<Milestone>;
  MilestoneField: ResolverTypeWrapper<MilestoneField>;
  MilestoneSummary: ResolverTypeWrapper<MilestoneSummary>;
  MoveMenu: MoveMenu;
  Mutation: ResolverTypeWrapper<{}>;
  Page: ResolverTypeWrapper<Page>;
  Project: ResolverTypeWrapper<Project>;
  Query: ResolverTypeWrapper<{}>;
  QueryColumns: QueryColumns;
  QueryDateSummary: QueryDateSummary;
  QueryMarkdown: QueryMarkdown;
  QueryMenus: QueryMenus;
  QueryMilestoneOptions: QueryMilestoneOptions;
  QueryMilestones: QueryMilestones;
  QueryPage: QueryPage;
  QueryTask: QueryTask;
  QueryTaskActivitiy: QueryTaskActivitiy;
  QueryTaskSummary: QueryTaskSummary;
  QueryTasks: QueryTasks;
  RenameMenu: RenameMenu;
  RenameMilestone: RenameMilestone;
  SummaryInfo: ResolverTypeWrapper<SummaryInfo>;
  Task: ResolverTypeWrapper<TaskMapper>;
  TaskActivity: ResolverTypeWrapper<TaskActivity>;
  TaskField: ResolverTypeWrapper<TaskField>;
  TaskMeta: ResolverTypeWrapper<TaskMeta>;
  TaskOrder: ResolverTypeWrapper<TaskOrder>;
  TaskSummary: ResolverTypeWrapper<TaskSummary>;
  UpdateMarkdown: UpdateMarkdown;
  UpdateMilestoneField: UpdateMilestoneField;
  UpdateMilestoneFieldValue: UpdateMilestoneFieldValue;
  UpdateMilestoneSummary: UpdateMilestoneSummary;
  UpdateMilestoneSummaryValue: UpdateMilestoneSummaryValue;
  UpdateTaskActivity: UpdateTaskActivity;
  UpdateTaskField: UpdateTaskField;
  UpdateTaskOrder: UpdateTaskOrder;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Column: Column;
  ID: Scalars['ID']['output'];
  CreateMenu: CreateMenu;
  String: Scalars['String']['output'];
  Float: Scalars['Float']['output'];
  CreateMilestone: CreateMilestone;
  CreateProject: CreateProject;
  CreateTask: CreateTask;
  DateAt: DateAt;
  DateRange: DateRange;
  DateSummary: DateSummary;
  DateSummaryResult: DateSummaryResultMapper;
  DateTime: Scalars['DateTime']['output'];
  Decimal: Scalars['Decimal']['output'];
  DeleteMenu: DeleteMenu;
  Boolean: Scalars['Boolean']['output'];
  DeleteMilestone: DeleteMilestone;
  DeleteTask: DeleteTask;
  Markdown: Markdown;
  Menu: Menu;
  Int: Scalars['Int']['output'];
  Milestone: Milestone;
  MilestoneField: MilestoneField;
  MilestoneSummary: MilestoneSummary;
  MoveMenu: MoveMenu;
  Mutation: {};
  Page: Page;
  Project: Project;
  Query: {};
  QueryColumns: QueryColumns;
  QueryDateSummary: QueryDateSummary;
  QueryMarkdown: QueryMarkdown;
  QueryMenus: QueryMenus;
  QueryMilestoneOptions: QueryMilestoneOptions;
  QueryMilestones: QueryMilestones;
  QueryPage: QueryPage;
  QueryTask: QueryTask;
  QueryTaskActivitiy: QueryTaskActivitiy;
  QueryTaskSummary: QueryTaskSummary;
  QueryTasks: QueryTasks;
  RenameMenu: RenameMenu;
  RenameMilestone: RenameMilestone;
  SummaryInfo: SummaryInfo;
  Task: TaskMapper;
  TaskActivity: TaskActivity;
  TaskField: TaskField;
  TaskMeta: TaskMeta;
  TaskOrder: TaskOrder;
  TaskSummary: TaskSummary;
  UpdateMarkdown: UpdateMarkdown;
  UpdateMilestoneField: UpdateMilestoneField;
  UpdateMilestoneFieldValue: UpdateMilestoneFieldValue;
  UpdateMilestoneSummary: UpdateMilestoneSummary;
  UpdateMilestoneSummaryValue: UpdateMilestoneSummaryValue;
  UpdateTaskActivity: UpdateTaskActivity;
  UpdateTaskField: UpdateTaskField;
  UpdateTaskOrder: UpdateTaskOrder;
  User: User;
};

export type ColumnResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['Column'] = ResolversParentTypes['Column']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DateSummaryResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['DateSummary'] = ResolversParentTypes['DateSummary']> = {
  ac?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  cpi?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  cv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  dac?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dcv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  dev?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  dpv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  dsv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  erv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  ev?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  prv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  pv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  spi?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  sv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DateSummaryResultResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['DateSummaryResult'] = ResolversParentTypes['DateSummaryResult']> = {
  dates?: Resolver<Array<ResolversTypes['DateSummary']>, ParentType, ContextType>;
  info?: Resolver<ResolversTypes['SummaryInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export type MarkdownResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['Markdown'] = ResolversParentTypes['Markdown']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MenuResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['Menu'] = ResolversParentTypes['Menu']> = {
  hierarchy?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  pageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MilestoneResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['Milestone'] = ResolversParentTypes['Milestone']> = {
  fields?: Resolver<Maybe<Array<ResolversTypes['MilestoneField']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  summaries?: Resolver<Maybe<Array<ResolversTypes['MilestoneSummary']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MilestoneFieldResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['MilestoneField'] = ResolversParentTypes['MilestoneField']> = {
  deletable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  editable?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  group?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  visible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MilestoneSummaryResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['MilestoneSummary'] = ResolversParentTypes['MilestoneSummary']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  visible?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMenu?: Resolver<Maybe<ResolversTypes['Menu']>, ParentType, ContextType, RequireFields<MutationcreateMenuArgs, 'param'>>;
  createMilestone?: Resolver<Maybe<ResolversTypes['Milestone']>, ParentType, ContextType, RequireFields<MutationcreateMilestoneArgs, 'param'>>;
  createProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationcreateProjectArgs, 'param'>>;
  createTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationcreateTaskArgs, 'param'>>;
  deleteMenu?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationdeleteMenuArgs, 'param'>>;
  deleteMilestone?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteMilestoneArgs, 'param'>>;
  deleteTask?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationdeleteTaskArgs, 'param'>>;
  renameMenu?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationrenameMenuArgs, 'param'>>;
  renameMilestone?: Resolver<Maybe<ResolversTypes['Milestone']>, ParentType, ContextType, RequireFields<MutationrenameMilestoneArgs, 'param'>>;
  updateMarkdown?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationupdateMarkdownArgs, 'param'>>;
  updateMilestoneField?: Resolver<ResolversTypes['Milestone'], ParentType, ContextType, RequireFields<MutationupdateMilestoneFieldArgs, 'param'>>;
  updateMilestoneSummary?: Resolver<ResolversTypes['Milestone'], ParentType, ContextType, RequireFields<MutationupdateMilestoneSummaryArgs, 'param'>>;
  updateTaskActivity?: Resolver<Array<ResolversTypes['TaskActivity']>, ParentType, ContextType, RequireFields<MutationupdateTaskActivityArgs, 'param'>>;
  updateTaskField?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationupdateTaskFieldArgs, 'param'>>;
  updateTaskOrder?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationupdateTaskOrderArgs, 'param'>>;
};

export type PageResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['Page'] = ResolversParentTypes['Page']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  dateSummary?: Resolver<ResolversTypes['DateSummaryResult'], ParentType, ContextType, RequireFields<QuerydateSummaryArgs, 'param'>>;
  markdown?: Resolver<Maybe<ResolversTypes['Markdown']>, ParentType, ContextType, RequireFields<QuerymarkdownArgs, 'param'>>;
  menus?: Resolver<Array<ResolversTypes['Menu']>, ParentType, ContextType, RequireFields<QuerymenusArgs, 'param'>>;
  milestone?: Resolver<Maybe<ResolversTypes['Milestone']>, ParentType, ContextType, RequireFields<QuerymilestoneArgs, 'param'>>;
  milestones?: Resolver<Array<ResolversTypes['Milestone']>, ParentType, ContextType, RequireFields<QuerymilestonesArgs, 'param'>>;
  projects?: Resolver<Array<Maybe<ResolversTypes['Project']>>, ParentType, ContextType>;
  taskSummary?: Resolver<Maybe<ResolversTypes['TaskSummary']>, ParentType, ContextType, RequireFields<QuerytaskSummaryArgs, 'param'>>;
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QuerytasksArgs, 'param'>>;
};

export type SummaryInfoResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['SummaryInfo'] = ResolversParentTypes['SummaryInfo']> = {
  beforePeriodAc?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  beforePeriodEv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  beforePeriodPv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  totalPv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  activity?: Resolver<Array<ResolversTypes['TaskActivity']>, ParentType, ContextType, Partial<TaskactivityArgs>>;
  created_at?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  fields?: Resolver<Array<ResolversTypes['TaskField']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  milestoneId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  order?: Resolver<Maybe<ResolversTypes['TaskOrder']>, ParentType, ContextType>;
  summary?: Resolver<Maybe<ResolversTypes['TaskSummary']>, ParentType, ContextType, Partial<TasksummaryArgs>>;
  updated_at?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskActivityResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['TaskActivity'] = ResolversParentTypes['TaskActivity']> = {
  ac?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  etc?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  ev?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  pv?: Resolver<Maybe<ResolversTypes['Decimal']>, ParentType, ContextType>;
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskFieldResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['TaskField'] = ResolversParentTypes['TaskField']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskMetaResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['TaskMeta'] = ResolversParentTypes['TaskMeta']> = {
  category1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category3?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskOrderResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['TaskOrder'] = ResolversParentTypes['TaskOrder']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskSummaryResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['TaskSummary'] = ResolversParentTypes['TaskSummary']> = {
  ac?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  actual_end_date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  actual_start_date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  cpi?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  cv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  date_lt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  ev?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  plan_end_date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  plan_start_date?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  pv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  spi?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  sv?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  taskId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = WocusContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  displayName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = WocusContext> = {
  Column?: ColumnResolvers<ContextType>;
  DateSummary?: DateSummaryResolvers<ContextType>;
  DateSummaryResult?: DateSummaryResultResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  Markdown?: MarkdownResolvers<ContextType>;
  Menu?: MenuResolvers<ContextType>;
  Milestone?: MilestoneResolvers<ContextType>;
  MilestoneField?: MilestoneFieldResolvers<ContextType>;
  MilestoneSummary?: MilestoneSummaryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Page?: PageResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SummaryInfo?: SummaryInfoResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskActivity?: TaskActivityResolvers<ContextType>;
  TaskField?: TaskFieldResolvers<ContextType>;
  TaskMeta?: TaskMetaResolvers<ContextType>;
  TaskOrder?: TaskOrderResolvers<ContextType>;
  TaskSummary?: TaskSummaryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

