import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAction } from "../../../../redux/actions/QuanLyPhimAction";
import { GROUP_ID } from "../../../../utils/settings/config";

export default function AddFilm(props) {
	const [componentSize, setComponentSize] = useState("default");
	const [imgSrc, setImgSrc] = useState("");

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			tenPhim: "",
			trailer: "",
			moTa: "",
			ngayKhoiChieu: "",
			dangChieu: false,
			sapChieu: false,
			hot: false,
			danhGia: 0,
			hinhAnh: {},
			maNhom: "",
		},
		onSubmit: (values) => {
			values.maNhom = GROUP_ID;
			let formData = new FormData();
			for (let key in values) {
				if (key !== "hinhAnh") {
					formData.append(key, values[key]);
				} else {
					formData.append("File", values.hinhAnh, values.hinhAnh.name);
				}
			}

			dispatch(themPhimUploadHinhAction(formData));
		},
	});

	const onFormLayoutChange = ({ size }) => {
		setComponentSize(size);
	};

	const handleChangeDatePicker = (value) => {
		let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
		formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
	};

	const handleChangeValue = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};

	const handleChangeFile = (e) => {
		let file = e.target.files[0];

		if (
			file.type === "image/jpeg" ||
			file.type === "image/png" ||
			file.type === "image/gif" ||
			file.type === "image/jpg"
		) {
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (e) => {
				setImgSrc(e.target.result);
			};

			formik.setFieldValue("hinhAnh", file);
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
				<h3 className='text-2xl font-semibold ml-16'>Thêm phim mới</h3>
				<Form.Item label='Form Size' name='size'>
					<Radio.Group>
						<Radio.Button value='small'>Small</Radio.Button>
						<Radio.Button value='default'>Default</Radio.Button>
						<Radio.Button value='large'>Large</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item label='Tên phim'>
					<Input name='tenPhim' onChange={formik.handleChange} />
				</Form.Item>
				<Form.Item label='Trailer'>
					<Input name='trailer' onChange={formik.handleChange} />
				</Form.Item>
				<Form.Item label='Mô tả'>
					<Input name='moTa' onChange={formik.handleChange} />
				</Form.Item>
				<Form.Item label='Ngày khởi chiếu'>
					<DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
				</Form.Item>
				<Form.Item label='Đang chiếu'>
					<Switch onChange={handleChangeValue("dangChieu")} />
				</Form.Item>
				<Form.Item label='Sắp chiếu'>
					<Switch onChange={handleChangeValue("sapChieu")} />
				</Form.Item>
				<Form.Item label='Hot'>
					<Switch onChange={handleChangeValue("hot")} />
				</Form.Item>
				<Form.Item label='Đánh giá'>
					<InputNumber
						min={0}
						max={10}
						onChange={handleChangeValue("danhGia")}
					/>
				</Form.Item>

				<Form.Item label='Hình ảnh'>
					<input
						type='file'
						onChange={handleChangeFile}
						accept='image/png, image/jpeg, image/gif, image/jpg'
					/>
					<br />
					<img
						src={
							!imgSrc
								? require("../../../../assets/img/image-error.png")
								: imgSrc
						}
						style={{ width: "150px", height: "150px" }}
						alt='...'
					/>
				</Form.Item>

				<Form.Item label='Tác vụ'>
					<Button htmlType='submit' type='primary'>
						Thêm phim
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
