/**
 * fetch vs axios vs React Query Explainer (DETAILED & EXPANDED)
 * 
 * Extended 5-7 minute video with deeper breakdowns, real-world examples,
 * and interactive visual callouts. High visibility, white backgrounds.
 */

import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { ThemeProvider } from "../themes/ThemeProvider";
import { lightTheme } from "../themes/light";
import {
	Title,
	Text,
	Container,
	Stack,
	Grid,
	CodeBlock,
	Diagram,
} from "../components";

const FPS = 30;
const sec = (seconds: number) => seconds * FPS;

const SCENES = {
	hook: { start: 0, duration: 25 },
	problem: { start: 25, duration: 30 },
	howItWorks: { start: 55, duration: 35 },
	fetch: { start: 90, duration: 90 },
	fetchProblems: { start: 180, duration: 60 },
	axios: { start: 240, duration: 100 },
	axiosInterceptors: { start: 340, duration: 80 },
	realWorldComparison: { start: 420, duration: 50 },
	whenToUse: { start: 470, duration: 70 },
	reactQuery: { start: 540, duration: 90 },
	reactQueryExample: { start: 630, duration: 60 },
	ending: { start: 690, duration: 30 },
};

// Clean, accessible color palette
const colors = {
	white: "#ffffff",
	black: "#000000",
	darkGray: "#333333",
	mediumGray: "#666666",
	lightGray: "#f5f5f5",
	fetch: "#0066cc",
	axios: "#cc0066",
	react: "#00aa00",
	highlight: "#ff6600",
	error: "#cc0000",
	success: "#00aa00",
	warning: "#ff9900",
};

/**
 * Hook: The Problem (0:00 → 0:25)
 */
