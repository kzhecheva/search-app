import React, { useContext } from "react";
import styled from "styled-components";
import { ListCard } from "./card";
import { ItemsContext, MetaContext } from "../../data/state";

const Meta = styled.div`
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 0.8em;
	white-space: nowrap;
	padding-top: 0px;
	padding-bottom: 0;
	padding-right: 8px;
	color: #70757a;
	line-height: 43px;
`;

const List = styled.div`
	margin-top: 8em;
	position: absolute;
	z-index: -1;
`;

export function SearchList() {
	const { items } = useContext(ItemsContext);
	const { meta } = useContext(MetaContext);

	return (
		<List>
			{items && (
				<Meta>
					About {meta?.results} results ({meta?.time})
				</Meta>
			)}
			{items?.map((el) => (
				<ListCard key={el?.id} element={el} />
			))}
		</List>
	);
}
