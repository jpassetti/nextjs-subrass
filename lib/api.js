const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
 const headers = { "Content-Type": "application/json" };

 const res = await fetch(API_URL, {
  method: "POST",
  headers,
  body: JSON.stringify({
   query,
   variables,
  }),
 });

 const json = await res.json();
 if (json.errors) {
  console.error(json.errors);
  throw new Error("Failed to fetch API");
 }
 return json.data;
}

export async function getEnsembleBySlug(id) {
 const data = await fetchAPI(
  `
query MyQuery($id: ID!) {
  ensemble(idType: URI, id: $id) {
    id
    title
    slug
    ensembleInformation {
      conductor {
        ... on Person {
          id
          title
		  slug
		  featuredImage {
          node {
            id
            altText
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
        }
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
				jobTitle
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
			slug
			 featuredImage {
          node {
            id
            altText
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
        }
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
			   jobTitle
              }
            }
          }
        }
      }
    }
  }
}`,
  {
   variables: {
    id: id,
   },
  }
 );
 return data?.ensemble;
}

export async function getAllEnsembleSlugs() {
 const data = await fetchAPI(`
query MyQuery {
  ensembles {
    edges {
      node {
        id
        slug
        uri
        modifiedGmt
      }
    }
  }
}`);
 return data?.ensembles.edges;
}

export async function getAllMusicians() {
 const data = await fetchAPI(
  `
query MyQuery($id: ID!, $first: Int) {
  personType(idType: SLUG, id: $id) {
    id
    people(first: $first) {
      edges {
        node {
          id
          slug
          uri
          modifiedGmt
        }
      }
    }
  }
}`,
  {
   variables: {
    id: "musician",
    first: 100,
   },
  }
 );
 return data?.personType.people.edges;
}

export async function getMusicianBySlug(id) {
 const data = await fetchAPI(
  `
  query MyQuery($id: ID!) {
    person(idType: URI, id: $id) {
      id
      title
      slug
      content
      instruments {
        edges {
          node {
            id
            name
          }
        }
      }
      featuredImage {
        node {
          id
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
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
          jobTitle
          companySubdivision
          companySubdivisionUrl
          companyUrl
        }
      }
      peopleTypes {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  }
`,
  {
   variables: {
    id: id,
   },
  }
 );
 return data?.person;
}

export async function getAllConcertSlugs() {
 const data = await fetchAPI(`
query MyQuery {
  concerts {
    edges {
      node {
        id
        slug
        uri
        modifiedGmt
        academicYears {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
}`);
 return data?.concerts.edges;
}

export async function getAllConcerts() {
 const data = await fetchAPI(`
query MyQuery {
  concerts {
    edges {
      node {
        title
        slug
        uri
        featuredImage {
          node {
            id
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl
          }
        }
        concertInformation {
          date
          venue {
            ... on Venue {
              title
              featuredImage {
                node {
                  id
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  sourceUrl
                }
              }
              venueInformation {
                street
                city
                state
                zipCode
                coordinates {
                  latitude
                  longitude
                }
              }
            }
          }
        }
      }
    }
  }
  }
`);
 const orderedConcerts = data?.concerts.edges.sort(function (a, b) {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return (
   new Date(a.node.concertInformation.date) -
   new Date(b.node.concertInformation.date)
  );
 });
 return orderedConcerts;
}

export async function getConcertBySlug(id) {
 const data = await fetchAPI(
  `
query MyQuery($id: ID!) {
	concert(idType: URI, id: $id) {
        title
        slug
        content
        excerpt
        featuredImage {
          node {
            id
            altText
            mediaDetails {
              height
              width
            }
            sourceUrl
          }
        }
        concertInformation {
          date
          venue {
            ... on Venue {
              title
              featuredImage {
                node {
                  id
                  altText
                  mediaDetails {
                    height
                    width
                  }
                  sourceUrl
                }
              }
              venueInformation {
                street
                city
                state
                zipCode
                coordinates {
                  latitude
                  longitude
                }
              }
            }
          }
        }
    }
}
`,
  {
   variables: {
    id: id,
   },
  }
 );
 return data?.concert;
}
export async function getPageBySlug(id) {
 const data = await fetchAPI(
  `
  query MyQuery($id: ID!) {
    page(idType: URI, id: $id) {
      id
      title
      slug
      content
      featuredImage {
        node {
          id
          altText
          mediaDetails {
            height
            width
          }
          sourceUrl
        }
      }
    }
  }
`,
  {
   variables: {
    id: id,
   },
  }
 );
 return data?.page;
}
