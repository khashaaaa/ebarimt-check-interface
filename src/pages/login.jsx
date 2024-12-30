import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
	Button,
	Form,
	Heading,
	Message,
	Panel,
	Stack,
	Text,
	useToaster
} from "rsuite"
import { loginProceed } from "../redux/slices/login"

export const Login = () => {
	const [formKey, setFormKey] = useState(Date.now())
	const [errors, setErrors] = useState({})
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const toaster = useToaster()
	const { authenticated, loading, errorMsg } = useSelector(
		(state) => state.loginSlice
	)

	useEffect(() => {
		if (authenticated) {
			navigate("/")
		}
	}, [authenticated])

	const messageError = (msg) => {
		return (
			<Message showIcon type="error" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const Proceed = (values, event) => {
		event.preventDefault()

		const { email, password } = values
		const newErrors = {}

		if (!email?.trim()) newErrors.email = "Имэйл бөглөнө үү."
		if (!password?.trim()) newErrors.password = "Нууц үг бөглөнө үү."

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		dispatch(loginProceed({ email, password }))
		setFormKey(Date.now())
	}

	useEffect(() => {
		if (errorMsg) {
			toaster.push(messageError(errorMsg), {
				placement: "bottomCenter",
				duration: 2000
			})
		}
	}, [errorMsg])

	return (
		<div
			style={{
				height: "100vh",
				width: "100vw",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Panel
				shaded
				style={{
					width: "450px",
					backgroundColor: "#e8e7dc",
					padding: "2rem"
				}}
			>
				<Stack justifyContent="center">
					<Heading level={3}>Нэвтрэх</Heading>
				</Stack>
				<Form
					key={formKey}
					onSubmit={Proceed}
					formDefaultValue={{ email: "", password: "" }}
					fluid
					style={{ marginTop: "2rem" }}
				>
					<Form.Group controlId="email">
						<Form.ControlLabel></Form.ControlLabel>
						<Form.Control
							type="email"
							name="email"
							errorMessage={errors.email}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.ControlLabel></Form.ControlLabel>
						<Form.Control
							type="password"
							name="password"
							errorMessage={errors.password}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group>
						<Stack justifyContent="flex-end">
							<Button
								type="submit"
								appearance="primary"
								loading={loading}
							>
								Болсон
							</Button>
						</Stack>
					</Form.Group>
				</Form>
			</Panel>
		</div>
	)
}
