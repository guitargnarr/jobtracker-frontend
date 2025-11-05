#!/usr/bin/env python3
"""
Generate favicon and OG image for Synergy Dashboard™ 3000
Neubrutalism style with thick borders and bold colors
"""

from PIL import Image, ImageDraw, ImageFont
import os

# Create public directory if it doesn't exist
os.makedirs('public', exist_ok=True)

# ===== FAVICON (32x32) =====
print("🎨 Generating favicon.ico...")

favicon = Image.new('RGB', (32, 32), '#2563eb')  # Corporate blue
draw = ImageDraw.Draw(favicon)

# Draw thick black border
draw.rectangle([0, 0, 31, 31], outline='#0f172a', width=2)

# Draw white "S" for Synergy (simplified)
draw.text((8, 6), 'S', fill='white', font=ImageFont.load_default())

favicon.save('public/favicon.ico')
print("✅ favicon.ico created (32x32)")

# ===== OG IMAGE (1200x630) =====
print("🎨 Generating og-image.png...")

og = Image.new('RGB', (1200, 630), '#f8fafc')  # Light slate background
draw = ImageDraw.Draw(og)

# Main card background (white with brutal shadow)
card_x, card_y = 100, 80
card_w, card_h = 1000, 470

# Draw brutal shadow (offset)
shadow_offset = 12
draw.rectangle(
    [card_x + shadow_offset, card_y + shadow_offset,
     card_x + card_w + shadow_offset, card_y + card_h + shadow_offset],
    fill='#0f172a'
)

# Draw white card
draw.rectangle([card_x, card_y, card_x + card_w, card_y + card_h], fill='white')

# Draw thick border
draw.rectangle([card_x, card_y, card_x + card_w, card_y + card_h],
               outline='#0f172a', width=6)

# Try to load a font, fall back to default
try:
    title_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 80)
    subtitle_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 40)
    desc_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
except (OSError, IOError):
    title_font = ImageFont.load_default()
    subtitle_font = ImageFont.load_default()
    desc_font = ImageFont.load_default()

# Title
title = "Synergy Dashboard™ 3000"
title_bbox = draw.textbbox((0, 0), title, font=title_font)
title_w = title_bbox[2] - title_bbox[0]
title_x = card_x + (card_w - title_w) // 2
draw.text((title_x, card_y + 80), title, fill='#0f172a', font=title_font)

# Subtitle
subtitle = "Enterprise Career Opportunity Management"
subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
subtitle_w = subtitle_bbox[2] - subtitle_bbox[0]
subtitle_x = card_x + (card_w - subtitle_w) // 2
draw.text((subtitle_x, card_y + 200), subtitle, fill='#2563eb', font=subtitle_font)

# Description
desc = "Leveraging AI-Powered Synergy Optimization"
desc_bbox = draw.textbbox((0, 0), desc, font=desc_font)
desc_w = desc_bbox[2] - desc_bbox[0]
desc_x = card_x + (card_w - desc_w) // 2
draw.text((desc_x, card_y + 280), desc, fill='#64748b', font=desc_font)

# Bottom tagline
tagline = "🚀 Track • Analyze • Optimize • Synergize"
tagline_bbox = draw.textbbox((0, 0), tagline, font=desc_font)
tagline_w = tagline_bbox[2] - tagline_bbox[0]
tagline_x = card_x + (card_w - tagline_w) // 2
draw.text((tagline_x, card_y + 380), tagline, fill='#22c55e', font=desc_font)

# Decorative elements (corporate badges)
badge_y = card_y + 50
badge_size = 60

# Badge 1 - Left
draw.ellipse([card_x + 50, badge_y, card_x + 50 + badge_size, badge_y + badge_size],
             fill='#2563eb', outline='#0f172a', width=3)

# Badge 2 - Right
draw.ellipse([card_x + card_w - 50 - badge_size, badge_y,
              card_x + card_w - 50, badge_y + badge_size],
             fill='#22c55e', outline='#0f172a', width=3)

og.save('public/og-image.png')
print("✅ og-image.png created (1200x630)")

print("\n✨ All assets generated successfully!")
print("📁 Location: public/")
print("   - favicon.ico (32x32)")
print("   - og-image.png (1200x630)")
