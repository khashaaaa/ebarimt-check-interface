import { useContext, useEffect, useState } from "react"
import {
	Animation,
	Button,
	ButtonToolbar,
	Form,
	Message,
	Modal,
	Panel,
	Stack,
	Text,
	useToaster,
} from "rsuite"
import { BarimtCheckContext } from "../context/barimtcheck"
import { BarimtDeleteContext } from "../context/barimtdelete"

export const DeleteRecord = () => {
	const [formKey, setFormKey] = useState(Date.now())
	const [errors, setErrors] = useState({})
	const { checkBarimt, barimt, barimtError, barimtLoading, refreshBarimt } =
		useContext(BarimtCheckContext)
	const {
		deleteBarimt,
		deleteResult,
		deleteError,
		deleteLoading,
		refreshDelete,
	} = useContext(BarimtDeleteContext)
	const [confirmDelete, setConfirmDelete] = useState(false)

	const toaster = useToaster()

	const messageCheckError = (msg) => {
		return (
			<Message showIcon type="error" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const messageDeleteSuccess = (msg) => {
		return (
			<Message showIcon type="success" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const messageDeleteError = (msg) => {
		return (
			<Message showIcon type="error" closable>
				<Text>{msg}</Text>
			</Message>
		)
	}

	const FindBarimt = (values, event) => {
		event.preventDefault()

		const { id, date } = values
		const newErrors = {}

		if (!id) newErrors.id = "Талбарыг бөглөнө үү."
		if (!date) newErrors.date = "Талбарыг бөглөнө үү."

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		checkBarimt(`${import.meta.env.VITE_API_URL}/barimt/find`, { id, date })
	}

	const DeleteBarimt = (id) => {
		deleteBarimt(`${import.meta.env.VITE_API_URL}/barimt/delete/${id}`)
		setConfirmDelete(false)
	}

	useEffect(() => {
		if (barimt) {
			setFormKey(Date.now())
		}
		if (barimtError) {
			refreshBarimt()
			toaster.push(messageCheckError(barimtError), {
				placement: "bottomCenter",
				duration: 2000,
			})
		}
	}, [barimt, barimtError])

	useEffect(() => {
		if (deleteResult) {
			refreshBarimt()
			toaster.push(messageDeleteSuccess(deleteResult.response), {
				placement: "bottomCenter",
				duration: 2000,
			})
		} else if (deleteError) {
			toaster.push(messageDeleteError(deleteError), {
				placement: "bottomCenter",
				duration: 2000,
			})
		}
	}, [deleteResult, deleteError])

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gridColumnGap: "1rem",
			}}
		>
			<Modal open={confirmDelete} onClose={() => setConfirmDelete(false)}>
				<Modal.Header>Батлах</Modal.Header>
				<Modal.Body>
					Та энэ баримтыг устгахдаа итгэлтэй байна уу?
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() =>
							DeleteBarimt(barimt && barimt.response[0].id)
						}
						appearance="primary"
					>
						Тийм
					</Button>
					<Button
						onClick={() => setConfirmDelete(false)}
						loading={deleteLoading}
					>
						Үгүй
					</Button>
				</Modal.Footer>
			</Modal>
			<Panel>
				<Form
					key={formKey}
					fluid
					onSubmit={FindBarimt}
					formDefaultValue={{
						id: "",
						date: "",
					}}
				>
					<Form.Group controlId="id">
						<Form.ControlLabel>Айди</Form.ControlLabel>
						<Form.Control
							name="id"
							errorMessage={errors.id}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group controlId="date">
						<Form.ControlLabel>Мэдээлэл</Form.ControlLabel>
						<Form.Control
							name="date"
							errorMessage={errors.date}
							errorPlacement="bottomStart"
						/>
					</Form.Group>
					<Form.Group>
						<Stack justifyContent="flex-end">
							<ButtonToolbar>
								<Button
									type="submit"
									appearance="primary"
									loading={barimtLoading}
								>
									Хайх
								</Button>
							</ButtonToolbar>
						</Stack>
					</Form.Group>
				</Form>
			</Panel>
			<Animation.Collapse in={barimt && !deleteResult ? true : false}>
				<Panel>
					<Text weight="bold">
						ID: {barimt ? barimt.response[0].id : ""}
					</Text>
					<Text weight="bold">
						date: {barimt ? barimt.response[0].date : ""}
					</Text>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							marginTop: "1rem",
						}}
					>
						<Button
							onClick={() => setConfirmDelete(true)}
							appearance="primary"
							color="yellow"
						>
							Устгах
						</Button>
					</div>
				</Panel>
			</Animation.Collapse>
		</div>
	)
}
