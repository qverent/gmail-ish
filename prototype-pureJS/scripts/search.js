var searchIncludeWords = [];
var searchIncludePhrases = [];
var searchExcludeWords = [];
var searchExcludePhrases = [];
var searchResults = [];


/*
If user accidentally adds a word to include but also exclude, it is neutralized
*/
function search(){
  // loadData.filter()  
}

/**
 * Updates the arrays that includes the phrases and words to include/exclude in search
 * @param {'inc' || 'exc'} arrayName 
 * @param {string} input 
 */
function updateSearchArray (arrayName, input) {
    input = input.toLowerCase();
    let phrases = input.match(/"(.*?)"/g) || [];

    // Separate phrases into its own array
    phrases.forEach(phrase=> {
        input = input.replace(phrase, '');
    });
    
    // Handle multiple white spaces in words 
    // let words = input.replace(/ +/g, '');
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
    console.log('incWords', searchIncludeWords);
    console.log('incPHrases', searchIncludePhrases);
    console.log('excWords', searchExcludeWords);
    console.log('excPhrases', searchExcludePhrases);
}