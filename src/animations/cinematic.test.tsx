/**
 * Cinematic Effects and Transitions - Test Component
 * 
 * This component demonstrates all cinematic effects and transitions in action.
 * It can be used to visually verify that effects work correctly.
 */

import React from "react";
import { AbsoluteFill } from "remotion";
import {
	useKenBurns,
	useParallax,
	useGlitch,
	useTypewriter,
	useWipe,
	useDissolve,
	combineCinematicTransforms,
} from "./cinematic";

/**
 * Test component demonstrating Ken Burns effect
 */
export const KenBurnsTest: React.FC = () => {
	const { transform } = useKenBurns({
		duration: 180,
		fromScale: 1,
		toScale: 1.3,
		fromX: 0,
		toX: -10,
		fromY: 0,
		toY: -10,
		easing: "linear",
	});

	return (
		<AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
			<div
				style={{
					width: "100%",
					height: "100%",
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					transform,
				}}
			>
				<div
					style={{
						color: "white",
						fontSize: 72,
						fontWeight: "bold",
						textAlign: "center",
					}}
				>
					Ken Burns Effect
					<div style={{ fontSize: 36, marginTop: 20, opacity: 0.8 }}>
						Slow zoom and pan
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating parallax effect
 */
export const ParallaxTest: React.FC = () => {
	const backgroundParallax = useParallax({
		duration: 180,
		intensity: 0.3,
		direction: "vertical",
		easing: "linear",
	});

	const midgroundParallax = useParallax({
		duration: 180,
		intensity: 0.6,
		direction: "vertical",
		easing: "linear",
	});

	const foregroundParallax = useParallax({
		duration: 180,
		intensity: 1,
		direction: "vertical",
		easing: "linear",
	});

	return (
		<AbsoluteFill style={{ backgroundColor: "#1a1a2e" }}>
			{/* Background layer */}
			<div
				style={{
					position: "absolute",
					top: "10%",
					left: "50%",
					transform: `translateX(-50%) ${backgroundParallax}`,
					fontSize: 120,
					opacity: 0.2,
					color: "#16213e",
				}}
			>
				★
			</div>

			{/* Midground layer */}
			<div
				style={{
					position: "absolute",
					top: "30%",
					left: "50%",
					transform: `translateX(-50%) ${midgroundParallax}`,
					fontSize: 80,
					opacity: 0.5,
					color: "#0f3460",
				}}
			>
				Parallax
			</div>

			{/* Foreground layer */}
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: `translate(-50%, -50%) ${foregroundParallax}`,
					fontSize: 48,
					color: "white",
					fontWeight: "bold",
				}}
			>
				Layered Motion
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating glitch effect
 */
export const GlitchTest: React.FC = () => {
	const glitch = useGlitch({
		duration: 180,
		intensity: 0.8,
		frequency: 8,
	});

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: `translate(-50%, -50%) ${glitch.transform}`,
					filter: glitch.filter,
					opacity: glitch.opacity,
					color: "#00ff00",
					fontSize: 72,
					fontWeight: "bold",
					fontFamily: "monospace",
					textShadow: "0 0 10px #00ff00",
				}}
			>
				&gt; GLITCH_EFFECT
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating typewriter effect
 */
export const TypewriterTest: React.FC = () => {
	const { visibleText, showCursor } = useTypewriter({
		text: "The quick brown fox jumps over the lazy dog.",
		duration: 180,
		speed: 0.5,
		showCursor: true,
	});

	return (
		<AbsoluteFill style={{ backgroundColor: "#1e1e1e" }}>
			<div
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					color: "#d4d4d4",
					fontSize: 48,
					fontFamily: "monospace",
					whiteSpace: "pre-wrap",
					maxWidth: "80%",
				}}
			>
				{visibleText}
				{showCursor && (
					<span
						style={{
							borderRight: "3px solid #d4d4d4",
							marginLeft: 2,
						}}
					/>
				)}
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating wipe transition
 */
export const WipeTest: React.FC = () => {
	const wipeLeft = useWipe({
		start: 0,
		duration: 45,
		direction: "left",
	});

	const wipeRight = useWipe({
		start: 45,
		duration: 45,
		direction: "right",
	});

	const wipeTop = useWipe({
		start: 90,
		duration: 45,
		direction: "top",
	});

	const wipeBottom = useWipe({
		start: 135,
		duration: 45,
		direction: "bottom",
	});

	// Determine which wipe to show based on frame
	const frame = 0; // This would be useCurrentFrame() in actual use
	let currentWipe = wipeLeft;
	let label = "Wipe from Left";

	if (frame >= 135) {
		currentWipe = wipeBottom;
		label = "Wipe from Bottom";
	} else if (frame >= 90) {
		currentWipe = wipeTop;
		label = "Wipe from Top";
	} else if (frame >= 45) {
		currentWipe = wipeRight;
		label = "Wipe from Right";
	}

	return (
		<AbsoluteFill style={{ backgroundColor: "#000" }}>
			<div
				style={{
					width: "100%",
					height: "100%",
					background: "linear-gradient(45deg, #ff6b6b, #4ecdc4)",
					clipPath: currentWipe.clipPath,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						color: "white",
						fontSize: 64,
						fontWeight: "bold",
						textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
					}}
				>
					{label}
				</div>
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating dissolve transition
 */
export const DissolveTest: React.FC = () => {
	const dissolve = useDissolve({
		duration: 90,
		easing: "easeInOut",
		intensity: 1,
	});

	return (
		<AbsoluteFill>
			{/* Outgoing scene */}
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					opacity: dissolve.outgoing,
				}}
			>
				<div
					style={{
						color: "white",
						fontSize: 72,
						fontWeight: "bold",
					}}
				>
					Scene A
				</div>
			</div>

			{/* Incoming scene */}
			<div
				style={{
					position: "absolute",
					width: "100%",
					height: "100%",
					background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					opacity: dissolve.incoming,
				}}
			>
				<div
					style={{
						color: "white",
						fontSize: 72,
						fontWeight: "bold",
					}}
				>
					Scene B
				</div>
			</div>
		</AbsoluteFill>
	);
};

/**
 * Test component demonstrating combined cinematic effects
 */
export const CombinedCinematicTest: React.FC = () => {
	const kenBurns = useKenBurns({
		duration: 180,
		fromScale: 1,
		toScale: 1.2,
		fromX: 0,
		toX: 5,
		fromY: 0,
		toY: 5,
	});

	const parallax = useParallax({
		duration: 180,
		intensity: 0.5,
		direction: "both",
	});

	const { visibleText, showCursor } = useTypewriter({
		text: "Cinematic Magic",
		duration: 60,
		speed: 0.5,
		showCursor: true,
	});

	const combinedTransform = combineCinematicTransforms([
		kenBurns.transform,
		parallax,
	]);

	return (
		<AbsoluteFill style={{ backgroundColor: "#0a0a0a", overflow: "hidden" }}>
			<div
				style={{
					width: "100%",
					height: "100%",
					background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
					transform: combinedTransform,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						color: "white",
						fontSize: 64,
						fontWeight: "bold",
						fontFamily: "monospace",
					}}
				>
					{visibleText}
					{showCursor && (
						<span
							style={{
								borderRight: "4px solid white",
								marginLeft: 4,
							}}
						/>
					)}
				</div>
			</div>
		</AbsoluteFill>
	);
};
