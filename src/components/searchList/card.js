import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Title = styled(Link)`
	margin-top: 4px;
	margin-bottom: 3px;
	font-weight: 600;
	font-size: 18px;
	color: #5f04b4;
	display: flex;
`;

const Card = styled.div`
	margin-bottom: 15px;
`;

export const ListCard = ({ element }) => {
	return (
		<Card>
			<Title to={`https://www.google.com/search?q=${element?.title}`}>{element?.title}</Title>
			<div>Author: {element?.author}</div>
			<div>Last read by: {element?.lastReadBy}</div>
		</Card>
	);
};
