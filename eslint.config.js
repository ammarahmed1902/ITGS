import js from '@eslint/js';
import tseslint from 'typescript-eslint';
export default tseslint.config(
 {ignores:['dist/**','.build/**','output/**','.playwright-cli/**','scripts/apply-remediation.cjs']},
 js.configs.recommended,
 ...tseslint.configs.recommended,
 {files:['**/*.{ts,tsx,js,mjs,cjs}'],languageOptions:{globals:{window:'readonly',document:'readonly',location:'readonly',localStorage:'readonly',fetch:'readonly',URL:'readonly',AbortSignal:'readonly',console:'readonly',process:'readonly',Buffer:'readonly',setTimeout:'readonly',clearTimeout:'readonly',requestAnimationFrame:'readonly',PerformanceObserver:'readonly',Image:'readonly',btoa:'readonly',HTMLElement:'readonly',Element:'readonly',HTMLAnchorElement:'readonly',HTMLIFrameElement:'readonly',MessageEvent:'readonly',MouseEvent:'readonly',KeyboardEvent:'readonly',Response:'readonly',require:'readonly',module:'readonly'}},rules:{'@typescript-eslint/no-unused-vars':['warn',{argsIgnorePattern:'^_',varsIgnorePattern:'^_'}],'@typescript-eslint/no-empty-function':'off'}},
);
