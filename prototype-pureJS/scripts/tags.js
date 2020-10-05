/**
 * Adds tag to docInView tag list
 * Re-renders tag panels
 */
function activateTag(tagID) {
    jsonifiedData.filter(datum => datum.id === docInView)[0].tags.push(tagID);
    clearTagPanel('tags-inactive');
    populateTagPanelInactive();
    clearTagPanel('tags-active');
    populateTagPanelActive();
}

/**
 * Removes all tags from specified panel
 * @param {'tags-active' | 'tags-inactive'} domID 
 */
function clearTagPanel(domID) {
    const panel = document.getElementById(domID);
    const tags = panel.querySelectorAll('span');
    tags.forEach(tag => tag.remove());
}


/**
 * Removes tag from docInView tag list
 * Re-renders tag panels
 */
function deactivateTag(tagID) {
    const datumIndex = jsonifiedData.findIndex(datum => datum.id === docInView);
    const tagIndex = jsonifiedData[datumIndex].tags.findIndex(tag => tag === tagID);
    jsonifiedData[datumIndex].tags.splice(tagIndex, 1);
    clearTagPanel('tags-inactive');
    populateTagPanelInactive();
    clearTagPanel('tags-active');
    populateTagPanelActive();
}


/**
 * Creates active tags based on docInView
 */
function populateTagPanelActive() {
    const panel = document.getElementById('tags-active');
    let tagIDs = jsonifiedData.filter(datum => datum.id === docInView)[0].tags;
    tagIDs = tagIDs.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    tagIDs.forEach(tagID=>{
        const tagInfo = tagsMasterlist.filter(t => tagID === t.id)[0];
        let span = document.createElement('SPAN');
        span.onclick=()=>{ deactivateTag(tagID)};
        span.classList.add('badge', 'badge-pill', 'tag', 'tag-active');
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
        span.onclick=()=>{activateTag(tag.id)};
        span.classList.add('badge', 'badge-pill', 'badge-light', 'tag');
        span.appendChild(document.createTextNode(`${tag.text} [${tag.id}]`));
        panel.appendChild(span);
    }); 
}

