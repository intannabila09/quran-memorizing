import { TouchableOpacity } from "react-native";

const VerseButton = ({
  index,
  top,
  right,
  width,
  height,
  active = false,
  onPress = () => {},
  onLongPress = () => {},
  ayah = "",
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        top: `${top}%`,
        right: `${right}%`,
        width: `${width}%`,
        height: `${height}%`,
        backgroundColor: active ? "rgba(249,205,29,0.3)" : "rgba(0,0,0,0)",
        // backgroundColor:
        //   index % 2 === 0 ? "rgba(255,0,0,0.3)" : "rgba(255,0,0,0.5)",
        position: "absolute",
      }}
      onPress={onPress}
      onLongPress={() => onLongPress(ayah)}
    >
      {/* <Text style={{ position: 'absolute' , bottom: 0}}>Test</Text> */}
    </TouchableOpacity>
  );
};

export default VerseButton;
