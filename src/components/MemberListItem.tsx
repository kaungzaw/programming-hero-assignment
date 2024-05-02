import { List, Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

type MemberListItemProps = {
  member: Member;
};

const MemberListItem = (props: MemberListItemProps) => {
  const { member } = props;

  return (
    <List.Item>
      <div>{member.name}</div>
    </List.Item>
  );
};

export default MemberListItem;
