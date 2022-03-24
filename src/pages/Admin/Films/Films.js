import React, { Fragment, useEffect } from "react";
import { Button, Input, Table, Popconfirm } from "antd";
import {
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
	ScheduleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
	layDanhSachPhimAction,
	xoaPhimAction,
} from "../../../redux/actions/QuanLyPhimAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";

const { Search } = Input;

export default function Films(props) {
	const { arrPhimDefault } = useSelector((state) => state.QuanLyPhimReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layDanhSachPhimAction());
	}, []);

	const columns = [
		{
			title: "Mã phim",
			dataIndex: "maPhim",
			sorter: (a, b) => a.maPhim - b.maPhim,
			sortDirections: ["descend"],
			width: "10%",
		},
		{
			title: "Tên phim",
			dataIndex: "tenPhim",
			sorter: (a, b) => {
				let tenPhimA = a.tenPhim.toLowerCase().trim();
				let tenPhimB = b.tenPhim.toLowerCase().trim();

				if (tenPhimA > tenPhimB) {
					return 1;
				}
				return -1;
			},
			sortDirections: ["descend", "ascend"],
			width: "30%",
		},
		{
			title: "Hình ảnh",
			dataIndex: "hinhAnh",
			render: (text, record, index) => {
				return (
					<Fragment>
						<img
							src={record.hinhAnh}
							alt={record.tenPhim}
							style={{ width: 70, height: 100 }}
							onError={(e) => {
								e.target.onError = null;
								e.target.src = `https://picsum.photos/id/${index}/100`;
							}}
						/>
					</Fragment>
				);
			},
			width: "15%",
		},
		{
			title: "Mô tả",
			dataIndex: "moTa",
			render: (text, record, index) => {
				return (
					<div>{text.length > 100 ? text.slice(0, 100) + "..." : text}</div>
				);
			},
			width: "30%",
		},
		{
			title: "Action",
			dataIndex: "",
			render: (text, record, index) => {
				return (
					<Fragment>
						<NavLink
							to={`/admin/films/edit/${record.maPhim}`}
							className=' text-green-500  mr-4  hover:text-green-800  '
							style={{ transition: "all 0.5s" }}>
							<EditOutlined className=' text-2xl' />
						</NavLink>

						<Popconfirm
							placement='top'
							title={"Bạn muốn xóa phim này?"}
							onConfirm={() => {
								dispatch(xoaPhimAction(record.maPhim));
							}}
							okText='Yes'
							cancelText='No'>
							<button
								className='text-red-400  mr-4  hover:text-red-800'
								style={{ transition: "all 0.5s" }}>
								<DeleteOutlined className=' text-2xl' />
							</button>
						</Popconfirm>

						<NavLink
							to={`/admin/films/showtime/${record.maPhim}`}
							className='text-teal-400  mr-4  hover:text-teal-800'
							style={{ transition: "all 0.5s" }}>
							<ScheduleOutlined className=' text-2xl' />
						</NavLink>
					</Fragment>
				);
			},
			width: "15%",
		},
	];

	const onSearch = (value) => {
		dispatch(layDanhSachPhimAction(value));
	};
	function onChange(pagination, filters, sorter, extra) {
		console.log("params", pagination, filters, sorter, extra);
	}
	return (
		<div className=''>
			<h3 className='text-2xl'>Quản lý phim</h3>
			<Button
				className='mb-4'
				onClick={() => {
					history.push("/admin/films/addfilm");
				}}>
				Thêm phim
			</Button>
			<Search
				placeholder='Tìm kiếm phim'
				allowClear
				enterButton={<SearchOutlined />}
				size='large'
				onSearch={onSearch}
				className='mb-4'
			/>
			<Table
				columns={columns}
				dataSource={arrPhimDefault}
				onChange={onChange}
				rowKey={"maPhim"}
			/>
		</div>
	);
}
