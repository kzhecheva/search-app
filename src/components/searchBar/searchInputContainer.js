import React, { useContext } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { ItemsContext, MetaContext } from "../../data/state";
import { Input } from "./searchInput";
import { AnimateDroprown } from "./animatePresense";

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

export const InputContainer = ({
	setNoBooks,
	setBooks,
	setSearchQuery,
	setExpanded,
	searchQuery,
	setSearchHistory,
	bookList,
	filteredItems,
	inputRef,
	isExpanded,
	collapseContainer,
}) => {
	const { setItems } = useContext(ItemsContext);
	const { setMeta } = useContext(MetaContext);

	const handleSearch = () => {
		if (searchQuery === "") return;
		setExpanded(false);
		setSearchHistory((prev) => {
			if (prev.find((el) => el.title === searchQuery)) return [...prev];
			return [...prev, { title: searchQuery }];
		});
		const t0 = performance.now();
		bookList?.filter((el) => el.title.startsWith(searchQuery));
		const t1 = performance.now();
		setMeta({ time: t1 - t0, results: filteredItems.length });
		setItems(filteredItems);
	};

	return (
		<SearchInputContainer>
			<SearchIcon>
				<IoSearch size={25} />
			</SearchIcon>
			<Input
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
				handleSearch={handleSearch}
			/>
			<AnimateDroprown isExpanded={isExpanded} collapseContainer={collapseContainer}>
				<SearchIcon>
					<IoSearch size={22} color={"#5f04b4"} style={{ paddingLeft: "8px" }} onClick={handleSearch} />
				</SearchIcon>
			</AnimateDroprown>
		</SearchInputContainer>
	);
};
