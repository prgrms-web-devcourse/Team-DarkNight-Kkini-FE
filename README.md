# 보일러 플레이트

Next, TypeScript, ESLint, Stylelint, Commitlint, Prettier, Husky, Lint-Staged, nvmrc 설정

<br />
<br />

# 사용 방법

```
git clone https://github.com/metacode22/next-bolier-plate.git
nvm use
npm install
```

<br />
<br />

# 폴더 구조

```
📦src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂common
 ┣ 📂hooks
 ┣ 📂pages
 ┃ ┣ 📜_app.tsx
 ┃ ┣ 📜_document.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂recoil
 ┣ 📂types
 ┗ 📂utils
 ┃ ┣ 📂apis
 ┃ ┣ 📂constants
 ┃ ┣ 📂helpers
 ┃ ┗ 📂validations
```

<br />
<br />

# 코딩 컨벤션

- eslint, prettier 적용
- 커밋 메세지 일관성 위해 commitlint 적용
- emotion styled에 stylelint 적용
- husky, lint-staged를 통해 commit 시 eslint, stylelint, prettier 적용
- nvmrc로 node 버전 통일
- 절대 경로 사용

`example`

```typescript
import Text from 'components/Text'; // 절대 경로 사용

const Home = () => {
  return <div></div>;
};

export default Home;
```
