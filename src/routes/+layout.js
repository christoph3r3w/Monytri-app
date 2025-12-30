import { device } from '$lib/Device.js';
import { firstLoad } from '$lib/firstLoad';
import { get } from 'svelte/store';

/** @type {import('./$types').LayoutLoad} */
export async function load(data) {
    let {isAuthenticated} = data.data;
    
    let d = isAuthenticated ? get(device) : null;
    let f = firstLoad;

    return {
    ...data.data,
    device: d,
    firstLoad: f
    }
}