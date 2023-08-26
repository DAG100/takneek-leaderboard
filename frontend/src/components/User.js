import {useState} from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from "react-bootstrap/Button";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Leaderboard from "./Leaderboard";

function App() {
	const [refresh, setRefresh] = useState(false);

	return (
		<div className="main"><Leaderboard setDelSelected={(value) => {}} setEditSelected={(value) => {}} refresh={refresh} setRefresh={(value) => {setRefresh(value);}}/></div>
	)
}

export default App;
