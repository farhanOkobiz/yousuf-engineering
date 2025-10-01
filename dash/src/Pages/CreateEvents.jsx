import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Upload,
  DatePicker,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axiosInstance from "../Components/Axios";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { RangePicker } = DatePicker;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false); // Loading state for the OK button

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/events");
      setEvents(data.data.doc);
      setLoading(false);
    } catch (error) {
      message.error("Failed to load events");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle Create or Edit
  const handleCreateOrEdit = async (values) => {
    setConfirmLoading(true);
    const formData = new FormData();
    formData.append("heading", values.heading);
    formData.append("youtubeVideo", values.youtubeVideo);
    // formData.append("details", values.details);
    // formData.append("location", values.location);
    // formData.append("startingDate", values.dates[0].toISOString());
    // formData.append("endingDate", values.dates[1].toISOString());

    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append("photo", fileList[0].originFileObj);
    } else if (editingEvent && editingEvent.photo) {
      formData.append("photo", editingEvent.photo);
    }

    try {
      if (editingEvent) {
        await axiosInstance.patch(`/events/${editingEvent._id}`, formData);
        message.success("Event updated successfully");
      } else {
        await axiosInstance.post("/events", formData);
        message.success("Image added successfully");
      }
      setIsModalOpen(false);
      setEditingEvent(null);
      setFileList([]);
      fetchEvents();
    } catch (error) {
      message.error("Failed to save event");
    } finally {
      setConfirmLoading(false); // Set loading state to false
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/events/${id}`);
      message.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      message.error("Failed to delete event");
    }
  };

  // Handle upload change
  const handleUploadChange = ({ fileList }) => setFileList(fileList);

  // Open modal for editing
  const openEditModal = (event) => {
    setEditingEvent(event);
    form.setFieldsValue({
      heading: event.heading,
      details: event.details,
      location: event.location,
      youtubeVideo: event.youtubeVideo,
      dates: [moment(event.startingDate), moment(event.endingDate)],
    });
    setFileList([{ url: event.photo, name: "Existing Image" }]);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Heading",
      dataIndex: "heading",
      key: "heading",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) =>
        photo ? (
          <img
            src={photo}
            alt="Event"
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        ) : (
          <span>No Photo</span>
        ),
    },
    {
      title: "YouTube Video",
      dataIndex: "youtubeVideo",
      key: "youtubeVideo",
      render: (link) => {
        if (!link || link === "undefined") return <span>No Video</span>;

        const extractYouTubeId = (url) => {
          if (!url || typeof url !== "string") return null;
          const regex =
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
          const match = url.match(regex);
          return match ? match[1] : null;
        };

        const videoId = extractYouTubeId(link);
        if (!videoId) return <span>Invalid Video URL</span>;

        const embedUrl = `https://www.youtube.com/embed/${videoId}`;

        return (
          <div style={{ cursor: "pointer" }}>
            <iframe
              width="160"
              height="100"
              src={embedUrl}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          {/* Edit Button */}
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => openEditModal(record)}
          />

          {/* Delete Button */}
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Full Gallery</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingEvent(null);
            form.resetFields();
            setFileList([]);
            setIsModalOpen(true);
          }}
        >
          Add Gallery
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={events}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={
          editingEvent
            ? "Edit Photo And YouTube Video"
            : "Add Photo And YouTube Video"
        }
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={confirmLoading}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleCreateOrEdit}
          initialValues={{
            dates: [],
          }}
        >
          <Form.Item
            label="Heading"
            name="heading"
            // rules={[{ required: true, message: "Please input the heading!" }]}
          >
            <Input placeholder="Enter photo heading" />
          </Form.Item>

          <Form.Item label="YouTube Video" name="youtubeVideo">
            <Input placeholder="Paste YouTube video URL" />
          </Form.Item>

          <Form.Item label="Upload Photo">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
            >
              {fileList.length < 1 && "+ Upload"}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Events;
