<script>
    import Offer from '../components/Offer.svelte';
    import Sortbar from '../components/Sortbar.svelte';
    import {createEventDispatcher} from 'svelte';
    import {generateKey} from "../utils";

    const dispatch = createEventDispatcher();

    export let offers;
    export let requestedOffers;
    export let handleShowMore;
    export let sort;
    export let handleSort;
    export let sortOrder;
    export let handleSortOrder;

    function toggleRequested(offer) {
      requestedOffers[generateKey(offer)] = !requestedOffers[generateKey(offer)];
    }
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        padding: 32px 48px;
        flex: 1;
        max-width: 1024px;
    }

    .showMore-button {
        background: #848e93;
        border-radius: 4px;
        margin-top: 20px;
        outline: none;
        border: none;
        width: max-content;

        font-weight: 700;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        line-height: 20px;
        padding: 16px 64px;
    }

    .showMore-button:hover {
        background: #555;
    }
</style>

<div class="container">
    <Sortbar {handleSort} {sort} {handleSortOrder} {sortOrder}/>
    {#each offers as offer (generateKey(offer))}
        <Offer offerData={offer} requested={requestedOffers[generateKey(offer)]} toggleRequested={() => toggleRequested(offer)}/>
    {/each}
    <button class="showMore-button" on:click={handleShowMore}>Show More</button>
</div>
