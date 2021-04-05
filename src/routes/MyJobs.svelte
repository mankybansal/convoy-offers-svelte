<script>
  import { onMount } from "svelte";
  import { decodeOffer, getStoredOffers, setStoredOffers } from "../utils";
  import Offer from "../components/Offer.svelte";

  let requestedOffers = {},
    requestedOffersArray = [];

  function filterStoredOffers() {
    requestedOffers = getStoredOffers();
    requestedOffersArray = Object.keys(requestedOffers).filter(
      (x) => requestedOffers[x] !== false
    );
  }

  function toggleRequested(encodedOffer) {
    requestedOffers[encodedOffer] = !requestedOffers[encodedOffer];
    setStoredOffers(requestedOffers);
    filterStoredOffers();
  }

  onMount(filterStoredOffers);
</script>

<svelte:head>
  <title>My Jobs | Convoy</title>
</svelte:head>

<div class="container">
  {#if requestedOffersArray.length === 0}
    No saved offers.
  {/if}
  {#each requestedOffersArray as encodedOffer}
    <Offer
      offerData={decodeOffer(encodedOffer)}
      requested={true}
      toggleRequested={() => toggleRequested(encodedOffer)}
    />
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    padding: 32px 48px;
    flex: 1;
    max-width: 1024px;
  }
</style>
