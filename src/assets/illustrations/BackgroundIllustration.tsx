import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

function BackgroundIllustration() {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  return (
    <>
      <defs>
        <linearGradient id="BG" x1="19.496%" x2="77.479%" y1="71.822%" y2="16.69%">
          <stop offset="0%" stopColor={PRIMARY_MAIN} />
          <stop offset="100%" stopColor={PRIMARY_MAIN} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        fill="url(#BG)"
        fillRule="nonzero"
        d="M0 198.78c0 41.458 14.945 79.236 39.539 107.786 28.214 32.765 69.128 53.365 114.734 53.434a148.44 148.44 0 0056.495-11.036c9.051-3.699 19.182-3.274 27.948 1.107a75.779 75.779 0 0033.957 8.01c5.023 0 9.942-.494 14.7-1.433 13.58-2.67 25.94-8.99 36.09-17.94 6.378-5.627 14.547-8.456 22.897-8.446h.142c27.589 0 53.215-8.732 74.492-23.696 19.021-13.36 34.554-31.696 44.904-53.224C474.92 234.58 480 213.388 480 190.958c0-76.93-59.774-139.305-133.498-139.305-7.516 0-14.88.663-22.063 1.899C305.418 21.42 271.355 0 232.499 0a103.651 103.651 0 00-45.88 10.661c-13.24 6.487-25.011 15.705-34.64 26.939-32.698.544-62.931 11.69-87.676 30.291C25.351 97.155 0 144.882 0 198.781z"
        opacity="0.2"
      />
    </>
  );
}

export default memo(BackgroundIllustration);
