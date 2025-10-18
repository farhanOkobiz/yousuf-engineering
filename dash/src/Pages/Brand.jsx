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
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../Components/Axios";

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [form] = Form.useForm();

  // console.log(brands, "brands from brand page");

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axiosInstance.get("/brand");
      setBrands(response.data.data.brands);
    } catch (error) {
      message.error("Failed to fetch brands.");
    }
  };

  const showCreateModal = () => {
    setIsEditMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const showEditModal = (brand) => {
    setIsEditMode(true);
    setEditingBrand(brand);
    form.setFieldsValue({
      title: brand.title,
      isActive: brand.isActive,
    });
    setIsModalVisible(true);
  };

  const handleCreateOrEdit = async () => {
    try {
      const values = await form.validateFields();

      if (isEditMode) {
        // Edit Brand
        const response = await axiosInstance.patch(
          `/brand/${editingBrand.slug}`,
          values
        );
        if (response.data.status === "success") {
          message.success("Brand updated successfully!");
          fetchBrands();
        }
      } else {
        // Create Brand
        const response = await axiosInstance.post("/brand", values);
        if (response.data.status === "success") {
          message.success("Brand created successfully!");
          fetchBrands();
        }
      }

      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to save brand.");
    }
  };

  const handleDelete = async (slug) => {
    try {
      const response = await axiosInstance.delete(`/brand/${slug}`);
      if (response.data.status === "success") {
        message.success("Brand deleted successfully!");
      }
      fetchBrands();
    } catch (error) {
      message.error("Failed to delete brand.");
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
            title="Are you sure to delete this category?"
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
        <h1 className="text-2xl font-bold">All Category</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Add Category
        </Button>
      </div>

      <Table columns={columns} dataSource={brands} rowKey="_id" />
      {/* Create/Edit Modal */}
      <Modal
        title={isEditMode ? "Edit Category" : "Create Category"}
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
              { required: true, message: "Please input the brand title!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Brand;
