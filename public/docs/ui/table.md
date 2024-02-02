# Table Component with Pagination and Empty State Documentation

This comprehensive documentation covers the usage and customization of a dynamic React Table component, which includes features such as pagination, a customizable empty state, sorting, and conditional rendering based on view mode (table or gallery). The component leverages `lucide-react` icons for visual enhancements and offers a highly interactive and flexible interface for displaying tabular data.

## Features

- **Dynamic Sorting**: Users can sort data by clicking on the sortable column headers.
- **Pagination**: Includes a `TablePagination` subcomponent to navigate through pages of data, with customizable items per page.
- **Empty State**: Utilizes a `TableEmpty` subcomponent to display a friendly message and icon when no data is available.
- **View Mode Toggle**: Supports toggling between table and gallery views, allowing for different data presentation styles.
- **Custom Rendering**: Columns support custom rendering functions, enabling complex data representations.
- **Filtering**: Offers filtering capabilities to display only the items that meet certain conditions.

## Installation

Ensure `react` and `lucide-react` are installed in your project for the icons and React support.

```bash
npm install react lucide-react
```

## Usage

### Step 1: Define Your Data

Prepare your data array, where each item is an object corresponding to a row in the table.

```javascript
const data = [
  { id: 1, name: 'Item 1', category: 'Category 1' },
  { id: 2, name: 'Item 2', category: 'Category 2' },
  // Additional items...
];
```

### Step 2: Configure Columns

Define the columns for your table. Each column can specify if it's sortable, filterable, hidden, and provide a custom rendering function.

```javascript
const columns = [
  { sourceKey: 'name', key: 'nameCol', title: 'Name', sortable: true },
  { sourceKey: 'category', key: 'categoryCol', title: 'Category', sortable: false },
  // Additional columns...
];
```

### Step 3: Implement the Table Component

Integrate the `Table` component into your component's render method or return statement, providing it with the necessary props.

```jsx
<Table
  columns={columns}
  data={data}
  pagination={{
    currentPage: 1,
    totalPages: 5,
    onPageChange: (page) => console.log('Page:', page),
    onItemsPerPageChange: (itemsPerPage) => console.log('Items per page:', itemsPerPage)
  }}
  defaultViewMode="table"
  onViewModeChange={(mode) => console.log('View mode:', mode)}
/>
```

## Components

### TableEmpty

This component displays a message and an icon when the table has no data to show. It requires no props and can be customized directly within its implementation if different messaging or icons are desired.

### TablePagination

Handles the pagination logic, allowing users to navigate between pages of data and select the number of items per page.

#### Props

- `currentPage`: The current active page.
- `totalPages`: The total number of pages available.
- `itemsPerPage`: The current number of items per page.
- `itemsPerPageOptions`: Array of options for items per page.
- `onPageChange`: Function called when the page is changed.
- `onItemsPerPageChange`: (Optional) Function called when the items per page selection is changed.

### TableColumn

Defines the structure and behavior of a table column.

#### Interface

- `sourceKey`: The key from the data array that this column corresponds to.
- `key`: A unique identifier for the column.
- `title`: The display title of the column.
- `sortable`: Whether the column is sortable.
- `filterable`: Whether the column supports filtering.
- `hidden`: If true, the column will not be displayed.
- `render`: (Optional) A function that provides custom rendering for the column's data.

## Conclusion

The Table component provides a rich set of features for displaying and interacting with data in React applications. By supporting sorting, pagination, filtering, and multiple view modes, it offers a comprehensive solution for data presentation. Custom rendering capabilities per column further enhance its flexibility, allowing developers to tailor the component to their specific needs.