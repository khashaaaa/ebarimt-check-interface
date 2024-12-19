import { useContext, useEffect, useState } from "react"
import { Button, Form, Message, Panel, Stack, Text, useToaster } from "rsuite"
import FormControl from "rsuite/esm/FormControl"
import { BarimtCombineContext } from "../context/barimtcombine"

export const BarimtRefill = () => {
	const [errors, setErrors] = useState({})
	const [formKey, setFormKey] = useState(Date.now())
	const {
		combineBarimt,
		response,
		responseError,
		responseLoading,
		refreshResponse
	} = useContext(BarimtCombineContext)

	const toaster = useToaster()

	const messageProceedSuccess = (msg) => {
		return (
			<Message showIcon type="success" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const messageProceedError = (msg) => {
		return (
			<Message showIcon type="error" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const Proceed = (values, event) => {
		event.preventDefault()

		const { receiptno } = values
		const newErrors = {}

		if (!receiptno) newErrors.receiptno = "Талбарыг бөглөнө үү"

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		combineBarimt(`${import.meta.env.VITE_API_URL}/barimt/combine`, {
			receiptno
		})
	}

	useEffect(() => {
		if (response && response?.status === 200) {
			toaster.push(messageProceedSuccess(response?.data.response), {
				placement: "topCenter",
				duration: 2000
			})
			setFormKey(Date.now())
			refreshResponse()
		} else if (responseError) {
			setFormKey(Date.now())
			toaster.push(messageProceedError(responseError), {
				placement: "topCenter",
				duration: 2000
			})
		}
	}, [response, responseError])

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
					fluid
					onSubmit={Proceed}
					formDefaultValue={{
						receiptno: ""
					}}
				>
					<Form.Group controlId="receiptno">
						<Form.ControlLabel>Гүйлгээний дугаар</Form.ControlLabel>
						<FormControl
							name="receiptno"
							errorMessage={errors.receiptno}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group>
						<Stack justifyContent="flex-end">
							<Button
								type="submit"
								appearance="primary"
								loading={responseLoading}
							>
								Нэмэх
							</Button>
						</Stack>
					</Form.Group>
				</Form>
			</Panel>
		</div>
	)
}
