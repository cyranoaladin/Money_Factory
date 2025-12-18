import os
import re
from pathlib import Path

# Configuration
FILES_TO_CHECK = [
    "product.html",
    "developers.html",
    "investors.html",
    "documentation_hub.html"
]

IMAGES_DIR = "images"

def check_image_existence(file_path):
    """
    Parses HTML to find img tags and verifies if the src exists.
    """
    print(f"\nExample E2E/Unit Check for: {file_path}")
    print("-" * 50)
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Regex to find img tags and their src attributes
        img_tags = re.findall(r'<img[^>]+src=["\'](.*?)["\'][^>]*>', content)
        
        # Also grab the whole tag to check classes
        full_img_tags = re.findall(r'(<img[^>]+>)', content)
        
        if not img_tags:
            print("  [INFO] No images found in this file.")
            return

        all_passed = True
        
        for i, src in enumerate(img_tags):
            # Clean up path (handle ./images/ vs images/)
            clean_src = src.replace("./", "")
            
            # Check file existence
            if os.path.exists(clean_src):
                print(f"  [PASS] Found image: {src}")
            else:
                print(f"  [FAIL] Image missing: {src} (Checked path: {clean_src})")
                all_passed = False
                
            # Basic Layout/Overflow Check based on classes in the tag
            # This simulates visual checking: verifying constraints are applied.
            # We match the specific full tag corresponding to this src
            # Note: This regex matching is simple and assumes order. 
            # For a more robust check we would parse, but this suffices for a sanity check script.
            
            tag_content = full_img_tags[i] if i < len(full_img_tags) else ""
            
            if "w-full" in tag_content or "max-w" in tag_content or "w-" in tag_content or "h-" in tag_content:
                 print(f"       [PASS] Responsive classes detected (w-full/max-w/h-*). Low risk of overflow.")
            else:
                 # Small badges might not need w-full if they have explicit width/height
                 if "w-4" in tag_content and "h-4" in tag_content:
                      print(f"       [PASS] Fixed size detected (icon/badge). Safe.")
                 else:
                      print(f"       [WARN] Potential layout overflow? Tag classes: {tag_content}")

        if all_passed:
            print(f"\n  ✅ All visual assets in {file_path} are linked correctly.")
        else:
            print(f"\n  ❌ Some assets are missing in {file_path}.")

    except Exception as e:
        print(f"  [ERROR] Could not process {file_path}: {e}")

def main():
    print("Starting Visual Regression & Integrity Checks...")
    print("user_request: 'verify all images and check for overflows'")
    
    for html_file in FILES_TO_CHECK:
        check_image_existence(html_file)
        
if __name__ == "__main__":
    main()
