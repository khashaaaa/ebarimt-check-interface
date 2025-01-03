import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/slices/login"
import { decodeToken } from "../redux/slices/decode"
import { Avatar, Button, Dropdown, Heading, Nav, Sidenav, Text } from "rsuite"
import CharacterAuthorizeIcon from "@rsuite/icons/CharacterAuthorize"
import QrcodeIcon from "@rsuite/icons/Qrcode"
import ReviewIcon from "@rsuite/icons/Review"
import OffRoundIcon from "@rsuite/icons/OffRound"

const NAV_ITEMS = [
	{
		key: "1",
		title: "Баримт",
		icon: <QrcodeIcon />,
		children: [
			{
				key: "1-1",
				path: "/document/lottery",
				label: "Сугалааны дугаар нэмэх",
				accessKey: "barimt/lottery"
			},
			{
				key: "1-2",
				path: "/document/refill",
				label: "Баримт шивэх",
				accessKey: "barimt/type"
			},
			{
				key: "1-3",
				path: "/document/find",
				label: "Баримт хайх",
				accessKey: "barimt/find"
			},
			{
				key: "1-4",
				path: "/document/delete",
				label: "Баримт устгах",
				accessKey: "barimt/delete"
			}
		]
	},
	{
		key: "2",
		title: "Байгууллага",
		icon: <ReviewIcon />,
		children: [
			{
				key: "2-1",
				path: "/organization/check",
				label: "Байгууллага шалгах",
				accessKey: "org/find"
			},
			{
				key: "2-2",
				path: "/branch/check",
				label: "Салбар шалгах",
				accessKey: "org/branch/find"
			}
		]
	},
	{
		key: "3",
		title: "Удирдлага",
		icon: <CharacterAuthorizeIcon />,
		children: [
			{
				key: "3-1",
				path: "/management/user/create",
				label: "Хэрэглэгч",
				requiresModifier: true
			},
			{
				key: "3-2",
				path: "/management/access/create",
				label: "Эрх тохируулах",
				requiresModifier: true
			}
		]
	}
]

export const Navigator = () => {
	const [active, setActive] = useState(null)
	const location = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { user } = useSelector((state) => state.decodeSlice)

	const handleLogout = () => {
		dispatch(logout())
		navigate("/login")
	}

	useEffect(() => {
		dispatch(decodeToken())
	}, [dispatch])

	useEffect(() => {
		const match = NAV_ITEMS.flatMap((menu) =>
			menu.children.map((child) => ({ path: child.path, key: child.key }))
		).find((item) => item.path === location.pathname)
		setActive(match?.key || null)
	}, [location.pathname])

	const renderNavItem = ({
		key,
		path,
		label,
		accessKey,
		requiresModifier
	}) => {
		const isModifier = user?.user?.user_type === "MODERATOR"

		const hasAccess =
			isModifier ||
			(requiresModifier && isModifier) ||
			(accessKey &&
				user?.access?.some((access) => access.path_url === accessKey))

		if (!hasAccess) return null

		return (
			<Nav.Item key={key} eventKey={key} onClick={() => navigate(path)}>
				<Text weight="bold">{label}</Text>
			</Nav.Item>
		)
	}

	const renderMenu = ({ key, title, icon, children }) => (
		<Nav.Menu
			key={key}
			eventKey={key}
			title={<Heading level={6}>{title}</Heading>}
			icon={icon}
		>
			{children.map(renderNavItem)}
		</Nav.Menu>
	)

	const dropdownRender = (props) => <Avatar {...props} size="sm" />

	return (
		<div
			style={{
				backgroundColor: "#8bb5c4",
				borderRadius: "13px 0 0 13px"
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "1rem"
				}}
			>
				<Dropdown trigger="hover" renderToggle={dropdownRender}>
					<Dropdown.Item>
						{user?.user?.parent_name} {user?.user?.given_name}
					</Dropdown.Item>
					<Dropdown.Item>{user?.user?.user_type}</Dropdown.Item>
				</Dropdown>
				<Button
					onClick={handleLogout}
					endIcon={<OffRoundIcon />}
					size="sm"
				>
					Гарах
				</Button>
			</div>
			<Sidenav
				defaultOpenKeys={NAV_ITEMS.map((item) => item.key)}
				appearance="subtle"
				style={{
					borderRadius: "13px 0 0 13px",
					overflow: "hidden"
				}}
			>
				<Sidenav.Body>
					<Nav onSelect={setActive} activeKey={active}>
						{NAV_ITEMS.map(renderMenu)}
					</Nav>
				</Sidenav.Body>
			</Sidenav>
		</div>
	)
}
