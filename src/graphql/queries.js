export const listNotes = /* GraphQL */ `
  query ListNotes {
    listNotes {
      items {
        id
        content
        createdAt
      }
    }
  }
`;
