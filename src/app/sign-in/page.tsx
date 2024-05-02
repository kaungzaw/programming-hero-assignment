"use client";
import { Button, Form, Input, Space, message } from "antd";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";

const { useForm } = Form;
const { Password } = Input;

const SignInPage = () => {
  const router = useRouter();
  const isLoading = useAuthStore((state) => state.isLoading);
  const signIn = useAuthStore((state) => state.signIn);
  const [form] = useForm();

  const onFinish = async (values: any) => {
    try {
      await signIn(values.username, values.password);
      router.push("/");
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={isLoading}
        initialValues={{ username: "admin" }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Username is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
        >
          <Password placeholder="Admin@1234" />
        </Form.Item>
        <br />
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Sign In
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInPage;
