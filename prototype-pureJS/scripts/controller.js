var jsonified = [];
var showViewer = false;
var showSpinner = true;


/* Populate page */
document.addEventListener( 'DOMContentLoaded', async function () {
    // populateTagPanel();
    // populateTable("");
    await loadData();
    populateTable();
});


/* Reads and jsonifies text files */
async function loadData() {
    for (const file of files) {
        await fetch('data/text-files/' + file)
            .then(response=>response.text())
            .then(data=> {
                jsonified.push({
                    id: file,
                    tags: [],
                    text: data,
                });
        });
    };
}
