export type ThumbnailTheme = 'cyber-yellow' | 'crimson-red' | 'emerald-green' | 'tricolor' | 'dark-gold';

interface GenerateOptions {
  title: string;
  subtitle?: string;
  badgeText?: string;
  theme?: ThumbnailTheme;
  isLive?: boolean;
  category?: string;
}

export function generateBatchThumbnail(options: GenerateOptions): string {
  const {
    title = 'UC LIVE BATCH',
    subtitle = 'OFFICIAL ACCESS & UPDATES',
    badgeText = 'UC LIVE VERIFIED',
    theme = 'tricolor',
    isLive = true,
    category = 'PREMIUM'
  } = options;

  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');

  if (!ctx) return '';

  // Theme colors
  let primaryColor = '#FFE600'; // Neon Yellow
  let secondaryColor = '#FF2A55'; // Fiery Red
  let tertiaryColor = '#00F59B'; // Emerald Green
  let bgGradientStart = '#0A0B10';
  let bgGradientEnd = '#030305';

  if (theme === 'cyber-yellow') {
    primaryColor = '#FFE600';
    secondaryColor = '#EAB308';
    tertiaryColor = '#CA8A04';
    bgGradientStart = '#171302';
  } else if (theme === 'crimson-red') {
    primaryColor = '#FF2A55';
    secondaryColor = '#DC2626';
    tertiaryColor = '#FFE600';
    bgGradientStart = '#180408';
  } else if (theme === 'emerald-green') {
    primaryColor = '#00F59B';
    secondaryColor = '#059669';
    tertiaryColor = '#FFE600';
    bgGradientStart = '#021811';
  } else if (theme === 'dark-gold') {
    primaryColor = '#FBBF24';
    secondaryColor = '#D97706';
    tertiaryColor = '#F59E0B';
    bgGradientStart = '#161102';
  }

  // 1. Dark background
  const bgGrad = ctx.createLinearGradient(0, 0, 1280, 720);
  bgGrad.addColorStop(0, bgGradientStart);
  bgGrad.addColorStop(0.5, '#07080D');
  bgGrad.addColorStop(1, bgGradientEnd);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1280, 720);

  // 2. Cyber grid pattern
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.lineWidth = 1;
  const gridSize = 40;
  for (let x = 0; x < 1280; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 720);
    ctx.stroke();
  }
  for (let y = 0; y < 720; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1280, y);
    ctx.stroke();
  }

  // 3. Diagonal neon glow beams (Yellow, Red, Green)
  const glow1 = ctx.createRadialGradient(200, 150, 10, 200, 150, 500);
  glow1.addColorStop(0, 'rgba(255, 230, 0, 0.25)');
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, 1280, 720);

  const glow2 = ctx.createRadialGradient(1080, 550, 20, 1080, 550, 600);
  glow2.addColorStop(0, 'rgba(255, 42, 85, 0.25)');
  glow2.addColorStop(1, 'transparent');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, 1280, 720);

  const glow3 = ctx.createRadialGradient(640, 360, 10, 640, 360, 400);
  glow3.addColorStop(0, 'rgba(0, 245, 155, 0.12)');
  glow3.addColorStop(1, 'transparent');
  ctx.fillStyle = glow3;
  ctx.fillRect(0, 0, 1280, 720);

  // 4. Stylish Cyber geometric shapes & framing lines
  // Outer border with neon highlight corners
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, 1220, 660);

  // Neon Corners
  const cornerLen = 60;
  ctx.lineWidth = 5;

  // Top-left yellow corner
  ctx.strokeStyle = '#FFE600';
  ctx.beginPath();
  ctx.moveTo(30, 30 + cornerLen);
  ctx.lineTo(30, 30);
  ctx.lineTo(30 + cornerLen, 30);
  ctx.stroke();

  // Top-right red corner
  ctx.strokeStyle = '#FF2A55';
  ctx.beginPath();
  ctx.moveTo(1250 - cornerLen, 30);
  ctx.lineTo(1250, 30);
  ctx.lineTo(1250, 30 + cornerLen);
  ctx.stroke();

  // Bottom-left green corner
  ctx.strokeStyle = '#00F59B';
  ctx.beginPath();
  ctx.moveTo(30, 690 - cornerLen);
  ctx.lineTo(30, 690);
  ctx.lineTo(30 + cornerLen, 690);
  ctx.stroke();

  // Bottom-right yellow corner
  ctx.strokeStyle = '#FFE600';
  ctx.beginPath();
  ctx.moveTo(1250 - cornerLen, 690);
  ctx.lineTo(1250, 690);
  ctx.lineTo(1250, 690 - cornerLen);
  ctx.stroke();

  // 5. Brand Stamp: "UC LIVE" with Yellow Verified Check
  // Top left brand badge
  ctx.fillStyle = 'rgba(15, 17, 26, 0.85)';
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 2;
  roundRect(ctx, 70, 65, 240, 52, 10, true, true);

  // "UC LIVE" text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 24px "Outfit", "Arial Black", sans-serif';
  ctx.fillText('UC LIVE', 95, 100);

  // Yellow Verified Badge circle & checkmark
  ctx.beginPath();
  ctx.arc(220, 91, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#FFE600';
  ctx.fill();

  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(214, 91);
  ctx.lineTo(218, 96);
  ctx.lineTo(226, 86);
  ctx.stroke();

  // 6. Top Right Status Badge (e.g. LIVE NOW in Red or VERIFIED in Green)
  if (isLive) {
    // Red LIVE badge
    ctx.fillStyle = 'rgba(255, 42, 85, 0.95)';
    roundRect(ctx, 1020, 65, 190, 52, 12, true, false);

    // White dot
    ctx.beginPath();
    ctx.arc(1055, 91, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 20px "Outfit", sans-serif';
    ctx.fillText('LIVE NOW', 1075, 98);
  } else {
    // Green or Yellow Status
    ctx.fillStyle = 'rgba(0, 245, 155, 0.2)';
    ctx.strokeStyle = '#00F59B';
    ctx.lineWidth = 2;
    roundRect(ctx, 1000, 65, 210, 52, 12, true, true);

    ctx.fillStyle = '#00F59B';
    ctx.font = '800 18px "Outfit", sans-serif';
    ctx.fillText('ONLINE ACCESS', 1030, 98);
  }

  // 7. Middle Glass Panel for Content
  ctx.fillStyle = 'rgba(12, 15, 24, 0.65)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 70, 160, 1140, 480, 20, true, true);

  // Category Tag Pill
  ctx.fillStyle = 'rgba(255, 230, 0, 0.15)';
  ctx.strokeStyle = '#FFE600';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 110, 200, 200, 40, 8, true, true);

  ctx.fillStyle = '#FFE600';
  ctx.font = '700 16px "Chakra Petch", monospace';
  ctx.fillText(category.toUpperCase(), 130, 226);

  // Dynamic Tri-color accent bars
  const barGrad = ctx.createLinearGradient(110, 260, 700, 260);
  barGrad.addColorStop(0, '#FFE600'); // Yellow
  barGrad.addColorStop(0.5, '#FF2A55'); // Red
  barGrad.addColorStop(1, '#00F59B'); // Green
  ctx.fillStyle = barGrad;
  ctx.fillRect(110, 256, 320, 6);

  // Main Batch Title (Multi-line support if long)
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 58px "Outfit", sans-serif';
  
  const displayTitle = title.length > 30 ? title.substring(0, 28) + '...' : title;
  ctx.fillText(displayTitle, 110, 340);

  // Subtitle / Tagline
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
  const displaySubtitle = subtitle.length > 55 ? subtitle.substring(0, 52) + '...' : subtitle;
  ctx.fillText(displaySubtitle, 110, 400);

  // Features / Badges Pill list at bottom of card
  // Pill 1: Verified Yellow Check
  drawFeaturePill(ctx, 110, 460, '#FFE600', 'UC OFFICIAL ✓', 'rgba(255, 230, 0, 0.12)');
  // Pill 2: High Speed Webview / Direct
  drawFeaturePill(ctx, 310, 460, '#00F59B', 'HIGH SPEED 4K', 'rgba(0, 245, 155, 0.12)');
  // Pill 3: Instant Access
  drawFeaturePill(ctx, 510, 460, '#FF2A55', badgeText || 'INSTANT ACCESS', 'rgba(255, 42, 85, 0.12)');

  // 8. Cyber Graphic Watermark & Visual Lines on right side of panel
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 230, 0, 0.15)';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(1020, 380, 160, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 42, 85, 0.2)';
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(1020, 380, 120, -0.5, Math.PI * 1.5);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(0, 245, 155, 0.25)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(1020, 380, 80, 0.5, Math.PI * 1.8);
  ctx.stroke();

  // Center emblem text in circle
  ctx.fillStyle = '#FFE600';
  ctx.font = '900 36px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('UC', 1020, 375);
  ctx.font = '800 20px "Chakra Petch", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('LIVE', 1020, 405);
  ctx.restore();

  // Bottom Footer Bar in the panel
  ctx.fillStyle = '#6B7280';
  ctx.font = '500 18px "Chakra Petch", monospace';
  ctx.fillText('TELEGRAM • WEBVIEW • FAST STREAM • BOT SUPPORT', 110, 580);

  return canvas.toDataURL('image/png', 0.95);
}

function drawFeaturePill(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, text: string, bg: string) {
  ctx.save();
  ctx.fillStyle = bg;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, 180, 46, 8, true, true);

  ctx.fillStyle = color;
  ctx.font = '700 16px "Outfit", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(text, x + 90, y + 29);
  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill = false,
  stroke = true
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
