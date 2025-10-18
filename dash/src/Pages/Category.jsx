import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Switch,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../Components/Axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/category");
      setCategories(response.data.data.categories);
    } catch (error) {
      message.error("Failed to fetch categories.");
    }
  };

  const fetchBrands = async () => {
    try {
      const { data } = await axiosInstance.get("/brand");
      setBrands(data.data.brands);
    } catch (error) {
      message.error("Failed to fetch brands");
    }
  };

  const showCreateModal = () => {
    setIsEditMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (category) => {
    setIsEditMode(true);
    setEditingCategory(category);
    form.setFieldsValue({
      title: category.title,
      isActive: category.isActive,
      brand: category.brand._id,
    });
    setIsModalVisible(true);
  };

  const handleCreateOrEdit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values, "values from category----------------");

      let response;
      if (isEditMode) {
        // Edit Category
        const response = await axiosInstance.patch(
          `/category/${editingCategory.slug}`,
          values
        );
        if (response.data.status === "success") {
          message.success("Category updated successfully!");
          fetchCategories();
        }
      } else {
        // Create Category
        response = await axiosInstance.post("/category", values);
        if (response.data.status === "success") {
          message.success("Category created successfully!");
          fetchCategories();
        }
        if (response.data.status === "failed") {
          throw new Error(response.data.error.message);
        }
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error(error.response.data.error.message);
    }
  };

  const handleDelete = async (slug) => {
    try {
      const response = await axiosInstance.delete(`/category/${slug}`);
      if (response.data.status === "success") {
        message.success("Category deleted successfully!");
      }
      fetchCategories();
    } catch (error) {
      message.error("Failed to delete category.");
    }
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: ["brand", "title"],
      key: "brand",
    },
    {
      title: "Total Products",
      dataIndex: "totalProducts",
      key: "totalProducts",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            className="mr-2"
          />
          <Popconfirm
            title="Are you sure to delete this brand?"
            onConfirm={() => handleDelete(record.slug)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All Brand</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Add Brand
        </Button>
      </div>

      <Table columns={columns} dataSource={categories} rowKey="_id" />

      {/* Create/Edit Modal */}
      <Modal
        title={isEditMode ? "Edit Brand" : "Create Brand"}
        visible={isModalVisible}
        onOk={handleCreateOrEdit}
        onCancel={() => setIsModalVisible(false)}
        okText={isEditMode ? "Save" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input the category title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="brand"
            label="Category"
            rules={[{ required: true, message: "Please select a Category" }]}
          >
            <Select>
              {brands.map((brand) => (
                <Select.Option key={brand._id} value={brand._id}>
                  {brand.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
