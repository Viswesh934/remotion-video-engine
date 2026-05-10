/**
 * Diagram Component
 * 
 * A technical diagram component for visualizing nodes and connections.
 * Supports various node shapes and animated drawing of connections.
 */

import React, { useMemo, type CSSProperties } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import type { DiagramProps } from "../types";
import { useTheme } from "../themes/useTheme";
import { useFadeIn } from "../animations";

/**
 * Diagram component for technical visualizations
 * 
 * @example
 * ```tsx
 * <Diagram 
 *   nodes={[
 *     { id: "1", label: "Client", x: 100, y: 100, shape: "rectangle" },
 *     { id: "2", label: "Server", x: 300, y: 100, shape: "rectangle" },
 *     { id: "3", label: "Database", x: 300, y: 250, shape: "cylinder" }
 *   ]}
 *   connections={[
 *     { id: "c1", from: "1", to: "2", label: "HTTP", arrow: "forward" },
 *     { id: "c2", from: "2", to: "3", label: "SQL", arrow: "both" }
 *   ]}
 *   animateDrawing={true}
 *   drawingDuration={60}
 * />
 * ```
 */
export const Diagram: React.FC<DiagramProps> = ({
	nodes,
	connections = [],
	animateDrawing = false,
	drawingDuration = 60,
	width = 800,
	height = 600,
	className,
	style,
	animation,
}) => {
	const { theme } = useTheme();
	const frame = useCurrentFrame();
	
	// Calculate animation styles
	let animationStyle: CSSProperties = {};
	if (animation) {
		const { type, duration = 30, delay = 0, easing = "easeInOut" } = animation;
		const start = delay;
		
		if (type === "fadeIn") {
			const opacity = useFadeIn({ start, duration, easing });
			animationStyle = { opacity };
		}
	}
	
	// Calculate drawing progress (for future use)
	// const drawProgress = useMemo(() => {
	// 	if (!animateDrawing) return 1;
	// 	
	// 	return interpolate(
	// 		frame,
	// 		[0, drawingDuration],
	// 		[0, 1],
	// 		{ extrapolateRight: "clamp" }
	// 	);
	// }, [animateDrawing, drawingDuration, frame]);
	
	// Build node lookup map
	const nodeMap = useMemo(() => {
		const map = new Map();
		nodes.forEach(node => map.set(node.id, node));
		return map;
	}, [nodes]);
	
	// Calculate node center positions
	const getNodeCenter = (nodeId: string) => {
		const node = nodeMap.get(nodeId);
		if (!node) return { x: 0, y: 0 };
		
		const w = node.width || 120;
		const h = node.height || 60;
		
		return {
			x: node.x + w / 2,
			y: node.y + h / 2,
		};
	};
	
	// Render node shape
	const renderNodeShape = (node: typeof nodes[0]) => {
		const w = node.width || 120;
		const h = node.height || 60;
		const nodeColor = node.color || theme.colors.primary;
		
		switch (node.shape) {
			case "circle":
				return (
					<circle
						cx={w / 2}
						cy={h / 2}
						r={Math.min(w, h) / 2}
						fill={`${nodeColor}20`}
						stroke={nodeColor}
						strokeWidth={2}
					/>
				);
			
			case "ellipse":
				return (
					<ellipse
						cx={w / 2}
						cy={h / 2}
						rx={w / 2}
						ry={h / 2}
						fill={`${nodeColor}20`}
						stroke={nodeColor}
						strokeWidth={2}
					/>
				);
			
			case "diamond":
				return (
					<polygon
						points={`${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}`}
						fill={`${nodeColor}20`}
						stroke={nodeColor}
						strokeWidth={2}
					/>
				);
			
			case "rectangle":
			default:
				return (
					<rect
						x={0}
						y={0}
						width={w}
						height={h}
						rx={8}
						fill={`${nodeColor}20`}
						stroke={nodeColor}
						strokeWidth={2}
					/>
				);
		}
	};
	
	// Render connections
	const renderConnections = () => {
		return connections.map((conn, index) => {
			const fromPos = getNodeCenter(conn.from);
			const toPos = getNodeCenter(conn.to);
			
			// Calculate connection progress
			const connectionStart = (index / connections.length) * drawingDuration;
			const connectionDuration = drawingDuration / connections.length;
			const connectionProgress = interpolate(
				frame,
				[connectionStart, connectionStart + connectionDuration],
				[0, 1],
				{ extrapolateRight: "clamp", extrapolateLeft: "clamp" }
			);
			
			const progress = animateDrawing ? connectionProgress : 1;
			
			// Calculate path
			const dx = toPos.x - fromPos.x;
			const dy = toPos.y - fromPos.y;
			
			// Current end point based on progress
			const currentEndX = fromPos.x + dx * progress;
			const currentEndY = fromPos.y + dy * progress;
			
			const connColor = conn.color || theme.colors.textSecondary;
			
			// Stroke dash array for line styles
			const strokeDashArray = conn.lineStyle === "dashed" ? "8,4" 
				: conn.lineStyle === "dotted" ? "2,4" 
				: "none";
			
			
			return (
				<g key={conn.id}>
					{/* Connection line */}
					<line
						x1={fromPos.x}
						y1={fromPos.y}
						x2={currentEndX}
						y2={currentEndY}
						stroke={connColor}
						strokeWidth={2}
						strokeDasharray={strokeDashArray}
						strokeLinecap="round"
					/>
					
				
					{/* Connection label */}
					{conn.label && progress > 0.5 && (
						<g opacity={interpolate(progress, [0.5, 0.7], [0, 1], { extrapolateRight: "clamp" })}>
							<rect
								x={(fromPos.x + toPos.x) / 2 - 30}
								y={(fromPos.y + toPos.y) / 2 - 12}
								width={60}
								height={24}
								fill={theme.colors.background}
								stroke={connColor}
								strokeWidth={1}
								rx={4}
							/>
							<text
								x={(fromPos.x + toPos.x) / 2}
								y={(fromPos.y + toPos.y) / 2}
								textAnchor="middle"
								dominantBaseline="middle"
								fill={theme.colors.text}
								fontSize={11}
								fontFamily={theme.typography.fontFamily}
							>
								{conn.label}
							</text>
						</g>
					)}
				</g>
			);
		});
	};
	
	// Render nodes
	const renderNodes = () => {
		return nodes.map((node, index) => {
			const w = node.width || 120;
			const h = node.height || 60;
			
			// Calculate node fade-in
			const nodeDelay = animateDrawing ? drawingDuration * 0.3 + index * 5 : index * 3;
			const nodeOpacity = useFadeIn({ start: nodeDelay, duration: 20, easing: "easeOut" });
			
			return (
				<g
					key={node.id}
					transform={`translate(${node.x}, ${node.y})`}
					opacity={nodeOpacity}
				>
					{/* Node shape */}
					{renderNodeShape(node)}
					
					{/* Node icon */}
					{node.icon && (
						<foreignObject x={w / 2 - 16} y={h / 2 - 24} width={32} height={32}>
							<div className="">{node.icon}</div>
						</foreignObject>
					)}
					
					{/* Node label */}
					<text
						x={w / 2}
						y={node.icon ? h / 2 + 8 : h / 2}
						textAnchor="middle"
						dominantBaseline="middle"
						fill={theme.colors.text}
						fontSize={14}
						fontWeight={600}
						fontFamily={theme.typography.fontFamily}
					>
						{node.label}
					</text>
				</g>
			);
		});
	};
	
	// Build component styles
	const diagramStyle = useMemo((): CSSProperties => {
		const baseStyle: CSSProperties = {
			width: typeof width === "number" ? `${width}px` : width,
			height: typeof height === "number" ? `${height}px` : height,
		};
		
		return {
			...baseStyle,
			...animationStyle,
			...style,
		};
	}, [width, height, animationStyle, style]);
	
	return (
		<div className="" style={diagramStyle}>
			<svg
				width="100%"
				height="100%"
				viewBox={`0 0 ${typeof width === "number" ? width : 800} ${typeof height === "number" ? height : 600}`}
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Render connections first (behind nodes) */}
				<g className="">
					{renderConnections()}
				</g>
				
				{/* Render nodes on top */}
				<g className="">
					{renderNodes()}
				</g>
			</svg>
		</div>
	);
};
