import React from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { useTranslation } from 'react-i18next';
import { ModerationForm } from 'containers/Moderation/components/ModerationForm';

export const EditOriginalStoryView = withRoute(
    ({ handleSubmit, handleFieldChange, formData, disabled }) => {
        const { t } = useTranslation();

        return (
            <div className="edit-container">
                <div className="edit-header">{t('moderation.editHeader')}</div>
                <ModerationForm
                    handleSubmit={handleSubmit}
                    handleFieldChange={handleFieldChange}
                    formData={formData}
                    id={'EditOriginalStoryView'}
                />
            </div>
        );
    }
);
