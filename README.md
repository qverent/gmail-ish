# gmail-ish
A gmail-ish clone, with a focus on tags and search, using very strictly, pure vanila JS.

## How to run this project
After cloning this project, simply fire up a local host in the `prototype-pureJS` folder and navigate to your browser.

For example, in the project directory, I ran `python -m http.server 8000`. I then accessed the project by tyiping `localhost:8000` on my browser.

## Usage and test notes
This project has been tested on Chrome.

The file titles may be helpful for testing the search function. For example, `Shakesepeare-RJ` likely has words `Romeo`, `Juliet`, `Verona` that are unlikely to be found in other documents. Similarly, for `...PridePrejudice`, useful search words include `Mr. Bennett`, `Elizabeth` and, of course, `Mr. Darcy`.

Utils: Small bash script to help with converting filenames in a directory into an array of strings.


## Design notes: search
Not case-sensitive.
Works for word phrases (e.g. "an apple a day").
Does OR search for the inclusive terms.


## Design notes: bolding the first sentence in the preview
The specs seemed to suggest italicizing and greying out the remaining the remaining preview text after the first sentence; however, this ended up looking quite unsightly and busy. Also, the greyed out text does not seem to meet the WCAG standards for contrast. Hence, my choice to simply bold the first sentence.

I used the general definition of a sentence, which is punctuation mark followed by a space. This did not always work out since my text files included a range of genres and sources (e.g.plays, poetry, etc). I expect this to work much better for proper medical reports with proper preprocessing, which is beyond the scope of this demo.
