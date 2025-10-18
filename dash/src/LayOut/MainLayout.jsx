import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  // FileOutlined,
  // TeamOutlined,
} from "@ant-design/icons";
import { IoMdLogOut } from "react-icons/io";

import { Button, Layout, Menu, theme, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Home from "../Pages/DashBoardHome";
import Order from "../Pages/Order";
// import { Input } from "antd";
import UploadBanner from "../Pages/UploadBanner";
import AddCategory from "../Pages/Category";
import UploadProduct from "../Pages/UploadProduct";
import AllProduct from "../Pages/AllProduct";
import { useDispatch } from "react-redux";
import logoImage from "../../src/assets/yousuf-logo.png";
import CreateBlog from "../Pages/CreateBlog";
import AllBlog from "../Pages/AllBlog";
import CreateStories from "../Pages/CreateStories";
import AllStories from "../Pages/AllStories";
import CreateServices from "../Pages/CreateServices";
import AllServices from "../Pages/AllServices";
import CreateEvents from "../Pages/CreateEvents";
import AllEvents from "../Pages/AllEvents";
import CreatePartners from "../Pages/CreatePartners";
import AllPartners from "../Pages/AllPartners";
import AllContact from "../Pages/AllContact";
import Discount from "../Pages/Discount";
import { logoutUser } from "../Slices/userSlices";
import { MdEmojiEvents } from "react-icons/md";
import { CiShop, CiShoppingTag } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
// import { FaBlogger } from "react-icons/fa";
// import { LiaHistorySolid } from "react-icons/lia";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { GiKnightBanner } from "react-icons/gi";
// import { RiDiscountPercentFill } from "react-icons/ri";
import Brand from "../Pages/Brand";

// const { Search } = Input;
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    localStorage.getItem("selectedMenuItem") || "1"
  );
  const [hideLayout, setHideLayout] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuItemClick = (key) => {
    setSelectedMenuItem(key);
    localStorage.setItem("selectedMenuItem", key);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    }
    const lastAccessTime = localStorage.getItem("lastAccessTime");
    if (lastAccessTime) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - parseInt(lastAccessTime, 10);
      if (elapsedTime > 7 * 24 * 60 * 60 * 1000) {
        setHideLayout(true); // Hide layout after 7 days
      }
    }

    // Update the access time on page load
    localStorage.setItem("lastAccessTime", new Date().getTime().toString());
  }, [navigate]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  let content = null;
  switch (selectedMenuItem) {
    case "1":
      content = <Home />;
      break;
    case "2":
      content = <Order />;
      break;
    case "3":
      content = <Brand />;
      break;
    case "4":
      content = <AddCategory />;
      break;
    case "5":
      content = <UploadProduct />;
      break;

    case "6":
      content = <AllProduct />;
      break;

    case "7":
      content = <CreateBlog />;
      break;
    case "8":
      content = <AllBlog />;
      break;

    case "9":
      content = <CreateStories />;
      break;
    case "10":
      content = <AllStories />;
      break;
    case "11":
      content = <CreateServices />;
      break;
    case "12":
      content = <AllServices />;
      break;
    case "13":
      content = <CreateEvents />;
      break;
    case "14":
      content = <AllEvents />;
      break;

    case "15":
      content = <CreatePartners />;
      break;

    case "16":
      content = <AllPartners />;
      break;
    case "17":
      content = <AllContact />;
      break;
    case "18":
      content = <UploadBanner />;
      break;
    case "19":
      content = <Discount />;
      break;
    default:
      content = (
        <div className="text-center text-xl font-bold py-10">
          Okobiz Default Content
        </div>
      );
  }

  let items = [
    getItem(" All Users", "1", <UserOutlined />),
    getItem(" Orders", "2", <CiShop />),
    getItem("Category", "3", <CiShoppingTag />),
    getItem("Brand", "4", <BiCategory />),
    getItem(" Product", "5", <UploadOutlined />),
    getItem(" Services", "11", <RiCustomerService2Line />),
    getItem(" Blog category ", "7", <MdEmojiEvents />),
    getItem("blog", "8", <MdEmojiEvents />),
    getItem(" Gallery", "13", <MdEmojiEvents />),
    getItem(" Partners", "15", <FaUserFriends />),
    getItem("All Contact", "17", <MdContacts />),
    getItem("ADD Banner", "18", <GiKnightBanner />),
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutUser());
    message.success("You have been logged out!");
    navigate("/");
  };
  return (
    <Layout hasSider>
      {!hideLayout && (
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="text-white mx-auto font-bold text-2xl w-[70px]  xl:h-[50px] leading-[80px] text-center rounded-full my-10 ">
            <img src={logoImage} />
          </div>
          <div>
            <Menu
              theme="dark"
              className="text-white !font-bold mt-4"
              onClick={({ key }) => handleMenuItemClick(key)}
              defaultSelectedKeys={["sub1"]}
              mode="inline"
              selectedKeys={[selectedMenuItem]}
              items={items}
            />
          </div>
        </Sider>
      )}
      {/* <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="text-white mx-auto font-bold text-2xl w-[80px] h-[80px] leading-[80px] text-center rounded-full my-10 ">
          <img src={logoImage} />
        </div>
        <Menu
          theme="dark"
          className="text-white !font-bold"
          onClick={({ key }) => handleMenuItemClick(key)}
          defaultSelectedKeys={["sub1"]}
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          items={items}
        />
      </Sider> */}
      <Layout
        style={{
          marginLeft: collapsed ? 70 : 200, // Adjust marginLeft dynamically
        }}
      >
        <Header
          style={{
            padding: 0,
            background: theme.useToken().token.colorBgContainer,
          }}
        >
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div
              className="cursor-pointer font-medium mr-10"
              onClick={handleLogout}
            >
              <IoMdLogOut size={30} />
            </div>
          </div>
        </Header>
        <Content
          className="bg-[#F6F8FA] px-5 pb-20 overflow-hidden"
          style={{
            overflow: "initial",
          }}
        >
          {content}
        </Content>
        <h1 className="my-10 " style={{ textAlign: "center" }}>
          Developed by{" "}
          <Link className="font-bold text-black" to={"https://okobiz.com"}>
            okobiz
          </Link>
        </h1>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
