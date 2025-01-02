import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchAccess,
	createAccess,
	deleteAccess,
	resetState
} from "../redux/slices/access"
import { fetchUsers } from "../redux/slices/user"
import {
	Panel,
	Form,
	Button,
	Stack,
	SelectPicker,
	Whisper,
	Popover,
	Text,
	Animation,
	List,
	useToaster,
	Message
} from "rsuite"
import HelpOutlineIcon from "@rsuite/icons/HelpOutline"
import CloseIcon from "@rsuite/icons/Close"

const HelpTooltip = ({ speaker }) => (
	<Whisper
		placement="rightStart"
		trigger="hover"
		controlId="control-id-hover"
		speaker={speaker}
		style={{ cursor: "pointer", marginLeft: "5px" }}
	>
		<HelpOutlineIcon color="#337ed4" />
	</Whisper>
)

export const AccessCreate = () => {
	const [formKey, setFormKey] = useState(Date.now())
	const [errors, setErrors] = useState({})
	const dispatch = useDispatch()
	const { data, loading, success, successMessage } = useSelector(
		(state) => state.accessSlice
	)
	const { users } = useSelector((state) => state.userSlice)

	const toaster = useToaster()

	const messageSuccess = (msg) => {
		return (
			<Message showIcon type="success" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const [formValue, setFormValue] = useState({
		user_id: "",
		user_name: "",
		path_url: "",
		path_name: "",
		type_const: "",
		type_name: ""
	})

	const userData = users?.response?.map((user) => ({
		label: `${user.parent_name} ${user.given_name}`,
		value: user.id
	}))

	const pathData = [
		{ label: "Сугалааны дугаар нэмэх", value: "barimt/lottery" },
		{ label: "Баримт шивэх", value: "barimt/type" },
		{ label: "Баримт хайх", value: "barimt/find" },
		{ label: "Баримт устгах", value: "barimt/delete" },
		{ label: "Байгууллага шалгах", value: "org/find" },
		{ label: "Салбар шалгах", value: "org/branch/find" },
		{ label: "Хэрэглэгч нэмэх", value: "user/create" },
		{ label: "Хэрэглэгч харах", value: "user/list" },
		{ label: "Эрх тохируулах", value: "access" }
	]

	const typeData = [
		{ label: "Хэрэглэгч", value: "EDITOR" },
		{ label: "Админ", value: "MODIFIER" }
	]

	const tooltips = {
		user: <Popover>Бүртгэлтэй хэрэглэгчийг сонгох</Popover>,
		path: <Popover>Эрх тохируулах хуудасны нэрийг сонгох</Popover>,
		type: (
			<Popover>
				<p>Үзэх: Хэрэглэгч тухайн хуудсыг зөвхөн үзэх эрхтэй</p>
				<p>
					Өөрчлөх: Хэрэглэгч шинээр мэдээлэл оруулах, түүнийгээ
					өөрчлөх эрхтэй
				</p>
				<p>
					Зохицуулах: Хэрэглэгч шинээр мэдээлэл оруулах, өөрчлөх,
					устгах эрхтэй
				</p>
			</Popover>
		)
	}

	const formGroups = [
		{
			id: "user",
			label: "Хэрэглэгч",
			data: users?.response ? userData : [],
			tooltip: tooltips.user,
			errMsg: errors.user_id
		},
		{
			id: "path",
			label: "Цэс",
			data: pathData,
			tooltip: tooltips.path,
			errMsg: errors.path_url
		},
		{
			id: "type",
			label: "Эрхийн төрөл",
			data: typeData,
			tooltip: tooltips.type,
			errMsg: errors.type_const
		}
	]

	const handleChange = (value, name) => {
		let label = ""
		switch (name) {
			case "user":
				label = userData.find((item) => item.value === value)?.label
				setFormValue((prev) => ({
					...prev,
					user_id: value,
					user_name: label || ""
				}))
				break
			case "path":
				label = pathData.find((item) => item.value === value)?.label
				setFormValue((prev) => ({
					...prev,
					path_url: value,
					path_name: label || ""
				}))
				break
			case "type":
				label = typeData.find((item) => item.value === value)?.label
				setFormValue((prev) => ({
					...prev,
					type_const: value,
					type_name: label || ""
				}))
				break
			default:
				break
		}
	}

	const handleSubmit = () => {
		const newErrors = {}

		if (!formValue.user_id) newErrors.user_id = "Талбарыг бөглөнө үү"
		if (!formValue.user_name) newErrors.user_name = "Талбарыг бөглөнө үү"
		if (!formValue.path_url) newErrors.path_url = "Талбарыг бөглөнө үү"
		if (!formValue.path_name) newErrors.path_name = "Талбарыг бөглөнө үү"
		if (!formValue.type_const) newErrors.type_const = "Талбарыг бөглөнө үү"
		if (!formValue.type_name) newErrors.type_name = "Талбарыг бөглөнө үү"

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		dispatch(
			createAccess({
				user_id: formValue.user,
				user_name: formValue.user_name,
				path_url: formValue.path,
				path_name: formValue.path_name,
				type_const: formValue.type,
				type_name: formValue.type_name
			})
		)
		setFormKey(Date.now())
	}

	useEffect(() => {
		if (successMessage) {
			toaster.push(messageSuccess(successMessage), {
				placement: "topCenter",
				duration: 2000
			})
		}
		dispatch(fetchAccess())
	}, [successMessage])

	useEffect(() => {
		dispatch(fetchUsers())
		dispatch(fetchAccess())
		if (success) {
			setFormValue({
				user_id: "",
				user_name: "",
				path_url: "",
				path_name: "",
				type_const: "",
				type_name: ""
			})
		}
		return () => {
			dispatch(resetState())
		}
	}, [success, dispatch])

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gridColumnGap: "1rem"
			}}
		>
			<Panel>
				<Form
					fluid
					key={formKey}
					formValue={formValue}
					onChange={(formValue) => {
						setFormValue(formValue)
					}}
					onSubmit={handleSubmit}
				>
					{formGroups.map(({ id, label, data, tooltip, errMsg }) => (
						<Form.Group controlId={id} key={id}>
							<Form.ControlLabel
								style={{
									display: "flex",
									alignItems: "center"
								}}
							>
								<Text style={{ marginRight: "5px" }}>
									{label}
								</Text>
								<HelpTooltip speaker={tooltip} />
							</Form.ControlLabel>
							<Form.Control
								name={id}
								accepter={SelectPicker}
								data={data}
								searchable={false}
								onChange={(value) => handleChange(value, id)}
								errorMessage={errMsg}
								errorPlacement="bottomStart"
								style={{ width: "100%" }}
							/>
						</Form.Group>
					))}
					<Form.Group>
						<Stack justifyContent="flex-end">
							<Button
								type="submit"
								appearance="primary"
								loading={loading}
							>
								Хадгалах
							</Button>
						</Stack>
					</Form.Group>
				</Form>
			</Panel>
			<Animation.Collapse in={data?.response?.length > 0 ? true : false}>
				<Panel>
					<List bordered>
						{data?.response?.map((access) => (
							<List.Item key={access.id}>
								<Stack justifyContent="space-between">
									<Stack
										justifyContent="space-between"
										spacing={10}
									>
										<Text>{access.user_name}</Text>
										<Text>/</Text>
										<Text>{access.path_name}</Text>
										<Text>/</Text>
										<Text>{access.type_name}</Text>
									</Stack>
									<Stack spacing={10}>
										<Button
											onClick={() =>
												dispatch(
													deleteAccess(access.id)
												)
											}
											appearance="subtle"
											color="red"
										>
											<CloseIcon />
										</Button>
									</Stack>
								</Stack>
							</List.Item>
						))}
					</List>
				</Panel>
			</Animation.Collapse>
		</div>
	)
}
