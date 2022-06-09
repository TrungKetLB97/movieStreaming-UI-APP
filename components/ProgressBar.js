import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

export default function ProgressBar({
  containerStyle,
  barStyle,
  barPercentage,
}) {
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          marginTop: SIZES.base,
          backgroundColor: COLORS.gray,
          ...barStyle,
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: barPercentage,
          marginTop: SIZES.base,
          backgroundColor: COLORS.primary,
          ...barStyle
        }}
      ></View>
    </View>
  );
}
