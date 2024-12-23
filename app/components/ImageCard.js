import { styles } from "../../styles/components/ImageCard";
import { View, Text, Image, TouchableOpacity } from "react-native";

const ImageCard = ({ title,onPress,  description, imageSource }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Left side: Image */}
      <Image source={imageSource} style={styles.image} />
      
      {/* Right side: Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ImageCard