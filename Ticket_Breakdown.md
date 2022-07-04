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

- Update DB, we should add new column into Facilities table in order to store a custom Agent's ID and also a column into Agents table so we can create a relationship
  acceptance criteria: as a Dev, I should be able to query this new information
  effort estimates: 2
  tests: this shouldn't break any E2E, add new E2E

- Update BE endpoints, in order to return new data already added into Facilities table, we should update current queries, update related tests and swagger/documentation
  acceptance criteria: as a Dev, I should be able to hit the endpoint and see new data, also I should be able to see this change reflected on Swagger, Postman or Insomnia
  effort estimates: 1
  tests: this shouldn't break any E2E, add new E2E, add new functional tests

- Update `getShiftsByFacility` and `generateReport` methods so we can read new custom Agent's ID from the client and don't break any report
  acceptance criteria: as a User, I should be able print/log new property and print reports without problems
  effort estimates: 2
  tests: update types, add some E2E and functional tests.
