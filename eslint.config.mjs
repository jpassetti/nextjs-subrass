import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
 ...nextVitals,
 {
  files: ["app/**/*.{js,jsx,ts,tsx}"],
  rules: {
   "@next/next/no-page-custom-font": "off",
  },
 },
];

export default eslintConfig;
