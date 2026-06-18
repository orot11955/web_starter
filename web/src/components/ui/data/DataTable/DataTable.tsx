import type { ReactNode } from 'react';
import type { DataTableColumn } from '@/types/table';

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => React.Key;
  emptyText?: ReactNode;
  onRowClick?: (row: T) => void;
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyText = 'No data',
  onRowClick,
}: DataTableProps<T>) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} style={{ width: column.width, textAlign: column.align }}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length ? (
          rows.map((row, index) => (
            <tr key={rowKey(row)} onClick={() => onRowClick?.(row)}>
              {columns.map((column) => (
                <td key={column.key} style={{ textAlign: column.align }}>
                  {column.render ? column.render(row, index) : String(row[column.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>{emptyText}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