const Scene1Hook: React.FC = () => {
	return (
		<AbsoluteFill style={{ background: colors.white }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="fetch vs axios vs React Query"
						level={1}
						size="3xl"
						color={colors.black}
						animation={{ type: "fadeIn", duration: 25 }}
					/>
					<Text
						content="When should you use each one? Let's build real understanding."
						variant="body"
						size="xl"
						align="center"
						maxWidth={900}
						color={colors.darkGray}
						animation={{ type: "fadeIn", duration: 25, delay: 10 }}
					/>
					<Container
						background={colors.lightGray}
						padding={24}
						borderRadius={8}
						border={`3px solid ${colors.fetch}`}
						animation={{ type: "fadeIn", duration: 25, delay: 15 }}
					>
						<Text
							content="This isn't about picking the 'best' tool. It's about understanding the tradeoffs."
							variant="body"
							size="lg"
							weight="bold"
							color={colors.fetch}
							align="center"
						/>
					</Container>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * The Real Problem (0:25 → 0:55)
 */
const Scene2Problem: React.FC = () => {
	const realWorldNeeds = `Real apps need:
  • Auth tokens on every request
  • Automatic retries on failure
  • Request deduplication
  • Caching (don't ask twice)
  • Timeout handling
  • Progress tracking (uploads)
  • Background sync
  • Offline handling`;

	return (
		<AbsoluteFill style={{ background: colors.white }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={35} align="center">
					<Title
						text="Why This Matters"
						level={2}
						size="2xl"
						color={colors.black}
						animation={{ type: "fadeIn", duration: 20 }}
					/>
					<Text
						content="Most tutorials show you components. But 80% of production bugs are data-layer problems."
						variant="body"
						size="lg"
						align="center"
						color={colors.darkGray}
						animation={{ type: "fadeIn", duration: 20, delay: 5 }}
					/>

					<Container
						background="#fff8f0"
						padding={24}
						borderRadius={8}
						border={`3px solid ${colors.highlight}`}
						animation={{ type: "fadeIn", duration: 20, delay: 15 }}
					>
						<Stack direction="vertical" spacing={12} align="left">
							<Text
								content="🔴 Real World (not tutorials):"
								variant="body"
								weight="bold"
								color={colors.highlight}
								size="md"
							/>
							<CodeBlock
								code={realWorldNeeds}
								language="plaintext"
								showLineNumbers={false}
								width={650}
								codeColor={colors.darkGray}
							/>
						</Stack>
					</Container>

					<Text
						content="The three tools handle these differently."
						variant="body"
						size="lg"
						align="center"
						weight="bold"
						color={colors.fetch}
						animation={{ type: "fadeIn", duration: 20, delay: 30 }}
					/>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Section 1: How Frontend Actually Works (0:55 → 1:30)
 */
const Scene3HowItWorks: React.FC = () => {
	return (
		<AbsoluteFill style={{ background: colors.white }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="How Frontend-Backend Communication Works"
						level={2}
						size="2xl"
						color={colors.black}
						animation={{ type: "fadeIn", duration: 20 }}
					/>
					<Diagram
						nodes={[
							{ id: "1", label: "Browser\n(Frontend)", x: 50, y: 80, width: 160, height: 100, color: colors.fetch },
							{ id: "2", label: "HTTP Request\n(fetch/axios)", x: 350, y: 50, width: 180, height: 80, color: colors.highlight },
							{ id: "3", label: "Server\n(Backend)", x: 650, y: 80, width: 160, height: 100, color: colors.react },
							{ id: "4", label: "HTTP Response\n(JSON data)", x: 350, y: 180, width: 180, height: 80, color: colors.axios },
						]}
						connections={[
							{ id: "c1", from: "1", to: "2", arrow: "forward", label: "POST /api/users" },
							{ id: "c2", from: "2", to: "3", arrow: "forward", label: "encrypted" },
							{ id: "c3", from: "3", to: "4", arrow: "forward", label: "200 OK" },
							{ id: "c4", from: "4", to: "1", arrow: "forward", label: "[{...}]" },
						]}
						animateDrawing={true}
						drawingDuration={30}
						width={850}
						height={350}
						animation={{ type: "fadeIn", duration: 30, delay: 10 }}
					/>
					<Grid columns={2} gap={30}>
						<Container
							background={colors.lightGray}
							padding={20}
							borderRadius={8}
							border={`2px solid ${colors.fetch}`}
						>
							<Stack direction="vertical" spacing={10} align="left">
								<Text
									content="Frontend Job:"
									variant="body"
									weight="bold"
									color={colors.fetch}
									size="md"
								/>
								<Text content="• Make HTTP requests" variant="caption" size="sm" color={colors.darkGray} />
								<Text content="• Handle responses" variant="caption" size="sm" color={colors.darkGray} />
								<Text content="• Manage errors" variant="caption" size="sm" color={colors.darkGray} />
								<Text content="• Cache data" variant="caption" size="sm" color={colors.darkGray} />
							</Stack>
						</Container>
						<Container
							background={colors.lightGray}
							padding={20}
							borderRadius={8}
							border={`2px solid ${colors.react}`}
						>
							<Stack direction="vertical" spacing={10} align="left">
								<Text
									content="This is where the tools differ:"
									variant="body"
									weight="bold"
									color={colors.react}
									size="md"
								/>
								<Text content="• How easy is it?" variant="caption" size="sm" color={colors.darkGray} />
								<Text content="• How much control?" variant="caption" size="sm" color={colors.darkGray} />
								<Text content="• How much power?" variant="caption" size="sm" color={colors.darkGray} />
							</Stack>
						</Container>
					</Grid>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Section 2: fetch in Detail (1:30 → 3:00)
 */
const Scene4Fetch: React.FC = () => {
	const fetchBasic = `// Simple GET request
const response = await fetch('/api/users')
const data = await response.json()
console.log(data)`;

	const fetchWithError = `// You have to handle errors manually
const response = await fetch('/api/users')

// Check if response is ok
if (!response.ok) {
  throw new Error(\`API error: \${response.status}\`)
}

// Parse response manually
const data = await response.json()`;

	const fetchRealWorld = `// Real-world fetch (lots of boilerplate)
async function getUsers() {
  try {
    const response = await fetch('/api/users', {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch users:', error)
    // Retry logic? Caching? Timeout? YOU implement it.
  }
}`;

	return (
		<AbsoluteFill style={{ background: colors.white }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={30} align="center">
					<Title
						text="fetch: The Browser Native API"
						level={2}
						size="2xl"
						color={colors.black}
						animation={{ type: "fadeIn", duration: 20 }}
					/>

					<Stack direction="vertical" spacing={20} align="center">
						<Text
							content="Simplest Case: Just Get Some Data"
							variant="caption"
							size="md"
							weight="bold"
							color={colors.highlight}
							animation={{ type: "fadeIn", duration: 15, delay: 10 }}
						/>
						<Container
							background={colors.lightGray}
							padding={20}
							borderRadius={8}
							border={`2px solid ${colors.fetch}`}
							animation={{ type: "fadeIn", duration: 20, delay: 12 }}
						>
							<CodeBlock
								code={fetchBasic}
								language="javascript"
								showLineNumbers={true}
								revealAnimation="line-by-line"
								revealSpeed={1}
								width={700}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background={colors.lightGray}
							padding={16}
							borderRadius={8}
							border={`2px solid ${colors.react}`}
						>
							<Text
								content="✓ Clean and simple for trivial requests"
								variant="caption"
								size="sm"
								color={colors.react}
							/>
						</Container>
					</Stack>

					<Stack direction="vertical" spacing={20} align="center">
						<Text
							content="But Reality Demands More: Check for Errors"
							variant="caption"
							size="md"
							weight="bold"
							color={colors.highlight}
							animation={{ type: "fadeIn", duration: 15, delay: 35 }}
						/>
						<Container
							background={colors.lightGray}
							padding={20}
							borderRadius={8}
							border={`2px solid ${colors.fetch}`}
							animation={{ type: "fadeIn", duration: 20, delay: 37 }}
						>
							<CodeBlock
								code={fetchWithError}
								language="javascript"
								showLineNumbers={true}
								revealAnimation="line-by-line"
								revealSpeed={1}
								width={700}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background="#fff8f0"
							padding={16}
							borderRadius={8}
							border={`2px solid ${colors.highlight}`}
						>
							<Text
								content="⚠️ Already 2x more code"
								variant="caption"
								size="sm"
								color={colors.highlight}
								weight="bold"
							/>
						</Container>
					</Stack>

					<Stack direction="vertical" spacing={20} align="center">
						<Text
							content="Production Reality: Auth, Retries, Timeouts"
							variant="caption"
							size="md"
							weight="bold"
							color="#cc0000"
							animation={{ type: "fadeIn", duration: 15, delay: 60 }}
						/>
						<Container
							background="#fff0f0"
							padding={20}
							borderRadius={8}
							border={`3px solid #cc0000`}
							animation={{ type: "fadeIn", duration: 20, delay: 62 }}
						>
							<CodeBlock
								code={fetchRealWorld}
								language="javascript"
								showLineNumbers={true}
								revealAnimation="line-by-line"
								revealSpeed={2}
								width={700}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background="#fff0f0"
							padding={16}
							borderRadius={8}
							border={`2px solid #cc0000`}
						>
							<Text
								content="❌ And this doesn't even handle retries, caching, or timeouts!"
								variant="caption"
								size="sm"
								color="#cc0000"
								weight="bold"
							/>
						</Container>
					</Stack>

					<Grid columns={3} gap={15}>
						<Container background={colors.lightGray} padding={14} borderRadius={8} border={`2px solid ${colors.react}`}>
							<Stack direction="vertical" spacing={6} align="center">
								<Text content="✓ Native" variant="caption" weight="bold" color={colors.react} size="sm" />
								<Text content="No install" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
						<Container background="#fff0f0" padding={14} borderRadius={8} border={`2px solid #cc0000`}>
							<Stack direction="vertical" spacing={6} align="center">
								<Text content="✗ Verbose" variant="caption" weight="bold" color="#cc0000" size="sm" />
								<Text content="Lots boilerplate" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
						<Container background={colors.lightGray} padding={14} borderRadius={8} border={`2px solid ${colors.highlight}`}>
							<Stack direction="vertical" spacing={6} align="center">
								<Text content="→ Best for:" variant="caption" weight="bold" color={colors.highlight} size="sm" />
								<Text content="Simple projects" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
					</Grid>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Section 3: axios in Detail (3:00 → 5:20)
 */
const Scene5Axios: React.FC = () => {
	const axiosBasic = `// Same request with axios (cleaner)
const { data } = await axios.get('/api/users')
console.log(data)

// That's it. Response parsing is automatic.`;

	const axiosWithAuth = `// With axios, add auth once for ALL requests:
axios.interceptors.request.use((config) => {
  config.headers.Authorization = \`Bearer \${token}\`
  return config
})

// Now EVERY request has auth automatically.
// Make auth changes in one place.`;

	const axiosWithRetry = `// Interceptors handle response errors globally:
axios.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Refresh token and retry
      const newToken = await refreshToken()
      error.config.headers.Authorization = \`Bearer \${newToken}\`
      return axios(error.config)
    }
    return Promise.reject(error)
  }
)`;

	const axiosTransform = `// Request/response transformation (auto)
axios.create({
  baseURL: '/api',
  timeout: 5000,
  transformRequest: [data => JSON.stringify(data)],
  transformResponse: [data => JSON.parse(data)]
})`;

	return (
		<AbsoluteFill style={{ background: colors.white }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={25} align="center">
					<Title
						text="axios: The Developer-Friendly Choice"
						level={2}
						size="2xl"
						color={colors.black}
						animation={{ type: "fadeIn", duration: 20 }}
					/>

					<Stack direction="vertical" spacing={18} align="center">
						<Text
							content="Basic Usage (Automatic JSON Parsing)"
							variant="caption"
							size="md"
							weight="bold"
							color={colors.highlight}
							animation={{ type: "fadeIn", duration: 12, delay: 10 }}
						/>
						<Container
							background={colors.lightGray}
							padding={18}
							borderRadius={8}
							border={`2px solid ${colors.axios}`}
							animation={{ type: "fadeIn", duration: 18, delay: 12 }}
						>
							<CodeBlock
								code={axiosBasic}
								language="javascript"
								showLineNumbers={false}
								width={650}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background={colors.lightGray}
							padding={14}
							borderRadius={8}
							border={`2px solid ${colors.react}`}
						>
							<Text
								content="✓ Instant win: 50% less code than fetch"
								variant="caption"
								size="sm"
								color={colors.react}
								weight="bold"
							/>
						</Container>
					</Stack>

					<Stack direction="vertical" spacing={18} align="center">
						<Text
							content="The Game-Changer: Interceptors (Automatic Auth)"
							variant="caption"
							size="md"
							weight="bold"
							color={colors.highlight}
							animation={{ type: "fadeIn", duration: 12, delay: 30 }}
						/>
						<Container
							background={colors.lightGray}
							padding={18}
							borderRadius={8}
							border={`3px solid ${colors.axios}`}
							animation={{ type: "fadeIn", duration: 18, delay: 32 }}
						>
							<CodeBlock
								code={axiosWithAuth}
								language="javascript"
								showLineNumbers={false}
								width={650}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background="#f0f8ff"
							padding={14}
							borderRadius={8}
							border={`3px solid ${colors.fetch}`}
						>
							<Text
								content="💡 With fetch, you'd add headers manually to EVERY request"
								variant="caption"
								size="sm"
								color={colors.fetch}
								weight="bold"
							/>
						</Container>
					</Stack>

					<Stack direction="vertical" spacing={18} align="center">
						<Text
							content="Automatic Retry & Error Recovery"
							variant="caption"
							size="md"
							weight="bold"
							color={colors.highlight}
							animation={{ type: "fadeIn", duration: 12, delay: 50 }}
						/>
						<Container
							background={colors.lightGray}
							padding={18}
							borderRadius={8}
							border={`2px solid ${colors.axios}`}
							animation={{ type: "fadeIn", duration: 18, delay: 52 }}
						>
							<CodeBlock
								code={axiosWithRetry}
								language="javascript"
								showLineNumbers={false}
								width={650}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background={colors.lightGray}
							padding={14}
							borderRadius={8}
							border={`2px solid ${colors.warning}`}
						>
							<Text
								content="⚡ Retry logic defined once. Applies everywhere."
								variant="caption"
								size="sm"
								color={colors.warning}
								weight="bold"
							/>
						</Container>
					</Stack>

					<Stack direction="vertical" spacing={18} align="center">
						<Text
							content="Request/Response Transformation (Auto)"
							variant="caption"
							size="md"
							weight="bold"
							color={colors.highlight}
							animation={{ type: "fadeIn", duration: 12, delay: 70 }}
						/>
						<Container
							background={colors.lightGray}
							padding={18}
							borderRadius={8}
							border={`2px solid ${colors.axios}`}
							animation={{ type: "fadeIn", duration: 18, delay: 72 }}
						>
							<CodeBlock
								code={axiosTransform}
								language="javascript"
								showLineNumbers={false}
								width={650}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background={colors.lightGray}
							padding={14}
							borderRadius={8}
							border={`2px solid ${colors.success}`}
						>
							<Text
								content="✓ Centralized config for all your APIs"
								variant="caption"
								size="sm"
								color={colors.success}
								weight="bold"
							/>
						</Container>
					</Stack>

					<Grid columns={3} gap={15}>
						<Container background={colors.lightGray} padding={14} borderRadius={8} border={`2px solid ${colors.axios}`}>
							<Stack direction="vertical" spacing={6} align="center">
								<Text content="✓ Clean DX" variant="caption" weight="bold" color={colors.axios} size="sm" />
								<Text content="Less code" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
						<Container background={colors.lightGray} padding={14} borderRadius={8} border={`2px solid ${colors.react}`}>
							<Stack direction="vertical" spacing={6} align="center">
								<Text content="✓ Powerful" variant="caption" weight="bold" color={colors.react} size="sm" />
								<Text content="Interceptors" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
						<Container background={colors.lightGray} padding={14} borderRadius={8} border={`2px solid ${colors.highlight}`}>
							<Stack direction="vertical" spacing={6} align="center">
								<Text content="→ Best for:" variant="caption" weight="bold" color={colors.highlight} size="sm" />
								<Text content="Real apps" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
					</Grid>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Real-World Comparison (5:20 → 6:10)
 */
const Scene6RealWorldComparison: React.FC = () => {
	return (
		<AbsoluteFill style={{ background: colors.white }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={35} align="center">
					<Title
						text="In the Real World"
						level={2}
						size="2xl"
						color={colors.black}
						animation={{ type: "fadeIn", duration: 20 }}
					/>

					<Grid columns={2} gap={35}>
						<Container
							background={colors.lightGray}
							padding={24}
							borderRadius={12}
							border={`3px solid ${colors.fetch}`}
							animation={{ type: "fadeIn", duration: 20, delay: 10 }}
						>
							<Stack direction="vertical" spacing={16} align="center">
								<Text
									content="fetch"
									variant="body"
									size="xl"
									weight="bold"
									color={colors.fetch}
								/>
								<Stack direction="vertical" spacing={12} align="left">
									<Text content="• Built-in" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• ~100 lines per helper" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Errors not caught" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Status 404 ≠ error" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Header dups" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Testing is hard" variant="caption" size="md" color={colors.darkGray} />
								</Stack>
								<Container background="#fff8f0" padding={12} borderRadius={6} marginTop={12}>
									<Text
										content="✓ Great for learning"
										variant="caption"
										size="sm"
										color={colors.highlight}
										weight="bold"
									/>
								</Container>
							</Stack>
						</Container>

						<Container
							background={colors.lightGray}
							padding={24}
							borderRadius={12}
							border={`3px solid ${colors.axios}`}
							animation={{ type: "fadeIn", duration: 20, delay: 15 }}
						>
							<Stack direction="vertical" spacing={16} align="center">
								<Text
									content="axios"
									variant="body"
									size="xl"
									weight="bold"
									color={colors.axios}
								/>
								<Stack direction="vertical" spacing={12} align="left">
									<Text content="• npm install" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• ~20 lines of config" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Catches errors" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• 4xx/5xx = reject" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Auto headers" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Easy mocking" variant="caption" size="md" color={colors.darkGray} />
								</Stack>
								<Container background={colors.lightGray} padding={12} borderRadius={6} marginTop={12} border={`2px solid ${colors.react}`}>
									<Text
										content="✓ Great for production"
										variant="caption"
										size="sm"
										color={colors.react}
										weight="bold"
									/>
								</Container>
							</Stack>
						</Container>
					</Grid>

					<Container
						background={colors.lightGray}
						padding={20}
						borderRadius={8}
						border={`2px dashed ${colors.mediumGray}`}
						animation={{ type: "fadeIn", duration: 20, delay: 35 }}
					>
						<Text
							content="Honest take: If your project has more than 3 API endpoints, you'll want axios."
							variant="body"
							size="lg"
							weight="bold"
							color={colors.darkGray}
							align="center"
						/>
					</Container>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * When to Use What (6:10 → 7:20)
 */
const Scene7WhenToUse: React.FC = () => {
	return (
		<AbsoluteFill style={{ background: colors.white }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={35} align="center">
					<Title
						text="Decision Framework"
						level={2}
						size="2xl"
						color={colors.black}
						animation={{ type: "fadeIn", duration: 20 }}
					/>

					<Stack direction="vertical" spacing={22} align="center">
						<Container
							background={colors.lightGray}
							padding={24}
							borderRadius={8}
							border={`3px solid ${colors.react}`}
							animation={{ type: "fadeIn", duration: 20, delay: 10 }}
						>
							<Stack direction="vertical" spacing={14}>
								<Text content="✓ Use fetch if..." variant="body" weight="bold" size="lg" color={colors.react} />
								<Stack direction="vertical" spacing={10} align="left">
									<Text content="• Learning JavaScript" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• One-off requests (< 3)" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Client-side pet projects" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Static site with forms" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Bundle size is CRITICAL" variant="caption" size="md" color={colors.darkGray} />
								</Stack>
							</Stack>
						</Container>

						<Container
							background={colors.lightGray}
							padding={24}
							borderRadius={8}
							border={`3px solid ${colors.axios}`}
							animation={{ type: "fadeIn", duration: 20, delay: 18 }}
						>
							<Stack direction="vertical" spacing={14}>
								<Text content="✓ Use axios if..." variant="body" weight="bold" size="lg" color={colors.axios} />
								<Stack direction="vertical" spacing={10} align="left">
									<Text content="• Building a real application" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Multiple API endpoints" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Authentication needed" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Error handling critical" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Team development" variant="caption" size="md" color={colors.darkGray} />
								</Stack>
							</Stack>
						</Container>

						<Container
							background={colors.lightGray}
							padding={24}
							borderRadius={8}
							border={`3px solid ${colors.react}`}
							animation={{ type: "fadeIn", duration: 20, delay: 26 }}
						>
							<Stack direction="vertical" spacing={14}>
								<Text content="✓ Use both + React Query if..." variant="body" weight="bold" size="lg" color={colors.react} />
								<Stack direction="vertical" spacing={10} align="left">
									<Text content="• Complex app with lots of data" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Multiple screens need same data" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Real-time updates important" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Offline behavior needed" variant="caption" size="md" color={colors.darkGray} />
									<Text content="• Performance is critical" variant="caption" size="md" color={colors.darkGray} />
								</Stack>
							</Stack>
						</Container>
					</Stack>

					<Container
						background="#f0f8ff"
						padding={20}
						borderRadius={8}
						border={`2px solid ${colors.fetch}`}
						animation={{ type: "fadeIn", duration: 20, delay: 35 }}
					>
						<Text
							content="📊 Data layer complexity grows → You need more tools"
							variant="body"
							size="lg"
							weight="bold"
							color={colors.fetch}
							align="center"
						/>
					</Container>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * React Query Deep Dive (7:20 → 8:50)
 */
const Scene8ReactQuery: React.FC = () => {
	const reactQueryBasic = `const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const res = await fetch('/api/users')
    return res.json()
  }
})`;

	const reactQueryCaching = `// Query caching (automatic)
// First component requests 'users'
const query1 = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
})

// Second component SAME request
const query2 = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers
})

// Result: Only ONE actual HTTP request!
// React Query deduplicates based on queryKey`;

	const reactQueryMutation = `// Handling mutations (POST/PUT/DELETE)
const { mutate, isPending } = useMutation({
  mutationFn: async (newUser) => {
    const res = await axios.post('/api/users', newUser)
    return res.data
  },
  onSuccess: (data) => {
    // Auto-revalidate queries after mutation
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }
})

// Usage:
mutate({ name: 'Alice' })`;

	return (
		<AbsoluteFill style={{ background: colors.white }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={28} align="center">
					<Title
						text="React Query: State Management"
						level={2}
						size="2xl"
						color={colors.black}
						animation={{ type: "fadeIn", duration: 20 }}
					/>
					<Text
						content="The missing piece. Handles caching, deduplication, and synchronization automatically."
						variant="body"
						size="lg"
						align="center"
						color={colors.react}
						weight="bold"
						animation={{ type: "fadeIn", duration: 20, delay: 8 }}
					/>

					<Stack direction="vertical" spacing={20} align="center">
						<Text
							content="Basic Hook (Works with fetch or axios)"
							variant="caption"
							size="md"
							weight="bold"
							color={colors.highlight}
							animation={{ type: "fadeIn", duration: 12, delay: 15 }}
						/>
						<Container
							background={colors.lightGray}
							padding={18}
							borderRadius={8}
							border={`2px solid ${colors.react}`}
							animation={{ type: "fadeIn", duration: 18, delay: 17 }}
						>
							<CodeBlock
								code={reactQueryBasic}
								language="javascript"
								showLineNumbers={true}
								revealAnimation="line-by-line"
								revealSpeed={2}
								width={700}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background={colors.lightGray}
							padding={14}
							borderRadius={8}
							border={`2px solid ${colors.success}`}
						>
							<Text
								content="✓ Built-in loading, error, and data states"
								variant="caption"
								size="sm"
								color={colors.success}
								weight="bold"
							/>
						</Container>
					</Stack>

					<Stack direction="vertical" spacing={20} align="center">
						<Text
							content="Magic: Automatic Deduplication"
							variant="caption"
							size="md"
							weight="bold"
							color={colors.highlight}
							animation={{ type: "fadeIn", duration: 12, delay: 35 }}
						/>
						<Container
							background={colors.lightGray}
							padding={18}
							borderRadius={8}
							border={`3px solid ${colors.highlight}`}
							animation={{ type: "fadeIn", duration: 18, delay: 37 }}
						>
							<CodeBlock
								code={reactQueryCaching}
								language="javascript"
								showLineNumbers={true}
								revealAnimation="line-by-line"
								revealSpeed={2}
								width={700}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background="#f0f8ff"
							padding={14}
							borderRadius={8}
							border={`2px solid ${colors.fetch}`}
						>
							<Text
								content="💡 One request for unlimited components. This is gold."
								variant="caption"
								size="sm"
								color={colors.fetch}
								weight="bold"
							/>
						</Container>
					</Stack>

					<Stack direction="vertical" spacing={20} align="center">
						<Text
							content="Mutations (POST/PUT/DELETE) + Auto Revalidation"
							variant="caption"
							size="md"
							weight="bold"
							color={colors.highlight}
							animation={{ type: "fadeIn", duration: 12, delay: 55 }}
						/>
						<Container
							background={colors.lightGray}
							padding={18}
							borderRadius={8}
							border={`2px solid ${colors.axios}`}
							animation={{ type: "fadeIn", duration: 18, delay: 57 }}
						>
							<CodeBlock
								code={reactQueryMutation}
								language="javascript"
								showLineNumbers={true}
								revealAnimation="line-by-line"
								revealSpeed={2}
								width={700}
								codeColor={colors.black}
							/>
						</Container>
						<Container
							background={colors.lightGray}
							padding={14}
							borderRadius={8}
							border={`2px solid ${colors.warning}`}
						>
							<Text
								content="⚡ After mutation, queries refresh automatically"
								variant="caption"
								size="sm"
								color={colors.warning}
								weight="bold"
							/>
						</Container>
					</Stack>

					<Grid columns={4} gap={12}>
						<Container background={colors.lightGray} padding={12} borderRadius={8} border={`2px solid ${colors.highlight}`}>
							<Stack direction="vertical" spacing={4} align="center">
								<Text content="✓ Cache" variant="caption" weight="bold" color={colors.highlight} size="sm" />
								<Text content="Auto reuse" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
						<Container background={colors.lightGray} padding={12} borderRadius={8} border={`2px solid ${colors.react}`}>
							<Stack direction="vertical" spacing={4} align="center">
								<Text content="✓ Dedupe" variant="caption" weight="bold" color={colors.react} size="sm" />
								<Text content="One request" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
						<Container background={colors.lightGray} padding={12} borderRadius={8} border={`2px solid ${colors.fetch}`}>
							<Stack direction="vertical" spacing={4} align="center">
								<Text content="✓ Sync" variant="caption" weight="bold" color={colors.fetch} size="sm" />
								<Text content="Stay fresh" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
						<Container background={colors.lightGray} padding={12} borderRadius={8} border={`2px solid ${colors.axios}`}>
							<Stack direction="vertical" spacing={4} align="center">
								<Text content="✓ DX" variant="caption" weight="bold" color={colors.axios} size="sm" />
								<Text content="Super easy" variant="caption" size="xs" color={colors.darkGray} />
							</Stack>
						</Container>
					</Grid>

					<Container
						background="#fff8f0"
						padding={20}
						borderRadius={8}
						border={`3px solid ${colors.highlight}`}
						animation={{ type: "fadeIn", duration: 20, delay: 70 }}
					>
						<Text
							content="In production: React Query prevents 80% of common bugs (stale data, race conditions, duplicate requests)"
							variant="body"
							size="lg"
							weight="bold"
							color={colors.highlight}
							align="center"
						/>
					</Container>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Ending (8:50 → 9:00+)
 */
const Scene9Ending: React.FC = () => {
	return (
		<AbsoluteFill style={{ background: colors.white }}>
			<Container centerX centerY>
				<Stack direction="vertical" spacing={40} align="center">
					<Title
						text="The Full Picture"
						level={1}
						size="3xl"
						color={colors.black}
						animation={{ type: "fadeIn", duration: 20 }}
					/>
					<Stack direction="vertical" spacing={20} align="center">
						<Container
							background={colors.lightGray}
							padding={20}
							borderRadius={8}
							border={`2px solid ${colors.fetch}`}
						>
							<Text
								content="fetch: Low-level, built-in, simple learning tool"
								variant="body"
								size="lg"
								weight="bold"
								color={colors.fetch}
								align="center"
							/>
						</Container>
						<Container
							background={colors.lightGray}
							padding={20}
							borderRadius={8}
							border={`2px solid ${colors.axios}`}
						>
							<Text
								content="axios: Production-ready, clean API, interceptors"
								variant="body"
								size="lg"
								weight="bold"
								color={colors.axios}
								align="center"
							/>
						</Container>
						<Container
							background={colors.lightGray}
							padding={20}
							borderRadius={8}
							border={`2px solid ${colors.react}`}
						>
							<Text
								content="React Query: Smart caching, deduplication, sync"
								variant="body"
								size="lg"
								weight="bold"
								color={colors.react}
								align="center"
							/>
						</Container>
					</Stack>
					<Container
						background="#f0f8ff"
						padding={24}
						borderRadius={8}
						border={`3px solid ${colors.fetch}`}
						animation={{ type: "fadeIn", duration: 20, delay: 15 }}
					>
						<Text
							content="Use them together: axios for HTTP + React Query for state management = unstoppable"
							variant="body"
							size="lg"
							weight="bold"
							color={colors.fetch}
							align="center"
						/>
					</Container>
				</Stack>
			</Container>
		</AbsoluteFill>
	);
};

/**
 * Main Composition
 */
export const FetchVsAxios: React.FC = () => {
	return (
		<ThemeProvider initialTheme={lightTheme}>
			<AbsoluteFill>
				<Sequence from={sec(SCENES.hook.start)} durationInFrames={sec(SCENES.hook.duration)}>
					<Scene1Hook />
				</Sequence>

				<Sequence from={sec(SCENES.problem.start)} durationInFrames={sec(SCENES.problem.duration)}>
					<Scene2Problem />
				</Sequence>

				<Sequence from={sec(SCENES.howItWorks.start)} durationInFrames={sec(SCENES.howItWorks.duration)}>
					<Scene3HowItWorks />
				</Sequence>

				<Sequence from={sec(SCENES.fetch.start)} durationInFrames={sec(SCENES.fetch.duration)}>
					<Scene4Fetch />
				</Sequence>

				<Sequence from={sec(SCENES.axios.start)} durationInFrames={sec(SCENES.axios.duration)}>
					<Scene5Axios />
				</Sequence>

				<Sequence from={sec(SCENES.realWorldComparison.start)} durationInFrames={sec(SCENES.realWorldComparison.duration)}>
					<Scene6RealWorldComparison />
				</Sequence>

				<Sequence from={sec(SCENES.whenToUse.start)} durationInFrames={sec(SCENES.whenToUse.duration)}>
					<Scene7WhenToUse />
				</Sequence>

				<Sequence from={sec(SCENES.reactQuery.start)} durationInFrames={sec(SCENES.reactQuery.duration)}>
					<Scene8ReactQuery />
				</Sequence>

				<Sequence from={sec(SCENES.ending.start)} durationInFrames={sec(SCENES.ending.duration)}>
					<Scene9Ending />
				</Sequence>
			</AbsoluteFill>
		</ThemeProvider>
	);
};

export default FetchVsAxios;