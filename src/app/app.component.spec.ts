// // import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// // import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// // import { ActivatedRoute, convertToParamMap } from '@angular/router';
// // import { RouterTestingModule } from '@angular/router/testing';
// // import { Store } from '@ngrx/store';
// // import { AppComponent } from './app.component';
// //
// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AppComponent],
//       imports: [
//         RouterTestingModule,
//         ReactiveFormsModule
//       ],
//       providers: [
//         // {
//         //   provide: ActivatedRoute,
//         //   useValue: {
//         //     paramMap: new BehaviorSubject(
//         //       convertToParamMap({
//         //         id: user.id
//         //       })
//         //     )
//         //   }
//         // },
//         {
//           provide: Store,
//           useValue: {
//             dispatch: jest.fn(),
//             pipe: jest.fn(() => hot('-a', {a: user}))
//           }
//         // }
//       ]
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     store = TestBed.inject(Store);
//   });
//   //
//   // it('should match snapshot', () => {
//   //   fixture.detectChanges();
//   //   expect(fixture).toMatchSnapshot();
//   // });
//   //
//   // describe('ngOnInit', () => {
//   //   it('should dispatch SelectUser action for specified id parameter', () => {
//   //     const action = new SelectUser({ id: user.id });
//   //     const spy = jest.spyOn(store, 'dispatch');
//   //
//   //     fixture.detectChanges();
//   //
//   //     expect(spy).toHaveBeenCalledWith(action);
//   //   });
//   //
//   //   it('should dispatch LoadUser action for specified id parameter', () => {
//   //     const action = new LoadUser({ id: user.id });
//   //     const spy = jest.spyOn(store, 'dispatch');
//   //
//   //     fixture.detectChanges();
//   //
//   //     expect(spy).toHaveBeenCalledWith(action);
//   //   });
//   // });
//
//   describe('onUserChange', () => {
//     it('should dispatch the UpdateUser action when onUserChange is invoked', () => {
//       const updatedUser = generateUser();
//       const action = new UpdateUser({user: updatedUser});
//       const spy = jest.spyOn(store, 'dispatch');
//
//       fixture.detectChanges();
//
//       component.onUserChange(updatedUser);
//       expect(spy).toHaveBeenCalledWith(action);
//     });
//   });
// });
