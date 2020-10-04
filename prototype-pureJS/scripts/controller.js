var jsonifiedData = [];
var showViewer = false;
var showSpinner = true;


/* Populate page */
document.addEventListener( 'DOMContentLoaded', async function () {
    // populateTagPanel();
    await loadData();
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('search-bar').classList.remove('hidden');
    document.getElementById('search-table').classList.remove('hidden');
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
