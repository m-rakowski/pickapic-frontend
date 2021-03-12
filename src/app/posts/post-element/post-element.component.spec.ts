import { render, screen } from '@testing-library/angular';
import { PostElementComponent } from './post-element.component';
import { onePost, postElementComponentImports } from './post-element.component.testdata';

describe('PostElementComponent', () => {
  function setup(): any {
    return render(PostElementComponent, {
      imports: postElementComponentImports,
      componentProperties: {
        post: onePost,
      },
    });
  }

  test('should render displayName', async () => {
    const component = await setup();
    screen.getByTestId('displayName');
  });
});
