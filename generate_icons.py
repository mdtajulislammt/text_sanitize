#!/usr/bin/env python3
"""
Icon Generator for Text Sanitizer Pro Chrome Extension
Generates icon16.png, icon48.png, and icon128.png
"""

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Pillow is required. Install it with: pip install Pillow")
    exit(1)

def create_icon(size):
    """Create an icon of the specified size"""
    # Create image with gradient background
    img = Image.new('RGB', (size, size), color='#667eea')
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background (simplified - solid color with rounded corners effect)
    # For a true gradient, we'd need more complex code, but this works well
    gradient_color = '#764ba2'
    
    # Draw rounded rectangle background
    corner_radius = int(size * 0.2)
    draw.rounded_rectangle([(0, 0), (size, size)], radius=corner_radius, fill='#667eea')
    
    # Draw shield shape
    center_x, center_y = size // 2, size // 2
    shield_width = int(size * 0.5)
    shield_height = int(size * 0.6)
    
    # Shield points
    shield_points = [
        (center_x, center_y - shield_height // 2),  # Top
        (center_x + shield_width // 2, center_y - shield_height // 4),  # Top right
        (center_x + shield_width // 2, center_y + shield_height // 4),  # Bottom right
        (center_x, center_y + shield_height // 2),  # Bottom
        (center_x - shield_width // 2, center_y + shield_height // 4),  # Bottom left
        (center_x - shield_width // 2, center_y - shield_height // 4),  # Top left
    ]
    
    # Draw shield outline
    line_width = max(2, int(size * 0.08))
    draw.polygon(shield_points, outline='white', width=line_width)
    
    # Draw checkmark inside shield
    check_width = int(size * 0.06)
    check_points = [
        (center_x - int(shield_width * 0.15), center_y),
        (center_x - int(shield_width * 0.05), center_y + int(shield_height * 0.15)),
        (center_x + int(shield_width * 0.2), center_y - int(shield_height * 0.1)),
    ]
    draw.line([check_points[0], check_points[1]], fill='white', width=check_width)
    draw.line([check_points[1], check_points[2]], fill='white', width=check_width)
    
    # Add "TSP" text for larger icons
    if size >= 48:
        try:
            # Try to use a nice font, fallback to default if not available
            font_size = int(size * 0.18)
            try:
                font = ImageFont.truetype("arial.ttf", font_size)
            except:
                try:
                    font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
                except:
                    font = ImageFont.load_default()
            
            text = "TSP"
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            text_x = center_x - text_width // 2
            text_y = center_y + int(shield_height * 0.35)
            draw.text((text_x, text_y), text, fill='rgba(255, 255, 255, 76)', font=font)
        except:
            pass  # Skip text if font loading fails
    
    return img

def main():
    sizes = [16, 48, 128]
    print("Generating icons for Text Sanitizer Pro...")
    
    for size in sizes:
        filename = f"icon{size}.png"
        icon = create_icon(size)
        icon.save(filename, 'PNG')
        print(f"[OK] Created {filename} ({size}x{size})")
    
    print("\nAll icons generated successfully!")
    print("The icons are ready to use in your Chrome extension.")

if __name__ == "__main__":
    main()
