import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker, InputNumber } from "antd";
import { QuanLyRapService } from "../../../services/QuanLyRapService";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { taoLichChieuAction } from "../../../redux/actions/QuanLyRapAction";
import { Notification } from "../../../components/Notification/Notification";

export default function ShowTime(props) {
	const [state, setState] = useState({
		heThongRapChieu: [],
		cumRapChieu: [],
	});
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			maPhim: props.match.params.id,
			ngayChieuGioChieu: "",
			maRap: "",
			giaVe: "",
		},
		onSubmit: (values) => {
			dispatch(taoLichChieuAction(values));
		},
	});

	const layThongTinHeThongRapShowTime = async () => {
		try {
			const result = await QuanLyRapService.layThongTinHeThongRapShowTime();

			setState({
				...state,
				heThongRapChieu: result.data.content,
			});
		} catch (err) {
			Notification(
				"error",
				"Không thể lấy thông tin hệ thống rạp!",
				err.response?.data.content
			);
		}
	};

	useEffect(() => {
		layThongTinHeThongRapShowTime();
	}, []);

	const layDanhSachCumRap = async (maHeThongRap) => {
		try {
			const result = await QuanLyRapService.layThongTinCumRapTheoHeThongRap(
				maHeThongRap
			);

			setState({
				...state,
				cumRapChieu: result.data.content,
			});
		} catch (err) {
			Notification(
				"error",
				"Không thể lấy danh sách cụm rạp!",
				err.response?.data.content
			);
		}
	};

	const handleChangeHeThongRap = (value) => {
		layDanhSachCumRap(value);
	};

	const handleChangeCumRap = (value) => {
		formik.setFieldValue("maRap", value);
	};

	const onChangeDate = (value) => {
		formik.setFieldValue(
			"ngayChieuGioChieu",
			moment(value).format("DD/MM/YYYY HH:mm:ss")
		);
	};

	const onOk = (value) => {
		formik.setFieldValue(
			"ngayChieuGioChieu",
			moment(value).format("DD/MM/YYYY HH:mm:ss")
		);
	};

	const onChangeNumber = (value) => {
		formik.setFieldValue("giaVe", value);
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
					size: "default",
				}}
				size={"default"}
				onSubmitCapture={formik.handleSubmit}>
				<h3 className='text-2xl'>Tạo lịch chiếu</h3>

				<Form.Item label='Mã phim'>
					<Input value={props.match.params.id} disabled={true} />
				</Form.Item>
				<Form.Item label='Hệ thống rạp'>
					<Select onChange={handleChangeHeThongRap}>
						{state.heThongRapChieu.map((htr, index) => {
							return (
								<Select.Option value={htr.maHeThongRap} key={index}>
									{htr.tenHeThongRap}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item label='Cụm rạp'>
					<Select onChange={handleChangeCumRap}>
						{state.cumRapChieu.map((cumRap, index) => {
							return (
								<Select.Option value={cumRap.maCumRap} key={index}>
									{cumRap.tenCumRap}
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>

				<Form.Item label='Ngày chiếu giờ chiếu'>
					<DatePicker
						showTime
						format='DD/MM/YYYY HH:mm:ss'
						onChange={onChangeDate}
						onOk={onOk}
					/>
				</Form.Item>
				<Form.Item label='Giá vé'>
					<InputNumber min={75000} max={150000} onChange={onChangeNumber} />
				</Form.Item>
				<Form.Item label='Tác vụ'>
					<Button htmlType='submit'>Thêm lịch chiếu</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
