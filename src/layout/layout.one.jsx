import { Outlet } from "react-router-dom"
import { Navigator } from "../components/navbar"

export const LayoutOne = () => {
	return (
		<div
			style={{
				height: "100%",
				minHeight: "600px",
				margin: "2rem",
				display: "grid",
				gridTemplateColumns: "1fr 5fr",
				boxShadow: "0 0 3px 1px rgba(0,0,0,0.2)",
				borderRadius: "13px"
			}}
		>
			<Navigator />
			<main
				style={{
					borderRadius: "0 13px 13px 0",
					backgroundColor: "#e2e3da"
				}}
			>
				<Outlet />
			</main>
		</div>
	)
}
