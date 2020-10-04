function populateTable(data) {
    const table = document.getElementById('search-table');
    data.forEach(datum=>{
        const row = document.createElement('TR');

        const datumID = document.createElement('TH');
        let attrDatumID = document.createAttribute('scope');
        attrDatumID.value = datum.id;
        datumID.setAttributeNode(attrDatumID);
        datumID.appendChild(document.createTextNode(datum.id));

        const datumTitle = document.createElement('TD');
        datumTitle.appendChild(document.createTextNode(datum.title));

        const datumPreview = document.createElement('TD');
        datumPreview.classList.add('preview-cell');
        // datumPreview.appendChild(document.createTextNode(datum.text.substring(0, 90)));
        datumPreview.innerHTML = formatPreviewString(datum.text.substring(0, 90));
        const datumTags = document.createElement('TD');

        row.appendChild(datumID);
        row.appendChild(datumTitle);
        row.appendChild(datumPreview);
        row.appendChild(datumTags);
        table.appendChild(row);
    });
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