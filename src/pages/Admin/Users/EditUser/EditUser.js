import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, Select } from "antd";
import { useFormik } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { GROUP_ID } from "../../../../utils/settings/config";
import {
	capNhatNguoiDungAction,
	layDanhSachLoaiNguoiDungAction,
	timNguoiDungCapNhat,
} from "../../../../redux/actions/QuanLyNguoiDungAction";

import * as Yup from "yup";
import { history } from "../../../../App";

const { Option } = Select;

export default function EditUser(props) {
	const [componentSize, setComponentSize] = useState("default");
	const { danhSachLoaiNguoiDung, nguoiDungCapNhat } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);

	const dispatch = useDispatch();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: nguoiDungCapNhat?.taiKhoan,
			matKhau: nguoiDungCapNhat?.matKhau,
			email: nguoiDungCapNhat?.email,
			soDt: nguoiDungCapNhat?.soDt,
			maLoaiNguoiDung: nguoiDungCapNhat?.maLoaiNguoiDung,
			hoTen: nguoiDungCapNhat?.hoTen,
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

			dispatch(capNhatNguoiDungAction(values));
		},
	});

	const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
		formik;

	useEffect(() => {
		dispatch(layDanhSachLoaiNguoiDungAction());
		dispatch(timNguoiDungCapNhat(props.match.params.taiKhoan));
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
				onSubmitCapture={handleSubmit}>
				<h3 className='text-2xl font-semibold ml-16'>Cập nhật Người Dùng</h3>
				<Form.Item label='Form Size' name='size'>
					<Radio.Group>
						<Radio.Button value='small'>Small</Radio.Button>
						<Radio.Button value='default'>Default</Radio.Button>
						<Radio.Button value='large'>Large</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='Tài khoản'>
					<Input
						disabled={true}
						name='taiKhoan'
						value={values.taiKhoan}
						onChange={handleChange}
					/>
					{errors.taiKhoan && touched.taiKhoan ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.taiKhoan}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Mật khẩu'>
					<Input
						name='matKhau'
						value={values.matKhau}
						onChange={handleChange}
					/>
					{errors.matKhau && touched.matKhau ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.matKhau}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Email'>
					<Input name='email' value={values.email} onChange={handleChange} />
					{errors.email && touched.email ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.email}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Số điện thoại'>
					<Input name='soDt' value={values.soDt} onChange={handleChange} />
					{errors.soDt && touched.soDt ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.soDt}
						</div>
					) : null}
				</Form.Item>

				<Form.Item label='Loại người dùng'>
					<Select
						name='maLoaiNguoiDung'
						value={values.maLoaiNguoiDung}
						onChange={(value) => {
							setFieldValue("maLoaiNguoiDung", value);
						}}>
						{danhSachLoaiNguoiDung.map((item, index) => {
							return (
								<Option value={item.maLoaiNguoiDung} key={index}>
									{item.tenLoai}
								</Option>
							);
						})}
					</Select>
					{errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.maLoaiNguoiDung}
						</div>
					) : null}
				</Form.Item>
				<Form.Item label='Họ tên'>
					<Input name='hoTen' value={values.hoTen} onChange={handleChange} />
					{errors.hoTen && touched.hoTen ? (
						<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
							{errors.hoTen}
						</div>
					) : null}
				</Form.Item>

				<Form.Item label='Tác vụ'>
					<Button htmlType='submit' type='primary'>
						Cập nhật
					</Button>
				</Form.Item>
			</Form>
			<Button
				className='ml-20'
				danger
				onClick={() => {
					history.goBack();
				}}>
				Quay lại
			</Button>
		</div>
	);
}
