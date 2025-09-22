import { useState, useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";

import { listNotes } from "./graphql/queries";
import { createNote, deleteNote } from "./graphql/mutations";

const client = generateClient();

function App() {
  const [notes, setNotes] = useState([]);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const result = await client.graphql({ query: listNotes });
      setNotes(result.data.listNotes.items);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  }

  async function addNote() {
    if (!noteInput) return;
    try {
      await client.graphql({
        query: createNote,
        variables: { input: { content: noteInput } },
      });
      setNoteInput("");
      fetchNotes();
    } catch (err) {
      console.error("Error creating note:", err);
    }
  }

  async function removeNote(id) {
    try {
      await client.graphql({
        query: deleteNote,
        variables: { input: { id } },
      });
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main style={{ padding: 20 }}>
          <h1>Hi {user.username}</h1>
          <button onClick={signOut}>Sign out</button>

          <div style={{ marginTop: 20 }}>
            <input
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Write a note"
            />
            <button onClick={addNote}>Add Note</button>
          </div>

          <div style={{ marginTop: 20 }}>
            {notes.map((note) => (
              <div key={note.id} style={{ marginBottom: 10 }}>
                <span>{note.content}</span>
                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => removeNote(note.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
