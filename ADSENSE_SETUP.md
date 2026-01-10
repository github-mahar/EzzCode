# Google AdSense Setup Guide

This guide explains how to use Google AdSense ads in the EzzCode platform.

## ✅ AdSense Script Added

The AdSense script has been added to `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2842777009443084"
     crossorigin="anonymous"></script>
```

## 📍 Ad Placement

Ads are currently placed in sidebars on all pages:
- **HomePage**: Right sidebar in Featured Programs and Why Choose sections
- **ProgramsPage**: Right sidebar
- **ContactPage**: Right sidebar
- **CertificatePage**: Right sidebar

## 🔧 Using AdSense Ad Units

### Step 1: Create Ad Units in AdSense Dashboard

1. Go to [Google AdSense Dashboard](https://www.google.com/adsense/)
2. Navigate to **Ads** → **By ad unit**
3. Click **+ New ad unit**
4. Choose ad format:
   - **Display ads** for sidebars (300x250, 300x600)
   - **In-article ads** for content
   - **In-feed ads** for listings
5. Configure the ad unit and get the **Ad unit ID** (format: `1234567890`)

### Step 2: Add Ad Slot IDs to Components

Update the `AdBanner` components in your pages with the `adSlot` prop:

**Example:**
```tsx
<AdBanner 
  size="sidebar" 
  position="sidebar" 
  adSlot="1234567890"  // Your AdSense ad slot ID
/>
```

### Step 3: Recommended Ad Sizes

- **Sidebar**: 300x600 (Skyscraper) or 300x250 (Medium Rectangle)
- **Large Banner**: 728x90 (Leaderboard)
- **Medium**: 300x250 (Medium Rectangle)
- **Small**: 300x100 (Banner)

## 📝 Current Implementation

The `AdBanner` component now supports:
- ✅ AdSense ad units via `adSlot` prop
- ✅ Automatic ad loading with `adsbygoogle.push()`
- ✅ Fallback placeholder when no ad slot is provided
- ✅ Proper semantic HTML with `<aside>` tags
- ✅ Accessibility labels

## 🎯 Next Steps

1. **Create Ad Units in AdSense**:
   - Create ad units for each size you need
   - Copy the ad slot IDs

2. **Update AdBanner Components**:
   - Add `adSlot` prop to each `<AdBanner>` component
   - Use the ad slot IDs from your AdSense dashboard

3. **Test Ads**:
   - Use AdSense test mode to verify ads are loading
   - Check that ads appear in the correct locations
   - Verify responsive behavior on mobile devices

## 📋 Example Usage

```tsx
// In HomePage.tsx or any page component
<aside className="lg:col-span-1 space-y-6" aria-label="Advertisement sidebar">
  <AdBanner 
    size="sidebar" 
    position="sidebar" 
    adSlot="1234567890"  // Your sidebar ad slot ID
  />
  <AdBanner 
    size="medium" 
    position="sidebar" 
    adSlot="0987654321"  // Your medium ad slot ID
    className="mt-6" 
  />
</aside>
```

## ⚠️ Important Notes

- **AdSense Approval**: Make sure your site is approved by AdSense before ads will show
- **Ad Blockers**: Users with ad blockers won't see ads (this is normal)
- **Policy Compliance**: Ensure your site complies with AdSense policies
- **Performance**: Ads are loaded asynchronously to not block page rendering

## 🔍 Troubleshooting

### Ads Not Showing?
1. Check if your site is approved in AdSense
2. Verify ad slot IDs are correct
3. Check browser console for errors
4. Ensure AdSense script is loaded (check Network tab)

### Ads Showing Placeholder?
- This means no `adSlot` prop was provided
- Add the `adSlot` prop with your AdSense ad slot ID

### TypeScript Errors?
- The `adsbygoogle` global is declared in the component
- If you see errors, make sure the AdSense script is loaded before React renders

---

**AdSense Client ID**: `ca-pub-2842777009443084`
**Status**: Script added, ready for ad unit configuration
