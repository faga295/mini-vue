import { reactive } from '../src/reactive';
import { effect } from '../src/effect';

describe('effect', () => {
    it("should observe basic properties", () => {
        let dummy;
        const counter = reactive({ num: 0 });
        effect(() => {
            dummy = counter.num;
            console.log(counter.num);
            
        });
        expect(dummy).toBe(0);
        counter.num = 7;
        expect(dummy).toBe(7);
    })    
})