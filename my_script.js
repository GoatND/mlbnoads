const target = document.querySelector('#elementID');
const observer = new MutationObserver((mutations) => {
    if (!document.contains(target)) {
        console.log('Element disappeared');
    }
});
observer.observe(document.body, { childList: true, subtree: true });
