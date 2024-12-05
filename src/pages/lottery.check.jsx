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
	List
} from "rsuite"
import { LotteryCheckContext } from "../context/lotterycheck"
import { LotteryInsertContext } from "../context/lotteryinsert"

export const LotteryCheck = () => {
	const [lottery, setLottery] = useState({ id: "", pos_api_lottery: "" })
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

		const { storeid, receiptno, netsale } = values
		const newErrors = {}

		if (!storeid) newErrors.storeid = "Талбарыг бөглөнө үү."
		if (!receiptno) newErrors.receiptno = "Талбарыг бөглөнө үү."
		if (!netsale) newErrors.netsale = "Талбарыг бөглөнө үү."

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		check(`${import.meta.env.VITE_API_URL}/barimt/lottery/check`, {
			storeid,
			receiptno,
			netsale
		})
	}

	const InsertLottery = () => {
		if (lottery.pos_api_lottery === "") {
			return
		}

		insert(`${import.meta.env.VITE_API_URL}/barimt/lottery/insert`, {
			id: checkData.data.response._id,
			pos_api_lottery: lottery.pos_api_lottery
		})
	}

	useEffect(() => {
		if (checkError) {
			refreshCheck()
			toaster.push(messageCheckError(checkError), {
				placement: "topCenter",
				duration: 2000
			})
		}
	}, [checkData, checkError])

	useEffect(() => {
		if (insertData && insertData?.status === 200) {
			toaster.push(messageInsertSuccess(insertData?.data.response), {
				placement: "topCenter",
				duration: 2000
			})
			setFormKey(Date.now())
			setLottery({ id: "", pos_api_lottery: "" })
			refreshCheck()
			refreshInsert()
		} else if (insertError) {
			toaster.push(messageInsertError(insertError), {
				placement: "topCenter",
				duration: 2000
			})
		}
	}, [insertData, insertError])

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
					onSubmit={FindBarimt}
					formDefaultValue={{
						storeid: "",
						receiptno: "",
						netsale: ""
					}}
				>
					<Form.Group controlId="storeNumber">
						<Form.ControlLabel>Дэлгүүрийн дугаар</Form.ControlLabel>
						<Form.Control
							name="storeid"
							errorMessage={errors.storeid}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group controlId="transactionNumber">
						<Form.ControlLabel>Гүйлгээний дугаар</Form.ControlLabel>
						<Form.Control
							name="receiptno"
							errorMessage={errors.receiptno}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group controlId="netsale">
						<Form.ControlLabel>Үнийн дүн</Form.ControlLabel>
						<Form.Control
							name="netsale"
							errorMessage={errors.netsale}
							errorPlacement="bottomStart"
						/>
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
								ID:{" "}
								{checkData ? checkData.data.response._id : ""}
							</Text>
						</List.Item>
						<List.Item>
							<Text weight="bold">
								Дэлгүүрийн дугаар:{" "}
								{checkData
									? checkData.data.response.storeid
									: ""}
							</Text>
						</List.Item>
						<List.Item>
							<Text weight="bold">
								Гүйлгээний дугаар:{" "}
								{checkData
									? checkData.data.response.receiptno
									: ""}
							</Text>
						</List.Item>
						<List.Item>
							<Text weight="bold">
								Үнийн дүн:{" "}
								{checkData
									? checkData.data.response.netsale
									: ""}
							</Text>
						</List.Item>
						{checkData &&
						checkData.data.response.pos_api_lottery ? (
							<List.Item>
								<Text weight="bold">
									Сугалааны дугаар:{" "}
									{checkData.data.response.pos_api_lottery}
								</Text>
							</List.Item>
						) : (
							<div
								style={{
									display: "flex",
									justifyContent: "flex-end",
									padding: "1rem"
								}}
							>
								<Input
									onChange={(e) =>
										setLottery({ pos_api_lottery: e })
									}
									style={{
										marginRight: "1rem",
										width: "24rem"
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
