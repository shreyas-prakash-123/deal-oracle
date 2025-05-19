# Deal Oracle

## Overview

The Deal Oracle aims to inform the TA performance team with actionable insights and metrics to effectively pitch high potential Transformative Agreement (TA) deals with institutions and research funders by identifying the source of APC invoices.

By aggregating data from APC payments and disclosures of research funding from OASiS, this dashboard demonstrates the business impact and benefits of TA deals for research funders and institutions that are already paying for the APCs, but don't have a TA deal with Springer Nature yet.

> **Note**: Research funders outside TA deals don't exist in any of our systems. We give them a view to see the number of publications they have supported, and help make their impact visible, as well as promote our TAs.

## Problem Statement

Springer Nature is missing out on high-potential Transformative Agreement (TA) deals because:

1. **Lack of visibility**:
   - No centralized view across APC payment records
   - Many research funders aren't in existing CRM or contract systems
   - No segmentation between institution vs. research funder (fuzzy, unstructured data in billing records)

2. **Sales teams are under-equipped**:
   - Lack of historical context on OA articles published, license types, and journals
   - No decision-making tools to simulate TA deals based on historical data

3. **Funders lack awareness**:
   - Research funders are often unaware of the volume of publications they indirectly fund via APCs
   - No visibility into cumulative cost/value of publications
   - Potential cost savings from TAs remain unknown

## Solution

The Deal Oracle aggregates APC payment data (via OASiS) to:

1. **Expose Opportunity**:
   - Leaderboards of institutions/funders based on APC spend
   - Deep-dive views: article types, license types, journals, etc.
   - Predictive metrics from historic data (license share, deal capture rates)

2. **Enable Action**:
   - Sales teams can simulate TA deal structures based on past behavior
   - Downloadable, filterable reports to support outreach and negotiation

3. **Create Shared Visibility**:
   - Funders gain first-time visibility into what they've funded, costs, and impact
   - TA deals framed as cost-saving and impact-maximizing opportunities

## User Journey

- Users view a ranked list/leaderboard of institutions/research funders based on APC revenue (separate views for research funders and institution funders)
- Users can expand to view detailed information (payment history, license, article type, journal info)
- Users can filter to view specific institution or research funder details, including predictions based on historical data
- For selected institutions or research funders, users can:
  - Get insights on article types, license types, and journals published
  - View overviews of total articles under OA without deal and total articles under subscription
  - Download generated reports

## Dashboard Views

| View | Description |
|------|-------------|
| Institution Summary | Shows how many articles were submitted, how many would have been eligible, and how many were published OA—with or without a deal |
| Funder Influence Map | Maps submissions and publications by funder, showing who drives OA and where deals might help compliance |
| Opportunity Score | Ranks non-partner institutions by volume and funding activity to highlight "high opportunity" targets |
| Value Realized Tracker | For current deals: shows savings (e.g., waived APCs), compliance improvements, and author satisfaction metrics |

## Business Outcomes

For Springer Nature:
- Better decision-making leveraging historic data from past APC payments
- Enhanced sales strategies to identify high-potential TA deals
- Tailored pitches to prospective clients with compelling evidence
- Data-driven approach to draft deals based on historic patterns

For Funders:
- Quantification and highlighting of cost savings and research impact
- Centralized view of payments and contributions
- Access to previously unknown publisher data

## Data Sources

**Pre-Acceptance Data (via Submissions)**:
- "Research Sponsored By" information (funding source, grant ID, country)
- "Author Affiliation" details (institution name, country, department)
- Author eligibility under current or past agreements

**Post-Acceptance Data (via Metadata/Workflows)**:
- Final author affiliations
- Funder metadata (ROR)
- Licensing information (CC BY, CC BY-NC, etc.)
- OA status (hybrid vs. full OA journals)
- APC waiver or discount status

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a87ccd65-ff77-44ea-b759-55baef816d0a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
