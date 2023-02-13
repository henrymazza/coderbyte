# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

After implementing this ticket each Facility will be free to add their own custom ids (`agent_identifier` now on, avoiding `_id` sulfix as it's not a foreign key), to each Agent. As there are N Facilities, a new table will be created to hold this data.

1. Create new table attribute to hold Agents' 'id_custom', let's call it `agent_identifiers`, with attributes:
  - `agent_identifier` (String)
  - `facility_id` (Integer)
  - `agent_id` (Integer)
  Create ORM Classes and UnitTests for this.
  - SIZE: M

2. Create compound Index by `agent_identifier` + `facility_id` to avoid one Facility creates more than one index to the same Agent, but still possible for two Facilities to use the same identifier. Simple migration only.
   - SIZE: XS

3. `getShiftsByFacility` will keep old arguments but look up `agent_identifiers` table, minding diferences in attribute types. If nothing is found fallback to old method, we will keep it as `getShiftsByFacilityLegacy`.  Refactor tests. From this point on on Facilities will be free to rename `agent_identifiers.agent_identifer` attribute to whatever it wants. After this Frontend is free to update UI.
  - SIZE: M

4. Update `generateReport` to use `agent_identifier` making the `JOIN` request with `agent_identifiers` table; Update unit tests.
  - SIZE: M

Time: 14h or 1.75 day
