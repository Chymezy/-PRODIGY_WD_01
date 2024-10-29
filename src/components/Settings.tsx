import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { preferencesService } from '../services/api/preferences';

interface SettingsProps {
  onClose: () => void;
}

type FontSize = 'small' | 'medium' | 'large';

interface UserPreferences {
  darkMode: boolean;
  language: string;
  fontSize: FontSize;
  animations: boolean;
  notifications: boolean;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState<UserPreferences>({
    darkMode: false,
    language: 'en',
    fontSize: 'medium',
    animations: true,
    notifications: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setLoading(true);
        const response = await preferencesService.get();
        setPreferences(response.data.preferences);
      } catch (err) {
        setError('Failed to load preferences');
        console.error('Error loading preferences:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await preferencesService.update(preferences);
      onClose();
    } catch (err) {
      setError('Failed to save preferences');
      console.error('Error saving preferences:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {t('settings.title')}
        </h2>

        {error && (
          <div className="mb-4 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-700 dark:text-gray-200">
              {t('settings.darkMode')}
            </label>
            <input
              type="checkbox"
              checked={preferences.darkMode}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                darkMode: e.target.checked
              }))}
              className="form-checkbox h-5 w-5 text-purple-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              {t('settings.language')}
            </label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                language: e.target.value
              }))}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-2">
              {t('settings.fontSize')}
            </label>
            <select
              value={preferences.fontSize}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                fontSize: e.target.value as FontSize
              }))}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="small">{t('settings.fontSizes.small')}</option>
              <option value="medium">{t('settings.fontSizes.medium')}</option>
              <option value="large">{t('settings.fontSizes.large')}</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700 dark:text-gray-200">
              {t('settings.animations')}
            </label>
            <input
              type="checkbox"
              checked={preferences.animations}
              onChange={(e) => setPreferences(prev => ({
                ...prev,
                animations: e.target.checked
              }))}
              className="form-checkbox h-5 w-5 text-purple-600"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
          >
            {saving ? t('common.saving') : t('common.save')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings; 