import React from "react";

interface SpinnerProps {
  size?: number; // px in height and width
  className?: string;
  ariaLabel?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 158,
  className = "",
  ariaLabel = "Loading spinner",
}) => (
  <svg
    viewBox="0 0 158 158"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label={ariaLabel}
    className={`animate-spin size-16 lg:size-auto ${className}`}
    width={size}
    height={size}
  >
    <g filter="url(#filter0_f_4389_26505)">
      <circle
        cx="78.2173"
        cy="80.7824"
        r="59.7826"
        transform="rotate(89.9328 78.2173 80.7824)"
        stroke="url(#paint0_linear_4389_26505)"
        strokeWidth="1.73913"
      />
    </g>
    <g style={{mixBlendMode: "overlay"}} filter="url(#filter1_f_4389_26505)">
      <circle
        cx="78.2173"
        cy="80.7824"
        r="59.7826"
        transform="rotate(89.9328 78.2173 80.7824)"
        stroke="url(#paint1_linear_4389_26505)"
        strokeWidth="4.78261"
      />
    </g>
    <g filter="url(#filter2_f_4389_26505)">
      <circle
        cx="78.6532"
        cy="78.6092"
        r="55.8696"
        transform="rotate(51.9935 78.6532 78.6092)"
        stroke="url(#paint2_linear_4389_26505)"
        strokeOpacity="0.8"
        strokeWidth="1.73913"
      />
    </g>
    <g style={{mixBlendMode: "overlay"}} filter="url(#filter3_f_4389_26505)">
      <circle
        cx="78.6532"
        cy="78.6092"
        r="55.8696"
        transform="rotate(51.9935 78.6532 78.6092)"
        stroke="url(#paint3_linear_4389_26505)"
        strokeWidth="4.78261"
      />
    </g>
    <g filter="url(#filter4_f_4389_26505)">
      <circle
        cx="54.1304"
        cy="54.1304"
        r="54.1304"
        transform="matrix(1 0 0 -1 26.6953 133.174)"
        stroke="url(#paint4_linear_4389_26505)"
        strokeWidth="1.73913"
      />
    </g>
    <g style={{mixBlendMode: "overlay"}} filter="url(#filter5_f_4389_26505)">
      <circle
        cx="54.1304"
        cy="54.1304"
        r="54.1304"
        transform="matrix(1 0 0 -1 26.6953 133.174)"
        stroke="url(#paint5_linear_4389_26505)"
        strokeWidth="4.78261"
      />
    </g>
    <g filter="url(#filter6_f_4389_26505)">
      <circle
        cx="81.2609"
        cy="82.5216"
        r="53.2609"
        stroke="url(#paint6_linear_4389_26505)"
        strokeOpacity="0.8"
        strokeWidth="1.73913"
      />
    </g>
    <g style={{mixBlendMode: "overlay"}} filter="url(#filter7_f_4389_26505)">
      <circle
        cx="81.2609"
        cy="82.5216"
        r="53.2609"
        stroke="url(#paint7_linear_4389_26505)"
        strokeWidth="4.78261"
      />
    </g>
    <g filter="url(#filter8_f_4389_26505)">
      <circle
        cx="78.2172"
        cy="81.6518"
        r="55.8696"
        stroke="url(#paint8_linear_4389_26505)"
        strokeOpacity="0.8"
        strokeWidth="1.73913"
      />
    </g>
    <g style={{mixBlendMode: "overlay"}} filter="url(#filter9_f_4389_26505)">
      <circle
        cx="78.2172"
        cy="81.6518"
        r="55.8696"
        stroke="url(#paint9_linear_4389_26505)"
        strokeWidth="4.78261"
      />
    </g>
    <g filter="url(#filter10_f_4389_26505)">
      <circle
        cx="77.1304"
        cy="81.8697"
        r="59.1304"
        stroke="url(#paint10_linear_4389_26505)"
        strokeOpacity="0.8"
        strokeWidth="1.73913"
      />
    </g>
    <g style={{mixBlendMode: "overlay"}} filter="url(#filter11_f_4389_26505)">
      <circle
        cx="77.1304"
        cy="81.8697"
        r="59.1304"
        stroke="url(#paint11_linear_4389_26505)"
        strokeWidth="4.78261"
      />
    </g>
    <g filter="url(#filter12_f_4389_26505)">
      <circle
        cx="78.6518"
        cy="79.9126"
        r="51.9565"
        stroke="url(#paint12_linear_4389_26505)"
        strokeOpacity="0.8"
        strokeWidth="1.73913"
      />
    </g>
    <g style={{mixBlendMode: "overlay"}} filter="url(#filter13_f_4389_26505)">
      <circle
        cx="78.6518"
        cy="79.9126"
        r="51.9565"
        stroke="url(#paint13_linear_4389_26505)"
        strokeWidth="4.78261"
      />
    </g>
    <defs>
      <filter
        id="filter0_f_4389_26505"
        x="16.2601"
        y="18.8255"
        width="123.913"
        height="123.913"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter1_f_4389_26505"
        x="14.7386"
        y="17.3041"
        width="126.956"
        height="126.956"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter2_f_4389_26505"
        x="20.6078"
        y="20.5628"
        width="116.091"
        height="116.092"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter3_f_4389_26505"
        x="19.0863"
        y="19.0414"
        width="119.134"
        height="119.136"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter4_f_4389_26505"
        x="24.5218"
        y="22.7386"
        width="112.609"
        height="112.609"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter5_f_4389_26505"
        x="23.0003"
        y="21.2171"
        width="115.652"
        height="115.653"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter6_f_4389_26505"
        x="25.8265"
        y="27.0873"
        width="110.868"
        height="110.869"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter7_f_4389_26505"
        x="24.305"
        y="25.5648"
        width="113.911"
        height="113.913"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter8_f_4389_26505"
        x="20.1742"
        y="23.6087"
        width="116.087"
        height="116.086"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter9_f_4389_26505"
        x="18.6527"
        y="22.0863"
        width="119.13"
        height="119.131"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter10_f_4389_26505"
        x="15.8265"
        y="20.5658"
        width="122.609"
        height="122.609"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter11_f_4389_26505"
        x="14.305"
        y="19.0433"
        width="125.652"
        height="125.653"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter12_f_4389_26505"
        x="24.5218"
        y="25.7826"
        width="108.261"
        height="108.26"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <filter
        id="filter13_f_4389_26505"
        x="23.0003"
        y="24.2601"
        width="111.304"
        height="111.305"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur
          stdDeviation="0.652174"
          result="effect1_foregroundBlur_4389_26505"
        />
      </filter>
      <linearGradient
        id="paint0_linear_4389_26505"
        x1="24.4776"
        y1="115.961"
        x2="26.5683"
        y2="33.2003"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_4389_26505"
        x1="23.4165"
        y1="44.9128"
        x2="153.753"
        y2="63.0151"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8AE6CF" />
        <stop offset="1" stopColor="#7C3AE7" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_4389_26505"
        x1="39.088"
        y1="119.696"
        x2="30.3216"
        y2="50.6744"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#0500FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_4389_26505"
        x1="27.4395"
        y1="45.0875"
        x2="149.244"
        y2="62.0048"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8AE6CF" />
        <stop offset="1" stopColor="#7C3AE7" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_4389_26505"
        x1="5.47167"
        y1="85.9834"
        x2="70.7409"
        y2="26.9675"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_4389_26505"
        x1="4.51087"
        y1="21.6522"
        x2="122.524"
        y2="38.0429"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8AE6CF" />
        <stop offset="1" stopColor="#7C3AE7" />
      </linearGradient>
      <linearGradient
        id="paint6_linear_4389_26505"
        x1="43.543"
        y1="121.69"
        x2="38.1347"
        y2="50.8238"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint7_linear_4389_26505"
        x1="32.4384"
        y1="50.5651"
        x2="148.556"
        y2="66.6925"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8AE6CF" />
        <stop offset="1" stopColor="#7C3AE7" />
      </linearGradient>
      <linearGradient
        id="paint8_linear_4389_26505"
        x1="38.652"
        y1="122.739"
        x2="29.8856"
        y2="53.717"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#0500FF" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint9_linear_4389_26505"
        x1="27.0035"
        y1="48.1301"
        x2="148.808"
        y2="65.0474"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8AE6CF" />
        <stop offset="1" stopColor="#7C3AE7" />
      </linearGradient>
      <linearGradient
        id="paint10_linear_4389_26505"
        x1="35.256"
        y1="125.355"
        x2="86.1035"
        y2="65.9942"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint11_linear_4389_26505"
        x1="22.9275"
        y1="46.3914"
        x2="151.842"
        y2="64.2962"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8AE6CF" />
        <stop offset="1" stopColor="#7C3AE7" />
      </linearGradient>
      <linearGradient
        id="paint12_linear_4389_26505"
        x1="41.8577"
        y1="118.122"
        x2="26.6953"
        y2="56.9447"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient
        id="paint13_linear_4389_26505"
        x1="31.025"
        y1="48.7387"
        x2="144.299"
        y2="64.4712"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#8AE6CF" />
        <stop offset="1" stopColor="#7C3AE7" />
      </linearGradient>
    </defs>
  </svg>
);

export const SpinnerGrey: React.FC<SpinnerProps> = ({
  size = 40,
  className = "",
  ariaLabel = "Loading",
}) => (
  <svg
    role="status"
    aria-label={ariaLabel}
    className={`animate-spin ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="1"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

export const Preloader: React.FC = () => {
  return (
    <main
      className={`preloader-bg fixed left-0 top-0 z-[99999] w-full h-full flex justify-center items-center`}
    >
      <Spinner />
    </main>
  );
};

export const SectionLoader: React.FC = () => {
  return (
    <main
      className={`preloader-bg z-[99999] w-full h-full flex justify-center items-center rounded-sm`}
    >
      <Spinner size={200} />
    </main>
  );
};
