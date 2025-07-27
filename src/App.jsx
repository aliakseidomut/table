import { Space, Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import CustomForm from "./components/CustomForm";
import CustomTable from "./components/CustomTable";

function App() {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
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

  const filteredData = dataSource.filter((item) => {
    const formattedDate = dayjs(item.date).format("YYYY-MM-DD");
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      formattedDate.includes(searchText) ||
      String(item.number).includes(searchText)
    );
  });

  return (
    <>
      <Space size={"middle"}>
        <Button type="primary" onClick={showModal}>
          Добавить
        </Button>

        <Input
          placeholder="Поиск по таблице"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, margin: "16px 0" }}
          allowClear
        />
      </Space>

      <Modal
        title={editingItem ? "Редактировать запись" : "Добавить запись"}
        open={open}
        onCancel={handleCancel}
        footer={null}
      >
        <CustomForm editingItem={editingItem} onFinish={onFinish} form={form} />
      </Modal>

      <CustomTable
        onEdit={handleEdit}
        onDelete={handleDelete}
        data={filteredData}
      />
    </>
  );
}

export default App;
