import { DatePicker, InputNumber, Form, Button, Input } from "antd";

export default function CustomForm({ form, onFinish, editingItem }) {
  return (
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
  );
}
