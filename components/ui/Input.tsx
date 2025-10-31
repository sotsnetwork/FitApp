import React from 'react';
import { TextInput, View, Text, ViewStyle, TextStyle, TextInputProps } from 'react-native';
import { colors, radii, spacing, fonts } from '../../theme/tokens';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
};

export default function Input({ label, error, containerStyle, labelStyle, style, ...rest }: Props) {
  const hasError = Boolean(error);
  return (
    <View style={{ marginBottom: 12, ...(containerStyle as object) }}>
      {label ? <Text style={{ marginBottom: 6, fontFamily: fonts.semibold, ...(labelStyle as object) }}>{label}</Text> : null}
      <TextInput
        {...rest}
        style={{
          borderWidth: 1,
          borderColor: hasError ? colors.errorBorder : colors.border,
          backgroundColor: hasError ? colors.errorBg : 'white',
          borderRadius: radii.md,
          padding: spacing.md,
          fontFamily: fonts.regular,
          ...(style as object),
        }}
      />
      {hasError ? <Text style={{ color: '#C30000', marginTop: 6, fontFamily: fonts.regular }}>{error}</Text> : null}
    </View>
  );
}


