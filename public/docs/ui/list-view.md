The `ListView` component is a versatile and customizable list display component designed for React applications. It supports features such as sorting, pagination, search filtering, and custom rendering of list items. This documentation provides a comprehensive guide to implementing and utilizing the `ListView` component within your projects.

## Features

- **Dynamic Sorting**: Allows sorting of list items based on specified property and direction (ascending or descending).
- **Pagination**: Supports dividing list items into manageable pages with customizable items per page.
- **Search Filtering**: Offers a search functionality to filter items based on string properties.
- **Custom Rendering**: Enables custom rendering of list headers and items, providing flexibility in how data is presented.
- **Responsive Design**: Designed to be responsive, ensuring compatibility with various devices and screen sizes.

## Installation

To use the `ListView` component, ensure you have `react` and `lucide-react` installed in your project as it utilizes icons from `lucide-react` for sorting indicators and navigation controls.

```bash
npm install react lucide-react
```

## Usage

Below is a basic setup to integrate the `ListView` component into your React application. This example demonstrates how to display a list of items with sorting and pagination capabilities.

### Step 1: Import the Component

First, import the `ListView` component and any necessary icons from `lucide-react`.

```javascript
import React from 'react';
import { ChevronLeftSquare, ChevronRightSquare, ChevronUpIcon, ChevronDownIcon, ChevronsUpDown, Search } from "lucide-react";
import ListView from './ListView'; // Adjust the import path according to your file structure
```

### Step 2: Define Your Data

Create an array of items that you want to display in the list. Each item should be an object with properties corresponding to the data you wish to render.

```javascript
const items = [
  { id: 1, name: 'Item 1', category: 'Category 1' },
  { id: 2, name: 'Item 2', category: 'Category 2' },
  // Add more items as needed
];
```

### Step 3: Configure List Headers

Define the headers for your list. Each header should specify the key to associate with a property in your items, a label for display, and whether the column is sortable.

```javascript
const headers = [
  { key: 'name', label: 'Name', sortable: true, render: (value) => <div>{value}</div> },
  { key: 'category', label: 'Category', sortable: true, render: (value) => <div>{value}</div> },
  // Define additional headers as needed
];
```

### Step 4: Implement the ListView Component

Incorporate the `ListView` component into your component's return statement, passing in the items, headers, and any additional props such as `itemsPerPage` and `sortOptions`.

```javascript
function App() {
  return (
    <div className="App">
      <ListView
        items={items}
        headers={headers}
        itemsPerPage={10}
        sortOptions={{ property: 'name', direction: 'ascending' }}
        onSelected={(item) => console.log(item)}
      />
    </div>
  );
}
```

## Props

The `ListView` component accepts the following props to customize its behavior:

- `items`: Array of items to be displayed.
- `headers`: Configuration for list headers, including key, label, and whether the column is sortable.
- `itemsPerPage`: Number of items to display per page (default is 10).
- `sortOptions`: Initial sorting configuration specifying the property to sort by and the direction.
- `onSelected`: Callback function that is invoked when an item is clicked.

## Customization

The `ListView` component is designed to be flexible and customizable. You can define custom rendering logic for each header and item, allowing for a wide range of presentation styles. Additionally, you can control the sorting behavior, pagination, and search functionality to suit your application's needs.

## Conclusion

The `ListView` component offers a powerful solution for displaying lists of data with advanced features like sorting, pagination, and search filtering. By following the steps outlined in this documentation, you can easily integrate and customize the `ListView` component in your React applications.