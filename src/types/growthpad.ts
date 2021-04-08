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
  chain: String
  symbol: String
  slug: String
  logo: String
  name: String
  desc: String
  reward_total: String
  reward_value: String
  reward_1_person: String
  start_ts: number
  end_ts: number
  active: boolean
  status: ProjectStatus
}
