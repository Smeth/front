import { PlusIcon } from "@icons/MyTVIcons"
import Popup from "reactjs-popup"
import Tooltip from "./Tooltip"

import * as XLSX from 'xlsx'
// import * as FileSaver from "file-saver"

const ExcelExport = ({ dataToExport, fileName, label }: { dataToExport: any, fileName: string, label: string }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToExcel = async () => {
        // const ws = XLSX.utils.json_to_sheet(dataToExport)
        // const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
        // const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        // const data = new Blob([excelBuffer], { type: fileType })
        // FileSaver.saveAs(data, fileName + fileExtension)

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'test');

        XLSX.writeFile(wb, fileName + fileExtension);
    }
    return (
        <Popup
            trigger={open => (
                <button onClick={() => exportToExcel()} className="flex items-center space-x-2 bg-tertiary-800 py-1.5 px-2 rounded">
                    <PlusIcon classes="h-3.5 text-white" />
                    <span className="text-white text-sm font-semibold">{label}</span>
                </button>
            )}
            position="top center"
            on={['hover', 'focus']}
        >
            <Tooltip title={label} />
        </Popup>
    )
}

export default ExcelExport