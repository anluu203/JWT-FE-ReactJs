import  { forwardRef } from 'react';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import _ from 'lodash'
import { PRIMARY, RED, WHITE } from '@/helper/colors';

type Props = {
  fontWeight?: string;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize' | 'none';
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  theme?: 'submit' | 'add' | 'cancel'
} & LoadingButtonProps

const ButtonBase = forwardRef<HTMLButtonElement, Props>(
  (
    {
      fontWeight = 400,
      textTransform = 'none',
      theme = 'submit',
      sx,
      variant,
      ...props
    },
    ref
  ) => {
    const backgroundColor = () => {
      if(theme === 'submit') return WHITE
      else if (theme === 'cancel') return RED.LIGHT
      else if (theme === 'add') return PRIMARY.LIGHT
    }
    const color = () => {
      if(theme === 'submit') return PRIMARY.MEDIUM
      else if (theme === 'cancel') return WHITE
      else if (theme === 'add') return WHITE
    }
    const borderColor = () => {
      if(theme === 'submit') return PRIMARY.MEDIUM

    }
    const hoverColor = () => {
      if(theme === 'submit' || theme === 'cancel' ||theme === 'add' ) return WHITE
    }
    const backgroundHoverColor = () => {
      if(theme === 'submit') return PRIMARY.MEDIUM
      else if (theme === 'cancel') return RED.DARK
      else if (theme === 'add') return PRIMARY.DARK
    }
    const borderHoverColor = () => {
      if(theme === 'submit') return PRIMARY.MEDIUM
      else if (theme === 'cancel') return RED.LIGHT
      else if (theme === 'add') return PRIMARY.LIGHT
    }
    
    return (
      <LoadingButton
      ref={ref}
      variant={variant}
      style={{
        borderRadius: '4px',
      }}
      sx={_.merge(
        {
          ...{
            transition: 'all 0.2s linear',
            lineHeight: '20px',
            backgroundColor: backgroundColor(),
            color: color(),
            border: theme === 'submit' ? `1px solid ${borderColor()}` : 'none',
            '&:hover': {
              color: hoverColor(),
              backgroundColor: backgroundHoverColor(),
              border: `1px solid ${theme === 'submit' ? `1px solid ${borderHoverColor()}` : 'none'}`,
            },
            '&:disabled': {
              opacity: 0.7,
              cursor: 'not-allowed',
            },
            fontWeight,
            textTransform,
          },
        },
        sx
      )}
      {...props}
    />
    )
  }
);

export default ButtonBase;
