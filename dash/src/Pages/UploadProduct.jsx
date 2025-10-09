import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axiosInstance from "../Components/Axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the Quill styling
import DynamicFormList from "../Components/DynamicFormList";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [photosToRemove, setPhotosToRemove] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // console.log(products[0].specification, "products from product");
  // Fetch all products and categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      fetchCategories(selectedBrand.slug);
    }
  }, [selectedBrand]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/products");
      setProducts(data.data.doc);
    } catch (error) {
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
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

  const fetchCategories = async (brandSlug) => {
    try {
      const { data } = await axiosInstance.get(
        `/brand/${brandSlug}/categories`
      );
      setCategories(data.data.categories);
    } catch (error) {
      // message.error("Failed to fetch categories");
    }
  };

  const handleBrandChange = (brandId) => {
    const brand = brands.find((b) => b._id === brandId);
    setSelectedBrand(brand);
  };
  const handleRemovePhoto = (file) => {
    if (file.url) {
      setPhotosToRemove((prev) => [...prev, file.url]);
    }
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
  };


  // Handle create/edit
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      const requiredFields = ["model", "advantages"];
      for (const field of requiredFields) {
        if (
          !values[field] ||
          (Array.isArray(values[field]) && values[field].length === 0) ||
          values[field].includes("undefined")
        ) {
          message.error(`${field} is required and must have valid values.`);
          return;
        }
      }
      // Append fields from the form
      // Object.keys(values).forEach((key) => {
      //   if (key !== "photos") {
      //     formData.append(key, values[key]);
      //   }
      // });
      for (const key in values) {
        if (key === "model") {
          formData.append("model", JSON.stringify(values.model));
        } else if (Array.isArray(values[key])) {
          const validItems = values[key].filter(
            (item) => item !== "undefined" && item.trim() !== ""
          );
          if (validItems.length > 0) {
            validItems.forEach((item) => {
              formData.append(`${key}[]`, item);
            });
          } else {
            message.success(`${key} is required but contains invalid values.`);
            return;
          }
        } else {
          formData.append(key, values[key]);
        }
      }
      // Combine existing photos and new ones
      const existingPhotos = editingProduct ? editingProduct.photos : [];
      const newPhotos = fileList.map((file) => file.originFileObj); // New files to upload

      // Prepare the final photos array for submission
      const allPhotos = [
        ...existingPhotos.filter((photo) => !photosToRemove.includes(photo)),
        ...newPhotos,
      ];


      // const MAX_PHOTOS = 4;
      // if (allPhotos.length >= MAX_PHOTOS) {
      //   message.error(`You can upload a maximum of ${MAX_PHOTOS} photos.`);
      //   setConfirmLoading(false);
      //   return;
      // }

      allPhotos.forEach((photo) => {
        if (photo) {
          formData.append("photos", photo);
        }
      });

      // Handle update or create
      if (editingProduct) {
        formData.append("photosToRemove", photosToRemove);
        await axiosInstance.patch(
          `/products/${editingProduct.slug}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        message.success("Product updated successfully!");
      } else {
        await axiosInstance.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Product created successfully!");
      }

      fetchProducts();
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
      setPhotosToRemove([]);
    } catch (error) {
      message.error("Failed to save product");
    } finally {
      setConfirmLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (slug) => {
    try {
      await axiosInstance.delete(`/products/${slug}`);
      message.success("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  // Open modal for create/edit
  const showModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    setPhotosToRemove([]);

    if (product) {
      // edit case
      form.setFieldsValue({
        ...product,
        model: product?.specification,
        category: product.category?._id,
        brand: product.brand?._id,
        details: product.details,
      });
      setFileList(
        (product.photos || []).map((url, index) => ({
          uid: index,
          name: `photo-${index}`,
          status: "done",
          url: url,
        }))
      );
      const brand = brands.find((b) => b._id === product.brand._id);
      setSelectedBrand(brand);
      fetchCategories(brand.slug);
    } else {
      // create case
      form.resetFields();
      setFileList([]);
      setSelectedBrand(null);
      setCategories([]);
    }
  };


  const handleFileChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // const handleRemovePhoto = (url) => {
  //   Modal.confirm({
  //     title: "Are you sure you want to remove this photo?",
  //     onOk: () => {
  //       setPhotosToRemove((prev) => [...prev, url]); // Add to removal list
  //       setFileList((prev) => prev.filter((file) => file.url !== url)); // Remove from file list
  //     },
  //   });
  // };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Photos",
      dataIndex: "photos",
      key: "photos",
      render: (photos) => (
        <>
          {photos.map((photo, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                marginRight: "5px",
              }}
            >
              <img src={photo} alt="product" style={{ width: "50px" }} />
            </div>
          ))}
        </>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: ["category", "title"],
      key: "category",
    },
    {
      title: "Brand",
      dataIndex: ["brand", "title"],
      key: "brand",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          ></Button>{" "}
          <Popconfirm
            title="Are you sure to delete this product?"
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
        <h1 className="text-2xl font-bold">All Products</h1>
        <Button type="primary" onClick={() => showModal()}>
          Create Product
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Create Product"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
          form.resetFields();
          setFileList([]);
          setPhotosToRemove([]);
        }}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        className="custom-modal"
        width={1000}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title (Title has to be unique)"
            rules={[
              { required: true, message: "Please enter the product title" },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            name="sku"
            label="SKU (minimum 8 characters and has to be unique)"
            rules={[
              { required: true, message: "Please enter the product SKU" },
            ]}
          >
            <Input />
          </Form.Item> */}
          {/* <Form.Item
            name="size"
            label="Quantity"
            rules={[
              { required: true, message: "Please enter the product size" },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item name="price" label="Price" rules={[]}>
            <Input type="number" />
          </Form.Item>
          {/* <Form.Item
            name="stock"
            label="Stock"
            rules={[
              { required: true, message: "Please enter the stock quantity" },
            ]}
          >
            <Input type="number" />
          </Form.Item> */}
          <DynamicFormList
            name="model"
            label="Model"
            placeholder="Model Name"
            rules={[
              { required: true, message: "Please input your product model!" },
            ]}
          />
          <DynamicFormList
            name="advantages"
            label="Advantages"
            placeholder="Insert your advantages"
            rules={[
              { required: true, message: "Please insert your advantages!" },
            ]}
          />
          <Form.Item
            name="details"
            label="Details"
            rules={[
              { required: true, message: "Please enter the product details" },
            ]}
          >
            <ReactQuill />
          </Form.Item>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{ required: true, message: "Please select a Brand" }]}
          >
            <Select onChange={handleBrandChange}>
              {brands.map((brand) => (
                <Select.Option key={brand._id} value={brand._id}>
                  {brand.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a Category" }]}
          >
            <Select>
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {`Dynamic `}
          <Form.Item label="Photos (Max 4 Photos allowed)">
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleFileChange}
              onRemove={handleRemovePhoto}
              multiple
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
