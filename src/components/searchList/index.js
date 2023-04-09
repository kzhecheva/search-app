import React from "react";
import styled from "styled-components";
import { ListCard } from "./card";

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

export function SearchList({ items, meta }) {
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
