import React from "react";
import styled, { css } from "styled-components";
import { IoSearch, IoTimerOutline } from "react-icons/io5";

const BookContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	cursor: pointer;
	&:hover {
		background-color: #f9f3ff;
	}
`;

const Name = styled.h4(
	(props) => css`
		margin-top: 4px;
		margin-bottom: 5px;
		color: #000;
		display: flex;
		flex: 2;
		font-size: 15px;

		${props.isOK &&
		css`
			color: #5f04b4;
		`}
	`,
);

const History = styled.div`
	color: #bebebe;
	margin-left: 18px;
	margin-top: 4px;
	margin-bottom: 2px;
	margin-right: 15px;
`;

const RemoveButton = styled.span`
	color: #a1a1a1;
	font-size: 14px;
	display: flex;
	flex: 0.3;
`;

export function Book({ isSearched, title, handleSelect, setSearchHistory }) {
	return (
		<BookContainer>
			<History>{isSearched ? <IoTimerOutline size={15} /> : <IoSearch size={15} />}</History>
			<Name isOK={isSearched} onClick={() => handleSelect(title)}>
				{title}
			</Name>
			{isSearched && <RemoveButton onClick={() => setSearchHistory((prev) => prev.filter((el) => el.title !== title))}>remove</RemoveButton>}
		</BookContainer>
	);
}
