import { activeEffect } from '../effect/index';
export let bucket:WeakMap<Object,bucketMap> = new WeakMap();
type bucketMap = Map<string|symbol,effectsSet>
type effectsSet = Set<Function>
export default function dataHijack(data){
    return new Proxy(data,{
        get(target,key){
            if(!activeEffect) return;
            let bucketMap = bucket.get(target)
            if(!bucketMap){
                bucketMap = new Map()
                bucket.set(target, bucketMap)
            }
            
            let effects = bucketMap.get(key);
            if(!effects){
                effects = new Set()
                bucketMap.set(key, effects)
            } 
            
            effects.add(activeEffect);
            
            return target[key]
        },
        set(target,key,newValue){
            target[key] = newValue;
            bucket.get(target)?.get(key).forEach(fn => fn())
            return newValue;
        }
    })
}
export function setBucket(obj){
    bucket.set(obj,new Map())
}