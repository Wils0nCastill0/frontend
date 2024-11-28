import { extendTheme, type ThemeConfig, type StyleFunctionProps } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
      },
      defaultProps: {
        size: 'md',
        variant: 'solid',
      },
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: 'gray.200',
            backgroundColor: 'gray.50',
            _dark: {
              borderColor: 'gray.600',
              backgroundColor: 'gray.800',
            },
          },
          td: {
            borderColor: 'gray.200',
            _dark: {
              borderColor: 'gray.600',
            },
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          backgroundColor: 'white',
          borderRadius: 'lg',
          boxShadow: 'sm',
          _dark: {
            backgroundColor: 'gray.800',
          },
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: 'lg',
        },
      },
    },
    Form: {
      baseStyle: {
        helperText: {
          color: 'gray.600',
          _dark: {
            color: 'gray.400',
          },
        },
      },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
      },
      '::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
      },
      '::-webkit-scrollbar-track': {
        bg: props.colorMode === 'light' ? 'gray.100' : 'gray.800',
      },
      '::-webkit-scrollbar-thumb': {
        bg: props.colorMode === 'light' ? 'gray.300' : 'gray.600',
        borderRadius: '5px',
        '&:hover': {
          bg: props.colorMode === 'light' ? 'gray.400' : 'gray.500',
        },
      },
    }),
  },
  layerStyles: {
    card: {
      bg: 'white',
      borderRadius: 'lg',
      boxShadow: 'sm',
      p: 6,
      _dark: {
        bg: 'gray.800',
      },
    },
    selected: {
      bg: 'brand.50',
      color: 'brand.900',
      _dark: {
        bg: 'brand.900',
        color: 'brand.50',
      },
    },
  },
  textStyles: {
    h1: {
      fontSize: ['2xl', '3xl'],
      fontWeight: 'bold',
      lineHeight: 'shorter',
      mb: 4,
    },
    h2: {
      fontSize: ['xl', '2xl'],
      fontWeight: 'semibold',
      lineHeight: 'short',
      mb: 3,
    },
    h3: {
      fontSize: ['lg', 'xl'],
      fontWeight: 'medium',
      lineHeight: 'base',
      mb: 2,
    },
  },
});
