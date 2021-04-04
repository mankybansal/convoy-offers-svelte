<script>
    import Offer from "../components/Offer.svelte";

    export let requestedOffers;
    $: requestedOffersArray = Object.keys(requestedOffers);

    function toggleRequested(encodedOffer) {
        requestedOffers[encodedOffer] = !requestedOffers[encodedOffer];
    }

    function decodeOffer(encodedOffer){
        return JSON.parse(atob(encodedOffer));
    }
</script>

{#each requestedOffersArray as encodedOffer}
    <Offer offerData={decodeOffer(encodedOffer)} requested={true} toggleRequested={() => toggleRequested(encodedOffer)}/>
{/each}