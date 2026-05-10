/**
 * Modern Search Systems Demo
 * 
 * A 6-minute cinematic video explaining how modern search systems work.
 * Based on the script: "How Modern Search Systems Actually Work"
 */

import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { ThemeProvider } from "../themes/ThemeProvider";
import { darkTheme } from "../themes/dark";
import {
	Title,
	Text,
	Container,
	Stack,
	Grid,
	Browser,
	CodeBlock,
	Diagram,
	BarChart,
} from "../components";
// Animation imports removed - using animation prop instead

// Video configuration: 6 minutes at 30fps = 10800 frames
const FPS = 30;

// Scene durations (in seconds)
const SCENES = {
	hook: { start: 0, duration: 30 },
	naiveSearch: { start: 30, duration: 30 },
	indexes: { start: 60, duration: 50 },
	searchTypes: { start: 110, duration: 60 },
	elasticsearch: { start: 170, duration: 60 },
	ranking: { start: 230, duration: 35 },
	latency: { start: 265, duration: 45 },
	modernStack: { start: 310, duration: 30 },
	ending: { start: 340, duration: 20 },
};

// Helper to convert seconds to frames
const sec = (seconds: number) => seconds * FPS;

/**
 * Scene 1: Hook (0:00 → 0:30)
 */
const Scene1Hook: React.FC = () => {
	const frame = useCurrentFrame();
	
	const latencies = [1200, 600, 90, 18];
	const currentLatency = latencies[Math.min(Math.floor(frame / 7), 3)];
	
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					{/* Title with glitch effect */}
					<Title
						text="Modern Search Systems"
						level={1}
						size="3xl"
						effect="glitch"
						animation={{ type: "fadeIn", duration: 20, delay: 0 }}
					/>
					
					{/* Search bar simulation */}
					<div style={{ width: 600 }}>
						<Browser
							url="google.com/search"
							title="Search"
							content={
								<div style={{ padding: 40, textAlign: "center" }}>
									<Text content="Searching billions of records..." variant="body" />
								</div>
							}
							loading={frame < 20}
							loadingProgress={Math.min((frame / 20) * 100, 100)}
						/>
					</div>
					
					{/* Latency counter */}
					<Container
						background="rgba(59, 130, 246, 0.1)"
						padding={20}
						borderRadius={8}
						animation={{ type: "fadeIn", duration: 20, delay: 20 }}
					>
						<Text
							content={`Latency: ${currentLatency}ms`}
							variant="body"
							size="xl"
							weight="bold"
							color="#3b82f6"
						/>
					</Container>
					
					{/* Subtitle */}
					<Text
						content="Ranking • Predicting • Indexing • Caching • Optimizing"
						variant="subtitle"
						size="lg"
						align="center"
						animation={{ type: "fadeIn", duration: 30, delay: 25 }}
					/>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Scene 2: Naive Search (0:30 → 1:00)
 */
const Scene2NaiveSearch: React.FC = () => {
	
	const code = `for (const item of database) {
  if (item.includes(query)) {
    return item
  }
}`;
	
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)" }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="Naive Search: Brute Force"
						level={2}
						size="2xl"
					/>
					
					<Text
						content="Check every record... one by one."
						variant="body"
						size="lg"
						align="center"
						maxWidth={700}
						animation={{ type: "fadeIn", duration: 20, delay: 10 }}
					/>
					
					<CodeBlock
						code={code}
						language="javascript"
						showLineNumbers={true}
						revealAnimation="line-by-line"
						revealSpeed={1}
						width={600}
						animation={{ type: "fadeIn", duration: 30, delay: 15 }}
					/>
					
					<Text
						content="At millions of rows... this becomes painfully slow."
						variant="body"
						size="lg"
						color="#ef4444"
						weight="bold"
						animation={{ type: "fadeIn", duration: 20, delay: 25 }}
					/>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Scene 3: Indexes Changed Everything (1:00 → 1:50)
 */
const Scene3Indexes: React.FC = () => {
	
	const sqlCode = `CREATE INDEX idx_users_email 
ON users(email);`;
	
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg, #334155 0%, #475569 100%)" }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="Indexes Changed Everything"
						level={2}
						size="2xl"
					/>
					
					<Text
						content="An index is a pre-organized structure that tells the database where data already lives."
						variant="body"
						size="lg"
						align="center"
						maxWidth={800}
						animation={{ type: "fadeIn", duration: 20, delay: 10 }}
					/>
					
					<CodeBlock
						code={sqlCode}
						language="sql"
						showLineNumbers={false}
						revealAnimation="fade"
						width={600}
						animation={{ type: "fadeIn", duration: 30, delay: 20 }}
					/>
					
					<Grid columns={2} gap={40}>
						<Container background="rgba(239, 68, 68, 0.1)" padding={20} borderRadius={8}>
							<Stack direction="vertical" spacing={10} align="center">
								<Text content="Without Index" weight="bold" size="lg" color="#ef4444" />
								<Text content="Full Scan" variant="caption" />
								<Text content="~2000ms" size="xl" weight="bold" color="#ef4444" />
							</Stack>
						</Container>
						
						<Container background="rgba(34, 197, 94, 0.1)" padding={20} borderRadius={8}>
							<Stack direction="vertical" spacing={10} align="center">
								<Text content="With Index" weight="bold" size="lg" color="#22c55e" />
								<Text content="Direct Jump" variant="caption" />
								<Text content="~5ms" size="xl" weight="bold" color="#22c55e" />
							</Stack>
						</Container>
					</Grid>
					
					<Text
						content="PostgreSQL and MySQL rely heavily on B-Tree indexes"
						variant="caption"
						size="md"
						color="#94a3b8"
						animation={{ type: "fadeIn", duration: 20, delay: 40 }}
					/>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Scene 4: Different Types of Search (1:50 → 2:50)
 */
const Scene4SearchTypes: React.FC = () => {
	
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg, #475569 0%, #64748b 100%)" }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={30} align="center">
					<Title
						text="Different Types of Search"
						level={2}
						size="2xl"
						animation={{ type: "fadeIn", duration: 20 }}
					/>
					
					<Grid columns={2} rows={2} gap={30}>
						{/* Exact Search */}
						<Container background="rgba(59, 130, 246, 0.1)" padding={20} borderRadius={8}>
							<Stack direction="vertical" spacing={10}>
								<Text content="Exact Search" weight="bold" size="lg" color="#3b82f6" />
								<CodeBlock
									code="WHERE id = 42"
									language="sql"
									showLineNumbers={false}
									width={250}
									fontSize={12}
								/>
								<Text content="Fast and predictable" variant="caption" size="sm" />
							</Stack>
						</Container>
						
						{/* Prefix Search */}
						<Container background="rgba(168, 85, 247, 0.1)" padding={20} borderRadius={8}>
							<Stack direction="vertical" spacing={10}>
								<Text content="Prefix Search" weight="bold" size="lg" color="#a855f7" />
								<CodeBlock
									code="WHERE name LIKE 'vis%'"
									language="sql"
									showLineNumbers={false}
									width={250}
									fontSize={12}
								/>
								<Text content="Powers autocomplete" variant="caption" size="sm" />
							</Stack>
						</Container>
						
						{/* Full Text Search */}
						<Container background="rgba(34, 197, 94, 0.1)" padding={20} borderRadius={8}>
							<Stack direction="vertical" spacing={10}>
								<Text content="Full Text Search" weight="bold" size="lg" color="#22c55e" />
								<Text content="Tokenization → Stemming → Ranking" variant="caption" size="sm" />
								<Text content='"running" → "run"' variant="caption" size="sm" color="#94a3b8" />
							</Stack>
						</Container>
						
						{/* Vector Search */}
						<Container background="rgba(249, 115, 22, 0.1)" padding={20} borderRadius={8}>
							<Stack direction="vertical" spacing={10}>
								<Text content="Vector Search" weight="bold" size="lg" color="#f97316" />
								<Text content="Semantic similarity" variant="caption" size="sm" />
								<Text content="Search by meaning, not words" variant="caption" size="sm" color="#94a3b8" />
							</Stack>
						</Container>
					</Grid>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Scene 5: Elasticsearch & Search Engines (2:50 → 3:50)
 */
const Scene5Elasticsearch: React.FC = () => {
	
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg, #64748b 0%, #475569 100%)" }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="Elasticsearch & Search Engines"
						level={2}
						size="2xl"
					/>
					
					<Text
						content="Traditional databases weren't built for large-scale text search."
						variant="body"
						size="lg"
						align="center"
						maxWidth={800}
						animation={{ type: "fadeIn", duration: 20, delay: 10 }}
					/>
					
					<Diagram
						nodes={[
							{ id: "1", label: "Shard 1", x: 100, y: 100, width: 120, height: 60, color: "#3b82f6" },
							{ id: "2", label: "Shard 2", x: 280, y: 100, width: 120, height: 60, color: "#3b82f6" },
							{ id: "3", label: "Shard 3", x: 460, y: 100, width: 120, height: 60, color: "#3b82f6" },
							{ id: "4", label: "Inverted Index", x: 280, y: 220, width: 120, height: 60, color: "#22c55e" },
						]}
						connections={[
							{ id: "c1", from: "1", to: "4", arrow: "forward" },
							{ id: "c2", from: "2", to: "4", arrow: "forward" },
							{ id: "c3", from: "3", to: "4", arrow: "forward" },
						]}
						animateDrawing={true}
						drawingDuration={40}
						width={700}
						height={350}
					/>
					
					<Container background="rgba(34, 197, 94, 0.1)" padding={20} borderRadius={8}>
						<Text
							content='"search" → doc1, doc8, doc42'
							variant="body"
							size="lg"
							weight="bold"
							color="#22c55e"
						/>
					</Container>
					
					<Text
						content="Modern logging, observability, and e-commerce depend on distributed search"
						variant="caption"
						size="md"
						color="#94a3b8"
						align="center"
						animation={{ type: "fadeIn", duration: 20, delay: 50 }}
					/>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Scene 6: Relevance Ranking (3:50 → 4:25)
 */
const Scene6Ranking: React.FC = () => {
	
	const rankingCode = `score = relevance + popularity + freshness`;
	
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg, #475569 0%, #334155 100%)" }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="Relevance Ranking"
						level={2}
						size="2xl"
						animation={{ type: "fadeIn", duration: 20 }}
					/>
					
					<Text
						content="Search isn't just retrieval anymore. It's ranking."
						variant="body"
						size="lg"
						align="center"
						animation={{ type: "fadeIn", duration: 20, delay: 10 }}
					/>
					
					<Stack direction="horizontal" spacing={20}>
						{["Text Relevance", "Popularity", "Freshness", "User Behavior", "Context"].map((factor, i) => (
							<Container
								key={factor}
								background="rgba(59, 130, 246, 0.1)"
								padding={15}
								borderRadius={8}
								animation={{ type: "fadeIn", duration: 15, delay: 15 + i * 3 }}
							>
								<Text content={factor} variant="caption" size="sm" weight="semibold" />
							</Container>
						))}
					</Stack>
					
					<CodeBlock
						code={rankingCode}
						language="javascript"
						showLineNumbers={false}
						width={500}
						animation={{ type: "fadeIn", duration: 20, delay: 25 }}
					/>
					
					<Text
						content="The best result isn't always the first match. It's the most useful one."
						variant="body"
						size="lg"
						weight="bold"
						color="#3b82f6"
						align="center"
						maxWidth={700}
						animation={{ type: "fadeIn", duration: 20, delay: 30 }}
					/>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Scene 7: P95, Latency & Scale (4:25 → 5:10)
 */
const Scene7Latency: React.FC = () => {
	
	const latencyData = [
		{ label: "P50", value: 20, color: "#22c55e" },
		{ label: "P95", value: 85, color: "#f59e0b" },
		{ label: "P99", value: 150, color: "#ef4444" },
	];
	
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)" }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="P95, Latency & Scale"
						level={2}
						size="2xl"
					/>
					
					<Text
						content="At scale... average latency becomes meaningless."
						variant="body"
						size="lg"
						align="center"
						animation={{ type: "fadeIn", duration: 20, delay: 10 }}
					/>
					
					<BarChart
						data={latencyData}
						title="Latency Distribution"
						yAxisLabel="Latency (ms)"
						showValues={true}
						animateEntry={true}
						animationDuration={30}
						width={600}
						height={350}
					/>
					
					<Container background="rgba(59, 130, 246, 0.1)" padding={20} borderRadius={8}>
						<Text
							content="P95 = 95% of requests complete below this latency"
							variant="body"
							size="md"
							color="#3b82f6"
						/>
					</Container>
					
					<Text
						content="Users remember slow searches... not average ones."
						variant="body"
						size="lg"
						weight="bold"
						align="center"
						animation={{ type: "fadeIn", duration: 20, delay: 35 }}
					/>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Scene 8: Modern Search Stack (5:10 → 5:40)
 */
const Scene8ModernStack: React.FC = () => {
	
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)" }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="Modern Search Stack"
						level={2}
						size="2xl"
						animation={{ type: "fadeIn", duration: 20 }}
					/>
					
					<Text
						content="Modern search systems are entire ecosystems."
						variant="body"
						size="lg"
						align="center"
						animation={{ type: "fadeIn", duration: 20, delay: 10 }}
					/>
					
					<Diagram
						nodes={[
							{ id: "1", label: "User Query", x: 250, y: 50, width: 120, height: 50, color: "#3b82f6" },
							{ id: "2", label: "API Gateway", x: 250, y: 130, width: 120, height: 50, color: "#8b5cf6" },
							{ id: "3", label: "Cache", x: 100, y: 210, width: 100, height: 50, color: "#22c55e" },
							{ id: "4", label: "Search Cluster", x: 250, y: 210, width: 120, height: 50, color: "#f59e0b" },
							{ id: "5", label: "Ranking", x: 400, y: 210, width: 100, height: 50, color: "#ef4444" },
							{ id: "6", label: "Results", x: 250, y: 290, width: 120, height: 50, color: "#3b82f6" },
						]}
						connections={[
							{ id: "c1", from: "1", to: "2", arrow: "forward" },
							{ id: "c2", from: "2", to: "3", arrow: "forward" },
							{ id: "c3", from: "2", to: "4", arrow: "forward" },
							{ id: "c4", from: "4", to: "5", arrow: "forward" },
							{ id: "c5", from: "3", to: "6", arrow: "forward" },
							{ id: "c6", from: "5", to: "6", arrow: "forward" },
						]}
						animateDrawing={true}
						drawingDuration={25}
						width={600}
						height={400}
					/>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Scene 9: Ending (5:40 → 6:00)
 */
const Scene9Ending: React.FC = () => {
	
	return (
		<AbsoluteFill style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)" }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="Modern Search Systems"
						level={1}
						size="3xl"
						effect="fadeIn"
						animation={{ type: "fadeIn", duration: 20 }}
					/>
					
					<Text
						content="Search evolved from simple string matching... into one of the most sophisticated systems in computing."
						variant="body"
						size="xl"
						align="center"
						maxWidth={900}
						animation={{ type: "fadeIn", duration: 20, delay: 10 }}
					/>
					
					<Container
						background="rgba(59, 130, 246, 0.2)"
						padding={30}
						borderRadius={12}
						animation={{ type: "fadeIn", duration: 20, delay: 15 }}
					>
						<Text
							content="Powered By Speed, Ranking & Scale"
							variant="body"
							size="xl"
							weight="bold"
							color="#3b82f6"
						/>
					</Container>
					
					<Text
						content="Every millisecond saved... changes how humans interact with information."
						variant="body"
						size="lg"
						align="center"
						maxWidth={800}
						animation={{ type: "fadeIn", duration: 20, delay: 18 }}
					/>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Main Composition
 */
export const ModernSearchDemo: React.FC = () => {
	return (
		<ThemeProvider initialTheme={darkTheme}>
			<AbsoluteFill>
				<Sequence from={sec(SCENES.hook.start)} durationInFrames={sec(SCENES.hook.duration)}>
					<Scene1Hook />
				</Sequence>
				
				<Sequence from={sec(SCENES.naiveSearch.start)} durationInFrames={sec(SCENES.naiveSearch.duration)}>
					<Scene2NaiveSearch />
				</Sequence>
				
				<Sequence from={sec(SCENES.indexes.start)} durationInFrames={sec(SCENES.indexes.duration)}>
					<Scene3Indexes />
				</Sequence>
				
				<Sequence from={sec(SCENES.searchTypes.start)} durationInFrames={sec(SCENES.searchTypes.duration)}>
					<Scene4SearchTypes />
				</Sequence>
				
				<Sequence from={sec(SCENES.elasticsearch.start)} durationInFrames={sec(SCENES.elasticsearch.duration)}>
					<Scene5Elasticsearch />
				</Sequence>
				
				<Sequence from={sec(SCENES.ranking.start)} durationInFrames={sec(SCENES.ranking.duration)}>
					<Scene6Ranking />
				</Sequence>
				
				<Sequence from={sec(SCENES.latency.start)} durationInFrames={sec(SCENES.latency.duration)}>
					<Scene7Latency />
				</Sequence>
				
				<Sequence from={sec(SCENES.modernStack.start)} durationInFrames={sec(SCENES.modernStack.duration)}>
					<Scene8ModernStack />
				</Sequence>
				
				<Sequence from={sec(SCENES.ending.start)} durationInFrames={sec(SCENES.ending.duration)}>
					<Scene9Ending />
				</Sequence>
			</AbsoluteFill>
		</ThemeProvider>
	);
};
