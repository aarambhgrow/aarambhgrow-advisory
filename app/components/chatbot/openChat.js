/*
  Opens the chat widget (ARTHIQ, the scheme finder). The widget loads a moment
  after the page, so a click that comes first waits for it. If it still hasn't
  loaded after `timeoutMs` (blocked or offline), `fallback` runs instead.
*/
const TAG = "funding-chatbot";

export function openChat({ fallback, timeoutMs = 5000 } = {}) {
  const widget = document.querySelector(TAG);
  if (typeof widget?.open === "function") {
    widget.open();
    return;
  }

  let settled = false;
  const timer = setTimeout(() => {
    if (settled) return;
    settled = true;
    fallback?.();
  }, timeoutMs);

  customElements.whenDefined(TAG).then(() => {
    if (settled) return;
    const ready = document.querySelector(TAG);
    if (typeof ready?.open !== "function") return; // let the fallback run
    settled = true;
    clearTimeout(timer);
    ready.open();
  });
}
