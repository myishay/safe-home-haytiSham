import React from 'react';
import { useTranslation } from 'react-i18next';

import { withRoute } from 'services/routing/routerHOC';
import { Input } from 'components/Input';
import { Radio } from 'components/Radio';
import { TextArea } from 'components/TextArea';
import {
    useAddStoryContext,
    useCheckedContact,
    useFiledChange,
    useSubmit
} from './addStoryHooks';
import { useBack } from 'services/general/generalHooks';
import Skeleton from 'src/components/Skeleton';
import Content from 'src/components/Content';

export const AddStoryView = withRoute(props => {
    const { addStoryState } = useAddStoryContext();
    const { t } = useTranslation();
    const { checkedContact, handleCheckedContact } = useCheckedContact();
    const { handleFiledChange } = useFiledChange();
    const { submitted, setSubmitted, handleSubmit } = useSubmit();
    const { back } = useBack(props, setSubmitted);

    let wrapperClassName = 'testimony-form';
    if (submitted) {
        wrapperClassName += ' submitted';
    }

    const submittedMsg = (
        <React.Fragment>
            <h1>{t('addStoryView.submittedSuccessHeading')}</h1>
            <h2>{t('addStoryView.submittedSuccessText')}</h2>
            <button className={'submit-button'} onClick={back}>
                {t('backFromForm')}
            </button>
        </React.Fragment>
    );

    return (
        <Skeleton>
            <Content className={wrapperClassName}>
                {submitted ? (
                    submittedMsg
                ) : (
                    <React.Fragment>
                        <h1>{t('addStoryView.myConfession')}</h1>
                        <h2>{t('addStoryView.anonymity')}</h2>
                        <form
                            onSubmit={handleSubmit}
                            id={'addStoryForm'}
                            autoComplete="off"
                        >
                            <Input
                                name="name"
                                label={t('addStoryView.nameLabel')}
                                placeholder={t('addStoryView.namePlaceholder')}
                                value={addStoryState?.name}
                                onChange={e => handleFiledChange(e, 'name')}
                                required
                            />
                            <Input
                                name="mail"
                                label={t('addStoryView.mailLabel')}
                                placeholder={t('addStoryView.mailPlaceholder')}
                                value={addStoryState?.mail}
                                onChange={e => handleFiledChange(e, 'mail')}
                            />
                            <Radio
                                name="contact"
                                label={t('addStoryView.contactLabel')}
                                notes={t('addStoryView.contactNotes')}
                                checked={checkedContact}
                                options={[
                                    { value: 'yes', label: t('common.yes') },
                                    { value: 'no', label: t('common.no') }
                                ]}
                                onClick={e => handleCheckedContact(e)}
                            />
                            <TextArea
                                name="background"
                                placeholder=""
                                label={t('addStoryView.backgroundLabel')}
                                value={addStoryState?.background}
                                onChange={e => handleFiledChange(e, 'background')}
                                required
                            />
                            <TextArea
                                name="storyContent"
                                label={t('addStoryView.storyContentLabel')}
                                placeholder={t('addStoryView.storyContentPlaceholder')}
                                value={addStoryState?.storyContent}
                                onChange={e => handleFiledChange(e, 'storyContent')}
                                required
                            />
                            <TextArea
                                name="howDidYouManged"
                                label={t('addStoryView.howDidYouMangedLabel')}
                                placeholder={t('addStoryView.howDidYouMangedPlaceholder')}
                                value={addStoryState?.howDidYouManged}
                                onChange={e =>
                                    handleFiledChange(e, 'howDidYouManged')
                                }
                            />
                            <TextArea
                                name="whatHelpedYou"
                                label={t('addStoryView.whatHelpedYouLabel')}
                                placeholder={t('addStoryView.whatHelpedYouPlaceHolder')}
                                value={addStoryState?.whatHelpedYou}
                                onChange={e =>
                                    handleFiledChange(e, 'whatHelpedYou')
                                }
                            />
                            <TextArea
                                name="whatTriggeredChange"
                                label={t('addStoryView.whatTriggeredChangeLabel')}
                                placeholder={t('addStoryView.whatTriggeredChangePlaceHolder')}
                                value={addStoryState?.whatTriggeredChange}
                                onChange={e =>
                                    handleFiledChange(e, 'whatTriggeredChange')
                                }
                            />
                            <TextArea
                                name="additionalnfo"
                                placeholder={t('addStoryView.additionalnfoPlaceHolder')}
                                label={t('addStoryView.additionalnfoLabel')}
                                value={addStoryState?.additionalnfo}
                                onChange={e =>
                                    handleFiledChange(e, 'additionalnfo')
                                }
                            />
                            <input
                                className="submit-button"
                                type="submit"
                                value={t('submitForm')}
                            />
                        </form>
                    </React.Fragment>
                )}
            </Content>
        </Skeleton>
    );
});
