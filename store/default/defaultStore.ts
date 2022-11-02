import { defineStore } from 'pinia';

export const useDefaultStore =  defineStore('default',{
    state: () => ({
        count: 0,
    }),
    actions: {
        increment(by?: number) {
            this.count+=by || 1;
        }
    }
})
