import { findRepeatedDnaSequences } from '../../src/sliding-window/repeated-dna-sequences';

describe('repeated dna sequences', () => {
  test('repeated dna sequences - test case 1', async () => {
    expect(findRepeatedDnaSequences('AAAAAAAAAAAAA')).toStrictEqual(['AAAAAAAAAA']);
  });

  test('repeated dna sequences - test case 2', async () => {
    expect(findRepeatedDnaSequences('AAAAAAAAAAA')).toStrictEqual(['AAAAAAAAAA']);
  });
});
