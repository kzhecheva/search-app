import React from "react";
import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";

const SearchContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding-top: 0.2em;
	padding-bottom: 0.2em;
	overflow-y: auto;
`;

const LoadingWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const WarningMessage = styled.span`
	color: #a1a1a1;
	font-size: 14px;
	display: flex;
	align-self: center;
	justify-self: center;
`;

export function Content({ children, filteredItems, isLoading, noBooks }) {
	const isEmpty = !filteredItems || filteredItems.length === 0;

	return (
		<SearchContent>
			{isLoading && (
				<LoadingWrapper>
					<MoonLoader loading color="#000" size={20} />
				</LoadingWrapper>
			)}
			{!isLoading && isEmpty && !noBooks && (
				<LoadingWrapper>
					<WarningMessage>Start typing to Search</WarningMessage>
				</LoadingWrapper>
			)}
			{!isLoading && noBooks && (
				<LoadingWrapper>
					<WarningMessage>No Book Titles found!</WarningMessage>
				</LoadingWrapper>
			)}
			{!isLoading && !isEmpty && <>{children}</>}
		</SearchContent>
	);
}
