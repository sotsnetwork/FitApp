import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadProductShipping() {
  const [rules, setRules] = React.useState('');
  const [selectedFiles, setSelectedFiles] = React.useState<Array<{ name?: string | null }>>([]);

  const openPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['image/*', 'application/pdf'],
        multiple: true,
        copyToCacheDirectory: true,
      });
      if (result.canceled) return;
      const assets = Array.isArray(result.assets) ? result.assets : [];
      setSelectedFiles(assets.map(a => ({ name: a.name })));
    } catch (e) {
      // no-op; keep UX silent
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
          {/* Shipping Rules */}
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>Shipping Rules</Text>
          <View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: spacing.md, marginBottom: spacing.lg }}>
            <TextInput
              value={rules}
              onChangeText={setRules}
              placeholder="Enter Description"
              style={{ height: 120, fontFamily: fonts.regular, textAlignVertical: 'top' }}
              multiline
              maxLength={1000}
            />
          </View>

          {/* Upload */}
          <Text style={{ fontFamily: fonts.semibold, fontSize: 16, marginBottom: spacing.xs }}>Upload</Text>
          <TouchableOpacity
            onPress={openPicker}
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: colors.border,
              borderRadius: 12,
              padding: spacing.lg,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: spacing.xl,
            }}
          >
            <Ionicons name="cloud-upload-outline" size={28} color={colors.subtext} />
            <Text style={{ fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.sm }}>Drag & drop file or <Text style={{ color: colors.text }}>Browse</Text></Text>
            <Text style={{ fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Supported formats: JPEG, PNG & PDF</Text>
            {selectedFiles.length > 0 && (
              <View style={{ marginTop: spacing.md, alignItems: 'center' }}>
                <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>{selectedFiles.length} file(s) selected</Text>
                {selectedFiles.slice(0, 3).map((f, i) => (
                  <Text key={i} style={{ fontFamily: fonts.regular, color: colors.subtext, marginTop: 2 }} numberOfLines={1}>
                    {f.name || 'Unnamed file'}
                  </Text>
                ))}
              </View>
            )}
          </TouchableOpacity>

          {/* Upload Button */}
          <TouchableOpacity
            onPress={() => router.replace('/(vendor)/shop')}
            style={{ backgroundColor: colors.brand, paddingVertical: spacing.md, borderRadius: 12, alignItems: 'center' }}
          >
            <Text style={{ fontFamily: fonts.semibold, color: '#0F0F0F' }}>Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
