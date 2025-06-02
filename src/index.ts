/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// https://clerk.com/docs/backend-requests/manual-jwt
import { createClerkClient } from '@clerk/backend'

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const cookies = request.headers.get("Cookie") || ""

		const clerkClient = createClerkClient({
			secretKey: 'xxx',
			publishableKey: 'xxx',
		})

		const { isSignedIn } = await clerkClient.authenticateRequest(request, {
			//jwtKey: 'CLERK_JWT_KEY',
			//authorizedParties: ['https://example.com'],
		})

		// Add logic to perform protected actions

		return new Response(`Hello from the worker! ${isSignedIn}`);
	},
} satisfies ExportedHandler<Env>;
