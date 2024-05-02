"use client";
import { useState, useEffect } from "react";
import { Button, Form, Input, Select, Space, DatePicker, message } from "antd";
import dayjs from "dayjs";
import useMembers from "@/hooks/useMembers";
import useTask from "@/hooks/useTask";
import useEditTask from "@/hooks/useEditTask";
import ErrorView from "@/components/ErrorView";
import Loading from "@/components/Loading";
import DnD from "@/components/DnD";

const { useForm } = Form;
const { Option } = Select;
const { TextArea } = Input;

const EditTaskPage = ({
  params,
}: {
  params: { projectId: string; taskId: string };
}) => {
  const { projectId, taskId } = params;
  const {
    isPending: membersIsPending,
    isError: membersIsError,
    data: members,
  } = useMembers(projectId);
  const {
    isPending: taskIsPending,
    isError: taskIsError,
    error: taskError,
    data: task,
  } = useTask(taskId);
  const { mutateAsync: updateTask, isPending: editTaskIsPending } = useEditTask(
    taskId,
    projectId
  );
  const [form] = useForm();
  const [parent, setParent] = useState("to-do");

  useEffect(() => {
    if (task) {
      setParent(task.status);
    }
  }, [task]);

  const onFinish = async (values: any) => {
    values.status = parent;
    await updateTask(values);
    message.success("Task updated");
  };

  return (
    <>
      {taskIsError ? (
        <ErrorView error={taskError} />
      ) : taskIsPending ? (
        <Loading />
      ) : (
        <div className="form-container">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            disabled={editTaskIsPending}
            initialValues={{
              ...task,
              member: task.memberId,
              deadline: dayjs(task.deadline),
            }}
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
            <Form.Item name="member" label="Member">
              <Select
                placeholder={
                  membersIsError ? "Failed to fetch Members" : "Select a Member"
                }
                loading={membersIsPending}
                disabled={
                  membersIsPending || membersIsError || editTaskIsPending
                }
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
            <Form.Item>
              <DnD parent={parent} setParent={setParent} />
            </Form.Item>
            <Form.Item name="deadline" label="Deadline">
              <DatePicker minDate={dayjs()} />
            </Form.Item>
            <br />
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={editTaskIsPending}
                >
                  Submit
                </Button>
                <Button htmlType="reset">Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditTaskPage;
