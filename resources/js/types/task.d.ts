export interface TasksResponse {
  data: Task[]
  links: Links
  meta: Meta
}

interface TaskUser {
  id: number;
  name: string;
  email: string;
}

export interface Task {
  id: number
  name: string
  description: string
  image_path: string
  status: "pending" | "in_progress" | "completed"
  priority: string
  due_date: string
  created_at: string
  assigned_user: TaskUser
  created_by: TaskUser
  updated_by: TaskUser
  project_id: number
}

export interface Links {
  first: string
  last: string
  prev?: string
  next: string
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Link {
  url?: string
  label: string
  active: boolean
}