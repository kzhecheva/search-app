import React from "react";
import styled from "styled-components";
import { IoBookOutline } from "react-icons/io5";

const Title = styled.span`
	color: #5f04b4;
	font-size: 14px;
	display: flex;
	align-items: center;
	column-gap: 1em;
`;

export function SearchTitle() {
	return (
		<Title>
			<IoBookOutline size={30} />
			<h2>Custom Book Search</h2>
		</Title>
	);
}
