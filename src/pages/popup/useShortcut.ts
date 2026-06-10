import { useState, useEffect } from 'react';

export type ShortcutConfig = {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
};

export type AppConfig = {
  shortcut: ShortcutConfig;
  bulkDeleteShortcut: ShortcutConfig;
  enableTrashIcon: boolean;
  directDelete: boolean;
};

const isMac = navigator.userAgent.includes('Mac');
const DEFAULT_SHORTCUT: ShortcutConfig = {
  key: 'Backspace',
  ctrlKey: !isMac,
  metaKey: isMac,
  altKey: false,
  shiftKey: false,
};

const DEFAULT_BULK_SHORTCUT: ShortcutConfig = {
  key: 'Backspace',
  ctrlKey: !isMac,
  metaKey: isMac,
  altKey: false,
  shiftKey: true,
};

export const DEFAULT_CONFIG: AppConfig = {
  shortcut: DEFAULT_SHORTCUT,
  bulkDeleteShortcut: DEFAULT_BULK_SHORTCUT,
  enableTrashIcon: false,
  directDelete: true,
};

function normalizeConfig(config: Partial<AppConfig>): AppConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
    bulkDeleteShortcut: {
      ...DEFAULT_BULK_SHORTCUT,
      ...config.bulkDeleteShortcut,
    },
    enableTrashIcon: false,
    directDelete: true,
  };
}

export function useShortcut() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(['geminiQuickDeleteConfig', 'geminiQuickDeleteShortcut'], (result) => {
      const normalizedConfig = result.geminiQuickDeleteConfig
        ? normalizeConfig(result.geminiQuickDeleteConfig)
        : result.geminiQuickDeleteShortcut
          ? normalizeConfig({ shortcut: result.geminiQuickDeleteShortcut })
          : DEFAULT_CONFIG;

      chrome.storage.sync.set({ geminiQuickDeleteConfig: normalizedConfig });
      setLoading(false);
    });
  }, []);

  const triggerBulkDelete = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab?.id) return;
      chrome.tabs.sendMessage(tab.id, { type: 'BULK_DELETE_UNPINNED' });
    });
  };

  return { triggerBulkDelete, loading };
}
