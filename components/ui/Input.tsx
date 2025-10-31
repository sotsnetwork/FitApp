import React from 'react';
import { TextInput, View, Text, ViewStyle, TextStyle, TextInputProps, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, spacing, fonts } from '../../theme/tokens';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  leftIcon?: string;
  showClearIcon?: boolean;
};

export default function Input({ label, error, containerStyle, labelStyle, style, leftIcon, showClearIcon, value, onChangeText, ...rest }: Props) {
  const hasError = Boolean(error);
  const hasValue = Boolean(value);
  return (
    <View style={{ marginBottom: 12, ...(containerStyle as object) }}>
      {label ? <Text style={{ marginBottom: 6, fontFamily: fonts.semibold, ...(labelStyle as object) }}>{label}</Text> : null}
      <View style={{ position: 'relative' }}>
        {leftIcon ? (
          <View style={{ position: 'absolute', left: spacing.md, top: 0, bottom: 0, justifyContent: 'center', zIndex: 1 }}>
            <Ionicons name={leftIcon as any} size={20} color={colors.subtext} />
          </View>
        ) : null}
        <TextInput
          {...rest}
          value={value}
          onChangeText={onChangeText}
          style={{
            borderWidth: 1,
            borderColor: hasError ? colors.errorBorder : colors.border,
            backgroundColor: hasError ? colors.errorBg : 'white',
            borderRadius: radii.md,
            padding: spacing.md,
            paddingLeft: leftIcon ? spacing.xl + spacing.sm : spacing.md,
            paddingRight: showClearIcon && hasValue ? spacing.xl + spacing.sm : spacing.md,
            fontFamily: fonts.regular,
            ...(style as object),
          }}
        />
        {showClearIcon && hasValue && onChangeText ? (
          <TouchableOpacity onPress={() => onChangeText('')} style={{ position: 'absolute', right: spacing.md, top: 0, bottom: 0, justifyContent: 'center', zIndex: 1 }}>
            <Ionicons name="close" size={20} color={colors.subtext} />
          </TouchableOpacity>
        ) : null}
      </View>
      {hasError ? <Text style={{ color: '#C30000', marginTop: 6, fontFamily: fonts.regular }}>{error}</Text> : null}
    </View>
  );
}


