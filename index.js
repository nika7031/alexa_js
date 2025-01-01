const fs = require('fs'), path = require('path');
const filePath = path.join(__dirname, 'university.json');
const backupPath = path.join(__dirname, 'university_backup.json');

const readJSON = (file) => {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); } 
    catch (error) { console.error(`Error reading file: ${file}`, error); return null; }
};

const writeJSON = (file, data) => {
    try { fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8'); } 
    catch (error) { console.error(`Error writing to file: ${file}`, error); }
};

const createBackup = () => {
    if (fs.existsSync(filePath)) {
        try { fs.copyFileSync(filePath, backupPath); console.log('Backup created.'); } 
        catch (error) { console.error('Error creating backup:', error); }
    }
};

const validateData = (data, context) => {
    const validations = {
        department: () => data.departmentName && data.id,
        professor: () => data.name && data.id && data.departmentId,
        student: () => data.name && data.id && data.departmentId
    };
    if (!validations[context]()) throw new Error(`${context} validation failed.`);
};

const modifyJSON = (callback) => {
    const json = readJSON(filePath) || { departments: [] };
    callback(json);
    createBackup();
    writeJSON(filePath, json);
};

const addEntry = (data, context) => {
    try {
        validateData(data, context);
        modifyJSON(json => {
            const { departments } = json;
            if (context === 'department') departments.push(data);
            else {
                const dep = departments.find(d => d.id === data.departmentId);
                if (!dep) throw new Error('Invalid departmentId.');
                dep[context === 'professor' ? 'professors' : 'students'] ||= [];
                dep[context === 'professor' ? 'professors' : 'students'].push(data);
            }
        });
        console.log(`${context} added.`);
    } catch (error) { console.error('Error adding entry:', error.message); }
};

const updateEntry = (id, updates, context) => {
    try {
        modifyJSON(json => {
            const entry = json.departments.flatMap(dep => (context === 'department' ? [dep] : dep[context + 's'] || []))
                                        .find(item => item.id === id);
            if (!entry) throw new Error(`${context} not found.`);
            Object.assign(entry, updates);
        });
        console.log(`${context} updated.`);
    } catch (error) { console.error('Error updating entry:', error.message); }
};

const deleteEntry = (id, context) => {
    try {
        modifyJSON(json => {
            json.departments.forEach(dep => {
                if (context === 'department') json.departments = json.departments.filter(d => d.id !== id);
                else dep[context + 's'] = dep[context + 's']?.filter(item => item.id !== id);
            });
        });
        console.log(`${context} deleted.`);
    } catch (error) { console.error('Error deleting entry:', error.message); }
};

const searchEntry = (id, context) => {
    try {
        const json = readJSON(filePath);
        if (!json) throw new Error('Data file not found.');
        const entry = json.departments.flatMap(dep => (context === 'department' ? [dep] : dep[context + 's'] || []))
                                      .find(item => item.id === id);
        if (!entry) throw new Error(`${context} not found.`);
        console.log(entry);
    } catch (error) { console.error('Error searching entry:', error.message); }
};

const initializeJSON = () => {
    const university = {
        departments: [
            {
                departmentName: 'department1', id: 'd1',
                professors: [], students: []
            },
            {
                departmentName: 'department2', id: 'd2',
                professors: [], students: []
            },
            {
                departmentName: 'department3', id: 'd3',
                professors: [], students: []
            }
        ]
    };
    writeJSON(filePath, university);
    console.log('Initialized university data.');
};


initializeJSON();
addEntry({ id: 'p2', name: 'Miss Sheetal', departmentId: 'd1' }, 'professor');
addEntry({ id: 's1', name: 'Siddhi', departmentId: 'd1' }, 'student');
addEntry({ id: 'p3', name: 'Ms. Trisha', departmentId: 'd3' }, 'professor');
addEntry({ id: 's2', name: 'Harsh', departmentId: 'd1' }, 'student');
addEntry({ id: 'p1', name: 'Mr. Roy', departmentId: 'd1' }, 'professor');
updateEntry('s1', { name: 'Alice Brown' }, 'student');
deleteEntry('d2', 'department');
searchEntry('p1', 'professor');
