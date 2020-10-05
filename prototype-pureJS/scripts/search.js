var searchIncludeWords = [];
var searchIncludePhrases = [];
var searchExcludeWords = [];
var searchExcludePhrases = [];
var searchResults = [];


/*
 * Create a hash table for each medical record containing [word, count] to optimize search
 * Poplate index of document IDs
 */
async function hashLoadedData() {
    jsonifiedData.forEach(datum => {
        // Rough pre-process: keep underscores, hyphens, alphanumeric
        const preprocessed = datum.text.replace(/[^(\w\ -)]/g, ' ');
        const datumArray = preprocessed.split(" ");
        let hash = new Map();
        datumArray.forEach(word => {
            word = word.trim().toLowerCase();
            if (word.length >= 1) {
                let count = hash.get(word) || 0;
                count++;
                hash.set(word, count);
            }
        })
        hashedData[datum.id] = hash;
        index.push(datum.id);
    });
}


/*
If user accidentally adds a word to include but also exclude, it is neutralized TODO
* Performs search and updates tables
*/
function search(){
    console.log('search');
    let resultsID = searchHelperIWP();
    resultsID = searchHelperEW(resultsID);
    resultsID = searchHelperEP(resultsID);
    searchResults = resultsID;
    clearTable();
    populateTable(jsonifiedData.filter(datum => resultsID.includes(datum.id)));
}

/**
 * Updates an array of document IDs by removing any that includes an excluded phrase
 * @param {number[]} resultsID 
 */
function searchHelperEP(resultsID) {
    searchExcludePhrases.forEach(phrase=> {
        resultsID = resultsID.filter(id => {
            const text = jsonifiedData.filter(datum => datum.id === id)[0].text.toLowerCase();
            return (!text.includes(phrase));
        });
    });
    return resultsID;
}


/**
 * Updates an array of document IDs by removing any that includes an excluded word
 * @param {number[]} resultsID 
 */
function searchHelperEW(resultsID) {
    searchExcludeWords.forEach(word => {
        resultsID = resultsID.filter(id => {
            const count = hashedData[id].get(word) || 0;
            return count === 0;
        })
    });
    return resultsID;
}

/**
 * Returns an array of document IDs that contains any searched phrase OR word
 */
function searchHelperIWP() {
    let resultsID = new Set(searchHelperIW());
    if (searchIncludePhrases.length > 0) searchHelperIP().forEach(id => resultsID.add(id));
    return [...resultsID];
}


/**
 * Returns an array of document IDs that contains any searched phrase
 */
function searchHelperIP() {
    // if (searchIncludePhrases.length === 0) return [...index];
    let resultsID = new Set();
    searchIncludePhrases.forEach(phrase => {
        index.forEach(index => {
            const text = jsonifiedData.filter(datum => datum.id === index)[0].text.toLowerCase();
            if (text.includes(phrase)) resultsID.add(index);
        });
    });
    return [...resultsID];
}


/**
 * Returns an array of document IDs that contains any searched word
 */
function searchHelperIW() {
    if (searchIncludeWords.length === 0) return [...index];
    let resultsID = new Set();
    searchIncludeWords.forEach(word => {
        index.forEach(i => {
            const count = hashedData[i].get(word) || 0;
            if (count > 0) resultsID.add(i);
        });
    });
    return [...resultsID];
}


/**
 * Updates the arrays that includes the phrases and words to include/exclude in search
 * @param {'inc' || 'exc'} arrayName 
 * @param {string} input 
 */
function updateSearchArray (arrayName, input) {
    input = input.toLowerCase();
    let phrases = input.match(/"(.*?)"/g) || [];
    phrases = phrases.map(phrase => phrase.substring(1, phrase.length - 1)); //Remove double quotes

    // Separate phrases into its own array
    phrases.forEach(phrase=> {
        input = input.replace(phrase, '');
    });
    
    // Handle multiple white spaces in words 
    let words = input.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (words[i].trim().length === 0)
        words.splice(i, 1);
    }
    
    if (arrayName==='inc') {
        searchIncludeWords = words;
        searchIncludePhrases = phrases;
    }
    else {
        searchExcludeWords = words;
        searchExcludePhrases = phrases;
    }
    search();
}