import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, Heading, Panel, Stack } from "rsuite"

export const Login = () => {
	const [formKey, setFormKey] = useState(Date.now())
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const Proceed = async (values, event) => {
		event.preventDefault()
		setLoading(true)

		const { email, password } = values
		const newErrors = {}

		if (!email) newErrors.email = "Имэйл бөглөнө үү."
		if (!password) newErrors.password = "Нууц үг бөглөнө үү."

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})

		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/user/login`,
			values
		)

		setFormKey(Date.now())

		localStorage.setItem("ebarimt_user_token", response.data.token)
		setLoading(false)
		return navigate("/")
	}

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
