import type { Meta, StoryObj } from '@storybook/angular';

import { CardModalComponent } from '../app/shared/pop-up-card/card-modal/card-modal.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<CardModalComponent> = {
    title: 'Components/Card',
    component: CardModalComponent,
};

export default meta;
type Story = StoryObj<CardModalComponent>;

export const deleteAccountCardModal: Story = {
    args: {
        title: 'Card',
        description: 'Card desc',
        icon_path: 'http://localhost:6006/assets/user-management-count.svg',
        cancel: 'Cancel',
        action: 'Delete Account'
    },
};


export const addNewUserCardModal: Story = {
    args: {
        title: 'Card',
        description: 'Card desc',
        icon_path: 'http://localhost:6006/assets/user-management-count.svg',
        cancel: 'Cancel',
        action: 'Delete Account'
    },
};