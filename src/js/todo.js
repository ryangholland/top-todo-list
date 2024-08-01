class Todo {
  constructor(title, description, dueDate, priority, project=null) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
  }

  render() {
    const container = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = this.title;
    container.append(title)
    
    return container;
  }
}

export default Todo;
