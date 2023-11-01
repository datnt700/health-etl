import { useEffect, React } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
export const useFile = () => {
  // useEffect(() => {
  //   // Đường dẫn đến tệp CSV (điều này cần phải được điều chỉnh cho đúng đường dẫn của bạn)
  //   const csvFilePath = dataCSV;

  //   // Sử dụng PapaParse để đọc tệp CSV
  //   Papa.parse(csvFilePath, {
  //     header: true, // Đảm bảo tệp CSV có hàng tiêu đề
  //     dynamicTyping: true, // Tự động xác định kiểu dữ liệu
  //     skipEmptyLines: true, // Bỏ qua các dòng trống
  //     complete: (result) => {
  //       const data = result.data;
  //       console.log(data); // Dữ liệu từ tệp CSV
  //     },
  //   });
  // }, []);
  const getFileData = async () => {
    const fileData = [];
    const data = await axios.get('http://localhost:3001/file');
    data.data.split('\n').forEach((line) => {
      const checkLine = line.split(' ');
      if (checkLine.length === 4) {
        fileData.push({
          dateID: checkLine[0],
          prodID: checkLine[1],
          catID: checkLine[2],
          fabID: checkLine[3],
        });
      }

      if (checkLine.length === 5) {
        fileData.push({
          dateID: checkLine[0],
          prodID: checkLine[1],
          catID: checkLine[2],
          fabID: checkLine[3],
          magID: checkLine[4],
        });
      }
    });
    return fileData;
  };
  return {
    getFileData,
  };
};
