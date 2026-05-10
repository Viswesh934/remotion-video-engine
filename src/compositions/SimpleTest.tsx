/**
 * Simple Test Composition
 * 
 * A minimal composition to test if Remotion is working
 */

import React from "react";
import { AbsoluteFill } from "remotion";

export const SimpleTest: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: "#1e293b",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				gap: 20,
			}}
		>
			<h1 style={{ color: "white", fontSize: 48 }}>Simple Test</h1>
			<p style={{ color: "#94a3b8", fontSize: 24 }}>
				If you see this, Remotion is working!
			</p>
		</AbsoluteFill>
	);
};
