

export class ICreateAgentProfiles {
  user_id: number
  agent_id: number
  name?: string
  phone?: string
  license_number?: string
  rating?: number
  avatar_url?: string
}

export interface IUpdateAgentProfile {
  user_id: number
  agent_id: number
  name?: string
  phone?: string
  license_number?: string
  rating?: number
  avatar_url?: string
}

export interface IListAgentProfile {
  page?: number
  size?: number
  key?: string
  user_id?: number
}