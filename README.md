# DraftWise Frontend Interview Project

We want you to write a Word add-on that takes a Word document and renders it into HTML.
This add-on will connect to Word document instance using Word API, query for its content, and display paragraphs.

Word API provides handful of methods to interact with the document. A document contains a body which contains a list of paragraps.
Each paragraph consists of multiple sections called "run"s. These runs may contain formatting data as well as the text itself.

## Tasks

- Read a Word document using Word API and render its content into the app. It doesn't have to be high-fidelity. We want to see paragraphs, list items, indentation, bold, underlined, etc.
  Images and tables are out of our scope for this project.
  - You can use `/data/NVCA-2020-Stock-Purchase-Agreement-1-September-1-2020.docx` to test your code.
  - Rendering every paragraph at once may not be feasible. So you may want to implement some kind of virtualization.
  - Common virtualization libraries assume every item has the same height. But paragraphs' height may drastically vary. Keep that in my while implementing your solution.
  - Word API does not give runs of a paragraph. You may want to use `.getOoxml()` method to get `text/xml` representation of document/paragraph to parse them by yourself.
- Implement a text field where users can enter a keyword and search it in the rendered document.
- When a search is initiated,
  - scroll to the paragraph that contains search keyword.
  - highlight search keyword in paragraphs.

## How to run the project?

You'll need to have Microsoft Word to run this project. If you have it on your PC, you can run project using `npm start`.
If you don't, you can create a free account on Microsoft Office 365 and use `npm run start:web` to run it.
In this case, you need to fill `config.document` in `package.json`. For other methods see [Sideload Office Add-ins in Office on the web for testing](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing).

If you need help, do not hesiate to contact us.

## Criteria

- We are interested to see you an write readable, maintainable code.
- Think this project as a part of a large-scale application while deciding on architectural structure.
- We expect you to use state-of-the-art development techniques.
- We are interested in any performance insights you have. Many of our users use embedded Internet Explorer 11 on relatively low resource Windows VMs, so we care about high performance code.
- We will test your project on Chrome using 6x CPU slowdown.
- Don't forget to write tests for your code.
- Word closes add-on if it becomes unresponsive for 10 seconds. So re-renders shouldn't take too much time.
- We'll also evaluate your design decisions regarding to UX and UI. Feel free to design the app to make it more usable and attractive.

## Useful resources

- [Build your first Word task pane add-in](https://docs.microsoft.com/en-us/office/dev/add-ins/quickstarts/word-quickstart?tabs=yeomangenerator)
- [Word API reference](https://docs.microsoft.com/en-us/javascript/api/word?view=word-js-preview)
- [Sideload Office Add-ins in Office on the web for testing](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing)
- [Design the UI of Office Add-ins](https://docs.microsoft.com/en-us/office/dev/add-ins/design/add-in-design)
