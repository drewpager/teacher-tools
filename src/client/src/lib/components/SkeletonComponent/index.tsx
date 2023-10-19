import { Skeleton } from '@mui/material';

type props = {
  width: number | string,
  height: number | string,
  variant: "rectangular" | "circular" | "text" | "rounded" | undefined
}

export const SkeletonComponent = ({ variant, width, height }: props) => {
  return (
    <Skeleton variant={variant} width={width} height={height} />
  )
}