import React, { useContext } from 'react';
import { withRoute } from 'services/routing/routerHOC';
import { TestimonyForm } from 'containers/Moderation/components/TestimonyForm';
import { OriginalStoryView } from 'containers/Moderation/components/OriginalStoryView';
import { useTranslation, Trans } from 'react-i18next';
import {
    useModerationContext,
    useModerationFiledChange,
    useModerateStorySubmit,
    useModerationStory,
    useSelectedTags
} from './moderationHooks';
import { useBack } from 'services/general/generalHooks';
import { useTags } from 'containers/Stories/storiesHooks';

import BackArrowIcon from 'src/media/icons/backArrow.svg';
import { getTagsAsArray } from 'services/general/generalHelpers';
import { Multiselect } from 'multiselect-react-dropdown';
import '../../scss/componentsStyle/moderationView.scss';

export const ModerationView = withRoute(props => {
    const { t } = useTranslation();
    const { moderationState } = useModerationContext();
    const { tagsMap } = useTags();
    const tags = getTagsAsArray(tagsMap);
    const { handleFieldChange } = useModerationFiledChange();
    const { onSelect, onRemove } = useSelectedTags();
    const { submitted, setSubmitted, handleSubmit } = useModerateStorySubmit();
    const { back } = useBack(props, setSubmitted, '/admin');

    //TODO: check
    const { originalStory, moderatedStory } = props.location.state;
    const valid_originalStory =
        originalStory !== null ? originalStory : moderatedStory;
    useModerationStory(moderatedStory, tagsMap);

    return (
        <>
            {submitted ? (
                <div className={'testimony-form'}>
                    <div className="submitted-success-heading">
                        {t('moderation.submittedSuccessHeading')}
                    </div>
                    <div className="submitted-success-text">
                        {t('moderation.submittedSuccessText')}
                    </div>
                    <div className="submitted-success-text">
                        {t('moderation.phoneMail') + valid_originalStory?.mail}
                    </div>
                    <button className={'submit-button'} onClick={back}>
                        {t('moderation.backToAdminPage')}
                    </button>
                </div>
            ) : (
                <div className={'testimony-form'}>
                    <header>
                        <BackArrowIcon
                            className={'back-arrow-icon'}
                            onClick={back}
                        />
                        <h1>{t('moderation.header')}</h1>
                    </header>
                    <div className="container">
                        {/* Col1 - right col */}
                        <div>
                            <OriginalStoryView
                                data={{ ...valid_originalStory }}
                            />
                        </div>
                        {/* Col2 - center col */}
                        <div>
                            <TestimonyForm
                                handleSubmit={handleSubmit}
                                handleFieldChange={handleFieldChange}
                                formData={{ ...moderationState }}
                                moderatedForm
                            />
                        </div>
                        {/* Col3 - left col */}
                        <div>
                            {t('moderation.moderationRulesHeader')}
                            <br></br>
                            <br></br>
                            <Trans i18nKey="moderation.moderationRules" />
                            <br></br>
                            <br></br>
                            <Multiselect
                                options={tags} // Options to display in the dropdown
                                selectedValues={moderationState?.tags} // Preselected value to persist in dropdown
                                onSelect={onSelect} // Function will trigger on select event
                                onRemove={onRemove} // Function will trigger on remove event
                                displayValue="name"
                                closeIcon="cancel"
                                placeholder={t('moderation.choseTags')}
                                avoidHighlightFirstOption
                                style={{
                                    chips: {
                                        background: '#ffffff',
                                        color: '#724BE4'
                                    },
                                    searchBox: {
                                        border: 'none',
                                        borderBottom: '1px solid blue',
                                        borderRadius: '0px',
                                        borderColor: '#724BE4'
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});
