import { memo, SVGProps } from 'react';

const UnionIcon2 = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 440 409' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      opacity={0.5}
      fillRule='evenodd'
      clipRule='evenodd'
      d='M222.714 65.6346L0 238.615L131.883 408.415L354.597 235.434C401.268 199.185 409.716 131.966 373.467 85.2948C337.218 38.624 269.998 30.1754 223.328 66.4244L222.714 65.6346Z'
      fill='#FC8019'
    />
  </svg>
);

const Memo = memo(UnionIcon2);
export { Memo as UnionIcon2 };
