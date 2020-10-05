var docInView = 0;
var jsonifiedData = [];
var hashedData = {};
var index = [];
// var showViewer = false;
var showSpinner = true;


/* Populate page on entry */
document.addEventListener( 'DOMContentLoaded', async function () {
    await loadData();
    await hashLoadedData();
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('search-bar').classList.remove('hidden');
    document.getElementById('search-table').classList.remove('hidden');
    populateTable(jsonifiedData);
});

/* Hides the table and populates the docViewer based on current docInView*/
function showViewer(){
    populateTagPanelActive();
    populateTagPanelInactive();
    populateViewer();
    document.getElementById('search-table').classList.add('hidden');
    document.getElementById('doc-viewer').classList.remove('hidden');
}

/* Populates viewer with document text*/
function populateViewer() {
    const viewerTextArea = document.querySelector('#doc-viewer-text');
    const text = jsonifiedData.filter(datum => datum.id === docInView)[0].text;
    const newLines = text.split("\n");
    newLines.forEach(newline=> {
        const paragraph = document.createElement('P');
        paragraph.classList.add('card-text', 'text-justify');
        paragraph.appendChild(document.createTextNode(newline));
        viewerTextArea.appendChild(paragraph);
    });
}

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
