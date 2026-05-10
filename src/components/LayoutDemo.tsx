/**
 * Layout Components Demo
 * 
 * A demonstration composition showcasing Container, Grid, and Stack components
 */

import React from "react";
import { AbsoluteFill } from "remotion";
import { Container } from "./Container";
import { Grid } from "./Grid";
import { Stack } from "./Stack";
import { Text } from "./Text";
import { Title } from "./Title";
import { ThemeProvider } from "../themes/ThemeProvider";
import { darkTheme } from "../themes/dark";

/**
 * Demo composition for layout components
 */
export const LayoutDemo: React.FC = () => {
	return (
		<ThemeProvider initialTheme={darkTheme}>
			<AbsoluteFill style={{ backgroundColor: darkTheme.colors.background }}>
				<Container
					width="100%"
					height="100%"
					padding={40}
					centerX
					centerY
				>
					<Stack spacing={32} align="center">
						<Title 
							text="Layout Components Demo" 
							level={1}
							align="center"
						/>
						
						{/* Grid Demo */}
						<Container width={800}>
							<Stack spacing={16}>
								<Title 
									text="Grid Layout" 
									level={3}
									align="center"
								/>
								<Grid columns={3} gap={16}>
									<Container 
										padding={20} 
										background={darkTheme.colors.primary}
										borderRadius={8}
										centerX
										centerY
									>
										<Text content="Grid Item 1" align="center" />
									</Container>
									<Container 
										padding={20} 
										background={darkTheme.colors.secondary}
										borderRadius={8}
										centerX
										centerY
									>
										<Text content="Grid Item 2" align="center" />
									</Container>
									<Container 
										padding={20} 
										background={darkTheme.colors.accent}
										borderRadius={8}
										centerX
										centerY
									>
										<Text content="Grid Item 3" align="center" />
									</Container>
								</Grid>
							</Stack>
						</Container>
						
						{/* Stack Demo */}
						<Container width={800}>
							<Stack spacing={16}>
								<Title 
									text="Stack Layout" 
									level={3}
									align="center"
								/>
								<Stack direction="horizontal" spacing={16} justify="center">
									<Container 
										padding={20} 
										background={darkTheme.colors.primary}
										borderRadius={8}
									>
										<Text content="Stack Item 1" />
									</Container>
									<Container 
										padding={20} 
										background={darkTheme.colors.secondary}
										borderRadius={8}
									>
										<Text content="Stack Item 2" />
									</Container>
									<Container 
										padding={20} 
										background={darkTheme.colors.accent}
										borderRadius={8}
									>
										<Text content="Stack Item 3" />
									</Container>
								</Stack>
							</Stack>
						</Container>
					</Stack>
				</Container>
			</AbsoluteFill>
		</ThemeProvider>
	);
};
