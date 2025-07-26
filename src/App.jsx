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
import dayjs from "dayjs";

const initialData = [];

function App() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const showModal = () => {
    form.resetFields();
    setEditingItem(null);
    setOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingItem(null);
    setOpen(false);
  };

  const onFinish = (values) => {
    const newItem = {
      key: editingItem ? editingItem.key : Date.now(),
      name: values.name,
      date: values.date,
      number: values.number,
    };

    if (editingItem) {
      setDataSource((prev) =>
        prev.map((item) => (item.key === editingItem.key ? newItem : item))
      );
    } else {
      setDataSource([...dataSource, newItem]);
    }

    form.resetFields();
    setEditingItem(null);
    setOpen(false);
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    form.setFieldsValue({
      name: record.name,
      date: dayjs(record.date),
      number: record.number,
    });
    setOpen(true);
  };

  const handleDelete = (key) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key));
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
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Число",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
          />
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
        title={editingItem ? "Редактировать запись" : "Добавить запись"}
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
              {editingItem ? "Сохранить" : "Добавить"}
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
