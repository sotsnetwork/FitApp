import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { spacing, fonts, colors } from '../theme/tokens';
import { useSavedPosts } from '../contexts/SavedPostsContext';
import { useSavedProducts } from '../contexts/SavedProductsContext';

interface BookmarkOverlayProps {
  visible: boolean;
  onClose: () => void;
  userRole?: 'user' | 'creator' | 'vendor';
}

const screenHeight = Dimensions.get('window').height;

export default function BookmarkOverlay({ visible, onClose, userRole = 'user' }: BookmarkOverlayProps) {
  const { savedPosts, unsavePost } = useSavedPosts();
  const { savedProducts, unsaveProduct } = useSavedProducts();
  const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const getPostDetailRoute = () => {
    switch (userRole) {
      case 'creator':
        return '/(creator)/post-detail';
      case 'vendor':
        return '/(vendor)/post-detail';
      default:
        return '/(user)/post-detail';
    }
  };

  const getProductDetailRoute = () => {
    switch (userRole) {
      case 'creator':
        return '/(creator)/product-detail';
      case 'vendor':
        return '/(vendor)/product-detail';
      default:
        return '/(user)/product-detail';
    }
  };

  return (
    <Modal visible={visible} animationType="none" onRequestClose={onClose}>
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: 'white',
          transform: [{ translateY: slideAnim }],
        }}
      >
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.lg, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
            <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>SAVED</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {savedPosts.length === 0 && savedProducts.length === 0 ? (
              <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xl }}>
                <Ionicons name="bookmark-outline" size={64} color={colors.subtext} />
                <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: colors.text, marginTop: spacing.md }}>
                  No Saved Items
                </Text>
                <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.sm, textAlign: 'center', paddingHorizontal: spacing.lg }}>
                  Save posts, videos, and products by tapping the bookmark icon
                </Text>
              </View>
            ) : (
              <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
                {/* Saved Posts/Videos */}
                {savedPosts.length > 0 && (
                  <View style={{ marginTop: spacing.lg, marginBottom: spacing.xl }}>
                    <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.md }}>Saved Posts & Videos</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      {savedPosts.map((post, index) => (
                        <TouchableOpacity
                          key={post.id}
                          style={{ width: index % 3 === 1 ? '32%' : '32%', marginBottom: spacing.md }}
                          onPress={() => {
                            onClose();
                            router.push(getPostDetailRoute() as any);
                          }}
                        >
                          <View style={{ width: '100%', aspectRatio: 1, backgroundColor: colors.border, borderRadius: 12, marginBottom: spacing.xs, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="play-circle" size={40} color={colors.subtext} />
                          </View>
                          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginBottom: spacing.xs }} numberOfLines={2}>
                            {post.title}
                          </Text>
                          {post.isSponsored && (
                            <View style={{ backgroundColor: colors.brand, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start' }}>
                              <Text style={{ fontSize: 9, fontFamily: fonts.semibold, color: '#0F0F0F' }}>Sponsored</Text>
                            </View>
                          )}
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              unsavePost(post.id);
                            }}
                            style={{ position: 'absolute', top: 8, right: 8 }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                          >
                            <Ionicons name="bookmark" size={20} color={colors.brand} />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}

                {/* Saved Products */}
                {savedProducts.length > 0 && (
                  <View style={{ marginTop: savedPosts.length > 0 ? spacing.xl : spacing.lg }}>
                    <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.md }}>Saved Products</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      {savedProducts.map((product) => (
                        <TouchableOpacity
                          key={product.id}
                          style={{ width: '32%', marginBottom: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, overflow: 'hidden' }}
                          onPress={() => {
                            onClose();
                            router.push({ pathname: getProductDetailRoute() as any, params: { productId: product.id } });
                          }}
                        >
                          <View style={{ width: '100%', aspectRatio: 1, backgroundColor: product.imageColor || colors.border, alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="football-outline" size={60} color={colors.subtext} />
                          </View>
                          <View style={{ padding: spacing.md }}>
                            <Text style={{ fontSize: 12, fontFamily: fonts.regular, marginBottom: spacing.xs, color: colors.subtext }} numberOfLines={1}>
                              {product.name}
                            </Text>
                            <Text style={{ fontSize: 14, fontFamily: fonts.regular, marginBottom: spacing.xs }}>{product.price}</Text>
                            {product.discount && (
                              <Text style={{ fontSize: 10, fontFamily: fonts.semibold, color: '#FFA500', alignSelf: 'flex-start' }}>
                                {product.discount} Discount
                              </Text>
                            )}
                          </View>
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              unsaveProduct(product.id);
                            }}
                            style={{ position: 'absolute', top: spacing.md, right: spacing.md, padding: spacing.xs, zIndex: 10 }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                          >
                            <Ionicons name="bookmark" size={20} color={colors.brand} />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
      </Animated.View>
    </Modal>
  );
}

