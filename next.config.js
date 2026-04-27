// next.config.js
module.exports = {
	// Some musician pages rely on slow upstream API responses during SSG.
	// Increase timeout so transient API slowness does not fail the full build.
	staticPageGenerationTimeout: 180,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'api.subrass.syr.edu',
			},
			{
				protocol: 'https',
				hostname: 'api.subrass.syr.edu',
			},
		],
	},
	async redirects() {
		return [
		{
			source: '/index.html',
			destination: '/',
			permanent: true,
		},
		{
			source: '/concerts.html',
			destination: '/concerts',
			permanent: true,
		},
		{
			source: '/members-only.html',
			destination: '/',
			permanent: true,
		},
		{
			source: '/press.html',
			destination: '/',
			permanent: true,
		},
		{
			source: '/assistant-director.html',
			destination: '/',
			permanent: true,
		},
		{
			source: '/past-concerts.html',
			destination: '/concerts',
			permanent: true,
		},
		{
			source: '/musicians.html',
			destination: '/ensembles/2022-23',
			permanent: true,
		},
		]
	},
}
