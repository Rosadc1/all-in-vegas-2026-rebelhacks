Here is the updated README with a Run Locally section included:

---

# All In Vegas

All In Vegas is an AI-powered trip planning app that transforms natural-language prompts into personalized, bookable, and map-based itineraries. Instead of rigid filters and static lists, users describe the experience they want and the app turns it into a tailored Las Vegas plan.

## What Makes It Different

All In Vegas blends AI-driven discovery with actionable planning:

* AI-first discovery. Users enter creative prompts such as “romantic rooftop night with live music” instead of selecting filters.
* Map-native planning. Recommendations are visualized on an interactive Google Map.
* Built-in schedule builder. Save, edit, export, and share itineraries.
* Actionable results. Each recommendation includes enriched venue data such as addresses, links, and availability.
* Local and hidden events. Surfaces events mainstream aggregators often miss.
* Collaborative itineraries. Create and share plans with friends.
* Playful discovery modes. Mystery nights, persona-based suggestions, and reusable vibe templates.

Discovery, mapping, and itinerary creation happen in one smooth flow.

## Architecture Overview

### Frontend

* React with TypeScript
* Redux Toolkit with RTK Query for API state management
* Google Maps API for interactive venue visualization
* Modular components including:

  * AIResponseDisplay
  * Chat modal interface
  * Schedule Builder

### Backend

* AWS Lambda
* Prompt engineering layer
* AI model call
* Deterministic enrichment layer that injects:

  * Verified venue details
  * Addresses
  * Links
  * Availability data

The backend returns either a structured list of items or a narrative recommendation enriched with actionable metadata.

## User Flow

1. User enters a natural-language prompt.
2. Frontend sends the request via RTK Query ai-service.
3. Lambda refines the prompt, calls the AI model, and enriches the output with real venue and event data.
4. Frontend displays the response, plots venues on Google Map, and allows saving items to a schedule.
5. User edits, exports, or shares the itinerary.

## Running the Project Locally

### Prerequisites

* Node.js (v18 or later recommended)
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

The app will start locally, typically at:

```
http://localhost:5173
```

Make sure any required environment variables such as API endpoints or Google Maps API keys are configured before running the project.

## Core Features

* Natural-language trip planning
* AI-powered recommendations
* Interactive map integration
* Route-aware grouping
* Itinerary builder
* Export and share functionality
* Adaptive follow-up questions only when needed
* Prompt-driven templates for consistent vibes

## Vision

All In Vegas is designed to make discovery feel creative and exploratory while keeping results trustworthy and actionable. It combines narrative AI recommendations with structured data so users can move seamlessly from inspiration to execution.
