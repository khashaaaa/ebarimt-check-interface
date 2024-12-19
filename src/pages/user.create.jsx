import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchUsers,
	createUser,
	deleteUser,
	resetUserCreate
} from "../redux/slices/user"
import {
	Animation,
	Button,
	Form,
	List,
	Message,
	Panel,
	Stack,
	Text,
	useToaster
} from "rsuite"
import EditIcon from "@rsuite/icons/Edit"
import CloseIcon from "@rsuite/icons/Close"

export const UserCreate = () => {
	const [errors, setErrors] = useState({})
	const dispatch = useDispatch()
	const { users, loading, success, successMessage } = useSelector(
		(state) => state.userCreate
	)

	const toaster = useToaster()

	const messageSuccess = (msg) => {
		return (
			<Message showIcon type="success" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const [formValue, setFormValue] = useState({
		parent_name: "",
		given_name: "",
		email: "",
		phone: "",
		department: "",
		password: ""
	})

	const formGroups = [
		{
			id: "parent_name",
			type: "text",
			label: "Овог",
			errMsg: errors.parent_name
		},
		{
			id: "given_name",
			type: "text",
			label: "Өөрийн нэр",
			errMsg: errors.given_name
		},
		{
			id: "email",
			type: "email",
			label: "Имэйл",
			errMsg: errors.email
		},
		{
			id: "phone",
			type: "text",
			label: "Утасны дугаар",
			errMsg: errors.phone
		},
		{
			id: "department",
			type: "text",
			label: "Алба/Хэлтэс",
			errMsg: errors.department
		},
		{
			id: "password",
			type: "password",
			label: "Нууц үг",
			errMsg: errors.password
		}
	]

	const handleSubmit = () => {
		const newErrors = {}

		if (!formValue.parent_name)
			newErrors.parent_name = "Талбарыг бөглөнө үү"
		if (!formValue.given_name) newErrors.given_name = "Талбарыг бөглөнө үү"
		if (!formValue.email) newErrors.email = "Талбарыг бөглөнө үү"
		if (!formValue.phone) newErrors.phone = "Талбарыг бөглөнө үү"
		if (!formValue.department) newErrors.department = "Талбарыг бөглөнө үү"
		if (!formValue.password) newErrors.password = "Талбарыг бөглөнө үү"

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		dispatch(createUser(formValue))
	}

	useEffect(() => {
		if (successMessage) {
			toaster.push(messageSuccess(successMessage), {
				placement: "topCenter",
				duration: 2000
			})
		}
		dispatch(fetchUsers())
	}, [successMessage])

	useEffect(() => {
		dispatch(fetchUsers())
		if (success) {
			setFormValue({
				given_name: "",
				parent_name: "",
				email: "",
				phone: "",
				department: "",
				password: ""
			})
		}
		return () => {
			dispatch(resetUserCreate())
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
					formValue={formValue}
					onChange={setFormValue}
					onSubmit={handleSubmit}
				>
					{formGroups.map(({ id, type, label, errMsg }) => (
						<Form.Group controlId={id} key={id}>
							<Form.ControlLabel>
								<Text>{label}</Text>
							</Form.ControlLabel>
							<Form.Control
								name={id}
								type={type}
								errorMessage={errMsg}
								errorPlacement="bottomStart"
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
			<Animation.Collapse in={users.response?.length > 0 ? true : false}>
				<Panel>
					<List bordered>
						{users?.response?.map((user) => (
							<List.Item key={user.id}>
								<Stack justifyContent="space-between">
									<Stack spacing={10}>
										<Text>{user.parent_name}</Text>
										<Text>{user.given_name}</Text>
										<Text>/</Text>
										<Text>{user.department}</Text>
										<Text>/</Text>
										<Text>{user.phone}</Text>
									</Stack>
									<Stack spacing={10}>
										<Button
											appearance="subtle"
											color="yellow"
										>
											<EditIcon />
										</Button>
										<Button
											onClick={() =>
												dispatch(deleteUser(user.id))
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
