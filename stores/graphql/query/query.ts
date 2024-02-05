import { graphql } from "../codegen/gql";

// プロジェクトリストを取得する
export const queryProject = graphql(`
  query getProjects {
    projects {
      id
      name
    }
  }
`);

/**
 * プロジェクトを作成する
 */
export const mutationProject = graphql(`
  mutation createProject($param: CreateProject!) {
    createProject(param: $param) {
      id
      name
    }
  }
`);

/**
 * マイルストーンを作成する
 */
export const mutationMilestone = graphql(`
  mutation createMilestone($param: CreateMilestone!) {
    createMilestone(param: $param) {
      ...MilestoneFragment
    }
  }
`);

/**
 * マイルストーンの名前を変更する
 */
export const mutationRenameMilestone = graphql(`
  mutation renameMilestone($param: RenameMilestone!) {
    renameMilestone(param: $param) {
      ...MilestoneFragment
    }
  }
`);

/**
 * マイルストーンを削除する
 */
export const mutationDeleteMilestone = graphql(`
  mutation deleteMilestone($param: DeleteMilestone!) {
    deleteMilestone(param: $param)
  }
`);

/**
 * マイルストーンのIDを取得する
 */
export const queryMilestoneId = graphql(`
  query getMilestone($param: QueryMilestone) {
    milestone(param: $param) {
      id
    }
  }
`);

/**
 * タスクを作成する
 */
export const mutationTask = graphql(`
  mutation createTask($param: CreateTask!) {
    createTask(param: $param) {
      ...TaskFragment
    }
  }
`);

/**
 * タスクを作成する
 */
export const mutationDeleteTask = graphql(`
  mutation deleteTask($param: DeleteTask!) {
    deleteTask(param: $param)
  }
`);

/**
 * マイルストーンの一覧を取得する
 */
export const queryMilestones = graphql(`
  query getMilestones($param: QueryMilestones) {
    milestones(param: $param) {
      ...MilestoneFragment
    }
  }
`);

/**
 * タスクの一覧を取得する
 */
export const queryTasks = graphql(`
  query getTasks($param: QueryTasks) {
    tasks(param: $param) {
      id
      fields {
        id
        type
        value
      }
      order {
        id
        order
      }
    }
  }
`);

/**
 * タスクの情報を取得する
 */
export const queryTaskWithActivity = graphql(`
  query getTaskWithActivity($param: QueryTasks) {
    taskWithActivities(param: $param) {
      id
      activity {
        taskId
        date_at
        pv
        ac
        ev
        created_at
        updated_at
      }
      fields {
        id
        type
        value
      }
      order {
        id
        order
      }
    }
  }
`);

/**
 * タスクの活動情報を取得する
 */
export const queryTaskActivity = graphql(`
  query getTaskActivity($param: QueryTaskActivitiy!) {
    taskActivities(param: $param) {
      taskId
      date_at
      pv
      ac
      ev
      etc
      created_at
      updated_at
    }
  }
`);

/**
 * 日別のサマリ情報を取得する
 */
export const queryDateSummery = graphql(`
  query getDateSummery($param: QueryDateSummary) {
    dateSummary(param: $param) {
      date
      prv
      erv
      pv
      ev
      sv
      ac
      cv
      spi
      cpi
      dpv
      dev
      dac
      dsv
      dcv
    }
  }
`);

export const updateTaskActivity = graphql(`
  mutation updateActivity($param: [UpdateTaskActivity!]!) {
    updateTaskActivity(param: $param) {
      taskId
      date_at
      pv
      ac
      ev
      etc
      created_at
      updated_at
    }
  }
`);

export const updateTaskField = graphql(`
  mutation updateTaskField($param: [UpdateTaskField!]!) {
    updateTaskField(param: $param) {
      id
      milestoneId
      created_at
      updated_at
      fields {
        id
        type
        value
      }
    }
  }
`);

export const updateTaskOrder = graphql(`
  mutation updateTaskOrder($param: UpdateTaskOrder!) {
    updateTaskOrder(param: $param) {
      id
      milestoneId
      order {
        id
        order
      }
    }
  }
`);

export const updateMilestoneField = graphql(`
  mutation updateMilestoneField($param: UpdateMilestoneField!) {
    updateMilestoneField(param: $param) {
      ...MilestoneFragment
    }
  }
`);

export const updateMilestoneSummary = graphql(`
  mutation updateMilestoneSummary($param: UpdateMilestoneSummary!) {
    updateMilestoneSummary(param: $param) {
      ...MilestoneFragment
    }
  }
`);
