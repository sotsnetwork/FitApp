import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';

export default function VerifyPhone() {
  const params = useLocalSearchParams();
  const phoneNumber = (params.phone as string) || '+2348060113697';
  const [code, setCode] = React.useState(['', '', '', '']);
  const [resendTime, setResendTime] = React.useState(48);
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    if (resendTime > 0) {
      const timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTime]);

  const handleKeyPress = (key: string) => {
    if (key === 'backspace') {
      // Find the last filled index
      let lastFilledIndex = -1;
      for (let i = code.length - 1; i >= 0; i--) {
        if (code[i] !== '') {
          lastFilledIndex = i;
          break;
        }
      }
      if (lastFilledIndex !== -1) {
        const newCode = [...code];
        newCode[lastFilledIndex] = '';
        setCode(newCode);
        setActiveIndex(lastFilledIndex);
      }
    } else if (/\d/.test(key)) {
      const emptyIndex = code.findIndex((c) => c === '');
      if (emptyIndex !== -1) {
        const newCode = [...code];
        newCode[emptyIndex] = key;
        setCode(newCode);
        const nextEmptyIndex = newCode.findIndex((c) => c === '');
        setActiveIndex(nextEmptyIndex !== -1 ? nextEmptyIndex : 4);
        
        // Auto-verify when all 4 digits entered
        if (emptyIndex === 3) {
          setTimeout(() => {
            router.push('/(auth)/reset-sent');
          }, 500);
        }
      }
    }
  };

  const getBoxStyle = (index: number) => {
    const hasValue = Boolean(code[index]);
    const isEmpty = !hasValue;
    const isActive = index === activeIndex && isEmpty;
    
    if (hasValue) {
      // Success state (green) when filled
      return { borderColor: colors.brand, backgroundColor: colors.brandTint };
    } else if (isActive) {
      // Error/Active state (red) when empty and active
      return { borderColor: '#F3B5B5', backgroundColor: '#FFF5F5' };
    } else {
      // Default state (gray) when empty and not active
      return { borderColor: colors.border, backgroundColor: 'white' };
    }
  };

  const keypad = [
    [{ num: '1' }, { num: '2', letters: 'ABC' }, { num: '3', letters: 'DEF' }],
    [{ num: '4', letters: 'GHI' }, { num: '5', letters: 'JKL' }, { num: '6', letters: 'MNO' }],
    [{ num: '7', letters: 'PQRS' }, { num: '8', letters: 'TUV' }, { num: '9', letters: 'WXYZ' }],
    [{ num: '' }, { num: '0' }, { num: 'backspace' }],
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: spacing.lg, paddingTop: 64 }}>
        {/* Header */}
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 36, fontFamily: fonts.bold, marginBottom: spacing.sm }}>Verify Phone</Text>
        <Text style={{ color: colors.subtext, marginBottom: spacing.xl, fontFamily: fonts.regular, fontSize: 14 }}>
          We have sent an SMS message with the verification code to{' '}
          <Text style={{ fontFamily: fonts.semibold, color: colors.text }}>{phoneNumber}</Text>
        </Text>

        {/* Code Input Boxes */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing.md, marginBottom: spacing.lg }}>
          {code.map((digit, index) => (
            <View
              key={index}
              style={[
                {
                  width: 64,
                  height: 64,
                  borderRadius: 12,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                getBoxStyle(index),
              ]}
            >
              <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.text }}>{digit}</Text>
            </View>
          ))}
        </View>

        {/* Resend Code */}
        <View style={{ alignItems: 'center', marginBottom: spacing.lg }}>
          {resendTime > 0 ? (
            <Text style={{ color: colors.subtext, fontFamily: fonts.regular, fontSize: 14 }}>
              Resend code in {resendTime}s
            </Text>
          ) : (
            <TouchableOpacity onPress={() => setResendTime(48)}>
              <Text style={{ color: colors.brand, fontFamily: fonts.regular, fontSize: 14 }}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Code Button */}
        <Button
          title="Verify Code"
          onPress={() => {
            if (code.every((c) => c !== '')) {
              router.push('/(auth)/reset-sent');
            }
          }}
          disabled={!code.every((c) => c !== '')}
        />
      </View>

      {/* Numeric Keypad */}
      <View style={{ backgroundColor: '#F5F5F5', padding: spacing.md, paddingBottom: spacing.xl }}>
        {keypad.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing.sm, marginBottom: spacing.sm }}>
            {row.map((keyObj, keyIndex) => {
              const key = keyObj.num;
              const uniqueKey = `${rowIndex}-${keyIndex}-${key}`;
              if (key === '') {
                return <View key={uniqueKey} style={{ width: 72, height: 72 }} />;
              }
              return (
                <TouchableOpacity
                  key={uniqueKey}
                  onPress={() => handleKeyPress(key)}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 12,
                    backgroundColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {key === 'backspace' ? (
                    <Ionicons name="backspace-outline" size={24} color={colors.text} />
                  ) : (
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 24, fontFamily: fonts.bold, color: colors.text }}>{key}</Text>
                      {keyObj.letters && (
                        <Text style={{ fontSize: 10, fontFamily: fonts.regular, color: colors.subtext, marginTop: 2 }}>
                          {keyObj.letters}
                        </Text>
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

