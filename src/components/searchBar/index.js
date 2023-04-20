import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { useDebounce } from "../../hooks/debounceHook";
import { useClickOutside } from "react-click-outside-hook";
import { bookList } from "../../data/mockData";
import { Book } from "../book";
import styled from "styled-components";
import { ItemsContext, MetaContext } from "../../data/state";
import { InputContainer } from "./searchInputContainer";
import { SearchContainer } from "./searchBarContainer";
import { Content } from "./serchContent";

const LineSeperator = styled.span`
	display: flex;
	min-width: 100%;
	min-height: 2px;
	background-color: #d8d8d878;
`;

export function SearchBar() {
	const { setItems } = useContext(ItemsContext);
	const { setMeta } = useContext(MetaContext);

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

	const handleSelect = (title) => {
		setSearchQuery(title);
		setExpanded(false);
		setSearchHistory((prev) => {
			if (prev.find((el) => el.title === searchQuery)) return [...prev];
			return [...prev, { title: title }];
		});
		const t0 = performance.now();
		const selectedBook = bookList?.find((el) => el.title === title);
		const t1 = performance.now();
		setMeta({ time: t1 - t0, results: [selectedBook].length });
		setItems([selectedBook]);
	};

	return (
		<SearchContainer parentRef={parentRef} isExpanded={isExpanded}>
			<InputContainer
				setNoBooks={setNoBooks}
				setBooks={setBooks}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				isExpanded={isExpanded}
				setExpanded={setExpanded}
				setSearchHistory={setSearchHistory}
				bookList={bookList}
				filteredItems={filteredItems}
				inputRef={inputRef}
				collapseContainer={collapseContainer}
			/>
			{isExpanded && (
				<>
					<LineSeperator />
					<Content filteredItems={filteredItems} isLoading={isLoading} noBooks={noBooks}>
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
					</Content>
				</>
			)}
		</SearchContainer>
	);
}
