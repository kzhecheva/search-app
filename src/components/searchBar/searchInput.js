import React from "react";
import styled from "styled-components";

const SearchInput = styled.input`
	width: 78%;
	height: 100%;
	outline: none;
	border: none;
	font-size: 16px;
	vertical-align: middle;
	color: #12112e;
	font-weight: 500;
	border-radius: 6px;
	background-color: transparent;
	&:focus {
		outline: none;
		&::placeholder {
			opacity: 0;
		}
	}
	&::placeholder {
		color: #bebebe;
		transition: all 250ms ease-in-out;
	}
`;

export const Input = ({ setNoBooks, setBooks, setSearchQuery, setExpanded, searchQuery, inputRef, handleSearch }) => {
	const changeHandler = (e) => {
		e.preventDefault();
		if (e.target.value.trim() === "") {
			setNoBooks(false);
			setBooks([]);
		}

		setSearchQuery(e.target.value);
	};

	const expandContainer = () => {
		setExpanded(true);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<SearchInput
			value={searchQuery}
			placeholder="Search for Books"
			onFocus={expandContainer}
			ref={inputRef}
			onChange={changeHandler}
			onKeyDown={handleKeyDown}
		/>
	);
};
