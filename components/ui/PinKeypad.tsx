import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 24 }}>
        {new Array(length).fill(0).map((_, i) => (
          <View
            key={i}
            style={{
              width: 56,
              height: 56,
              marginHorizontal: 8,
              borderRadius: 16,
              backgroundColor: i < code.length ? '#E7FFF6' : '#F4F4F4',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 28 }}>{i < code.length ? '•' : ''}</Text>
          </View>
        ))}
      </View>

      {[['1','2','3'],['4','5','6'],['7','8','9'],['','0','<']].map((row, i) => (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 12 }}>
          {row.map((k) => (
            <TouchableOpacity
              key={k}
              onPress={() => (k === '<' ? pop() : k ? push(k) : undefined)}
              style={{ width: 72, height: 56, borderRadius: 16, backgroundColor: '#F4F4F4', alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ fontSize: 18 }}>{k}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}


