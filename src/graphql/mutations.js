export const createNote = /* GraphQL */ `
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      content
      createdAt
    }
  }
`;

export const deleteNote = /* GraphQL */ `
  mutation DeleteNote($input: DeleteNoteInput!) {
    deleteNote(input: $input) {
      id
    }
  }
`;
