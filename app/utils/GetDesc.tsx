export const getDescriptionParts = (html: string) => {
  if (!html) return { first: "", rest: "" };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const children = Array.from(doc.body.children);

  let lastIndexForFirst = -1;

  for (let i = 0; i < children.length; i++) {
    const el = children[i];

    const text = el.textContent?.trim() || "";

    if (el.tagName === "P" && text === "") {
      continue;
    }

    lastIndexForFirst = i;

    if (el.tagName === "P" && text !== "") {
      break;
    }
  }

  if (lastIndexForFirst === -1) {
    return { first: html, rest: "" };
  }

  const first = children
    .slice(0, lastIndexForFirst + 1)
    .map((el) => el.outerHTML)
    .join("");

  const rest = children
    .slice(lastIndexForFirst + 1)
    .map((el) => el.outerHTML)
    .join("");

  return { first, rest };
};
