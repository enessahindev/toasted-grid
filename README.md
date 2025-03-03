# Customizable React Grid

A highly customizable React grid component with built-in sorting, filtering, and pagination capabilities.

## Features

- ✅ Fully responsive data grid
- ✅ Column sorting (click column headers)
- ✅ Column filtering with text input
- ✅ Pagination with configurable page size
- ✅ Customizable cell renderers
- ✅ Row click events
- ✅ Loading and empty state handling
- ✅ Multiple themes (light/dark/custom)
- ✅ Visual customization (bordered, striped, compact)
- ✅ TypeScript support

## Installation

```bash
npm install toastedui-react-grid
# or
yarn add toastedui-react-grid
```

## Basic Usage

```jsx
import React from 'react';
import { Grid } from 'toastedui-react-grid';
import 'toastedui-react-grid/dist/styles.css'; // Import the styles

const MyComponent = () => {
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', age: 32, email: 'jane@example.com', status: 'Inactive' },
    { id: 3, name: 'Bob Johnson', age: 45, email: 'bob@example.com', status: 'Active' },
  ];

  // Column definitions
  const columns = [
    { key: 'id', title: 'ID', width: 'small' },
    { key: 'name', title: 'Full Name' },
    { key: 'age', title: 'Age', width: 'small' },
    { key: 'email', title: 'Email Address' },
    { key: 'status', title: 'Status', width: 'medium' },
  ];

  return (
    <Grid 
      data={data} 
      columns={columns} 
    />
  );
};

export default MyComponent;
```

## Advanced Usage

### Custom Cell Rendering

```jsx
import React from 'react';
import { Grid } from 'toastedui-react-grid';

const MyAdvancedGrid = () => {
  const data = [
    { id: 1, name: 'John Doe', status: 'Active', progress: 75 },
    { id: 2, name: 'Jane Smith', status: 'Inactive', progress: 30 },
    { id: 3, name: 'Bob Johnson', status: 'Active', progress: 90 },
  ];

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <span 
          style={{ 
            backgroundColor: value === 'Active' ? '#dff0d8' : '#f2dede',
            padding: '3px 8px',
            borderRadius: '4px',
            color: value === 'Active' ? '#3c763d' : '#a94442'
          }}
        >
          {value}
        </span>
      )
    },
    { 
      key: 'progress', 
      title: 'Progress',
      render: (value) => (
        <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '4px' }}>
          <div 
            style={{ 
              width: `${value}%`, 
              backgroundColor: value > 70 ? '#5cb85c' : value > 30 ? '#f0ad4e' : '#d9534f',
              height: '6px',
              borderRadius: '4px'
            }} 
          />
        </div>
      )
    }
  ];

  return (
    <Grid 
      data={data} 
      columns={columns} 
      theme="light"
      bordered={true}
      striped={true}
      onRowClick={(row) => console.log('Row clicked:', row)}
    />
  );
};
```

## API Reference

### Grid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | Array | `[]` | Array of objects to display in the grid |
| `columns` | Array | `[]` | Column configuration (see Column Props) |
| `sortable` | Boolean | `true` | Enable/disable column sorting |
| `filterable` | Boolean | `true` | Enable/disable column filtering |
| `pagination` | Boolean | `true` | Enable/disable pagination |
| `pageSize` | Number | `10` | Number of rows per page |
| `theme` | String | `'light'` | Theme: 'light', 'dark', or 'custom' |
| `bordered` | Boolean | `true` | Show borders around cells |
| `striped` | Boolean | `true` | Show alternating row colors |
| `compact` | Boolean | `false` | Use more compact row height |
| `loading` | Boolean | `false` | Show loading indicator |
| `emptyMessage` | String | `'No data available'` | Message when data is empty |
| `onRowClick` | Function | `null` | Handler for row clicks: `(row) => void` |
| `cellRenderer` | Object | `{}` | Custom cell renderers by column key |
| `className` | String | `''` | Additional CSS class for the grid |

### Column Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `key` | String | Required | Property name in data objects |
| `title` | String | `key` | Display name for column header |
| `width` | String or Number | Auto | Width of column (e.g. 'small', 'medium', 'large', or CSS value) |
| `sortable` | Boolean | `true` | Enable/disable sorting for this column |
| `filterable` | Boolean | `true` | Enable/disable filtering for this column |
| `render` | Function | `null` | Custom cell renderer: `(value, row) => ReactNode` |

## Custom Styling

The grid includes default styling, but you can customize it by overriding CSS classes or providing a `className` prop with your own styles. The component uses a modular CSS approach with classes like:

- `.custom-grid` - Main container
- `.theme-light` / `.theme-dark` - Theme variants
- `.bordered` - For bordered styling
- `.striped` - For striped rows
- `.compact` - For compact sizing

## Browser Support

The component is compatible with modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Internet Explorer 11 (with appropriate polyfills)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License