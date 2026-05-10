/**
 * Sequencing Utilities - Test Component
 * 
 * This component demonstrates all sequencing utilities in action.
 * It can be used to visually verify that sequencing works correctly.
 */

import React from "react";
import { AbsoluteFill } from "remotion";
import {
	useStagger,
	useTimeline,
	useCurrentTime,
	useDuration,
	useIsInRange,
	useRangeProgress,
	batchTimelineSteps,
	type TimelineStep,
} from "./sequencing";

/**
 * Test component demonstrating stagger animation
 */
export const StaggerTest: React.FC = () => {
	const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

	return (
		<AbsoluteFill style={{ backgroundColor: "#000", padding: 50 }}>
			<div style={{ color: "white", fontSize: 32, marginBottom: 40 }}>
				Stagger Animation Test
			</div>
			<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
				{items.map((item, index) => (
					<StaggeredItem key={index} index={index} text={item} />
				))}
			</div>
		</AbsoluteFill>
	);
};

const StaggeredItem: React.FC<{ index: number; text: string }> = ({ index, text }) => {
	const stagger = useStagger(index, {
		count: 5,
		stagger: 10,
		start: 0,
		duration: 30,
	});

	const opacity = stagger.progress;
	const translateX = (1 - stagger.progress) * -100;
	const scale = 0.8 + stagger.progress * 0.2;

	return (
		<div
			style={{
				opacity,
				transform: `translateX(${translateX}px) scale(${scale})`,
				color: "white",
				fontSize: 36,
				padding: 20,
				backgroundColor: stagger.isComplete ? "#0080ff" : "#333",
				borderRadius: 10,
			}}
		>
			{text} {stagger.isComplete && "✓"}
		</div>
	);
};

/**
 * Test component demonstrating timeline animation
 */
export const TimelineTest: React.FC = () => {
	const steps: TimelineStep[] = batchTimelineSteps(
		["fadeIn", "scale", "rotate", "fadeOut"],
		[0, 30, 60, 90],
		30,
		"easeInOut"
	);

	const timeline = useTimeline({ steps });

	const getStyle = (): React.CSSProperties => {
		const baseStyle: React.CSSProperties = {
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			color: "white",
			fontSize: 48,
			fontWeight: "bold",
		};

		if (timeline.currentStep?.id === "fadeIn") {
			return { ...baseStyle, opacity: timeline.progress };
		} else if (timeline.currentStep?.id === "scale") {
			return { 
				...baseStyle, 
				transform: `translate(-50%, -50%) scale(${1 + timeline.progress * 0.5})` 
			};
		} else if (timeline.currentStep?.id === "rotate") {
			return { 
				...baseStyle, 
				transform: `translate(-50%, -50%) rotate(${timeline.progress * 360}deg)` 
			};
		} else if (timeline.currentStep?.id === "fadeOut") {
			return { ...baseStyle, opacity: 1 - timeline.progress };
		}

		return baseStyle;
	};

	const style = getStyle();

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div style={style}>
				Timeline Animation
			</div>
			<div
				style={{
					position: "absolute",
					bottom: 50,
					left: "50%",
					transform: "translateX(-50%)",
					color: "white",
					fontSize: 24,
				}}
			>
				Step: {timeline.currentStep?.id || "None"} | Progress: {Math.round(timeline.progress * 100)}%
			</div>
			<div
				style={{
					position: "absolute",
					bottom: 100,
					left: "50%",
					transform: "translateX(-50%)",
					width: "80%",
					height: 10,
					backgroundColor: "#333",
					borderRadius: 5,
					overflow: "hidden",
				}}
			>
				<div
					style={{
						width: `${timeline.overallProgress * 100}%`,
						height: "100%",
						backgroundColor: "#0080ff",
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating multi-step timeline with complex animations
 */
export const ComplexTimelineTest: React.FC = () => {
	const steps: TimelineStep[] = [
		{ id: "intro", start: 0, duration: 30, easing: "easeOut" },
		{ id: "content1", start: 30, duration: 40, easing: "easeInOut" },
		{ id: "content2", start: 70, duration: 40, easing: "easeInOut" },
		{ id: "outro", start: 110, duration: 30, easing: "easeIn" },
	];

	const timeline = useTimeline({ steps });

	return (
		<AbsoluteFill style={{ backgroundColor: "#000", padding: 50 }}>
			<div style={{ color: "white", fontSize: 32, marginBottom: 40 }}>
				Complex Timeline Test
			</div>

			{/* Intro */}
			{timeline.currentStep?.id === "intro" && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: `translate(-50%, -50%) scale(${timeline.progress})`,
						color: "white",
						fontSize: 64,
						opacity: timeline.progress,
					}}
				>
					Welcome
				</div>
			)}

			{/* Content 1 */}
			{timeline.currentStep?.id === "content1" && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: `${timeline.progress * 100}%`,
						transform: "translate(-50%, -50%)",
						color: "#0080ff",
						fontSize: 48,
					}}
				>
					Content Block 1
				</div>
			)}

			{/* Content 2 */}
			{timeline.currentStep?.id === "content2" && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: `translate(-50%, -50%) rotate(${timeline.progress * 360}deg)`,
						color: "#00ff80",
						fontSize: 48,
					}}
				>
					Content Block 2
				</div>
			)}

			{/* Outro */}
			{timeline.currentStep?.id === "outro" && (
				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						color: "white",
						fontSize: 64,
						opacity: 1 - timeline.progress,
					}}
				>
					Thank You
				</div>
			)}

			{/* Progress indicator */}
			<div
				style={{
					position: "absolute",
					bottom: 50,
					left: "50%",
					transform: "translateX(-50%)",
					color: "white",
					fontSize: 20,
				}}
			>
				Current Step: {timeline.currentStep?.id || "Complete"} | 
				Overall: {Math.round(timeline.overallProgress * 100)}%
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating time utilities
 */
