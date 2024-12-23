import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { styles } from "../../../styles/screens/studentView";
import CustomInput from "../../components/CustomInput";
import CategorySelectList from "../../components/CategorySelectList";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { getDocuments } from "../../Function/AppwriteCollection";
import Loader from "../../components/Loader";
import { useIsFocused } from '@react-navigation/native';

const CustomTable = () => {
  const isFocused = useIsFocused();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 10;
  const tableHeaders = [
    "UAN",
    "Rank No",
    "Name",
    "Mother`s Name",
    "Father`s Name",
    "Gender",
    "DOB",
    "Category",
    "Session",
    "Password",
    "College Name"
  ];

  // Log allStudents to check its structure
  // console.log(allStudents);

  // Check if allStudents has valid data and map it correctly
  const tableData = allStudents.length > 0 ? allStudents.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt)).map(student => [
    student.stuUAN || "",
    student.stuRankNo || "",
    student.stuName || "",
    student.stuMotherName || "",
    student.stuFatherName || "",
    student.stuGender || "",
    student.stuDOB || "",
    student.stuCategory || "",
    student.stuSession || "",
    student.stuPassword || "",
    student.stuCollegeName || "",
  ]) : [];

  // Filter the data based on search, category, and college
  const filteredData = tableData.filter((row) => {
    const matchesSearch = row[0].toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === "All" || row[7] === selectedCategory;
    const matchesCollege = selectedCollege === "All" || row[10] === selectedCollege;
    return matchesSearch && matchesCategory && matchesCollege;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginate = (page) => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  };

  const handleViewDetails = (uanNo) => {
    Alert.alert("Student Details", `Details for UAN No: ${uanNo}`);
  };

  const categories = [
    { key: "All", value: "All" },
    { key: "General", value: "GEN" },
    { key: "OBC", value: "OBC" },
    { key: "SC", value: "SC" },
    { key: "ST", value: "ST" },
    { key: 'EBC', value: 'EBC' },
  ];



  const colleges = [
    { key: "All", value: "All" },
    { key: 'DC Dagarua', value: 'DC Dagarua' },
    { key: 'DC Mothopare', value: 'DC Mothopare' },
    { key: 'SRP School', value: 'SRP School' },
    { key: 'SRP Teachers Training College', value: 'SRP Teachers Training College' },
];

  const defaultData = { key: "All", value: "All" };

  const exportToExcel = async () => {
    const ws = XLSX.utils.aoa_to_sheet([tableHeaders, ...filteredData]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Students");

    const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
    const uri = FileSystem.cacheDirectory + "Students.xlsx";

    await FileSystem.writeAsStringAsync(uri, wbout, {
      encoding: FileSystem.EncodingType.Base64,
    });

    await Sharing.shareAsync(uri);
  };

  useEffect(() => {
    const handelAllGetStudent = async () => {
      setLoading(true);
      try {
        const getAllStudent = await getDocuments("67644c3d002c8007fd51");
        setAllStudents(getAllStudent);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    handelAllGetStudent();
  }, [isFocused]);
  // console.log("tableData",allStudents)
  return loading ? (
    <Loader />
  ) : (
    <>
      <ScrollView style={{ marginBottom: 50 }}>
        <View style={styles.container}>
          <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <CustomButton
                children={"Add Enrollment Students"}
                buttonStyle={styles.buttonStyle}
                buttonStyleText={styles.buttonStyleText}
                onClick={() => router.push("/screens/Admin/AddStudent")}
              />
            </View>
          </View>

          <View>
            <CustomInput
              title="Search By Student UAN No."
              required={false}
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
              placeholder="Enter UAN No."
              labelsStyle={styles.labelsStyle}
              inputStyle={styles.inputStyle}
              keyboardType={"default"}
              badgeStyles={styles.badge}
            />
          </View>
          <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>Filter Data:</Text>
            <TouchableOpacity style={styles.exportButton} onPress={exportToExcel}>
              <Text style={styles.exportButtonText}>Export to Excel</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterContainer}>
            <View style={styles.filterContainerFirstView}>
            <CategorySelectList
              label="Filter Category Name"
              data={categories}
              selectedValue={selectedCategory}
              onSelect={(val) => setSelectedCategory(val)}
              search={false}
              required={false}
              defaultOption={defaultData}
            />
            </View>
            <View style={{width:'50%',marginTop:20}}>
            <CategorySelectList
              label="Select College Name"
              data={colleges}
              selectedValue={selectedCollege}
              onSelect={(val) => setSelectedCollege(val)}
              search={false}
              required={false}
              defaultOption={defaultData}
            />
            </View>
         
        
          </View>

          <ScrollView horizontal>
            <View>
              <View style={styles.headerRow}>
                {tableHeaders.map((header, index) => (
                  <Text key={index} style={styles.headerCell}>
                    {header}
                  </Text>
                ))}
              </View>

              {/* Display Data Rows */}
              {paginate(currentPage).map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={[
                    styles.row,
                    rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow,
                  ]}
                >
                  {row.map((cell, cellIndex) => (
                    <Text key={cellIndex} style={styles.cell}>
                      {cell}
                    </Text>
                  ))}
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={()=>
                      router.push({
                        pathname: '/screens/Admin/StudentDetails',
                        params: { uan: row[0] }, // Pass JSON data as a string
                      })
                    }
                    // onPress={()=>router.push(`/screens/Admin/StudentDetails`)}
                    // onPress={() => handleViewDetails(row[0])}
                  >
                    <Text style={styles.actionButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.pagination}>
        <View style={styles.bottomButton}>
          <TouchableOpacity
            style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
            onPress={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Text style={styles.pageButtonText}>Previous</Text>
          </TouchableOpacity>
          <Text style={styles.pageText}>
            Page {currentPage} of {totalPages}
          </Text>
          <TouchableOpacity
            style={[
              styles.pageButton,
              currentPage === totalPages && styles.disabledButton,
            ]}
            onPress={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            <Text style={styles.pageButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CustomTable;
