import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import React, { useRef } from 'react';

const DataTableList = (
    {
        header,
        filters,
        dataToEdit,
        setDataToEdit,
        dataList,
        columns,
        footer,
    }) => {
    const dt = useRef(null);

    const dynamicColumns = columns.map(col => {
        return <Column key="{col.id}" value={col.field} sortable={col.sortable} field={col.field} header={col.header} filter={col.filter} style={{ minWidth: '10rem' }} />;
    });

    return (
        <>
            <div className="card">
                <Toolbar className="mb-4"></Toolbar>
                <DataTable
                    ref={dt}
                    key={header}
                    value={dataList}
                    size="small"
                    align="center"
                    showGridlines
                    responsiveLayout="scroll"
                    filterDisplay="menu"
                    rows={10}
                    paginator
                    filters={filters}
                    dataKey="id"
                    selectionMode="single"
                    onSelectionChange={e => setDataToEdit(e.value)}
                    selection={dataToEdit}
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} dataList"
                    footerColumnGroup={footer}
                >
                    {dynamicColumns}
                </DataTable>
            </div>
        </>
    )
}

export default DataTableList;