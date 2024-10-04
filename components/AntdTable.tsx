import { ConfigProvider, Table, TableProps } from 'antd';
import React from 'react';

interface AntdTableProps<RecordType> {
  rowKey: string | ((record: RecordType) => string);
  onclickRow: (record: RecordType) => void;
  onChangeRowSelect: (selectedRowKeys: React.Key[], selectedRows: RecordType[]) => void;
  loading: boolean;
  size: TableProps<RecordType>['size'];
  tableLayout: TableProps<RecordType>['tableLayout'];
  dataSource: RecordType[];
  columns: TableProps<RecordType>['columns'];
}

export default function AntdTable<RecordType extends object>({
  rowKey,
  onclickRow,
  onChangeRowSelect,
  loading,
  size,
  tableLayout,
  dataSource,
  columns
}: AntdTableProps<RecordType>) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#173B45',
        },
      }}
    >
      <Table
        rowKey={rowKey}
        onRow={(record) => {
          return {
            onClick: () => onclickRow(record)
          }
        }}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRow) => onChangeRowSelect(selectedRowKeys, selectedRow),
        }}
        scroll={{
          x: 1300,
          y: 480,
        }}
        loading={loading}
        size={size}
        tableLayout={tableLayout}
        dataSource={dataSource}
        columns={columns}
        rowClassName={() => 'editable-row'}
      />
    </ConfigProvider>
  )
}
