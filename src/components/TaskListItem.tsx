import Link from "next/link";
import { List, Popconfirm, Button, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import useDeleteTask from "@/hooks/useDeleteTask";
import useMember from "@/hooks/useMember";

type TaskListItemProps = {
  task: Task;
};

const TaskListItem = (props: TaskListItemProps) => {
  const { task } = props;
  const {
    isPending: memberIsPending,
    isError: memberIsError,
    data: member,
    error: memberError,
  } = useMember(task.memberId);
  const { mutateAsync: deleteTask } = useDeleteTask();

  return (
    <List.Item
      actions={[
        <Link href={`/projects/${task.projectId}/tasks/${task.id}`} key="edit">
          <Button key="edit" type="primary" icon={<EditOutlined />} />
        </Link>,
        <Popconfirm
          key="delete"
          title="Are you sure you want to delete?"
          onConfirm={() =>
            deleteTask({ id: task.id, projectId: task.projectId })
          }
        >
          <Button type="primary" icon={<DeleteOutlined />} danger />
        </Popconfirm>,
      ]}
    >
      <div className="list-item">
        {task.name} | {dayjs(task.deadline).format("YYYY-MM-DD")} |{" "}
        {member?.name ?? "..."}
        &nbsp;&nbsp;
        <Tag
          color={
            task.status === "to-do"
              ? "blue"
              : task.status === "in-progress"
              ? "orange"
              : "green"
          }
        >
          {task.status}
        </Tag>
      </div>
    </List.Item>
  );
};

export default TaskListItem;
