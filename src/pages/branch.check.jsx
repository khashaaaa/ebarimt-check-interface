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
import { BranchCheckContext } from "../context/branchcheck"

export const BranchCheck = () => {
	const [formKey, setFormKey] = useState(Date.now())
	const [errors, setErrors] = useState({})
	const {
		branchCheck,
		branchResponse,
		branchError,
		branchLoading,
		refreshBranch
	} = useContext(BranchCheckContext)

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

		const { bizloc_cd } = values
		const newErrors = {}

		if (!bizloc_cd) newErrors.bizloc_cd = "Талбарыг бөглөнө үү."

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		branchCheck(
			`${import.meta.env.VITE_API_URL}/org/branch/find`,
			bizloc_cd
		)
	}

	useEffect(() => {
		if (branchError) {
			refreshBranch()
			setFormKey(Date.now())
			toaster.push(messageCheckError(branchError), {
				placement: "topCenter",
				duration: 2000
			})
		}
	}, [branchError])

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
					formDefaultValue={{ bizloc_cd: "" }}
					fluid
				>
					<FormGroup>
						<FormControlLabel>Салбарын дугаар</FormControlLabel>
						<FormControl
							name="bizloc_cd"
							errorMessage={errors.bizloc_cd}
							errorPlacement="bottomStart"
						/>
					</FormGroup>
					<Form.Group>
						<Stack justifyContent="flex-end">
							<ButtonToolbar>
								<Button
									type="submit"
									loading={branchLoading}
									appearance="primary"
								>
									Хайх
								</Button>
							</ButtonToolbar>
						</Stack>
					</Form.Group>
				</Form>
			</Panel>
			<Animation.Collapse in={branchResponse ? true : false}>
				<Panel>
					<List bordered>
						<List.Item>
							<Text muted>Байгууллагын нэр 1:</Text>
							<Text>
								{branchResponse &&
									branchResponse.data.response.company_name1}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Байгууллагын нэр 2:</Text>
							<Text>
								{branchResponse &&
									branchResponse.data.response.company_name2}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Дэлгүүрийн нэр:</Text>
							<Text>
								{branchResponse &&
									branchResponse.data.response.store_name}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Дэлгүүрийн дугаар:</Text>
							<Text>
								{branchResponse &&
									branchResponse.data.response.store_no}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Татварт бүртгэгдсэн огноо:</Text>
							<Text>
								{branchResponse &&
									branchResponse.data.response.date_reg}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Регистрийн дугаар:</Text>
							<Text>
								{branchResponse &&
									branchResponse.data.response.reg_no}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Татвар төлөгчийн дугаар:</Text>
							<Text>
								{branchResponse &&
									branchResponse.data.response.vat_no}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>НӨАТ төлөгч эсэх:</Text>
							<Text>
								{branchResponse &&
								branchResponse.data.response.vat_payer
									? "Тийм"
									: "Үгүй"}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Хотын татвар төлөгч эсэх:</Text>
							<Text>
								{branchResponse &&
								branchResponse.data.response.city_payer
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
