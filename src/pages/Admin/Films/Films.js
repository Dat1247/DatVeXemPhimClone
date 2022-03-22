import React, { Fragment, useEffect } from "react";
import { Button, Input, Table } from "antd";
import {
	SearchOutlined,
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { layDanhSachPhimAction } from "../../../redux/actions/QuanLyPhimAction";
import { NavLink } from "react-router-dom";

const { Search } = Input;

export default function Films(props) {
	const { arrPhimDefault } = useSelector((state) => state.QuanLyPhimReducer);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layDanhSachPhimAction());
	}, []);

	console.log(arrPhimDefault);

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
							to='/'
							className=' text-green-500  mr-4  hover:text-green-800  '
							style={{ transition: "all 0.5s" }}>
							<EditOutlined className=' text-2xl' />
						</NavLink>
						<NavLink
							to='/'
							className='text-red-400  mr-4  hover:text-red-800'
							style={{ transition: "all 0.5s" }}>
							<DeleteOutlined className=' text-2xl' />
						</NavLink>
					</Fragment>
				);
			},
			width: "15%",
		},
	];

	const onSearch = (value) => console.log(value);
	function onChange(pagination, filters, sorter, extra) {
		console.log("params", pagination, filters, sorter, extra);
	}
	return (
		<div className=''>
			<h3 className='text-2xl'>Quản lý phim</h3>
			<Button className='mb-4'>Thêm phim</Button>
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
