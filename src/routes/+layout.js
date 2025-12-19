import { device } from '$lib/Device.js';
import { firstLoad } from '$lib/firstLoad';
import { get } from 'svelte/store';

/** @type {import('./$types').LayoutLoad} */
export async function load(data) {
    const d = get(device);
    let f = firstLoad;

    return {
    ...data.data,
    device: d,
    firstLoad: f
    }
}