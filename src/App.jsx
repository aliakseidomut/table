import {
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  InputNumber,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";

const initialData = [];

function App() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(initialData);
  const [open, setOpen] = useState(false);

  const showModal = () => setOpen(true);
  const handleCancel = () => setOpen(false);

  const onFinish = (values) => {
    const newItem = {
      key: Date.now(),
      name: values.name,
      date: values.date.format("YYYY-MM-DD"),
      number: values.number,
    };
    setDataSource([...dataSource, newItem]);
    form.resetFields();
    setOpen(false);
  };

  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Число",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Действия",
      key: "actions",
      render: () => (
        <Space size="middle">
          <Button color="cyan" variant="solid" icon={<EditOutlined />} />
          <Button color="danger" variant="solid" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Добавить
      </Button>

      <Modal
        title="Добавить запись"
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Дата"
            name="date"
            rules={[{ required: true, message: "Пожалуйста, выберите дату!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Число"
            name="number"
            rules={[{ required: true, message: "Пожалуйста, введите число!" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        style={{ marginTop: 16 }}
      />
    </>
  );
}

export default App;
