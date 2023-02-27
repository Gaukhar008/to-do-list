import Project from "./Project";

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('Default'));
        this.projects.push(new Project('Today'));
        this.projects.push(new Project('Weekly Planner'));
    }

    getProject(projectName) {
        return this.projects.find(project => project.getName() === projectName);
    }
}