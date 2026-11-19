"""Regenerate Swyft logo assets from Colin's source wordmark PNG.

Usage (needs: pip install pillow numpy potracer cairosvg):
    python scripts/brand/make_logo_assets.py <source-logo.png> public/assets

Outputs: logo.png, logo-white.png, logo.svg, logo-white.svg, favicon.svg,
favicon.ico, favicon-32.png, apple-touch-icon.png, og-default.png.
Letterforms are never redrawn: the PNGs are an alpha knockout of the source
and the SVG is a potrace of that alpha (checked against the PNG by IoU).
"""
import io, sys
import numpy as np
import potrace, cairosvg
from PIL import Image, ImageDraw, ImageFont

src, out = sys.argv[1], sys.argv[2]
BG = (11, 13, 11)  # site --bg
FONT = '/usr/share/fonts/truetype/sand-box/google/Inter/Inter-VariableFont_opsz,wght.ttf'

# ---- 1. knockout white background -> alpha, tight crop ----
rgb = np.asarray(Image.open(src).convert('RGB')).astype(np.float64)
L = rgb.mean(axis=2)
ink = rgb[L < 90].mean(axis=0)
a = np.clip((255 - L) / (255 - ink.mean()), 0, 1)
a[a < 0.02] = 0
ys, xs = np.where(a > 0.5)
pad = 12
a = a[max(ys.min() - pad, 0):ys.max() + pad + 1, max(xs.min() - pad, 0):xs.max() + pad + 1]
H, W = a.shape
A = (a * 255).round().astype(np.uint8)
DARK = tuple(int(round(c)) for c in ink)

def rgba(color, alpha=A):
    arr = np.zeros(alpha.shape + (4,), np.uint8)
    arr[..., :3] = color
    arr[..., 3] = alpha
    return Image.fromarray(arr, 'RGBA')

dark_png, white_png = rgba(DARK), rgba((255, 255, 255))
dark_png.save(f'{out}/logo.png', optimize=True)
white_png.save(f'{out}/logo-white.png', optimize=True)

# ---- 2. SVG trace ----
curves = potrace.Bitmap(a <= 0.5).trace(turdsize=10, alphamax=1.0, opticurve=True, opttolerance=0.2)

def path_d(cs):
    d = []
    for c in cs:
        s = c.start_point
        d.append(f'M{s.x:.2f} {s.y:.2f}')
        for seg in c.segments:
            if seg.is_corner:
                d.append(f'L{seg.c.x:.2f} {seg.c.y:.2f}L{seg.end_point.x:.2f} {seg.end_point.y:.2f}')
            else:
                d.append(f'C{seg.c1.x:.2f} {seg.c1.y:.2f} {seg.c2.x:.2f} {seg.c2.y:.2f} {seg.end_point.x:.2f} {seg.end_point.y:.2f}')
        d.append('Z')
    return ''.join(d)

D = path_d(curves)
hexc = '#%02x%02x%02x' % DARK
for name, fill in [('logo.svg', hexc), ('logo-white.svg', '#ffffff')]:
    open(f'{out}/{name}', 'w').write(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Swyft logo">'
        f'<title>Swyft logo</title><path fill="{fill}" fill-rule="evenodd" d="{D}"/></svg>\n')
r = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(url=f'{out}/logo.svg', output_width=W, output_height=H))))[..., 3] > 127
m = a > 0.5
print(f'SVG trace IoU vs PNG: {(m & r).sum() / (m | r).sum():.4f}')

# ---- 3. favicon: the "S" from the wordmark, white on a dark rounded square ----
s_curve = min(curves, key=lambda c: min([c.start_point.x] + [sg.end_point.x for sg in c.segments]))
s_mask = np.asarray(Image.open(io.BytesIO(cairosvg.svg2png(bytestring=(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}"><path d="{path_d([s_curve])}"/></svg>').encode(),
    output_width=W, output_height=H))))[..., 3] > 0
sy, sx = np.where(s_mask)
bx0, by0, bx1, by1 = sx.min(), sy.min(), sx.max() + 1, sy.max() + 1
bw, bh = bx1 - bx0, by1 - by0
side = 64
scale = side * 0.78 / bw  # S is wider than tall; fit width
tx, ty = (side - bw * scale) / 2 - bx0 * scale, (side - bh * scale) / 2 - by0 * scale
fav_svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side} {side}">'
           f'<rect width="{side}" height="{side}" rx="14" fill="#0b0d0b"/>'
           f'<path fill="#ffffff" transform="translate({tx:.3f} {ty:.3f}) scale({scale:.5f})" d="{path_d([s_curve])}"/></svg>\n')
open(f'{out}/favicon.svg', 'w').write(fav_svg)
big = Image.open(io.BytesIO(cairosvg.svg2png(bytestring=fav_svg.encode(), output_width=256, output_height=256))).convert('RGBA')
big.resize((32, 32), Image.LANCZOS).save(f'{out}/favicon-32.png', optimize=True)
big.save(f'{out}/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])

# ---- 4. apple-touch-icon: full white wordmark on dark square ----
side = 180
icon = Image.new('RGBA', (side, side), BG + (255,))
lw = int(side * 0.80)
lh = round(H * lw / W)
icon.alpha_composite(white_png.resize((lw, lh), Image.LANCZOS), ((side - lw) // 2, (side - lh) // 2))
icon.convert('RGB').save(f'{out}/apple-touch-icon.png', optimize=True)

# ---- 5. Open Graph image 1200x630 ----
OW, OH = 1200, 630
yy, xx = np.mgrid[0:OH, 0:OW].astype(np.float64)
glow = np.exp(-(((xx - 620) / 520) ** 2 + ((yy + 40) / 330) ** 2))
base = np.array(BG, np.float64)
tint = np.array([62, 92, 18], np.float64)
img = base + glow[..., None] * (tint - base) * 0.85
grid = ((xx % 56) < 1) | ((yy % 56) < 1)
img[grid] = img[grid] * 0.75 + np.array([40, 52, 36]) * 0.25
og = Image.fromarray(img.clip(0, 255).astype(np.uint8), 'RGB').convert('RGBA')

lw = 260
lh = round(H * lw / W)
og.alpha_composite(white_png.resize((lw, lh), Image.LANCZOS), (80, 76))

def font(size, wght):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_axes([min(32, max(14, size / 3)), wght])
    except Exception:
        pass
    return f

d = ImageDraw.Draw(og)
d.text((80, 150), 'Every channel.', font=font(96, 750), fill=(241, 245, 236))
# gradient headline line 2
line2 = 'One growth engine.'
f2 = font(96, 750)
mask = Image.new('L', (OW, 130), 0)
ImageDraw.Draw(mask).text((80, 0), line2, font=f2, fill=255)
gx = np.linspace(0, 1, OW)[None, :, None]
grad = (np.array([195, 245, 60]) * (1 - gx) + np.array([62, 230, 180]) * gx) * np.ones((130, 1, 1))
gimg = Image.fromarray(grad.astype(np.uint8), 'RGB').convert('RGBA')
gimg.putalpha(mask)
og.alpha_composite(gimg, (0, 262))
d.text((80, 410), 'Marketing for pest control & route-based businesses', font=font(34, 600), fill=(241, 245, 236))
d.text((80, 476), 'Door-to-door sales teams · Cold calling · Local SEO · Meta & Google ads', font=font(25, 400), fill=(163, 173, 159))
d.text((80, 544), 'swyft-hq.com', font=font(27, 650), fill=(195, 245, 60))
og.convert('RGB').save(f'{out}/og-default.png', optimize=True)
print('done', DARK, (W, H))
