import type { Meta, StoryObj } from '@storybook/angular';

import { CardComponent } from '../app/shared/card/card.component';


//👇 This default export determines where your story goes in the story list
const meta: Meta<CardComponent> = {
    title: 'Components/Card',
    component: CardComponent,
};

export default meta;
type Story = StoryObj<CardComponent>;

export const userManagementCard: Story = {
    args: {
        title: 'Card',
        description: 'Card desc',
        description_continue: 'Card desc',
        icon_path: 'http://localhost:6006/assets/user-management-count.svg',
        total_number: '2500'
    },
};