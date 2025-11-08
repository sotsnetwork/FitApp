import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useSavedPosts } from '../../contexts/SavedPostsContext';

export default function SavedVideos() {
  const { savedPosts, unsavePost } = useSavedPosts();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.md }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
          <Text style={{ fontSize: 20, fontFamily: fonts.bold, letterSpacing: 0.5 }}>SAVED</Text>
        </View>
      </View>

      {/* Video Grid */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xl }}>
          {savedPosts.length === 0 && savedProducts.length === 0 ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: spacing.xl }}>
              <Ionicons name="bookmark-outline" size={64} color={colors.subtext} />
              <Text style={{ fontSize: 16, fontFamily: fonts.bold, color: colors.text, marginTop: spacing.md }}>
                No Saved Items
              </Text>
              <Text style={{ fontSize: 14, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.sm, textAlign: 'center' }}>
                Save posts, videos, and products by tapping the bookmark icon
              </Text>
            </View>
          ) : (
            <View>
              {/* Saved Posts/Videos */}
              {savedPosts.length > 0 && (
                <View style={{ marginBottom: spacing.xl }}>
                  <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.md }}>Saved Posts & Videos</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {savedPosts.map((post) => (
                      <TouchableOpacity
                        key={post.id}
                        style={{ width: '30%', marginBottom: spacing.md }}
                        onPress={() => router.push('/(user)/post-detail')}
                      >
                        <View style={{ width: '100%', height: 120, backgroundColor: colors.border, borderRadius: 12, marginBottom: spacing.xs, alignItems: 'center', justifyContent: 'center' }}>
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
                <View>
                  <Text style={{ fontSize: 16, fontFamily: fonts.bold, marginBottom: spacing.md }}>Saved Products</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {savedProducts.map((product) => (
                      <TouchableOpacity
                        key={product.id}
                        style={{ width: '48%', marginBottom: spacing.md, backgroundColor: '#F9F9F9', borderRadius: 12, overflow: 'hidden' }}
                        onPress={() => router.push({ pathname: '/(user)/product-detail', params: { productId: product.id } })}
                      >
                        <View style={{ width: '100%', height: 165, backgroundColor: product.imageColor || colors.border, alignItems: 'center', justifyContent: 'center' }}>
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
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: spacing.md, paddingHorizontal: spacing.lg, justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={() => router.push('/(user)/home')} style={{ alignItems: 'center' }}>
          <Ionicons name="home-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/search')} style={{ alignItems: 'center' }}>
          <Ionicons name="search-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(community)/user')} style={{ alignItems: 'center' }}>
          <Ionicons name="people-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Community</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/workout')} style={{ alignItems: 'center' }}>
          <Ionicons name="barbell-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Workout</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(user)/shop')} style={{ alignItems: 'center' }}>
          <Ionicons name="bag-outline" size={24} color={colors.subtext} />
          <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: spacing.xs }}>Shop</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

