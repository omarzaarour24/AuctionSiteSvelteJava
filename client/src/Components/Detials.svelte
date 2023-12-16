<script>
    import Card from '../lib/Card.svelte';
    export let params;
    export let IsAuction;
    console.log('details is called')

</script>

<Card>
    {#if !IsAuction}
        <div class="user">
            <!--    makes the auction title clickable-->
            <a href="/user/{params.id}">
                <h3>{params.Email}</h3>
            </a>
            <div class="info">
                <div class="Password"></div>
                <span>Hashed Password({params.Password})</span>
            </div>
        </div>

        {:else if IsAuction}
        <div class="auction">
            <!--    makes the auction title clickable-->
            <a href="/auctions/{params.id}">
                <h3>{params.title}</h3>
            </a>

            <div class="info">
                <div class="MaxBid"></div>
                <span>Max bid({params.MaxBid})</span>
            </div>
        </div>

    {/if}

</Card>