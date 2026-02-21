Got it. Here is the corrected README reflecting that All In Vegas is an event management platform where users view and create events in Las Vegas, with AI used for recommendations.

---

# All In Vegas

All In Vegas is an event management platform for Las Vegas that allows users to discover, view, and create events in one centralized experience. AI is used to generate personalized event recommendations, helping users find experiences that match their interests while keeping full control over planning and organization.

## What Makes It Different

All In Vegas combines intelligent recommendations with practical event management tools:

* AI-powered recommendations. Users can enter natural-language prompts to receive personalized event suggestions.
* Event creation and management. Users can create and publish events directly within the platform.
* Map-native experience. Events are visualized on an interactive Google Map.
* Built-in schedule builder. Save, edit, export, and share event plans.
* Local and hidden events. Highlights events that mainstream aggregators often miss.
* Collaborative planning. Create and share event schedules with friends.
* Smart follow-ups. The system adapts when additional clarification is needed.

Discovery, event management, and itinerary organization happen in one streamlined flow.

## Architecture Overview

### Frontend

* React with TypeScript
* Redux Toolkit with RTK Query for API state management
* Google Maps API for interactive event visualization
* Modular components including:

  * AIResponseDisplay
  * Chat modal interface
  * Schedule Builder
  * Event creation forms

### Backend

* AWS Lambda
* Prompt engineering layer
* AI model call for recommendations
* Deterministic enrichment layer that injects:

  * Verified venue details
  * Addresses
  * Links
  * Availability data

The backend returns either structured event data or enriched narrative recommendations.

## User Flow

1. User browses or creates events on the platform.
2. If seeking recommendations, the user enters a natural-language prompt.
3. Frontend sends the request via RTK Query ai-service.
4. Lambda refines the prompt, calls the AI model, and enriches the output with real venue and event data.
5. Frontend displays recommendations, plots them on Google Map, and allows saving items to a schedule.
6. Users can edit, export, share, or manage their created events.

## Running the Project Locally

### Prerequisites

* Node.js v18 or later
* npm

### Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd ./frontend/all-in-vegas
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will typically run at:

```
http://localhost:5173
```

Ensure required environment variables such as API endpoints and Google Maps API keys are properly configured before starting the application.

## Core Features

* Event discovery in Las Vegas
* User-generated event creation
* AI-powered recommendations
* Interactive map integration
* Event schedule builder
* Export and share functionality
* Adaptive follow-up questions when needed

## Vision

All In Vegas aims to centralize event discovery and management in Las Vegas while enhancing the experience with intelligent recommendations. It blends structured event data with AI-powered suggestions so users can seamlessly explore, create, and organize events in one place.
