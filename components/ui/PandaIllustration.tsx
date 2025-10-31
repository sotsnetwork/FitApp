import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect } from 'react-native-svg';

export default function PandaIllustration() {
  return (
    <View style={{ width: 240, height: 240, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width="240" height="240" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
        {/* Panda Body */}
        <Circle cx="100" cy="120" r="50" fill="#FFFFFF" />
        
        {/* Panda Head */}
        <Circle cx="100" cy="70" r="40" fill="#FFFFFF" />
        
        {/* Left Ear */}
        <Circle cx="75" cy="50" r="15" fill="#000000" />
        
        {/* Right Ear */}
        <Circle cx="125" cy="50" r="15" fill="#000000" />
        
        {/* Left Eye Patch */}
        <Ellipse cx="85" cy="70" rx="12" ry="18" fill="#000000" />
        
        {/* Right Eye Patch */}
        <Ellipse cx="115" cy="70" rx="12" ry="18" fill="#000000" />
        
        {/* Left Eye */}
        <Circle cx="85" cy="70" r="6" fill="#FFFFFF" />
        <Circle cx="87" cy="68" r="2" fill="#000000" />
        
        {/* Right Eye */}
        <Circle cx="115" cy="70" r="6" fill="#FFFFFF" />
        <Circle cx="117" cy="68" r="2" fill="#000000" />
        
        {/* Nose */}
        <Ellipse cx="100" cy="80" rx="4" ry="3" fill="#000000" />
        
        {/* Mouth */}
        <Path d="M 100 82 Q 105 87 110 84" stroke="#000000" strokeWidth="2" fill="none" />
        <Path d="M 100 82 Q 95 87 90 84" stroke="#000000" strokeWidth="2" fill="none" />
        
        {/* Left Arm */}
        <Ellipse cx="70" cy="110" rx="12" ry="25" fill="#000000" />
        
        {/* Right Arm */}
        <Ellipse cx="130" cy="110" rx="12" ry="25" fill="#000000" />
        
        {/* Left Leg */}
        <Ellipse cx="85" cy="155" rx="10" ry="20" fill="#000000" />
        
        {/* Right Leg */}
        <Ellipse cx="115" cy="155" rx="10" ry="20" fill="#000000" />
        
        {/* Barbell Bar */}
        <Rect x="60" y="105" width="80" height="8" rx="4" fill="#333333" />
        
        {/* Left Weight */}
        <Rect x="50" y="98" width="15" height="22" rx="3" fill="#888888" />
        <Circle cx="57.5" cy="109" r="3" fill="#CCCCCC" />
        
        {/* Right Weight */}
        <Rect x="135" y="98" width="15" height="22" rx="3" fill="#888888" />
        <Circle cx="142.5" cy="109" r="3" fill="#CCCCCC" />
        
        {/* Sparkle */}
        <Path d="M 70 40 L 72 50 L 74 40 L 72 38 Z" fill="#FFFFFF" />
        <Path d="M 75 42 L 77 44 L 75 46 L 73 44 Z" fill="#FFFFFF" />
      </Svg>
    </View>
  );
}

