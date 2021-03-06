import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { provideAutoSpy, Spy } from 'jasmine-auto-spies';
import { Component, Input } from '@angular/core';

import { ActivitiesPageComponent } from './activities-page.component';
import { Activity } from 'src/app/_models/activity';

describe('ActivitiesPageComponent', () => {
  let componentUnderTest: ActivitiesPageComponent;
  let activitiesServiceSpy: Spy<ActivitiesService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [ActivitiesPageComponent, provideAutoSpy(ActivitiesService)],
    });

    componentUnderTest = TestBed.inject(ActivitiesPageComponent);
    activitiesServiceSpy = TestBed.inject<any>(ActivitiesService);
  });

  describe('INIT', () => {
    let fakeActivities: Activity[] = createFakeActivities()
    When(() => {
      componentUnderTest.ngOnInit();
    });

    describe('GIVEN initalization THEN populate array', () => {
      Given(() => {
        activitiesServiceSpy.getActivities.and.returnValue(fakeActivities);
      });
      Then('populate array', () => {
        expect(componentUnderTest.activities).toEqual(fakeActivities);
      });
    });

    /* This is how I WOULD test a local 'isLogged$' property, provided as follows:
     * { provide: LoginService, useValue: createSpyFromClass(LoginService, { gettersToSpyOn: ['isLogged$'] })}
     *  More details here: https://members.hirez.io/post/testing-a-private-behaviorsubject-in-a-service-60272fa5eb0f0f5226f4b9f0
     */
    // describe('GIVEN initalization THEN login is false', () => {
    //   Given(() => {
    //     loginServiceSpy.accessorSpies.getters.isLogged$.and.returnValue(of(false));
    //   });
    //   Then('check isLogged$', () => {
    //     componentUnderTest.isLogged$.subscribe((value: boolean) => {
    //       expect(value).toBeFalse();
    //     });
    //   });
    // });
  });

  describe('METHOD: onNewActivity', () => {
    let fakePartialActivity: Omit<Activity, 'id'> = createFakePartialActivity();
    When(() => {
      componentUnderTest.onNewActivity(fakePartialActivity);
    });

    Then('Add activity to the list', () => {
      expect(activitiesServiceSpy.addActivity).toHaveBeenCalledWith(
        fakePartialActivity
      );
    });
  });

  describe('METHOD: onDeleteActivity', () => {
    let fakeId: number = createFakeId();
    When(() => {
      componentUnderTest.onDeleteActivity(fakeId);
    });

    describe('GIVEN confirm window is accepted', () => {
      Given(() => {
        spyOn(window, 'confirm').and.returnValue(true);
      });
      Then('delete activity from the list', () => {
        expect(activitiesServiceSpy.deleteActivity).toHaveBeenCalledWith(
          fakeId
        );
      });
    });

    describe('GIVEN confirm window is declined', () => {
      Given(() => {
        spyOn(window, 'confirm').and.returnValue(false);
      });
      Then('delete activity from the list', () => {
        expect(activitiesServiceSpy.deleteActivity).not.toHaveBeenCalled();
      });
    });
  });
});

// PRE-BUILT TESTS
describe('(old)ActivitiesPageComponent', () => {
  let componentUnderTest: ActivitiesPageComponent;
  let fixture: ComponentFixture<ActivitiesPageComponent>;

  beforeEach(async () => {
    @Component({ selector: 'app-activities-forms', template: '' })
    class FakeActivitiesFormsComponent {
      @Input() activities: Activity[];
    }
    @Component({ selector: 'app-activities-list', template: '' })
    class FakeActivitiesListComponent {
      @Input() activities: Activity[];
      @Input() isLogged: boolean;
    }
    @Component({ selector: 'app-activities-stats', template: '' })
    class FakeActivitiesStatsComponent {
      @Input() activities: Activity[];
    }

    await TestBed.configureTestingModule({
      declarations: [
        ActivitiesPageComponent,
        FakeActivitiesFormsComponent,
        FakeActivitiesListComponent,
        FakeActivitiesStatsComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesPageComponent);
    componentUnderTest = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componentUnderTest).toBeTruthy();
  });
});

function createFakeActivities(): Activity[] {
  return [
    {
      id: 1,
      date: new Date(2021, 2, 1),
      type: 'stretching',
      duration: 90,
    },
    {
      id: 2,
      date: new Date(2021, 2, 2),
      type: 'running',
      duration: 35,
    },
  ]
}

function createFakePartialActivity(): Omit<Activity, 'id'> {
  return {
    date: new Date(2021, 2, 2),
    type: 'running',
    duration: 30,
  }
}

function createFakeId() {
  return 1;
}
