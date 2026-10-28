export default async function install(app) {
  const view = app.view;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "esri-widget esri-widget--button";
  button.title = "Remove station selection";
  button.setAttribute("aria-label", "Remove station selection");
  button.style.width = "32px";
  button.style.height = "32px";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.fontSize = "18px";
  button.textContent = "×";

  async function clearSelection() {
    if (app.actions.has("clear-station-selection")) {
      await app.actions.invoke("clear-station-selection", {});
    }
    if (view.selectionManager && typeof view.selectionManager.clear === "function") {
      view.selectionManager.clear();
    }
    if (view.popup && typeof view.popup.clear === "function") {
      view.popup.clear();
    }
    if (view.popup && typeof view.popup.close === "function") {
      view.popup.close();
    }
    app.setStatus("Station selection cleared.");
    return { cleared: true };
  }

  const onClick = () => { void clearSelection(); };
  button.addEventListener("click", onClick);
  view.ui.add(button, "top-left");
  app.actions.register("clear-map-selection", clearSelection);

  app.onCleanup(() => {
    button.removeEventListener("click", onClick);
    view.ui.remove(button);
    button.remove();
  });
}