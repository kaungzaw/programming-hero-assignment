import { Result } from "antd";

const ErrorView = ({ error }: { error: Error }) => {
  return <Result status="error" title="ERROR" subTitle={error.message} />;
};

export default ErrorView;
