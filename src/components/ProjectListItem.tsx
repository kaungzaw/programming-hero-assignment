import Link from "next/link";
import { List, Popconfirm, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

type ProjectListItemProps = {
  project: Project;
};

const ProjectListItem = (props: ProjectListItemProps) => {
  const { project } = props;

  return (
    <List.Item
      actions={[
        <Link href={`/projects/${project.id}`} key="edit">
          <Button type="primary" icon={<EditOutlined />} />
        </Link>,
      ]}
    >
      <div className="list-item">{project.name}</div>
    </List.Item>
  );
};

export default ProjectListItem;
