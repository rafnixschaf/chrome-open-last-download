
chrome.storage.local.get("results", function(result) {

    var table = document.getElementById('list');

    result["results"].forEach(function(content) {

        var newRow = table.insertRow(0);
        var newCell  = newRow.insertCell(0);
        newCell.id = content.id;
        newCell.addEventListener("click", function() {
            openFolder(this.id);
        });
        var newText  = document.createTextNode(extractFilename(content.filename));
        newCell.appendChild(newText);

    });


});

chrome.windows.onFocusChanged.addListener(function() {
    window.close();
});

function extractFilename(path) {
    if (path.substr(0, 12) == "C:\\fakepath\\")
        return path.substr(12); // modern browser
    var x;
    x = path.lastIndexOf('/');
    if (x >= 0) // Unix-based path
        return path.substr(x+1);
    x = path.lastIndexOf('\\');
    if (x >= 0) // Windows-based path
        return path.substr(x+1);
    return path; // just the filename
}

function openFolder(id) {

    chrome.downloads.search({}, function (results) {
        chrome.downloads.show(parseInt(id));

    });
}
