import { useContext, useEffect, useState } from "react"
import {
	Panel,
	Form,
	Input,
	Button,
	ButtonToolbar,
	Stack,
	Text,
	Animation,
	useToaster,
	Message,
	List,
	Checkbox,
} from "rsuite"
import { LotteryCheckContext } from "../context/lotterycheck"
import { LotteryInsertContext } from "../context/lotteryinsert"

export const CheckLottery = () => {
	const [is_organization, set_is_org] = useState(false)
	const [lottery, setLottery] = useState({ id: "", lottery_number: "" })
	const [errors, setErrors] = useState({})
	const [formKey, setFormKey] = useState(Date.now())
	const { check, checkData, checkError, checkLoading, refreshCheck } =
		useContext(LotteryCheckContext)
	const { insert, insertData, insertError, insertLoading, refreshInsert } =
		useContext(LotteryInsertContext)

	const toaster = useToaster()

	const messageCheckError = (msg) => {
		return (
			<Message showIcon type="error" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const messageInsertSuccess = (msg) => {
		return (
			<Message showIcon type="success" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const messageInsertError = (msg) => {
		return (
			<Message showIcon type="error" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const FindBarimt = (values, event) => {
		event.preventDefault()

		const { store_number, transaction_number, amount } = values
		const newErrors = {}

		if (!store_number) newErrors.store_number = "Талбарыг бөглөнө үү."
		if (!transaction_number)
			newErrors.transaction_number = "Талбарыг бөглөнө үү."
		if (!amount) newErrors.amount = "Талбарыг бөглөнө үү."

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		check(`${import.meta.env.VITE_API_URL}/lottery/check`, {
			store_number,
			transaction_number,
			amount,
			is_organization,
		})
	}

	const InsertLottery = () => {
		if (lottery.lottery_number === "") {
			return
		}

		insert(`${import.meta.env.VITE_API_URL}/lottery/insert`, {
			id: checkData.response[0].id,
			lottery_number: lottery.lottery_number,
		})
	}

	useEffect(() => {
		if (checkError) {
			refreshCheck()
			toaster.push(messageCheckError(checkError), {
				placement: "bottomCenter",
				duration: 2000,
			})
		}
	}, [checkData, checkError])

	useEffect(() => {
		if (insertData && insertData?.status === 200) {
			toaster.push(messageInsertSuccess(insertData?.data.response), {
				placement: "bottomCenter",
				duration: 2000,
			})
			setFormKey(Date.now())
			setLottery({ id: "", lottery_number: "" })
			refreshCheck()
			refreshInsert()
		} else if (insertError) {
			toaster.push(messageInsertError(insertError), {
				placement: "bottomCenter",
				duration: 2000,
			})
		}
	}, [insertData, insertError])

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gridColumnGap: "1rem",
			}}
		>
			<Panel>
				<Form
					key={formKey}
					fluid
					onSubmit={FindBarimt}
					formDefaultValue={{
						store_number: "",
						transaction_number: "",
						amount: "",
						is_organization: false,
					}}
				>
					<Form.Group controlId="storeNumber">
						<Form.ControlLabel>Дэлгүүрийн дугаар</Form.ControlLabel>
						<Form.Control
							name="store_number"
							errorMessage={errors.store_number}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group controlId="transactionNumber">
						<Form.ControlLabel>Гүйлгээний дугаар</Form.ControlLabel>
						<Form.Control
							name="transaction_number"
							errorMessage={errors.transaction_number}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group controlId="amount">
						<Form.ControlLabel>Үнийн дүн</Form.ControlLabel>
						<Form.Control
							name="amount"
							errorMessage={errors.amount}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group controlId="isOrganization">
						<Checkbox
							value={is_organization}
							onChange={(check) => set_is_org(!check)}
						>
							Байгууллага эсэх
						</Checkbox>
					</Form.Group>
					<Form.Group>
						<Stack justifyContent="flex-end">
							<ButtonToolbar>
								<Button
									type="submit"
									appearance="primary"
									loading={checkLoading}
								>
									Шалгах
								</Button>
							</ButtonToolbar>
						</Stack>
					</Form.Group>
				</Form>
			</Panel>
			<Animation.Collapse in={checkData ? true : false}>
				<Panel>
					<List bordered>
						<List.Item>
							<Text weight="bold">
								ID: {checkData ? checkData.response[0].id : ""}
							</Text>
						</List.Item>
						<List.Item>
							<Text weight="bold">
								Дэлгүүрийн дугаар:{" "}
								{checkData
									? checkData.response[0].store_number
									: ""}
							</Text>
						</List.Item>
						<List.Item>
							<Text weight="bold">
								Гүйлгээний дугаар:{" "}
								{checkData
									? checkData.response[0].transaction_number
									: ""}
							</Text>
						</List.Item>
						<List.Item>
							<Text weight="bold">
								Үнийн дүн:{" "}
								{checkData ? checkData.response[0].amount : ""}
							</Text>
						</List.Item>
						{checkData && checkData.response[0].lottery_number ? (
							<List.Item>
								<Text weight="bold">
									Сугалааны дугаар:{" "}
									{checkData.response[0].lottery_number}
								</Text>
							</List.Item>
						) : (
							<div
								style={{
									display: "flex",
									justifyContent: "flex-end",
									padding: "1rem",
								}}
							>
								<Input
									onChange={(e) =>
										setLottery({ lottery_number: e })
									}
									style={{
										marginRight: "1rem",
										width: "24rem",
									}}
									placeholder="Сугалааны дугаар оруулах"
								/>
								<Button
									appearance="primary"
									onClick={InsertLottery}
									loading={insertLoading}
								>
									Хадгалах
								</Button>
							</div>
						)}
					</List>
				</Panel>
			</Animation.Collapse>
		</div>
	)
}
