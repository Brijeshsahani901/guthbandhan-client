import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Guthbandhan",
    siteDescription: "Find your perfect match",
    supportEmail: "support@Guthbandhan.com",
    maxPhotosPerUser: 6,
    requireEmailVerification: true,
    enableProfileVerification: true,
  });

  const [matchingSettings, setMatchingSettings] = useState({
    maxDistance: 100,
    ageRangeMin: 18,
    ageRangeMax: 80,
    showInactiveProfiles: false,
    matchingAlgorithmWeight: 0.8,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enablePushNotifications: true,
    dailyMatchDigest: true,
    messageNotifications: true,
    profileViewNotifications: true,
    marketingEmails: false,
  });

  const [moderationSettings, setModerationSettings] = useState({
    autoModeratePhotos: true,
    autoModerateMessages: true,
    profanityFilter: true,
    reportThreshold: 3,
    automaticSuspensionEnabled: true,
  });

  const handleSaveGeneral = () => {
    // Simulate API call
    toast.success("General settings saved successfully");
  };

  const handleSaveMatching = () => {
    // Simulate API call
    toast.success("Matching settings saved successfully");
  };

  const handleSaveNotifications = () => {
    // Simulate API call
    toast.success("Notification settings saved successfully");
  };

  const handleSaveModeration = () => {
    // Simulate API call
    toast.success("Moderation settings saved successfully");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Admin Settings</h1>

      <div className="space-y-6">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Site Name
              </label>
              <input
                type="text"
                value={generalSettings.siteName}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    siteName: e.target.value,
                  })
                }
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Site Description
              </label>
              <input
                type="text"
                value={generalSettings.siteDescription}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    siteDescription: e.target.value,
                  })
                }
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Support Email
              </label>
              <input
                type="email"
                value={generalSettings.supportEmail}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    supportEmail: e.target.value,
                  })
                }
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Max Photos per User
              </label>
              <input
                type="number"
                value={generalSettings.maxPhotosPerUser}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    maxPhotosPerUser: parseInt(e.target.value),
                  })
                }
                className="input"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="requireEmailVerification"
                checked={generalSettings.requireEmailVerification}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    requireEmailVerification: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="requireEmailVerification"
                className="ml-2 block text-sm text-neutral-700"
              >
                Require Email Verification
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableProfileVerification"
                checked={generalSettings.enableProfileVerification}
                onChange={(e) =>
                  setGeneralSettings({
                    ...generalSettings,
                    enableProfileVerification: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="enableProfileVerification"
                className="ml-2 block text-sm text-neutral-700"
              >
                Enable Profile Verification
              </label>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={handleSaveGeneral} className="btn-primary">
              Save General Settings
            </button>
          </div>
        </motion.div>

        {/* Matching Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Matching Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Maximum Distance (km)
              </label>
              <input
                type="number"
                value={matchingSettings.maxDistance}
                onChange={(e) =>
                  setMatchingSettings({
                    ...matchingSettings,
                    maxDistance: parseInt(e.target.value),
                  })
                }
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Minimum Age
              </label>
              <input
                type="number"
                value={matchingSettings.ageRangeMin}
                onChange={(e) =>
                  setMatchingSettings({
                    ...matchingSettings,
                    ageRangeMin: parseInt(e.target.value),
                  })
                }
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Maximum Age
              </label>
              <input
                type="number"
                value={matchingSettings.ageRangeMax}
                onChange={(e) =>
                  setMatchingSettings({
                    ...matchingSettings,
                    ageRangeMax: parseInt(e.target.value),
                  })
                }
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Matching Algorithm Weight
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="1"
                value={matchingSettings.matchingAlgorithmWeight}
                onChange={(e) =>
                  setMatchingSettings({
                    ...matchingSettings,
                    matchingAlgorithmWeight: parseFloat(e.target.value),
                  })
                }
                className="input"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showInactiveProfiles"
                checked={matchingSettings.showInactiveProfiles}
                onChange={(e) =>
                  setMatchingSettings({
                    ...matchingSettings,
                    showInactiveProfiles: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="showInactiveProfiles"
                className="ml-2 block text-sm text-neutral-700"
              >
                Show Inactive Profiles in Search
              </label>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={handleSaveMatching} className="btn-primary">
              Save Matching Settings
            </button>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableEmailNotifications"
                checked={notificationSettings.enableEmailNotifications}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    enableEmailNotifications: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="enableEmailNotifications"
                className="ml-2 block text-sm text-neutral-700"
              >
                Enable Email Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enablePushNotifications"
                checked={notificationSettings.enablePushNotifications}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    enablePushNotifications: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="enablePushNotifications"
                className="ml-2 block text-sm text-neutral-700"
              >
                Enable Push Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dailyMatchDigest"
                checked={notificationSettings.dailyMatchDigest}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    dailyMatchDigest: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="dailyMatchDigest"
                className="ml-2 block text-sm text-neutral-700"
              >
                Send Daily Match Digest
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="messageNotifications"
                checked={notificationSettings.messageNotifications}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    messageNotifications: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="messageNotifications"
                className="ml-2 block text-sm text-neutral-700"
              >
                Message Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="profileViewNotifications"
                checked={notificationSettings.profileViewNotifications}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    profileViewNotifications: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="profileViewNotifications"
                className="ml-2 block text-sm text-neutral-700"
              >
                Profile View Notifications
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketingEmails"
                checked={notificationSettings.marketingEmails}
                onChange={(e) =>
                  setNotificationSettings({
                    ...notificationSettings,
                    marketingEmails: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="marketingEmails"
                className="ml-2 block text-sm text-neutral-700"
              >
                Marketing Emails
              </label>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={handleSaveNotifications} className="btn-primary">
              Save Notification Settings
            </button>
          </div>
        </motion.div>

        {/* Moderation Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Moderation Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoModeratePhotos"
                checked={moderationSettings.autoModeratePhotos}
                onChange={(e) =>
                  setModerationSettings({
                    ...moderationSettings,
                    autoModeratePhotos: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="autoModeratePhotos"
                className="ml-2 block text-sm text-neutral-700"
              >
                Auto-Moderate Photos
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoModerateMessages"
                checked={moderationSettings.autoModerateMessages}
                onChange={(e) =>
                  setModerationSettings({
                    ...moderationSettings,
                    autoModerateMessages: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="autoModerateMessages"
                className="ml-2 block text-sm text-neutral-700"
              >
                Auto-Moderate Messages
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="profanityFilter"
                checked={moderationSettings.profanityFilter}
                onChange={(e) =>
                  setModerationSettings({
                    ...moderationSettings,
                    profanityFilter: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="profanityFilter"
                className="ml-2 block text-sm text-neutral-700"
              >
                Enable Profanity Filter
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Report Threshold for Review
              </label>
              <input
                type="number"
                value={moderationSettings.reportThreshold}
                onChange={(e) =>
                  setModerationSettings({
                    ...moderationSettings,
                    reportThreshold: parseInt(e.target.value),
                  })
                }
                className="input"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="automaticSuspensionEnabled"
                checked={moderationSettings.automaticSuspensionEnabled}
                onChange={(e) =>
                  setModerationSettings({
                    ...moderationSettings,
                    automaticSuspensionEnabled: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label
                htmlFor="automaticSuspensionEnabled"
                className="ml-2 block text-sm text-neutral-700"
              >
                Enable Automatic Suspensions
              </label>
            </div>
          </div>
          <div className="mt-6">
            <button onClick={handleSaveModeration} className="btn-primary">
              Save Moderation Settings
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
