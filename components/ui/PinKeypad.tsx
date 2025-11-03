import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { colors, spacing, fonts, radii } from '../../theme/tokens';

type Props = {
  length?: number;
  onChange?: (code: string) => void;
};

export default function PinKeypad({ length = 4, onChange }: Props) {
  const [code, setCode] = React.useState('');
  const push = (d: string) => {
    const next = (code + d).slice(0, length);
    setCode(next);
    onChange?.(next);
  };
  const pop = () => {
    const next = code.slice(0, -1);
    setCode(next);
    onChange?.(next);
  };
  return (
    <View>
      {/* Display boxes */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: spacing.xl }}>
        {new Array(length).fill(0).map((_, i) => (
          <View
            key={i}
            style={{
              width: 64,
              height: 64,
              marginHorizontal: spacing.sm,
              borderRadius: radii.lg,
              backgroundColor: i < code.length ? colors.brandTint : '#F5F5F5',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 36, fontFamily: fonts.bold, color: colors.text }}>{i < code.length ? '*' : ''}</Text>
          </View>
        ))}
      </View>

      {/* Keypad */}
      {[['1','2','3'],['4','5','6'],['7','8','9'],['','0','<']].map((row, i) => (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: spacing.md }}>
          {row.map((k) => (
            <TouchableOpacity
              key={k}
              onPress={() => (k === '<' ? pop() : k ? push(k) : undefined)}
              style={{ width: 72, height: 64, borderRadius: radii.lg, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ fontSize: 18 }}>{k}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}