export const TimeUtilitiesTest: React.FC = () => {
	const currentTime = useCurrentTime();
	const totalDuration = useDuration();

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					color: "white",
					fontSize: 48,
					textAlign: "center",
				}}
			>
				<div style={{ marginBottom: 40 }}>
					Current Time: {currentTime.toFixed(2)}s
				</div>
				<div>
					Total Duration: {totalDuration.toFixed(2)}s
				</div>
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating range utilities
 */
export const RangeUtilitiesTest: React.FC = () => {
	const isInRange1 = useIsInRange(0, 60);
	const isInRange2 = useIsInRange(60, 60);
	const isInRange3 = useIsInRange(120, 60);

	const progress1 = useRangeProgress(0, 60);
	const progress2 = useRangeProgress(60, 60);
	const progress3 = useRangeProgress(120, 60);

	return (
		<AbsoluteFill style={{ backgroundColor: "#000", padding: 50 }}>
			<div style={{ color: "white", fontSize: 32, marginBottom: 40 }}>
				Range Utilities Test
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
				{/* Range 1: 0-60 frames */}
				<div>
					<div style={{ color: "white", fontSize: 24, marginBottom: 10 }}>
						Range 1 (0-60 frames): {isInRange1 ? "ACTIVE" : "INACTIVE"}
					</div>
					<div
						style={{
							width: "100%",
							height: 40,
							backgroundColor: "#333",
							borderRadius: 5,
							overflow: "hidden",
						}}
					>
						<div
							style={{
								width: `${progress1 * 100}%`,
								height: "100%",
								backgroundColor: isInRange1 ? "#0080ff" : "#666",

							}}
						/>
					</div>
					<div style={{ color: "#888", fontSize: 18, marginTop: 5 }}>
						Progress: {Math.round(progress1 * 100)}%
					</div>
				</div>

				{/* Range 2: 60-120 frames */}
				<div>
					<div style={{ color: "white", fontSize: 24, marginBottom: 10 }}>
						Range 2 (60-120 frames): {isInRange2 ? "ACTIVE" : "INACTIVE"}
					</div>
					<div
						style={{
							width: "100%",
							height: 40,
							backgroundColor: "#333",
							borderRadius: 5,
							overflow: "hidden",
						}}
					>
						<div
							style={{
								width: `${progress2 * 100}%`,
								height: "100%",
								backgroundColor: isInRange2 ? "#00ff80" : "#666",

							}}
						/>
					</div>
					<div style={{ color: "#888", fontSize: 18, marginTop: 5 }}>
						Progress: {Math.round(progress2 * 100)}%
					</div>
				</div>

				{/* Range 3: 120-180 frames */}
				<div>
					<div style={{ color: "white", fontSize: 24, marginBottom: 10 }}>
						Range 3 (120-180 frames): {isInRange3 ? "ACTIVE" : "INACTIVE"}
					</div>
					<div
						style={{
							width: "100%",
							height: 40,
							backgroundColor: "#333",
							borderRadius: 5,
							overflow: "hidden",
						}}
					>
						<div
							style={{
								width: `${progress3 * 100}%`,
								height: "100%",
								backgroundColor: isInRange3 ? "#ff0080" : "#666",

							}}
						/>
					</div>
					<div style={{ color: "#888", fontSize: 18, marginTop: 5 }}>
						Progress: {Math.round(progress3 * 100)}%
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating looping timeline
 */
export const LoopingTimelineTest: React.FC = () => {
	const steps: TimelineStep[] = [
		{ id: "pulse1", start: 0, duration: 20, easing: "easeInOut" },
		{ id: "pulse2", start: 20, duration: 20, easing: "easeInOut" },
	];

	const timeline = useTimeline({ steps, loop: true });

	const scale = timeline.currentStep?.id === "pulse1"
		? 1 + timeline.progress * 0.3
		: 1.3 - timeline.progress * 0.3;

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: `translate(-50%, -50%) scale(${scale})`,
					color: "#0080ff",
					fontSize: 64,
					fontWeight: "bold",
				}}
			>
				Looping
			</div>
			<div
				style={{
					position: "absolute",
					bottom: 50,
					left: "50%",
					transform: "translateX(-50%)",
					color: "white",
					fontSize: 20,
				}}
			>
				This timeline loops infinitely
			</div>
		</AbsoluteFill>
	);
};
