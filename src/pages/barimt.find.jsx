import { useContext, useEffect, useState } from "react"
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
import FormControl from "rsuite/esm/FormControl"
import FormGroup from "rsuite/esm/FormGroup"
import { BarimtSearchContext } from "../context/barimtsearch"

export const BarimtFind = () => {
	const [errors, setErrors] = useState({})
	const [formKey, setFormKey] = useState(Date.now())
	const { searchBarimt, result, resultError, resultLoading, refreshResult } =
		useContext(BarimtSearchContext)

	const toaster = useToaster()

	const messageSearchError = (msg) => {
		return (
			<Message showIcon type="error" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const FindBarimt = (values, event) => {
		event.preventDefault()

		const newErrors = {}
		const { receiptno } = values

		if (!receiptno) newErrors.receiptno = "Талбарыг бөглөнө үү."

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})

		searchBarimt(`${import.meta.env.VITE_API_URL}/barimt/search`, receiptno)
	}

	useEffect(() => {
		if (resultError) {
			refreshResult()
			setFormKey(Date.now())
			toaster.push(messageSearchError(resultError), {
				placement: "topCenter",
				duration: 2000
			})
		}
	}, [resultError])

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
					formDefaultValue={{
						receiptno: ""
					}}
					onSubmit={FindBarimt}
				>
					<Form.Group controlId="receiptno">
						<Form.ControlLabel>Гүйлгээний дугаар</Form.ControlLabel>
						<FormControl
							name="receiptno"
							errorMessage={errors.receiptno}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<FormGroup>
						<Stack justifyContent="flex-end">
							<Button
								type="submit"
								appearance="primary"
								loading={resultLoading}
							>
								Хайх
							</Button>
						</Stack>
					</FormGroup>
				</Form>
			</Panel>
			<Animation.Collapse in={result ? true : false}>
				<Panel>
					<List bordered>
						<List.Item>
							<Text muted>Нийт үнэ:</Text>
							<Text>{result && result.response.grosssale}</Text>
						</List.Item>
						<List.Item>
							<Text muted>Гүйлгээний дугаар:</Text>
							<Text>
								{result && result.response.pos_api_bill_id}
							</Text>
						</List.Item>
						<List.Item>
							<Text muted>Сугалааны дугаар:</Text>
							<Text>
								{result && result.response.pos_api_lottery}
							</Text>
						</List.Item>
					</List>
				</Panel>
			</Animation.Collapse>
		</div>
	)
}
