"use client";
import useProject from "@/hooks/useProject";
import ErrorView from "@/components/ErrorView";
import TaskList from "@/components/TaskList";
import ProjectDetails from "@/components/ProjectDetails";
import Loading from "@/components/Loading";
import MemberList from "@/components/MemberList";

const ProjectDetailsPage = ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;
  const { isPending, isError, data: project, error } = useProject(projectId);

  return (
    <>
      {isError ? (
        <ErrorView error={error} />
      ) : isPending ? (
        <Loading />
      ) : (
        <>
          <ProjectDetails project={project} />
          <br />
          <MemberList projectId={project.id} />
          <br />
          <TaskList projectId={project.id} />
        </>
      )}
    </>
  );
};

export default ProjectDetailsPage;
