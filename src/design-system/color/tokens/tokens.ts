import {colors} from "@/design-system/color/base/colors";

// Base semantic color tokens
export const colorTokens = {
    // Primary semantic colors - main brand colors
    primary: colors.primary[500],
    secondary: colors.secondary[500],
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
    info: colors.info[500],

    // Text color tokens - for different text hierarchies
    text: {
        primary: colors.neutral[900],     // Main text - highest contrast
        secondary: colors.neutral[600],   // Secondary text - medium contrast
        tertiary: colors.neutral[400],    // Tertiary text - lower contrast
        inverse: colors.neutral[50],      // Text on dark backgrounds
        disabled: colors.neutral[300],    // Disabled text
        placeholder: colors.neutral[400], // Placeholder text
    },

    // Background color tokens
    background: {
        primary: colors.neutral[50],      // Main background
        secondary: colors.neutral[100],   // Card/section backgrounds
        tertiary: colors.neutral[200],    // Subtle background variations
        inverse: colors.neutral[900],     // Dark backgrounds
        overlay: colors.neutral[800],     // Modal/overlay backgrounds
        surface: '#ffffff',               // Pure white surface
    },

    // Border color tokens
    border: {
        primary: colors.neutral[200],     // Default border
        secondary: colors.neutral[300],   // Stronger borders
        tertiary: colors.neutral[100],    // Subtle borders
        focus: colors.primary[500],       // Focus state borders
        error: colors.error[300],         // Error state borders
        success: colors.success[300],     // Success state borders
        warning: colors.warning[300],     // Warning state borders
    },

    // Interactive state tokens
    interactive: {
        // Primary button states
        primary: {
            default: colors.primary[500],
            hover: colors.primary[600],
            active: colors.primary[700],
            disabled: colors.neutral[300],
        },

        // Secondary button states
        secondary: {
            default: colors.neutral[100],
            hover: colors.neutral[200],
            active: colors.neutral[300],
            disabled: colors.neutral[100],
        },

        // Link states
        link: {
            default: colors.primary[600],
            hover: colors.primary[700],
            visited: colors.primary[800],
        },
    },

    // Status/feedback tokens
    status: {
        success: {
            background: colors.success[50],
            border: colors.success[200],
            text: colors.success[800],
            icon: colors.success[600],
        },

        warning: {
            background: colors.warning[50],
            border: colors.warning[200],
            text: colors.warning[800],
            icon: colors.warning[600],
        },

        error: {
            background: colors.error[50],
            border: colors.error[200],
            text: colors.error[800],
            icon: colors.error[600],
        },

        info: {
            background: colors.info[50],
            border: colors.info[200],
            text: colors.info[800],
            icon: colors.info[600],
        },
    },

    // Shadow tokens
    shadow: {
        sm: 'rgba(0, 0, 0, 0.05)',
        default: 'rgba(0, 0, 0, 0.1)',
        md: 'rgba(0, 0, 0, 0.15)',
        lg: 'rgba(0, 0, 0, 0.2)',
        xl: 'rgba(0, 0, 0, 0.25)',
    },
} as const;

// Light and dark theme tokens
export const lightTheme = {
    ...colorTokens,
    background: {
        ...colorTokens.background,
        primary: '#ffffff',
        secondary: colors.neutral[50],
        tertiary: colors.neutral[100],
    },
    text: {
        ...colorTokens.text,
        primary: colors.neutral[900],
        secondary: colors.neutral[700],
    },
};

export const darkTheme = {
    ...colorTokens,
    background: {
        ...colorTokens.background,
        primary: colors.neutral[900],
        secondary: colors.neutral[800],
        tertiary: colors.neutral[700],
        surface: colors.neutral[800],
    },
    text: {
        ...colorTokens.text,
        primary: colors.neutral[50],
        secondary: colors.neutral[300],
        tertiary: colors.neutral[400],
        inverse: colors.neutral[900],
    },
    border: {
        ...colorTokens.border,
        primary: colors.neutral[700],
        secondary: colors.neutral[600],
        tertiary: colors.neutral[800],
    },
};

// Component-specific tokens
export const componentTokens = {
    button: {
        primary: {
            background: colorTokens.interactive.primary.default,
            backgroundHover: colorTokens.interactive.primary.hover,
            backgroundActive: colorTokens.interactive.primary.active,
            text: colorTokens.text.inverse,
            border: 'transparent',
        },
        secondary: {
            background: 'transparent',
            backgroundHover: colorTokens.interactive.secondary.hover,
            backgroundActive: colorTokens.interactive.secondary.active,
            text: colorTokens.text.primary,
            border: colorTokens.border.primary,
        },
        ghost: {
            background: 'transparent',
            backgroundHover: colorTokens.interactive.secondary.hover,
            backgroundActive: colorTokens.interactive.secondary.active,
            text: colorTokens.text.primary,
            border: 'transparent',
        },
    },

    input: {
        background: colorTokens.background.surface,
        border: colorTokens.border.primary,
        borderFocus: colorTokens.border.focus,
        borderError: colorTokens.border.error,
        text: colorTokens.text.primary,
        placeholder: colorTokens.text.placeholder,
    },

    card: {
        background: colorTokens.background.surface,
        border: colorTokens.border.primary,
        shadow: colorTokens.shadow.default,
    },

    modal: {
        background: colorTokens.background.surface,
        overlay: `${colorTokens.background.overlay}CC`, // Add opacity
        border: colorTokens.border.secondary,
        shadow: colorTokens.shadow.xl,
    },
};

// Type definitions
export type ColorTokens = typeof colorTokens;
export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
export type ComponentTokens = typeof componentTokens;