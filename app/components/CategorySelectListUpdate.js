import React from 'react';
import { View, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { styles } from '../../styles/components/CustomDropdown';

const CategorySelectListUpdate = ({
  label,
  data,
  selectedValue, // Pre-filled value from data
  onSelect,      // Callback to update the selected value
  search = false, // Search functionality toggle
  required = false, // Whether the field is required
}) => {
  // Find the option in data that matches the selected value
  const selectedOption = data.find((item) => item.value === selectedValue);

  return (
    <View>
      {/* Render the label with a required badge if needed */}
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.badge}>*</Text>}
        </Text>
      )}

      {/* Render the SelectList dropdown */}
      <SelectList
        setSelected={(val) => {
          // val will contain the key, so find the corresponding value
          const selectedItem = data.find(item => item.key === val);
          // Update Formik with the corresponding value (not key)
          onSelect(selectedItem ? selectedItem.value : val);
        }}          // Pass the selected value to Formik
        data={data}   // List of options (key-value pairs)
        save="key"  // Save the 'key' (this is the key to be selected)
        defaultOption={selectedOption ? { key: selectedOption.key, value: selectedOption.value } : undefined}  // Set the default option based on selectedValue
        search={search} // Enable/disable search functionality
        boxStyles={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}
        dropdownStyles={{ borderWidth: 1, borderColor: '#ccc' }}
      />
    </View>
  );
};

export default CategorySelectListUpdate;
