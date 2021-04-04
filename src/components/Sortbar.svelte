<script>
  export let handleSort;
  export let sort;
  export let handleSortOrder;
  export let sortOrder;

  const sortOptions = [
    { value: "pickupDate", label: "Pickup Date" },
    { value: "dropoffDate", label: "Dropoff Date" },
    { value: "price", label: "Price" },
    { value: "origin", label: "Origin" },
    { value: "destination", label: "Destination" },
    { value: "miles", label: "Miles" },
  ];

  const sortOrderOptions = [
    { value: "asc", label: "Asc" },
    { value: "desc", label: "Desc" },
  ];
</script>

<div class="container">
  <label>
    Sort by:
    <select bind:value={sort} on:change={handleSort}>
      {#each sortOptions as sortOption}
        <option value={sortOption.value}>{sortOption.label}</option>
      {/each}
    </select>
  </label>
  <label>
    Order:
    <select bind:value={sortOrder} on:change={handleSortOrder}>
      {#each sortOrderOptions as sortOrderOption}
        <option value={sortOrderOption.value}>{sortOrderOption.label}</option>
      {/each}
    </select>
  </label>
</div>

<style>
  .container {
    background: #f7f9fa;
    border: 1px solid #d6dadc;
    border-radius: 4px;
    margin-bottom: 16px;
    padding: 16px;
    display: flex;

    font-size: 16px;
    color: #5a666c;
    letter-spacing: 0.4px;
    line-height: 20px;
    font-weight: 500;
  }

  select {
    outline: none;
    border: none;
    background: transparent;
    font-size: 16px;
    color: #1079a5;
    letter-spacing: 0.4px;
    line-height: 20px;
    font-weight: 500;
    cursor: pointer;
    margin-right: 12px;
  }
</style>
