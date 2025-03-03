import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Grid.css";

const Grid = ({
  data = [],
  columns = [],
  sortable = true,
  filterable = true,
  pagination = true,
  pageSize = 10,
  theme = "light",
  bordered = true,
  striped = true,
  compact = false,
  loading = false,
  emptyMessage = "No data available",
  onRowClick = null,
  cellRenderer = {},
  className = "",
}) => {
  const [gridData, setGridData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [filters, setFilters] = useState({});

  // Apply sorting and filtering when data changes
  useEffect(() => {
    let processedData = [...data];

    // Apply filters
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          processedData = processedData.filter((item) => {
            const cellValue = item[key]?.toString().toLowerCase() || "";
            return cellValue.includes(filters[key].toLowerCase());
          });
        }
      });
    }

    // Apply sorting
    if (sortConfig.key) {
      processedData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setGridData(processedData);
    setCurrentPage(1); // Reset to first page when data changes
  }, [data, sortConfig, filters]);

  // Sort request handler
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter change handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Get current page data
  const getCurrentPageData = () => {
    if (!pagination) return gridData;

    const startIndex = (currentPage - 1) * pageSize;
    return gridData.slice(startIndex, startIndex + pageSize);
  };

  // Page change handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(gridData.length / pageSize);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // Get class names based on props
  const getGridClassName = () => {
    const classes = ["custom-grid"];
    classes.push(`theme-${theme}`);
    if (bordered) classes.push("bordered");
    if (striped) classes.push("striped");
    if (compact) classes.push("compact");
    if (className) classes.push(className);
    return classes.join(" ");
  };

  // Render table header with sort and filter controls
  const renderHeader = () => {
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className={column.width ? `width-${column.width}` : ""}
              onClick={() =>
                sortable && column.sortable !== false && requestSort(column.key)
              }
            >
              <div className="th-content">
                <span className="th-title">
                  {column.title || column.key}
                  {sortable && column.sortable !== false && (
                    <span className="sort-indicator">
                      {sortConfig.key === column.key
                        ? sortConfig.direction === "asc"
                          ? " ▲"
                          : " ▼"
                        : " ⇅"}
                    </span>
                  )}
                </span>
              </div>
              {filterable && column.filterable !== false && (
                <div className="th-filter">
                  <input
                    type="text"
                    placeholder="Filter..."
                    value={filters[column.key] || ""}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleFilterChange(column.key, e.target.value)
                    }
                  />
                </div>
              )}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  // Render table body
  const renderBody = () => {
    const currentData = getCurrentPageData();

    if (loading) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="loading-message">
              Loading data...
            </td>
          </tr>
        </tbody>
      );
    }

    if (currentData.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="empty-message">
              {emptyMessage}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {currentData.map((row, rowIndex) => (
          <tr
            key={row.id || rowIndex}
            onClick={() => onRowClick && onRowClick(row)}
            className={onRowClick ? "clickable" : ""}
          >
            {columns.map((column) => {
              const cellValue = row[column.key];
              const CustomRenderer = cellRenderer[column.key];

              return (
                <td key={`${rowIndex}-${column.key}`}>
                  {CustomRenderer ? (
                    <CustomRenderer value={cellValue} row={row} />
                  ) : column.render ? (
                    column.render(cellValue, row)
                  ) : (
                    cellValue
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    );
  };

  // Render pagination controls
  const renderPagination = () => {
    if (!pagination || totalPages <= 1) return null;

    return (
      <div className="grid-pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>

        <div className="page-numbers">
          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`pagination-number ${
                currentPage === number ? "active" : ""
              }`}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>

        <div className="pagination-info">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  };

  return (
    <div className={getGridClassName()}>
      <table>
        {renderHeader()}
        {renderBody()}
      </table>
      {renderPagination()}
    </div>
  );
};

Grid.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      sortable: PropTypes.bool,
      filterable: PropTypes.bool,
      render: PropTypes.func,
    })
  ),
  sortable: PropTypes.bool,
  filterable: PropTypes.bool,
  pagination: PropTypes.bool,
  pageSize: PropTypes.number,
  theme: PropTypes.oneOf(["light", "dark", "custom"]),
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  compact: PropTypes.bool,
  loading: PropTypes.bool,
  emptyMessage: PropTypes.string,
  onRowClick: PropTypes.func,
  cellRenderer: PropTypes.object,
  className: PropTypes.string,
};

export default Grid;
