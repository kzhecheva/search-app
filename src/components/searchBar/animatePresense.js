import React from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

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

export const AnimateDroprown = ({ isExpanded, collapseContainer, children }) => {
	return (
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
					{children}
				</>
			)}
		</AnimatePresence>
	);
};
