<script>
  import moment from "moment";
  import { fade, fly } from "svelte/transition";

  export let offerData = {};
  export let requested;
  export let toggleRequested;

  const { destination, origin, miles, offer } = offerData;

  function formatAppointment(stop) {
    return `${moment(stop.start).format("ddd DD/MM h:mma")} - ${moment(
      stop.end
    ).format("h:mma")}`;
  }

  const offerPrice = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Math.round(offer));
</script>

<div
  class="container"
  in:fly={{ y: 50, duration: 500 }}
  on:click={toggleRequested}
>
  {#if requested}
    <div class="requested" in:fade>REQUESTED</div>
  {/if}
  <div class="offer-details">
    <div class="location-details">
      <div class="stop">
        <div class="location-name">{origin.city}, {origin.state}</div>
        <div class="location-appointment">
          {formatAppointment(origin.pickup)}
        </div>
      </div>
      <div class="stop">
        <div class="location-name">{destination.city}, {destination.state}</div>
        <div class="location-appointment">
          {formatAppointment(destination.dropoff)}
        </div>
      </div>
    </div>
    <div class="other-details">
      <div class="equipment-type">53' Reefer</div>
      <div class="distance">{miles.toLocaleString()} miles</div>
      <div class="offer-price">{offerPrice}</div>
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background: white;
    padding: 32px 36px;
    width: 100%;
  }

  .container:first-of-type {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .container:last-of-type {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .offer-details {
    display: flex;
  }

  .location-details {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .other-details {
    display: flex;
    margin-left: auto;
  }

  .location-name {
    color: #0a2127;
    position: relative;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.45px;
    line-height: 20px;
  }

  .location-name:before {
    content: "";
    position: absolute;
    height: 10px;
    width: 10px;
    background: #b5bbbe;
    border-radius: 50%;
    margin-left: -20px;
    margin-top: 5px;
  }

  .location-appointment {
    font-size: 16px;
    color: #7f8d99;
    letter-spacing: 0.4px;
    line-height: 20px;
    margin-top: 4px;
  }

  .stop {
    position: relative;
    padding-bottom: 16px;
  }

  .stop:last-of-type {
    padding-bottom: unset;
  }

  .stop:first-of-type:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background: #b5bbbe;
    margin-left: -16px;
    left: 0;
    margin-top: 8px;
  }

  .equipment-type,
  .distance {
    color: #0a2127;
    font-size: 18px;
    margin-left: 48px;
    letter-spacing: 0.45px;
    min-width: 100px;
  }

  .offer-price {
    color: #49a54e;
    font-size: 18px;
    margin-left: 24px;
    font-weight: 700;
    line-height: 20px;
    min-width: 100px;
    text-align: right;
  }

  .requested {
    background: #14a9e6;
    color: white;
    font-size: 14px;
    letter-spacing: 0.35px;
    line-height: 20px;
    padding: 2px 8px;
    width: fit-content;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 800px) {
    .offer-details {
      flex-direction: column;
    }

    .other-details {
      margin-top: 24px;
      margin-left: 20px;
    }

    .equipment-type,
    .distance {
      margin-left: 0;
      margin-right: 24px;
    }
  }
</style>
