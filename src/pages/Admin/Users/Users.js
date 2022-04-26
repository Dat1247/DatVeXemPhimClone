import { Button, Input, Table, Popconfirm, Tag } from "antd";
import {
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import {
	layDanhSachNguoiDungAction,
	timKiemNguoiDungAction,
	xoaNguoiDungAction,
} from "../../../redux/actions/QuanLyNguoiDungAction";

const { Search } = Input;

export default function Users(props) {
	const { danhSachNguoiDung } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layDanhSachNguoiDungAction());
	}, []);

	const columns = [
		{
			title: "Tài khoản",
			dataIndex: "taiKhoan",
			sorter: (a, b) => {
				let taiKhoanA = a.taiKhoan.toLowerCase().trim();
				let taiKhoanB = b.taiKhoan.toLowerCase().trim();

				if (taiKhoanA > taiKhoanB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "20%",
		},
		{
			title: "Họ tên",
			dataIndex: "hoTen",
			sorter: (a, b) => {
				let hoTenA = a.hoTen.toLowerCase().trim();
				let hoTenB = b.hoTen.toLowerCase().trim();

				if (hoTenA > hoTenB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "20%",
		},
		{
			title: "Email",
			dataIndex: "email",
			width: "20%",
		},
		{
			title: "Số ĐT",
			dataIndex: "soDt",
			width: "15%",
		},
		{
			title: "Loại người dùng",
			dataIndex: "maLoaiNguoiDung",
			filters: [
				{
					text: "Quản Trị",
					value: "QuanTri",
				},
				{
					text: "Khách hàng",
					value: "KhachHang",
				},
			],
			onFilter: (value, record) => {
				return record.maLoaiNguoiDung.indexOf(value) === 0;
			},
			render: (text, record, index) => {
				let color = text === "KhachHang" ? "green" : "geekblue";
				return <Tag color={color}>{text}</Tag>;
			},
			sorter: (a, b) => {
				let maLoaiNguoiDungA = a.maLoaiNguoiDung.toLowerCase().trim();
				let maLoaiNguoiDungB = b.maLoaiNguoiDung.toLowerCase().trim();

				if (maLoaiNguoiDungA > maLoaiNguoiDungB) {
					return 1;
				}
				return -1;
			},
			width: "15%",
		},
		{
			title: "Action",
			dataIndex: "",
			render: (text, record, index) => {
				return (
					<Fragment>
						<NavLink
							to={`/admin/users/edit/${record.taiKhoan}`}
							className=' text-green-500  mr-4  hover:text-green-800  '
							style={{ transition: "all 0.5s" }}>
							<EditOutlined className=' text-xl' />
						</NavLink>

						<Popconfirm
							placement='top'
							title={"Bạn muốn xóa người dùng này?"}
							onConfirm={() => {
								dispatch(xoaNguoiDungAction(record.taiKhoan));
							}}
							okText='Yes'
							cancelText='No'>
							<button
								className='text-red-400  mr-4  hover:text-red-800'
								style={{ transition: "all 0.5s" }}>
								<DeleteOutlined className=' text-xl' />
							</button>
						</Popconfirm>
					</Fragment>
				);
			},
			width: "10%",
		},
	];

	const onSearch = (value) => {
		if (value === "") {
			dispatch(layDanhSachNguoiDungAction());
		}
		dispatch(timKiemNguoiDungAction(value));
	};

	return (
		<div className=''>
			<h3 className='text-2xl'>Quản lý người dùng</h3>
			<Button
				className='mb-4'
				onClick={() => {
					history.push("/admin/users/adduser");
				}}>
				Thêm người dùng
			</Button>
			<Search
				placeholder='Tìm kiếm người dùng'
				allowClear
				enterButton={<SearchOutlined />}
				size='large'
				onSearch={onSearch}
				className='mb-4'
			/>
			<Table
				columns={columns}
				dataSource={danhSachNguoiDung}
				rowKey={"taiKhoan"}
			/>
		</div>
	);
}
