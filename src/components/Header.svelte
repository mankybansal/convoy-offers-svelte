<script>
  import ConvoyLogo from "./ConvoyLogo.svelte";
  import { Link } from "svelte-routing";

  let activeRoute;

  function getProps({ location }) {
    activeRoute = location.pathname;
  }
</script>

<div class="container">
  <ConvoyLogo />
  <div class="header-buttons">
    <div class="header-button {activeRoute === '/offers' && 'selected'}">
      <Link to="offers" {getProps}>Offers</Link>
    </div>
    <div class="header-button {activeRoute === '/myJobs' && 'selected'}">
      <Link to="myJobs" {getProps}>My Jobs</Link>
    </div>
  </div>
</div>

<style>
  .container {
    height: 56px;
    width: 100%;
    background: white;
    display: flex;
    position: sticky;
    top: 0;
    padding: 0 48px;
    align-items: center;
    z-index: 1;
    border-bottom: 1px solid #eee;
  }

  .header-buttons {
    margin-left: 24px;
    display: flex;
    height: 100%;
  }

  .header-button {
    font-size: 16px;
    color: #0b2127;
    letter-spacing: 0.4px;
    line-height: 20px;
    padding: 0 24px;
    display: flex;
    align-items: center;
  }

  .header-button.selected {
    border-bottom: 4px solid #f65335;
  }
</style>
