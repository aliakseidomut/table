import { Table, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export default function CustomTable({ data, onEdit, onDelete }) {
  const columns = [
    {
      title: "Имя",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Дата",
      dataIndex: "date",
      render: (date) => dayjs(date).format("YYYY-MM-DD"),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: "Число",
      dataIndex: "number",
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: "Действия",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table columns={columns} dataSource={data} pagination={false} bordered />
  );
}
