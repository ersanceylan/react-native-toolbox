import React from "react";
import Svg, { G, SvgProps } from "react-native-svg";
import { ProvincePath, provinces } from "./Province";

export type TurkeyMapProps = SvgProps & {
  onProvincePress?: (provinceId: string) => void;
  selectedProvinceId?: string | null;
};

export const TurkeyMap: React.FC<TurkeyMapProps> = ({
  onProvincePress = () => {
    console.log("province pressed");
  },
  selectedProvinceId = null,
  children = null,
  width = 1000,
  height = 422,
  ...svgProps
}) => (
  <Svg width={width} height={height} viewBox={`0 0 1000 422`} {...svgProps}>
    <G>
      {provinces.map((province) => (
        <ProvincePath
          key={province.id}
          id={province.id}
          d={province.d}
          selected={selectedProvinceId === province.id}
          onClick={() => onProvincePress(province.id)}
        />
      ))}
    </G>
    {children}
  </Svg>
);
