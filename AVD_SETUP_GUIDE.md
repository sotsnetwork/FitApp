# Android Virtual Device Setup Guide for Expo

## Recommended Configuration

### System Image Selection
- **Name:** Pixel 8 (or Pixel 7/6)
- **API Level:** 34 (Android 14) or 33 (Android 13) - More stable than API 36
- **System Image:** Google Play Intel x86_64 Atom System Image
- **ABI:** x86_64 (for better performance)
- **Services:** Google Play (required for Expo Go)

### Step-by-Step Setup

1. **Open Android Studio**
   - Go to Tools → Device Manager
   - Click "Create Device"

2. **Select Device**
   - Choose: Pixel 8 (or Pixel 7/6)
   - Click "Next"

3. **Download System Image (if needed)**
   - Select: "Google Play Intel x86_64 Atom System Image"
   - Click "Download" if not installed
   - Wait for download to complete

4. **Configure AVD**
   - Click "Next"
   - Review configuration:
     - RAM: 2-4 GB (recommended: 3 GB)
     - VM Heap: 512 MB
     - Graphics: Automatic or Hardware (if available)

5. **Finish Setup**
   - Name: "Pixel_8_API_34" (or similar)
   - Click "Finish"

## Important Notes

- **For Expo Development:** Always use Google Play images (required for Expo Go app)
- **API 34/33** recommended over API 36 for better compatibility
- **x86_64** architecture preferred over ARM for faster performance on development machines

