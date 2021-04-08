export interface SummaryModel {
  total: number
  totalProject: number
  person: number
}

export enum ProjectStatus {
  progress = 'progress',
  done = 'done',
  draft = 'draft',
}

export interface ProjectInfo {
  symbol: String
  name: String
  desc: String
  reward_total: String
  reward_value: String
  reward_1_person: String
  start_ts: number
  status: ProjectStatus
}
