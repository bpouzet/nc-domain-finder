import { Platform } from 'react-native' ;
import { GlassView, isLiquidGlassAvailable } from 'expo-glass-effect' ;

import type { GlassViewProps } from 'expo-glass-effect' ;
import type { ReactNode } from 'react' ;

interface GlassViewComponentProps extends Omit<GlassViewProps, 'children'> {
  children: ReactNode
  fallback?: ReactNode
}

export default function GlassViewComponent({
  children,
  fallback,
  ...props
}: GlassViewComponentProps) {
  if (Platform.OS === 'ios' && isLiquidGlassAvailable()) {
    return (
      <GlassView {...props}>
        {children}
      </GlassView>
    ) ;
  }

  return fallback ? <>{fallback}</> : <>{children}</> ;
}