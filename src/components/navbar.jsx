import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Nav, Sidenav, Text } from "rsuite"
import QrcodeIcon from "@rsuite/icons/Qrcode"
import ReviewIcon from "@rsuite/icons/Review"

export const Navigator = () => {
	const [active, setActive] = useState(null)
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				setActive("1-1")
				break
			case "/refill-document":
				setActive("1-2")
				break
			case "/find-document":
				setActive("1-3")
				break
			case "/delete-document":
				setActive("1-4")
				break
			case "/check-organization":
				setActive("2-1")
				break
			case "/check-branch":
				setActive("2-2")
				break
			default:
				setActive(null)
		}
	}, [location.pathname])

	return (
		<div
			style={{
				backgroundColor: "#8bb5c4",
				borderRadius: "13px 0 0 13px"
			}}
		>
			<Sidenav
				defaultOpenKeys={["1", "2"]}
				appearance="subtle"
				style={{
					borderRadius: "13px 0 0 13px",
					overflow: "hidden"
				}}
			>
				<Sidenav.Body>
					<Nav onSelect={setActive} activeKey={active}>
						<Nav.Menu
							eventKey="1"
							title="Баримт"
							icon={<QrcodeIcon />}
						>
							<Nav.Item
								eventKey="1-1"
								onClick={() => navigate("/")}
							>
								<Text weight="bold">
									Сугалааны дугаар нэмэх
								</Text>
							</Nav.Item>
							<Nav.Item
								eventKey="1-2"
								onClick={() => navigate("/refill-document")}
							>
								<Text weight="bold">Баримт шивэх</Text>
							</Nav.Item>
							<Nav.Item
								eventKey="1-3"
								onClick={() => navigate("/find-document")}
							>
								<Text weight="bold">Баримт хайх</Text>
							</Nav.Item>
							<Nav.Item
								eventKey="1-4"
								onClick={() => navigate("/delete-document")}
							>
								<Text weight="bold">Баримт устгах</Text>
							</Nav.Item>
						</Nav.Menu>
						<Nav.Menu
							eventKey="2"
							title="Байгууллага"
							icon={<ReviewIcon />}
						>
							<Nav.Item
								eventKey="2-1"
								onClick={() => navigate("/check-organization")}
							>
								<Text weight="bold">Байгууллага шалгах</Text>
							</Nav.Item>
							<Nav.Item
								eventKey="2-2"
								onClick={() => navigate("/check-branch")}
							>
								<Text weight="bold">Салбар шалгах</Text>
							</Nav.Item>
						</Nav.Menu>
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</div>
	)
}
