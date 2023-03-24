import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toolbar } from 'primereact/toolbar';
import React, { useRef,useContext } from 'react';
import { Button } from 'primereact/button';

//import LoginContext from '../../../Context/login';

import jsPDF from "jspdf";
import "jspdf-autotable";

//import {Converter} from 'csv-converter-to-pdf-and-html';
const DataTableList = (
    {
        header,
        filters,
        dataToEdit,
        setDataToEdit,
        dataList,
        columns
    }) => {
        const dt = useRef(null);
        const sesion = JSON.parse(window.localStorage.getItem('text'));
        //const {sesion} = useContext(LoginContext);
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Exportar a CSV" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const dynamicColumns = columns.map(col => {
        return <Column key={col.field} value={col.field} sortable={col.sortable} field={col.field} header={col.header} filter={col.filter} body={col.stockBodyTemplate} />;
    });
    const exportColumns = columns.map((col) => ({
        title: col.header,
        dataKey: col.field,
    }));

    const exportExcel = () => {
        console.log(dt, '----dt------');
        import("xlsx").then((xlsx) => {
            const workSheet = xlsx.utils.json_to_sheet(dataList);
            const workBook = { Sheets: { data: workSheet }, SheetNames: ["data"] };
            const excelBuffer = xlsx.write(workBook, {
                bookType: "xlsx",
                type: "array",
            });
            saveAsExcelFile(excelBuffer, "Reporte");
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import("file-saver").then((FileSaver) => {
            let EXCEL_TYPE =
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            let EXCEL_EXTENSION = ".xlsx";
            const data = new Blob([buffer], {
                type: EXCEL_TYPE,
            });
            FileSaver.saveAs(
                data,
                fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
            );
        });
    };


    /*     const CSVtoPDF = () => {
            const path = require("path");
            const converter = new Converter();
    
            const filePath = path.resolve(exportCSV()) // Caminho completo
            const destinationPath = path.resolve("./HTMLandPDF") // Aqui não precisa especificar a extensão (HTML or PDF)
    
            converter.PDFConverter(filePath, destinationPath)
        }
     */
    const exportPDF = () => {
        const fecha = new Date();

        const doc = new jsPDF("p", "pt");
        doc.autoTable(exportColumns, dataList, {
            startY: doc.autoTable() + 200,

            margin: { horizontal: 50 },
            styles: { overflow: "linebreak" },
            bodyStyles: { valign: "right" },
            columnStyles: { email: { columnWidth: "wrap" } },
            theme: "striped",
            showHead: "everyPage",
            didDrawPage: function (data) {

                // Header
                doc.setFontSize(14);
                doc.setTextColor(20);
                doc.text("Reporte Hacienda Acapulco", data.settings.margin.left, 40);
                doc.text(`Fecha: ${fecha}`, data.settings.margin.left, 60);
                doc.text(`Usuario: ${sesion.usuario}`, data.settings.margin.left, 80);
                // Footer
                var str = "Página " + doc.internal.getNumberOfPages();

                doc.setFontSize(10);

                // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                var pageSize = doc.internal.pageSize;
                var pageHeight = pageSize.height
                    ? pageSize.height
                    : pageSize.getHeight();
                var pageWidth = pageSize.width
                    ? pageSize.width
                    : pageSize.getWidth();
                doc.text(str, data.settings.margin.left, pageHeight - 10, pageWidth + 10);
                
            }
        });
        doc.save("reportesHacienda.pdf");

    };




    return (
        <>
            <>
                <div className="flex align-items-center export-button">
                    <Button
                        type="button"
                        icon="pi pi-file-excel"
                        onClick={exportExcel}
                        className="p-button-success mr-2"
                        data-pr-tooltip="XLS"
                    />
                    <Button
                        type="button"
                        icon="pi pi-file-pdf"
                        onClick={exportPDF}
                        className="p-button-warning mr-2"
                        data-pr-tooltip="PDF"
                    />
                </div>
            </>
            <div className="card">

                <DataTable
                    ref={dt}
                    key={header}
                    value={dataList}
                    header={header}
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
                >
                    {dynamicColumns}
                </DataTable>
                <Toolbar className="mb-4" left={rightToolbarTemplate}></Toolbar>
            </div>
        </>
    )
}

export default DataTableList;