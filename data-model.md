# Database and Data Model

## Overview

The application uses MongoDB with Mongoose for persistence. The data model separates the current business process from AI-generated transformation data.

## Main Entities

```text
Industry
   │
   └── Process
         │
         ├── Activity
         │      └── AI Opportunity
         │
         ├── Problem
         │
         ├── Future Activity
         │
         ├── Benefit
         │
         ├── Relationship
         │
         ├── Role
         │
         └── System
```

## Entity Relationships

### Process

Represents a business process being analyzed.

Key fields:

* `_id`
* `name`
* `description`
* `industry`
* `createdAt`
* `updatedAt`

A process is the central entity connecting current-state and future-state information.

### Industry

Represents the business industry associated with a process.

Key fields:

* `_id`
* `name`
* `description`
* `status`
* `createdAt`
* `updatedAt`

A process references an industry using MongoDB ObjectId.

### Activity

Represents an activity in the current business process.

Key fields:

* `_id`
* `process`
* `name`
* `description`
* `sequence`
* `createdAt`
* `updatedAt`

Each activity belongs to a process.

### Problem

Represents an identified issue in the current process.

Key fields:

* `_id`
* `process`
* `title`
* `description`
* `severity`
* `createdAt`
* `updatedAt`

Problems provide input to the AI transformation analysis.

### AI Opportunity

Represents an AI or automation opportunity identified by Gemini.

Key fields:

* `_id`
* `process`
* `activity`
* `title`
* `description`
* `technology`
* `interventionType`
* `maturity`
* `expectedImpact`
* `createdAt`
* `updatedAt`

An AI opportunity can reference the current activity it transforms.

### Future Activity

Represents an activity in the proposed future-state process.

Key fields:

* `_id`
* `process`
* `name`
* `description`
* `sequence`
* `responsibleType`
* `automationLevel`
* `changeType`
* `createdAt`
* `updatedAt`

### Benefit

Represents an expected business benefit from the transformation.

Key fields:

* `_id`
* `process`
* `name`
* `description`
* `metric`
* `expectedImprovement`
* `impactLevel`
* `createdAt`
* `updatedAt`

### Relationship

Represents a relationship between process entities.

Key fields:

* `_id`
* `process`
* `sourceType`
* `sourceId`
* `targetType`
* `targetId`
* `relationshipType`
* `condition`
* `createdAt`
* `updatedAt`

Supported relationship types include:

* `LEADS_TO`
* `CAUSES`
* `SOLVES`
* `PERFORMS`
* `USES`
* `AUTOMATES`
* `REPLACES`
* `SUPPORTS`
* `DECISION_TRUE`
* `DECISION_FALSE`

This allows the application to represent connections between activities, problems, AI opportunities, roles, and systems.

## AI Analysis Data Flow

```text
Process
   │
   ├── Activities
   │
   └── Problems
          │
          ▼
      Gemini AI
          │
          ├── AI Opportunities
          ├── Future Activities
          └── Benefits
                  │
                  ▼
               MongoDB
```

## Persistence Strategy

AI results are stored in MongoDB after analysis.

Before a new AI analysis is saved, previous AI-generated opportunities, future activities, and benefits for the same process are removed. This prevents stale AI results from being displayed after a new analysis.

## MongoDB and Mongoose

MongoDB provides document-oriented persistence while Mongoose provides:

* Schema definitions
* Validation
* ObjectId references
* Model-based database access
* Data consistency

The application therefore keeps the AI output as structured application data rather than treating the Gemini response as temporary UI text.
