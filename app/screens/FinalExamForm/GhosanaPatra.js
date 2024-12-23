import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '../../../styles/screens/GhosanaPatra'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CustomButton from '../../components/CustomButton';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
const data = [
    "मैं प्रतिज्ञा करता / करती हूँ कि, जब तक कॉलेज में रहूँगा / रहूँगी, कॉलेज अनुशासन, नियमों, उप नियमों एवं समय-समय पर अधिकारियो द्वारा निर्गत आदेश का पूर्ण रूपेण पालन करूंगा / करूँगी",
    "मैं प्रतिज्ञा करता/करती हूँ कि वर्तमान में मैं किसी भी संस्थान महाविद्यालय, विश्वविद्यालय के किसी भी संकाय के किसी भी वर्ष भाग या कक्षा में नियमित रूप से प्रवेशित नहीं हूँ।",
    "मैं प्रतिज्ञा करता/करती हूँ कि, नियमो के अनुरूप कक्षा में नियमित रूप से उपस्थित रहकर विद्याध्ययन करूगा/ करूँगी न्युनतम 75% वर्गोपस्थिति नहीं होने पर नियमानुसार आगामी परीक्षा हेतु मुझे उत्प्रेषित नहीं किये जाने पर कोई आपत्ति नहीं होगी।",
    "मैं इस महाविद्यालय में अपने अध्ययन काल के दौरान महाविद्यालय का अनुशासन तथा अच्छा आचरण बनाए रखने का भी वचन देता हूँ, अन्यथा महाविद्यालय प्राधिकारी मेरे विरूद्ध कोई भी जुर्माना या अनुशासनात्मक कार्रवाई करने के लिए स्वतंत्र होंगे, जैसा वे उचित समझें ।",
    "मुझे पुरी जानकारी है कि कॉलेज परिसर में शराब या किसी भी प्रकार का नशीला पदार्थ और हथियार ले कर जाना मना है। अगर मैं किसी भी उपद्रवी गतिविधि में लिप्त पाया गया तो मैं दंडनीय अपराध के लिए उत्तरदायी होऊँगा।",

];

const GhosanaPatra = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} >
    <View style={styles.container}>
        <View style={styles.topImageView}>
            <View style={styles.logoView}>
                <Image
                    source={require("../../../assets/images/cropped_image.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.textGhosanaPatra}>
                <Text style={styles.textGhosanaPatraText}>घोषणा पत्र</Text>
            </View>
            <View style={styles.logoView}>
                <Image
                    source={require("../../../assets/images/cropped_image.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
        </View>
        <View style={styles.rootContenear}>
            <View style={styles.topTextView}>
                <View style={styles.textStyle}>
                    <Text style={styles.subHeader}>
                        सेवामें,{"\n"}
                        प्रधानाचार्य महोदय {"\n"} सनराइज पूनम वीरेंद्र डिग्री कॉलेज ऑफ एजुकेशन गीता भुबनेश्वर नगर, विश्वासपुर, महथौर, डगरूआ, पूर्णियाँ।
                    </Text>
                </View>
                <View style={styles.rightSide}>
                    <Text style={styles.slTextStyle}>Sl. No:- 120</Text>
                    <Text style={styles.slTextStyle}>Admission Form No:- 100</Text>
                    <Text style={styles.slTextStyle}>Date:- 12/12/2026</Text>
                </View>
            </View>

            <View >
                <Text style={styles.infoText}>मैं <Text style={styles.highlight}>{"Rohan Kumar "}</Text>पिता <Text style={styles.highlight}>{"Shayam Kumar "}</Text> पता  <Text style={styles.highlight}>{"At+PO+PS:-Purnia"}</Text> नामांकन वर्ष <Text style={styles.highlight}>{"2024 "}</Text>  संकाय <Text style={styles.highlight}>{"MBA "}</Text>  प्रमुख विषय <Text style={styles.highlight}>{"MBA "}</Text> की घोषणा करता/करती हु, की मेरे द्वारा दिए गए उपर्युक्त विवरण बिलकुल सही है।</Text>

                <View style={{ marginTop: 20 }}>
                    {data.map((item, index) => (
                        <View style={styles.item} key={index}>
                            <Text style={styles.number}><MaterialCommunityIcons name="hand-pointing-right" size={20} color="#690405" /></Text>
                            <Text style={styles.text}>{item}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.secondBottomHeader}>
                <Text style={styles.textSecondHeader}>आवेदक के माता पिता अभिभावक द्वारा घोषणा</Text>
            </View>

            <Text style={styles.infoText}>मैं <Text style={styles.highlight}>{"Shayam Kumar "}</Text> घोषणा करता / करती हूँ कि मेरा पुत्र/पुत्री आश्रित पाल्य जब तक कॉलेज में रहेगा / रहेगी कॉलेज के अनुशासन एवं शैक्षिक नियमों का पालन करेगा / करेगी तथा नियमितरूप से वर्ग में उपस्थिति दर्ज कराएगा / कराएगी उसके द्वारा कॉलेज-अनुशासन, नियमों को भंग किये जाने या न्यूनतम 75% वर्गोपस्थिति नहीं रहने पर कॉलेज प्रशासन का निर्णय मुझे स्वीकार्य होगा।</Text>
            <Text style={[styles.infoText,{marginTop:5}]}>अभिभावक का आधार न:-<Text style={styles.highlight}>{"123445674567"}</Text></Text>


            <Text style={styles.infoTextsench}>माता, पिता, अभिवावक का पूर्ण हस्ताक्षर</Text>
            <TouchableOpacity style={styles.textUploadView}>
                <Text style={styles.UploadText}>Click and Upolad Image</Text>
                <Feather name="upload" size={18} color="#690405" />
            </TouchableOpacity>

            <Text style={[styles.infoTextsench,{marginTop:30}]}>आवेदक/विद्यार्थी का पूर्ण हस्ताक्षर</Text>
            <TouchableOpacity style={styles.textUploadView}>
                <Text style={styles.UploadText}>Click and Upolad Image</Text>
                <Feather name="upload" size={18} color="#690405" />
            </TouchableOpacity>



        </View>
        <View style={{marginLeft:10,marginTop:30}}>
        <CustomButton
                buttonStyle={styles.buttonStyle}
                buttonStyleText={styles.buttonStyleText}
                children={'Next'}
                onClick={() => router.push("/screens/DCCIA/UploadFile")}
            />
        </View>
      
        
    </View>
</ScrollView>

  )
}

export default GhosanaPatra