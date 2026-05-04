import { describe, it, expect } from 'vitest';
import { classifyDemoQuery, DEMO_ANSWERS } from '../ai-utils';

describe('classifyDemoQuery', () => {
    it('should identify downtime related queries', () => {
        expect(classifyDemoQuery('Why did we have downtime yesterday?')).toEqual(DEMO_ANSWERS['downtime']);
        expect(classifyDemoQuery('Tell me about machine stops')).toEqual(DEMO_ANSWERS['downtime']);
    });

    it('should identify margin related queries', () => {
        expect(classifyDemoQuery('What is our margin for April?')).toEqual(DEMO_ANSWERS['margin']);
        expect(classifyDemoQuery('Which SKUs are performing best?')).toEqual(DEMO_ANSWERS['margin']);
    });

    it('should identify inventory related queries', () => {
        expect(classifyDemoQuery('Are we running out of Kraft paper?')).toEqual(DEMO_ANSWERS['inventory']);
        expect(classifyDemoQuery('Check kraft stock levels')).toEqual(DEMO_ANSWERS['inventory']);
    });

    it('should return fallback for unknown queries', () => {
        expect(classifyDemoQuery('What is the weather?')).toEqual(DEMO_ANSWERS['fallback']);
        expect(classifyDemoQuery('')).toEqual(DEMO_ANSWERS['fallback']);
    });
});
