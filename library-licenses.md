# Model and Library Inventory

## Purpose

This document records the major technologies, libraries, APIs, and AI models used by the AI Future Process Designer.

## Frontend

| Technology | Purpose                            | License                  |
| ---------- | ---------------------------------- | ------------------------ |
| React      | User interface                     | MIT                      |
| Vite       | Frontend development/build tooling | MIT                      |
| Axios      | HTTP API communication             | MIT                      |
| JavaScript | Application programming language   | ECMAScript specification |
| CSS        | User interface styling             | Web standard             |

## Backend

| Technology | Purpose                         | License      |
| ---------- | ------------------------------- | ------------ |
| Node.js    | JavaScript runtime              | MIT          |
| Express.js | REST API framework              | MIT          |
| Mongoose   | MongoDB object modeling         | MIT          |
| dotenv     | Environment variable management | BSD-2-Clause |
| CORS       | Cross-origin API access         | MIT          |

## Database

| Technology    | Purpose                       | License                           |
| ------------- | ----------------------------- | --------------------------------- |
| MongoDB       | Application database          | Server Side Public License (SSPL) |
| MongoDB Atlas | Hosted MongoDB infrastructure | Commercial service                |

## AI

### Google Gemini

The application uses the Google Gemini API for business process analysis.

Model used by the application:

```text
gemini-2.5-flash
```

Purpose:

* Analyze business processes
* Identify AI opportunities
* Generate future activities
* Identify expected business benefits
* Produce structured JSON output

The Gemini API is accessed through Google's official SDK/API and requires an API key stored in an environment variable.

## Environment Variables

Secrets are not committed to the repository.

Example:

```text
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Actual credentials must remain in `.env` and must never be committed to GitHub.

## License Verification

Library versions and their exact dependency licenses should be verified against the corresponding package metadata before production redistribution.

The application itself can be distributed according to the project's repository license once one is selected and added to the repository.

## AI Coding Tool Disclosure

AI coding assistance was used during development for:

* Code generation
* Debugging
* Refactoring
* Error diagnosis
* Documentation assistance

The application architecture, data model, feature requirements, integration decisions, testing, debugging, and final implementation were reviewed and adapted by the developer.

AI coding tools were used as development assistance and not as a substitute for understanding the implemented system.
