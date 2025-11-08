import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function CreatePost() {
  const params = useLocalSearchParams();
  const postType = (params.type as string) || 'text'; // 'text', 'picture', or 'video'
  const [postText, setPostText] = React.useState('');
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);
  const [selectedVideos, setSelectedVideos] = React.useState<string[]>([]);

  // Request permissions for image/video picker
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to upload images and videos!');
        }
      }
    })();
  }, []);

  // Auto-pick media based on post type
  React.useEffect(() => {
    if (postType === 'picture') {
      pickImageOnMount();
    } else if (postType === 'video') {
      pickVideoOnMount();
    }
  }, [postType]);

  const pickImageOnMount = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map(asset => asset.uri);
        setSelectedImages(newImages);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const pickVideoOnMount = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedVideos([result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map(asset => asset.uri);
        setSelectedImages([...selectedImages, ...newImages]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const pickVideo = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedVideos([...selectedVideos, result.assets[0].uri]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick video');
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setSelectedVideos(selectedVideos.filter((_, i) => i !== index));
  };

  const handlePost = () => {
    if (!postText.trim() && selectedImages.length === 0 && selectedVideos.length === 0) {
      Alert.alert('Error', 'Please add some content to your post');
      return;
    }
    // TODO: Upload post to server
    Alert.alert('Success', 'Post created successfully!', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontFamily: fonts.bold }}>Create Post</Text>
          <TouchableOpacity onPress={handlePost} disabled={!postText.trim() && selectedImages.length === 0 && selectedVideos.length === 0}>
            <Text style={{ fontSize: 16, fontFamily: fonts.semibold, color: (!postText.trim() && selectedImages.length === 0 && selectedVideos.length === 0) ? colors.subtext : colors.brand }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{ padding: spacing.lg }}>
            {/* Text Input */}
            <TextInput
              placeholder="What's on your mind?"
              placeholderTextColor={colors.subtext}
              value={postText}
              onChangeText={setPostText}
              multiline
              style={{
                fontSize: 16,
                fontFamily: fonts.regular,
                color: colors.text,
                minHeight: 150,
                textAlignVertical: 'top',
              }}
            />

            {/* Selected Images */}
            {selectedImages.length > 0 && (
              <View style={{ marginTop: spacing.md }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {selectedImages.map((uri, index) => (
                    <View key={index} style={{ marginRight: spacing.sm, position: 'relative' }}>
                      <Image source={{ uri }} style={{ width: 150, height: 150, borderRadius: 12 }} />
                      <TouchableOpacity
                        onPress={() => removeImage(index)}
                        style={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          borderRadius: 12,
                          width: 24,
                          height: 24,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Ionicons name="close" size={16} color="white" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Selected Videos */}
            {selectedVideos.length > 0 && (
              <View style={{ marginTop: spacing.md }}>
                {selectedVideos.map((uri, index) => (
                  <View key={index} style={{ marginBottom: spacing.sm, position: 'relative' }}>
                    <View style={{ width: '100%', height: 200, backgroundColor: colors.border, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons name="videocam" size={48} color={colors.subtext} />
                      <Text style={{ marginTop: spacing.sm, fontFamily: fonts.regular, color: colors.subtext }}>Video Selected</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeVideo(index)}
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: 12,
                        width: 24,
                        height: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Media Options */}
            <View style={{ flexDirection: 'row', marginTop: spacing.lg, gap: spacing.md }}>
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: spacing.md,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="image-outline" size={20} color={colors.text} style={{ marginRight: spacing.xs }} />
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>Add Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={pickVideo}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: spacing.md,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  flex: 1,
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="videocam-outline" size={20} color={colors.text} style={{ marginRight: spacing.xs }} />
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.text }}>Add Video</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

