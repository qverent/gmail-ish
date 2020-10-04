var jsonifiedData = [];
var showViewer = false;
var showSpinner = true;


/* Populate page */
document.addEventListener( 'DOMContentLoaded', async function () {
    // populateTagPanel();
    // populateTable("");
    await loadData();
    populateTable(jsonifiedData);
});


/* Reads and jsonifies text files.
Treats filename as title and assigns an ID sequentially */
async function loadData() {
    let count = 1;
    for (const file of files) {
        await fetch('data/text-files/' + file)
            .then(response=>response.text())
            .then(data=> {
                jsonifiedData.push({
                    id: count,
                    title: file.slice(0, -4),
                    tags: [],
                    text: data,
                });
            count++;
        });
    };
}
