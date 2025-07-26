import { Table, Space, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const dataSource = [];

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
        <Button color="cyan" variant="solid">
          <EditOutlined />
        </Button>
        <Button color="danger" variant="solid">
          <DeleteOutlined />
        </Button>
      </Space>
    ),
  },
];

function App() {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      bordered={true}
    />
  );
}

export default App;
