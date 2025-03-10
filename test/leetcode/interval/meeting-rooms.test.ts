import { canAttendMeetings } from '../../src/interval/meeting-rooms';

describe('meeting rooms', () => {
  test('meeting rooms - test case 1', async () => {
    expect(
      canAttendMeetings([
        [0, 30],
        [5, 10],
        [15, 20]
      ])
    ).toBe(false);
  });
});
