/**
 * Core Animation Utilities - Test Component
 * 
 * This component demonstrates all core animation utilities in action.
 * It can be used to visually verify that animations work correctly.
 */

import React from "react";
import { AbsoluteFill } from "remotion";
import {
	useFadeIn,
	useFadeOut,
	useSlideIn,
	useSlideOut,
	useScaleIn,
	useScaleOut,
	useZoom,
	useRotate,
	useBlur,
	combineTransforms,
	useAnimationProgress,
} from "./core";

/**
 * Test component demonstrating fade animations
 */
export const FadeTest: React.FC = () => {
	const fadeInOpacity = useFadeIn({ duration: 30 });
	const fadeOutOpacity = useFadeOut({ start: 60, duration: 30 });

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "25%",
					left: "50%",
					transform: "translateX(-50%)",
					color: "white",
					fontSize: 48,
					opacity: fadeInOpacity,
				}}
			>
				Fade In (0-30 frames)
			</div>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translateX(-50%)",
					color: "white",
					fontSize: 48,
					opacity: fadeOutOpacity,
				}}
			>
				Fade Out (60-90 frames)
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating slide animations
 */
export const SlideTest: React.FC = () => {
	const slideInLeft = useSlideIn({ duration: 30, direction: "left", distance: 200 });
	const slideInRight = useSlideIn({ start: 30, duration: 30, direction: "right", distance: 200 });
	const slideOutTop = useSlideOut({ start: 60, duration: 30, direction: "top", distance: 200 });

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "20%",
					left: "50%",
					transform: `translateX(-50%) ${slideInLeft}`,
					color: "white",
					fontSize: 36,
				}}
			>
				Slide In from Left
			</div>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: `translateX(-50%) ${slideInRight}`,
					color: "white",
					fontSize: 36,
				}}
			>
				Slide In from Right
			</div>
			<div
				style={{
					position: "absolute",
					top: "80%",
					left: "50%",
					transform: `translateX(-50%) ${slideOutTop}`,
					color: "white",
					fontSize: 36,
				}}
			>
				Slide Out to Top
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating scale animations
 */
export const ScaleTest: React.FC = () => {
	const scaleIn = useScaleIn({ duration: 30 });
	const scaleOut = useScaleOut({ start: 60, duration: 30 });

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "30%",
					left: "50%",
					transform: `translateX(-50%) ${scaleIn}`,
					color: "white",
					fontSize: 48,
				}}
			>
				Scale In
			</div>
			<div
				style={{
					position: "absolute",
					top: "60%",
					left: "50%",
					transform: `translateX(-50%) ${scaleOut}`,
					color: "white",
					fontSize: 48,
				}}
			>
				Scale Out
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating zoom animation
 */
export const ZoomTest: React.FC = () => {
	const zoom = useZoom({ duration: 90, from: 1, to: 2 });

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: `translate(-50%, -50%) ${zoom}`,
					color: "white",
					fontSize: 48,
				}}
			>
				Zoom In (1x to 2x)
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating rotate animation
 */
export const RotateTest: React.FC = () => {
	const rotate = useRotate({ duration: 90, from: 0, to: 360 });

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: `translate(-50%, -50%) ${rotate}`,
					color: "white",
					fontSize: 48,
				}}
			>
				Rotating 360°
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating blur animation
 */
export const BlurTest: React.FC = () => {
	const blur = useBlur({ duration: 60, from: 10, to: 0 });

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
					filter: blur,
				}}
			>
				Blur to Focus
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating combined transforms
 */
export const CombinedTest: React.FC = () => {
	const slide = useSlideIn({ duration: 30, direction: "bottom", distance: 100 });
	const scale = useScaleIn({ duration: 30 });
	const rotate = useRotate({ duration: 30, from: -10, to: 0 });
	const opacity = useFadeIn({ duration: 30 });

	const combinedTransform = combineTransforms([
		"translate(-50%, -50%)",
		slide,
		scale,
		rotate,
	]);

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: combinedTransform,
					color: "white",
					fontSize: 48,
					opacity,
				}}
			>
				Combined Animations
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating animation progress utility
 */
export const ProgressTest: React.FC = () => {
	const progress = useAnimationProgress(0, 90, "easeInOut");
	const percentage = Math.round(progress * 100);

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					color: "white",
					fontSize: 72,
					fontWeight: "bold",
				}}
			>
				{percentage}%
			</div>
			<div
				style={{
					position: "absolute",
					bottom: 100,
					left: "50%",
					transform: "translateX(-50%)",
					width: "80%",
					height: 20,
					backgroundColor: "#333",
					borderRadius: 10,
					overflow: "hidden",
				}}
			>
				<div
					style={{
						width: `${percentage}%`,
						height: "100%",
						backgroundColor: "#0080ff",
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating spring easing
 */
export const SpringTest: React.FC = () => {
	const springFade = useFadeIn({ duration: 60, easing: "spring" });
	const springScale = useScaleIn({ duration: 60, easing: "spring" });

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: `translate(-50%, -50%) ${springScale}`,
					color: "white",
					fontSize: 48,
					opacity: springFade,
				}}
			>
				Spring Animation
			</div>
		</AbsoluteFill>
	);
};
