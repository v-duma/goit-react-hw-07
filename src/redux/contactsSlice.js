import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
  const response = await fetch(
    "https://65d9fcb5bcc50200fcdc6586.mockapi.io/contacts"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  return response.json();
});

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contactData) => {
    const response = await fetch(
      "https://65d9fcb5bcc50200fcdc6586.mockapi.io/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add contact");
    }
    return response.json();
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId) => {
    const response = await fetch(
      `https://65d9fcb5bcc50200fcdc6586.mockapi.io/contacts/${contactId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete contact");
    }
    return contactId;
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default contactsSlice.reducer;
