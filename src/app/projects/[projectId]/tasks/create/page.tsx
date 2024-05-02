"use client";
import { Button, Form, Input, Select, Space, DatePicker, message } from "antd";
import dayjs from "dayjs";
import useMembers from "@/hooks/useMembers";
import useCreateTask from "@/hooks/useCreateTask";

const { useForm } = Form;
const { Option } = Select;
const { TextArea } = Input;

const CreateTaskPage = ({ params }: { params: { projectId: string } }) => {
  const { projectId } = params;
  const {
    isPending: membersIsPending,
    isError: membersIsError,
    data: members,
  } = useMembers(projectId);
  const { mutateAsync: createTask, isPending: createTaskIsPending } =
    useCreateTask();
  const [form] = useForm();

  const onFinish = async (values: any) => {
    values.projectId = projectId;
    await createTask(values);
    form.resetFields();
    message.success("Task created");
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        disabled={createTaskIsPending}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="member"
          label="Member"
          rules={[
            {
              required: true,
              message: "Member is required",
            },
          ]}
        >
          <Select
            placeholder={
              membersIsError ? "Failed to fetch Members" : "Select a Member"
            }
            loading={membersIsPending}
            disabled={membersIsPending || membersIsError || createTaskIsPending}
          >
            {members?.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item
          name="deadline"
          label="Deadline"
          rules={[
            {
              required: true,
              message: "Deadline is required",
            },
          ]}
        >
          <DatePicker minDate={dayjs()} />
        </Form.Item>
        <br />
        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={createTaskIsPending}
            >
              Submit
            </Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTaskPage;
