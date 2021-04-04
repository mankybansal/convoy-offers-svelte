<script>
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";

  import Offers from "./routes/Offers.svelte";
  import MyJobs from "./routes/MyJobs.svelte";

  export let name;

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "offers";

  const apiBaseURL = "https://convoy-mock-api.herokuapp.com/offers";
  let offers = [];
  let requestedOffers = {};

  const sortOptions = [
    "pickupDate",
    "dropoffDate",
    "price",
    "origin",
    "destination",
    "miles",
  ];
  const sortOrderOptions = ["desc", "asc"];

  let limit = 3;
  let offset = 0;
  let sortOrder = sortOrderOptions[0];
  let sort = sortOptions[0];

  let fetchError = false;

  const fetchOffers = async () => {
    const apiURL = `${apiBaseURL}?limit=${limit}&offset=${offset}&order=${sortOrder}&sort=${sort}`;

    try {
      const response = await fetch(apiURL);
      fetchError = false;
      const newOffers = await response.json();
      if (newOffers.length > 0) {
        offers = [...offers, ...newOffers];
      }
    } catch (error) {
      fetchError = true;
    }
  };

  function handleShowMore() {
    offset = offset + 3;
    fetchOffers();
  }

  function handleSortOrder(event) {
    offers = [];
    sortOrder = event.target.value;
    fetchOffers();
  }

  function handleSort(event) {
    offers = [];
    sort = event.target.value;
    fetchOffers();
  }

  onMount(fetchOffers);
</script>

<main>
  <Router {url}>
    <Header />
    <Route path="offers">
      {#if fetchError}
        <div class="fetch-error">Couldn't load offers, please try again.</div>
      {/if}
      <Offers
        {offers}
        {sort}
        {sortOrder}
        {requestedOffers}
        {handleSort}
        {handleShowMore}
        {handleSortOrder}
      />
    </Route>
    <Route path="myJobs">
      <MyJobs {requestedOffers} />
    </Route>
    <Footer {name} />
  </Router>
</main>

<style>
  main {
    background: #f7f9fa;
    height: 100%;
    flex-direction: column;
    overflow-y: scroll;
  }

  .fetch-error {
    top: 56px;
    position: sticky;
    background: #df302a;
    color: white;
    width: 100%;
    padding: 16px 48px;
    z-index: 1;
  }
</style>
