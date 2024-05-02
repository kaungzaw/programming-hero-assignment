import Link from "next/link";
import { List, Button } from "antd";
import useMembers from "@/hooks/useMembers";
import ErrorView from "@/components/ErrorView";
import MemberListItem from "./MemberListItem";

type MemberListProps = {
  projectId: string;
};

const MemberList = (props: MemberListProps) => {
  const { projectId } = props;
  const { isPending, isError, data: members, error } = useMembers(projectId);

  return (
    <>
      {isError ? (
        <ErrorView error={error} />
      ) : (
        <List
          header={<div>Members</div>}
          bordered={true}
          size="small"
          loading={isPending}
          dataSource={members}
          renderItem={(item) => <MemberListItem member={item} />}
        />
      )}
    </>
  );
};

export default MemberList;
