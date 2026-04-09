import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function SplineScene({ scene, className }) {
  return (
    <Suspense fallback={null}>
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
