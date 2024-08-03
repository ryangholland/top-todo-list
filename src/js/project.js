class Project {
  constructor(title) {
    this.title = title;
  }

  render() {
    const button = document.createElement("button");
    const img = document.createElement("img");
    img.classList.add("projectImg");
    const p = document.createElement("p");
    p.textContent = this.title;

    button.append(img);
    button.append(p);
    return button;
  }
}

export default Project;
