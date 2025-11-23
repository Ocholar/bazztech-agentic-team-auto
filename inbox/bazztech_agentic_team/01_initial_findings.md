# Initial Findings and Technical Strategy for Bazztech Agentic Team

## 1. Core Objective and Constraints
The primary objective is to achieve and sustain **400+ Monthly Gross Adds (GAs)** for Airtel Kenya 5G ODU, prioritizing the higher-MRR 30Mbps package, using a fully autonomous n8n-based Sales & Marketing Agentic Team. The entire solution must rely on **zero-cost tools**.

## 2. Critical Technical Challenge: Microsoft Form Auto-Submission
The core technical challenge is the automated submission of the Airtel Installation Request Form (`https://forms.office.com/r/hcrh2wrJDp`). Since Microsoft Forms does not provide a public API for submission, the strategy must rely on **reverse-engineering the undocumented HTTP POST request** sent by the browser.

### 2.1. Form Structure Analysis (via Browser Inspection)
Manual submission revealed the following key elements and their required values:

| Form Field (Question) | Required Value (Source) | Notes |
| :--- | :--- | :--- |
| Agent Type | `Enterprise` | Static value from Master Prompt. |
| Enterprise CP | `BAZZTECH NETWORKS` | Static value from Master Prompt. |
| Agent Name | `Reagan Ochola` | Static value from Master Prompt. |
| Agent Mobile | `254781751937` | Static value from Master Prompt. |
| Type of Lead | `Confirmed` | Static value from Master Prompt. |
| Type of Connection | `SmartConnect (5G ODU)` | Static value from Master Prompt. |
| Customer Name | Dynamic (from Lead Qualification Agent) | Required field. |
| Customer Phone No. (Airtel Number) | Dynamic (from Lead Qualification Agent) | Required field. |
| Customer Alternative Number | Dynamic (from Lead Qualification Agent) | Required field. |
| Customer Email Address | Dynamic (from Lead Qualification Agent) | Required field. |
| Customer Preferred Package | Dynamic (`5G _30Mbps_30days at Ksh.3999` or `5G _15Mbps_30days at Ksh.2999`) | Crucial for upselling strategy. |
| Customer Installation Town | Dynamic (from Lead Qualification Agent) | Required field. |
| Specific Delivery Location (Nearest Landmark) | Dynamic (from Lead Qualification Agent) | Required field. |
| Preferred Date of Visit/Installation | Dynamic (from Lead Qualification Agent) | Required field (Date Picker). |
| Preferred Time of Visit | Dynamic (from Lead Qualification Agent) | Required field (Dropdown). |

### 2.2. Reverse-Engineering Strategy
1.  **Identify Submission Endpoint:** The submission is a POST request to an endpoint similar to `https://forms.office.com/formapi/User/FORM_ID/answers`. The exact endpoint and required headers (e.g., `Authorization`, `X-Ms-Form-Token`) must be determined.
2.  **Identify Payload Structure:** The request body will contain a JSON object, likely with a `data` or `answerData` field, which maps the question IDs to the user's answers.
3.  **Extract Question IDs:** The next step is to find the unique internal ID for each of the 15 questions listed above. This is typically done by inspecting the page source or the network request payload. Since direct network inspection is not possible, I will use a programmatic approach to extract the question IDs from the form's HTML structure.

## 3. Zero-Cost Tech Stack Confirmation
The proposed stack is feasible under the zero-cost constraint:
*   **Automation:** n8n Self-Hosted (Community Edition).
*   **LLM/Agentic Logic:** Open-source LLMs via n8n's LLM nodes (e.g., Llama 3, Mixtral).
*   **Communication:** Unofficial/Community WhatsApp API for n8n (requires further selection and setup).
*   **Data/Analytics:** Google Sheets + Looker Studio (free tiers).
*   **Creative Generation:** Canva Free / Bing Image Creator.

The next phase will focus on executing the reverse-engineering of the form submission.
