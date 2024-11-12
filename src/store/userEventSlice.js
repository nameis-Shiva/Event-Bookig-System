import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import eventsData from "../data.json";
import usersData from "../user.json";

// Helper function to find a user by username and password
const findUser = (username, password) => {
  return usersData.find(user => user.username === username && user.password === password);
};

// Simulate fetching events (replace with real API later)
export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventsData);
    }, 1000);
  });
});

// Async action for booking a ticket
export const bookTicketAsync = createAsyncThunk(
  "userEvent/bookTicketAsync",
  async (eventId, { getState, rejectWithValue }) => {
    const state = getState();
    const currentUser = state.userEvent.currentUser;

    if (!currentUser) {
      return rejectWithValue("You must be logged in to book tickets.");
    }

    // Find the event based on eventId
    const event = state.userEvent.events.find(event => event.id === eventId);

    if (!event || event.availableSeats <= 0) {
      return rejectWithValue("No available seats for this event.");
    }

    // Check if the event is already booked by the user
    if (currentUser.bookedTickets.includes(eventId)) {
      return rejectWithValue("You have already booked this event.");
    }

    // Simulate async behavior (e.g., saving to API or database)
    const updatedEvent = { ...event, availableSeats: event.availableSeats - 1 };
    const updatedUser = {
      ...currentUser,
      bookedTickets: [...currentUser.bookedTickets, eventId],
    };

    // Update localStorage (optional)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    return { updatedEvent, updatedUser };
  }
);

// Initial state
const initialState = {
  events: [],
  selectedCategory: '',
  searchQuery: '',
  loading: false,
  error: null,
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null, // Persist currentUser from localStorage
};

const userEventSlice = createSlice({
  name: "userEvent",
  initialState,
  reducers: {
    // Login action
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = findUser(username, password);
      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user)); // Persist user in localStorage
        state.error = null;
      } else {
        state.error = "Invalid username or password";
      }
    },
    // Logout action
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser"); // Remove user from localStorage
    },
    // Set category filter for events
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      localStorage.setItem('selectedCategory', action.payload); // Persist category
    },
    // Set search query for events
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      localStorage.setItem('searchQuery', action.payload); // Persist search query
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle the async booking action
      .addCase(bookTicketAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookTicketAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { updatedEvent, updatedUser } = action.payload;

        // Update the events array to reflect the updated available seats
        const eventIndex = state.events.findIndex((event) => event.id === updatedEvent.id);
        if (eventIndex !== -1) {
          state.events[eventIndex] = updatedEvent;
        }

        // Update the currentUser state to reflect the booked ticket
        state.currentUser = updatedUser;
        localStorage.setItem("currentUser", JSON.stringify(updatedUser)); // Update localStorage
      })
      .addCase(bookTicketAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { login, logout, setCategory, setSearchQuery } = userEventSlice.actions;
export default userEventSlice.reducer;
