# open-athens-parse-empty-roles
In our OpenAthens configuration, permissions are based on the institutional role in the SAML data for each account. When this role is missing, patrons cannot access library resources. This JavaScript code auatomatically scans PCOM accounts in then OpenAthens web interface for empty roles and outputs that list. 
## Directions for Use
1. Open OpenAthens and go to Accounts.
2. Select the PCOM tab.
3. Sort by "Last Signed In" with most recent first.
4. Adjust view to show 100 results (speeds up the processing).
5. Open Developer Tools (F12) and select console.
6. Paste the contents of script.js into the console and press enter.
7. Wait as the script goes through each page of accounts.
8. Copy the results once the screen fully updates and save as a CSV file.
