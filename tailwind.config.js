/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FCFBFB', // 기본 배경색
        section: '#E3E2E2', // 섹션 배경색
        primary: '#333333', // 주제색, 텍스트색
        secondary: '#CAC9C9', // 보조텍스트, 마우스 오버 시 배경색
        success: '#00472C', // 성공 상태 색상
        error: '#A30029', // 에러 상태 색상
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'], // Pretendard 폰트
      },
    },
  },
  plugins: [],
}
