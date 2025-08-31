export function highlightCell(
  el: HTMLElement | null,
  shouldHighlight: boolean,
) {
  if (!el || !shouldHighlight) return;
  el.style.backgroundColor = "#fffacd";
  setTimeout(() => {
    el.style.backgroundColor = "";
  }, 1000);
}
