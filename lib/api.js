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
 try {
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
     id,
    },
   }
  );
  return data?.ensemble || null;
 } catch (error) {
  console.error("getEnsembleBySlug failed", error);
  return null;
 }
}

export async function getAllEnsembleSlugs() {
 try {
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
  return data?.ensembles?.edges || [];
 } catch (error) {
  console.error("getAllEnsembleSlugs failed", error);
  return [];
 }
}

export async function getAllMusicians() {
 try {
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
  return data?.personType?.people?.edges || [];
 } catch (error) {
  console.error("getAllMusicians failed", error);
  return [];
 }
}

export async function getMusicianBySlug(id) {
 try {
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
     id,
    },
   }
  );
  return data?.person || null;
 } catch (error) {
  console.error("getMusicianBySlug failed", error);
  return null;
 }
}

export async function getAllConcertSlugs() {
 try {
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
  return data?.concerts?.edges || [];
 } catch (error) {
  console.error("getAllConcertSlugs failed", error);
  return [];
 }
}

export async function getAllConcerts() {
 try {
  const data = await fetchAPI(`
query MyQuery {
  concerts {
    edges {
      node {
        title
        slug
        uri
        academicYears {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
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

  return (data?.concerts?.edges || []).sort(function (a, b) {
   return (
    new Date(a.node.concertInformation.date) -
    new Date(b.node.concertInformation.date)
   );
  });
 } catch (error) {
  console.error("getAllConcerts failed", error);
  return [];
 }
}

export async function getConcertBySlug(id) {
 try {
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
     id,
    },
   }
  );
  return data?.concert || null;
 } catch (error) {
  console.error("getConcertBySlug failed", error);
  return null;
 }
}

export async function getPageBySlug(id) {
 try {
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
     id,
    },
   }
  );
  return data?.page || null;
 } catch (error) {
  console.error("getPageBySlug failed", error);
  return null;
 }
}
