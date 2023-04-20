import React from "react";
import { motion } from "framer-motion";
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

const containerVariants = {
	expanded: {
		height: "21.5em",
	},
	collapsed: {
		height: "2.8em",
	},
};

const containerTransition = { type: "spring", damping: 22, stiffness: 150 };

export function SearchContainer({ parentRef, isExpanded, children }) {
	return (
		<SearchBarContainer
			animate={isExpanded ? "expanded" : "collapsed"}
			variants={containerVariants}
			transition={containerTransition}
			ref={parentRef}>
			{children}
		</SearchBarContainer>
	);
}
