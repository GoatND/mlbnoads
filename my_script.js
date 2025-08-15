// The aria-label of the element you want to detect
const TARGET_ARIA_LABEL = 'my-aria-label';

// Function to handle the disappearance of the element
function onElementDisappear() {
  console.log(`An element with the aria-label "${TARGET_ARIA_LABEL}" has disappeared!`);
  // Place your custom action here.
}

// Find the target node to observe, in this case, the entire body.
const targetNode = document.body;

// Create an instance of the observer
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
      for (const removedNode of mutation.removedNodes) {
        // Check if the removed node itself has the target aria-label
        if (removedNode.getAttribute && removedNode.getAttribute('aria-label') === TARGET_ARIA_LABEL) {
          onElementDisappear();
          observer.disconnect();
          return;
        }

        // Also check if any children of the removed node have the target aria-label
        const querySelectorResult = removedNode.querySelector(`[aria-label="${TARGET_ARIA_LABEL}"]`);
        if (querySelectorResult) {
          onElementDisappear();
          observer.disconnect();
          return;
        }
      }
    }
  }
});

// Configure the observer to watch for additions and removals of child nodes and their subtrees
const config = { childList: true, subtree: true };

// Start observing the target node
observer.observe(targetNode, config);
