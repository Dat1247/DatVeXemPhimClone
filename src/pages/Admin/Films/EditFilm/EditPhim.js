import React, { useEffect, useState } from "react";
import {
	Form,
	Input,
	Button,
	Radio,
	DatePicker,
	InputNumber,
	Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
	layThongTinPhimTheoMaAction,
	capNhatThongTinPhimUploadAction,
} from "../../../../redux/actions/QuanLyPhimAction";
import { history } from "../../../../App";

export default function EditFilm(props) {
	const [componentSize, setComponentSize] = useState("default");
	const [imgSrc, setImgSrc] = useState("");
	const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);

	const dispatch = useDispatch();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			maPhim: thongTinPhim?.maPhim,
			tenPhim: thongTinPhim?.tenPhim,
			trailer: thongTinPhim?.trailer,
			moTa: thongTinPhim?.moTa,
			ngayKhoiChieu: thongTinPhim?.ngayKhoiChieu,
			dangChieu: thongTinPhim?.dangChieu,
			sapChieu: thongTinPhim?.sapChieu,
			hot: thongTinPhim?.hot,
			danhGia: thongTinPhim?.danhGia,
			hinhAnh: null,
			maNhom: thongTinPhim?.maNhom,
		},
		onSubmit: (values) => {
			let ngayKhoiChieuMoment = moment(values.ngayKhoiChieu).format(
				"DD/MM/YYYY"
			);

			let formData = new FormData();
			for (let key in values) {
				if (key !== "hinhAnh") {
					if (key === "ngayKhoiChieu") {
						formData.append("hinhAnh", ngayKhoiChieuMoment);
					}
					formData.append(key, values[key]);
				} else {
					if (values.hinhAnh !== null) {
						formData.append("File", values.hinhAnh, values.hinhAnh.name);
					}
				}
			}

			dispatch(capNhatThongTinPhimUploadAction(formData));
		},
	});

	useEffect(() => {
		dispatch(layThongTinPhimTheoMaAction(props.match.params.id));
	}, []);

	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	const handleChangeDatePicker = (value) => {
		let ngayKhoiChieu = moment(value);
		formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
	};

	const handleChangeValue = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};

	const handleChangeFile = async (e) => {
		let file = e.target.files[0];

		if (
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "image/gif" ||
			file.type === "image/jpg"
		) {
			await formik.setFieldValue("hinhAnh", file);

			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				setImgSrc(e.target.result);
			};
		}
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
				<h3 className='text-2xl font-semibold ml-16'>
					C???p nh???t th??ng tin phim
				</h3>
				<Form.Item label='Form Size' name='size'>
					<Radio.Group>
						<Radio.Button value='small'>Small</Radio.Button>
						<Radio.Button value='default'>Default</Radio.Button>
						<Radio.Button value='large'>Large</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='M?? nh??m'>
					<Input name='maNhom' disabled={true} value={formik.values.maNhom} />
				</Form.Item>
				<Form.Item label='T??n phim'>
					<Input
						name='tenPhim'
						onChange={formik.handleChange}
						value={formik.values.tenPhim}
					/>
				</Form.Item>
				<Form.Item label='Trailer'>
					<Input
						name='trailer'
						onChange={formik.handleChange}
						value={formik.values.trailer}
					/>
				</Form.Item>
				<Form.Item label='M?? t???'>
					<Input
						name='moTa'
						onChange={formik.handleChange}
						value={formik.values.moTa}
					/>
				</Form.Item>
				<Form.Item label='Ng??y kh???i chi???u'>
					<DatePicker
						format={"DD/MM/YYYY"}
						onChange={handleChangeDatePicker}
						value={moment(formik.values.ngayKhoiChieu)}
					/>
				</Form.Item>
				<Form.Item label='??ang chi???u'>
					<Switch
						onChange={handleChangeValue("dangChieu")}
						checked={formik.values.dangChieu}
					/>
				</Form.Item>
				<Form.Item label='S???p chi???u'>
					<Switch
						onChange={handleChangeValue("sapChieu")}
						checked={formik.values.sapChieu}
					/>
				</Form.Item>
				<Form.Item label='Hot'>
					<Switch
						onChange={handleChangeValue("hot")}
						checked={formik.values.hot}
					/>
				</Form.Item>
				<Form.Item label='????nh gi??'>
					<InputNumber
						min={0}
						max={10}
						onChange={handleChangeValue("danhGia")}
						value={formik.values.danhGia}
					/>
				</Form.Item>

				<Form.Item label='H??nh ???nh'>
					<input
						type='file'
						onChange={handleChangeFile}
						accept='image/png, image/jpeg, image/gif, image/jpg'
					/>
					<br />
					<img
						src={imgSrc === "" ? thongTinPhim?.hinhAnh : imgSrc}
						style={{ width: "150px", height: "150px" }}
						alt='...'
					/>
				</Form.Item>

				<Form.Item label='T??c v???'>
					<Button htmlType='submit' type='primary'>
						C???p nh???t phim
					</Button>
				</Form.Item>
			</Form>
			<Button
				className='ml-20'
				danger
				onClick={() => {
					history.goBack();
				}}>
				Quay l???i
			</Button>
		</div>
	);
}
