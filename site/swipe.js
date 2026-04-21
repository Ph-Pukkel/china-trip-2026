// swipe.js — lightweight horizontal-swipe detector (vanilla JS, touch + mouse)
export function attachSwipe(el, {
  threshold = 60,
  velocityThresh = 0.3,
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  onMove = () => {},
  onCancel = () => {},
} = {}) {
  let startX = 0, startY = 0, startTime = 0;
  let dragging = false, locked = null;

  function getPoint(e) {
    if (e.touches && e.touches[0]) return e.touches[0];
    if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0];
    return e;
  }
  function onStart(e) {
    const p = getPoint(e);
    startX = p.clientX; startY = p.clientY; startTime = performance.now();
    dragging = true; locked = null;
  }
  function onMoveEvt(e) {
    if (!dragging) return;
    const p = getPoint(e);
    const dx = p.clientX - startX;
    const dy = p.clientY - startY;
    if (locked === null) {
      if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
        locked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
    }
    if (locked === "x") {
      if (e.cancelable) e.preventDefault();
      onMove(dx, Math.min(Math.abs(dx) / threshold, 1));
    }
  }
  function onEnd(e) {
    if (!dragging) return;
    dragging = false;
    if (locked !== "x") { onCancel(); return; }
    const p = getPoint(e);
    const dx = p.clientX - startX;
    const dt = performance.now() - startTime;
    const velocity = Math.abs(dx) / Math.max(dt, 1);
    const passed = Math.abs(dx) > threshold || velocity > velocityThresh;
    if (passed) {
      if (dx < 0) onSwipeLeft(dx); else onSwipeRight(dx);
    } else {
      onCancel();
    }
  }

  el.addEventListener("touchstart", onStart, { passive: true });
  el.addEventListener("touchmove",  onMoveEvt, { passive: false });
  el.addEventListener("touchend",   onEnd);
  el.addEventListener("touchcancel", () => { dragging = false; onCancel(); });

  // Mouse fallback for desktop
  let mouseDown = false;
  el.addEventListener("mousedown", (e) => {
    mouseDown = true;
    onStart(e);
  });
  window.addEventListener("mousemove", (e) => { if (mouseDown) onMoveEvt(e); });
  window.addEventListener("mouseup", (e) => {
    if (!mouseDown) return;
    mouseDown = false;
    onEnd(e);
  });
}
