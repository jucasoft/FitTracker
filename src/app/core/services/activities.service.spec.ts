import { TestBed } from '@angular/core/testing';
import { Activity } from 'src/app/_models/activity';
import { ACTIVITIES } from 'src/assets/mock-activities';
import { ActivitiesService } from './activities.service';



describe('ActivitiesService', () => {
  let serviceUnderTest: ActivitiesService;
  let actualResult: Activity[];
  let expectedResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [ ActivitiesService ],
    });

    serviceUnderTest = TestBed.inject(ActivitiesService);
    actualResult = undefined;
  });

  describe('METHOD: getActivities', () => {
    When(() => {
      actualResult = serviceUnderTest.getActivities();
    });
    describe('GIVEN activities are queried', () => {
      Given(() => {
        // no config in this case. Integration test with real list at the moment
      });
      Then('Instantiate list of activities',() => {
        expect(actualResult).toEqual(ACTIVITIES);
      });
    });
  });

  describe('METHOD: addActivity', () => {
    When(() => {
      actualResult = serviceUnderTest.addActivity(fakePartialActivity);
    });
    describe('GIVEN new activity', () => {
      Given(() => {
        // pass a clone in order not to "pass by reference"
        serviceUnderTest.activities = [...fakeActivities];
      });
      Then('Activity is added',() => {
        let randomizedId = serviceUnderTest.activities[serviceUnderTest.activities.length-1].id
        let addedActivity: Activity = { id: randomizedId, ...fakePartialActivity };
        expectedResult = [...fakeActivities, addedActivity];
        expect(actualResult).toEqual(expectedResult);
      });
    });
  });

  describe('METHOD: deleteActivity', () => {
    When(() => {
      actualResult = serviceUnderTest.deleteActivity(idToDelete);
    });
    describe('GIVEN id to delete', () => {

      Given(() => {
        serviceUnderTest.activities = [...fakeActivities];
      });
      Then('Activity is deleted',() => {
        expectedResult = fakeActivities.filter(
          (activity) => activity.id !== idToDelete
        )
        expect(actualResult).toEqual(expectedResult);
      });
    });
  });
});

const fakeActivities: Activity[] = [
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
  {
    id: 3,
    date: new Date(2021, 2, 3),
    type: 'climbing',
    duration: 35,
  },
];

const fakePartialActivity: Omit<Activity, 'id'> = {
  date: new Date(2021, 2, 4),
  type: 'swimming',
  duration: 30,
};

const idToDelete: number = 2;


// PRE-BUILT TESTS
describe('(old)ActivitiesService', () => {
  let service: ActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
