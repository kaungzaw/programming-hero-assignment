type Project = {
  id: string;
  name: string;
  description: string;
};

type Member = {
  id: string;
  name: string;
  projectId: string;
};

type Task = {
  id: string;
  name: string;
  projectId: string;
  memberId: string;
  description: string;
  status: string;
  deadline: string;
};
