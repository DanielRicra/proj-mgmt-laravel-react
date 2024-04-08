export type ResponseLink = {
  active: boolean;
  label: string;
  url: string | undefined;
}

type ProjectUser = {
  id: number;
  name: string;
  email: string;
};

type Project = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  due_date: string;
  status: "pending" | "in_progress" | "completed";
  image_path: string;
  created_by: ProjectUser;
  updated_by: ProjectUser;
};

export type ProjectResponse = {
  data: Project[];
  meta: {
    links: ResponseLink[];
  };
}