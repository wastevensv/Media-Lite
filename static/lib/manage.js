function collapseQueue() {
    e.preventDefault();
    var $collapse = $("#queue-container");
    $collapse.collapse('toggle');
    clearTimeout(tQueue);
}

function collapseSearch() {
    e.preventDefault();
    var $collapse = $("#search-container");
    $collapse.collapse('toggle');
}
