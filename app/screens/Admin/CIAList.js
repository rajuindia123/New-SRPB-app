import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,

  TextInput,
  Alert,
} from "react-native";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { styles } from "../../../styles/screens/AdmissionList";
import CustomInput from "../../components/CustomInput";
import CategorySelectList from "../../components/CategorySelectList";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
const CIAList = () => {
    const [currentPage, setCurrentPage] = useState(1);
      const [searchText, setSearchText] = useState("");
      const [selectedCategory, setSelectedCategory] = useState("All");
      const [selectedCollege, setSelectedCollege] = useState("All");
      const rowsPerPage = 10;
    
      const tableHeaders = [
        "UAN No.",
        "Reg.No.",
        "Faculty/Course",
        "Payment details",
        "Religion",
        "Email Id",
        "Contact No.",
        "Aadhar No.",
        "Attached Document",
        "Permanent Address",
        "Pin Code",
        "Subject",
        "College",
        "Gender",

        
      ];
    
      const tableData = Array.from({ length: 50 }, (_, index) => [
        (index + 1).toString(),
        `C.No${String(index + 1).padStart(3, "0")}`,
        `Course${index + 1}`,
        `210${index + 1}`,
        `Religion ${index + 1}`,
        `Email Id ${index + 1}`,
        `Contact No 123 ${index + 1}`,
        `Aadhar No 123 ${index + 1}`,
        `Attached Document${index + 1}`,
        `Address${index + 1}`,
        `Pin${index + 1}`,
        `Subject${index + 1}`,
        ["College A", "College B", "College C"][index % 3],
        ["General", "OBC", "SC", "ST"][index % 4],
    ]);
    
      const filteredData = tableData.filter((row) => {
        const matchesSearch = row[0].toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = selectedCategory === "All" || row[13] === selectedCategory;
        // console.log(matchesCategory)
        const matchesCollege = selectedCollege === "All" || row[12] === selectedCollege;
        return matchesSearch && matchesCategory && matchesCollege;
    });
    
      const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    
      const paginate = (page) => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredData.slice(start, end);
      };
    
      const handleViewDetails = (rollNo) => {
        Alert.alert("Student Details", `Details for Roll No: ${rollNo}`);
      };
    
      const categories = [
        { key: "All", value: "All" },
        { key: "General", value: "General" },
        { key: "OBC", value: "OBC" },
        { key: "SC", value: "SC" },
        { key: "ST", value: "ST" },
      ];
    
      const colleges = [
        { key: "All", value: "All" },
        { key: "College A", value: "College A" },
        { key: "College B", value: "College B" },
        { key: "College C", value: "College C" },
      ];
      const defaultData = { key: "All", value: "All" }
    
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
    
  return (
    <>
    <ScrollView style={{marginBottom:50}}>

    <View style={styles.container}>

    <View style={{justifyContent:'flex-end',flexDirection:'row'}}>
      <View style={{width:'50%'}}>
      
  <CustomButton children={"Add CIA Form"} buttonStyle={styles.buttonStyle} buttonStyleText={styles.buttonStyleText} onClick={()=>router.push('/screens/Admin/AddCIA')} />
</View>
      </View>



      <View>
        <CustomInput
          title="Search By Student UAN No."
          required={false}
          onChangeText={(text) => setSearchText(text)}
          value={searchText}

          placeholder="Enter UAN No."
          labelsStyle={styles.labelsStyle} inputStyle={styles.inputStyle}
          keyboardType={'default'}
          badgeStyles={styles.badge}
        />
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter Data:</Text>
        {/* Export Button */}
        <TouchableOpacity style={styles.exportButton} onPress={exportToExcel}>
          <Text style={styles.exportButtonText}>Export to Excel</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>


        <View >
          <CategorySelectList
            label="Filter Category Name"
            data={categories}
            selectedValue={selectedCategory}
            onSelect={(val) => setSelectedCategory(val)} // Handle selection update
            search={false}
            required={false}
            defaultOption={defaultData}
          />

        </View>
        <View>
          <CategorySelectList
            label="Select College Name"
            data={colleges}
            selectedValue={selectedCollege}
            onSelect={(val) => setSelectedCollege(val)} // Handle selection update
            search={false}
            required={false}
            defaultOption={defaultData}
          />
        </View>

      </View>

      <ScrollView horizontal>
        <View>
          {/* Table Headers */}
          <View style={styles.headerRow}>
            {tableHeaders.map((header, index) => (
              <Text key={index} style={styles.headerCell}>
                {header}
              </Text>
            ))}
          </View>

          {/* Table Rows */}
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
              {/* Action Button */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleViewDetails(row[0])}
              >
                <Text style={styles.actionButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      
    </View>
    </ScrollView>
    {/* Pagination */}
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
  )
}

export default CIAList