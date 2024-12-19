import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Heading, Nav, Sidenav, Text } from "rsuite"
import QrcodeIcon from "@rsuite/icons/Qrcode"
import ReviewIcon from "@rsuite/icons/Review"
import CharacterAuthorizeIcon from "@rsuite/icons/CharacterAuthorize"

export const Navigator = () => {
	const [active, setActive] = useState(null)
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				setActive("1-1")
				break
			case "/document/refill":
				setActive("1-2")
				break
			case "/document/find":
				setActive("1-3")
				break
			case "/document/delete":
				setActive("1-4")
				break
			case "/organization/check":
				setActive("2-1")
				break
			case "/branch/check":
				setActive("2-2")
				break
			case "/management/user/create":
				setActive("3-1")
				break
			case "/management/access/create":
				setActive("3-2")
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
				defaultOpenKeys={["1", "2", "3"]}
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
							title={<Heading level={6}>Баримт</Heading>}
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
								onClick={() => navigate("/document/refill")}
							>
								<Text weight="bold">Баримт шивэх</Text>
							</Nav.Item>
							<Nav.Item
								eventKey="1-3"
								onClick={() => navigate("/document/find")}
							>
								<Text weight="bold">Баримт хайх</Text>
							</Nav.Item>
							<Nav.Item
								eventKey="1-4"
								onClick={() => navigate("/document/delete")}
							>
								<Text weight="bold">Баримт устгах</Text>
							</Nav.Item>
						</Nav.Menu>
						<Nav.Menu
							eventKey="2"
							title={<Heading level={6}>Байгууллага</Heading>}
							icon={<ReviewIcon />}
						>
							<Nav.Item
								eventKey="2-1"
								onClick={() => navigate("/organization/check")}
							>
								<Text weight="bold">Байгууллага шалгах</Text>
							</Nav.Item>
							<Nav.Item
								eventKey="2-2"
								onClick={() => navigate("/branch/check")}
							>
								<Text weight="bold">Салбар шалгах</Text>
							</Nav.Item>
						</Nav.Menu>
						<Nav.Menu
							eventKey="3"
							title={<Heading level={6}>Удирдлага</Heading>}
							icon={<CharacterAuthorizeIcon />}
						>
							<Nav.Item
								eventKey="3-1"
								onClick={() =>
									navigate("/management/user/create")
								}
							>
								<Text weight="bold">Хэрэглэгч</Text>
							</Nav.Item>
							<Nav.Item
								eventKey="3-2"
								onClick={() =>
									navigate("/management/access/create")
								}
							>
								<Text weight="bold">Эрх тохируулах</Text>
							</Nav.Item>
						</Nav.Menu>
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</div>
	)
}
