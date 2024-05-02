import { Spin } from "antd";

const Loading = () => {
  return (
    <div style={{ paddingTop: 50, textAlign: "center" }}>
      <Spin size="large" />
    </div>
  );
};

export default Loading;
