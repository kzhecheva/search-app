import React, { useState, useEffect, useRef, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoSearch } from "react-icons/io5";
import { useDebounce } from "../../hooks/debounceHook";
import { useClickOutside } from "react-click-outside-hook";
import MoonLoader from "react-spinners/MoonLoader";
import { bookList } from "../../data/mockData";
import { Book } from "../book";
import styled from "styled-components";

const SearchBarContainer = styled(motion.div)`
	display: flex;
	flex-direction: column;
	width: 34em;
	height: 3.8em;
	background-color: #fff;
	border-radius: 6px;
	box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
	padding: 2px 15px;
`;

const SearchIcon = styled.span`
	color: #bebebe;
	font-size: 27px;
	margin-right: 10px;
	margin-top: 4px;
`;

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

const CloseIcon = styled(motion.span)`
	color: #bebebe;
	font-size: 23px;
	transition: all 200ms ease-in-out;
	cursor: pointer;
	&:hover {
		color: #dfdfdf;
	}
	:first-child {
		margin-top: 8px;
	}
`;

const LineSeperator = styled.span`
	display: flex;
	min-width: 100%;
	min-height: 2px;
	background-color: #d8d8d878;
`;

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

const containerVariants = {
	expanded: {
		height: "21.5em",
	},
	collapsed: {
		height: "2.8em",
	},
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

export function SearchBar({ setItems }) {
	const inputRef = useRef(null);
	const [parentRef, isClickedOutside] = useClickOutside();
	const [isExpanded, setExpanded] = useState(false);

	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setLoading] = useState(false);
	const [books, setBooks] = useState([]);
	const [noBooks, setNoBooks] = useState(false);

	const [searchHistory, setSearchHistory] = useState([]);

	const filteredItems = useMemo(() => {
		const filteredBooks = books?.filter((book) => {
			return book?.title.toLowerCase().startsWith(searchQuery?.toLowerCase());
		});
		return filteredBooks?.slice(0, 10);
	}, [books, searchQuery]);

	const isEmpty = !filteredItems || filteredItems.length === 0;

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

	const collapseContainer = () => {
		setExpanded(false);
		setSearchQuery("");
		setLoading(false);
		setNoBooks(false);
		setBooks([]);
		if (inputRef.current) inputRef.current.value = "";
	};

	useEffect(() => {
		if (isClickedOutside) collapseContainer();
	}, [isClickedOutside]);

	const searchBooks = () => {
		if (!searchQuery || searchQuery.trim() === "") return;
		setLoading(true);
		setNoBooks(false);

		if (bookList && bookList.length === 0) setNoBooks(true);

		setBooks(bookList);
		setLoading(false);
	};

	useDebounce(searchQuery, 500, searchBooks);

	const handleSearch = () => {
		if (searchQuery === "") return;
		setExpanded(false);
		setSearchHistory((prev) => {
			if (prev.find((el) => el.title === searchQuery)) return [...prev];
			return [...prev, { title: searchQuery }];
		});
		setItems(filteredItems);
	};

	const handleSelect = (title) => {
		setSearchQuery(title);
		setExpanded(false);
		setSearchHistory((prev) => {
			if (prev.find((el) => el.title === searchQuery)) return [...prev];
			return [...prev, { title: title }];
		});
		const selectedBook = bookList?.find((el) => el.title === title);
		setItems([selectedBook]);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<SearchBarContainer
			animate={isExpanded ? "expanded" : "collapsed"}
			variants={containerVariants}
			transition={containerTransition}
			ref={parentRef}>
			<SearchInputContainer>
				<SearchIcon>
					<IoSearch size={25} />
				</SearchIcon>
				<SearchInput
					value={searchQuery}
					placeholder="Search for Books"
					onFocus={expandContainer}
					ref={inputRef}
					onChange={changeHandler}
					onKeyDown={handleKeyDown}
				/>
				<AnimatePresence>
					{isExpanded && (
						<>
							<CloseIcon
								key="close-icon"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={collapseContainer}
								transition={{ duration: 0.2 }}>
								<IoClose style={{ paddingTop: "8px" }} />
							</CloseIcon>
							<SearchIcon>
								<IoSearch size={22} color={"#5f04b4"} style={{ paddingLeft: "8px" }} onClick={handleSearch} />
							</SearchIcon>
						</>
					)}
				</AnimatePresence>
			</SearchInputContainer>
			{isExpanded && <LineSeperator />}
			{isExpanded && (
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
					{!isLoading && !isEmpty && (
						<>
							{filteredItems?.map((book) => (
								<Book
									key={book.id}
									title={book.title}
									isSearched={searchHistory.some((el) => el.title === book.title)}
									handleSelect={handleSelect}
									setSearchHistory={setSearchHistory}
								/>
							))}
						</>
					)}
				</SearchContent>
			)}
		</SearchBarContainer>
	);
}
