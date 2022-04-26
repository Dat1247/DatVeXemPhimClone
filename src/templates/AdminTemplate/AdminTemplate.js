import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { Layout, Menu } from "antd";
import {
	DesktopOutlined,
	TeamOutlined,
	UserOutlined,
	DiffOutlined,
	UserAddOutlined,
	FundOutlined,
} from "@ant-design/icons";
import { history } from "../../App";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

export const AdminTemplate = (props) => {
	const { Component, ...restProps } = props;

	const { thongTinDangNhap } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const [state, setState] = useState({
		collapsed: true,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	});

	const onCollapse = (collapsed) => {
		setState({ collapsed });
	};

	if (!localStorage.getItem(USER_LOGIN)) {
		alert("Bạn không có quyền truy cập trang này!");
		return <Redirect to='/' />;
	}

	if (thongTinDangNhap.maLoaiNguoiDung !== "QuanTri") {
		alert("Bạn không có quyền truy cập trang này!");
		return <Redirect to='/' />;
	}

	return (
		<>
			<Layout style={{ minHeight: "100vh" }}>
				<Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
					<div className='logo' />
					<Menu theme='dark' defaultSelectedKeys={["1"]} mode='inline'>
						<SubMenu key='sub1' icon={<TeamOutlined />} title='Users'>
							<Menu.Item
								key='1'
								icon={<UserOutlined />}
								onClick={() => {
									history.push("/admin/users");
								}}>
								Users
							</Menu.Item>
							<Menu.Item
								key='2'
								icon={<UserAddOutlined />}
								onClick={() => {
									history.push("/admin/users/adduser");
								}}>
								Add User
							</Menu.Item>
						</SubMenu>
						<SubMenu key='sub2' icon={<FundOutlined />} title='Films'>
							<Menu.Item
								key='3'
								icon={<DesktopOutlined />}
								onClick={() => {
									history.push("/admin/films");
								}}>
								Films
							</Menu.Item>
							<Menu.Item
								key='4'
								icon={<DiffOutlined />}
								onClick={() => {
									history.push("/admin/films/addfilm");
								}}>
								Add Film
							</Menu.Item>
						</SubMenu>
					</Menu>
				</Sider>
				<Layout className='site-layout'>
					<Header
						className='site-layout-background'
						style={{ backgroundColor: "transparent", padding: "0" }}>
						<div
							className='flex items-center  justify-end pr-4 '
							style={{ boxShadow: "0 0 10px 4px rgba(0,0,0,0.1)" }}>
							<button
								className='mr-2 flex flex-col items-center'
								onClick={() => {
									history.push("/profile");
								}}>
								<div className='flex justify-center items-center w-10 h-10 rounded-full bg-red-200'>
									{thongTinDangNhap.taiKhoan.substr(0, 1)}
								</div>
							</button>
							<button
								onClick={() => {
									localStorage.removeItem(USER_LOGIN);
									localStorage.removeItem(TOKEN);
									history.push("/");
									window.location.reload();
								}}
								className='text-red-500 hover:text-red-800 duration-500'>
								Đăng xuất
							</button>
						</div>
					</Header>
					<Content>
						{/* <Breadcrumb style={{ margin: "16px 0" }}>
							<Breadcrumb.Item>User</Breadcrumb.Item>
							<Breadcrumb.Item>Bill</Breadcrumb.Item>
						</Breadcrumb> */}
						<div
							className='site-layout-background'
							style={{ padding: 24, minHeight: 360 }}>
							<Route
								{...restProps}
								render={(propsRoute) => {
									return (
										<Fragment>
											<Component {...propsRoute} />
										</Fragment>
									);
								}}
							/>
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	);
};
