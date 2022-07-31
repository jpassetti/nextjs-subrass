const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, { variables } = {}) {
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error('Failed to fetch API')
	}
	return json.data
}

export async function getEnsembleBySlug(id) {
	const data = await fetchAPI(`
query MyQuery($id: ID!) {
  ensemble(idType: URI, id: $id) {
    id
    title
    ensembleInformation {
      conductor {
        ... on Person {
          id
          title
          personInformation {
            prefix
            firstName
            middleInitial
            lastName
            suffix
            education {
              degreeType
              graduationYear
              university
            }
			work {
			companyName
			}
          }
        }
      }
      instruments {
        instrument {
          id
          name
        }
        musicians {
          ... on Person {
            id
            title
            personInformation {
              prefix
              firstName
              middleInitial
              lastName
              suffix
              education {
                degreeType
                graduationYear
                university
              }
			  work {
               companyName
              }
            }
          }
        }
      }
    }
  }
}`, {
		variables: {
			"id": id
		}
	})
	return data?.ensemble
}


export async function getAllEnsembleSlugs() {
	const data = await fetchAPI(`
query MyQuery {
  ensembles {
    edges {
      node {
        id
        slug
      }
    }
  }
}`)
	return data?.ensembles.edges
}
