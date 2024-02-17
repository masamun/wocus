export const milestoneFragment = graphql(/* GraphQL */ `
  fragment MilestoneFragment on Milestone {
    id
    name
    fields {
      id
      group
      type
      order
      visible
      editable
      deletable
      title
      width
    }
    summaries {
      id
      type
      order
      visible
      title
    }
  }
`);

export const taskFragment = graphql(/* GraphQL */ `
  fragment TaskFragment on Task {
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
`);

export const taskActivityFragment = graphql(/* GraphQL */ `
  fragment TaskActivityFragment on TaskActivity {
    taskId
    date_at
    pv
    ac
    ev
    created_at
    updated_at
  }
`);
