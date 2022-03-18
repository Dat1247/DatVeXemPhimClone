import React from "react";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/QuanLyNguoiDungAction";
import * as Yup from "yup";

export default function Login(props) {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			taiKhoan: "",
			matKhau: "",
		},
		validationSchema: Yup.object().shape({
			taiKhoan: Yup.string().required("Tài khoản không được để trống!"),
			matKhau: Yup.string()
				.min(6, "Mật khẩu quá ngắn!")
				.max(32, "Mật khẩu quá dài!"),
		}),

		onSubmit: (values) => {
			dispatch(dangNhapAction(values));
		},
	});

	const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
		formik;

	return (
		<div className='lg:w-1/2 xl:max-w-screen-sm'>
			<div className='py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12'></div>
			<div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl'>
				<h2
					className='text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold'>
					Log in
				</h2>
				<div className='mt-12'>
					<form onSubmit={handleSubmit}>
						<div>
							<div className='text-sm font-bold text-gray-700 tracking-wide'>
								Tài khoản
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								value={values.taiKhoan}
								name='taiKhoan'
								onChange={handleChange}
								placeholder='Nhập vào tài khoản'
							/>
							{errors.taiKhoan && touched.taiKhoan ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.taiKhoan}
								</div>
							) : null}
						</div>
						<div className='mt-8'>
							<div className='flex justify-between items-center'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Mật khẩu
								</div>
								<div>
									<a
										className='text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer'>
										Quên mật khẩu
									</a>
								</div>
							</div>
							<input
								className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
								value={values.matKhau}
								name='matKhau'
								onChange={handleChange}
								placeholder='Nhập vào mật khẩu'
							/>
							{errors.matKhau && touched.matKhau ? (
								<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
									{errors.matKhau}
								</div>
							) : null}
						</div>
						<div className='mt-10'>
							<button
								className='bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg'
								type='submit'>
								Đăng Nhập
							</button>
						</div>
					</form>
					<div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
						Bạn chưa có tài khoản ?{" "}
						<NavLink
							to='/register'
							className='cursor-pointer text-indigo-600 hover:text-indigo-800'>
							Đăng ký
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
}
