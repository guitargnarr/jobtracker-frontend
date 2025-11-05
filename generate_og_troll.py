#!/usr/bin/env python3
"""
Generate TROLL-LEVEL OG image for Synergy Dashboard™ 3000
Maximum corporate satire energy
"""

from PIL import Image, ImageDraw, ImageFont
import random

# Create 1200x630 OG image
img = Image.new('RGB', (1200, 630), '#0f172a')  # Dark slate background
draw = ImageDraw.Draw(img)

# Chaotic gradient background (corporate rainbow vomit)
for i in range(630):
    color_shift = int(255 * (i / 630))
    # Rotating RGB chaos
    r = (color_shift + 100) % 255
    g = (150 - color_shift // 2) % 255
    b = (color_shift * 2) % 255
    draw.rectangle([0, i, 1200, i+1], fill=(r, g, b))

# MASSIVE brutal shadow card
shadow_offset = 20
card_padding = 60
draw.rectangle(
    [card_padding + shadow_offset, card_padding + shadow_offset,
     1200 - card_padding + shadow_offset, 630 - card_padding + shadow_offset],
    fill='#000000'
)

# White card with THICC border
draw.rectangle([card_padding, card_padding, 1200 - card_padding, 630 - card_padding], fill='#ffffff')
draw.rectangle([card_padding, card_padding, 1200 - card_padding, 630 - card_padding],
               outline='#0f172a', width=10)

# Try to load fonts
try:
    title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 90)
    subtitle_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 45)
    desc_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
    small_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 24)
except (OSError, IOError):
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()
    desc_font = ImageFont.load_default()
    small_font = ImageFont.load_default()

# TITLE - Corporate AF
title = "SYNERGY DASHBOARD™ 3000"
title_bbox = draw.textbbox((0, 0), title, font=title_font)
title_w = title_bbox[2] - title_bbox[0]
title_x = (1200 - title_w) // 2
draw.text((title_x, 100), title, fill='#0f172a', font=title_font)

# Subtitle - Maximum buzzwords
subtitle = "🚀 ENTERPRISE CAREER VELOCITY OPTIMIZATION 🚀"
subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
subtitle_w = subtitle_bbox[2] - subtitle_bbox[0]
subtitle_x = (1200 - subtitle_w) // 2
draw.text((subtitle_x, 210), subtitle, fill='#2563eb', font=subtitle_font)

# Tagline - Peak absurdity
tagline = "Leveraging AI-Powered Blockchain Synergy in the Cloud"
tagline_bbox = draw.textbbox((0, 0), tagline, font=desc_font)
tagline_w = tagline_bbox[2] - tagline_bbox[0]
tagline_x = (1200 - tagline_w) // 2
draw.text((tagline_x, 280), tagline, fill='#64748b', font=desc_font)

# Features bar - Corporate bingo
features = "✓ Paradigm Shifts  ✓ Disruptive Innovation  ✓ Thought Leadership  ✓ Synergy Metrics"
features_bbox = draw.textbbox((0, 0), features, font=small_font)
features_w = features_bbox[2] - features_bbox[0]
features_x = (1200 - features_w) // 2
draw.text((features_x, 340), features, fill='#22c55e', font=small_font)

# BADGES - Ridiculous corporate awards
badge_y = 400
badge_size = 80

# Badge 1 - "ISO Certified BS"
draw.ellipse([150, badge_y, 150 + badge_size, badge_y + badge_size],
             fill='#f59e0b', outline='#0f172a', width=4)
draw.text((155, badge_y + 25), "ISO", fill='#ffffff', font=small_font)
draw.text((155, badge_y + 45), "9001", fill='#ffffff', font=small_font)

# Badge 2 - "AI Powered"
draw.ellipse([300, badge_y, 300 + badge_size, badge_y + badge_size],
             fill='#8b5cf6', outline='#0f172a', width=4)
draw.text((315, badge_y + 25), "AI", fill='#ffffff', font=subtitle_font)

# Badge 3 - "Blockchain Ready"
draw.ellipse([450, badge_y, 450 + badge_size, badge_y + badge_size],
             fill='#ec4899', outline='#0f172a', width=4)
draw.text((460, badge_y + 20), "⛓️", fill='#ffffff', font=subtitle_font)

# Badge 4 - "Cloud Native"
draw.ellipse([600, badge_y, 600 + badge_size, badge_y + badge_size],
             fill='#06b6d4', outline='#0f172a', width=4)
draw.text((615, badge_y + 20), "☁️", fill='#ffffff', font=subtitle_font)

# Badge 5 - "Agile Certified"
draw.ellipse([750, badge_y, 750 + badge_size, badge_y + badge_size],
             fill='#10b981', outline='#0f172a', width=4)
draw.text((760, badge_y + 25), "AGILE", fill='#ffffff', font=small_font)

# Badge 6 - "Web3 Enabled"
draw.ellipse([900, badge_y, 900 + badge_size, badge_y + badge_size],
             fill='#f43f5e', outline='#0f172a', width=4)
draw.text((910, badge_y + 25), "WEB3", fill='#ffffff', font=small_font)

# Badge 7 - "ROI Guaranteed*"
draw.ellipse([1050, badge_y, 1050 + badge_size, badge_y + badge_size],
             fill='#eab308', outline='#0f172a', width=4)
draw.text((1060, badge_y + 25), "ROI", fill='#ffffff', font=small_font)
draw.text((1060, badge_y + 45), "∞%", fill='#ffffff', font=small_font)

# Bottom banner - MAXIMUM TROLL
banner_text = "🎯 TRACK • 📊 ANALYZE • 🚀 OPTIMIZE • 💰 MONETIZE • ♾️ SYNERGIZE"
banner_bbox = draw.textbbox((0, 0), banner_text, font=desc_font)
banner_w = banner_bbox[2] - banner_bbox[0]
banner_x = (1200 - banner_w) // 2
draw.text((banner_x, 520), banner_text, fill='#7c3aed', font=desc_font)

# Disclaimer (the troll cherry on top)
disclaimer = "*Results not typical. Synergy levels may vary. Not responsible for paradigm shifts."
disclaimer_bbox = draw.textbbox((0, 0), disclaimer, font=small_font)
disclaimer_w = disclaimer_bbox[2] - disclaimer_bbox[0]
disclaimer_x = (1200 - disclaimer_w) // 2
draw.text((disclaimer_x, 560), disclaimer, fill='#94a3b8', font=small_font)

# Save
img.save('/Users/matthewscott/Projects/jobtracker-frontend/public/og-image.png')
print("✅ TROLL-LEVEL OG image generated!")
print("📁 Saved to: public/og-image.png")
print("🎨 Size: 1200x630px")
print("😈 Satire level: MAXIMUM")
