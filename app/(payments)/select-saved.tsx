import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Button from '../../components/ui/Button';
import { router } from 'expo-router';
import { spacing, fonts, colors, radii } from '../../theme/tokens';

export default function SelectSaved() {
  const [selected, setSelected] = React.useState<number>(0);
  const items = [
    { name: 'Debbie C. Annie', last4: '1234', recent: true },
    { name: 'Debbie C. Annie', last4: '1234', recent: false },
    { name: 'Debbie C. Annie', last4: '1234', recent: false },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 24, paddingTop: 64 }}>
      <Text style={{ fontSize: 28, fontFamily: fonts.bold, marginBottom: spacing.md }}>Select payment type</Text>
      {items.map((x, i) => (
        <TouchableOpacity key={i} onPress={() => setSelected(i)} style={{ paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>{x.name}</Text>
            <Text style={{ fontFamily: fonts.regular, color: colors.subtext }}>**** **** **** {x.last4} {x.recent ? '  Recently used' : ''}</Text>
          </View>
          <Text style={{ fontFamily: fonts.regular, color: colors.text }}>{selected === i ? '✔' : '○'}</Text>
        </TouchableOpacity>
      ))}

      <View style={{ marginVertical: spacing.md }} />
      <TouchableOpacity onPress={() => router.push('/(payments)/add-card')} style={{ paddingVertical: spacing.md, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center' }}>
        <Text style={{ fontFamily: fonts.regular, color: colors.text }}>+ Add New Card</Text>
      </TouchableOpacity>

      <View style={{ height: 24 }} />
      <Button title="Next" onPress={() => router.push('/(payments)/success')} />
    </View>
  );
}


