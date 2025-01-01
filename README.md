University System JSON Operations

This project provides a Node.js program for managing a university system stored in a JSON file. The JSON structure includes departments, professors, and students, supporting CRUD operations with data validation and file handling.
Features

1.Complex Data Structure: Nested JSON for departments, professors, and students.
2.CRUD Operations: Add, update, delete, and search entries at any nested level.
3.Data Validation: Ensures data integrity during modifications.
4.File Handling: Reads and writes to a JSON file with automatic backups.

#Setup Instructions:
Installation

1.Open the project folder in VS Code.

2.Initialize the project dependencies:
npm init -y

3.Ensure the university.json file exists in the project folder.

#Usage

1.Running the Script
2.Open the terminal in the project folder.
3.Execute the script:
node index.js

#Example Operations

1.Initialize Data

initializeJSON();
Run the script to initialize.

2.Add a New Entry
Use addEntry to add a professor, student, or department:
eg: addEntry({ id: 'p2', name: 'Dr. Jones', departmentId: 'd1' }, 'professor');

3.Update an Entry
Update an existing entry with updateEntry:
eg: updateEntry('p2', { name: 'Dr. John Jones' }, 'professor');

4.Delete an Entry
Delete an entry using deleteEntry:
eg: deleteEntry('d2', 'department');

5.Search for an Entry
Search for a specific entry by ID:
eg: searchEntry('p2', 'professor');

#File Structure

1.index.js: Main program file.
2.university.json: Data file for the university system.
3.university_backup.json: Backup of the JSON file before modifications.

#Function Documentation

1.initializeJSON()
Populates university.json with a predefined data structure.

2.addEntry(data, context)
Adds a new entry to the JSON file.
data: Object containing entry details.
context: Type of entry (department, professor, or student).

3.updateEntry(id, updates, context)
Updates an existing entry.
id: ID of the entry to update.
updates: Object with fields to update.
context: Type of entry.

4.deleteEntry(id, context)
Deletes an entry by ID.
id: ID of the entry to delete.
context: Type of entry.

5.searchEntry(id, context)
Searches for an entry by ID.
id: ID of the entry to search.
context: Type of entry.

6.validateData(data, context)
Validates the data structure for the given context.

7.createBackup()
Creates a backup of university.json before any modifications.



