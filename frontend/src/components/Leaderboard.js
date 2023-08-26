import {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function App({delSelected, setDelSelected, editSelected, setEditSelected, refresh, setRefresh}) {
	const empty = {
		eventname: "",
		eventcategory: "",
		poolpoints: {
			Aryans: 0,
			Kshatriyas: 0,
			Nawabs: 0,
			Peshwas: 0,
			Shauryas: 0
		},
		link: ""
	}
	const [leaderboard, setLeaderboard] = useState("error");
// 	const [refresh, setRefresh] = useState(false); //toggle for refreshing
	useEffect(() => {
		(async () => {
			//structure of leaderboard at end:
// 			{
// 				categories: []
// 				pools: []
// 				leaderboard: {
// 						category_name: [
// 							{
//								_id,
// 								eventname, 
// 								pointspoints: {
// 									pool: points
//								},
//								link
// 							}
// 						}
// 					]
// 				}
//				total: {pool: points}
// 			}
			try {
				const categories = await(await fetch("/api/categories/")).json();
				const pools = await (await fetch("/api/pools/")).json();
				const data = await (await fetch("/api/")).json();
				let temp_leaderboard = {};
				let temp_total = {};
// 				let temp_category_totals = {};
				for (const event_category of categories) {
					temp_leaderboard[event_category] = [];
// 					temp_category_totals[event_category] = {};
				}
				for (const pool of pools) {
					temp_total[pool] = 0;
// 					for (const event_category of categories) {
// 						temp_category_totals[event_category][pool] = 0;
// 					}
				}
				for (const event of data) {
					temp_leaderboard[event.eventcategory].push({
						_id: event._id,
						eventname: event.eventname, 
						poolpoints: event.poolpoints,
						link: event.link === undefined ? "" : event.link
					});
					for (const pool of pools) {
						temp_total[pool] += event.poolpoints[pool];
// 						temp_category_totals[event.eventcategory][pool] += event.poolpoints[pool];
					}
				}
// 				for (const event_category of categories) {
// 					temp_leaderboard[event_category].push({
// 						_id: "",
// 						eventname: "Total",
// 						poolpoints: temp_category_totals[event_category],
// 						link: ""
// 					})
// 				}
				setLeaderboard({
					categories: categories,
					pools: pools,
					leaderboard: temp_leaderboard,
					total: temp_total
				});
				console.log({
					categories: categories,
					pools: await (await fetch("/api/pools/")).json(),
					leaderboard: temp_leaderboard,
					total: temp_total
				});
			} catch (e) {
				setLeaderboard("error");
				console.error(e);
			}
		})();
	}, [refresh]);
	
	if (leaderboard === "error") return (
		<div className="error">Someting went wrong. Check the console for details.</div>
	);
	else return (
		<>
		<h1>T   a   k   n   e   e   k</h1> 
		<h2>Leaderboard</h2>
		<Container>
			<Row className="table-head">
				<Col sm={{offset: 0, span: 12}} md={{ offset: 1, span: 3}} style={{paddingLeft: "7.2%"}}>Problem Statement</Col>
				<Col sm={12} md={8}>
				<Row style={{padding:0}}>
				{leaderboard.pools.map((el, index) => (
					<Col style={{padding: 0}} xs={{offset: (index === 0 ? 3 : 0)}} sm={{offset: (index === 0 ? 3 : 0)}} md={{offset: 0}}>{el}</Col>
				))}
				</Row>
				</Col>
			</Row>
			{leaderboard.categories.map(event_category => (
				<Row>
					<Col sm={12} md={1} style={{textAlign:"center", color: "#f0f"}}>{event_category}</Col>
					<Col sm={12} md={11} style={{padding: 0}}>
						<Container style={{width: "100%"}}>
							{leaderboard.leaderboard[event_category].map(event => (
								<Row 
									onClick={() => {
										setEditSelected((event._id === "" ? {
											_id: "",
											...empty
										} : {...event, eventcategory:event_category}));
										setDelSelected((event._id === "" ? {
											_id: "",
											...empty
										} : {...event, eventcategory:event_category}));
										console.log((event._id === "" ? {} : event))}}>
									<Col className="row-head" style={{textAlign:"center"}}>
									{event.link === "" 
									? event.eventname 
									: (<a href={event.link} target="_blank" rel="noreferrer">{event.eventname}</a>)}
									</Col>
									{Object.entries(event.poolpoints).map(el => (
											<Col>{el[1]}</Col>
										))}
								</Row>
					))}
						</Container>
					</Col>
				</Row>
			))}
			<Row>
				<Col sm={{offset: 0, span:12}} md={{offset: 1, span: 3}} style={{textAlign: "center", color: "#f0f"}}>Total</Col>
				<Col sm={12} md={8} style={{padding:0}}>
				<Row style={{padding:0}}>
				{Object.entries(leaderboard.total).map((el, index) => <Col xs={{offset: (index === 0 ? 3 : 0)}} sm={{offset: (index === 0 ? 3 : 0)}} md={{offset: 0}}>{el[1]}</Col>)}
				</Row></Col>
			</Row>
		</Container>
		<Button onClick={() => {setRefresh(!refresh);}}>Refresh</Button>
		<h2>SnT Council</h2> 
		</>
	);
}

export default App;
