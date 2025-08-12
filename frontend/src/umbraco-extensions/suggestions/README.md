# Suggestions Property Editor

This is a custom property editor for Umbraco that provides text suggestions to content editors.

## Features

- **Text Input**: Standard text input field for content entry
- **Random Suggestions**: Click "Give me suggestions!" to get a random suggestion from a predefined list
- **Text Trimming**: Click "Trim text" to remove leading and trailing whitespace
- **Real-time Updates**: Values are automatically synced when changed

## Built-in Suggestions

The property editor comes with these default suggestions:
- "You should take a break"
- "I suggest that you visit the Eiffel Tower"
- "How about starting a book club today or this week?"
- "Are you hungry?"

## Installation

The property editor has been automatically deployed to `App_Plugins/suggestions/` in your Umbraco installation.

## Usage

1. **Create a Data Type**:
   - Go to Settings → Data Types in the Umbraco backoffice
   - Create a new Data Type
   - Select "Suggestions" as the Property Editor
   - Save the Data Type

2. **Add to Document Type**:
   - Go to Settings → Document Types
   - Edit your desired Document Type
   - Add a new property
   - Select your Suggestions Data Type
   - Save the Document Type

3. **Use in Content**:
   - Create or edit content using the Document Type
   - Use the suggestions property to:
     - Type text directly in the input field
     - Click "Give me suggestions!" for random suggestions
     - Click "Trim text" to clean up whitespace

## Technical Details

- **Framework**: Built with Lit and TypeScript
- **Property Editor Schema**: Uses `Umbraco.Plain.String` for string values
- **Bundle**: ES module format
- **Styling**: Uses Umbraco UI Library components with custom CSS
- **Events**: Uses standard CustomEvent for value changes
- **TypeScript**: Configured with `moduleResolution: "nodenext"` for compatibility

## Development

To rebuild this property editor:

```bash
cd frontend/src/umbraco-extensions/suggestions
npm run build
node "../../../scripts/copy-to-umbraco.js" suggestions
```

## Files Structure

```
suggestions/
├── src/
│   └── suggestions-property-editor-ui.element.ts  # Main component
├── dist/
│   ├── suggestions.js                             # Built output
│   └── suggestions.js.map                         # Source map
├── package.json                                   # Dependencies
├── tsconfig.json                                  # TypeScript config
├── vite.config.js                                 # Build config
└── umbraco-package.json                           # Umbraco manifest
```

The property editor is now ready to use in your Umbraco backoffice!
