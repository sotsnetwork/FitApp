import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, radii, spacing, fonts } from '../../theme/tokens';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'ghost';
};

const BRAND = colors.brand;

export default function Button({ title, onPress, disabled, style, textStyle, variant = 'primary' }: Props) {
  const bg = variant === 'primary' ? BRAND : 'transparent';
  const border = variant === 'primary' ? 'transparent' : '#DADADA';
  const color = variant === 'primary' ? '#0F0F0F' : '#0F0F0F';
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? '#CFEFE6' : bg,
        borderColor: border,
        borderWidth: variant === 'ghost' ? 1 : 0,
        paddingVertical: spacing.md + 2,
        borderRadius: radii.md,
        alignItems: 'center',
        opacity: disabled ? 0.8 : 1,
        ...(style as object),
      }}
    >
      <Text style={{ color, fontSize: 18, fontFamily: fonts.semibold, ...(textStyle as object) }}>{title}</Text>
    </TouchableOpacity>
  );
}


