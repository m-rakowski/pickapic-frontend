// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular/types-6-0';
import { PostElementComponent } from './post-element.component';
import { onePost, postElementComponentImports } from './post-element.component.testdata';
import { moduleMetadata } from '@storybook/angular';

export default {
  title: 'PostElementComponent',
  component: PostElementComponent,
  decorators: [
    moduleMetadata({
      imports: postElementComponentImports,
    }),
  ],
} as Meta;

const Template: Story<PostElementComponent> = (args: PostElementComponent) => ({
  component: PostElementComponent,
  props: args,
});

export const OnePost = Template.bind({});
OnePost.args = {
  post: onePost,
};
