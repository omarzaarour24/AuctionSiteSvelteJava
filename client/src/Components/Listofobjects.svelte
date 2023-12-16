<script>
import AuctionPage from "../pages/AuctionPage.svelte";
import Detials from "./Detials.svelte";
export let IsAuction;
let open=false;
let aucId=null;
export let params;
let type;
console.log('list is called')
</script>

<!--list of users-->
{#if !IsAuction}
<div class="users-list">
    {#if params.length === 0}
        <p>There are no users on the list</p>
    {:else}
        {#each params as params }
<!--            <p>auctions</p>-->
            <div><Detials {IsAuction} {params}/></div>
        {/each}
    {/if}
    {#if aucId!=null}
        <AuctionPage {aucId}/>
    {/if}
</div>
{/if}

<!--list of auctions-->
    {#if IsAuction}
<div class="auction-list">
    {#if params.length === 0}
        <p>There are no auctions on the list</p>
    {:else}
        {#each params as params }
            <div><Detials {IsAuction} {params}/></div>
        {/each}
    {/if}
    {#if aucId!=null}
        <AuctionPage {aucId}/>
    {/if}
</div>
    {/if}




<style>
    .auction-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }
    .users-list{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
    }
</style>