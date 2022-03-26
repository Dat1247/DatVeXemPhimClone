import React, { useEffect } from "react";
import { Button, Form, Input, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
	capNhatNguoiDungAction,
	layThongTinNguoiDungAction,
} from "../../redux/actions/QuanLyNguoiDungAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import _ from "lodash";
import moment from "moment";
import { USER_LOGIN } from "../../utils/settings/config";
import { Redirect } from "react-router-dom";

const { TabPane } = Tabs;

export default function Profile(props) {
	const { thongTinNguoiDung, thongTinDangNhap } = useSelector(
		(state) => state.QuanLyNguoiDungReducer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(layThongTinNguoiDungAction());
	}, []);

	if (!localStorage.getItem(USER_LOGIN)) {
		alert("Bạn cần đăng nhập để truy cập vào trang này!");
		return <Redirect to='/login' />;
	}

	return (
		<div>
			<div
				style={{
					backgroundImage: "url('https://picsum.photos/2000')",
					height: "350px",
					color: "#fff",
					lineHeight: "160px",
					textAlign: "center",
					backgroundPosition: "center",
					backgroundSize: "100%",
					backgroundRepeat: "no-repeat",
				}}>
				<img
					src='https://picsum.photos/2000'
					className='w-full opacity-0 h-full'
					alt='banner'
				/>
			</div>
			<div className='bg-indigo-100 '>
				<div className='md:container md:py-20 p-20'>
					<Tabs defaultActiveKey='1'>
						<TabPane tab='01 THÔNG TIN TÀI KHOẢN' key='1'>
							<ThongTinTaiKhoan
								thongTinNguoiDung={thongTinNguoiDung}
								thongTinDangNhap={thongTinDangNhap}
								dispatch={dispatch}
							/>
						</TabPane>
						<TabPane tab='02 LỊCH SỬ ĐẶT VÉ' key='2'>
							<LichSuDatVe thongTinNguoiDung={thongTinNguoiDung} />
						</TabPane>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

const ThongTinTaiKhoan = (props) => {
	const { thongTinNguoiDung, thongTinDangNhap, dispatch } = props;

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taiKhoan: thongTinNguoiDung.taiKhoan,
			matKhau: thongTinNguoiDung.matKhau,
			email: thongTinNguoiDung.email,
			soDT: thongTinNguoiDung.soDT,
			maLoaiNguoiDung: thongTinDangNhap.maLoaiNguoiDung,
			hoTen: thongTinNguoiDung.hoTen,
			maNhom: thongTinNguoiDung.maNhom,
		},
		validationSchema: Yup.object().shape({
			matKhau: Yup.string()
				.min(6, "Mật khẩu quá ngắn!")
				.max(32, "Mật khẩu quá dài!")
				.required("Mật khẩu không được để trống!"),
			email: Yup.string()
				.email("Email không hợp lệ!")
				.required("Email không được để trống!"),
			soDT: Yup.string()
				.matches(/^\d+$/, "Số điện thoại phải là số!")
				.required("Số điện thoại không được để trống!"),
			hoTen: Yup.string().required("Họ tên không được để trống!"),
		}),
		onSubmit: (values) => {
			dispatch(capNhatNguoiDungAction(values));
		},
	});

	const { values, errors, touched, handleChange, handleSubmit } = formik;

	return (
		<Form onSubmitCapture={handleSubmit} size='large'>
			<div className='grid md:grid-cols-2 md:gap-10 mt-4'>
				<div className='col-span-1'>
					<Form.Item label='Tài khoản'>
						<Input
							name='taiKhoan'
							disabled={true}
							value={values.taiKhoan}
							onChange={handleChange}
						/>
						{errors.taiKhoan && touched.taiKhoan ? (
							<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
								{errors.taiKhoan}
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
					<Form.Item label='Email'>
						<Input name='email' value={values.email} onChange={handleChange} />
						{errors.email && touched.email ? (
							<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
								{errors.email}
							</div>
						) : null}
					</Form.Item>
					<Form.Item label='Loại người dùng'>
						<Input
							name='maLoaiNguoiDung'
							value={values.maLoaiNguoiDung}
							disabled={true}
							onChange={handleChange}
						/>
						{errors.maLoaiNguoiDung && touched.maLoaiNguoiDung ? (
							<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
								{errors.maLoaiNguoiDung}
							</div>
						) : null}
					</Form.Item>
				</div>
				<div className='col-span-1'>
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
					<Form.Item label='Số điện thoại'>
						<Input name='soDT' value={values.soDT} onChange={handleChange} />
						{errors.soDT && touched.soDT ? (
							<div className='text-red-500' style={{ fontSize: "0.8rem" }}>
								{errors.soDT}
							</div>
						) : null}
					</Form.Item>
					<Form.Item label='Mã nhóm'>
						<Input
							name='maNhom'
							disabled={true}
							value={values.maNhom}
							onChange={handleChange}
						/>
					</Form.Item>
					<div className='text-right'>
						<Button htmlType='submit' type='primary'>
							Cập nhật
						</Button>
					</div>
				</div>
			</div>
		</Form>
	);
};

const LichSuDatVe = (props) => {
	const renderTicketItem = () => {
		return props.thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
			const seats = _.first(ticket.danhSachGhe);

			return (
				<div className='p-2  w-full' key={index}>
					<div
						className='h-full flex items-center border-gray-200 border p-4 rounded-lg bg-gray-100'
						style={{
							boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.2)",
						}}>
						<img
							alt='team'
							className='w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4'
							src={ticket.hinhAnh}
						/>
						<div className='flex-grow'>
							<h2 className='text-gray-900 title-font font-bold text-lg'>
								{ticket.tenPhim}
							</h2>
							<p className='text-gray-500'>
								Ngày đặt vé:
								{moment(ticket.ngayDat).format(" hh:mm A - DD-MM-YYYY")}
							</p>
							<p>
								Địa điểm: {seats.tenHeThongRap} - {seats.tenCumRap}
							</p>
							<p>
								Ghế:{" "}
								{ticket.danhSachGhe?.map((ghe, index) => {
									return (
										<span key={index} className='text-green-800 pr-1 font-bold'>
											{"[ "}
											{ghe.tenGhe}
											{" ]"}
										</span>
									);
								})}
							</p>
						</div>
					</div>
				</div>
			);
		});
	};
	return (
		<section className='text-gray-600 body-font' style={{ marginTop: "1rem" }}>
			<div className='container px-5 mx-auto'>
				<div className='flex flex-col text-center w-full '>
					<h1 className='sm:text-3xl text-2xl font-bold title-font mb-4 text-purple-900 text-2xl'>
						LỊCH SỬ ĐẶT VÉ
					</h1>
				</div>
				<div
					className='grid grid-cols-1 lg:gap-10 lg:grid-cols-2'
					style={{ maxHeight: 500, overflowY: "auto" }}>
					{renderTicketItem()}
				</div>
			</div>
		</section>
	);
};
