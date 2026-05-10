/**
 * CSS Modules Type Declarations
 * 
 * Provides TypeScript support for CSS module imports
 */

declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module "*.css" {
	const content: { [key: string]: string };
	export default content;
}
