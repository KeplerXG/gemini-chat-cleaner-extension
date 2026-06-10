import React from 'react';
import { useShortcut } from './useShortcut';
import { t } from '../../utils/translations';

export default function Popup() {
  const { triggerBulkDelete, loading } = useShortcut();

  if (loading) return null;

  return (
    <div className="p-3 bg-background-dark">
      <button
        type="button"
        onClick={triggerBulkDelete}
        className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        aria-label="Delete unpinned Gemini chats"
      >
        {t('deleteUnpinnedNow', 'en')}
      </button>
    </div>
  );
}
