"use strict";

var {ipcRenderer } = require('electron');

function getAppDirectory() {
    return __dirname;
}

let projectPath;
let JSONFileName = "project.json"
// check for 'project.json'
ipcRenderer.on('project-directory-selected', (event, filePath) => {
    var fs = require('fs');
    var jsonfile = require('jsonfile');

    projectPath = filePath.replace(/\\/g, "/")

    var JSONpath = (projectPath + "/" + JSONFileName);

    if (fs.existsSync(JSONpath)) {
        var obj = jsonfile.readFileSync(JSONpath, { throws: false });

        if (obj) {
            // dom something
        } else {
            alert('The JSON data could not be parsed.\n\nSo sad.');
        }

    } else {
        alert('A \"tlk-project.json\" file was not found.\n\nTry again.');
    }
});

// hande selected JSON file
ipcRenderer.on('json-file-selected', (event, filePath) => {
    var fs = require('fs');
    var jsonfile = require('jsonfile');
    var path = require('path');
    filePath =  filePath.replace(/\\/g, "/") 
    projectPath =  path.dirname(filePath);  

    var JSONpath = filePath;

    if (fs.existsSync(JSONpath)) {
        var obj = jsonfile.readFileSync(JSONpath, { throws: false });

        if (obj) {
            // do something
        } else {
            alert('The JSON data could not be parsed.\n\nSo sad.');
        }

    } else {
        alert('A \"project.json\" file was not found.\n\nTry again.');
    }
});



function getProjectPath() {
    return projectPath;
}
