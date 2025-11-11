import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { spacing, fonts, colors } from '../../theme/tokens';
import { useUserRole } from '../../contexts/UserRoleContext';
import { useUserProfile } from '../../contexts/UserProfileContext';

// Country codes with flags - Comprehensive list of all countries
const countries = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+260', flag: '🇿🇲', name: 'Zambia' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda' },
  { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+66', flag: '🇹🇭', name: 'Thailand' },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+32', flag: '🇧🇪', name: 'Belgium' },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+43', flag: '🇦🇹', name: 'Austria' },
  { code: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: '+47', flag: '🇳🇴', name: 'Norway' },
  { code: '+45', flag: '🇩🇰', name: 'Denmark' },
  { code: '+358', flag: '🇫🇮', name: 'Finland' },
  { code: '+353', flag: '🇮🇪', name: 'Ireland' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+30', flag: '🇬🇷', name: 'Greece' },
  { code: '+48', flag: '🇵🇱', name: 'Poland' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
  { code: '+36', flag: '🇭🇺', name: 'Hungary' },
  { code: '+40', flag: '🇷🇴', name: 'Romania' },
  { code: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+213', flag: '🇩🇿', name: 'Algeria' },
  { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+218', flag: '🇱🇾', name: 'Libya' },
  { code: '+249', flag: '🇸🇩', name: 'Sudan' },
  { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda' },
  { code: '+257', flag: '🇧🇮', name: 'Burundi' },
  { code: '+252', flag: '🇸🇴', name: 'Somalia' },
  { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda' },
  { code: '+257', flag: '🇧🇮', name: 'Burundi' },
  { code: '+258', flag: '🇲🇿', name: 'Mozambique' },
  { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
  { code: '+262', flag: '🇷🇪', name: 'Réunion' },
  { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
  { code: '+264', flag: '🇳🇦', name: 'Namibia' },
  { code: '+265', flag: '🇲🇼', name: 'Malawi' },
  { code: '+266', flag: '🇱🇸', name: 'Lesotho' },
  { code: '+267', flag: '🇧🇼', name: 'Botswana' },
  { code: '+268', flag: '🇸🇿', name: 'Eswatini' },
  { code: '+269', flag: '🇰🇲', name: 'Comoros' },
  { code: '+290', flag: '🇸🇭', name: 'Saint Helena' },
  { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
  { code: '+297', flag: '🇦🇼', name: 'Aruba' },
  { code: '+298', flag: '🇫🇴', name: 'Faroe Islands' },
  { code: '+299', flag: '🇬🇱', name: 'Greenland' },
  { code: '+350', flag: '🇬🇮', name: 'Gibraltar' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
  { code: '+354', flag: '🇮🇸', name: 'Iceland' },
  { code: '+355', flag: '🇦🇱', name: 'Albania' },
  { code: '+356', flag: '🇲🇹', name: 'Malta' },
  { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
  { code: '+358', flag: '🇫🇮', name: 'Finland' },
  { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
  { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
  { code: '+371', flag: '🇱🇻', name: 'Latvia' },
  { code: '+372', flag: '🇪🇪', name: 'Estonia' },
  { code: '+373', flag: '🇲🇩', name: 'Moldova' },
  { code: '+374', flag: '🇦🇲', name: 'Armenia' },
  { code: '+375', flag: '🇧🇾', name: 'Belarus' },
  { code: '+376', flag: '🇦🇩', name: 'Andorra' },
  { code: '+377', flag: '🇲🇨', name: 'Monaco' },
  { code: '+378', flag: '🇸🇲', name: 'San Marino' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+381', flag: '🇷🇸', name: 'Serbia' },
  { code: '+382', flag: '🇲🇪', name: 'Montenegro' },
  { code: '+383', flag: '🇽🇰', name: 'Kosovo' },
  { code: '+385', flag: '🇭🇷', name: 'Croatia' },
  { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
  { code: '+387', flag: '🇧🇦', name: 'Bosnia and Herzegovina' },
  { code: '+389', flag: '🇲🇰', name: 'North Macedonia' },
  { code: '+390', flag: '🇻🇦', name: 'Vatican City' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
  { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
  { code: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
  { code: '+500', flag: '🇫🇰', name: 'Falkland Islands' },
  { code: '+501', flag: '🇧🇿', name: 'Belize' },
  { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+507', flag: '🇵🇦', name: 'Panama' },
  { code: '+508', flag: '🇵🇲', name: 'Saint Pierre and Miquelon' },
  { code: '+509', flag: '🇭🇹', name: 'Haiti' },
  { code: '+590', flag: '🇬🇵', name: 'Guadeloupe' },
  { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: '+592', flag: '🇬🇾', name: 'Guyana' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+594', flag: '🇬🇫', name: 'French Guiana' },
  { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: '+596', flag: '🇲🇶', name: 'Martinique' },
  { code: '+597', flag: '🇸🇷', name: 'Suriname' },
  { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: '+599', flag: '🇧🇶', name: 'Caribbean Netherlands' },
  { code: '+670', flag: '🇹🇱', name: 'Timor-Leste' },
  { code: '+672', flag: '🇦🇶', name: 'Antarctica' },
  { code: '+673', flag: '🇧🇳', name: 'Brunei' },
  { code: '+674', flag: '🇳🇷', name: 'Nauru' },
  { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
  { code: '+676', flag: '🇹🇴', name: 'Tonga' },
  { code: '+677', flag: '🇸🇧', name: 'Solomon Islands' },
  { code: '+678', flag: '🇻🇺', name: 'Vanuatu' },
  { code: '+679', flag: '🇫🇯', name: 'Fiji' },
  { code: '+680', flag: '🇵🇼', name: 'Palau' },
  { code: '+681', flag: '🇼🇫', name: 'Wallis and Futuna' },
  { code: '+682', flag: '🇨🇰', name: 'Cook Islands' },
  { code: '+683', flag: '🇳🇺', name: 'Niue' },
  { code: '+685', flag: '🇼🇸', name: 'Samoa' },
  { code: '+686', flag: '🇰🇮', name: 'Kiribati' },
  { code: '+687', flag: '🇳🇨', name: 'New Caledonia' },
  { code: '+688', flag: '🇹🇻', name: 'Tuvalu' },
  { code: '+689', flag: '🇵🇫', name: 'French Polynesia' },
  { code: '+850', flag: '🇰🇵', name: 'North Korea' },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: '+853', flag: '🇲🇴', name: 'Macau' },
  { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
  { code: '+856', flag: '🇱🇦', name: 'Laos' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
  { code: '+960', flag: '🇲🇻', name: 'Maldives' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+963', flag: '🇸🇾', name: 'Syria' },
  { code: '+964', flag: '🇮🇶', name: 'Iraq' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+967', flag: '🇾🇪', name: 'Yemen' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+970', flag: '🇵🇸', name: 'Palestine' },
  { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
  { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
  { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
  { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
  { code: '+995', flag: '🇬🇪', name: 'Georgia' },
  { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
  { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
  { code: '+1242', flag: '🇧🇸', name: 'Bahamas' },
  { code: '+1246', flag: '🇧🇧', name: 'Barbados' },
  { code: '+1264', flag: '🇦🇮', name: 'Anguilla' },
  { code: '+1268', flag: '🇦🇬', name: 'Antigua and Barbuda' },
  { code: '+1284', flag: '🇻🇬', name: 'British Virgin Islands' },
  { code: '+1340', flag: '🇻🇮', name: 'U.S. Virgin Islands' },
  { code: '+1345', flag: '🇰🇾', name: 'Cayman Islands' },
  { code: '+1441', flag: '🇧🇲', name: 'Bermuda' },
  { code: '+1473', flag: '🇬🇩', name: 'Grenada' },
  { code: '+1649', flag: '🇹🇨', name: 'Turks and Caicos Islands' },
  { code: '+1664', flag: '🇲🇸', name: 'Montserrat' },
  { code: '+1670', flag: '🇲🇵', name: 'Northern Mariana Islands' },
  { code: '+1671', flag: '🇬🇺', name: 'Guam' },
  { code: '+1684', flag: '🇦🇸', name: 'American Samoa' },
  { code: '+1721', flag: '🇸🇽', name: 'Sint Maarten' },
  { code: '+1758', flag: '🇱🇨', name: 'Saint Lucia' },
  { code: '+1767', flag: '🇩🇲', name: 'Dominica' },
  { code: '+1784', flag: '🇻🇨', name: 'Saint Vincent and the Grenadines' },
  { code: '+1787', flag: '🇵🇷', name: 'Puerto Rico' },
  { code: '+1809', flag: '🇩🇴', name: 'Dominican Republic' },
  { code: '+1829', flag: '🇩🇴', name: 'Dominican Republic' },
  { code: '+1849', flag: '🇩🇴', name: 'Dominican Republic' },
  { code: '+1868', flag: '🇹🇹', name: 'Trinidad and Tobago' },
  { code: '+1869', flag: '🇰🇳', name: 'Saint Kitts and Nevis' },
  { code: '+1876', flag: '🇯🇲', name: 'Jamaica' },
  { code: '+1939', flag: '🇵🇷', name: 'Puerto Rico' },
  { code: '+51', flag: '🇵🇪', name: 'Peru' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+53', flag: '🇨🇺', name: 'Cuba' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
  { code: '+98', flag: '🇮🇷', name: 'Iran' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+213', flag: '🇩🇿', name: 'Algeria' },
  { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+218', flag: '🇱🇾', name: 'Libya' },
  { code: '+220', flag: '🇬🇲', name: 'Gambia' },
  { code: '+221', flag: '🇸🇳', name: 'Senegal' },
  { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
  { code: '+223', flag: '🇲🇱', name: 'Mali' },
  { code: '+224', flag: '🇬🇳', name: 'Guinea' },
  { code: '+225', flag: '🇨🇮', name: 'Ivory Coast' },
  { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
  { code: '+227', flag: '🇳🇪', name: 'Niger' },
  { code: '+228', flag: '🇹🇬', name: 'Togo' },
  { code: '+229', flag: '🇧🇯', name: 'Benin' },
  { code: '+230', flag: '🇲🇺', name: 'Mauritius' },
  { code: '+231', flag: '🇱🇷', name: 'Liberia' },
  { code: '+232', flag: '🇸🇱', name: 'Sierra Leone' },
  { code: '+235', flag: '🇹🇩', name: 'Chad' },
  { code: '+236', flag: '🇨🇫', name: 'Central African Republic' },
  { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
  { code: '+238', flag: '🇨🇻', name: 'Cape Verde' },
  { code: '+239', flag: '🇸🇹', name: 'São Tomé and Príncipe' },
  { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
  { code: '+241', flag: '🇬🇦', name: 'Gabon' },
  { code: '+242', flag: '🇨🇬', name: 'Republic of the Congo' },
  { code: '+243', flag: '🇨🇩', name: 'DR Congo' },
  { code: '+244', flag: '🇦🇴', name: 'Angola' },
  { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
  { code: '+246', flag: '🇮🇴', name: 'British Indian Ocean Territory' },
  { code: '+248', flag: '🇸🇨', name: 'Seychelles' },
  { code: '+249', flag: '🇸🇩', name: 'Sudan' },
  { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
  { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
  { code: '+252', flag: '🇸🇴', name: 'Somalia' },
  { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda' },
  { code: '+257', flag: '🇧🇮', name: 'Burundi' },
  { code: '+258', flag: '🇲🇿', name: 'Mozambique' },
  { code: '+260', flag: '🇿🇲', name: 'Zambia' },
  { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
  { code: '+262', flag: '🇷🇪', name: 'Réunion' },
  { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
  { code: '+264', flag: '🇳🇦', name: 'Namibia' },
  { code: '+265', flag: '🇲🇼', name: 'Malawi' },
  { code: '+266', flag: '🇱🇸', name: 'Lesotho' },
  { code: '+267', flag: '🇧🇼', name: 'Botswana' },
  { code: '+268', flag: '🇸🇿', name: 'Eswatini' },
  { code: '+269', flag: '🇰🇲', name: 'Comoros' },
  { code: '+290', flag: '🇸🇭', name: 'Saint Helena' },
  { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
  { code: '+297', flag: '🇦🇼', name: 'Aruba' },
  { code: '+298', flag: '🇫🇴', name: 'Faroe Islands' },
  { code: '+299', flag: '🇬🇱', name: 'Greenland' },
  { code: '+350', flag: '🇬🇮', name: 'Gibraltar' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
  { code: '+354', flag: '🇮🇸', name: 'Iceland' },
  { code: '+355', flag: '🇦🇱', name: 'Albania' },
  { code: '+356', flag: '🇲🇹', name: 'Malta' },
  { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
  { code: '+358', flag: '🇫🇮', name: 'Finland' },
  { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
  { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
  { code: '+371', flag: '🇱🇻', name: 'Latvia' },
  { code: '+372', flag: '🇪🇪', name: 'Estonia' },
  { code: '+373', flag: '🇲🇩', name: 'Moldova' },
  { code: '+374', flag: '🇦🇲', name: 'Armenia' },
  { code: '+375', flag: '🇧🇾', name: 'Belarus' },
  { code: '+376', flag: '🇦🇩', name: 'Andorra' },
  { code: '+377', flag: '🇲🇨', name: 'Monaco' },
  { code: '+378', flag: '🇸🇲', name: 'San Marino' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+381', flag: '🇷🇸', name: 'Serbia' },
  { code: '+382', flag: '🇲🇪', name: 'Montenegro' },
  { code: '+383', flag: '🇽🇰', name: 'Kosovo' },
  { code: '+385', flag: '🇭🇷', name: 'Croatia' },
  { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
  { code: '+387', flag: '🇧🇦', name: 'Bosnia and Herzegovina' },
  { code: '+389', flag: '🇲🇰', name: 'North Macedonia' },
  { code: '+390', flag: '🇻🇦', name: 'Vatican City' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
  { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
  { code: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
  { code: '+500', flag: '🇫🇰', name: 'Falkland Islands' },
  { code: '+501', flag: '🇧🇿', name: 'Belize' },
  { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+507', flag: '🇵🇦', name: 'Panama' },
  { code: '+508', flag: '🇵🇲', name: 'Saint Pierre and Miquelon' },
  { code: '+509', flag: '🇭🇹', name: 'Haiti' },
  { code: '+590', flag: '🇬🇵', name: 'Guadeloupe' },
  { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: '+592', flag: '🇬🇾', name: 'Guyana' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+594', flag: '🇬🇫', name: 'French Guiana' },
  { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: '+596', flag: '🇲🇶', name: 'Martinique' },
  { code: '+597', flag: '🇸🇷', name: 'Suriname' },
  { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: '+599', flag: '🇧🇶', name: 'Caribbean Netherlands' },
  { code: '+670', flag: '🇹🇱', name: 'Timor-Leste' },
  { code: '+672', flag: '🇦🇶', name: 'Antarctica' },
  { code: '+673', flag: '🇧🇳', name: 'Brunei' },
  { code: '+674', flag: '🇳🇷', name: 'Nauru' },
  { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
  { code: '+676', flag: '🇹🇴', name: 'Tonga' },
  { code: '+677', flag: '🇸🇧', name: 'Solomon Islands' },
  { code: '+678', flag: '🇻🇺', name: 'Vanuatu' },
  { code: '+679', flag: '🇫🇯', name: 'Fiji' },
  { code: '+680', flag: '🇵🇼', name: 'Palau' },
  { code: '+681', flag: '🇼🇫', name: 'Wallis and Futuna' },
  { code: '+682', flag: '🇨🇰', name: 'Cook Islands' },
  { code: '+683', flag: '🇳🇺', name: 'Niue' },
  { code: '+685', flag: '🇼🇸', name: 'Samoa' },
  { code: '+686', flag: '🇰🇮', name: 'Kiribati' },
  { code: '+687', flag: '🇳🇨', name: 'New Caledonia' },
  { code: '+688', flag: '🇹🇻', name: 'Tuvalu' },
  { code: '+689', flag: '🇵🇫', name: 'French Polynesia' },
  { code: '+850', flag: '🇰🇵', name: 'North Korea' },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: '+853', flag: '🇲🇴', name: 'Macau' },
  { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
  { code: '+856', flag: '🇱🇦', name: 'Laos' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
  { code: '+960', flag: '🇲🇻', name: 'Maldives' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+963', flag: '🇸🇾', name: 'Syria' },
  { code: '+964', flag: '🇮🇶', name: 'Iraq' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+967', flag: '🇾🇪', name: 'Yemen' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+970', flag: '🇵🇸', name: 'Palestine' },
  { code: '+971', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
  { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
  { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
  { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
  { code: '+995', flag: '🇬🇪', name: 'Georgia' },
  { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
  { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
  { code: '+1242', flag: '🇧🇸', name: 'Bahamas' },
  { code: '+1246', flag: '🇧🇧', name: 'Barbados' },
  { code: '+1264', flag: '🇦🇮', name: 'Anguilla' },
  { code: '+1268', flag: '🇦🇬', name: 'Antigua and Barbuda' },
  { code: '+1284', flag: '🇻🇬', name: 'British Virgin Islands' },
  { code: '+1340', flag: '🇻🇮', name: 'U.S. Virgin Islands' },
  { code: '+1345', flag: '🇰🇾', name: 'Cayman Islands' },
  { code: '+1441', flag: '🇧🇲', name: 'Bermuda' },
  { code: '+1473', flag: '🇬🇩', name: 'Grenada' },
  { code: '+1649', flag: '🇹🇨', name: 'Turks and Caicos Islands' },
  { code: '+1664', flag: '🇲🇸', name: 'Montserrat' },
  { code: '+1670', flag: '🇲🇵', name: 'Northern Mariana Islands' },
  { code: '+1671', flag: '🇬🇺', name: 'Guam' },
  { code: '+1684', flag: '🇦🇸', name: 'American Samoa' },
  { code: '+1721', flag: '🇸🇽', name: 'Sint Maarten' },
  { code: '+1758', flag: '🇱🇨', name: 'Saint Lucia' },
  { code: '+1767', flag: '🇩🇲', name: 'Dominica' },
  { code: '+1784', flag: '🇻🇨', name: 'Saint Vincent and the Grenadines' },
  { code: '+1787', flag: '🇵🇷', name: 'Puerto Rico' },
  { code: '+1809', flag: '🇩🇴', name: 'Dominican Republic' },
  { code: '+1829', flag: '🇩🇴', name: 'Dominican Republic' },
  { code: '+1849', flag: '🇩🇴', name: 'Dominican Republic' },
  { code: '+1868', flag: '🇹🇹', name: 'Trinidad and Tobago' },
  { code: '+1869', flag: '🇰🇳', name: 'Saint Kitts and Nevis' },
  { code: '+1876', flag: '🇯🇲', name: 'Jamaica' },
  { code: '+1939', flag: '🇵🇷', name: 'Puerto Rico' },
].sort((a, b) => a.name.localeCompare(b.name));

export default function Signup() {
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'user';
  const { setRole } = useUserRole();
  const { updateProfile } = useUserProfile();
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [referralCode, setReferralCode] = React.useState('');
  // Find Nigeria in the sorted list and set as default
  const nigeriaIndex = countries.findIndex(c => c.name === 'Nigeria');
  const [selectedCountry, setSelectedCountry] = React.useState(countries[nigeriaIndex >= 0 ? nigeriaIndex : 0]);
  const [countryPickerVisible, setCountryPickerVisible] = React.useState(false);
  const [countrySearchQuery, setCountrySearchQuery] = React.useState('');
  
  // Filter countries based on search query
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
    country.code.includes(countrySearchQuery)
  );

  // Email validation - only allow valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailOk = emailRegex.test(email.trim());
  const emailError = email.length > 0 && !emailOk;

  // Username validation - only allow alphabets and figures (alphanumeric)
  const usernameRegex = /^[A-Za-z0-9]*$/;
  const usernameOk = username.length >= 2 && usernameRegex.test(username);
  const usernameError = username.length > 0 && !usernameOk;

  // Password validation
  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;
  const pwdOk = hasMinLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;

  // Phone validation: Only allow numbers (figures)
  const phoneDigits = phone.replace(/\D/g, ''); // Remove all non-digits
  const phoneOk = phoneDigits.length >= 10;
  const phoneError = phone.length > 0 && !phoneOk;
  
  // Full phone number with country code
  const fullPhoneNumber = `${selectedCountry.code}${phone}`;

  const canSubmit = emailOk && usernameOk && pwdOk && phoneOk;

  // Handle phone input - only allow numbers
  const handlePhoneChange = (text: string) => {
    const numbersOnly = text.replace(/\D/g, ''); // Remove all non-digits
    setPhone(numbersOnly);
  };

  // Handle username input - only allow alphabets and figures
  const handleUsernameChange = (text: string) => {
    const alphanumericOnly = text.replace(/[^A-Za-z0-9]/g, ''); // Remove all non-alphanumeric
    setUsername(alphanumericOnly);
  };

  // Handle email input - validate email format
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ padding: spacing.lg, paddingTop: 64 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: spacing.lg }}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ fontSize: 40, fontFamily: fonts.bold, marginBottom: 8 }}>Create Account</Text>
        <Text style={{ color: colors.subtext, marginBottom: spacing.md, fontFamily: fonts.regular }}>
          New users can earn up to ₦5000 upon Registration.
        </Text>
        <Input 
          value={email} 
          onChangeText={handleEmailChange} 
          placeholder="Enter email" 
          leftIcon="mail-outline" 
          showClearIcon
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={emailError ? 'Please enter a valid email address' : ''}
        />
        <Input 
          value={username} 
          onChangeText={handleUsernameChange} 
          placeholder="Enter username" 
          leftIcon="person-outline" 
          showClearIcon
          autoCapitalize="none"
          autoCorrect={false}
          error={usernameError ? 'Username can only contain letters and numbers' : ''}
        />
        <View>
          <Input value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry leftIcon="lock-closed-outline" showClearIcon />
          <View style={{ marginTop: spacing.xs, marginBottom: spacing.md }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: spacing.xs }}>
              <Text style={{ color: hasLowerCase ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12, marginRight: spacing.md }}>
                {hasLowerCase ? '✓' : '✗'} 1 small letter
              </Text>
              <Text style={{ color: hasUpperCase ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12, marginRight: spacing.md }}>
                {hasUpperCase ? '✓' : '✗'} 1 capital letter
              </Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text style={{ color: hasNumber ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12, marginRight: spacing.md }}>
                {hasNumber ? '✓' : '✗'} 1 number
              </Text>
              <Text style={{ color: hasSpecialChar ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12, marginRight: spacing.md }}>
                {hasSpecialChar ? '✓' : '✗'} 1 special character
              </Text>
              <Text style={{ color: hasMinLength ? colors.brand : '#C30000', fontFamily: fonts.regular, fontSize: 12 }}>
                {hasMinLength ? '✓' : '✗'} 8 characters
              </Text>
            </View>
          </View>
        </View>
        {/* Phone Number with Country Code */}
        <View style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: phoneError ? '#C30000' : colors.border, borderRadius: 16, backgroundColor: 'white', overflow: 'hidden' }}>
            <TouchableOpacity
              onPress={() => setCountryPickerVisible(true)}
              style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderRightWidth: 1, borderRightColor: colors.border }}
            >
              <Text style={{ fontSize: 24, marginRight: spacing.xs }}>{selectedCountry.flag}</Text>
              <Text style={{ fontFamily: fonts.semibold, color: colors.text, marginRight: spacing.xs }}>{selectedCountry.code}</Text>
              <Ionicons name="chevron-down" size={16} color={colors.subtext} />
            </TouchableOpacity>
            <TextInput
              value={phone}
              onChangeText={handlePhoneChange}
              placeholder="Phone number"
              keyboardType="phone-pad"
              style={{ flex: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.md, fontFamily: fonts.regular, fontSize: 16, color: colors.text }}
              placeholderTextColor={colors.subtext}
            />
          </View>
          {phoneError && (
            <Text style={{ color: '#C30000', fontFamily: fonts.regular, fontSize: 12, marginTop: spacing.xs, marginLeft: spacing.xs }}>
              Phone number must be at least 10 digits
            </Text>
          )}
        </View>
        <Input value={referralCode} onChangeText={setReferralCode} placeholder="Referral code (optional)" />

        <View style={{ height: spacing.lg }} />
        <Button 
          title="Get Started" 
          disabled={!canSubmit} 
          onPress={async () => {
            if (!canSubmit) {
              return;
            }
            // Save user profile data from signup (with full phone number including country code)
            await updateProfile({
              username,
              email,
              phone: fullPhoneNumber,
            });
            await setRole(role as 'user' | 'creator' | 'vendor');
            router.push(`/(verify)/verify-email?role=${role}`);
          }} 
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.md, paddingBottom: spacing.xl }}>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={{ color: '#0A8C63', fontFamily: fonts.regular }}>Back to log in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: '#0A8C63', fontFamily: fonts.regular }}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Country Code Picker Modal */}
      <Modal
        visible={countryPickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCountryPickerVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={() => setCountryPickerVisible(false)}
          />
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: spacing.lg, maxHeight: '60%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
              <TouchableOpacity onPress={() => {
                setCountryPickerVisible(false);
                setCountrySearchQuery('');
              }}>
                <Text style={{ fontFamily: fonts.regular, color: colors.brand }}>Close</Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: fonts.semibold, fontSize: 18 }}>Select Country</Text>
              <View style={{ width: 48 }} />
            </View>
            {/* Search Input */}
            <View style={{ marginBottom: spacing.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}>
                <Ionicons name="search-outline" size={20} color={colors.subtext} />
                <TextInput
                  placeholder="Search country..."
                  value={countrySearchQuery}
                  onChangeText={setCountrySearchQuery}
                  style={{ flex: 1, marginLeft: spacing.sm, fontFamily: fonts.regular, fontSize: 16 }}
                  placeholderTextColor={colors.subtext}
                />
                {countrySearchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setCountrySearchQuery('')}>
                    <Ionicons name="close-circle" size={20} color={colors.subtext} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredCountries.length === 0 ? (
                <View style={{ paddingVertical: spacing.xl, alignItems: 'center' }}>
                  <Text style={{ fontFamily: fonts.regular, color: colors.subtext }}>No countries found</Text>
                </View>
              ) : (
                filteredCountries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  onPress={() => {
                    setSelectedCountry(country);
                    setCountryPickerVisible(false);
                    setCountrySearchQuery('');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: spacing.md,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <Text style={{ fontSize: 32, marginRight: spacing.md }}>{country.flag}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily: fonts.semibold, color: colors.text, fontSize: 16 }}>{country.name}</Text>
                    <Text style={{ fontFamily: fonts.regular, color: colors.subtext, fontSize: 14 }}>{country.code}</Text>
                  </View>
                  {selectedCountry.code === country.code && (
                    <Ionicons name="checkmark" size={24} color={colors.brand} />
                  )}
                </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = {} as const;


