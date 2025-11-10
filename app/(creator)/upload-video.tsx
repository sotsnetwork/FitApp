import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { spacing, fonts, colors } from '../../theme/tokens';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const difficultyLevels = ['Beginners', 'Intermediate', 'Advanced', 'Expert'];
const durations = ['1:00 Min', '2:00 Min', '3:00 Min', '4:16 Min', '5:00 Min', '10:00 Min', '15:00 Min', '30:00 Min'];
const userAccessOptions = ['Premium only', 'Free', 'Premium & Free'];
const categories = ['Exercise Plans', 'Workout Videos', 'Tutorials', 'Challenges', 'Tips & Tricks'];

export default function UploadVideo() {
  const [workoutTitle, setWorkoutTitle] = React.useState('Yoga Imperial for Beginners');
  const [videoDescription, setVideoDescription] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Exercise Plans');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('');
  const [selectedDuration, setSelectedDuration] = React.useState('');
  const [selectedUserAccess, setSelectedUserAccess] = React.useState('');
  const [equipmentLink, setEquipmentLink] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const [categoryModalVisible, setCategoryModalVisible] = React.useState(false);
  const [difficultyModalVisible, setDifficultyModalVisible] = React.useState(false);
  const [durationModalVisible, setDurationModalVisible] = React.useState(false);
  const [userAccessModalVisible, setUserAccessModalVisible] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1); // 1 = first screen, 2 = second screen

  // Request permissions for video picker
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload videos!');
        }
      }
    })();
  }, []);

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0].uri);
        Alert.alert('Success', 'Video file selected');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video');
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!workoutTitle.trim()) {
        Alert.alert('Error', 'Please enter a workout title');
        return;
      }
      if (!selectedFile) {
        Alert.alert('Error', 'Please select a video file');
        return;
      }
      setCurrentStep(2);
    }
  };

  const handleUpload = () => {
    if (!selectedDifficulty || !selectedDuration || !selectedUserAccess) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    // TODO: Upload video to server
    Alert.alert('Success', 'Video uploaded successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  if (currentStep === 1) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Upload Video</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={{ padding: spacing.lg }}>
              {/* Workout Title */}
              <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>Workout Title</Text>
              <Input
                value={workoutTitle}
                onChangeText={setWorkoutTitle}
                placeholder="Enter workout title"
                showClearIcon
              />

              {/* Video Description */}
              <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginTop: spacing.md, marginBottom: spacing.sm, color: colors.text }}>Video Description</Text>
              <TextInput
                placeholder="Enter description of video"
                placeholderTextColor={colors.subtext}
                value={videoDescription}
                onChangeText={setVideoDescription}
                multiline
                maxLength={1000}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 16,
                  padding: spacing.md,
                  minHeight: 120,
                  fontFamily: fonts.regular,
                  fontSize: 14,
                  color: colors.text,
                  textAlignVertical: 'top',
                }}
              />
              <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs, textAlign: 'right' }}>
                {videoDescription.length}/1000
              </Text>

              {/* Category */}
              <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginTop: spacing.md, marginBottom: spacing.sm, color: colors.text }}>Category</Text>
              <TouchableOpacity
                onPress={() => setCategoryModalVisible(true)}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 16,
                  padding: spacing.md,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: selectedCategory ? colors.text : colors.subtext }}>
                  {selectedCategory || 'Select Category'}
                </Text>
                <Ionicons name="chevron-down" size={20} color={colors.subtext} />
              </TouchableOpacity>

              {/* Upload Section */}
              <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginTop: spacing.md, marginBottom: spacing.sm, color: colors.text }}>Upload</Text>
              <TouchableOpacity
                onPress={pickVideo}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 16,
                  padding: spacing.md,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.brandTint,
                }}
              >
                <Ionicons name="cloud-upload-outline" size={20} color={colors.brand} style={{ marginRight: spacing.sm }} />
                <Text style={{ fontFamily: fonts.semibold, fontSize: 14, color: colors.brand }}>Browse File</Text>
              </TouchableOpacity>
              {selectedFile && (
                <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.brand, marginTop: spacing.xs }}>
                  ✓ File selected
                </Text>
              )}
              <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.sm }}>
                Only Files with less than 100 MB file size is allowed
              </Text>

              {/* File Type Tags */}
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.md }}>
                {['MOV', 'PDF', 'MP4', 'JPEG'].map((type) => (
                  <View
                    key={type}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: colors.brandTint,
                      paddingHorizontal: spacing.sm,
                      paddingVertical: spacing.xs,
                      borderRadius: 8,
                      gap: spacing.xs,
                    }}
                  >
                    <Text style={{ fontSize: 12, fontFamily: fonts.regular, color: colors.brand }}>{type}</Text>
                    <TouchableOpacity>
                      <Ionicons name="close" size={14} color={colors.brand} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Next Button */}
          <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
            <Button title="Next" onPress={handleNext} />
          </View>

          {/* Category Modal */}
          <Modal visible={categoryModalVisible} transparent animationType="slide" onRequestClose={() => setCategoryModalVisible(false)}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
              <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setCategoryModalVisible(false)} />
              <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl }}>
                <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
                  <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
                </View>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => {
                      setSelectedCategory(category);
                      setCategoryModalVisible(false);
                    }}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: spacing.md,
                      paddingHorizontal: spacing.lg,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border,
                    }}
                  >
                    <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>{category}</Text>
                    {selectedCategory === category && (
                      <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="checkmark" size={16} color="#0F0F0F" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Step 2: Additional Details
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <TouchableOpacity onPress={() => setCurrentStep(1)}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Upload Video</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ padding: spacing.lg }}>
            {/* Difficulty Level */}
            <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>Difficulty Level</Text>
            <TouchableOpacity
              onPress={() => setDifficultyModalVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 16,
                padding: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: spacing.md,
              }}
            >
              <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: selectedDifficulty ? colors.text : colors.subtext }}>
                {selectedDifficulty || 'Select Difficulty Level'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.subtext} />
            </TouchableOpacity>

            {/* Duration */}
            <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>Duration</Text>
            <TouchableOpacity
              onPress={() => setDurationModalVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 16,
                padding: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: spacing.md,
              }}
            >
              <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: selectedDuration ? colors.text : colors.subtext }}>
                {selectedDuration || 'Select Duration'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.subtext} />
            </TouchableOpacity>

            {/* Users Access */}
            <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>Users Access</Text>
            <TouchableOpacity
              onPress={() => setUserAccessModalVisible(true)}
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 16,
                padding: spacing.md,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: spacing.md,
              }}
            >
              <Text style={{ fontFamily: fonts.regular, fontSize: 14, color: selectedUserAccess ? colors.text : colors.subtext }}>
                {selectedUserAccess || 'Select Users Access'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.subtext} />
            </TouchableOpacity>

            {/* Equipment used Link (Optional) */}
            <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.sm, color: colors.text }}>Equipment used Link (Optional)</Text>
            <Input
              value={equipmentLink}
              onChangeText={setEquipmentLink}
              placeholder="Equipment used Link"
              leftIcon="link-outline"
              showClearIcon
            />
            <TouchableOpacity onPress={() => router.push('/(creator)/shop')} style={{ marginTop: spacing.xs }}>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.brand }}>Click to go to store</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Upload Button */}
        <View style={{ padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border }}>
          <Button
            title="Upload"
            onPress={handleUpload}
            disabled={!selectedDifficulty || !selectedDuration || !selectedUserAccess}
          />
        </View>

        {/* Difficulty Modal */}
        <Modal visible={difficultyModalVisible} transparent animationType="slide" onRequestClose={() => setDifficultyModalVisible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setDifficultyModalVisible(false)} />
            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl }}>
              <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
              </View>
              {difficultyLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  onPress={() => {
                    setSelectedDifficulty(level);
                    setDifficultyModalVisible(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: spacing.md,
                    paddingHorizontal: spacing.lg,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>{level}</Text>
                  {selectedDifficulty === level && (
                    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="checkmark" size={16} color="#0F0F0F" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {/* Duration Modal */}
        <Modal visible={durationModalVisible} transparent animationType="slide" onRequestClose={() => setDurationModalVisible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setDurationModalVisible(false)} />
            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl }}>
              <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
              </View>
              {durations.map((duration) => (
                <TouchableOpacity
                  key={duration}
                  onPress={() => {
                    setSelectedDuration(duration);
                    setDurationModalVisible(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: spacing.md,
                    paddingHorizontal: spacing.lg,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>{duration}</Text>
                  {selectedDuration === duration && (
                    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="checkmark" size={16} color="#0F0F0F" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>

        {/* User Access Modal */}
        <Modal visible={userAccessModalVisible} transparent animationType="slide" onRequestClose={() => setUserAccessModalVisible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
            <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setUserAccessModalVisible(false)} />
            <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingBottom: spacing.xl }}>
              <View style={{ alignItems: 'center', paddingTop: spacing.sm, paddingBottom: spacing.md }}>
                <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.border }} />
              </View>
              {userAccessOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setSelectedUserAccess(option);
                    setUserAccessModalVisible(false);
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: spacing.md,
                    paddingHorizontal: spacing.lg,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ fontFamily: fonts.regular, fontSize: 16, color: colors.text }}>{option}</Text>
                  {selectedUserAccess === option && (
                    <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="checkmark" size={16} color="#0F0F0F" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

