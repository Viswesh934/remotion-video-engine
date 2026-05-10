/**
 * Minimal Demo - No custom components
 */

import React from "react";
import { AbsoluteFill } from "remotion";

export const MinimalDemo: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: "#1e293b",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				gap: 40,
				padding: 60,
			}}
		>
			<h1 style={{ color: "white", fontSize: 64, margin: 0 }}>
				Modern Search Systems
			</h1>
			
			<p style={{ color: "#94a3b8", fontSize: 24, textAlign: "center", maxWidth: 800 }}>
				Every second, modern systems search through billions of records and return results almost instantly.
			</p>
			
			<div style={{
				background: "rgba(59, 130, 246, 0.1)",
				padding: 20,
				borderRadius: 8,
			}}>
				<p style={{ color: "#3b82f6", fontSize: 20, margin: 0 }}>
					Latency: 18ms
				</p>
			</div>
		</AbsoluteFill>
	);
};
