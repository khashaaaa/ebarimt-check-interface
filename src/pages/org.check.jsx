import { useContext, useEffect, useState } from "react"
import {
	Animation,
	Button,
	ButtonToolbar,
	Form,
	List,
	Message,
	Panel,
	Stack,
	Text,
	useToaster
} from "rsuite"
import FormControl from "rsuite/esm/FormControl"
import FormControlLabel from "rsuite/esm/FormControlLabel"
import FormGroup from "rsuite/esm/FormGroup"
import { OrgCheckContext } from "../context/orgcheck"

export const OrgCheck = () => {
	const [formKey, setFormKey] = useState(Date.now())
	const [errors, setErrors] = useState({})
	const { orgCheck, orgResponse, orgError, orgLoading, refreshOrg } =
		useContext(OrgCheckContext)

	const toaster = useToaster()

	const messageCheckError = (msg) => {
		return (
			<Message showIcon type="error" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const Proceed = (values, event) => {
		event.preventDefault()

		const { regNo } = values
		const newErrors = {}

		if (!regNo) newErrors.regNo = "Талбарыг бөглөнө үү."

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		orgCheck(`${import.meta.env.VITE_API_URL}/org/find`, regNo)
	}

	useEffect(() => {
		if (orgError) {
			refreshOrg()
			setFormKey(Date.now())
			toaster.push(messageCheckError(orgError), {
				placement: "topCenter",
				duration: 2000
			})
		}
	}, [orgError])

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
					key={formKey}
					onSubmit={Proceed}
					formDefaultValue={{ regNo: "" }}
					fluid
				>
					<FormGroup>
						<FormControlLabel>Регистрийн дугаар</FormControlLabel>
						<FormControl
							name="regNo"
							errorMessage={errors.regNo}
							errorPlacement="bottomStart"
						/>
					</FormGroup>
					<Form.Group>
						<Stack justifyContent="flex-end">
							<ButtonToolbar>
								<Button
									type="submit"
									loading={orgLoading}
									appearance="primary"
								>
									Хайх
								</Button>
							</ButtonToolbar>
						</Stack>
					</Form.Group>
				</Form>
			</Panel>
			<Animation.Collapse in={orgResponse ? true : false}>
				<Panel>
					<List bordered>
						<List.Item>
							<Text muted>Нэр:</Text>
							<Text>
								{orgResponse &&
									orgResponse.data.response.data.name}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Бүртгэгдсэн огноо:</Text>
							<Text>
								{orgResponse &&
									orgResponse.data.response.data
										.vatpayerRegisteredDate}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Хотын татвар төлөгч эсэх:</Text>
							<Text>
								{orgResponse &&
								orgResponse.data.response.data.cityPayer
									? "Тийм"
									: "Үгүй"}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>НӨАТ төлөгч эсэх:</Text>
							<Text>
								{orgResponse &&
								orgResponse.data.response.data.vatPayer
									? "Тийм"
									: "Үгүй"}
							</Text>
						</List.Item>
					</List>
				</Panel>
			</Animation.Collapse>
		</div>
	)
}
