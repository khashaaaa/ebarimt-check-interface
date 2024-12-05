import { useContext, useEffect, useState } from "react"
import {
	Animation,
	Button,
	ButtonToolbar,
	Form,
	List,
	Message,
	Modal,
	Panel,
	Stack,
	Text,
	useToaster
} from "rsuite"
import { BarimtCheckContext } from "../context/barimtcheck"
import { BarimtDeleteContext } from "../context/barimtdelete"

export const BarimtDelete = () => {
	const [formKey, setFormKey] = useState(Date.now())
	const [errors, setErrors] = useState({})
	const { checkBarimt, barimt, barimtError, barimtLoading, refreshBarimt } =
		useContext(BarimtCheckContext)
	const {
		deleteBarimt,
		deleteResult,
		deleteError,
		deleteLoading,
		refreshDelete
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

		const { id, salesdate } = values
		const newErrors = {}

		if (!id) newErrors.id = "Талбарыг бөглөнө үү."
		if (!salesdate) newErrors.salesdate = "Талбарыг бөглөнө үү."

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setErrors({})
		checkBarimt(`${import.meta.env.VITE_API_URL}/barimt/find`, {
			id,
			salesdate
		})
	}

	const DeleteBarimt = (id) => {
		deleteBarimt(`${import.meta.env.VITE_API_URL}/barimt/delete/${id}`)
		setConfirmDelete(false)
	}

	useEffect(() => {
		if (barimtError) {
			refreshBarimt()
			setFormKey(Date.now())
			toaster.push(messageCheckError(barimtError), {
				placement: "topCenter",
				duration: 2000
			})
		}
	}, [barimt, barimtError])

	useEffect(() => {
		if (deleteResult) {
			refreshBarimt()
			setFormKey(Date.now())
			toaster.push(messageDeleteSuccess(deleteResult.response), {
				placement: "topCenter",
				duration: 2000
			})
			refreshDelete()
		} else if (deleteError) {
			refreshBarimt()
			setFormKey(Date.now())
			toaster.push(messageDeleteError(deleteError), {
				placement: "topCenter",
				duration: 2000
			})
		}
	}, [deleteResult, deleteError])

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				gridColumnGap: "1rem"
			}}
		>
			<Modal open={confirmDelete} onClose={() => setConfirmDelete(false)}>
				<Modal.Header>
					<Text weight="bold">Батлах</Text>
				</Modal.Header>
				<Modal.Body>
					<Text weight="bold">
						Та энэ баримтыг устгахдаа итгэлтэй байна уу?
					</Text>
				</Modal.Body>
				<Modal.Footer>
					<Button
						onClick={() =>
							DeleteBarimt(barimt && barimt.data.response._id)
						}
						loading={deleteLoading}
						appearance="primary"
					>
						Тийм
					</Button>
					<Button
						appearance="primary"
						onClick={() => setConfirmDelete(false)}
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
						salesdate: ""
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
					<Form.Group controlId="salesdate">
						<Form.ControlLabel>
							Борлуулалтын огноо
						</Form.ControlLabel>
						<Form.Control
							name="salesdate"
							errorMessage={errors.salesdate}
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
					<List bordered>
						<List.Item>
							<Text weight="bold">
								Айди: {barimt ? barimt.data.response._id : ""}
							</Text>
						</List.Item>
						<List.Item>
							<Text weight="bold">
								Борлуулалтын огноо:{" "}
								{barimt ? barimt.data.response.salesdate : ""}
							</Text>
						</List.Item>
					</List>

					<Stack
						justifyContent="flex-end"
						style={{ marginTop: "1rem" }}
					>
						<Button
							onClick={() => setConfirmDelete(true)}
							appearance="primary"
							color="yellow"
						>
							Устгах
						</Button>
					</Stack>
				</Panel>
			</Animation.Collapse>
		</div>
	)
}
