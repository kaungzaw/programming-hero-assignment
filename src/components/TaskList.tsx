import { useState } from "react";
import Link from "next/link";
import { List, Button, Select } from "antd";
import useTasks from "@/hooks/useTasks";
import useMembers from "@/hooks/useMembers";
import ErrorView from "@/components/ErrorView";
import TaskListItem from "@/components/TaskListItem";

const { Option } = Select;

type TaskListProps = {
  projectId: string;
};

const TaskList = (props: TaskListProps) => {
  const { projectId } = props;
  const {
    isPending: membersIsPending,
    isError: membersIsError,
    data: members,
  } = useMembers(projectId);
  const [status, setStatus] = useState<undefined | string>();
  const [member, setMember] = useState<undefined | string>();
  const {
    isPending: tasksIsPending,
    isError: tasksIsError,
    data: tasks,
    error: tasksError,
  } = useTasks(projectId, status, member);

  return (
    <>
      {tasksIsError ? (
        <ErrorView error={tasksError} />
      ) : (
        <List
          header={
            <>
              <Link href={`/projects/${projectId}/tasks/create`}>
                <Button>Create New Task</Button>
              </Link>
              <div style={{ paddingTop: 10, display: "flex" }}>
                <Select
                  style={{
                    width: 110,
                  }}
                  value={status}
                  onChange={(value) => setStatus(value)}
                  placeholder="Status"
                  allowClear
                >
                  <Option value="to-do">To Do</Option>
                  <Option value="in-progress">In Progress</Option>
                  <Option value="done">Done</Option>
                </Select>
                &nbsp;&nbsp;
                <Select
                  style={{
                    width: 140,
                  }}
                  value={member}
                  onChange={(value) => setMember(value)}
                  placeholder="Member"
                  loading={membersIsPending}
                  disabled={membersIsPending || membersIsError}
                  allowClear
                >
                  {members?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </div>
            </>
          }
          bordered={true}
          size="small"
          loading={tasksIsPending}
          dataSource={tasks}
          renderItem={(item) => <TaskListItem task={item} />}
        />
      )}
    </>
  );
};

export default TaskList;
