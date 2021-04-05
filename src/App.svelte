<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";
  import Header from "./components/Header.svelte";
  import Footer from "./components/Footer.svelte";

  import Offers from "./routes/Offers.svelte";
  import MyJobs from "./routes/MyJobs.svelte";
  import * as Config from "./config";

  export let name: string;

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "/offers";

  let offers = [];

  const params = new URLSearchParams(window.location.search);
  let limit = params.get("limit") ?? Config.DEFAULT_LIMIT;
  let offset = params.get("offset") ?? Config.DEFAULT_OFFSET;
  let sortOrder = params.get("sortOrder") ?? Config.DEFAULT_SORT_ORDER;
  let sort = params.get("sort") ?? Config.DEFAULT_SORT;

  let fetchError = false;

  const fetchOffers = async () => {
    const apiURL = `${Config.BASE_API_URL}?limit=${limit}&offset=${offset}&order=${sortOrder}&sort=${sort}`;

    try {
      const response = await fetch(apiURL);
      fetchError = false;
      const newOffers = await response.json();
      if (newOffers.length > 0) {
        offers = [...offers, ...newOffers];
      }

      updateUrlParams();
    } catch (error) {
      fetchError = true;
    }
  };

  function updateUrlParams() {
    const params = new URLSearchParams(window.location.search);
    params.set("sort", sort);
    params.set("sortOrder", sortOrder);
    params.set("limit", offset.toString());
    params.set("limit", limit.toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  }

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
        {handleSort}
        {handleShowMore}
        {handleSortOrder}
      />
    </Route>

    <Route path="myJobs">
      <MyJobs />
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
