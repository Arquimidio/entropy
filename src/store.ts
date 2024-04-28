import { atom } from 'nanostores';

export const presence = atom<{
    data: any,
    isHeartStopped: boolean
}>({
    data: null,
    isHeartStopped: true
})