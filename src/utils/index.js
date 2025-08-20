export function createPageUrl(name) {
  return `/${String(name || "").toLowerCase()}`;
}

