/**
 * Creates active tags based on docInView
 */
function populateTagPanelActive() {
    const panel = document.getElementById('tags-active');
    const tagIDs = jsonifiedData.filter(datum => datum.id === docInView)[0].tags;
    tagIDs.forEach(tagID=>{
        // const tagInfo = tagsMasterlist.filter(t => tagID === t.id)[0];
        let span = document.createElement('SPAN');
        span.classList.add('badge', 'badge-pill', 'badge-secondary');
        span.appendChild(document.createTextNode(`${tagInfo.text} [${tagID}]`));
        panel.appendChild(span);
    });
}

/**
 * Creates inactive tags based on docInView
 */
function populateTagPanelInactive() {
    const panel = document.getElementById('tags-inactive');
    const activeTags = jsonifiedData.filter(datum => datum.id === docInView)[0].tags;
    const inactiveTags = tagsMasterlist.filter(tag => !activeTags.includes(tag.id));
    inactiveTags.forEach(tag => {
        let span = document.createElement('SPAN');
        span.classList.add('badge', 'badge-pill', 'badge-light', 'tag');
        span.appendChild(document.createTextNode(`${tag.text} [${tag.id}]`));
        panel.appendChild(span);
    }); 
}