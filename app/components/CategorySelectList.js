import React from 'react';
import { View, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { styles } from '../../styles/components/CustomDropdown';
// Create a new reusable component with a label
const CategorySelectList = ({ label, data, selectedValue, onSelect, search, required,defaultOption }) => {
    return (
        <View style={{ marginBottom: 10 }}>
            {/* Render the label */}
            {label &&
                required ? <Text style={styles.label}>
                {label}. <Text style={styles.badge}>*</Text> </Text> : <Text style={styles.label}>
                {label}</Text>

            }

            {/* Render the SelectList dropdown */}
            <SelectList
                setSelected={(val) => onSelect(val)} // Pass selected value to parent via callback
                data={data}
                save="value"
                defaultOption={{ value: selectedValue }} // Set default selected value
                search={search}
                // defaultOption={defaultOption}
                // defaultOption={defaultOption}
            />
        </View>
    );
};
export default CategorySelectList
