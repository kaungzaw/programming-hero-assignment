import { Descriptions } from "antd";

type ProjectDetailsProps = {
  project: Project;
};

const ProjectDetails = (props: ProjectDetailsProps) => {
  const { project } = props;

  return (
    <Descriptions title="Project Details" column={1} bordered>
      <Descriptions.Item label="Name">{project.name}</Descriptions.Item>
      <Descriptions.Item label="Description">
        {project.description}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ProjectDetails;
