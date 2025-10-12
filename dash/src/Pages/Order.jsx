import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Select,
  message,
  Popconfirm,
  Tooltip,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import axiosInstance from "../Components/Axios";
import logoImage from "../../src/assets/logo.png";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bankDetailsModal, setBankDetailsModal] = useState({
    visible: false,
    details: null,
  });

  // console.log(orders);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/orders");
      setOrders(data.data.doc);
    } catch (error) {
      message.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      await axiosInstance.patch(`/orders/${editingOrder._id}`, {
        orderStatus: editingOrder.orderStatus,
      });
      message.success("Order status updated successfully!");
      fetchOrders();
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    setLoading(true);
    try {
      // console.log("Deleteing Ordder Admin");
      await axiosInstance.delete(`/orders/${orderId}`);
      message.success("Order deleted successfully!");
      fetchOrders();
    } catch (error) {
      message.error("Failed to delete order");
    } finally {
      setLoading(false);
    }
  };

  function numberToWords(num) {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if (num === 0) return ""; // Return empty instead of "Zero" in recursion
    if (num < 10) return units[num];
    if (num >= 10 && num < 20) return teens[num - 10];
    if (num >= 20 && num < 100)
      return (tens[Math.floor(num / 10)] + " " + units[num % 10]).trim();
    if (num >= 100 && num < 1000)
      return (
        units[Math.floor(num / 100)] +
        " Hundred " +
        numberToWords(num % 100)
      ).trim();
    if (num >= 1000 && num < 100000)
      return (
        numberToWords(Math.floor(num / 1000)) +
        " Thousand " +
        numberToWords(num % 1000)
      ).trim();
    if (num >= 100000 && num < 10000000)
      return (
        numberToWords(Math.floor(num / 100000)) +
        " Lakh " +
        numberToWords(num % 100000)
      ).trim();
    return "Number too large";
  }

  const handlePrintInvoice = (order) => {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow.document;

    const amount = order.product.price;
    const AmountInWords = numberToWords(amount).trim();

    const invoiceContentDemo = `
          <html>
            <head>
              <title>Invoice</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 40px;
                  color: #333;
                }
                .header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 30px;
                }
                .header .logo {
                  font-size: 2rem;
                  font-weight: bold;
                }
                .header .invoice-title {
                  font-size: 1.5rem;
                  font-weight: bold;
                }
                .billing-section {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 20px;
                }
                .billing-info p, .order-info p {
                  margin: 5px 0;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                }
                th, td {
                  border: 1px solid #ccc;
                  padding: 10px;
                  text-align: left;
                }
                th {
                  background-color: #f9f9f9;
                }
                .summary {
                  text-align: right;
                }
                .summary p {
                  margin: 5px 0;
                  font-size: 1rem;
                }
                .total {
                  font-size: 1.2rem;
                  font-weight: bold;
                }
                .thank-you {
                  margin-top: 50px;
                  font-size: 1rem;
                }
                .company-info {
                   margin-bottom: 20px;
                   font-size: 1rem;
                }
                .invoice-details {
                  margin-top: 50px;
                  font-size: 1rem;
                  text-align: center;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="header">
                <div class="logo">
                  <img src="${logoImage}" alt="Company Logo" style="height: 50px;" />
                </div>
                <div class="invoice-title">INVOICE</div>
              </div>
    
              <div class="invoice-details">
                <p>Invoice</p>
              </div>
    
              <div class="billing-section">
                <div class="billing-info">
                  <p<strong><b>COMPANY:</b></strong></p>
                <p>Yousuf Engineering</p>
                <p>+88 01914314909</p>
                <p>tmcsbd.hss@gmail.com</p>
                </div>
              </div>
    
              <div class="billing-section">
                <div class="billing-info">
                  <p><strong>BILLED TO:</strong></p>
                  <p>${order.name}</p>
                  <p>${order.phone}</p>
                  <p>${order.email}</p>
                  <p>${order.streetAddress}, ${order.area}, ${order.upazilla
      }, ${order.district}, ${order.postCode}</p>
                </div>
                <div class="order-info">
                  <p><strong>Invoice No.:</strong> ${order._id.slice(0, 6)}</p>
                  <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                      <tr>
                        <td>${order.product.title}</td>
                        <td>${order.product.price} TK</td>
                      </tr>
                </tbody>
              </table>
    
              <div class="thank-you">
                <p><i>Thank you!</i></p>
              </div>
            </body>
          </html>
        `;

    const invoiceContent = `
    <html>
<head>
  <title>.</title>
  <style>
  @page {
            size: auto;
            margin: 0;
          }
          @media print {
            header, footer {
              display: none;
              visibility: hidden;
            }
          }
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      color: #333;
    }
    title {
      color: white !important;  
    }
    .header {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      letter-spacing: 5px;
    }
    .sub-header {
      text-align: center;
      font-size: 1rem;
      letter-spacing: 2px;
    }
    .invoice-box {
      border: 2px solid #000;
      padding: 15px;
    }
    .invoice-details {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      background-color: red;
    }
    .invoice-details-heading {
      text-align: center;
      margin: 10px 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #000;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f9f9f9;
    }
    .total-section {
      margin-top: 20px;
      text-align: right;
    }
    .signature-section {
        display: flex;
        position: absolute;
        bottom: 50px;
        width: 100%;
      }
      .signature-box {
        width: 30%;
        text-align: center;
        border-top: 1px solid #000;
        padding-top: 5px;
        margin-right: 20px;
      }
      .heading {
        display: flex;
        justify-content: center;
      }
      .heading-text {
        font-size: 12px;
        text-align: center;
        margin-bottom: 10px;
      }
      .heading-text div {
        margin-top: 2px
      }
      .billing-info {
        text-transform: capitalize;
      }
      .billing-info-elements-down {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
      .product-amount {
        margin: 40px 0px;
      }
      .product-condition {
        text-align: center;
      }
  </style>
</head>
<body>
  <div class="heading">
   <div class="logo">
      <img src="${logoImage}" alt="Company Logo" style="height: 50px;" />
   </div>
   <div class="heading-text">
     <div class="header">Total Machinery Bangladesh</div>
     <div class="sub-header">Total Machinery & Chemical Supplier</div>
     <div class="header-text"><b>Head Office:</b> 183/184 (1st Floor), Misco Super Market, Mirpur-1, Dhaka-1216</div>
     <div class="header-text"><b>Sales & Service Center:</b> 841/A, Shah ali Bagh, Last Corner of Misco Super Market, Cell: 01818-772935</div>
     <div class="header-text">Cell: 01914-314909, 01978-772935, E-mail: tmcsbd.hss@gmail.com</div>
     <div class="header-text"><b>Chittagong Office:</b> 215, Port City Complex (Ground Floor), Dewanhat, Chittagong</div>
     <div class="header-text">Cell: 01820144528, 01978772935, 01716173735, E-mail: shahalamtmcs@gmail.com</div>
   </div>
  </div>
    <div class="invoice-details-heading"><strong>CHALLAN / BILL</strong></div>
    <div class="invoice-details">
      <div><strong>No.:</strong> ${order._id.slice(0, 6)}</div>
      <div><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
    </div>
    <div class="billing-section">
      <div class="billing-info">
        <div class="billing-info-elements-up">
          <strong> Mr/Messers:</strong> ${order.name}
        </div>
        <div class="billing-info-elements-down">
         <div>
           <strong>Address:</strong> ${order.streetAddress}, ${order.area}, ${order.upazilla
      }, ${order.district}, ${order.postCode}
         </div>
         <div>
           <strong>Phone:</strong> ${order.phone}
         </div>
         
        </div>  
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Particulars</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${order.product.title}</td>
          <td>${order.product.price} TK</td>
        </tr>
      </tbody>
    </table>
    <div class="product-amount">Take In Word: <strong>${AmountInWords} Tk. Only</strong></div>
    <div class="product-condition"><strong>Received the above goods in good condition & found no discrepancy.</strong></div>
    <div class="signature-section">
      <div class="signature-box">Receiver's Signature</div>
      <div class="signature-box">Signature Store</div>
      <div class="signature-box">Authorized Signature</div>
    </div>
</body>
</html>`;

    doc.open();
    doc.write(invoiceContent);
    doc.close();

    iframe.contentWindow.onafterprint = () => {
      document.body.removeChild(iframe);
    };

    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    };
  };

  const showModal = (record) => {
    setEditingOrder(record);
    setIsModalOpen(true);
  };

  const showBankDetails = (details) => {
    setBankDetailsModal({ visible: true, details });
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
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => {
        let paddedText = String(text);
        return paddedText.slice(-6).padStart(6, "0");
      },
    },

    {
      width: "20%",
      title: "Products",
      key: "Products",
      render: (text, record) => (
        <>
          <p>{record?.product?.title}</p>
          <p>{record?.product?.price} Tk.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {record?.product?.photos?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Product ${index}`}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            ))}
          </div>
        </>
      ),
    },
    {
      width: "20%",
      title: "Info",
      key: "address",
      render: (text, record) => (
        <>
          <p>Name: {record.name}</p>
          <p>Phone: {record.phone}</p>
          <p>Email: {record.email}</p>
          <p>
            Address: {record.streetAddress}, {record.area}, {record.upazilla},
            {record.district}, {record.postCode}
          </p>
        </>
      ),
    },
    // {
    //   width: "10%",
    //   title: "Total Cost",
    //   dataIndex: "totalCost",
    //   key: "totalCost",
    // },
    // {
    //   width: "10%",
    //   title: "Payment method",
    //   dataIndex: "paymentMethod",
    //   key: "paymentMethod",
    //   render: (paymentMethod, record) =>
    //     paymentMethod === "Bank" ? (
    //       <span>
    //         {paymentMethod}
    //         <Tooltip title="View Bank Details">
    //           <Button
    //             type="link"
    //             icon={<InfoCircleOutlined />}
    //             onClick={() => showBankDetails(record.bankDetails)}
    //           />
    //         </Tooltip>
    //       </span>
    //     ) : (
    //       paymentMethod
    //     ),
    // },
    // {
    //   width: "10%",
    //   title: "Payment Status",
    //   dataIndex: "paymentStatus",
    //   key: "paymentStatus",
    // },

    // { title: "Order Status", dataIndex: "orderStatus", key: "orderStatus" },
    {
      width: "10%",
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Button type="default" onClick={() => handlePrintInvoice(record)}>
            Print Invoice
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this order?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title="Edit Order Status"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Select
          style={{ width: "100%" }}
          value={editingOrder?.orderStatus}
          onChange={(value) =>
            setEditingOrder((prev) => ({
              ...prev,
              orderStatus: value,
            }))
          }
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="approved">Approved</Select.Option>
          <Select.Option value="shipped">Shipped</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
          <Select.Option value="canceled">Canceled</Select.Option>
        </Select>
      </Modal>

      <Modal
        title="Bank Details"
        open={bankDetailsModal.visible}
        onCancel={() => setBankDetailsModal({ visible: false, details: null })}
        footer={null}
      >
        <div>
          <p>
            <strong>Bank Name:</strong> {bankDetailsModal.details?.bank}
          </p>
          <p>
            <strong>Method:</strong> {bankDetailsModal.details?.method}
          </p>
          <p>
            <strong>Account Name:</strong>
            {bankDetailsModal.details?.accountName}
          </p>
          <p>
            <strong>Account Number:</strong>
            {bankDetailsModal.details?.accountNumber}
          </p>
          <p>
            <strong>Date of payment:</strong>{" "}
            {new Date(bankDetailsModal.details?.dateOfPayment).toLocaleString()}
          </p>
          <p>
            <strong>Cheque Submission Date:</strong>{" "}
            {new Date(
              bankDetailsModal.details?.chequeSubmissionDate
            ).toLocaleString()}
          </p>
          <p>
            <strong>Bank Reference:</strong>
            {bankDetailsModal.details?.bankReference}
          </p>
          <p>
            <strong>Promo:</strong> {bankDetailsModal.details?.promo}
          </p>

          <img
            src={orders.find((order) => order.paymentMethod === "Bank")?.photo}
            alt="Bank transaction"
            style={{ maxWidth: "100%", marginTop: "10px" }}
          />
        </div>
      </Modal>
    </>
  );
};

export default Orders;
