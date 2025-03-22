import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// テストライブラリのクリーンアップをafterEachで実行
afterEach(() => {
  cleanup();
});

// カスタムマッチャーを追加
expect.extend(matchers);

// グローバル設定やモックがあれば追加する場所
