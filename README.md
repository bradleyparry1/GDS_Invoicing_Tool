# reactgoogleappsscripttemplate
Single Page App on Google Apps Script using React.js

## Usage

Install clasp command line tool (if you don't have it already)

```bash
npm install @google/clasp -g
```

Then login to your Google account:

```bash
clasp login
```

Open terminal and clone this project.

You have to create an Apps Script project to run this code.

```bash
clasp create --type standalone --title "React Google Apps Script Template"
```

Now build the project and upload to your newly created Apps Script project

```bash
npm install
npm run deploy
```