import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "@/services/user-service";
import { eventAPI } from "@/services/event-service";
import { venueAPI } from "@/services/venue-service";
import { aiAPI } from "@/services/ai-service";

export const store = configureStore({
    reducer: { 
        [userAPI.reducerPath]: userAPI.reducer,
        [eventAPI.reducerPath]: eventAPI.reducer,
        [venueAPI.reducerPath]: venueAPI.reducer,
        [aiAPI.reducerPath]: aiAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(userAPI.middleware)
            .concat(eventAPI.middleware)
            .concat(venueAPI.middleware)
            .concat(aiAPI.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;