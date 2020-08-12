import excel from "exceljs";

export default async function createExcelFile(schoolClass, weather, side, results) {
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Measurements");
    worksheet.mergeCells("D1:E1");
    worksheet.mergeCells("D2:E2");
    const arr = ["Class", "Date", "Time", "Weather", "Sensors"];
    for (let i = 0; i < Object.keys(results).length; i++) {
        if (side === "ALL") {
            arr.push(i + 1);
        } else {
            arr.push(`${side}${i + 1}`);
        }
    }
    const firstRow = worksheet.getRow(1);
    for (let k = 0; k < arr.length; k++) {
        if (k < 4) {
            firstRow.getCell(k + 1).value = arr[k];
        } else {
            firstRow.getCell(k + 2).value = arr[k];
        }
    }
    const secondRow = worksheet.getRow(2);
    const date = new Date();
    secondRow.getCell(1).value = schoolClass;
    secondRow.getCell(2).value = date.toDateString();
    secondRow.getCell(3).value = date.toTimeString();
    secondRow.getCell(4).value = weather;
    for (let j = 0; j < Object.keys(results).length; j++) {
        secondRow.getCell(j + 7).value = results[Object.keys(results)[j]];
    }
    await workbook.xlsx.writeFile(`worksheet.xlsx`);
}
