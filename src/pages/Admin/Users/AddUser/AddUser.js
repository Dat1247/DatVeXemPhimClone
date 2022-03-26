import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ID } from "../../../../utils/settings/config";
import {
	layDanhSachLoaiNguoiDungAction,
	themNguoiDungAction,
} from "../../../../redux/actions/QuanLyNguoiDungAction";
import * as Yup from "yup";

const { Option } = Select;

export default function AddUser(props) {
	const [componentSize, setComponentSize] = useState("default");
	const { danhSachLoaiNguoiDung } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			soDt: "",
			maLoaiNguoiDung: "",
			hoTen: "",
			maNhom: "",
		},
		validationSchema: Yup.object().shape({
			taiKhoan: Yup.string().required("Tài khoản không được để trống!"),
			matKhau: Yup.string()
				.min(6, "Mật khẩu quá ngắn!")
				.max(32, "Mật khẩu quá dài!")
				.required("Mật khẩu không được để trống!"),
			email: Yup.string()
				.email("Email không hợp lệ!")
				.required("Email không được để trống!"),
			soDt: Yup.string()
				.matches(/^\d+$/, "Số điện thoại phải là số!")
				.required("Số điện thoại không được để trống!"),
			hoTen: Yup.string().required("Họ tên không được để trống!"),
			maLoaiNguoiDung: Yup.string().required("Chưa chọn loại người dùng!"),
		}),
		onSubmit: (values) => {
			values.maNhom = GROUP_ID;

			dispatch(themNguoiDungAction(values));
		},
	});

	useEffect(() => {
		dispatch(layDanhSachLoaiNguoiDungAction());
	}, []);

	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	return (
		<div>
			<Form
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 14,
				}}
				layout='horizontal'
				initialValues={{
					size: componentSize,
				}}
				onValuesChange={onFormLayoutChange}
				size={componentSize}
				onSubmitCapture={formik.handleSubmit}>
				<h3 className='text-2xl font-semibold ml-16'>Thêm Người Dùng</h3>
				<Form.Item label='Form Size' name='size'>
					<Radio.Group>
						<Radio.Button value='small'>Small</Radio.Button>
						<Radio.Button value='default'>Default</Radio.Button>
						<Radio.Button value='large'>Large</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='Tài khoản'>
					<Input name='taiKhoan' onChange={formik.handleChange} />
					{formik.errors.taiKhoan && formik.touched.taiKhoan ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{formik.errors.taiKhoan}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Mật khẩu'>
					<Input name='matKhau' onChange={formik.handleChange} />
					{formik.errors.matKhau && formik.touched.matKhau ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{formik.errors.matKhau}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Email'>
					<Input name='email' onChange={formik.handleChange} />
					{formik.errors.email && formik.touched.email ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{formik.errors.email}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Số điện thoại'>
					<Input name='soDt' onChange={formik.handleChange} />
					{formik.errors.soDt && formik.touched.soDt ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{formik.errors.soDt}
						</div>
					) : null}
				</Form.Item>

				<Form.Item label='Loại người dùng'>
					<Select
						name='maLoaiNguoiDung'
						// defaultValue={"KhachHang"}
						onChange={(value) => {
							formik.setFieldValue("maLoaiNguoiDung", value);
						}}>
						{danhSachLoaiNguoiDung.map((item, index) => {
							return (
								<Option value={item.maLoaiNguoiDung} key={index}>
									{item.tenLoai}
								</Option>
							);
						})}
					</Select>
					{formik.errors.maLoaiNguoiDung && formik.touched.maLoaiNguoiDung ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{formik.errors.maLoaiNguoiDung}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Họ tên'>
					<Input name='hoTen' onChange={formik.handleChange} />
					{formik.errors.hoTen && formik.touched.hoTen ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{formik.errors.hoTen}
						</div>
					) : null}
				</Form.Item>

				<Form.Item label='Tác vụ'>
					<Button htmlType='submit' type='primary'>
						Thêm
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
