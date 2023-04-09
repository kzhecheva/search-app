import { SearchBar } from "./components/searchBar";
import { SearchList } from "./components/searchList";
import { ItemsContext } from "./data/state";
import { useState } from "react";
import { SearchTitle } from "./components/serchTitle";
import styled, { css } from "styled-components";

const AppContainer = styled.div(
	(props) => css`
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 2em;
		margin-left: 4em;

		${props.isInitial &&
		css`
			margin-top: 8em;
			margin-left: auto;
			align-items: center;
		`}
	`,
);

function App() {
	const [items, setItems] = useState(null);

	return (
		<AppContainer isInitial={!items}>
			<ItemsContext.Provider value={items}>
				<SearchTitle />
				<SearchBar setItems={setItems} />
				<SearchList items={items} />
			</ItemsContext.Provider>
		</AppContainer>
	);
}

export default App;
