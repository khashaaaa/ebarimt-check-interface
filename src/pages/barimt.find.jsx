import { useState } from "react"
import { Button, Form, Panel, Stack } from "rsuite"
import FormControl from "rsuite/esm/FormControl"
import FormGroup from "rsuite/esm/FormGroup"

export const BarimtFind = () => {
	const [errors, setErrors] = useState({})
	const [formKey, setFormKey] = useState(Date.now())

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
	}

	return (
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
					<FormControl name="receiptno" />
				</Form.Group>
				<FormGroup>
					<Stack justifyContent="flex-end">
						<Button type="submit" appearance="primary">
							Хайх
						</Button>
					</Stack>
				</FormGroup>
			</Form>
		</Panel>
	)
}
