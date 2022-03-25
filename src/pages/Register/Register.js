import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { dangKyAction } from "../../redux/actions/QuanLyNguoiDungAction";

export default function Register(props) {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
			email: "",
			soDt: "",
			hoTen: "",
		},
		validationSchema: Yup.object().shape({
			taiKhoan: Yup.string().required("Tài khoản không được để trống!"),
			matKhau: Yup.string()
				.min(6, "Mật khẩu quá ngắn!")
				.max(32, "Mật khẩu quá dài!")
				.required("Mật khẩu không được để trống!"),
			email: Yup.string()
				.email("Email không hợp lệ!")
				.required("Họ tên không được để trống!"),
			soDt: Yup.string()
				.matches(/^\d+$/, "Số điện thoại phải là số!")
				.required("Họ tên không được để trống!"),
			hoTen: Yup.string().required("Họ tên không được để trống!"),
		}),
		onSubmit: (values) => {
			dispatch(dangKyAction(values));
		},
	});

	return (
		<div className='lg:w-1/2 xl:max-w-screen-sm'>
			<div className='py-8 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12'></div>
			<div className='px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl'>
				<h2
					className='text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-4xl
	  xl:text-bold mb-4'>
					Đăng ký
				</h2>
				<div className='mt-8'>
					<form onSubmit={formik.handleSubmit}>
						<div>
							<div className='text-sm font-bold text-gray-700 tracking-wide'>
								Tài khoản
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='taiKhoan'
								value={formik.values.taiKhoan}
								placeholder='Nhập vào tài khoản'
								onChange={formik.handleChange}
							/>
							{formik.errors.taiKhoan && formik.touched.taiKhoan ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{formik.errors.taiKhoan}
								</div>
							) : null}
						</div>
						<div className='mt-4'>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Mật khẩu
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='matKhau'
								value={formik.values.matKhau}
								placeholder='Nhập vào mật khẩu'
								onChange={formik.handleChange}
							/>
							{formik.errors.matKhau && formik.touched.matKhau ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{formik.errors.matKhau}
								</div>
							) : null}
						</div>
						<div className='mt-4'>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Email
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='email'
								value={formik.values.email}
								placeholder='Nhập vào email'
								onChange={formik.handleChange}
							/>
							{formik.errors.email && formik.touched.email ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{formik.errors.email}
								</div>
							) : null}
						</div>
						<div className='mt-4'>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Số điện thoại
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='soDt'
								value={formik.values.soDt}
								placeholder='Nhập vào số điện thoại'
								onChange={formik.handleChange}
							/>
							{formik.errors.soDt && formik.touched.soDt ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{formik.errors.soDt}
								</div>
							) : null}
						</div>
						<div className='mt-4'>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Họ tên
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								name='hoTen'
								value={formik.values.hoTen}
								placeholder='Nhập vào họ tên'
								onChange={formik.handleChange}
							/>
							{formik.errors.hoTen && formik.touched.hoTen ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{formik.errors.hoTen}
								</div>
							) : null}
						</div>
						<div className='mt-8'>
							<button
								className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
				  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
				  shadow-lg'
								type='submit'>
								Đăng Ký
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
