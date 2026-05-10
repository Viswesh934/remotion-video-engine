/**
 * Technical Components Demo
 * 
 * Demonstration composition showcasing Browser, Terminal, and CodeBlock components
 */

import React from "react";
import { AbsoluteFill } from "remotion";
import { ThemeProvider } from "../themes/ThemeProvider";
import { darkTheme } from "../themes/dark";
import { Browser } from "./Browser";
import { Terminal } from "./Terminal";
import { CodeBlock } from "./CodeBlock";
import { Stack } from "./Stack";

/**
 * Demo composition for technical components
 */
export const TechnicalComponentsDemo: React.FC = () => {
	const sampleCode = `function greet(name: string): string {
  // Return a greeting message
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`;

	return (
		<ThemeProvider themes={[darkTheme]} initialTheme={darkTheme}>
			<AbsoluteFill style={{ backgroundColor: "#1a1a1a", padding: 40 }}>
				<Stack direction="vertical" spacing={32}>
					{/* Browser Component Demo */}
					<Browser
						url="https://example.com"
						title="Example Website"
						content={
							<div style={{ padding: 40, textAlign: "center" }}>
								<h1>Welcome to Example.com</h1>
								<p>This is a simulated browser window</p>
							</div>
						}
						width={800}
						height={200}
						animation={{ type: "fadeIn", duration: 30 }}
					/>

					{/* Terminal Component Demo */}
					<Terminal
						title="bash"
						commands={[
							{ command: "npm install remotion", output: "Installing packages..." },
							{ command: "npm run dev", output: "Server started on port 3000", delay: 60 },
						]}
						width={800}
						height={200}
						animation={{ type: "slideIn", duration: 30, delay: 30 }}
					/>

					{/* CodeBlock Component Demo */}
					<CodeBlock
						code={sampleCode}
						language="typescript"
						fileName="greet.ts"
						showLineNumbers={true}
						highlightLines={[2, 3]}
						width={800}
						animation={{ type: "slideIn", duration: 30, delay: 60 }}
					/>
				</Stack>
			</AbsoluteFill>
		</ThemeProvider>
	);
};
