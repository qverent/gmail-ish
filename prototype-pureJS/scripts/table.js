/* Sets docInView with the ID of the selected document
 * Triggers transition to document viewer
 */
function handleRowClick(id){
    docInView = id;
    showViewer();
}


/* Empties the table*/
function clearTable(){
    const table = document.querySelector('#search-table > tbody');
    while (table.hasChildNodes()) table.removeChild(table.lastChild);
}


/* Returns an html string that bolds the first sentence */
function formatPreviewString(text) {
    let result = "<strong>";
    let index = text.indexOf(".") || text.indexOf("? ") || text.indexOf("! ") || (text.indexOf("\" "));
    if (index === -1) {
        result += `${text}</strong>`;
    }
    else {
        result += text.substring(0, index+1);
        result += "</strong>";
        result += text.substring(index+1);
    }
    return result;
}


/* Populates table with ID, title, preview text and tags*/
function populateTable(data) {
    const table = document.querySelector('#search-table > tbody');
    data.forEach(datum=>{
        const row = document.createElement('TR');
        row.onclick = () => {
            handleRowClick(datum.id);
        };

        const datumID = document.createElement('TH');
        let attrDatumID = document.createAttribute('scope');
        attrDatumID.value = datum.id;
        datumID.setAttributeNode(attrDatumID);
        datumID.appendChild(document.createTextNode(datum.id));

        const datumTitle = document.createElement('TD');
        datumTitle.appendChild(document.createTextNode(datum.title));

        const datumPreview = document.createElement('TD');
        datumPreview.classList.add('preview-cell');
        datumPreview.innerHTML = formatPreviewString(datum.text.substring(0, 90));
        const datumTags = document.createElement('TD');

        row.appendChild(datumID);
        row.appendChild(datumTitle);
        row.appendChild(datumPreview);
        row.appendChild(datumTags);
        table.appendChild(row);
    });
}