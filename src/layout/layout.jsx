import { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Nav, Text } from "rsuite"

export const Layout = () => {
	const [active, setActive] = useState(null)
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		switch (location.pathname) {
			case "/":
				setActive("1")
				break
			case "/delete-record":
				setActive("2")
				break
			case "/server-monitoring":
				setActive("3")
				break
			default:
				setActive(null)
		}
	}, [location.pathname])

	return (
		<>
			<Nav
				onSelect={setActive}
				activeKey={active}
				appearance="pills"
				style={{ width: "100%" }}
			>
				<Nav.Item eventKey="1" onClick={() => navigate("/")}>
					<Text weight="bold">Сугалааны дугаар нэмэх</Text>
				</Nav.Item>
				<Nav.Item
					eventKey="2"
					onClick={() => navigate("/delete-record")}
				>
					<Text weight="bold">Баримт устгах</Text>
				</Nav.Item>
				<Nav.Item
					eventKey="3"
					onClick={() => navigate("/server-monitoring")}
				>
					<Text weight="bold">Сервер мониторинг</Text>
				</Nav.Item>
			</Nav>

			<main>
				<Outlet />
			</main>
		</>
	)
}
