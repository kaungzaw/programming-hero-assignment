import { List, Button } from "antd";
import useProjects from "@/hooks/useProjects";
import ErrorView from "@/components/ErrorView";
import ProjectListItem from "@/components/ProjectListItem";

const ProjectList = () => {
  const { isPending, isError, data: projects, error } = useProjects();

  return (
    <>
      {isError ? (
        <ErrorView error={error} />
      ) : (
        <List
          bordered={true}
          size="small"
          loading={isPending}
          dataSource={projects}
          renderItem={(item) => <ProjectListItem project={item} />}
        />
      )}
    </>
  );
};

export default ProjectList;
