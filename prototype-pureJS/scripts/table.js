function populateTable(data) {
    const canvas = document.getElementById('tag-panel-content');
    tagsList.forEach(tag=>{
        let span = document.createElement('SPAN');
        span.classList.add('badge', 'badge-pill', 'badge-secondary');
        span.appendChild(document.createTextNode(tag));
        canvas.appendChild(span);
    })
}