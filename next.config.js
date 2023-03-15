// next.config.js
module.exports = {
	images: {
		domains: ['api.subrass.syr.edu'],
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
