"""Encode the project PNG as a Windows/browser ICO with multiple resolutions."""
from pathlib import Path
from PIL import Image

assets = Path(__file__).resolve().parents[1] / 'dist' / 'assets'
with Image.open(assets / 'icon-1024.png') as icon:
    icon.convert('RGBA').save(
        assets.parent / 'favicon.ico',
        format='ICO',
        sizes=[(size, size) for size in (16, 24, 32, 48, 64, 128, 256)],
    )
print('Exported favicon.ico at 16, 24, 32, 48, 64, 128, and 256 pixels.')
