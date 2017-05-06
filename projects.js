const fs = require('fs');

var fetchProjects = () => {
  try{
    var projects = fs.readFileSync('projects.json');
    return JSON.parse(projects);
  }catch(e){
    return [];
  }
};

module.exports = {
  fetchProjects
};
